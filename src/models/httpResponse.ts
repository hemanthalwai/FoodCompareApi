import {  Dictionary } from './dictionary';
import { IHttpResponse } from './httpResponse.interface';

export class HttpResponse implements IHttpResponse{

        private headers: any;
        private statusCode: number;
        private content: any;
        private contentType: string;

    constructor(res: {
        headers: any,
        ok: boolean,
        redirected: boolean,
        status: number,
        statusText: string,
        trailer: Promise<Headers>,
        type: ResponseType,
        url: string,
    }) {
        this.setContent(res.statusText);
        this.setHeaders(res.headers);
        this.setStatusCode(res.status);
        this.setContentType(res.type);
    }
    getContentType() {
        return this.contentType;
    }
    getContent() {
        return this.content;
    }
    getStatusCode(): number {
        return this.statusCode;
    }
    setHeaders(headers: Dictionary<string> | any): void {
        this.headers = headers;
    }
    setContent(content: any): void {
        this.content = content;
    }
    setStatusCode(statusCode: number): void {
        this.statusCode = statusCode;
    }
    setHeader(key: string, value: string): void {
        this.headers[key] = value;
    }
    setContentType(contentType: string): void {
        this.contentType = contentType;
    }

}
