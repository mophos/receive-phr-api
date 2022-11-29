import { mongoose } from "../../config/database";
import { Schema } from "mongoose";

// schema
var objServiceOpd = new Schema({
  health_id: String,
  hospcode: String,
  hospname: String,
  hn: String,
  vn: String,
  visit_date: String,
  visit_time: String,
  main_department_name: String,
  sub_department_name: String,
  right_code: String,
  right_name: String,
  an: String,
  diagnosis_text: String,
  source: String,
  created_date: { type: Date, default: Date.now }
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var ServiceOpd = mongoose.model("schemaServiceOpd", objServiceOpd, 'service_opd');

export = ServiceOpd;
