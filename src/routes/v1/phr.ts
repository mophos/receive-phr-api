/// <reference path="../../../typings.d.ts" />
import * as express from 'express';
import { Router, Request, Response } from 'express';
import e = require('express');
import * as HttpStatus from 'http-status-codes';
import { now } from 'moment';
import moment = require('moment');
import PersonalAppointment = require('../../models/personal_appointment');
import PersonalInformation = require('../../models/personal_information');
import PersonalInformationAddress = require('../../models/personal_information_address');
import PersonalInformationDopa = require('../../models/personal_information_dopa');
import PersonalPid = require('../../models/personal_pid');
import PersonalVisit = require('../../models/personal_visit');
import PersonalVisitDiagnosis = require('../../models/personal_visit_diagnosis');
import PersonalVisitDiagnosisInformation = require('../../models/personal_visit_diagnosis_information');
import PersonalVisitInformation = require('../../models/personal_visit_information');
import PersonalVisitLab = require('../../models/personal_visit_lab');
import PersonalVisitLabInformation = require('../../models/personal_visit_lab_information');
import PersonalVisitOrder = require('../../models/personal_visit_order');
import PersonalVisitOrderInformation = require('../../models/personal_visit_order_information');
import { AlgorithmModel } from './../../models/algorithm';
const aesjs = require('aes-js');
const algoritm = new AlgorithmModel();
const router: Router = Router();

router.post('/personal/information/dopa', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const body = req.body;
    let data;
    // const data: any = req.body;
    let dup = 0;
    // console.log(Array.isArray(data),!Array.isArray(data));
    
    if (!Array.isArray(body)) {
      data = [body];
    }else{
      data = body;
    }

    if (Array.isArray(data)) {
      const array = [];
      const pid = [];
      for (const i of data) {
        const obj: any = {};
        obj.pid = await algoritm.hashCidDB(i.pid);
        obj.pid_digit = i.pid.toString().substring(12, 13);
        obj.birthday = await algoritm.enCryptAES(i.birthday);
        obj.prename = i.prename;
        obj.first_name = await algoritm.enCryptAES(i.first_name);
        obj.middle_name = await algoritm.enCryptAES(i.middle_name);
        obj.last_name = await algoritm.enCryptAES(i.last_name);
        obj.source = decoded.source;
        array.push(obj);
        pid.push({
          pid: i.pid,
          pid_api: await algoritm.hashCidAPI(i.pid)
        })
      }
      try {
        await PersonalInformation.insertMany(array, { ordered: false });
        await savePIDMany(pid);
        res.send({ ok: true, message: `Save success ${array.length - dup} record, Duplicate ${dup} record.` });
      } catch (error) {
        if (error.code === 11000) {
          // 1- getting duplicates
          console.log('getting duplicates');
          if(error.writeErrors){
            for (const i of error.writeErrors) {
              // console.log(i.getOperation());
              const data = i.getOperation();
              const update = {
                birthday: data.birthday,
                prename:data.prename,
                first_name: data.first_name,
                middle_name: data.middle_name,
                last_name: data.last_name,
                source: data.source
              }
              try {
                await PersonalInformationDopa.updateOne({ pid: data.pid }, { $set: update });
              } catch (error) {
                console.log(error);
              }
            }
            dup = error.writeErrors.length;
          }else{
            dup = 1;
            const data = error.getOperation();
              const update = {
                birthday: data.birthday,
                prename:data.prename,
                first_name: data.first_name,
                middle_name: data.middle_name,
                last_name: data.last_name,
                source: data.source
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
    } else{
      res.send({ ok: false, message: 'Save Error' });
    }

  } catch (error) {
    console.log(error);

    res.send({ ok: false, message: 'Save Error' });
  }
});

router.post('/personal/information', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let dup = 0;
    if (Array.isArray(data)) {
      const array = [];
      const pid = [];
      for (const i of data) {
        const obj: any = {};
        obj.pid = await algoritm.hashCidDB(i.pid);
        obj.pid_digit = i.pid.toString().substring(12, 13);
        obj.birthday = await algoritm.enCryptAES(i.birthday);
        obj.blood_group = i.blood_group;
        obj.prename = i.prename;
        obj.first_name = await algoritm.enCryptAES(i.first_name);
        obj.middle_name = await algoritm.enCryptAES(i.middle_name);
        obj.last_name = await algoritm.enCryptAES(i.last_name);
        obj.home_phone = i.home_phone;
        obj.phone_number = i.phone_number;
        obj.nationality = i.nationality;
        obj.source = decoded.source;
        array.push(obj);
        pid.push({
          pid: i.pid,
          pid_api: await algoritm.hashCidAPI(i.pid)
        })
      }
      try {
        await PersonalInformation.insertMany(array, { ordered: false });
        await savePIDMany(pid);
        res.send({ ok: true, message: `Save success ${array.length - dup} record, Duplicate ${dup} record.` });
      } catch (error) {
        console.log(error);
        try {
          dup = error.writeErrors.length;
          res.send({ ok: true, message: `Save success ${array.length - dup} record, Duplicate ${dup} record.` });
        } catch (error) {
          dup = 1;
          res.send({ ok: true, message: `Save success ${array.length - dup} record, Duplicate ${dup} record.` });
        }
      }
    } else {
      const obj: any = {};
      obj.pid = await algoritm.hashCidDB(data.pid);
      obj.pid_digit = data.pid.toString().substring(12, 13);
      obj.birthday = await algoritm.enCryptAES(data.birthday);
      obj.blood_group = data.blood_group;
      obj.prename = data.prename;
      obj.first_name = await algoritm.enCryptAES(data.first_name);
      obj.middle_name = await algoritm.enCryptAES(data.middle_name);
      obj.last_name = await algoritm.enCryptAES(data.last_name);
      obj.home_phone = data.home_phone;
      obj.phone_number = data.phone_number;
      obj.nationality = data.nationality;
      obj.source = decoded.source;
      try {
        await PersonalInformation.insertMany(obj, { ordered: false });
        await savePIDOne(data.pid, await algoritm.hashCidAPI(data.pid));
      } catch (error) {
        try { dup = error.writeErrors.length; } catch (error) { dup = 1; }
      }

      if (!dup) {
        res.send({ ok: true, message: 'Save success', data: obj });
      } else {
        res.send({ ok: true, message: 'Not Save success But Duplicate', data: obj });
      }

    }

  } catch (error) {
    console.log(error);

    res.send({ ok: false, message: 'Save Error' });
  }
});

