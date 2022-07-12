import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import PersonalInformation = require('../../models/personal_information');

const router: Router = Router();
// import User = require('../../models/users');

router.get('/', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});

router.post('/personal/information', async (req: Request, res: Response) => {
  try {

    const data: any = req.body;
    if (Array.isArray(data)) {
      const array = [];
      for (const i of data) {
        const obj: any = {};
        obj.pid = i.pid;
        obj.birthday = i.birthda;
        obj.blood_group = i.blood_group;
        obj.prename = i.prename;
        obj.first_name = i.first_name;
        obj.middle_name = i.middle_name;
        obj.last_name = i.last_name;
        obj.home_phone = i.home_phone;
        obj.phone_number = i.phone_number;
        obj.nationality = i.nationality;
        array.push(obj);
      }
      await PersonalInformation.insertMany(array);
      res.send({ ok: true, message: `Save success ${array.length} record` });
    } else {
      const obj: any = {};
      obj.pid = data.pid;
      obj.birthday = data.birthda;
      obj.blood_group = data.blood_group;
      obj.prename = data.prename;
      obj.first_name = data.first_name;
      obj.middle_name = data.middle_name;
      obj.last_name = data.last_name;
      obj.home_phone = data.home_phone;
      obj.phone_number = data.phone_number;
      obj.nationality = data.nationality;
      await PersonalInformation.insertMany(obj);
      res.send({ ok: true, message: 'Save success', data: obj });
    }

  } catch (error) {
    res.send({ ok: false, message: 'Save Error' });
  }
});


export default router;