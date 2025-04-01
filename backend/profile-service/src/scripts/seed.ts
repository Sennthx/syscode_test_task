import { AppDataSource } from '../database/datasource';
import StudentSeeder from '../database/seeds/StudentSeeder';
import logger from '../logger'

async function runSeeds() {
    try {
        await AppDataSource.initialize();
        logger.info('Database connected, running seeds...');

        const seeder = new StudentSeeder();
        await seeder.run(AppDataSource);

        logger.info('Seeding completed!');
        process.exit(0);

    } catch (error) {
        logger.error('Seeding failed:', error);
        process.exit(1);
    }
}

runSeeds();