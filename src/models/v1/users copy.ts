import { mongoose } from "../../config/database";
import { Document, Schema } from "mongoose";

// interface
interface IUser extends Document {
  cid: String;
  password: String;
  displayName: String;
}

// schema
var userSchema = new Schema({

});

// model
// interface IUserModel extends  mongoose.Document { }

var Person = mongoose.model("Person", userSchema,'person');

export = Person;

// export class PersonModel {

//   async getPerson(db) {
//     var col = db.collection('person');
//     return await col.find({ "cid": "1100400728564" })
//   }

// }
