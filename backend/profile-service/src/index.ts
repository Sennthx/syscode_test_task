import express from 'express';
import { StudentController } from './controllers/StudentController';
import { AppDataSource } from './database/datasource';

const app = express();
app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        const controller = new StudentController();

        // Routes
        app.get('/students', controller.getAllStudents);
        app.post('/students', controller.createStudent);

        app.listen(3000, () => {
            console.log('Server running on http://localhost:3000');
        });
    })
    .catch(console.error);