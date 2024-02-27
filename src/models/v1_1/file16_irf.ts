import { mongoose } from "../../config/database";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({}, { strict: false });

mongoose.model
var File16Irf = mongoose.model("schemaFile16Irf", objSchema, 'file16_irf');

export = File16Irf;
