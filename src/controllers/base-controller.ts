import { RouteDescriptor } from "../models/routeDescriptor";
import { Dictionary } from "../models/dictionary";
import { IRouteHandler, RouteHandler } from "../routes";

export abstract class BaseController implements IController{

    routeDescriptors: RouteDescriptor[];

    abstract getRoute(): string;
    getRouter() : any{
        return RouteHandler.getRouter();
    }
    getRouteDescriptors(): RouteDescriptor[] {
        return this.routeDescriptors;
    }


}

export interface IController{
    getRouter() : any;
    getRouteDescriptors(): RouteDescriptor[];
}