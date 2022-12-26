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




router.post('/', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    const rs: any = await healthIdModel.mappingHealthID(data);
    // const tel: any = await savePerson(decoded.name, data);
    res.send(rs);
  } catch (error) {
    console.log(error);
    res.send({ ok: false, message: 'Save Error' });
  }
});

export default router;