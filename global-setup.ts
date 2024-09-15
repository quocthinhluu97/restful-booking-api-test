import AuthApi from 'api/auth.api';
import { beforeAll } from 'vitest';
import JsonUtil from 'utilities/json.util'
import AppSettings from 'constants/app-setttings.const';
import { AuthInfo } from '@models/auth.model';

beforeAll(async () => {
    const authApi = new AuthApi();
    let authToken: string;

    const authData:AuthInfo = await JsonUtil.read(AppSettings.AUTH_DATA_FILE);
    const response = await authApi.createAuthToken(authData);
    authToken = response.body.token;

    await JsonUtil.write(AppSettings.AUTH_TOKEN_FILE, authToken);
});