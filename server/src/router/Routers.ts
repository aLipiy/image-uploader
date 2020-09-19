// import AbstractRouter from "./AbstractRouter";
import UploadRouters from "./UploadRouters";
import BaseRoute from "./BaseRoute";
import TestApiRoute from "./TestApiRoute";
import { Application, Router } from "express";

export default class Routers {
    constructor(app: Application, router: Router, routeArray?: string[]) {
        if (process.env.NODE_ENV === "production") {
            new BaseRoute(app, router);
        }
        new TestApiRoute(app, router);
        if (routeArray?.length) {
            const uploadRoute = routeArray.find((item) => item.includes("upload"));
            new UploadRouters(app, router, uploadRoute);
        }
    }
}
