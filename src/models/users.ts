import { mongoose } from "../config/database";
import { Document, Schema } from "mongoose";

// interface
interface IUser extends Document {
  email: String;
  password: String;
  displayName: String;
}

// schema
var userSchema = new Schema({
  email: String,
  password: String,
  displayName: String
});

// model
interface IUserModel extends IUser, mongoose.Document { }

var User = mongoose.model<IUserModel>("Users", userSchema);

export = User;