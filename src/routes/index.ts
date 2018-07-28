import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

const router: Router = Router();

import User = require('../models/users');

router.get('/', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});

router.get('/users', async (req: Request, res: Response) => {
  let users = await User.find({ username: 'satit' });
  res.send({ ok: true, users });
});

router.get('/users/save', async (req: Request, res: Response) => {
  let users = new User();
  users.email = 'rianpit@gmail.com';
  users.password = '123456';
  await users.save();

  res.send({ ok: true, users });
});

export default router;