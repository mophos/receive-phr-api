import { mongoose } from "../../config/database";
import { Schema } from "mongoose";

// schema
var objPersonIdentity = new Schema({
  health_id: String,
  birthdate: String,
  gender: String,
  rh_blood_group: String,
  blood_group: String,
  source: String,
  created_date: { type: Date, default: Date.now }
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var PersonIdentity = mongoose.model("schemaPersonIdentity", objPersonIdentity, 'person_identity');

export = PersonIdentity;
