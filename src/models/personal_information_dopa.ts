import { mongoose } from "../config/database";
import { Document, Schema } from "mongoose";

// schema
var userSchema = new Schema({
  pid: String,
  pid_digit: String,
  birthday: String,
  first_name: String,
  last_name: String,
  source: String,
  dopa_date: { type: Date, default: Date.now }
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var PersonalInformationDopa = mongoose.model("schemaPersonalInformationDopa", userSchema, 'personal_information');

export = PersonalInformationDopa;
