import express from "express";
import cors from "cors";
import logger from "morgan";

import { router } from "./routes/index";
/**
 *
 * CRIACAO DO APP
 */

export const app = express();

app.use(express.json());

/**
 *
 * CRIACAO DO MIDLE
 */

app.use(express.json());
app.use(cors());
app.use(logger("dev"));

/**
 *
 * Integra o endpoint na aplicacao
 */

app.use("/", router);
