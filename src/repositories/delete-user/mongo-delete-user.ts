import { IDeleteUserRepository } from "../../controllers/delete-user/protocols";
import { ObjectId } from "mongodb";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<User> {
    // Delete user from Mongo
    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not found");
    }

    const { deletedCount } = await MongoClient.db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });

    if (deletecount === 0) {
      throw new Error("User not deleted");
    }

    const { _id, ...res } = user;
    return { id: _id.toHexString(), ...res };
  }
}
