import { BookingRequestData } from '../models/booking-info.model';
import AuthApi from 'api/auth.api';
import BookingApi from 'api/booking.api';
import { beforeAll, describe, expect, it } from 'vitest';
import { FakerUtil } from '../utilities/faker.util';
import JsonUtil from 'utilities/json.util'
import AppSettings from 'constants/app-setttings.const';
const _ = require('lodash');

describe('Room booking', async () => {
    const authApi = new AuthApi();
    let bookingApi;
    let authToken: string;
    let expectedBooking: BookingRequestData = FakerUtil.bookingData();
    let expectedBookingId: number;

    beforeAll(async () => {
        const authToken: string = await JsonUtil.read(AppSettings.AUTH_TOKEN_FILE);
        bookingApi = new BookingApi({ authToken });
    })

    // It is included in the global setup
    it.skip('Should return token', async () => {
        const response = await authApi.createAuthToken({ 'username': 'admin', 'password': 'password123' });
        expect(response.status).toBe(200);
        authToken = response.body.token;

        bookingApi = new BookingApi({ authToken: authToken });
    })

    it('Should return all booking Ids', async () => {
        const response = await bookingApi.getBookingIds();
        expect(response.status).toBe(200);
    })

    it('Should create booking', async () => {
        const response = await bookingApi.createBooking(expectedBooking);
        expect(response.status).toBe(200);

        const returnedBooking = response.body;
        expect(_.isMatch(returnedBooking, expectedBooking));

        expectedBookingId = returnedBooking.bookingid;
    })

    it('Should return booking Ids filtered by first name', async () => {
        const response = await bookingApi.getBookingIds({ firstname: expectedBooking.firstname });
        expect(response.status).toBe(200);
        expect(response.body[0].bookingid === expectedBookingId).toBeTruthy();
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
        const bookingData = { ...expectedBooking, bookingid: expectedBookingId };
        expect(_.isMatch(bookingData, returnedBooking)).toBeTruthy();
    })

    it('Should update booking', async () => {
        const response = await bookingApi.updateBooking(expectedBookingId, { ...expectedBooking, additionalneeds: "Tofu" });
        expect(response.status).toBe(200);

        expect(response.body.additionalneeds).toBe('Tofu');
    })

    it('Should partially update booking', async () => {
        const response = await bookingApi.partialUpdateBooking(expectedBookingId, { firstname: 'Joe', lastname: 'Doe' });
        expect(response.status).toBe(200);

        expect(response.body.firstname).toBe('Joe');
        expect(response.body.lastname).toBe('Doe');
    })

    it('Should delete booking', async () => {
        const response = await bookingApi.deleteBooking(expectedBookingId);
        expect(response.status).toBe(201);
    })
})