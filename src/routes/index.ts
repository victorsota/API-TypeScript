import { Router } from "express";
import { config } from "dotenv";
import { MongoGetUsersRepositories } from "../repositories/get-users/mongo-get-users";
import { GetUsersController } from "../controllers/get-user/get-users";
import { MongoClient } from "../database/mongo";

config();
export const router = Router();

const main = async () => {
  await MongoClient.connect();

  router.get("/users", async (req, res) => {
    const mongoGetUsersRepositories = new MongoGetUsersRepositories();
    const getUsersController = new GetUsersController(
      mongoGetUsersRepositories
    );

    const { body, statusCode } = await getUsersController.handle();

    res.send(body).status(statusCode);
  });
};

main();
