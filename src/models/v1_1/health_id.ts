import PersonThaiCitizen = require("./person_thai_citizen");
import { AlgorithmModel } from '../../models/v1_1/algorithm';
const { v4 } = require('uuid');
const _ = require('lodash');
const algorithmModel = new AlgorithmModel();
export class HealthIdModel {
    async mappingHealthID(array) {
        let cidNotFoundDB = [];
        let retry = 0;
        do {
            retry++;
            cidNotFoundDB = [];
            const healthId = await this.findHealthID(array);
            for (const a of array) {
                const idx = _.findIndex(healthId, { cid_hash: await algorithmModel.hashCidDB(a.cid) });
                if (idx > -1) {
                    //FOUND
                    a.health_id = healthId[idx].health_id;
                } else {
                    // NOTFOUND
                    const uuid = v4();
                    a.health_id = uuid;
                    cidNotFoundDB.push({ cid_hash: await algorithmModel.hashCidDB(a.cid), health_id: uuid });
                    // save mongodb
                }
            }
            let error = false;
            if (cidNotFoundDB.length) {
                const resCid = true
                await this.saveHealthID(cidNotFoundDB);
            }
            if (retry == 3) {
                return { ok: false };
            }
        } while (cidNotFoundDB.length)

        if (cidNotFoundDB.length) {
            return { ok: false };
        } else {
            return { ok: true, rows: array };
        }
    }
    //   const inHash = await insertCIDHash(json.rows);
    //   async insertCIDHash(array) {
    //     try {
    //       if (array.length) {
    //         const db = client.db(process.env.MONGO_DBNAME);
    //         let batch = [];
    //         for (const d of array) {
    //           batch.push({
    //             replaceOne:
    //             {
    //               "filter": {
    //                 "cid": d.cid,
    //                 "cid_hash": await algorithmModel.hashCidAPI(d.cid)
    //               },
    //               "replacement": {
    //                 "cid": d.cid,
    //                 "cid_hash": await algorithmModel.hashCidAPI(d.cid)
    //               },
    //               "upsert": true
    //             }
    //           })
    //         }
    //         if (batch.length) {
    //           const collection = await db.collection('person_thai_citizen_hash').bulkWrite(batch);
    //           if (collection.ok) {
    //             return true;
    //           } else {
    //             return false;
    //           }
    //         } else {
    //           return false;
    //         }
    //       } else {
    //         return true;
    //       }

    //     } catch (error) {
    //       console.log(error);
    //       return false;
    //     }
    //   }

    async findHealthID(array) {
        try {
            const cidHash = await _.map(array, (x) => { return algorithmModel.hashCidDB(x.cid) });
            const rs: any = await PersonThaiCitizen.find({
                cid_hash: {
                    $in: cidHash
                }
            })
            return rs;
        } catch (error) {
            return [];
        }
    }

    async saveHealthID(data) {
        try {
            const collection: any = await PersonThaiCitizen.insertMany(data, { ordered: false });
            if (collection.insertedCount == data.length) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }


}