router.post('/personal/information/address', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let dup = 0;
    if (Array.isArray(data)) {
      const array = [];
      const pid = [];
      for (const i of data) {
        const obj: any = {};
        obj.pid = await algoritm.hashCidDB(i.pid);
        obj.pid_digit = i.pid.toString().substring(12, 13);
        obj.house_no = i.house_no;
        obj.village_no = i.village_no;
        obj.alley = i.alley;
        obj.lane = i.lane;
        obj.road = i.road;
        obj.sub_district = i.sub_district;
        obj.district = i.district;
        obj.province = i.province;
        obj.postal_code = i.postal_code;
        obj.full_address = i.full_address;
        obj.source = decoded.source;
        array.push(obj);
        pid.push({
          pid: i.pid,
          pid_api: await algoritm.hashCidAPI(i.pid)
        })
      }
      try {
        await PersonalInformationAddress.insertMany(array, { ordered: false });
        await savePIDMany(pid);
      } catch (error) {
        try { dup = error.writeErrors.length; } catch (error) { dup = 1; }
      }
      res.send({ ok: true, message: `Save success ${array.length - dup} record, Duplicate ${dup} record.` });
    } else {
      const obj: any = {};
      obj.pid = await algoritm.hashCidDB(data.pid);
      obj.pid_digit = data.pid.toString().substring(12, 13);
      obj.house_no = data.house_no;
      obj.village_no = data.village_no;
      obj.alley = data.alley;
      obj.lane = data.lane;
      obj.road = data.road;
      obj.sub_district = data.sub_district;
      obj.district = data.district;
      obj.province = data.province;
      obj.postal_code = data.postal_code;
      obj.full_address = data.full_address;
      obj.source = decoded.source;
      try {
        await PersonalInformationAddress.insertMany(obj, { ordered: false });
        await savePIDOne(data.pid, await algoritm.hashCidAPI(data.pid));
      } catch (error) {
        try { dup = error.writeErrors.length; } catch (error) { dup = 1; }
      }
      if (!dup) {
        res.send({ ok: true, message: 'Save success', data: obj });
      } else {
        res.send({ ok: true, message: 'Not Save success But Duplicate', data: obj });
      }
    }

  } catch (error) {
    res.send({ ok: false, message: 'Save Error' });
  }
});

