import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  CreteUserParams,
  ICreateUserController,
  ICreateUserRepository,
} from "./protocols";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreteUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      //verificar existencia do body
      if (!httpRequest.body) {
        return {
          statusCode: 400,
          body: "Body is required",
        };
      }
      const user = await this.createUserRepository.createuser(httpRequest.body);

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Internal server error",
      };
    }
  }
}
