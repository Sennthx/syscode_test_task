import { AppDataSource } from '../database/datasource';
import { Address } from '../entities/Address';
import logger from '../logger';

export class AddressService {
    private addressRepository = AppDataSource.getRepository(Address);

    async find(studentId: string): Promise<string | null> {
        try {
            const address = await this.addressRepository.findOne({
                where: { studentId: studentId }
            });

            if (!address) {
                logger.warn(`No address found for student ${studentId}`);
                return null;
            }

            return address.address;
        } catch (error) {
            logger.error(`Error finding address for student ${studentId}:`, error);
            throw error;
        }
    }
}