import { mongoose } from "../../config/database_16file";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({}, { strict: false });

mongoose.model
var File16Lvd = mongoose.model("schemaFile16Lvd", objSchema, 'file16_lvd');

export = File16Lvd;
