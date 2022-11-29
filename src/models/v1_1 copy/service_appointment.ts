import { mongoose } from "../../config/database";
import { Schema } from "mongoose";

// schema
var objServiceOpdAppointment = new Schema({
  health_id: String,
  hospcode: String,
  vn: String,
  appointment_date: String,
  appointment_start_time: String,
  appointment_end_time: String,
  cause: String,
  sub_department_name: String,
  note: String,
  source: String,
  created_date: { type: Date, default: Date.now }
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var ServiceOpdAppointment = mongoose.model("schemaServiceOpdAppointment", objServiceOpdAppointment, 'service_opd_appointment');

export = ServiceOpdAppointment;
