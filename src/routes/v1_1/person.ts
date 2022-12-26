/// <reference path="../../../typings.d.ts" />
import { Router, Request, Response } from 'express';
const router: Router = Router();
const Validator = require('jsonschema').Validator;
const multer = require('multer')
const path = require('path')
const fse = require('fs-extra')
import * as _ from 'lodash';
const fs = require('fs');

// import model 
import { CsvModel } from '../../models/v1_1/csv';
import { HealthIdModel } from '../../models/v1_1/health_id';
import { AlgorithmModel } from '../../models/v1_1/algorithm';
import PersonInfo = require('../../models/v1_1/person_info');
const healthIdModel = new HealthIdModel();
const csvModel = new CsvModel();
const algoritm = new AlgorithmModel();

// validate

import { ValidatePersonModel } from '../../models/v1_1/validation/person';
import { TitleNameModel } from '../../models/v1_1/lookup/titlename';
import { GenderModel } from '../../models/v1_1/lookup/gender';
import { BloodGroupModel } from '../../models/v1_1/lookup/blood_group';
import { RhBloodGroupModel } from '../../models/v1_1/lookup/rh_blood_group';
import { NationalityModel } from '../../models/v1_1/lookup/nationality';
import { MaritalStatusModel } from '../../models/v1_1/lookup/marital_status';

const validatePersonModel = new ValidatePersonModel();
const titleNameModel = new TitleNameModel();
const genderModel = new GenderModel();
const bloodGroupModel = new BloodGroupModel();
const rhBloodGroupModel = new RhBloodGroupModel();
const nationalityModel = new NationalityModel();
const maritalStatusModel = new MaritalStatusModel();

let tempPath = './uploade';
fse.ensureDirSync(tempPath);
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, tempPath)
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    )
  },
})
var upload = multer({
  storage: storage,
})

Validator.prototype.customFormats.cid = function (input) {
  return input.length == 13 && Number.isInteger(+input);
};




router.delete('/', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    const tel: any = await removePerson(data);
    res.send(tel);
  } catch (error) {
    console.log(error);
    res.send({ ok: false, message: 'Save Error' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    const tel: any = await savePerson(decoded.name, data);
    res.send(tel);
  } catch (error) {
    console.log(error);
    res.send({ ok: false, message: 'Save Error' });
  }
});

router.delete('/csv', upload.single('csv'), async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = await csvModel.csvToJSON(req.file.path);
    const tel: any = await removePerson(data);
    res.send(tel);
  } catch (error) {
    console.log(error);
    res.send({ ok: false, message: 'Save Error' });
  }
});

router.post('/csv', upload.single('csv'), async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = await csvModel.csvToJSON(req.file.path);
    const tel: any = await savePerson(decoded.name, data);
    res.send(tel);
  } catch (error) {
    console.log(error);
    res.send({ ok: false, message: 'Save Error' });
  }
});

async function removePerson(data) {
  const validate = await validatePersonModel.validationRemove(data);
  if (!validate.valid) {
    const error = {
      path: validate.errors[0].path,
      property: validate.errors[0].property,
      message: validate.errors[0].message,
      // name: validate.errors[0].name,
      stack: validate.errors[0].stack
    }
    return ({ ok: false, error_code: 'SCHEMA_ERROR', error_message: error });
  } else {
    const rs: any = await healthIdModel.mappingHealthID(data);
    if (rs.ok) {
      let batch = PersonInfo.collection.initializeOrderedBulkOp();
      for (const d of rs.rows) {
        batch.find({ 'health_id': d.health_id }).deleteOne()
      };
      return new Promise((resolve, reject) => {
        batch.execute(function (err, result) {
          if (err) {
            console.log(err);
            resolve({ ok: false });
          } else {
            resolve({ ok: true });
          }
        });
      });
    } else {
      return ({ ok: false });
    }
  }
}

async function savePerson(name, data) {
  const validate = await validatePersonModel.validation(data);
  if (!validate.valid) {
    const error = {
      path: validate.errors[0].path,
      name: validate.errors[0].name,
      message: validate.errors[0].stack
    }

    return ({ ok: false, error_code: 'SCHEMA_ERROR', error_message: error });
  } else {
    const rs: any = await healthIdModel.mappingHealthID(data);
    if (rs.ok) {
      let batch = PersonInfo.collection.initializeOrderedBulkOp();
      for (const d of rs.rows) {
        const birthDate = await algoritm.enCryptAES(d.birthdate)
        const firstName = await algoritm.enCryptAES(d.first_name);
        const middleName = d.middleName ? await algoritm.enCryptAES(d.middle_name) : null;
        const lastName = await algoritm.enCryptAES(d.last_name);
        batch.find({ "health_id": d.health_id }).upsert().update({ $set: { birthdate: birthDate, gender_code: d.gender_code, gender_name: d.gender_name, rh_blood_group_code: d.rh_blood_group_code, rh_blood_group_name: d.rh_blood_group_name, blood_group_code: d.blood_group_code, blood_group_name: d.blood_group_name, title_code: d.title_code, title_name: d.title_name, first_name: firstName, middle_name: middleName, last_name: lastName, nationality_code: d.nationality_code, nationality_name: d.nationality_name, marital_status_code: d.marital_status_code, marital_status_name: d.marital_status_name } });
      }

      return new Promise((resolve, reject) => {
        batch.execute(function (err, result) {
          if (err) {
            console.log(err);
            resolve({ ok: false });
          } else {
            resolve({ ok: true });
          }
        });
      });
    } else {
      return ({ ok: false });
    }
  }
}


export default router;