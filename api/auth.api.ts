import { AuthInfo, AuthToken, RequiredHeaders } from "@models/auth.model";
import { BaseApi } from "./base.api"
import Urls from "constants/urls.const";

export default class AuthApi extends BaseApi {
    constructor() {
        super({} as RequiredHeaders);
    }

    async createAuthToken(authInfo: AuthInfo) {
        const response = await this._http.post<AuthToken>({
           url: `${Urls.AuthService}`, 
           name: 'Create auth token',
           rawBody: authInfo
        });

        return response;
    }
}