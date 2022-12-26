const _ = require('lodash');
import { Validator } from 'jsonschema'

// validate
import { TitleNameModel } from '../lookup/titlename';
import { GenderModel } from '../lookup/gender';
import { BloodGroupModel } from '../lookup/blood_group';
import { RhBloodGroupModel } from '../lookup/rh_blood_group';
import { NationalityModel } from '../lookup/nationality';
import { MaritalStatusModel } from '../lookup/marital_status';

const titleNameModel = new TitleNameModel();
const genderModel = new GenderModel();
const bloodGroupModel = new BloodGroupModel();
const rhBloodGroupModel = new RhBloodGroupModel();
const nationalityModel = new NationalityModel();
const maritalStatusModel = new MaritalStatusModel();


Validator.prototype.customFormats.cid = function (input) {
  return input.length == 13 && Number.isInteger(+input);
};
Validator.prototype.customFormats.hospcode = function (input) {
  return input.length == 5 && Number.isInteger(+input);
};

export class ValidatePersonModel {

  async validation(data) {
    let v = new Validator();
    let anyof = [];
    anyof.push(..._.map(genderModel.data, (v) => {
      return {
        "properties": {
          "gender_code": { "const": v.code },
          "gender_name": { "type": "string", "enum": [v.name] }
        }
      }
    }));

    anyof.push(..._.map(titleNameModel.data, (v) => {
      return {
        "properties": {
          "title_code": { "const": v.code },
          "title_name": { "type": "string", "enum": [v.name] }
        }
      }
    }));
    anyof.push(..._.map(bloodGroupModel.data, (v) => {
      return {
        "properties": {
          "blood_group_code": { "const": v.code },
          "blood_group_name": { "type": "string", "enum": [v.name] }
        }
      }
    }));
    anyof.push(..._.map(rhBloodGroupModel.data, (v) => {
      return {
        "properties": {
          "rh_blood_group_code": { "const": v.code },
          "rh_blood_group_name": { "type": "string", "enum": [v.name] }
        }
      }
    }));
    anyof.push(..._.map(nationalityModel.data, (v) => {
      return {
        "properties": {
          "nationality_code": { "const": v.code },
          "nationality_name": { "type": "string", "enum": [v.name] }
        }
      }
    }));
    anyof.push(..._.map(maritalStatusModel.data, (v) => {
      return {
        "properties": {
          "marital_status_code": { "const": v.code },
          "marital_status_name": { "type": "string", "enum": [v.name] }
        }
      }
    }));

    let schema = {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "cid": { "type": "string", "format": "cid" },
          "birthdate": { "type": "string" },
          "gender_code": { "type": "string", "enum": _.map(genderModel.data, 'code') },
          "rh_blood_group_code": { "type": "string", "enum": _.map(rhBloodGroupModel.data, 'code') },
          "blood_group_code": { "type": "string", "enum": _.map(bloodGroupModel.data, 'code') },
          "title_code": { "type": "string", "enum": _.map(titleNameModel.data, 'code') },
          "first_name": { "type": "string" },
          "middle_name": { "type": ["string", "null"] },
          "last_name": { "type": "string" },
          "nationality_code": { "type": "string", "enum": _.map(nationalityModel.data, 'code') },
          "marital_status_code": { "type": "string", "enum": _.map(maritalStatusModel.data, 'code') }
        },
        "required": ["cid", "first_name", "last_name"],
        "anyOf": anyof,
      },
    };
    return v.validate(data, schema, { nestedErrors: true });
  };

  async validationRemove(data) {
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