import { mongoose } from "../../config/database_16file";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({}, { strict: false });

mongoose.model
var File16Labfu = mongoose.model("schemaFile16Labfu", objSchema, 'file16_labfu');

export = File16Labfu;
