import { QueryResult } from "pg";

export default (any: QueryResult<any>) => any.rows;
