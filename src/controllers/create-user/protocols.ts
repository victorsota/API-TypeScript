import { User } from "../../models/user";

export interface CreteUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createuser(params: CreteUserParams): Promise<User>;
}
