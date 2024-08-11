type BookingQuery = {
    firstname?: string,
    lastname?: string,
    checkin?: string,
    checkout?: string,
}

type BookingRequestData = {
        firstname: string,
        lastname: string,
        totalprice: number,
        depositpaid: boolean,
        bookingdates: {
            checkin: string,
            checkout: string,
        },
        additionalneeds?: string
}

type BookingReturnData = {
    bookingid: number,
    booking: {
        BookingRequestData
    }
}

type BookingId = number;

export {
    BookingQuery,
    BookingRequestData,
    BookingReturnData,
    BookingId
}