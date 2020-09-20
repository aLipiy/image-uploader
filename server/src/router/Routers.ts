import UploadRouters from "./UploadRouters";
import BaseRoute from "./BaseRoute";
import TestApiRoute from "./TestApiRoute";
import { Application, Router } from "express";

export default class Routers {
    _app: Application;
    _router: Router;
    routeArray: string[] | undefined;
    constructor(app: Application, router: Router, routeArray?: string[]) {
        this._app = app;
        this._router = router;
        this.routeArray = routeArray;
    }

    init() {
        if (process.env.NODE_ENV === "production") {
            new BaseRoute(this._app, this._router);
        }
        new TestApiRoute(this._app, this._router);
        if (this.routeArray?.length) {
            const uploadRoute = this.routeArray.find(item => item.includes("upload"));
            new UploadRouters(this._app, this._router, uploadRoute);
        }
    }
}
