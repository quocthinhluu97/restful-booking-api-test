import { Fetch } from '../utilities/fetch.util'

export class BaseApi {
    protected readonly _http: Fetch;

    constructor(headers: any) {
        this._http = new Fetch(headers)
    }
}