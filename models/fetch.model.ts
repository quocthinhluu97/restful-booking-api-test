type ExtendedRequest = RequestInit & {
    name: string, // used for allure report
    url: string,
    pathAndQuery: string,
    rawBody: any,
    disableLogging: boolean
}

type ExtendedResponse = Response & {
    parsedBody: any,
    bodyAsAttachment: string | Buffer,
    contentType: string
}

export {
    ExtendedRequest,
    ExtendedResponse
}