import {
  IUpdateUserRepository,
  UpdateUserParams,
} from "../../controllers/update-user/protocols";
import { ObjectId } from "mongodb";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoUpdateUserReporsitory implements IUpdateUserRepository {
  async updateuser(id: string, params: UpdateUserParams): Promise<User> {
    // Faz atualizacao do usuario
    await MongoClient.db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: { ...params },
      }
    );

    // Busca o usuario atualizado
    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: new ObjectId(id) });

    // Se nao encontrar o usuario, retorna erro
    if (!user) {
      throw new Error("User not found");
    }

    // Retorna o usuario atualizado
    const { _id, ...rest } = user;
    return { id: _id.toHexString(), ...rest };
  }
}
