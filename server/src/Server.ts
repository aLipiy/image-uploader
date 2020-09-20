import { Application, Router } from "express";
import { red } from "chalk";
import Routers from "./router/Routers";
import Database from "./Database";

class Server {
    _app: Application;
    _router: Router;
    _db: FirebaseFirestore.Firestore | null;

    constructor(app: Application, private _port: number, router: Router) {
        this._app = app;
        this._router = router;
        this._db = null;
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

    setUpRoutes(routeList: string[]): void {
        const routers = new Routers(this._app, this._router, routeList);
        routers.init();
    }
    async setUpDatabase(): Promise<any> {
        try {
            const database = new Database();
            await database.init();
            this._db = database.db;
        } catch (e) {
            throw new Error(e);
        }
    }
}
export default Server;
