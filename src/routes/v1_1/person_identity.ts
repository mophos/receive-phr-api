/// <reference path="../../../typings.d.ts" />
import { CsvModel } from '../../models/v1_1/csv';
import { HealthIdModel } from '../../models/v1_1/health_id';
import { Router, Request, Response } from 'express';
import PersonIdentity = require('../../models/v1_1/person_info');
const router: Router = Router();
const Validator = require('jsonschema').Validator;
const multer = require('multer')
const path = require('path')
const fse = require('fs-extra')
const healthIdModel = new HealthIdModel();
const csvModel = new CsvModel();
import * as _ from 'lodash';
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
    const tel: any = await removeIdentity(data);
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
    const tel: any = await saveIdentity(decoded.name, data);
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
    const tel: any = await removeIdentity(data);
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
    const tel: any = await saveIdentity(decoded.name, data);
    res.send(tel);
  } catch (error) {
    console.log(error);
    res.send({ ok: false, message: 'Save Error' });
  }
});

async function removeIdentity(data) {
  const validate = await validatePersonIdentityRemove(data);
  if (!validate.valid) {
    return ({ ok: false, error_code: 'SCHEMA_ERROR', error_message: validate.errors[0] });
  } else {
    const rs: any = await healthIdModel.mappingHealthID(data);
    if (rs.ok) {
      let batch = PersonIdentity.collection.initializeOrderedBulkOp();
      rs.rows.forEach(function (d) {
        batch.find({ 'health_id': d.health_id }).deleteOne()
      });
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

async function saveIdentity(name, data) {
  const validate = await validatePersonIdentity(data);
  if (!validate.valid) {
    return ({ ok: false, error_code: 'SCHEMA_ERROR', error_message: validate.errors[0] });
  } else {
    const rs: any = await healthIdModel.mappingHealthID(data);
    if (rs.ok) {
      let batch = PersonIdentity.collection.initializeOrderedBulkOp();
      rs.rows.forEach(function (d) {
        batch.find({ 'health_id': d.health_id }).upsert().replaceOne(
          { 'health_id': d.health_id, 'birthdate': d.birthdate, 'gender': d.gender, 'rh_blood_group': d.rh_blood_group, 'blood_group': d.blood_group, 'source': name }
        );
      });
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

async function validatePersonIdentity(data: any) {
  let v = new Validator();
  let schema = {
    // "id": "/id",
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "cid": { "type": "string", "format": "cid" },
        "birthdate": { "type": "string" },
        "gender": { "type": "string", "enum": ["HOME", "MOBILE", "OFFICE"] },
        "rh_blood_group": { "type": "string" },
        "blood_group": { "type": "string" },
      }
    },
    "required": ["cid", "identity", "type"]
  };
  return v.validate(data, schema);
}

async function validatePersonIdentityRemove(data: any) {
  let v = new Validator();
  let schema = {
    // "id": "/id",
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "cid": { "type": "string", "format": "cid" },
        "identity": { "type": "string" }
      }
    },
    "required": ["cid", "identity"]
  };
  return v.validate(data, schema);
}

export default router;