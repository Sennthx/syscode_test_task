import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Address } from '../../entities/Address';
import { Student } from '../../entities/Student';
import { AddressFactory } from '../factories/AddressFactory';
import logger from '../../logger';


export default class AddressSeeder implements Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        const addressRepository = dataSource.getRepository(Address);
        const studentRepository = dataSource.getRepository(Student);

        await addressRepository.delete({});

        const students = await studentRepository.find();
        
        if (students.length === 0) {
            logger.info("No students found - skipping address seeding");
            return;
        }

        logger.info("Started address seeder...");
        const studentIds = students.map(student => student.id);
        const addresses = AddressFactory.createForStudents(studentIds);

        await addressRepository.save(addresses);
    }
}