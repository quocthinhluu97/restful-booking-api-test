import { ExtendedRequest, ExtendedResponse } from "@models/fetch.model";
import * as allure from 'allure-js-commons';
import { asString, generateCsv, mkConfig } from 'export-to-csv';
import formDataToString from 'formdata-to-string'

const seperateLineLength = 120;
export default class RequestLogger {
    static async log(request: ExtendedRequest, response: ExtendedResponse): Promise<void> {
        await allure.step(request.name, async () => {
            console.log();

            // Log request method and query path
            await allure.logStep(`${request.method} ${request.pathAndQuery}`)
            console.log(`${request.method} ${request.pathAndQuery}`);

            // Add request to report 
            await this.attachRequestData(request);
            console.log();

            // Log response status
            await allure.logStep(`${response.status} ${response.statusText}`);
            console.log(`${response.status} ${response.statusText}`);
            console.log();

            // Add response to report 
            await this.attachResponseData(response);

            console.log();
            console.log('-'.repeat(seperateLineLength));
        });
    }

    private static async attachResponseData(response: ExtendedResponse) {
        // Do not parse reponse headers to JSON because it looks urgly in allure reports
        const requestHeaders = this.headersToCsv(response.headers);
        await allure.attachment('Response headers', requestHeaders, 'text/csv');
        console.log('Response', response.headers);
        console.log();

        if (response.bodyAsAttachment) {
            await allure.attachment('Response body', response.bodyAsAttachment, response.contentType ?? 'text/plain');
            console.log('Response body', response.parsedBody instanceof Blob ? '<File>' : response.bodyAsAttachment);
        }
    }

    private static async attachRequestData(request: ExtendedRequest) {
        if (request.headers) {
            const requestHeaders = JSON.stringify(request.headers);
            await allure.attachment('Request headers', requestHeaders, 'application/json');
            console.log('Request headers', requestHeaders);
            console.log();
        }

        if (request.rawBody) {
            let requestBody = typeof request.rawBody === 'string' ? request.rawBody : JSON.stringify(request.rawBody);

            let contentType = 'application/json';

            if (request.body instanceof FormData) {
                requestBody = await formDataToString(request.body);
                contentType = 'text/plain'
            }

            await allure.attachment('Request body', requestBody, contentType);
            console.log('Request body', requestBody, contentType);
        }
    }


    private static headersToCsv(headers: HeadersInit | Headers): string {
        const headerEntries = headers instanceof Headers ? Array.from(headers.entries()) : Object.entries(headers);

        const array = headerEntries
            .filter(([_, value]) => typeof value === 'string')
            .map(([key, value]) => ({ name: key, value: value })) ?? [];

        const csv = generateCsv(this.csvConfig)(array);

        return asString(csv);
    }


    private static readonly csvConfig = mkConfig({ useKeysAsHeaders: true, showColumnHeaders: false });
}
