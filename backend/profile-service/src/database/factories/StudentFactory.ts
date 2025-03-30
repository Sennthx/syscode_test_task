import { faker } from '@faker-js/faker';
import { Student } from '../../entities/Student';

export class StudentFactory {
    static create(count: number = 1): Partial<Student>[] {
        return Array(count)
            .fill(null)
            .map(() => ({
                name: faker.person.fullName(),
                email: faker.internet.email(),
            }));
    }
}