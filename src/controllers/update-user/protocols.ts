import { User } from "../../models/user";

export interface UpdateUserParams {
  firstname: string;
  lastnbame: string;
  password: string;
}
export interface IUpdateUserRepository {
  updateuser(id: string, params: UpdateUserParams): Promise<User>;
}
