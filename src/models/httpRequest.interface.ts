import { Dictionary } from './dictionary';

export interface IHttpRequest{
    getParam(key: string): string;
    getParams(): Dictionary<string>;
    getBody(): any;
    getHeaders(): any;
    getHeader(key: string): string
}