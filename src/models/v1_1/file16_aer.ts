import { mongoose } from "../../config/database";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({}, { strict: false });

mongoose.model
var File16Aer = mongoose.model("schemaFile16Aer", objSchema, 'file16_aer');

export = File16Aer;
