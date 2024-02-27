/// <reference path="../../../typings.d.ts" />
import { Router, Request, Response } from 'express';
const router: Router = Router();
const Validator = require('jsonschema').Validator;
const multer = require('multer')
const path = require('path')
const fse = require('fs-extra')
import * as _ from 'lodash';
const fs = require('fs');

// import model 
import { CsvModel } from '../../models/v1_1/csv';
import File16Ins = require('../../models/v1_1/file16_ins');
import File16Pat = require('../../models/v1_1/file16_pat');
import File16Opd = require('../../models/v1_1/file16_opd');
import File16Orf = require('../../models/v1_1/file16_orf');
import File16Odx = require('../../models/v1_1/file16_odx');
import File16Oop = require('../../models/v1_1/file16_oop');
import File16Ipd = require('../../models/v1_1/file16_ipd');
import File16Irf = require('../../models/v1_1/file16_irf');
import File16Idx = require('../../models/v1_1/file16_idx');
import File16Iop = require('../../models/v1_1/file16_iop');
import File16Cht = require('../../models/v1_1/file16_cht');
import File16Cha = require('../../models/v1_1/file16_cha');
import File16Aer = require('../../models/v1_1/file16_aer');
import File16Adp = require('../../models/v1_1/file16_adp');
import File16Lvd = require('../../models/v1_1/file16_lvd');
import File16Dru = require('../../models/v1_1/file16_dru');
import File16Labfu = require('../../models/v1_1/file16_labfu');
const csvModel = new CsvModel();



