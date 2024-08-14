import { ExtendedRequest, ExtendedResponse } from '@models/fetch.model'
import { _Promise } from '@models/result.model';
import { getBody } from '../constants/content-type.const';
import RequestLogger from './request-logger.util';
import { serialize } from 'object-to-formdata';
import { RequiredHeaders } from '../models/auth.model';

export class Fetch {
    private readonly headers: { [key: string]: string }

    constructor(options?: RequiredHeaders) {
        this.headers = {
            'Cookie': options.authToken ? `token=${options.authToken}` : ''
        }
    }

    async get<T>(request: Partial<ExtendedRequest>): _Promise<T> {
        const response = await this.send<T>({
            ...request,
            method: 'GET',
            headers: this.headers
        });

        return response;
    }

    async delete<T>(request: Partial<ExtendedRequest>): _Promise<T> {
        const response = await this.send<T>({
            ...request,
            method: 'DELETE',
            headers: { ...this.headers, 'Content-type': 'application/json' },
        });

        return response;
    }

    async head<T>(request: Partial<ExtendedRequest>): _Promise<T> {
        const response = await this.send<T>({
            ...request,
            method: 'HEAD',
            headers: { ...this.headers, 'Content-type': 'application/json' },
        });

        return response;
    }

    async post<T>(request: Partial<ExtendedRequest>): _Promise<T> {
        const response = await this.send<T>({
            ...request,
            method: 'POST',
            headers: { ...this.headers, 'Content-type': 'application/json' },
            body: JSON.stringify(request.rawBody)
        });

        return response;
    }

    async put<T>(request: Partial<ExtendedRequest>): _Promise<T> {
        const response = await this.send<T>({
            ...request,
            method: 'PUT',
            headers: { ...this.headers, 'Content-type': 'application/json' },
            body: JSON.stringify(request.rawBody)
        });

        return response;
    }

    async patch<T>(request: Partial<ExtendedRequest>): _Promise<T> {
        const response = await this.send<T>({
            ...request,
            method: 'PATCH',
            headers: { ...this.headers, 'Content-type': 'application/json' },
            body: JSON.stringify(request.rawBody)
        });

        return response;
    }

    async postForm<T>(request: Partial<ExtendedRequest>): _Promise<T> {
        const response = await this.send<T>({
            ...request,
            method: 'POST',
            body: serialize(request.rawBody),
            headers: this.headers
        });

        return response;
    }

    async putForm<T>(request: Partial<ExtendedRequest>): _Promise<T> {
        const response = await this.send<T>({
            ...request,
            method: 'PUT',
            body: serialize(request.rawBody),
            headers: this.headers
        });

        return response;
    }

    async send<T>(request: Partial<ExtendedRequest>): _Promise<T> {
        request.method = request.method ?? 'GET';
        const urlObject = new URL(request.url);
        request.pathAndQuery = `${urlObject.pathname}${urlObject.search}`;

        const response = await fetch(request.url, request) as ExtendedResponse;
        await this.processResponse(response);

        await RequestLogger.log(request as ExtendedRequest, response);

        return {
            status: response.status,
            body: response.parsedBody as T,
            root: response
        }
    }

    private async processResponse(response: ExtendedResponse): Promise<void> {
        response.contentType = this.getContentType(response);
        response.parsedBody = await getBody(response);
        response.bodyAsAttachment = await this.getBodyAsAttachment(response);

    }

    private getContentType(response: ExtendedResponse): string {
        return response.headers.get('content-type')?.split(';')[0] ?? '';
    }

    private async getBodyAsAttachment(response: ExtendedResponse): Promise<any> {
        if (response.body instanceof Blob) {
            return Buffer.from(await response.parsedBody.arrayBuffer());
        } else if (response.contentType === 'application/json') {
            return JSON.stringify(response.parsedBody);
        }

        return response.parsedBody;
    }
}