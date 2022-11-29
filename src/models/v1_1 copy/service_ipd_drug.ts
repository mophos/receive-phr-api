import { mongoose } from "../../config/database";
import { Schema } from "mongoose";

// schema
var objServiceIpdDrug = new Schema({
  health_id: String,
  hospcode: String,
  vn: String,
  an: String,
  drug_code: String,
  drug_name: String,
  qty: String,
  unit_code: String,
  unit_name: String,
  usage: String,
  source: String,
  created_date: { type: Date, default: Date.now }
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var ServiceIpdDrug = mongoose.model("schemaServiceIpdDrug", objServiceIpdDrug, 'service_ipd_drug');

export = ServiceIpdDrug;
