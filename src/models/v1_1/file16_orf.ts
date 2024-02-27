import { mongoose } from "../../config/database_16file";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({}, { strict: false });

mongoose.model
var File16Orf = mongoose.model("schemaFile16Orf", objSchema, 'file16_orf');

export = File16Orf;
