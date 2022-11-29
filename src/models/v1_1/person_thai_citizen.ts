import { mongoose } from "../../config/database";
import { Schema } from "mongoose";

// schema
var objPersonThaiCitizen = new Schema({
  cid_hash: String,
  health_id: String,
  source: String,
  created_date: { type: Date, default: Date.now }
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var PersonThaiCitizen = mongoose.model("schemaPersonThaiCitizen", objPersonThaiCitizen, 'person_thai_citizen');

export = PersonThaiCitizen;
