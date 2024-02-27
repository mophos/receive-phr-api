import { mongoose } from "../../config/database";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({}, { strict: false });

mongoose.model
var File16Pat = mongoose.model("schemaFile16Pat", objSchema, 'file16_pat');

export = File16Pat;
