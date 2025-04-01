import 'reflect-metadata';
import express from 'express';
import { StudentController } from './controllers/StudentController';
import { AppDataSource } from './database/datasource';
import expressWinston from 'express-winston';
import morgan from 'morgan';
import logger from './logger'

const app = express();
app.use(express.json());

app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

AppDataSource.initialize()
    .then(() => {
        const controller = new StudentController();

        app.use(
            expressWinston.logger({
                winstonInstance: logger,
                meta: true,
                msg: 'HTTP {{req.method}} {{req.url}}',
                expressFormat: true,
                colorize: false,
            })
        );

        app.get('/students', controller.getAllStudents);
        app.post('/students', controller.createStudent);
        app.put('/students/:id', controller.updateStudent);
        app.delete('/students/:id', controller.deleteStudent);

        app.listen(3000, () => {
            logger.info('Server running on http://localhost:3000');
        });
    })
    .catch((error) => {
        logger.error('Error during Data Source initialization:', error);
    });