import * as dotenv from 'dotenv'

dotenv.config();

export default class AppSettings {
    static readonly HOST_URL = process.env.HOST_URL!;
    static readonly BOOKING_DATA_FILE = process.cwd() + '/data/' + 'booking.json';


}