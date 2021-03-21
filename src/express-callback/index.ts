import { Request, Response } from "express";
import { castToHttpRequest } from "../express-typecast";

export const makeExpressCallback = async (controller) => {
    return async(req: Request, res: Response) => {
      const httpRequest = await castToHttpRequest(req);
      try{
        const httpResponse = await controller(httpRequest);
        if(httpResponse.headers)
          res.set(httpResponse.headers)
        res.type('json')
        res.status(httpResponse.statusCode).send(httpResponse.body)
      }
      catch(e){
         res.status(500).send({ error: 'An unkown error occurred.', msg: e.message });
      }

    }
  }