import express, { Router } from "express";
import dotenv from "dotenv";
import cors from "cors";

import Server from "./Server";

dotenv.config();

const routeList: string[] = ["/api/upload"];

const start = async () => {
    try {
        const server = new Server(express(), parseInt(process.env.port || ""), Router());
        await server.setUpDatabase();
        server.app.use(express.json({ limit: "50mb" }));
        server.app.use(express.urlencoded({ limit: "50mb", extended: true }));
        server.app.use(
            cors({
                origin: `http://${process.env.host}:${process.env.port}`
            })
        );
        server.setUpRoutes(routeList);
        server.run();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};
start();
