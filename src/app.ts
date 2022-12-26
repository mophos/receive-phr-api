/// <reference path="../typings.d.ts" />

require('dotenv').config();
var mongoose = require('mongoose');

import * as path from 'path';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';
import * as HttpStatus from 'http-status-codes';
import * as express from 'express';
import * as cors from 'cors';

import { Router, Request, Response, NextFunction } from 'express';
import { Jwt } from './models/v1/jwt';

import indexRoute from './routes/index';
import loginRoute from './routes/login';
import phrV1Route from './routes/v1/phr';
import v1_1PersonTelephoneRoute from './routes/v1_1/person_telephone';
import v1_1PersonEmailRoute from './routes/v1_1/person_email';
import v1_1PersonDeathRoute from './routes/v1_1/person_death';
import v1_1PersonRoute from './routes/v1_1/person';
import v1_1IdentityRoute from './routes/v1_1/identity';
import v1_1ServiceOpdRoute from './routes/v1_1/service_opd';
import v1_1ServiceOpdScreeningRoute from './routes/v1_1/service_opd_screening';
import v1_1ServiceOpdDiagnosisRoute from './routes/v1_1/service_opd_diagnosis';
import v1_1ServiceOpdDrugRoute from './routes/v1_1/service_opd_drug';
import v1_1ServiceAppointmentRoute from './routes/v1_1/service_appointment';
import v1_1ServiceIpdRoute from './routes/v1_1/service_ipd';
import v1_1ServiceIpdDiagnosisRoute from './routes/v1_1/service_ipd_diagnosis';
import v1_1ServiceIpdDrugRoute from './routes/v1_1/service_ipd_drug';
import v1_1IndexRoute from './routes/v1_1/index';
import didV1Route from './routes/v1/did';

// Assign router to the express.Router() instance
const app: express.Application = express();
// const compression = require('compression')
// app.use(compression())
const jwt = new Jwt();

//view engine setup
app.set('views', path.join(__dirname, '../views'));
app.engine('.ejs', ejs.renderFile);
app.set('view engine', 'ejs');

//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname,'../public','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(cors());

let checkAuth = (req: Request, res: Response, next: NextFunction) => {
  let token: string = null;

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  } else {
    token = req.body.token;
  }

  jwt.verify(token)
    .then((decoded: any) => {
      req.decoded = decoded;
      next();
    }, err => {
      return res.send({
        ok: false,
        error: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED),
        code: HttpStatus.UNAUTHORIZED
      });
    });
}

app.use('/v1_1/', v1_1IndexRoute);
app.use('/v1_1/person/telephone', checkAuth, v1_1PersonTelephoneRoute);
app.use('/v1_1/person/email', checkAuth, v1_1PersonEmailRoute);
app.use('/v1_1/person/death', checkAuth, v1_1PersonDeathRoute);
app.use('/v1_1/person', checkAuth, v1_1PersonRoute);
app.use('/v1_1/identity', checkAuth, v1_1IdentityRoute);
app.use('/v1_1/service/opd', checkAuth, v1_1ServiceOpdRoute);
app.use('/v1_1/service/opd/screening', checkAuth, v1_1ServiceOpdScreeningRoute);
app.use('/v1_1/service/opd/diagnosis', checkAuth, v1_1ServiceOpdDiagnosisRoute);
app.use('/v1_1/service/opd/drug', checkAuth, v1_1ServiceOpdDrugRoute);
app.use('/v1_1/service/appointment', checkAuth, v1_1ServiceAppointmentRoute);
app.use('/v1_1/service/ipd', checkAuth, v1_1ServiceIpdRoute);
app.use('/v1_1/service/ipd/diagnosis', checkAuth, v1_1ServiceIpdDiagnosisRoute);
app.use('/v1_1/service/ipd/drug', checkAuth, v1_1ServiceIpdDrugRoute);
app.use('/v1/', checkAuth, phrV1Route);
app.use('/v1/did', checkAuth, didV1Route);
app.use('/login', loginRoute);
app.use('/', indexRoute);

//error handlers

if (process.env.NODE_ENV === 'DEV') {
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: {
        ok: false,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
      }
    });
  });
}

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(HttpStatus.NOT_FOUND).json({
    error: {
      ok: false,
      code: HttpStatus.NOT_FOUND,
      error: HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
    }
  });
});

export default app;
