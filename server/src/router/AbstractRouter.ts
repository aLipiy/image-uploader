import { Application, Router } from "express";

export default class AbstractRouter {
    _app: Application;
    _router: Router;
    routesArray: string[] | undefined;
    route: string | undefined;
    constructor(app: Application, router: Router, routesArray?: string[], route?: string) {
        this._app = app;
        this._router = router;
        this.routesArray = routesArray;
        this.route = route;
    }
}
