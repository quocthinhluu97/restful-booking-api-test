type _Promise<T> = Promise<HttpResponse<T>>;

interface HttpResponse<T> {
    status: number,
    body: T,
    root: Response
}

export {
    HttpResponse,
    _Promise
}