import { mongoose } from "../../config/database";
import { Schema } from "mongoose";

// schema
var objServiceOpdDrug = new Schema({
  health_id: String,
  hospcode: String,
  vn: String,
  diagnosis_code: String,
  diagnosis_name: String,
  diagnosis_type: String,
  source: String,
  created_date: { type: Date, default: Date.now }
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var ServiceOpdDrug = mongoose.model("schemaServiceOpdDrug", objServiceOpdDrug, 'service_opd_drug');

export = ServiceOpdDrug;
