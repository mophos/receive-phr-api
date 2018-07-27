import * as mongoose from "mongoose";

if (process.env.NODE_ENV === "testing") {

  var mongoDB = 'mongodb://127.0.0.1:27017/test';
  mongoose.connect(mongoDB);
  // Get Mongoose to use the global promise library
  (mongoose as any).Promise = global.Promise;
  //Get the default connection
  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    // we're connected!
    console.log('Mongodb connected!');

  });

} else {
  var mongoDB = 'mongodb://127.0.0.1:27017/mydb';
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    bufferCommands: false,
    user: 'abc',
    pass: '#def#'
  });
  // Get Mongoose to use the global promise library
  (mongoose as any).Promise = global.Promise;
  //Get the default connection
  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    // we're connected!
    console.log('Mongodb connected!');
  });

}

export { mongoose };