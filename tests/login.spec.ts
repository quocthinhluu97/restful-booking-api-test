import AuthApi from 'api/auth.api';
import { describe, expect, it } from 'vitest';

describe('Login', () => {
    const authApi = new AuthApi();

    it('Should return token', async () => {
        const response = await authApi.createAuthToken({ 'username': 'admin', 'password': 'password123'});
        console.log( response.body );
    })
})