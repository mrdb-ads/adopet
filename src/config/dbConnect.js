import mongoose from "mongoose";
import info from "./info.js";

mongoose.connect(info);

let db = mongoose.connection;

export default db;