import PersonThaiCitizen = require("./person_thai_citizen");

const { v4 } = require('uuid');
const _ = require('lodash');

export class HealthIdModel {

    async mappingHealthID(array) {
        const healthId = await this.findHealthID(array);
        const cidNotFound = [];
        for (const a of array) {
            const idx = _.findIndex(healthId, { cid: a.cid });
            if (idx > -1) {
                //FOUND
                a.health_id = healthId[idx].health_id;
            } else {
                // NOTFOUND
                const uuid = v4();
                a.health_id = uuid;
                cidNotFound.push({ cid: a.cid.toString(), health_id: uuid });
                // save mongodb
            }
        }
        let error = false;
        if (cidNotFound.length) {
            const res = await this.saveHealthID(cidNotFound);
            if (!res) {
                error = true;
            }
        }

        if (error) {
            return { ok: false };
        } else {
            return { ok: true, rows: array };
        }
    }

    async findHealthID(array) {
        try {
            const cid = _.map(array, (x) => { return x.cid });
            const rs: any = await PersonThaiCitizen.find({
                cid: {
                    $in: cid
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