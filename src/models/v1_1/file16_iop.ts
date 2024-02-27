import { mongoose } from "../../config/database";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({}, { strict: false });

mongoose.model
var File16Iop = mongoose.model("schemaFile16Iop", objSchema, 'file16_iop');

export = File16Iop;
