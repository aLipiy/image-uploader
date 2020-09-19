import express, { Router } from "express";
import dotenv from "dotenv";
import cors from "cors";

import Server from "./Server";
import Routers from "./router/Routers";

dotenv.config();

const server = new Server(express(), parseInt(process.env.port || ""));
const routeList: string[] = ["/api/upload"];
server.app.use(express.json({ limit: "50mb" }));
server.app.use(express.urlencoded({ limit: "50mb", extended: true }));
server.app.use(
    cors({
        origin: `http://${process.env.host}:8081`
    })
);
new Routers(server.app, Router(), routeList);

server.run();
