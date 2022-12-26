import * as _ from 'lodash';


const Validator = require('jsonschema').Validator;

Validator.prototype.customFormats.cid = function (input) {
  return input.length == 13 && Number.isInteger(+input);
};
Validator.prototype.customFormats.hospcode = function (input) {
  return input.length == 5 && Number.isInteger(+input);
};

export class ValidateServiceOpdScreeningModel {

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
              "chief_complain": { "type": "string" },
              "bps": { "type": "string" },
              "bpd": { "type": "string" },
              "weight": { "type": "string" },
              "height": { "type": "string" },
              "waist": { "type": "string" },
              "hearth_rate": { "type": "string" },
              "pulse_rate": { "type": "string" },
              "respiratory_rate": { "type": "string" },
              "temperature": { "type": "string" }
          },
          "required": ["cid", "hospcode", "vn"]
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
          "required": ["cid", "hospcode", "vn"]
      },
  };
    return v.validate(data, schema);
  }

}