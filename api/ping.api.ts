import { RequiredHeaders } from "@models/auth.model";
import { BaseApi } from "./base.api"
import Urls from "constants/urls.const";

export default class PingApi extends BaseApi {
    constructor() {
        super({} as RequiredHeaders);
    }

    async pingCheck() {
        const response = await this._http.get<void>({
            url: `${Urls.PingService}`,
            name: 'Ping check',
        });

        return response;
    }
}