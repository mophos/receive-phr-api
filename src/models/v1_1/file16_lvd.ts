import { mongoose } from "../../config/database";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({}, { strict: false });

mongoose.model
var File16Lvd = mongoose.model("schemaFile16Lvd", objSchema, 'file16_lvd');

export = File16Lvd;
