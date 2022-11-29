import { mongoose } from "../../config/database";
import { Schema } from "mongoose";

// schema
var objPersonEmail = new Schema({
  health_id: String,
  email: String,
  source: String,
  created_date: { type: Date, default: Date.now }
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var PersonEmail = mongoose.model("schemaPersonEmail", objPersonEmail, 'person_email');

export = PersonEmail;
