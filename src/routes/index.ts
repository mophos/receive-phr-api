import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

const router: Router = Router();

import { User, IUser } from '../models/users';

router.get('/', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});

router.get('/users', (req: Request, res: Response) => {
  User.findAllByUsername('satit').then((user: IUser[]) => {
    console.log(user);
    res.send({ ok: true, rows: user });
  });
});

export default router;