router.post('/ins', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    // await File16Ins.insertMany(data, { ordered: false });
    let batch = File16Ins.collection.initializeOrderedBulkOp();
    for (const d of data) {
      const updateOBJ: any = {};
      if (d.HN) {
        updateOBJ.HN = d.HN;
      } if (d.INSCL) {
        updateOBJ.INSCL = d.INSCL;
      } if (d.SUBTYPE) {
        updateOBJ.SUBTYPE = d.SUBTYPE;
      } if (d.CID) {
        updateOBJ.CID = d.CID;
      } if (d.HCODE) {
        updateOBJ.HCODE = d.HCODE;
      } if (d.DATEEXP) {
        updateOBJ.DATEEXP = d.DATEEXP;
      } if (d.HOSPMAIN) {
        updateOBJ.HOSPMAIN = d.HOSPMAIN;
      } if (d.HOSPSUB) {
        updateOBJ.HOSPSUB = d.HOSPSUB;
      } if (d.GOVCODE) {
        updateOBJ.GOVCODE = d.GOVCODE;
      } if (d.GOVNAME) {
        updateOBJ.GOVNAME = d.GOVNAME;
      } if (d.PERMITNO) {
        updateOBJ.PERMITNO = d.PERMITNO;
      } if (d.DOCNO) {
        updateOBJ.DOCNO = d.DOCNO;
      } if (d.OWNRPID) {
        updateOBJ.OWNRPID = d.OWNRPID;
      } if (d.OWNNAME) {
        updateOBJ.OWNNAME = d.OWNNAME;
      } if (d.AN) {
        updateOBJ.AN = d.AN;
      } if (d.SEQ) {
        updateOBJ.SEQ = d.SEQ;
      } if (d.SUBINSCL) {
        updateOBJ.SUBINSCL = d.SUBINSCL;
      } if (d.RELINSCL) {
        updateOBJ.RELINSCL = d.RELINSCL;
      } if (d.HTYPE) {
        updateOBJ.HTYPE = d.HTYPE;
      }
      batch.find({ "HN": d.HN, "HCODE": d.HCODE, "INSCL": d.INSCL, "HOSPMAIN": d.HOSPMAIN, "HOSPSUB": d.HOSPSUB })
        .upsert().update({
          $set: updateOBJ
        });
    }
    return new Promise((resolve, reject) => {
      batch.execute(function (err, result) {
        if (err) {
          console.log(err);
          res.send({ ok: true, error: err });
        } else {
          res.send({ ok: true });
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500)
    res.send({ ok: false, message: 'Internal Error' });
  }
});


router.post('/pat', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let batch = File16Pat.collection.initializeOrderedBulkOp();
    for (const d of data) {
      const updateOBJ: any = {};
      if (d.HCODE) {
        updateOBJ.HCODE = d.HCODE;
      } if (d.HN) {
        updateOBJ.HN = d.HN;
      } if (d.CHANGWAT) {
        updateOBJ.CHANGWAT = d.CHANGWAT;
      } if (d.AMPHUR) {
        updateOBJ.AMPHUR = d.AMPHUR;
      } if (d.DOB) {
        updateOBJ.DOB = d.DOB;
      } if (d.SEX) {
        updateOBJ.SEX = d.SEX;
      } if (d.MARRIAGE) {
        updateOBJ.MARRIAGE = d.MARRIAGE;
      } if (d.OCCUPA) {
        updateOBJ.OCCUPA = d.OCCUPA;
      } if (d.NATION) {
        updateOBJ.NATION = d.NATION;
      } if (d.PERSON_ID) {
        updateOBJ.PERSON_ID = d.PERSON_ID;
      } if (d.NAMEPAT) {
        updateOBJ.NAMEPAT = d.NAMEPAT;
      } if (d.TITLE) {
        updateOBJ.TITLE = d.TITLE;
      } if (d.FNAME) {
        updateOBJ.FNAME = d.FNAME;
      } if (d.LNAME) {
        updateOBJ.LNAME = d.LNAME;
      } if (d.IDTYPE) {
        updateOBJ.IDTYPE = d.IDTYPE;
      }
      batch.find({ "HN": d.HN, "HCODE": d.HCODE, "PERSON_ID": d.PERSON_ID })
        .upsert().update({
          $set: updateOBJ
        });
    }
    return new Promise((resolve, reject) => {
      batch.execute(function (err, result) {
        if (err) {
          console.log(err);
          res.send({ ok: true, error: err });
        } else {
          res.send({ ok: true });
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500)
    res.send({ ok: false, message: 'Internal Error' });
  }
});

router.post('/opd', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let batch = File16Opd.collection.initializeOrderedBulkOp();
    for (const d of data) {
      const updateOBJ: any = {};
      if (d.HN) {
        updateOBJ.HN = d.HN;
      } if (d.CLINIC) {
        updateOBJ.CLINIC = d.CLINIC;
      } if (d.DATEOPD) {
        updateOBJ.DATEOPD = d.DATEOPD;
      } if (d.TIMEOPD) {
        updateOBJ.TIMEOPD = d.TIMEOPD;
      } if (d.SEQ) {
        updateOBJ.SEQ = d.SEQ;
      } if (d.UUC) {
        updateOBJ.UUC = d.UUC;
      } if (d.DETAIL) {
        updateOBJ.DETAIL = d.DETAIL;
      } if (d.BTEMP) {
        updateOBJ.BTEMP = d.BTEMP;
      } if (d.SBP) {
        updateOBJ.SBP = d.SBP;
      } if (d.DBP) {
        updateOBJ.DBP = d.DBP;
      } if (d.PR) {
        updateOBJ.PR = d.PR;
      } if (d.RR) {
        updateOBJ.RR = d.RR;
      } if (d.OPTYPE) {
        updateOBJ.OPTYPE = d.OPTYPE;
      } if (d.TYPEIN) {
        updateOBJ.TYPEIN = d.TYPEIN;
      } if (d.TYPEOUT) {
        updateOBJ.TYPEOUT = d.TYPEOUT;
      }
      batch.find({ "HN": d.HN, "SEQ": d.SEQ, "DATEOPD": d.DATEOPD, "CLINIC": d.CLINIC })
        .upsert().update({
          $set: updateOBJ
        });
    }
    return new Promise((resolve, reject) => {
      batch.execute(function (err, result) {
        if (err) {
          console.log(err);
          res.send({ ok: true, error: err });
        } else {
          res.send({ ok: true });
        }
      });
    });

  } catch (error) {
    console.log(error);
    res.status(500)
    res.send({ ok: false, message: 'Internal Error' });
  }
});

router.post('/orf', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let batch = File16Orf.collection.initializeOrderedBulkOp();
    for (const d of data) {
      const updateOBJ: any = {};
      if (d.HN) {
        updateOBJ.HN = d.HN;
      } if (d.CLINIC) {
        updateOBJ.CLINIC = d.CLINIC;
      } if (d.DATEOPD) {
        updateOBJ.DATEOPD = d.DATEOPD;
      } if (d.REFER) {
        updateOBJ.REFER = d.REFER;
      } if (d.REFERTYPE) {
        updateOBJ.REFERTYPE = d.REFERTYPE;
      } if (d.SEQ) {
        updateOBJ.SEQ = d.SEQ;
      } if (d.REFREDATE) {
        updateOBJ.REFREDATE = d.REFREDATE;
      }
      batch.find({ "HN": d.HN, "SEQ": d.SEQ, "DATEOPD": d.DATEOPD, "CLINIC": d.CLINIC })
        .upsert().update({
          $set: updateOBJ
        });
    }
    return new Promise((resolve, reject) => {
      batch.execute(function (err, result) {
        if (err) {
          console.log(err);
          res.send({ ok: true, error: err });
        } else {
          res.send({ ok: true });
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500)
    res.send({ ok: false, message: 'Internal Error' });
  }
});

router.post('/odx', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let batch = File16Odx.collection.initializeOrderedBulkOp();
    for (const d of data) {
      const updateOBJ: any = {};
      if (d.HN) {
        updateOBJ.HN = d.HN;
      } if (d.CLINIC) {
        updateOBJ.CLINIC = d.CLINIC;
      } if (d.DATEDX) {
        updateOBJ.DATEDX = d.DATEDX;
      } if (d.DIAG) {
        updateOBJ.DIAG = d.DIAG;
      } if (d.DXTYPE) {
        updateOBJ.DXTYPE = d.DXTYPE;
      } if (d.DRDX) {
        updateOBJ.DRDX = d.DRDX;
      } if (d.PERSON_ID) {
        updateOBJ.PERSON_ID = d.PERSON_ID;
      } if (d.SEQ) {
        updateOBJ.SEQ = d.SEQ;
      }
      batch.find({ "HN": d.HN, "SEQ": d.SEQ, "DATEDX": d.DATEDX, "CLINIC": d.CLINIC, "DIAG": d.DIAG })
        .upsert().update({
          $set: updateOBJ
        });
    }
    return new Promise((resolve, reject) => {
      batch.execute(function (err, result) {
        if (err) {
          console.log(err);
          res.send({ ok: true, error: err });
        } else {
          res.send({ ok: true });
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500)
    res.send({ ok: false, message: 'Internal Error' });
  }
});

router.post('/oop', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let batch = File16Oop.collection.initializeOrderedBulkOp();
    for (const d of data) {
      const updateOBJ: any = {};
      if (d.HN) {
        updateOBJ.HN = d.HN;
      } if (d.CLINIC) {
        updateOBJ.CLINIC = d.CLINIC;
      } if (d.DATEOPD) {
        updateOBJ.DATEOPD = d.DATEOPD;
      } if (d.OPER) {
        updateOBJ.OPER = d.OPER;
      } if (d.DROPID) {
        updateOBJ.DROPID = d.DROPID;
      } if (d.SERVPRICE) {
        updateOBJ.SERVPRICE = d.SERVPRICE;
      } if (d.PERSON_ID) {
        updateOBJ.PERSON_ID = d.PERSON_ID;
      } if (d.SEQ) {
        updateOBJ.SEQ = d.SEQ;
      }
      batch.find({ "HN": d.HN, "SEQ": d.SEQ, "DATEOPD": d.DATEOPD, "CLINIC": d.CLINIC, "OPER": d.OPER })
        .upsert().update({
          $set: updateOBJ
        });
    }
    return new Promise((resolve, reject) => {
      batch.execute(function (err, result) {
        if (err) {
          console.log(err);
          res.send({ ok: true, error: err });
        } else {
          res.send({ ok: true });
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500)
    res.send({ ok: false, message: 'Internal Error' });
  }
});

router.post('/ipd', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let batch = File16Ipd.collection.initializeOrderedBulkOp();
    for (const d of data) {
      const updateOBJ: any = {};
      if (d.HN) {
        updateOBJ.HN = d.HN;
      } if (d.AN) {
        updateOBJ.AN = d.AN;
      } if (d.DATEADM) {
        updateOBJ.DATEADM = d.DATEADM;
      } if (d.TIMEADM) {
        updateOBJ.TIMEADM = d.TIMEADM;
      } if (d.DATEDSC) {
        updateOBJ.DATEDSC = d.DATEDSC;
      } if (d.TIMEDSC) {
        updateOBJ.TIMEDSC = d.TIMEDSC;
      } if (d.DISCHS) {
        updateOBJ.DISCHS = d.DISCHS;
      } if (d.DISCHT) {
        updateOBJ.DISCHT = d.DISCHT;
      } if (d.WARDDSC) {
        updateOBJ.WARDDSC = d.WARDDSC;
      } if (d.DEPT) {
        updateOBJ.DEPT = d.DEPT;
      } if (d.ADM_W) {
        updateOBJ.ADM_W = d.ADM_W;
      } if (d.UUC) {
        updateOBJ.UUC = d.UUC;
      } if (d.SVCTYPE) {
        updateOBJ.SVCTYPE = d.SVCTYPE;
      }
      batch.find({ "HN": d.HN, "AN": d.AN, "DATEADM": d.DATEADM })
        .upsert().update({
          $set: updateOBJ
        });
    }
    return new Promise((resolve, reject) => {
      batch.execute(function (err, result) {
        if (err) {
          console.log(err);
          res.send({ ok: true, error: err });
        } else {
          res.send({ ok: true });
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500)
    res.send({ ok: false, message: 'Internal Error' });
  }
});

router.post('/irf', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let batch = File16Irf.collection.initializeOrderedBulkOp();
    for (const d of data) {
      const updateOBJ: any = {};
      if (d.AN) {
        updateOBJ.AN = d.AN;
      } if (d.REFER) {
        updateOBJ.REFER = d.REFER;
      } if (d.REFERTYPE) {
        updateOBJ.REFERTYPE = d.REFERTYPE;
      }
      batch.find({ "AN": d.AN, "REFER": d.REFER, "REFERTYPE": d.REFERTYPE })
        .upsert().update({
          $set: updateOBJ
        });
    }
    return new Promise((resolve, reject) => {
      batch.execute(function (err, result) {
        if (err) {
          console.log(err);
          res.send({ ok: true, error: err });
        } else {
          res.send({ ok: true });
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500)
    res.send({ ok: false, message: 'Internal Error' });
  }
});

router.post('/idx', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let batch = File16Idx.collection.initializeOrderedBulkOp();
    for (const d of data) {
      const updateOBJ: any = {};
      if (d.AN) {
        updateOBJ.AN = d.AN;
      } if (d.DIAG) {
        updateOBJ.DIAG = d.DIAG;
      } if (d.DXTYPE) {
        updateOBJ.DXTYPE = d.DXTYPE;
      } if (d.DRDX) {
        updateOBJ.DRDX = d.DRDX;
      }
      batch.find({ "AN": d.AN, "DIAG": d.DIAG })
        .upsert().update({
          $set: updateOBJ
        });
    }
    return new Promise((resolve, reject) => {
      batch.execute(function (err, result) {
        if (err) {
          console.log(err);
          res.send({ ok: true, error: err });
        } else {
          res.send({ ok: true });
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500)
    res.send({ ok: false, message: 'Internal Error' });
  }
});

router.post('/iop', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let batch = File16Iop.collection.initializeOrderedBulkOp();
    for (const d of data) {
      const updateOBJ: any = {};
      if (d.AN) {
        updateOBJ.AN = d.AN;
      } if (d.OPER) {
        updateOBJ.OPER = d.OPER;
      } if (d.OPTYPE) {
        updateOBJ.OPTYPE = d.OPTYPE;
      } if (d.DROPID) {
        updateOBJ.DROPID = d.DROPID;
      } if (d.DATEIN) {
        updateOBJ.DATEIN = d.DATEIN;
      } if (d.TIMEIN) {
        updateOBJ.TIMEIN = d.TIMEIN;
      } if (d.DATEOUT) {
        updateOBJ.DATEOUT = d.DATEOUT;
      } if (d.TIMEOUT) {
        updateOBJ.TIMEOUT = d.TIMEOUT;
      }
      batch.find({ "AN": d.AN, "OPER": d.OPER, "DATEIN": d.DATEIN })
        .upsert().update({
          $set: updateOBJ
        });
    }
    return new Promise((resolve, reject) => {
      batch.execute(function (err, result) {
        if (err) {
          console.log(err);
          res.send({ ok: true, error: err });
        } else {
          res.send({ ok: true });
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500)
    res.send({ ok: false, message: 'Internal Error' });
  }
});

router.post('/cht', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let batch = File16Cht.collection.initializeOrderedBulkOp();
    for (const d of data) {
      const updateOBJ: any = {};
      if (d.HN) {
        updateOBJ.HN = d.HN;
      } if (d.AN) {
        updateOBJ.AN = d.AN;
      } if (d.DATE) {
        updateOBJ.DATE = d.DATE;
      } if (d.TOTAL) {
        updateOBJ.TOTAL = d.TOTAL;
      } if (d.PAID) {
        updateOBJ.PAID = d.PAID;
      } if (d.PTTYPE) {
        updateOBJ.PTTYPE = d.PTTYPE;
      } if (d.PERSON_ID) {
        updateOBJ.PERSON_ID = d.PERSON_ID;
      } if (d.SEQ) {
        updateOBJ.SEQ = d.SEQ;
      } if (d.OPD_MEMO) {
        updateOBJ.OPD_MEMO = d.OPD_MEMO;
      } if (d.INVOICE_NO) {
        updateOBJ.INVOICE_NO = d.INVOICE_NO;
      } if (d.INVOICE_LT) {
        updateOBJ.INVOICE_LT = d.INVOICE_LT;
      }
      batch.find({ "HN": d.HN, "AN": d.AN, "DATE": d.DATE, "PERSON_ID": d.PERSON_ID, "SEQ": d.SEQ })
        .upsert().update({
          $set: updateOBJ
        });
    }
    return new Promise((resolve, reject) => {
      batch.execute(function (err, result) {
        if (err) {
          console.log(err);
          res.send({ ok: true, error: err });
        } else {
          res.send({ ok: true });
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500)
    res.send({ ok: false, message: 'Internal Error' });
  }
});

router.post('/cha', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let batch = File16Cha.collection.initializeOrderedBulkOp();
    for (const d of data) {
      const updateOBJ: any = {};
      if (d.HN) {
        updateOBJ.HN = d.HN;
      } if (d.AN) {
        updateOBJ.AN = d.AN;
      } if (d.DATE) {
        updateOBJ.DATE = d.DATE;
      } if (d.CHRGITEM) {
        updateOBJ.CHRGITEM = d.CHRGITEM;
      } if (d.AMOUNT) {
        updateOBJ.AMOUNT = d.AMOUNT;
      } if (d.PERSON_ID) {
        updateOBJ.PERSON_ID = d.PERSON_ID;
      } if (d.SEQ) {
        updateOBJ.SEQ = d.SEQ;
      }
      batch.find({ "HN": d.HN, "AN": d.AN, "DATE": d.DATE, "PERSON_ID": d.PERSON_ID, "SEQ": d.SEQ })
        .upsert().update({
          $set: updateOBJ
        });
    }
    return new Promise((resolve, reject) => {
      batch.execute(function (err, result) {
        if (err) {
          console.log(err);
          res.send({ ok: true, error: err });
        } else {
          res.send({ ok: true });
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500)
    res.send({ ok: false, message: 'Internal Error' });
  }
});

router.post('/aer', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let batch = File16Aer.collection.initializeOrderedBulkOp();
    for (const d of data) {
      const updateOBJ: any = {};
      if (d.HN) {
        updateOBJ.HN = d.HN;
      } if (d.AN) {
        updateOBJ.AN = d.AN;
      } if (d.DATEOPD) {
        updateOBJ.DATEOPD = d.DATEOPD;
      } if (d.AUTHAE) {
        updateOBJ.AUTHAE = d.AUTHAE;
      } if (d.AETIME) {
        updateOBJ.AETIME = d.AETIME;
      } if (d.AETYPE) {
        updateOBJ.AETYPE = d.AETYPE;
      } if (d.REFER_NO) {
        updateOBJ.REFER_NO = d.REFER_NO;
      } if (d.REFMAINI) {
        updateOBJ.REFMAINI = d.REFMAINI;
      } if (d.IREFTYPE) {
        updateOBJ.IREFTYPE = d.IREFTYPE;
      } if (d.REFMAINO) {
        updateOBJ.REFMAINO = d.REFMAINO;
      } if (d.OREFTYPE) {
        updateOBJ.OREFTYPE = d.OREFTYPE;
      } if (d.UCAE) {
        updateOBJ.UCAE = d.UCAE;
      } if (d.EMTYPE) {
        updateOBJ.EMTYPE = d.EMTYPE;
      } if (d.SEQ) {
        updateOBJ.SEQ = d.SEQ;
      } if (d.AESTATUS) {
        updateOBJ.AESTATUS = d.AESTATUS;
      } if (d.DALERT) {
        updateOBJ.DALERT = d.DALERT;
      } if (d.TALERT) {
        updateOBJ.TALERT = d.TALERT;
      }
      batch.find({ "HN": d.HN, "AN": d.AN, "DATEOPD": d.DATEOPD, "SEQ": d.SEQ })
        .upsert().update({
          $set: updateOBJ
        });
    }
    return new Promise((resolve, reject) => {
      batch.execute(function (err, result) {
        if (err) {
          console.log(err);
          res.send({ ok: true, error: err });
        } else {
          res.send({ ok: true });
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500)
    res.send({ ok: false, message: 'Internal Error' });
  }
});

router.post('/adp', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let batch = File16Adp.collection.initializeOrderedBulkOp();
    for (const d of data) {
      const updateOBJ: any = {};
      if (d.HN) {
        updateOBJ.HN = d.HN;
      } if (d.AN) {
        updateOBJ.AN = d.AN;
      } if (d.DATEOPD) {
        updateOBJ.DATEOPD = d.DATEOPD;
      } if (d.TYPE) {
        updateOBJ.TYPE = d.TYPE;
      } if (d.CODE) {
        updateOBJ.CODE = d.CODE;
      } if (d.QTY) {
        updateOBJ.QTY = d.QTY;
      } if (d.RATE) {
        updateOBJ.RATE = d.RATE;
      } if (d.SEQ) {
        updateOBJ.SEQ = d.SEQ;
      } if (d.CAGCODE) {
        updateOBJ.CAGCODE = d.CAGCODE;
      } if (d.DOSE) {
        updateOBJ.DOSE = d.DOSE;
      } if (d['CA-TYPE']) {
        updateOBJ['CA-TYPE'] = d['CA-TYPE'];
      } if (d.SERIALNO) {
        updateOBJ.SERIALNO = d.SERIALNO;
      } if (d.TOTCOPAY) {
        updateOBJ.TOTCOPAY = d.TOTCOPAY;
      } if (d['USE_STATUS']) {
        updateOBJ['USE_STATUS'] = d['USE_STATUS'];
      } if (d.TOTAL) {
        updateOBJ.TOTAL = d.TOTAL;
      } if (d.QTYDAY) {
        updateOBJ.QTYDAY = d.QTYDAY;
      } if (d.TMLTCODE) {
        updateOBJ.TMLTCODE = d.TMLTCODE;
      } if (d.STATUS1) {
        updateOBJ.STATUS1 = d.STATUS1;
      } if (d.BI) {
        updateOBJ.BI = d.BI;
      } if (d.CLINIC) {
        updateOBJ.CLINIC = d.CLINIC;
      } if (d.ITEMSRC) {
        updateOBJ.ITEMSRC = d.ITEMSRC;
      } if (d.PROVIDER) {
        updateOBJ.PROVIDER = d.PROVIDER;
      } if (d.GRAVIDA) {
        updateOBJ.GRAVIDA = d.GRAVIDA;
      } if (d['GA_WEEK']) {
        updateOBJ['GA_WEEK'] = d['GA_WEEK'];
      } if (d['DCIP/E_screen']) {
        updateOBJ['DCIP/E_screen'] = d['DCIP/E_screen'];
      } if (d.LMP) {
        updateOBJ.LMP = d.LMP;
      }
      batch.find({ "HN": d.HN, "AN": d.AN, "DATEOPD": d.DATEOPD, "SEQ": d.SEQ })
        .upsert().update({
          $set: updateOBJ
        });
    }
    return new Promise((resolve, reject) => {
      batch.execute(function (err, result) {
        if (err) {
          console.log(err);
          res.send({ ok: true, error: err });
        } else {
          res.send({ ok: true });
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500)
    res.send({ ok: false, message: 'Internal Error' });
  }
});

router.post('/lvd', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let batch = File16Lvd.collection.initializeOrderedBulkOp();
    for (const d of data) {
      const updateOBJ: any = {};
      if (d.SEQLVD) {
        updateOBJ.SEQLVD = d.SEQLVD;
      } if (d.AN) {
        updateOBJ.AN = d.AN;
      } if (d.DATEOUT) {
        updateOBJ.DATEOUT = d.DATEOUT;
      } if (d.TIMEOUT) {
        updateOBJ.TIMEOUT = d.TIMEOUT;
      } if (d.DATEIN) {
        updateOBJ.DATEIN = d.DATEIN;
      } if (d.TIMEIN) {
        updateOBJ.TIMEIN = d.TIMEIN;
      } if (d.QRTDAY) {
        updateOBJ.QRTDAY = d.QRTDAY;
      }
      batch.find({ "SEQLVD": d.SEQLVD, "AN": d.AN, "DATEOUT": d.DATEOUT, "DATEIN": d.DATEIN })
        .upsert().update({
          $set: updateOBJ
        });
    }
    return new Promise((resolve, reject) => {
      batch.execute(function (err, result) {
        if (err) {
          console.log(err);
          res.send({ ok: true, error: err });
        } else {
          res.send({ ok: true });
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500)
    res.send({ ok: false, message: 'Internal Error' });
  }
});

router.post('/dru', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let batch = File16Dru.collection.initializeOrderedBulkOp();
    for (const d of data) {
      const updateOBJ: any = {};
      if (d.HCODE) {
        updateOBJ.HCODE = d.HCODE;
      } if (d.HN) {
        updateOBJ.HN = d.HN;
      } if (d.AN) {
        updateOBJ.AN = d.AN;
      } if (d.CLINIC) {
        updateOBJ.CLINIC = d.CLINIC;
      } if (d.PERSON_ID) {
        updateOBJ.PERSON_ID = d.PERSON_ID;
      } if (d.DATE_SERV) {
        updateOBJ.DATE_SERV = d.DATE_SERV;
      } if (d.DID) {
        updateOBJ.DID = d.DID;
      } if (d.DIDNAME) {
        updateOBJ.DIDNAME = d.DIDNAME;
      } if (d.AMOUNT) {
        updateOBJ.AMOUNT = d.AMOUNT;
      } if (d.DRUGPRICE) {
        updateOBJ.DRUGPRICE = d.DRUGPRICE;
      } if (d.DRUGCOST) {
        updateOBJ.DRUGCOST = d.DRUGCOST;
      } if (d.DIDSTD) {
        updateOBJ.DIDSTD = d.DIDSTD;
      } if (d.UNIT) {
        updateOBJ.UNIT = d.UNIT;
      } if (d.UNIT_PACK) {
        updateOBJ.UNIT_PACK = d.UNIT_PACK;
      } if (d.SEQ) {
        updateOBJ.SEQ = d.SEQ;
      } if (d.DRUGREMARK) {
        updateOBJ.DRUGREMARK = d.DRUGREMARK;
      } if (d.PA_NO) {
        updateOBJ.PA_NO = d.PA_NO;
      } if (d.TOTCOPAY) {
        updateOBJ.TOTCOPAY = d.TOTCOPAY;
      } if (d.USE_STATUS) {
        updateOBJ.USE_STATUS = d.USE_STATUS;
      } if (d.TOTAL) {
        updateOBJ.TOTAL = d.TOTAL;
      } if (d.SIGCODE) {
        updateOBJ.SIGCODE = d.SIGCODE;
      } if (d.SIGTEXT) {
        updateOBJ.SIGTEXT = d.SIGTEXT;
      } if (d.PROVIDER) {
        updateOBJ.PROVIDER = d.PROVIDER;
      }
      batch.find({ "HCODE": d.HCODE, "AN": d.AN, "HN": d.HN, "CLINIC": d.CLINIC, "PERSON_ID": d.PERSON_ID, "DATE_SERV": d.DATE_SERV, "DID": d.DID })
        .upsert().update({
          $set: updateOBJ
        });
    }
    return new Promise((resolve, reject) => {
      batch.execute(function (err, result) {
        if (err) {
          console.log(err);
          res.send({ ok: true, error: err });
        } else {
          res.send({ ok: true });
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500)
    res.send({ ok: false, message: 'Internal Error' });
  }
});

router.post('/labfu', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    let batch = File16Labfu.collection.initializeOrderedBulkOp();
    for (const d of data) {
      const updateOBJ: any = {};
      if (d.HCODE) {
        updateOBJ.HCODE = d.HCODE;
      } if (d.HN) {
        updateOBJ.HN = d.HN;
      } if (d.PERSON_ID) {
        updateOBJ.PERSON_ID = d.PERSON_ID;
      } if (d.DATESERV) {
        updateOBJ.DATESERV = d.DATESERV;
      } if (d.SEQ) {
        updateOBJ.SEQ = d.SEQ;
      } if (d.LABTEST) {
        updateOBJ.LABTEST = d.LABTEST;
      } if (d.LABRESULT) {
        updateOBJ.LABRESULT = d.LABRESULT;
      }
      batch.find({ "HCODE": d.HCODE, "HN": d.HN, "PERSON_ID": d.PERSON_ID, "DATE_SERV": d.DATE_SERV, "SEQ": d.SEQ, "LABTEST": d.LABTEST })
        .upsert().update({
          $set: updateOBJ
        });
    }
    return new Promise((resolve, reject) => {
      batch.execute(function (err, result) {
        if (err) {
          console.log(err);
          res.send({ ok: true, error: err });
        } else {
          res.send({ ok: true });
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500)
    res.send({ ok: false, message: 'Internal Error' });
  }
});
export default router;