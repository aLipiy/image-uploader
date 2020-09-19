// @ts-ignore
import { Application, Request, Response, Router, static } from "express";
import path from "path";

import AbstractRouter, { IAbstractRouter } from "./AbstractRouter";

interface IBaseRouter extends IAbstractRouter {
    setBaseRoute(): void;
}

export default class BaseRoute extends AbstractRouter implements IBaseRouter {
    constructor(app: Application, router: Router) {
        super(app, router);
        this.setBaseRoute();
    }

    setBaseRoute(): void {
        console.log(true);
        // @ts-ignore
        this._app.use("/", static(path.join(__dirname, "../../../", "client", "dist")));
        this._app.get("*", (_req: Request, res: Response) => {
            res.sendFile(path.join(__dirname, "../../../", "client", "dist", "index.html"));
        });
    }
}
