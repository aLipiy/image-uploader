import AbstractRouter, { IAbstractRouter } from "./AbstractRouter";
import { Application, Router, Request, Response } from "express";
// @ts-ignore
import multer from "multer";

const upload = multer({ dest: "" }).single("image");

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
            this._router.post("", upload, (req: Request, res: Response) => {
                try {
                    // @ts-ignore
                    const { file } = req;
                    console.log(file);
                    res.status(200).json({
                        message: "works"
                    });
                } catch (e) {
                    res.status(500).json({
                        message: "server error"
                    });
                }
            })
        );
    }
}
