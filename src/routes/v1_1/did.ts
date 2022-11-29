/// <reference path="../../../typings.d.ts" />
import * as express from 'express';
import { Router, Request, Response } from 'express';
import e = require('express');
import * as HttpStatus from 'http-status-codes';
import { now } from 'moment';
import moment = require('moment');
import PersonalInformation = require('../../models/personal_information');
import { WalletModel } from '../../models/wallet';
import PersonalPid = require('../../models/personal_pid');
import { AlgorithmModel } from '../../models/v1/algorithm';
const aesjs = require('aes-js');
const algoritm = new AlgorithmModel();
const walletModel = new WalletModel();
const router: Router = Router();

router.get('/citizen', async (req: Request, res: Response) => {
  try {
    // count exit
    const count = await PersonalPid.countDocuments({ did: { $exists: false } });
    const countLoop = count >= 5000 ? count / 5000 : 1;
    console.log(countLoop);
    for (let i = 0; i < countLoop; i++) {
      const data: any = await PersonalPid.find({ did: { $exists: false } }).limit(5000).skip(i * 5000);
      for (const d of data) {
        // create did 
        
        console.time('wallet');
        const rs: any = await walletModel.createWallet(d.pid);
        console.timeEnd('wallet');
        // console.log(d.pid,rs.data.result.did);
        if (rs.status == 200) {
         
          await PersonalPid.update({ pid: d.pid }, { $set: { did: rs.data.result.did } })
          
        } else {
          console.log(rs.response.data);
          
        }
        // console.log(rs.data);

        //save did

      }

    }


    // loop exit
    res.send({ ok: false, message: 'Save Error' });

  } catch (error) {
    console.log(error);

    res.send({ ok: false, message: 'Save Error' });
  }
});
router.get('/citizen2', async (req: Request, res: Response) => {
  try {
    // count exit
    const count = await PersonalPid.countDocuments({ did: { $exists: false } });
    const countLoop = count >= 5000 ? count / 5000 : 1;
    console.log(countLoop);
    for (let i = 20; i < countLoop; i++) {
      const data: any = await PersonalPid.find({ did: { $exists: false } }).limit(5000).skip(i * 5000);
      for (const d of data) {
        // create did 
        
        console.time('wallet2');
        const rs: any = await walletModel.createWallet(d.pid);
        console.timeEnd('wallet2');
        // console.log(d.pid,rs.data.result.did);
        if (rs.status == 200) {
         
          await PersonalPid.update({ pid: d.pid }, { $set: { did: rs.data.result.did } })
          
        } else {
          console.log(rs.response.data);
          
        }
        // console.log(rs.data);

        //save did

      }

    }


    // loop exit
    res.send({ ok: false, message: 'Save Error' });

  } catch (error) {
    console.log(error);

    res.send({ ok: false, message: 'Save Error' });
  }
});
router.get('/citizen3', async (req: Request, res: Response) => {
  try {
    // count exit
    const count = await PersonalPid.countDocuments({ did: { $exists: false } });
    const countLoop = count >= 5000 ? count / 5000 : 1;
    console.log(countLoop);
    for (let i = 30; i < countLoop; i++) {
      const data: any = await PersonalPid.find({ did: { $exists: false } }).limit(5000).skip(i * 5000);
      for (const d of data) {
        // create did 
        
        console.time('wallet3');
        const rs: any = await walletModel.createWallet(d.pid);
        console.timeEnd('wallet3');
        // console.log(d.pid,rs.data.result.did);
        if (rs.status == 200) {
          
          await PersonalPid.update({ pid: d.pid }, { $set: { did: rs.data.result.did } })
          
        } else {
          console.log(rs.response.data);
          
        }
        // console.log(rs.data);

        //save did

      }

    }


    // loop exit
    res.send({ ok: false, message: 'Save Error' });

  } catch (error) {
    console.log(error);

    res.send({ ok: false, message: 'Save Error' });
  }
});
router.get('/citizen4', async (req: Request, res: Response) => {
  try {
    // count exit
    const count = await PersonalPid.countDocuments({ did: { $exists: false } });
    const countLoop = count >= 5000 ? count / 5000 : 1;
    console.log(countLoop);
    for (let i = 40; i < countLoop; i++) {
      const data: any = await PersonalPid.find({ did: { $exists: false } }).limit(5000).skip(i * 5000);
      for (const d of data) {
        // create did 
        
        console.time('wallet4');
        const rs: any = await walletModel.createWallet(d.pid);
        console.timeEnd('wallet4');
        // console.log(d.pid,rs.data.result.did);
        if (rs.status == 200) {
          
          await PersonalPid.update({ pid: d.pid }, { $set: { did: rs.data.result.did } })
          
        } else {
          console.log(rs.response.data);
          
        }
        // console.log(rs.data);

        //save did

      }

    }


    // loop exit
    res.send({ ok: false, message: 'Save Error' });

  } catch (error) {
    console.log(error);

    res.send({ ok: false, message: 'Save Error' });
  }
});
router.get('/citizen5', async (req: Request, res: Response) => {
  try {
    // count exit
    const count = await PersonalPid.countDocuments({ did: { $exists: false } });
    const countLoop = count >= 5000 ? count / 5000 : 1;
    console.log(countLoop);
    for (let i = 50; i < countLoop; i++) {
      const data: any = await PersonalPid.find({ did: { $exists: false } }).limit(5000).skip(i * 5000);
      for (const d of data) {
        // create did 
        
        console.time('wallet5');
        const rs: any = await walletModel.createWallet(d.pid);
        console.timeEnd('wallet5');
        // console.log(d.pid,rs.data.result.did);
        if (rs.status == 200) {
          
          await PersonalPid.update({ pid: d.pid }, { $set: { did: rs.data.result.did } })
          
        } else {
          console.log(rs.response.data);
          
        }
        // console.log(rs.data);

        //save did

      }

    }


    // loop exit
    res.send({ ok: false, message: 'Save Error' });

  } catch (error) {
    console.log(error);

    res.send({ ok: false, message: 'Save Error' });
  }
});


export default router;