import { faker } from '@faker-js/faker';

export class AddressService {
    find(id: string): string {
        return faker.location.streetAddress({ useFullAddress: true })
    }
}