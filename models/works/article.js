const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/********** Define Schema ***********/
let ArticleSchema = new Schema({
  name: String,
  type: { type: Number, default: 2 },
  roles: Object,
  all_point: { type: Number, default: 0 },
  add_point: { type: Number, default: 0 },
  author: String,
  author_fullname: String,
  author_gender: Number,
  cochair: Array,
  statitics: Object,
  followers: Array,
  created_date: { default: new Date(), type: Date },
  updated_date: { default: new Date(), type: Date },
  is_opened: { type: Boolean, default: false },
  is_deleted: { type: Boolean, default: false },
  work_status: { type: Number, default: 1 },  
  status: {type: Number, default: 1},

  //ARTICLE
  article_kind: Number,
  magazine_name: String,
  chapter: Number,
  number: Number,
  page: Number,
  publish_date: Number,
  impact_factor: Number,
  isi_scopus: Array,
  doi: String,
  issn: String,
  url: String,
  keyword: Array,
  summary: String
});

/********** Export Schema ***********/
module.exports = mongoose.model("Manage_Work_Article", ArticleSchema, "works");
