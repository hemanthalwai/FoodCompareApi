import { HTTP_METHOD_TYPE } from "./httpMethodType";
import { IHttpRequest } from "./httpRequest.interface";
import { IHttpResponse } from "./httpResponse.interface";

export type RouteDescriptor = {
    httpMethodType: HTTP_METHOD_TYPE ;
    route?: string;
    method: (req: IHttpRequest, res: IHttpResponse) => Promise<void>;
};