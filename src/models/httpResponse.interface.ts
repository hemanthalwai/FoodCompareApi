import {  Dictionary } from './dictionary';

export interface IHttpResponse{
    setContent(content: any): void;
    getContent(): any;
    setStatusCode(statusCode: number): void;
    getStatusCode(): number;
    setHeader(key: string, value: string): void;
    setHeaders(headers: Dictionary<string> | any): void;
    setContentType(contentType: string): void;
    getContentType(): string;
}