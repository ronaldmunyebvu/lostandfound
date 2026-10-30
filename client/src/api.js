const BASE = import.meta.env.VITE_API_URL || '/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, options);
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  if (!res.ok) {
    const err = new Error(data?.error || 'Something went wrong.');
    err.status = res.status;
    throw err;
  }
  return data;
}

export const api = {
  login: (email, password) =>
    request('/super', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }),

  saveDocument: (payload) =>
    request('/submited', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),

  search: (params) => {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v) qs.set(k, v);
    });
    return request(`/search?${qs.toString()}`);
  },

  getDocuments: () => request('/documents'),

  getDocument: (id) => request(`/documents/${id}`),

  updateDocument: (id, payload) =>
    request(`/documents/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),

  deleteDocument: (id) =>
    request(`/documents/${id}`, { method: 'DELETE' }),

  uploadExcel: (file) => {
    const body = new FormData();
    body.append('file', file);
    return request('/upload', { method: 'POST', body });
  },
};

export const DOCUMENT_TYPES = [
  { value: 'Birth_Certificate', label: 'Birth Certificate' },
  { value: 'Drivers_license', label: "Driver's License" },
  { value: 'National_ID', label: 'National ID' },
  { value: 'Passport', label: 'Passport' },
  { value: 'Certificate', label: 'Certificate' },
];

export const ID_REQUIRED_TYPES = ['Drivers_license', 'National_ID', 'Passport'];

export function maskNationalId(id) {
  if (!id) return 'N/A';
  const s = String(id);
  if (s.length < 6 || s === 'DEFAULT_VALUE') return 'N/A';
  return s.slice(0, 2) + '****' + s.slice(6);
}
