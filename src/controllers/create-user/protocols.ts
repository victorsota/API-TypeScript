import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface ICreateUserController {
  handle(
    httpRequest: HttpRequest<CreteUserParams>
  ): Promise<HttpResponse<User>>;
}

export interface CreteUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createuser(params: CreteUserParams): Promise<User>;
}
