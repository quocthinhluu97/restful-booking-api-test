import { ExtendedResponse } from "./fetch.model";

type _Promise<T> = Promise<HttpResponse<T>>;

interface HttpResponse<T> {
    status: number,
    body: T,
    root: ExtendedResponse
}

export {
    HttpResponse,
    _Promise
}