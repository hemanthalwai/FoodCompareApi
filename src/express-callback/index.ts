import { Request, Response, Router } from "express";
import { IHttpRequest } from "../models/httpRequest.interface";
import { IHttpResponse } from "../models/httpResponse.interface";
import { castToHttpRequest, castToHttpResponse, ExpressHook } from "../express-typecast";
import { RouteDescriptor } from "../models/routeDescriptor";
import { HTTP_METHOD_TYPE } from "../models/httpMethodType";
import { IController } from "../controllers/base-controller";

export const makeExpressCallback = (controller: ExpressHook) => {
    return async(req: Request, res: Response) => {
      const httpRequest = await castToHttpRequest(req);
      const httpResponse = await castToHttpResponse(res);
      try{
        await controller(httpRequest, httpResponse);
        res.type(httpResponse.getContentType() || 'json');
        res.status(httpResponse.getStatusCode()).send(httpResponse.getContent());
      }
      catch(e){
         res.status(500).send({ error: 'An unkown error occurred.', msg: e.message });
      }

    }
  }

export const registerRoutes = (controller: IController): any => {
  const router = controller.getRouter();
  const apiRoutes = controller.getRouteDescriptors();

  apiRoutes.forEach((currentItem:RouteDescriptor) => {
    if(!currentItem.route)
      currentItem.route = '';
    switch(currentItem.httpMethodType){
      case HTTP_METHOD_TYPE.POST:
        router.post(`/${currentItem.route}`, makeExpressCallback(currentItem.method));
        break;
      case HTTP_METHOD_TYPE.GET:
        router.get(`/${currentItem.route}`, makeExpressCallback(currentItem.method));
        break;
    }
  });
  return router;
}