import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from '../../config/drizzle.config';

async function main() {
    try {
        console.log('migration started...');
        await migrate(db, { migrationsFolder: './src/infrastructure/drizzle/migrations' });
        console.log('migration ended...');
    } catch (err) {
        console.error(err);
    } finally {
        process.exit(0);
    }
}

main();