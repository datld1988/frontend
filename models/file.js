const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/********** Define Schema ***********/
let FileSchema = new Schema({
	work_id: String,
	type: Number,
	description: String,
	file_url: String,
	created: {type: Date, default: new Date()},
	is_deleted: {type: Boolean, default: false}
});

/********** Export Schema ***********/
module.exports = mongoose.model('File', FileSchema);