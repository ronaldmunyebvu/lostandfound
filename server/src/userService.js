import { query } from './db.js';
import * as XLSX from 'xlsx';

const findById = async (id) => {
  const rows = await query('SELECT * FROM savings WHERE id = $1', [id]);
  return rows[0];
};

const SEARCH_COLUMNS =
  'id, fname, lname, nationalid, location, documentname, contactnumber, containernumber';

async function searchByCriterion(documentname, column, value) {
  if (!value || !String(value).trim()) return [];

  return query(
    `SELECT ${SEARCH_COLUMNS}, 'Available' AS status, NULL::timestamptz AS collected_at
       FROM savings
      WHERE LOWER(documentname) = LOWER($1) AND LOWER(${column}) = LOWER($2)
     UNION ALL
     SELECT ${SEARCH_COLUMNS}, 'Collected' AS status, collected_at
       FROM collected
      WHERE LOWER(documentname) = LOWER($1) AND LOWER(${column}) = LOWER($2)`,
    [documentname, value]
  );
}

// Mirrors the original Spring Boot search: combine results per non-empty criterion.
async function searchUsers(documentname, nationalid, fname, lname) {
  const rows = [
    ...(await searchByCriterion(documentname, 'nationalid', nationalid)),
    ...(await searchByCriterion(documentname, 'fname', fname)),
    ...(await searchByCriterion(documentname, 'lname', lname)),
  ];

  const seen = new Set();
  return rows.filter((row) => {
    const key = `${row.status}-${row.id}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getCellValue(cell) {
  if (cell == null) return '';
  if (typeof cell === 'string') return cell;
  if (typeof cell === 'number') return String(Math.trunc(cell));
  return String(cell);
}

function getContainerNumber(value) {
  if (value == null || value === '') return 0;
  const str = String(value).trim();
  if (/^\d+$/.test(str)) return parseInt(str, 10);
  throw new Error('Invalid container number format: ' + str);
}

// Bulk upload from Excel buffer (mirrors the Apache POI import).
async function saveUsersFromExcel(buffer) {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: true });

  const users = [];
  for (const row of rows) {
    if (!Array.isArray(row) || row.every((c) => c == null || c === '')) continue;

    const user = {
      fname: getCellValue(row[0]),
      lname: getCellValue(row[1]),
      nationalid: getCellValue(row[2]),
      location: getCellValue(row[3]),
      documentname: getCellValue(row[4]),
      contactnumber: getCellValue(row[5]),
      containernumber: getContainerNumber(row[6]),
    };
    users.push(user);
  }

  if (users.length > 0) {
    for (const user of users) {
      await query(
        `INSERT INTO savings (fname, lname, nationalid, location, documentname, contactnumber, containernumber)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          user.fname,
          user.lname,
          user.nationalid,
          user.location,
          user.documentname,
          user.contactnumber,
          user.containernumber,
        ]
      );
    }
  }

  return users.length;
}

export { findById, searchUsers, saveUsersFromExcel };
