import { RequiredHeaders } from '@models/auth.model';
import { Fetch } from '../utilities/fetch.util'

export class BaseApi {
    protected readonly _http: Fetch;

    constructor(headers?: RequiredHeaders) {
        this._http = new Fetch(headers)
    }
}