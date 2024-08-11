import AppSettings from "./app-setttings.const";

export default class Urls {
    // Auth service
    static readonly AuthService = `${AppSettings.HOST_URL}/auth`;

    // Booking service
    static readonly BookingService = `${AppSettings.HOST_URL}/booking`;
}