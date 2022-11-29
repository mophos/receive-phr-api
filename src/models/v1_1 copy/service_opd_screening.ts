import { mongoose } from "../../config/database";
import { Schema } from "mongoose";

// schema
var objServiceOpdScreening = new Schema({
  health_id: String,
  hospcode: String,
  vn: String,
  chief_complain: String,
  bps: String,
  bpd: String,
  weight: String,
  height: String,
  waist: String,
  hearth_rate: String,
  pulse_rate: String,
  respiratory_rate: String,
  temperature: String,
  source: String,
  created_date: { type: Date, default: Date.now }
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var ServiceOpdScreening = mongoose.model("schemaServiceOpdScreening", objServiceOpdScreening, 'service_opd_screening');

export = ServiceOpdScreening;
