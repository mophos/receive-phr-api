import { mongoose } from "../../config/database_16file";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({}, { strict: false });

mongoose.model
var File16Idx = mongoose.model("schemaFile16Idx", objSchema, 'file16_idx');

export = File16Idx;