router.post('/personal/visit', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let dup = 0;
    if (Array.isArray(data)) {
      const array = [];
      const pid = [];
      for (const i of data) {
        const obj: any = {};
        obj.visit_date = i.visit_date;
        obj.visit_time = i.visit_time;
        obj.hospcode = i.hospcode;
        obj.hospname = i.hospname;
        obj.pid = await algoritm.hashCidDB(i.pid);
        obj.pid_digit = i.pid.toString().substring(12, 13);
        obj.visit_no = i.visit_no
        obj.source = decoded.source;
        array.push(obj);
        pid.push({
          pid: i.pid,
          pid_api: await algoritm.hashCidAPI(i.pid)
        })
      }
      try {
        await PersonalVisit.insertMany(array, { ordered: false });
        await savePIDMany(pid);
      } catch (error) {
        try { dup = error.writeErrors.length; } catch (error) { dup = 1; }
      }
      res.send({ ok: true, message: `Save success ${array.length - dup} record, Duplicate ${dup} record.` });
    } else {
      const obj: any = {};
      obj.visit_date = data.visit_date;
      obj.visit_time = data.visit_time;
      obj.hospcode = data.hospcode;
      obj.hospname = data.hospname;
      obj.pid = await algoritm.hashCidDB(data.pid);
      obj.pid_digit = data.pid.toString().substring(12, 13);
      obj.visit_no = data.visit_no
      obj.source = decoded.source;
      try {
        await PersonalVisit.insertMany(obj, { ordered: false });
        await savePIDOne(data.pid, await algoritm.hashCidAPI(data.pid));
      } catch (error) {
        try { dup = error.writeErrors.length; } catch (error) { dup = 1; }
      }
      if (!dup) {
        res.send({ ok: true, message: 'Save success', data: obj });
      } else {
        res.send({ ok: true, message: 'Not Save success But Duplicate', data: obj });
      }
    }

  } catch (error) {
    res.send({ ok: false, message: 'Save Error' });
  }
});

router.post('/personal/visit/information', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let dup = 0;
    if (Array.isArray(data)) {
      const array = [];
      const pid = [];
      for (const i of data) {
        const obj: any = {};
        obj.visit_date = i.visit_date;
        obj.visit_time = i.visit_time;
        obj.hospcode = i.hospcode;
        obj.hospname = i.hospname;
        obj.visit_no = i.visit_no;
        obj.pid = await algoritm.hashCidDB(i.pid);
        obj.pid_digit = i.pid.toString().substring(12, 13);
        obj.bmi = i.bmi;
        obj.bp = i.bp;
        obj.bt = i.bt;
        obj.bw = i.bw;
        obj.cc = i.cc;
        obj.ht = i.ht;
        obj.pe = i.pe;
        obj.pi = i.pi;
        obj.pr = i.pr;
        obj.rr = i.rr;
        obj.sat_o2 = i.sat_o2;
        obj.source = decoded.source;
        array.push(obj);
        pid.push({
          pid: i.pid,
          pid_api: await algoritm.hashCidAPI(i.pid)
        })
      }
      try {
        await PersonalVisitInformation.insertMany(array, { ordered: false });
        await savePIDMany(pid);
      } catch (error) {
        try { dup = error.writeErrors.length; } catch (error) { dup = 1; }
      }
      res.send({ ok: true, message: `Save success ${array.length - dup} record, Duplicate ${dup} record.` });
    } else {
      const obj: any = {};
      obj.visit_date = data.visit_date;
      obj.visit_time = data.visit_time;
      obj.hospcode = data.hospcode;
      obj.hospname = data.hospname;
      obj.visit_no = data.visit_no;
      obj.pid = await algoritm.hashCidDB(data.pid);
      obj.pid_digit = data.pid.toString().substring(12, 13);
      obj.bmi = data.bmi;
      obj.bp = data.bp;
      obj.bt = data.bt;
      obj.bw = data.bw;
      obj.cc = data.cc;
      obj.ht = data.ht;
      obj.pe = data.pe;
      obj.pi = data.pi;
      obj.pr = data.pr;
      obj.rr = data.rr;
      obj.sat_o2 = data.sat_o2;
      obj.source = decoded.source;
      try {
        await PersonalVisitInformation.insertMany(obj, { ordered: false });
        await savePIDOne(data.pid, await algoritm.hashCidAPI(data.pid));
      } catch (error) {
        try { dup = error.writeErrors.length; } catch (error) { dup = 1; }
      }
      if (!dup) {
        res.send({ ok: true, message: 'Save success', data: obj });
      } else {
        res.send({ ok: true, message: 'Not Save success But Duplicate', data: obj });
      }
    }

  } catch (error) {
    res.send({ ok: false, message: 'Save Error' });
  }
});

