import { mongoose } from "../../config/database";
import { Schema } from "mongoose";

// schema
var objServiceOpdDiagnosis = new Schema({
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

var ServiceOpdDiagnosis = mongoose.model("schemaServiceOpdDiagnosis", objServiceOpdDiagnosis, 'service_opd_diagnosis');

export = ServiceOpdDiagnosis;
