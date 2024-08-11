type AuthInfo = {
    username: string,
    password: string
}

type AuthToken = { token: string };

type RequiredHeaders = { authToken: string };

export {
    AuthInfo,
    AuthToken,
    RequiredHeaders
}
