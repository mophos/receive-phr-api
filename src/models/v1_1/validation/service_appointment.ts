import * as _ from 'lodash';


const Validator = require('jsonschema').Validator;

Validator.prototype.customFormats.cid = function (input) {
  return input.length == 13 && Number.isInteger(+input);
};
Validator.prototype.customFormats.hospcode = function (input) {
  return input.length == 5 && Number.isInteger(+input);
};

export class ValidateServiceAppointmentModel {

  async validation(data) {
    let v = new Validator();
    let schema = {
      // "id": "/id",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "cid": { "type": "string", "format": "cid" },
          "hospcode": { "type": "string", "format": "hospcode" },
          "vn": { "type": "string", "minLength": 1 },
          "appointment_date": { "type": "string", "format": "date" },
          "appointment_start_time": { "type": "string", "pattern": "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$" },
          "appointment_end_time": { "type": "string", "pattern": "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$" },
          "cause": { "type": "string" },
          "sub_department_name": { "type": "string" },
          "note": { "type": "string" }
        },
        "required": ["cid", "hospcode", "vn", "appointment_date"]
      },
    };
    return v.validate(data, schema, { nestedErrors: true });
  };

  async validateRemove(data: any) {
    let v = new Validator();
    let schema = {
      // "id": "/id",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "cid": { "type": "string", "format": "cid" },
          "hospcode": { "type": "string", "format": "hospcode" },
          "vn": { "type": "string", "minLength": 1 },
          "appointment_date": { "type": "string", "minLength": 1 },
        },
        "required": ["cid", "hospcode", "vn", "appointment_date"]
      },
    };
    return v.validate(data, schema);
  }

}