import express from "express";
class Server {
    _app;
    constructor(app: express.Application) {
        this._app = app;
    }

    run() {
        this._app.listen(3000, () => {
            console.log("3000");
        });
    }
}
export default Server;
