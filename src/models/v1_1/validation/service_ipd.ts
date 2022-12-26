import * as _ from 'lodash';


const Validator = require('jsonschema').Validator;

Validator.prototype.customFormats.cid = function (input) {
  return input.length == 13 && Number.isInteger(+input);
};
Validator.prototype.customFormats.hospcode = function (input) {
  return input.length == 5 && Number.isInteger(+input);
};

export class ValidateServiceIpdModel {

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
          "an": { "type": "string", "minLength": 1 },
          "admit_date": { "type": "string" },
          "admit_time": { "type": "string" },
          "discharge_date": { "type": "string" },
          "discharge_time": { "type": "string" },
          "discharge_reason": { "type": "string" },
          "discharge_type": { "type": "string" }
        },
        "required": ["cid", "hospcode", "vn", "an"]
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
          "an": { "type": "string", "minLength": 1 },
        },
        "required": ["cid", "hospcode", "vn", "an"]
      },
    };
    return v.validate(data, schema);
  }

}