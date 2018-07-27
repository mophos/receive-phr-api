import * as Express from 'express';

declare module 'express' {
  interface Request {
    db: any // Actually should be something like `multer.Body`
    decoded: any // Actually should be something like `multer.Files`
  }
}