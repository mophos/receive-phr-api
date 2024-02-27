import { mongoose } from "../../config/database";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({}, { strict: false });

mongoose.model
var File16Cha = mongoose.model("schemaFile16Cha", objSchema, 'file16_cha');

export = File16Cha;
