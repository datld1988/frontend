//DEFAULT MODEL FOR LOG
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/********** Define Schema ***********/
let ErrorLogSchema = new Schema({
	name: String,
	module: String,
	code: String,
	message: String,
	trace: String,
	response: {},
	username: String,
	created_at: { default: new Date, type: Date },
});

/********** Export Schema ***********/
module.exports = mongoose.model('ErrorLog', ErrorLogSchema);
