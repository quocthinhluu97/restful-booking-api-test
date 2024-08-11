import { faker } from '@faker-js/faker';
import DateUtil from './data.util';

export const FakerUtil = {
    bookingData: () => {
        return {
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            totalprice: faker.number.int({ min: 0, max: 10 * 1000 }),
            depositpaid: faker.datatype.boolean(),
            bookingdates: {
                checkin: DateUtil.getNDaysBack(-1),
                checkout: DateUtil.getNDaysBack(-10)
            }
        }
    }
}