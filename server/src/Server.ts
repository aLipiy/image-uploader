import { Application } from "express";
import { red } from "chalk";

interface IServer {
    readonly _app: Application;
    readonly _port: number;
    run(): void;
}

class Server implements IServer {
    _app;
    _port;

    constructor(app: Application, port: number) {
        this._app = app;
        this._port = port;
    }

    get app(): Application {
        return this._app;
    }

    run(): void {
        if (this._port) {
            try {
                this._app.listen(this._port, () => {
                    console.log(red(`App has been started on port ${this._port}...`));
                });
            } catch (e) {
                process.exit(1);
                throw new Error(e);
            }
        } else {
            throw new Error("Port is not defined");
        }
    }
}
export default Server;
