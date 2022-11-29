/// <reference path="../../../typings.d.ts" />
import * as express from 'express';
import { Router, Request, Response } from 'express';
import e = require('express');
import * as HttpStatus from 'http-status-codes';
import { now } from 'moment';
import moment = require('moment');
import PersonalInformationDopa = require('../../models/v1_1/personal_information_dopa');
import PersonThaiCitizen = require('../../models/v1_1/person_thai_citizen');
import PersonThaiCitizenHash = require('../../models/v1_1/person_thai_citizen_hash');
import { AlgorithmModel } from '../../models/v1_1/algorithm';
const aesjs = require('aes-js');
const algoritm = new AlgorithmModel();
const router: Router = Router();

router.post('/personal/information/dopa', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const body = req.body;
    let data;
    let dup = 0;
    if (!Array.isArray(body)) {
      data = [body];
    } else {
      data = body;
    }
    if (Array.isArray(data)) {
      const array = [];
      const pid = [];
      for (const i of data) {
        const obj: any = {};
        obj.pid = await algoritm.hashCidDB(i.pid);
        obj.pid_digit = i.pid.toString().substring(12, 13);
        obj.birthday = moment(i.birthday, 'YYYY-MM-DD').isValid() ? await algoritm.enCryptAES(i.birthday) : null;
        obj.first_name = await algoritm.enCryptAES(i.first_name);
        obj.last_name = await algoritm.enCryptAES(i.last_name);
        obj.dopa_date = new Date()
        obj.source = decoded.source;
        array.push(obj);
        pid.push({
          pid: i.pid,
          pid_api: await algoritm.hashCidAPI(i.pid)
        })
      }
      try {
        await PersonalInformationDopa.insertMany(array, { ordered: false });
        // await savePIDMany(pid);
        res.send({ ok: true, message: `Save success ${array.length - dup} record, Duplicate ${dup} record.` });
      } catch (error) {
        if (error.code === 11000) {
          // 1- getting duplicates
          console.log('getting duplicates');
          if (error.writeErrors) {
            for (const i of error.writeErrors) {
              // console.log(i.getOperation());
              const data = i.getOperation();
              const update = {
                birthday: data.birthday,
                first_name: data.first_name,
                last_name: data.last_name,
                dopa_date: new Date()
              }
              try {
                await PersonalInformationDopa.updateOne({ pid: data.pid }, { $set: update });
              } catch (error) {
                console.log(error);
              }
            }
            dup = error.writeErrors.length;
          } else {
            dup = 1;
            const data = error.getOperation();
            const update = {
              birthday: data.birthday,
              first_name: data.first_name,
              last_name: data.last_name,
              dopa_date: new Date()
            }
            try {
              await PersonalInformationDopa.updateOne({ pid: data.pid }, { $set: update });
            } catch (error) {
              console.log(error);
            }
          }
          res.send({ ok: true, message: `Insert success ${array.length - dup} record, Update ${dup} record.` });
        } else {
          console.log(error);

          dup = 1;
          res.send({ ok: true, message: `Insert success ${array.length - dup} record, Update ${dup} record.` });
        }
        // console.log(error);

      }
    } else {
      res.send({ ok: false, message: 'Save Error' });
    }

  } catch (error) {
    console.log(error);

    res.send({ ok: false, message: 'Save Error' });
  }
});


// async function savePIDOne(pid, pidHashAPI) {
//   try {
//     const obj = {
//       pid: pid,
//       pid_api: pidHashAPI
//     };
//     await PersonalPid.insertMany(obj, { ordered: false });
//     return true;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// }

// async function savePIDMany(data) {
//   try {
//     await PersonalPid.insertMany(data, { ordered: false });
//     return true;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// }

export default router;