import { BookingRequestData } from '../models/booking-info.model';
import AuthApi from 'api/auth.api';
import BookingApi from 'api/booking.api';
import { describe, expect, it } from 'vitest';
import { FakerUtil } from '../utilities/faker.util';
import { AuthToken } from '../models/auth.model';
const _ = require('lodash');

describe('Room booking', async () => {
    const authApi = new AuthApi();
    let bookingApi;
    let authToken: string;
    let expectedBooking: BookingRequestData = FakerUtil.bookingData();
    let expectedBookingId: number;

    it('Should return token', async () => {
        const response = await authApi.createAuthToken({ 'username': 'admin', 'password': 'password123' });
        expect(response.status).toBe(200);
        authToken = response.root.parsedBody.token;

        bookingApi = new BookingApi({ authToken: authToken });
    })

    it('Should return all booking Ids', async () => {
        const response = await bookingApi.getBookingIds();
        expect(response.status).toBe(200);
    })

    it('Should create booking', async () => {
        const response = await bookingApi.createBooking(expectedBooking);
        expect(response.status).toBe(200);

        const returnedBooking = response.root.parsedBody;
        expect(_.isMatch(returnedBooking, expectedBooking));

        expectedBookingId = returnedBooking.bookingid;
    })

    it('Should return booking Ids filtered by first name', async () => {
        const response = await bookingApi.getBookingIds({ firstname: expectedBooking.firstname });
        expect(response.status).toBe(200);
        expect(response.root.parsedBody[0].bookingid === expectedBookingId).toBeTruthy();
    })

    it('Should return all booking Ids filtered by date', async () => {
        const response = await bookingApi.getBookingIds(
            {
                checkin: expectedBooking.bookingdates.checkin,
                checkout: expectedBooking.bookingdates.checkout
            }
        );
        expect(response.status).toBe(200);
    })

    it('Should return booking data by id', async () => {
        const response = await bookingApi.getBookingById(expectedBookingId);
        expect(response.status).toBe(200);

        const returnedBooking = response.body;
        const bookingData = { booking: { ...expectedBooking }, bookingid: expectedBookingId };
        expect(_.isMatch(bookingData, returnedBooking)).toBeTruthy();
    })

    it('Should update booking', async () => {
        const response = await bookingApi.updateBooking(expectedBookingId, { ...expectedBooking, additionalneeds: "Tofu" });
        expect(response.status).toBe(200);

        expect(response.root.parsedBody.additionalneeds).toBe('Tofu');
    })
})