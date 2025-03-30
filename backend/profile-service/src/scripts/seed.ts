import { AppDataSource } from '../database/datasource';
import StudentSeeder from '../database/seeds/StudentSeeder';

async function runSeeds() {
    try {
        await AppDataSource.initialize();
        console.log('Database connected, running seeds...');

        const seeder = new StudentSeeder();
        await seeder.run(AppDataSource);

        console.log('Seeding completed!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

runSeeds();