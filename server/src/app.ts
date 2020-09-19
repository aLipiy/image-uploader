import express from "express";

import Server from "./classes/Server";

let server = new Server(express());
server.run();
