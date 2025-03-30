import { AppDataSource } from '../database/datasource';
import { Student } from '../entities/Student';

export class StudentService {
    private studentRepository = AppDataSource.getRepository(Student);

    async create(studentData: { name: string; email: string }): Promise<Student> {
        const student = this.studentRepository.create(studentData);
        return this.studentRepository.save(student);
    }

    async findAll(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    // Add update/delete methods similarly
}