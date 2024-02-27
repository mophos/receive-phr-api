import { mongoose } from "../../config/database_16file";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({}, { strict: false });

mongoose.model
var File16Dru = mongoose.model("schemaFile16Dru", objSchema, 'file16_dru');

export = File16Dru;
