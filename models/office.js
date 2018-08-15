const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/********** Define Schema ***********/
let OfficeSchema = new Schema({
	name: String,
	code: { unique: true, type: String },
	parent_code: String,
	departments: Array,
	address: String,
	phone: String,
	fax: String,
	email: String,
	website: String,
	members: Number,
	points: Number,
	topics: Number,
	articles: Number,
	files: Number
});

/********** Export Schema ***********/
module.exports = mongoose.model('Office', OfficeSchema);