router.post('/personal/visit/lab', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let dup = 0;
    if (Array.isArray(data)) {
      const array = [];
      const pid = [];
      for (const i of data) {
        const obj: any = {};
        obj.visit_date = i.visit_date;
        obj.visit_time = i.visit_time;
        obj.hospcode = i.hospcode;
        obj.hospname = i.hospname;
        obj.pid = await algoritm.hashCidDB(i.pid);
        obj.pid_digit = i.pid.toString().substring(12, 13);
        obj.visit_no = i.visit_no
        obj.source = decoded.source;
        array.push(obj);
        pid.push({
          pid: i.pid,
          pid_api: await algoritm.hashCidAPI(i.pid)
        })
      }
      try {
        await PersonalVisitLab.insertMany(array, { ordered: false });
        await savePIDMany(pid);
      } catch (error) {
        try { dup = error.writeErrors.length; } catch (error) { dup = 1; }
      }
      res.send({ ok: true, message: `Save success ${array.length - dup} record, Duplicate ${dup} record.` });
    } else {
      const obj: any = {};
      obj.visit_date = data.visit_date;
      obj.visit_time = data.visit_time;
      obj.hospcode = data.hospcode;
      obj.hospname = data.hospname;
      obj.pid = await algoritm.hashCidDB(data.pid);
      obj.pid_digit = data.pid.toString().substring(12, 13);
      obj.visit_no = data.visit_no
      obj.source = decoded.source;
      try {
        await PersonalVisitLab.insertMany(obj, { ordered: false });
        await savePIDOne(data.pid, await algoritm.hashCidAPI(data.pid));
      } catch (error) {
        try { dup = error.writeErrors.length; } catch (error) { dup = 1; }
      }
      if (!dup) {
        res.send({ ok: true, message: 'Save success', data: obj });
      } else {
        res.send({ ok: true, message: 'Not Save success But Duplicate', data: obj });
      }
    }

  } catch (error) {
    res.send({ ok: false, message: 'Save Error' });
  }
});

router.post('/personal/visit/lab/information', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let dup = 0;
    if (Array.isArray(data)) {
      const array = [];
      const pid = [];
      for (const i of data) {
        const obj: any = {};
        obj.hospcode = i.hospcode;
        obj.hospname = i.hospname;
        obj.lab_code = i.lab_code;
        obj.lab_detail = i.lab_detail;
        obj.lab_order_name = i.lab_order_name;
        obj.reporter_name = i.reporter_name;
        obj.pid = algoritm.hashCidDB(i.pid);
        obj.pid_digit = i.pid.toString().substring(12, 13);
        obj.visit_no = i.visit_no;
        obj.visit_date = i.visit_date;
        obj.visit_time = i.visit_time;
        obj.source = decoded.source;
        array.push(obj);
        pid.push({
          pid: i.pid,
          pid_api: await algoritm.hashCidAPI(i.pid)
        })
      }
      try {
        await PersonalVisitLabInformation.insertMany(array, { ordered: false });
        await savePIDMany(pid);
      } catch (error) {
        try { dup = error.writeErrors.length; } catch (error) { dup = 1; }
      }
      res.send({ ok: true, message: `Save success ${array.length - dup} record, Duplicate ${dup} record.` });
    } else {
      const obj: any = {};
      obj.hospcode = data.hospcode;
      obj.hospname = data.hospname;
      obj.lab_code = data.lab_code;
      obj.lab_detail = data.lab_detail;
      obj.lab_order_name = data.lab_order_name;
      obj.reporter_name = data.reporter_name;
      obj.pid = await algoritm.hashCidDB(data.pid);
      obj.pid_digit = data.pid.toString().substring(12, 13);
      obj.visit_no = data.visit_no;
      obj.visit_date = data.visit_date;
      obj.visit_time = data.visit_time;
      obj.source = decoded.source;
      try {
        await PersonalVisitLabInformation.insertMany(obj, { ordered: false });
        await savePIDOne(data.pid, await algoritm.hashCidAPI(data.pid));
      } catch (error) {
        try { dup = error.writeErrors.length; } catch (error) { dup = 1; }
      }
      if (!dup) {
        res.send({ ok: true, message: 'Save success', data: obj });
      } else {
        res.send({ ok: true, message: 'Not Save success But Duplicate', data: obj });
      }
    }

  } catch (error) {
    res.send({ ok: false, message: 'Save Error' });
  }
});

