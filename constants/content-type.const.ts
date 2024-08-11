import { ExtendedResponse } from "@models/fetch.model"

const FnFetchByContentTypes = [
    { contentType: /^application\/json$/i, fn: async (response: ExtendedResponse) => await response.json() },
    { contentType: /^application\//i, fn: async (response: ExtendedResponse) => await response.text() },
    { contentType: /^text\//i, fn: async (response: ExtendedResponse) => await response.text() },
    { contentType: /^image\//i, fn: async (response: ExtendedResponse) => await response.blob() },
    { contentType: /^$/, fn: async (response: ExtendedResponse) => await response.text() },
];

const getBody = async (response: ExtendedResponse): Promise<any> => {
    const match = FnFetchByContentTypes.find((fn) => fn.contentType.test(response.contentType));

    if (match) {
        return await match.fn(response);
    }

    return Promise.reject(`Content type ${response.contentType} is not supported`);
}

export {
    getBody
}