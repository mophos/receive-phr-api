import { mongoose } from "../../config/database_16file";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({}, { strict: false });

mongoose.model
var File16Ins = mongoose.model("schemaFile16Ins", objSchema, 'file16_ins');

export = File16Ins;
