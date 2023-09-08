import { IGetUsersRepository } from "../../controllers/get-user/protocols";

export class MongoGetUsersRepositories implements IGetUsersRepository {
  async getUsers() {
    return [
      {
        firstName: "Victor",
        lastName: "Gabriel",
        email: "victorgarbielfrancisco@gmail.com",
        password: "any_password",
      },
    ];
  }
}
