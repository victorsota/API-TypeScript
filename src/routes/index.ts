import { Router } from "express";
import { config } from "dotenv";

config();

export const router = Router();

router.get("/", (req, res) => res.send("API COM EXPRESS E TS"));
