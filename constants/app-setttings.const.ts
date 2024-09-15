import * as dotenv from 'dotenv'

dotenv.config();

export default class AppSettings {
    static readonly HOST_URL = process.env.HOST_URL!;
    static readonly BOOKING_DATA_FILE = [process.cwd(), 'data','booking.json'].join('/');
    static readonly AUTH_TOKEN_FILE = [process.cwd(), '.auth', 'auth-token'].join('/');
    static readonly AUTH_DATA_FILE = [process.cwd(), 'data', 'auth-data.json'].join('/');
}