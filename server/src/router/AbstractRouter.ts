import { Application, Router } from "express";

export interface IAbstractRouter {
    readonly _app: Application;
    readonly _router: Router;
    readonly routesArray?: string[];
    readonly route?: string;
}

export default class AbstractRouter implements IAbstractRouter {
    _app;
    _router;
    routesArray;
    route;
    constructor(app: Application, router: Router, routesArray?: string[], route?: string) {
        this._app = app;
        this._router = router;
        this.routesArray = routesArray;
        this.route = route;
    }
}