router.post('/personal/visit/diagnosis', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let dup = 0;
    if (Array.isArray(data)) {
      const array = [];
      const pid = [];
      for (const i of data) {
        const obj: any = {};
        obj.visit_date = i.visit_date;
        obj.visit_time = i.visit_time;
        obj.hospcode = i.hospcode;
        obj.hospname = i.hospname;
        obj.pid = algoritm.hashCidDB(i.pid);
        obj.pid_digit = i.pid.toString().substring(12, 13);
        obj.visit_no = i.visit_no
        obj.source = decoded.source;
        array.push(obj);
        pid.push({
          pid: i.pid,
          pid_api: await algoritm.hashCidAPI(i.pid)
        })
      }
      try {
        await PersonalVisitDiagnosis.insertMany(array, { ordered: false });
        await savePIDMany(pid);
      } catch (error) {
        try { dup = error.writeErrors.length; } catch (error) { dup = 1; }
      }
      res.send({ ok: true, message: `Save success ${array.length - dup} record, Duplicate ${dup} record.` });
    } else {
      const obj: any = {};
      obj.visit_date = data.visit_date;
      obj.visit_time = data.visit_time;
      obj.hospcode = data.hospcode;
      obj.hospname = data.hospname;
      obj.pid = await algoritm.hashCidDB(data.pid);
      obj.pid_digit = data.pid.toString().substring(12, 13);
      obj.visit_no = data.visit_no
      obj.source = decoded.source;
      try {
        await PersonalVisitDiagnosis.insertMany(obj, { ordered: false });
        await savePIDOne(data.pid, await algoritm.hashCidAPI(data.pid));
      } catch (error) {
        try { dup = error.writeErrors.length; } catch (error) { dup = 1; }
      }
      if (!dup) {
        res.send({ ok: true, message: 'Save success', data: obj });
      } else {
        res.send({ ok: true, message: 'Not Save success But Duplicate', data: obj });
      }
    }

  } catch (error) {
    res.send({ ok: false, message: 'Save Error' });
  }
});

