# Lost & Found

The active website uses the React/Vite client and Express API. The API connects
to Neon PostgreSQL using `pg`; database credentials stay in the server
environment and must never use a `VITE_` variable name.

## Local setup

1. Use Node.js 24.
2. Copy `.env.example` to `.env` and set `DATABASE_URL` to the connection
   string from Neon. Keep `.env` private and do not commit it.
3. Install dependencies with `npm run install:all`.
4. Create the `savings` table with `npm run db:setup`.
5. Start the client and API with `npm run dev`.

Run `npm run build` to build the client and `npm run lint` to lint it.
The database setup command creates the table if it does not exist; it does not
copy data from an existing MySQL database.
