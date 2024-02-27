import { mongoose } from "../../config/database_16file";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({}, { strict: false });

mongoose.model
var File16Aer = mongoose.model("schemaFile16Aer", objSchema, 'file16_aer');

export = File16Aer;
