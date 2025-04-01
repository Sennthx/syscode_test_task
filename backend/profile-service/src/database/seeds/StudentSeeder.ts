import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Student } from '../../entities/Student';
import { StudentFactory } from '../factories/StudentFactory';

export default class StudentSeeder implements Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        const repository = dataSource.getRepository(Student);

        await repository.delete({});
        const students = StudentFactory.create(20);

        await repository.save(students);
    }
}