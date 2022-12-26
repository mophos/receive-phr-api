import { mongoose } from "../../config/database";
import { Schema } from "mongoose";

// schema
var objServices = new Schema({

  "health_id": String,
  "hospcode": String,
  "hospname": String,
  "hn": String,
  "vn": String,
  "visit_date": String,
  "visit_time": String,
  "main_department_name": String,
  "sub_department_name": String,
  "right_code": String,
  "right_name": String,
  "an": String,
  "diagnosis_text": String,
  "screening": {
    "chief_complain": String,
    "bps": String,
    "bpd": String,
    "weight": String,
    "height": String,
    "waist": String,
    "hearth_rate": String,
    "pulse_rate": String,
    "respiratory_rate": String,
    "temperature": String
  },
  "diagnosis": [
    {
      "diagnosis_code": String,
      "diagnosis_name": String,
      "diagnosis_type": String
    }
  ],
  "drugs": [
    {
      "drug_code": String,
      "drug_name": String,
      "qty": String,
      "unit_code": String,
      "unit_name": String,
      "usage": String
    }
  ],
  "appointment": [
    {
      "appointment_date": String,
      "appointment_start_time": String,
      "appointment_end_time": String,
      "cause": String,
      "sub_department_name": String,
      "note": String
    }
  ],
  "ipd": {
    "an": String,
    "admin_date": String,
    "admin_time": String,
    "discharge_date": String,
    "discharge_time": String,
    "discharge_reason": String,
    "discharge_type": String,
    "diagnosis": [
      {
        "diagnosis_code": String,
        "diagnosis_name": String,
        "diagnosis_type": String
      }
    ],
    "drugs": [
      {
        "drug_code": String,
        "drug_name": String,
        "qty": String,
        "unit_code": String,
        "unit_name": String,
        "usage": String
      }
    ]
  }
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var Services = mongoose.model("schemaServices", objServices, 'services');

export = Services;
