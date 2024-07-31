import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

export let db = new pg.Pool({
    ssl:true,
    connectionString:process.env.NEONDB_CONNECTION_STRING
})