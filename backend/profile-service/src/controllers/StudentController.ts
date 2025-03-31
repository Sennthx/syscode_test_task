import { Request, Response } from 'express';
import { StudentService } from '../services/StudentService';
import logger from '../logger';

export class StudentController {
    private studentService = new StudentService();

    private handleError(error: unknown, defaultMessage: string, logMessage: string) {
        const message = error instanceof Error ? error.message : defaultMessage;
        logger.warn(`${logMessage}: ${message}`);
        return message;
    }

    getAllStudents = async (req: Request, res: Response) => {
        try {
            const students = await this.studentService.findAll();
            res.json(students);
        } catch (error) {
            const message = this.handleError(error, 'Failed to fetch students', 'Get all students error');
            res.status(500).json({ message });
        }
    };

    createStudent = async (req: Request, res: Response) => {
        try {
            const student = await this.studentService.create(req.body);
            res.status(201).json(student);
        } catch (error) {
            const message = this.handleError(error, 'Failed to create student', 'Create student error');
            res.status(400).json({ message });
        }
    };

    updateStudent = async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const student = await this.studentService.update(id, req.body);
            res.json(student);
        } catch (error) {
            const message = this.handleError(error, 'Failed to update student', `Update student error (ID: ${id})`);
            res.status(400).json({ message });
        }
    };

    deleteStudent = async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            await this.studentService.delete(id);
            logger.info(`Successfully deleted student (ID: ${id})`);
            res.status(200).json({ message: 'Student successfully deleted', studentId: id });
        } catch (error) {
            const message = this.handleError(error, 'Failed to delete student', `Delete student error (ID: ${id})`);
            const statusCode = message.includes('not found') ? 404 : 400;
            res.status(statusCode).json({ message });
        }
    };
}