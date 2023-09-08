import validator from "validator";
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
      // verifica se campos obrigatorios estao presentes
      const requiredFields = ["firstname", "email", "password"];
      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreteUserParams]?.length) {
          return {
            statusCode: 400,
            body: `${field} is required`,
          };
        }
      }

      //verificar se email é valido
      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: "Invalid email",
        };
      }

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
