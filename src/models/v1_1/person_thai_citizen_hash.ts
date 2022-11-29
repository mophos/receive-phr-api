import { mongoose } from "../../config/database";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({
  cid_hash: String,
  cid: String
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var PersonThaiCitizenHash = mongoose.model("schemaPersonThaiCitizenHash", objSchema, 'person_thai_citizen_hash');

export = PersonThaiCitizenHash;
