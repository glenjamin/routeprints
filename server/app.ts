import express from "express";
import cookieParser from "cookie-parser";

import linkto from "linkto";

import stravaRoutes from "./strava";

import config from "./config";

const app = express();

app.enable("trust proxy");

app.use(cookieParser(config.cookieSecret));
app.use(linkto());

app.use("/strava", stravaRoutes);

export default app;
