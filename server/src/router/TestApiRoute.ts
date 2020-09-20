import AbstractRouter from "./AbstractRouter";
import { Application, Router, Request, Response } from "express";

export default class TestApiRoute extends AbstractRouter {
    constructor(app: Application, router: Router) {
        super(app, router);
        this._app.use(
            "/api",
            this._router.get("/test", (_req: Request, res: Response) => {
                res.json({
                    message: "Api Works"
                });
            })
        );
    }
}
