import { mongoose } from "../../config/database";
import { Schema } from "mongoose";

// schema
var objPersonDeath = new Schema({
  health_id: String,
date_of_death: String,
cause_of_death: String,
place_of_death: String,
  source: String,
  created_date: { type: Date, default: Date.now }
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var PersonDeath = mongoose.model("schemaPersonDeath", objPersonDeath, 'person_death');

export = PersonDeath;
