import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

const router: Router = Router();

import { User, IUser } from '../models/users';

router.get('/', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});

router.get('/users', async (req: Request, res: Response) => {
  let user: IUser[] = await User.findAllByUsername('satit');
  res.send({ ok: true, user });
});

export default router;