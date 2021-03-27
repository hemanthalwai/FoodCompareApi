import { ExpressHook } from "../express-typecast";
import { Config } from "../../config/index";
import { BaseController } from "../controllers/base-controller";
import { server } from '../index'
export class RouteHandler implements IRouteHandler{

    private static router: any;
    private config: Config;

    constructor(router: any, config: Config) {
        RouteHandler.router = router;
        this.config = config;
    }
    getRouter(): any {
        return RouteHandler.getRouter();
    }

    static getRouter(): any {
        return RouteHandler.router;
    }

    addRoute(route: string, controller: any) {
        const apiBasePath = this.config.getValue('API_BASEPATH') || '/api';
        const app = server.getApp();
        app.use(apiBasePath + route, controller);
    }
}

export interface IRouteHandler{
    getRouter();
    addRoute(route: string, controller: any)
}