import { Config } from "../../config/index";
import { BaseController } from "../controllers/base-controller";

export class RouteHandler implements IRouteHandler{

    private static router: any;
    private config: Config;

    constructor(router: any, config: Config) {
        RouteHandler.router = router;
        this.config = config;
    }
    getRouter() {
        throw new Error("Method not implemented.");
    }

    static getRouter(): any {
        return RouteHandler.router;
    }

    addRoute = (route: string, controller: BaseController) => {
        const apiBasePath = this.config.getValue('API_BASEPATH') || '';
        RouteHandler.router.use(apiBasePath + route, controller);
    }
}

export interface IRouteHandler{
    getRouter();
    addRoute(route: string, controller: BaseController)
}