import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});
router.get('/hook', async (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});


router.post('/hook', async (req: Request, res: Response) => {
  const body = req.body;
  console.log(req.body);
  if (body.EventName == 's3:ObjectCreated:Put') {
    for (const r of body.Records) {
      if (r.s3.bucket.name == 'phr') {
        const _key = body.Key.split('/');
        const bucketName = _key[0];
        const path1 = _key[1];
        if(path1 == 'phr_mapping'){
          const serviceName = _key[2];
          const topic = _key[3];
          const fileName = _key[4];
        }
      }
    }
  }

  // {
  //   "EventName": 's3:ObjectCreated:Put',
  //   "Key": 'phr/phr_mapping/hdc/upload/person_telephone/8bc7a1df-f76f-47db-b389-921882169d29.json',
  //   "Records": [
  //     {
  //       "eventVersion": "2.0",
  //       "eventSource": "minio:s3",
  //       "awsRegion": "",
  //       "eventTime": "2022-12-25T15:30:43.738Z",
  //       "eventName": "s3:ObjectCreated:Put",
  //       "userIdentity": {
  //         "principalId": "admin"
  //       },
  //       "requestParameters": {
  //         "principalId": "admin",
  //         "region": "",
  //         "sourceIPAddress": "203.157.100.1"
  //       },
  //       "responseElements": {
  //         "content-length": "0",
  //         "x-amz-request-id": "173412FDFC7E69A3",
  //         "x-minio-deployment-id": "70162c83-a6a3-4436-aa51-9b1cd1ff59a8",
  //         "x-minio-origin-endpoint": "https://api-minio.moph.go.th:9990"
  //       },
  //       "s3": {
  //         "s3SchemaVersion": "1.0",
  //         "configurationId": "Config",
  //         "bucket": {
  //           "name": "phr",
  //           "ownerIdentity": {
  //             "principalId": "admin"
  //           },
  //           "arn": "arn:aws:s3:::phr"
  //         },
  //         "object": {
  //           "key": "phr_mapping%2Fhdc%2Fupload%2Fperson_telephone%2F8dd2c437-be47-4762-8e3a-a5f1a60d7b18.json",
  //           "size": 8739,
  //           "eTag": "f3a658d92c867072921ae518a18fcc7c",
  //           "contentType": "application/json",
  //           "userMetadata": {
  //             "content-type": "application/json"
  //           },
  //           "sequencer": "173412FDFCC754AC"
  //         }
  //       },
  //       "source": {
  //         "host": "203.157.100.1",
  //         "port": "",
  //         "userAgent": "MinIO (linux; x64) minio-js/7.0.32"
  //       }
  //     }
  //   ]
  // }
  console.log(req.body.s3);
  console.log(req.body.source);
  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});

export default router;