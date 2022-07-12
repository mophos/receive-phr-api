import { mongoose } from "../config/database";
import { Document, Schema } from "mongoose";

// schema
var userSchema = new Schema({
  pid: String,
  birthday: String,
  blood_group: String,
  prename: String,
  first_name: String,
  middle_name: String,
  last_name: String,
  home_phone: String,
  phone_number: String,
  nationality: String
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var PersonalInformation = mongoose.model("Person", userSchema, 'personal_information');

export = PersonalInformation;
