import { mongoose } from "../../config/database";
import { Schema } from "mongoose";

// schema
var objPersonTelephone = new Schema({
  health_id: String,
  telephone: String,
  type: String,
  ext: String,
  source: String,
  created_date: { type: Date, default: Date.now }
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var PersonTelephone = mongoose.model("schemaPersonTelephone", objPersonTelephone, 'person_telephone');

export = PersonTelephone;
