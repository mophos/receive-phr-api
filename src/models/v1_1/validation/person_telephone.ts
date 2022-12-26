import * as _ from 'lodash';


const Validator = require('jsonschema').Validator;

Validator.prototype.customFormats.cid = function (input) {
  return input.length == 13 && Number.isInteger(+input);
};
Validator.prototype.customFormats.hospcode = function (input) {
  return input.length == 5 && Number.isInteger(+input);
};

export class ValidatePersonTelephoneModel {

  async validation(data) {
    let v = new Validator();
    let schema = {
      // "id": "/id",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "cid": { "type": "string", "format": "cid" },
          "telephone": { "type": "string", "pattern": "^[0-9]{8,11}$" },
          "type": { "type": "string", "enum": ["HOME", "MOBILE", "OFFICE"] },
          "ext": { "type": "string" }
        },
        "required": ["cid", "telephone", "type"]
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
          "telephone": { "type": "string" }
        },
        "required": ["cid", "telephone"]
      },
    };
    return v.validate(data, schema);
  }

}