import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  username: String;
  password: String;
}

export interface IUserModel extends Model<IUser> {
  findAllByUsername(username: string): Promise<IUser[]>
}

const schema = new Schema({
  username: String,
  password: String,
  create: {
    type: Date,
    "default": Date.now
  },
  description: String
});

schema.static("findAllByUsername", (username: string) => {

  return User
    .find({ username: username })
    .lean()
    .exec();
});

export const User = mongoose.model<IUser>("Users", schema) as IUserModel;