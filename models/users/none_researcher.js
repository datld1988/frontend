const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/********** Define Schema ***********/
let NoneResearcherSchema = new Schema({
  //must have
  username: { unique: true, type: String }, //--> email
  password: String,
  user_type: { type: Number, default: 0 }, //--> 0: none research, 1: research
  full_name: String,
  work_roles: [],
  salt: String, //--> new Date().getTime() hỗ trợ md5 pass
  expired_date: Number, //--> yyyyMMdd
  isBanned: {
    type: Boolean,
    default: false
  },
  avatar: {
    big: String,
    normal: String,
    small: String
  },
  code: String,
  time_code: Number,

  // unnesseccery
  created_at: { default: new Date(), type: Date },
  updated_at: { default: new Date(), type: Date }
});

/********** Export Schema ***********/
module.exports = mongoose.model(
  "NoneResearcher",
  NoneResearcherSchema,
  "users"
);
