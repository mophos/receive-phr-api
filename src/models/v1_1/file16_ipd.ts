import { mongoose } from "../../config/database_16file";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({}, { strict: false });

mongoose.model
var File16Ipd = mongoose.model("schemaFile16Ipd", objSchema, 'file16_ipd');

export = File16Ipd;
