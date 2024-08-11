type ExtendedRequest = RequestInit & {
    name: string,
    url: string,
    pathAndQuery: string,
    rawBody: any
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