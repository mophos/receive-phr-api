const csv = require('fast-csv')
const fs = require('fs')

export class CsvModel {
    csvToJSON(csvUrl) {
        return new Promise<any>((resolve, reject) => {
            let csvHeaders;
            let stream = fs.createReadStream(csvUrl)
            let collectionCsv = []
            let csvFileStream = csv
                .parse({
                    headers: headers => {
                        csvHeaders = headers;
                        console.log(`Headers::: ${headers}`);
                        return headers.map((key, i) => key)
                    },
                    quote: '"',
                })
                .on('data', function (data) {
                    collectionCsv.push(data)
                })
                .on('end', function () {
                    fs.unlinkSync(csvUrl)
                    resolve(collectionCsv);
                })
            stream.pipe(csvFileStream)

        })
    }
}