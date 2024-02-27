import { mongoose } from "../../config/database";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({}, { strict: false });

mongoose.model
var File16Cht = mongoose.model("schemaFile16Cht", objSchema, 'file16_cht');

export = File16Cht;
