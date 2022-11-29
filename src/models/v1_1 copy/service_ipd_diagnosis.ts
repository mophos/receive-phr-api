import { mongoose } from "../../config/database";
import { Schema } from "mongoose";

// schema
var objServiceIpdDiagnosis = new Schema({
  health_id: String,
  hospcode: String,
  vn: String,
  an: String,
  diagnosis_code: String,
  diagnosis_name: String,
  diagnosis_type: String,
  source: String,
  created_date: { type: Date, default: Date.now }
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var ServiceIpdDiagnosis = mongoose.model("schemaServiceIpdDiagnosis", objServiceIpdDiagnosis, 'service_ipd_diagnosis');

export = ServiceIpdDiagnosis;
