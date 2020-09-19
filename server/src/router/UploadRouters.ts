import AbstractRouter, { IAbstractRouter } from "./AbstractRouter";
import { Application, Router, Request, Response } from "express";

interface IUploadRouters extends IAbstractRouter {}

export default class UploadRouters extends AbstractRouter implements IUploadRouters {
    constructor(app: Application, router: Router, route: string | undefined) {
        super(app, router, undefined, route);
        console.log(this.route);
        if (this.route) this.setRoute(this.route);
    }
    private setRoute(route: string): void {
        this._app.use(
            route,
            this._router.post("", (req: Request, res: Response) => {
                console.log(req.body);
                res.json({
                    message: "works",
                });
            })
        );
    }
}
