import * as jwt from 'jsonwebtoken';
const crypto = require("crypto");
const CryptoJS = require("crypto-js");
const aesjs = require('aes-js');
export class AlgorithmModel {
  private secretKey = process.env.SECRET_KEY;

  hashCidDB(cid: string) {
    if (cid.length == 13) {
      const sumCid: number = parseInt(cid[0]) + parseInt(cid[1]) + parseInt(cid[2]) + parseInt(cid[3]) + parseInt(cid[4]) + parseInt(cid[5]) + parseInt(cid[6]) + parseInt(cid[7]) + parseInt(cid[8]) + parseInt(cid[9]) + parseInt(cid[10]) + parseInt(cid[11]) + parseInt(cid[12]);
      const cidMergeSum = `${cid}_${sumCid}`;
      // const md5Hash1 = crypto.createHmac("md5", cidMergeSum);
      const md5Hash1 = CryptoJS.MD5(cidMergeSum);
      const md5Hash1String = md5Hash1.toString()
      const subSwitch = `${md5Hash1String.substring(md5Hash1String.length - 2, md5Hash1String.length)}${md5Hash1String.substring(2, md5Hash1String.length - 2)}${md5Hash1String.substring(0, 2)}${cid.substring(cid.length - 2, cid.length)}`
      return subSwitch
    } else {
      return null
    }
  }

  hashCidAPI(cid: string) {
    if (cid.length == 13) {
      const md5Hash1 = CryptoJS.MD5(cid);
      const md5Hash1String = md5Hash1.toString();
      const subSwitch = `${cid.substring(0, 2)}${md5Hash1String}${cid.substring(cid.length - 2, cid.length)}`
      return subSwitch
    } else {
      return null
    }
  }
  
  enCryptAES(text) {
    if (text == null || text == "" || text == undefined) {
      return null
    } else {

      const ENC_KEY = process.env.ENC_KEY
      const IV = process.env.IV
      // ENC_KEY and IV can be generated as crypto.randomBytes(32).toString('hex');

      const phrase = text;

      var encrypt = ((val) => {
        let cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);
        let encrypted = cipher.update(val, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
      });
      return encrypt(phrase);;
    }
  }

}