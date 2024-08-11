import { ExtendedRequest, ExtendedResponse } from "@models/fetch.model";
import * as allure from 'allure-js-commons';
import { asString, generateCsv, mkConfig } from 'export-to-csv';
import formDataToString from 'formdata-to-string'

export default class RequestLogger {
    static async log(request: ExtendedRequest, response: ExtendedResponse): Promise<void> {
        // console.log('Request headers', JSON.stringify(request.headers));
        // console.log('Request payload', response.parsedBody);


        await allure.step(request.name, async () => {
            await allure.logStep(`${request.method} ${request.pathAndQuery}`);
            console.log(`${request.method} ${request.pathAndQuery}`);

            if (request.headers) {
                const requestHeaders = RequestLogger.headersToCsv(request.headers);
                await allure.attachment('Request headers', requestHeaders, 'text/csv');
                console.log('Request headers', JSON.stringify(request.headers));
            }

            if (request.rawBody) {
                let attachment = JSON.stringify(request.rawBody);
                let contentType = 'text/plain';

                if (request.body instanceof FormData) {
                    attachment = await formDataToString(request.body);
                }

                await allure.attachment('Request payload', attachment, contentType);
                console.log('Request payload', attachment, contentType);
            }

            await allure.logStep(`${response.status} ${response.statusText}`);
            console.log(`${response.status} ${response.statusText}`);

           const requestHeaders = RequestLogger.headersToCsv(response.headers) ;
           await allure.attachment('Response headers', requestHeaders, 'text/csv');
           console.info('Response', response.headers);

            if (response.bodyAsAttachment) {
                await allure.attachment('Response body', response.bodyAsAttachment, response.contentType ?? 'text/plain');
                console.info('Response body', response.parsedBody instanceof Blob ? '<File>' : response.bodyAsAttachment);
            }
        });

    }

    private static headersToCsv(headers: HeadersInit | Headers): string {
        const headerEntries = headers instanceof Headers ? Array.from(headers.entries()) : Object.entries(headers);

        const array = headerEntries
            .filter(([_, value]) => typeof value === 'string') 
            .map(([key, value]) => ({ name: key, value: value})) ?? [];

        const csv = generateCsv(this.csvConfig)(array);

        return asString(csv);
    }

    private static readonly csvConfig = mkConfig( { useKeysAsHeaders: true, showColumnHeaders: false});
}
