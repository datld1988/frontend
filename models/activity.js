const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/********** Define Schema ***********/
let ActivitySchema = new Schema({
  work_id: String,
  username: String,
  fullname: String,
  description: String,
  created: { type: Date, default: new Date() }
});

/********** Export Schema ***********/
module.exports = mongoose.model("Activity", ActivitySchema);
