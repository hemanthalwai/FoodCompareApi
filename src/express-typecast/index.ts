import { Request, Response } from "express";
import { HttpResponse } from "../models/httpResponse";
import { HttpRequest } from "../models/httpRequest";
import { IHttpRequest } from "../models/httpRequest.interface";
import { IHttpResponse } from "../models/httpResponse.interface";

export const castToHttpRequest = async (req: Request): Promise<IHttpRequest> => {
    const httpRequest = {
        body: req.body,
        query: req.query,
        params: req.params,
        ip: req.ip,
        method: req.method,
        path: req.path,
        headers: {
          'Content-Type': req.get('Content-Type'),
          Referer: req.get('referer'),
          'User-Agent': req.get('User-Agent')
        }
      }
      return new HttpRequest(httpRequest);
}

export const castToExpressResponse = async (httpResponse: IHttpResponse, res: Response) : Promise<void> => {
    res.status(httpResponse.getStatusCode());
    res.statusMessage = httpResponse.getContent();
}

export const castToHttpResponse = async (res: Response) : Promise<IHttpResponse> => {
  const httpResponse = {
      headers: res.header,
      ok: null,
      redirected: null,
      status: null,
      statusText: null,
      trailer: null,
      type: null,
      url: null
    }
    return new HttpResponse(httpResponse);
}

export type ExpressHook = (req: IHttpRequest, res: IHttpResponse) => Promise<void>