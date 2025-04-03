import { AppDataSource } from '../database/datasource';
import AddressSeeder from '../database/seeds/AddressSeeder';
import logger from '../logger';

async function runSeeds() {
    try {
        await AppDataSource.initialize();
        logger.info('Database connected, running seeds...');

        const seeder = new AddressSeeder();
        await seeder.run(AppDataSource);

        logger.info('Address seeding completed!');
        process.exit(0);

    } catch (error) {
        logger.error('Address seeding failed:', error);
        process.exit(1);
    }
}

runSeeds();