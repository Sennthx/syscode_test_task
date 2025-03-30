import { Request, Response } from 'express';
import { StudentService } from '../services/StudentService';

export class StudentController {
    private studentService = new StudentService();

    getAllStudents = async (req: Request, res: Response) => {
        const students = await this.studentService.findAll();
        res.json(students);
    }

    createStudent = async (req: Request, res: Response) => {
        const student = await this.studentService.create(req.body);
        res.status(201).json(student);
    }
}
