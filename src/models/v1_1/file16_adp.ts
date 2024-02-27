import { mongoose } from "../../config/database_16file";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({}, { strict: false });

mongoose.model
var File16Adp = mongoose.model("schemaFile16Adp", objSchema, 'file16_adp');

export = File16Adp;
