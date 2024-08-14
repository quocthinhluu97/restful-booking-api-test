import { BaseApi } from "./base.api"
import Urls from "constants/urls.const";
import { BookingQuery, BookingRequestData, BookingReturnData, BookingId } from "@models/booking-info.model";
import { RequiredHeaders } from "@models/auth.model";
import { _Promise } from "@models/result.model";

export default class BookingApi extends BaseApi {
    constructor(options?: RequiredHeaders) {
        super(options);
    }

    async getBookingIds(bookingQuery?: BookingQuery): _Promise<BookingId[]> {
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
            name: 'Update booking',
            rawBody: booking
        });
        return response;
    }

    async partialUpdateBooking(id: BookingId, booking: BookingRequestData) {
        const response = await this._http.patch<Partial<BookingRequestData>>({
            url: `${Urls.BookingService}/${id}`,
            name: 'Partially update booking',
            rawBody: booking
        });
        return response;
    }

    async deleteBooking(id: BookingId) {
        const response = await this._http.delete<void>({
            url: `${Urls.BookingService}/${id}`,
            name: 'Delete booking',
        });
        return response;
    }
}