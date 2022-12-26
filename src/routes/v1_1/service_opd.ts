/// <reference path="../../../typings.d.ts" />
import { CsvModel } from '../../models/v1_1/csv';
import { HealthIdModel } from '../../models/v1_1/health_id';
import { Router, Request, Response } from 'express';
import Services = require('../../models/v1_1/services');
import { ValidateServiceOpdModel } from './../../models/v1_1/validation/service_opd';
const router: Router = Router();
const Validator = require('jsonschema').Validator;
const multer = require('multer')
const path = require('path')
const fse = require('fs-extra')
const healthIdModel = new HealthIdModel();
const validateServiceOpdModel = new ValidateServiceOpdModel();
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
        const rs: any = await removeServiceOpd(data);
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
        const rs: any = await saveServiceOpd(decoded.name, data);
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
        const rs: any = await removeServiceOpd(data);
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
        const rs: any = await saveServiceOpd(decoded.name, data);
        res.send(rs);
    } catch (error) {
        console.log(error);
        res.send({ ok: false, message: 'Save Error' });
    }
});

async function removeServiceOpd(data) {
    const validate = await validateServiceOpdModel.validateRemove(data);
    if (!validate.valid) {
        return ({ ok: false, error_code: 'SCHEMA_ERROR', error_message: validate.errors[0] });
    } else {
        const rs: any = await healthIdModel.mappingHealthID(data);
        if (rs.ok) {
            let batch = Services.collection.initializeOrderedBulkOp();
            for (const d of rs.rows) {
                batch.find({ "health_id": d.health_id, "hospcode": d.hospcode, "vn": d.vn, "hn": d.hn }).deleteOne()
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

async function saveServiceOpd(name, data) {
    const validate = await validateServiceOpdModel.validation(data);
    if (!validate.valid) {
        return ({ ok: false, error_code: 'SCHEMA_ERROR', error_message: validate.errors[0] });
    } else {
        const rs: any = await healthIdModel.mappingHealthID(data);
        if (rs.ok) {
            let batch = Services.collection.initializeOrderedBulkOp();
            for (const d of rs.rows) {
                batch.find({ "health_id": d.health_id, "hospcode": d.hospcode, "vn": d.vn, "hn": d.hn }).upsert().update({ $set: { hospcode: d.hospcode, hospname: d.hospname, hn: d.hn, vn: d.vn, visit_date: new Date(d.visit_date), visit_time: moment(d.visit_time, 'HH:mm:ss').format('x'), main_department_name: d.main_department_name, sub_department_name: d.sub_department_name, right_code: d.right_code, right_name: d.right_name, an: d.an, diagnosis_text: d.diagnosis_text } });
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