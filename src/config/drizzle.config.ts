import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from "../domain/entities/schema";
import 'dotenv/config';

export const client = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(client, { schema });
