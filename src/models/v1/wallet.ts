var axios = require("axios").default;

export class WalletModel {

  createWallet(pid) {
    const token = process.env.AAM_TOKEN;
    var options = {
      method: 'POST',
      url: 'https://aamservice.moph.go.th/wallet/create/mobile',
      // url: 'https://aamservice.moph.go.th/wallet/create',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `cwn-secret`
      },
      data: {
        "citizenId": pid,
        "password": "123456",
        "appId": "bcb30a9d-1cf7-4789-831b-7d8d24a1b0bd"
      }
    };
    return new Promise<void>((resolve, reject) => {
      axios.request(options).then(function (response) {
        // console.log(response.data);
        resolve(response);
      }).catch(function (error) {
        // console.error(error);
        resolve(error);
      });
    })
  }



}