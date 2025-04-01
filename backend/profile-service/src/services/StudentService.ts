import { AppDataSource } from '../database/datasource';
import { Student } from '../entities/Student';
import { validate } from 'class-validator';
import logger from '../logger';

export class StudentService {
    private studentRepository = AppDataSource.getRepository(Student);

    private async validateStudentData(studentData: { name: string; email: string }) {
        const student = new Student();
        student.name = studentData.name;
        student.email = studentData.email;

        const errors = await validate(student);
        if (errors.length > 0) {
            throw new Error(errors.map(e => Object.values(e.constraints || {})).join(', '));
        }
    }

    async create(studentData: { name: string; email: string }): Promise<Student> {
        try {
            await this.validateStudentData(studentData);

            const existingStudent = await this.studentRepository.findOneBy({
                email: studentData.email
            });
            if (existingStudent) {
                logger.warn(`Create failed: Email already in use (${studentData.email})`);
                throw new Error('Email is already in use');
            }

            const student = this.studentRepository.create(studentData);
            return await this.studentRepository.save(student);
        } catch (error) {
            logger.error('Create student failed:', error);
            throw error;
        }
    }

    async findAll(): Promise<Student[]> {
        try {
            return await this.studentRepository.find();
        } catch (error) {
            logger.error('Find all students failed:', error);
            throw new Error('Failed to fetch students');
        }
    }

    async update(id: string, updateData: Partial<Student>): Promise<Student> {
        try {
            if (!updateData.name) {
                logger.warn('Update failed: Name is required');
                throw new Error('Name is required for update');
            }

            const student = await this.studentRepository.findOneBy({ id });
            if (!student) {
                logger.warn(`Update failed: Student not found (ID: ${id})`);
                throw new Error('Student not found');
            }

            if (updateData.email && updateData.email !== student.email) {
                logger.warn(`Update failed: Email change attempted (ID: ${id})`);
                throw new Error('Email cannot be changed');
            }

            await this.studentRepository.update(id, { name: updateData.name });
            const updatedStudent = await this.studentRepository.findOneBy({ id });

            if (!updatedStudent) {
                logger.error(`Update failed: Could not retrieve updated student (ID: ${id})`);
                throw new Error('Failed to retrieve updated student');
            }

            return updatedStudent;
        } catch (error) {
            logger.error(`Update student failed (ID: ${id}):`, error);
            throw new Error(
                error instanceof Error ? error.message : 'Failed to update student'
            );
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const student = await this.studentRepository.findOneBy({ id });
            if (!student) {
                logger.warn(`Delete failed: Student not found (ID: ${id})`);
                throw new Error('Student not found');
            }

            await this.studentRepository.delete(id);
            logger.info(`Student deleted successfully (ID: ${id})`);
        } catch (error) {
            logger.error(`Delete student failed (ID: ${id}):`, error);
            throw new Error(
                error instanceof Error ? error.message : 'Failed to delete student'
            );
        }
    }
}