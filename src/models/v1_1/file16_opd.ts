import { mongoose } from "../../config/database";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({}, { strict: false });

mongoose.model
var File16Opd = mongoose.model("schemaFile16Opd", objSchema, 'file16_opd');

export = File16Opd;
