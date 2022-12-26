import * as _ from 'lodash';


const Validator = require('jsonschema').Validator;

Validator.prototype.customFormats.cid = function (input) {
  return input.length == 13 && Number.isInteger(+input);
};
Validator.prototype.customFormats.hospcode = function (input) {
  return input.length == 5 && Number.isInteger(+input);
};

export class ValidateServiceOpdModel {

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
          "hospname": { "type": "string" },
          "hn": { "type": "string", "minLength": 1 },
          "vn": { "type": "string", "minLength": 1 },
          "visit_date": { "type": "string", "format": "date" },
          "visit_time": { "type": "string", "pattern": "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$" },
          "main_department_name": { "type": "string" },
          "sub_department_name": { "type": "string" },
          "right_code": { "type": "string" },
          "right_name": { "type": "string" },
          "an": { "type": "string" },
          "diagnosis_text": { "type": "string" }
        },
        "required": ["cid", "hospcode", "hn", "vn"]
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
        },
        "required": ["cid", "hospcode", "hn", "vn"]
      },
    };
    return v.validate(data, schema);
  }

}