import * as _ from 'lodash';


const Validator = require('jsonschema').Validator;

Validator.prototype.customFormats.cid = function (input) {
  return input.length == 13 && Number.isInteger(+input);
};
Validator.prototype.customFormats.hospcode = function (input) {
  return input.length == 5 && Number.isInteger(+input);
};

export class ValidatePersonDeathModel {

  async validation(data) {
    let v = new Validator();
    let schema = {
      // "id": "/id",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "cid": { "type": "string", "format": "cid" },
          "date_of_death": { "type": "string", "format": "date" },
          "cause_of_death": { "type": "string" },
          "place_of_death": { "type": "string" }
        },
        "required": ["cid", "date_of_death"]
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
          "cid": { "type": "string", "format": "cid" }
        },
        "required": ["cid"]
      },
    };
    return v.validate(data, schema);
  }

}