import { Pool } from "pg";

const pool = new Pool({
    host: 'postgres',
    user: 'petclinic',
    password: 'petclinic',
    database: 'petclinic',
    port: 5432,
});

export default pool;

