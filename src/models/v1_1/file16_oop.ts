import { mongoose } from "../../config/database";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({}, { strict: false });

mongoose.model
var File16Oop = mongoose.model("schemaFile16Oop", objSchema, 'file16_oop');

export = File16Oop;
