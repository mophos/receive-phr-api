/// <reference path="../../../typings.d.ts" />
import { CsvModel } from '../../models/v1_1/csv';
import { HealthIdModel } from '../../models/v1_1/health_id';
import { Router, Request, Response } from 'express';
import PersonInfo = require('../../models/v1_1/person_info');
import { ValidatePersonTelephoneModel } from '../../models/v1_1/validation/person_telephone';
const validatePersonTelephoneModel = new ValidatePersonTelephoneModel();
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
    const tel: any = await removeTelephone(data);
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
    const tel: any = await saveTelephone(decoded.name, data);
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
    const tel: any = await removeTelephone(data);
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
    const tel: any = await saveTelephone(decoded.name, data);
    res.send(tel);
  } catch (error) {
    console.log(error);
    res.send({ ok: false, message: 'Save Error' });
  }
});

async function removeTelephone(data) {
  const validate = await validatePersonTelephoneModel.validateRemove(data);
  if (!validate.valid) {
    return ({ ok: false, error_code: 'SCHEMA_ERROR', error_message: validate.errors[0] });
  } else {
    const rs: any = await healthIdModel.mappingHealthID(data);
    if (rs.ok) {
      let batch = PersonInfo.collection.initializeOrderedBulkOp();
      for (const d of rs.rows) {
        batch.find({ "health_id": d.health_id }).update({ $pull: { "telephone": { "no": d.telephone } } });
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

async function saveTelephone(name, data) {
  const validate = await validatePersonTelephoneModel.validation(data);
  if (!validate.valid) {
    return ({ ok: false, error_code: 'SCHEMA_ERROR', error_message: validate.errors[0] });
  } else {
    const rs: any = await healthIdModel.mappingHealthID(data);
    if (rs.ok) {
      let batch = PersonInfo.collection.initializeOrderedBulkOp();
      for (const d of rs.rows) {
        batch.find({ "health_id": d.health_id }).update({ $pull: { "telephone": { "no": d.telephone } } });
        batch.find({ "health_id": d.health_id }).upsert().update({ $push: { "telephone": { no: d.telephone, type: d.type, ext: d.ext } } });
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
      console.log('mapping error');
      return ({ ok: false });
    }
  }
}


export default router;