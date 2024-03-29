import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { AlgorithmModel } from '../models/v1/algorithm';
const router: Router = Router();
const algorithmModel = new AlgorithmModel();

router.get('/', async (req: Request, res: Response) => {
  // console.log(await algorithmModel.enCryptAES("test"));
  // console.log(algoritm.hashCidDB("1234567891234"))
  // console.log(algoritm.hashCidAPI("1234567891234"))

  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});

export default router;