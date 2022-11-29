import { mongoose } from "../../config/database";
import { Schema } from "mongoose";

// schema
var objPersonInfo = new Schema({
  "health_id": String,
  "birthdate": String,
  "gender": String,
  "rh_blood_group": String,
  "blood_group": String,
  "title_code": String,
  "title_name": String,
  "first_name": String,
  "middle_name": String,
  "last_name": String,
  "nationality_code": String,
  "nationality_name": String,
  "marital_status_code": String,
  "marital_status_name": String,
  "viability_code": String,
  "viability_name": String,
  "death": {
    "date_of_death": String,
    "cause_of_death": String,
    "place_of_death": String
  }, "telephone": [
    {
      "no": String,
      "type": String,
      "ext": String
    }
  ],
  "email": [
    ""
  ],
  created_date: { type: Date, default: Date.now }
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var PersonInfo = mongoose.model("schemaPersonInfo", objPersonInfo, 'person_info');

export = PersonInfo;
