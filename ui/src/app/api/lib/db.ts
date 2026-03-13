import { Pool } from "pg";

const pool = new Pool({
  user: "ichigomazone",
  password: "postgresql123",
  host: "localhost",
  port: 5432,
  database: "webgis_database",
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default pool;
