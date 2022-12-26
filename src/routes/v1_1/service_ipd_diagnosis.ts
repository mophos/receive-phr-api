/// <reference path="../../../typings.d.ts" />
import { CsvModel } from '../../models/v1_1/csv';
import { HealthIdModel } from '../../models/v1_1/health_id';
import { Router, Request, Response } from 'express';
import { ValidateServiceIpdDiagnosisModel } from './../../models/v1_1/validation/service_ipd_diagnosis';
import Services = require('../../models/v1_1/services');
const router: Router = Router();
const Validator = require('jsonschema').Validator;
const multer = require('multer')
const path = require('path')
const fse = require('fs-extra')
const healthIdModel = new HealthIdModel();
const validateServiceIpdDiagnosisModel = new ValidateServiceIpdDiagnosisModel();
const csvModel = new CsvModel();
import * as _ from 'lodash';
let tempPath = './uploade';
import * as moment from 'moment';
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
Validator.prototype.customFormats.hospcode = function (input) {
    return input.length == 5 && Number.isInteger(+input);
};

router.delete('/', async (req: Request, res: Response) => {
    try {
        const decoded: any = req.decoded;
        const data: any = req.body;
        const rs: any = await removeServiceIpdDiagnosis(data);
        res.send(rs);
    } catch (error) {
        console.log(error);
        res.send({ ok: false, message: 'Save Error' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const decoded: any = req.decoded;
        const data: any = req.body;
        const rs: any = await saveServiceIpdDiagnosis(decoded.name, data);
        res.send(rs);
    } catch (error) {
        console.log(error);
        res.send({ ok: false, message: 'Save Error' });
    }
});

router.delete('/csv', upload.single('csv'), async (req: Request, res: Response) => {
    try {
        const decoded: any = req.decoded;
        const data: any = await csvModel.csvToJSON(req.file.path);
        const rs: any = await removeServiceIpdDiagnosis(data);
        res.send(rs);
    } catch (error) {
        console.log(error);
        res.send({ ok: false, message: 'Save Error' });
    }
});

router.post('/csv', upload.single('csv'), async (req: Request, res: Response) => {
    try {
        const decoded: any = req.decoded;
        const data: any = await csvModel.csvToJSON(req.file.path);
        const rs: any = await saveServiceIpdDiagnosis(decoded.name, data);
        res.send(rs);
    } catch (error) {
        console.log(error);
        res.send({ ok: false, message: 'Save Error' });
    }
});

async function removeServiceIpdDiagnosis(data) {
    const validate = await validateServiceIpdDiagnosisModel.validateRemove(data);
    if (!validate.valid) {
        return ({ ok: false, error_code: 'SCHEMA_ERROR', error_message: validate.errors[0] });
    } else {
        const rs: any = await healthIdModel.mappingHealthID(data);
        if (rs.ok) {
            let batch = Services.collection.initializeOrderedBulkOp();
            for (const d of rs.rows) {
                batch.find({ "health_id": d.health_id, "hospcode": d.hospcode, "vn": d.vn }).update({ $pull: { "ipd.diagnosis": { "diagnosis_code": d.diagnosis_code } } });
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

async function saveServiceIpdDiagnosis(name, data) {
    const validate = await validateServiceIpdDiagnosisModel.validation(data);
    if (!validate.valid) {
        return ({ ok: false, error_code: 'SCHEMA_ERROR', error_message: validate.errors[0] });
    } else {
        const rs: any = await healthIdModel.mappingHealthID(data);
        if (rs.ok) {
            let batch = Services.collection.initializeOrderedBulkOp();
            for (const d of rs.rows) {
                batch.find({ "health_id": d.health_id, "hospcode": d.hospcode, "vn": d.vn }).update({ $pull: { "ipd.diagnosis": { "diagnosis_code": d.diagnosis_code } } });
                batch.find({ "health_id": d.health_id, "hospcode": d.hospcode, "vn": d.vn }).upsert().update({ $push: { "ipd.diagnosis": { diagnosis_code: d.diagnosis_code, diagnosis_name: d.diagnosis_name, diagnosis_type: d.diagnosis_type } } });
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