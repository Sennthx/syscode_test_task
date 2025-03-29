import { DataSource } from 'typeorm';
import { Student } from '../entities/Student';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432'),
    username: process.env.DB_USER || 'studentuser',
    password: process.env.DB_PASSWORD || 'studentpass',
    database: process.env.DB_NAME || 'studentdb',
    entities: [Student],
    synchronize: false,
    logging: true,
});