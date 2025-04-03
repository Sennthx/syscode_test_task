import { faker } from '@faker-js/faker';
import { Address } from '../../entities/Address';

export class AddressFactory {
    static createForStudents(studentIds: string[]): Partial<Address>[] {
        return studentIds.map((studentId) => ({
            studentId: studentId,
            address: this.generateRealisticAddress(),
        }));
    }

    private static generateRealisticAddress(): string {
        return faker.location.streetAddress() + ', ' + 
               faker.location.city() + ', ' + 
               faker.location.state() + ' ' + 
               faker.location.zipCode();
    }
}