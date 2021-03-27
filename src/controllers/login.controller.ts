import { RouteHandler } from "../routes";
import { LoginUser } from "../models/loginuser";
import { BaseController } from "./base-controller";
import { IHttpRequest } from "../models/httpRequest.interface";
import { IHttpResponse } from "../models/httpResponse.interface";
import { ExpressHook } from "../express-typecast";
import { HTTP_METHOD_TYPE } from '../models/httpMethodType';
import { RouteDescriptor } from "../models/routeDescriptor";

class LoginController extends BaseController{

    constructor() {
        super();
    }

    getRoute(): string {
        return '/login';
    }

    login: ExpressHook = async (req: IHttpRequest, res: IHttpResponse) => {
        const { email, pwd } = req.getBody();
        if(email === pwd)
            console.log('Login successful');
        res.setStatusCode(200);
        res.setContent('Login successful');
    }
    routeDescriptors = [
        { route: 'test', httpMethodType: HTTP_METHOD_TYPE.POST, method: this.login }
    ];
}
const loginController =  Object.freeze(new LoginController());

export {loginController};