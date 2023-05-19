import { Pool } from "pg";
import { createError } from "../mw/error";

const connectionString = process.env.DB_URl;

if (!connectionString) createError("Connection string not defined");

const db = new Pool({ connectionString });

export default db;