router.post('/personal/visit/diagnosis/information', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let dup = 0;
    if (Array.isArray(data)) {
      const array = [];
      const pid = [];
      for (const i of data) {
        const obj: any = {};
        obj.visit_date = i.visit_date;
        obj.visit_time = i.visit_time;
        obj.hospcode = i.hospcode;
        obj.hospname = i.hospname;
        obj.pid = await algoritm.hashCidDB(i.pid);
        obj.pid_digit = i.pid.toString().substring(12, 13);
        obj.visit_no = i.visit_no
        obj.diagnosis_code = i.diagnosis_code;
        obj.diagnosis_result = i.diagnosis_result;
        obj.diagnosis_date = i.diagnosis_date;
        obj.source = decoded.source;
        array.push(obj);
        pid.push({
          pid: i.pid,
          pid_api: await algoritm.hashCidAPI(i.pid)
        })
      }
      try {
        await PersonalVisitDiagnosisInformation.insertMany(array, { ordered: false });
        await savePIDMany(pid);
      } catch (error) {
        try { dup = error.writeErrors.length; } catch (error) { dup = 1; }
      }
      res.send({ ok: true, message: `Save success ${array.length - dup} record, Duplicate ${dup} record.` });
    } else {
      const obj: any = {};
      obj.visit_date = data.visit_date;
      obj.visit_time = data.visit_time;
      obj.hospcode = data.hospcode;
      obj.hospname = data.hospname;
      obj.pid = await algoritm.hashCidDB(data.pid);
      obj.pid_digit = data.pid.toString().substring(12, 13);
      obj.visit_no = data.visit_no
      obj.diagnosis_code = data.diagnosis_code;
      obj.diagnosis_result = data.diagnosis_result;
      obj.diagnosis_date = data.diagnosis_date;
      obj.source = decoded.source;
      try {
        await PersonalVisitDiagnosisInformation.insertMany(obj, { ordered: false });
        await savePIDOne(data.pid, await algoritm.hashCidAPI(data.pid));
      } catch (error) {
        try { dup = error.writeErrors.length; } catch (error) { dup = 1; }
      }
      if (!dup) {
        res.send({ ok: true, message: 'Save success', data: obj });
      } else {
        res.send({ ok: true, message: 'Not Save success But Duplicate', data: obj });
      }
    }

  } catch (error) {
    res.send({ ok: false, message: 'Save Error' });
  }
});


router.post('/personal/visit/order', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let dup = 0;
    if (Array.isArray(data)) {
      const array = [];
      const pid = [];
      for (const i of data) {
        const obj: any = {};
        obj.visit_date = i.visit_date;
        obj.visit_time = i.visit_time;
        obj.hospcode = i.hospcode;
        obj.hospname = i.hospname;
        obj.pid = await algoritm.hashCidDB(i.pid);
        obj.pid_digit = i.pid.toString().substring(12, 13);
        obj.visit_no = i.visit_no
        obj.source = decoded.source;
        array.push(obj);
        pid.push({
          pid: i.pid,
          pid_api: await algoritm.hashCidAPI(i.pid)
        })
      }
      try {
        await PersonalVisitOrder.insertMany(array, { ordered: false });
        await savePIDMany(pid);
      } catch (error) {
        try { dup = error.writeErrors.length; } catch (error) { dup = 1; }
      }
      res.send({ ok: true, message: `Save success ${array.length - dup} record, Duplicate ${dup} record.` });
    } else {
      const obj: any = {};
      obj.visit_date = data.visit_date;
      obj.visit_time = data.visit_time;
      obj.hospcode = data.hospcode;
      obj.hospname = data.hospname;
      obj.pid = await algoritm.hashCidDB(data.pid);
      obj.pid_digit = data.pid.toString().substring(12, 13);
      obj.visit_no = data.visit_no
      obj.source = decoded.source;
      try {
        await PersonalVisitOrder.insertMany(obj, { ordered: false });
        await savePIDOne(data.pid, await algoritm.hashCidAPI(data.pid));
      } catch (error) {
        try { dup = error.writeErrors.length; } catch (error) { dup = 1; }
      }
      if (!dup) {
        res.send({ ok: true, message: 'Save success', data: obj });
      } else {
        res.send({ ok: true, message: 'Not Save success But Duplicate', data: obj });
      }
    }

  } catch (error) {
    res.send({ ok: false, message: 'Save Error' });
  }
});

