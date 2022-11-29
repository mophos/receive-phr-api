import { mongoose } from "../../config/database";
import { Schema } from "mongoose";

// schema
var objServiceIpd = new Schema({
  health_id: String,
  hospcode: String,
  vn: String,
  an: String,
  admin_date: String,
  admin_time: String,
  discharge_date: String,
  discharge_time: String,
  discharge_reason: String,
  discharge_type: String,
  source: String,
  created_date: { type: Date, default: Date.now }
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var ServiceIpd = mongoose.model("schemaServiceIpd", objServiceIpd, 'service_ipd');

export = ServiceIpd;
