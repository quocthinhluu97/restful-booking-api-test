import { BaseApi } from "./base.api"
import Urls from "constants/urls.const";
import { BookingQuery, BookingRequestData, BookingReturnData, BookingId } from "@models/booking-info.model";
import { AuthToken, RequiredHeaders } from "@models/auth.model";

export default class BookingApi extends BaseApi {
    constructor(options?: RequiredHeaders) {
        super(options);
    }

    async getBookingIds(bookingQuery?: BookingQuery) {
        const response = await this._http.get<BookingId[]>({
           url: `${Urls.BookingService}?${new URLSearchParams(bookingQuery as any)}`, 
           name: 'Get booking info',
        });
        return response;
    }

    async getBookingById(id: number) {
        const response = await this._http.get<BookingRequestData>({
           url: `${Urls.BookingService}/${id}`, 
           name: 'Get booking by id',
        });
        return response;
    }

    async createBooking(booking: BookingRequestData) {
        const response = await this._http.post<BookingReturnData>({
           url: `${Urls.BookingService}`, 
           name: 'Create booking',
           rawBody: booking
        });
        return response;
    }

    async updateBooking(id: BookingId, booking: BookingRequestData) {
        const response = await this._http.put<BookingRequestData>({
           url: `${Urls.BookingService}/${id}`, 
           name: 'Create booking',
           rawBody: booking
        });
        return response;
    }
}