router.post('/personal/visit/order/information', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let dup = 0;
    if (Array.isArray(data)) {
      const array = [];
      const pid = [];
      for (const i of data) {
        const obj: any = {};
        obj.visit_date = i.visit_date;
        obj.visit_time = i.visit_time;
        obj.hospcode = i.hospcode;
        obj.hospname = i.hospname;
        obj.pid = await algoritm.hashCidDB(i.pid);
        obj.pid_digit = i.pid.toString().substring(12, 13);
        obj.visit_no = i.visit_no
        obj.med_code = i.med_code;
        obj.med_name = i.med_name;
        obj.verify_date = i.verify_date;
        obj.source = decoded.source;
        array.push(obj);
        pid.push({
          pid: i.pid,
          pid_api: await algoritm.hashCidAPI(i.pid)
        })
      }
      try {
        await PersonalVisitOrderInformation.insertMany(array, { ordered: false });
        await savePIDMany(pid);
      } catch (error) {
        try { dup = error.writeErrors.length; } catch (error) { dup = 1; }
      }
      res.send({ ok: true, message: `Save success ${array.length - dup} record, Duplicate ${dup} record.` });
    } else {
      const obj: any = {};
      obj.visit_date = data.visit_date;
      obj.visit_time = data.visit_time;
      obj.hospcode = data.hospcode;
      obj.hospname = data.hospname;
      obj.pid = await algoritm.hashCidDB(data.pid);
      obj.pid_digit = data.pid.toString().substring(12, 13);
      obj.visit_no = data.visit_no
      obj.med_code = data.med_code;
      obj.med_name = data.med_name;
      obj.verify_date = data.verify_date;
      obj.source = decoded.source;
      try {
        await PersonalVisitOrderInformation.insertMany(obj, { ordered: false });
        await savePIDOne(data.pid, await algoritm.hashCidAPI(data.pid));
      } catch (error) {
        try { dup = error.writeErrors.length; } catch (error) { dup = 1; }
      }
      if (!dup) {
        res.send({ ok: true, message: 'Save success', data: obj });
      } else {
        res.send({ ok: true, message: 'Not Save success But Duplicate', data: obj });
      }
    }

  } catch (error) {
    res.send({ ok: false, message: 'Save Error' });
  }
});

router.post('/personal/appointment', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const hash = req.query.hash || 'N'
    const data: any = req.body;
    let dup = 0;
    if (Array.isArray(data)) {
      const array = [];
      const pid = [];
      for (const i of data) {
        const obj: any = {};
        obj.visit_date = i.visit_date;
        obj.visit_time = i.visit_time;
        obj.hospcode = i.hospcode;
        obj.hospname = i.hospname;
        obj.pid = hash == 'Y' ? i.pid : await algoritm.hashCidDB(i.pid);
        obj.pid_digit = i.pid.toString().substring(i.pid.toString().length - 1, i.pid.toString().length);
        obj.appointment_date = i.appointment_date
        obj.appointment_time = i.appointment_time
        obj.cause = i.cause
        obj.contact_point = i.contact_point
        obj.note = i.note
        obj.source = decoded.source;
        array.push(obj);
        if (hash != 'Y') {
          pid.push({
            pid: i.pid,
            pid_api: await algoritm.hashCidAPI(i.pid)
          })
        }
      }
      try {
        await PersonalAppointment.insertMany(array, { ordered: false });
        await savePIDMany(pid);
      } catch (error) {
        try { dup = error.writeErrors.length; } catch (error) { dup = 1; }
      }
      res.send({ ok: true, message: `Save success ${array.length - dup} record, Duplicate ${dup} record.` });
    } else {
      const obj: any = {};
      obj.visit_date = data.visit_date;
      obj.visit_time = data.visit_time;
      obj.hospcode = data.hospcode;
      obj.hospname = data.hospname;
      obj.pid = hash == 'Y' ? data.pid : await algoritm.hashCidDB(data.pid);
      obj.pid_digit = data.pid.toString().substring(data.pid.toString().length - 1, data.pid.toString().length);
      obj.appointment_date = data.appointment_date
      obj.appointment_time = data.appointment_time
      obj.cause = data.cause
      obj.contact_point = data.contact_point
      obj.note = data.note
      obj.source = decoded.source;
      try {
        await PersonalAppointment.insertMany(obj, { ordered: false });
        if (hash != 'Y') {
          await savePIDOne(data.pid, await algoritm.hashCidAPI(data.pid));
        }
      } catch (error) {
        try { dup = error.writeErrors.length; } catch (error) { dup = 1; }
      }
      if (!dup) {
        res.send({ ok: true, message: 'Save success', data: obj });
      } else {
        res.send({ ok: true, message: 'Not Save success But Duplicate', data: obj });
      }
    }

  } catch (error) {
    res.send({ ok: false, message: 'Save Error' });
  }
});

async function savePIDOne(pid, pidHashAPI) {
  try {
    const obj = {
      pid: pid,
      pid_api: pidHashAPI
    };
    await PersonalPid.insertMany(obj, { ordered: false });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function savePIDMany(data) {
  try {
    await PersonalPid.insertMany(data, { ordered: false });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default router;