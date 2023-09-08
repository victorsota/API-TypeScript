import { Router } from "express";
import { config } from "dotenv";
import { MongoGetUsersRepositories } from "../repositories/get-users/mongo-get-users";
import { GetUsersController } from "../controllers/get-user/get-users";
import { MongoClient } from "../database/mongo";
import { MongoCreateUserRepository } from "../repositories/get-users/create-users/mongo-create-users";
import { CreateUserController } from "../controllers/create-user/create-user";
import { MongoUpdateUserReporsitory } from "../repositories/update-user/mongo-update-user";
import { UpdateUserController } from "../controllers/update-user/update-user";
import { MongoDeleteUserRepository } from "../repositories/delete-user/mongo-delete-user";
import { DeleteUserController } from "../controllers/delete-user/delete-user";

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

    res.status(statusCode).send(body);
  });

  //Criando Usuario
  router.post("/users", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();

    const createUserController = new CreateUserController(
      mongoCreateUserRepository
    );

    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  //Atualizando Usuario
  router.patch("/users/:id", async (req, res) => {
    const mongoUpdateUserRepository = new MongoUpdateUserReporsitory();

    const updateUserController = new UpdateUserController(
      mongoUpdateUserRepository
    );

    const { body, statusCode } = await updateUserController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  //Deletando Usuario
  router.delete("/users/:id", async (req, res) => {
    const mongoDeleteUserRepository = new MongoDeleteUserRepository();

    const deleteUserController = new DeleteUserController(
      mongoDeleteUserRepository
    );

    const { body, statusCode } = await deleteUserController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });
};

main();
