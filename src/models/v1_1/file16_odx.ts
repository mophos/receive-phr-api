import { mongoose } from "../../config/database_16file";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({}, { strict: false });

mongoose.model
var File16Odx = mongoose.model("schemaFile16Odx", objSchema, 'file16_odx');

export = File16Odx;
