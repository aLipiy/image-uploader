import express, { Router } from "express";
import dotenv from "dotenv";
import cors from "cors";

import Server from "./Server";
import Routers from "./router/Routers";

dotenv.config();

const server = new Server(express(), parseInt(process.env.port || ""));
const routeList: string[] = ["/api/upload"];
server.app.use(express.json());
server.app.use(
    cors({
        origin: `http://${process.env.host}:${process.env.port}`,
    })
);
new Routers(server.app, Router(), routeList);

server.run();
