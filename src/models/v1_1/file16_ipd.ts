import { mongoose } from "../../config/database";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({}, { strict: false });

mongoose.model
var File16Ipd = mongoose.model("schemaFile16Ipd", objSchema, 'file16_ipd');

export = File16Ipd;
