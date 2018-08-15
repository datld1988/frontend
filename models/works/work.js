const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/********** Define Schema ***********/
let WorkSchema = new Schema({
  name: String,
  type: Number,
  roles: Object,
  all_point: Number,
  add_point: Number,
  author: String,
  author_fullname: String,
  author_gender: Number,
  cochair: Array,
  statitics: Object,
  followers: Array,
  created_date: Date,
  updated_date: Date,
  is_opened: Boolean,
  is_deleted: Boolean,
  work_status: Number,
  status: Number,

  //TOPIC
  goal_completion: String,
  articles: Array,
  members: Array,
  research_area: Number,
  review_date: Number,
  start_date: Number,
  end_date: Number,
  budget_source: Number,
  total_cost: Number,
  receive_amount: Number,
  operating_amount: Number,
  unit_money: Number,
  ethical_assembly: Number,
  level: Number,
  rank: Number,
  technology_transfer: String,

  masoDeTai: String, // Mã số đề tài
  org_impl: String, // Tổ chức chủ trì thực hiện
  org_coo_impl: String, // Tổ chức phối hợp thực hiện
  country_impl: String, // Nước phối hợp thực hiện
  receive_amount_year: Number, // Năm chuyển tiền
  expected_date: Number, // Thời gian dự kiến nghiệm thu
  over_date: Number, // Thời gian gia hạn
  ethical_assembly_date: String, // Số, ngày/tháng/năm bản chấp thuận
  ethical_assembly_date_meeting: Number, // Ngày họp HĐ Đạo đức (Quy trình đầy đủ)
  ethical_assembly_member: String, // Các thành viên HĐ tham dự
  ethical_assembly_date_summary: Number, // Ngày tổng hợp biên bản góp ý (quy trình đầy đủ)
  ethical_assembly_comment: String, // Ủy viên nhận xét
  decided_works: Number, // quyết định đề tài
  decided_works_approval: String, // Số Quyết định phê duyệt đề tài
  decided_works_approval_date: Number, // Ngày ký quyết định
  decided_works_approval_level: String, // Cấp quyết định
  decided_works_acceptance: String, // Số Quyết định nghiệm thu đề tài
  decided_works_acceptance_date: Number, // Ngày ký quyết định nghiệm thu
  decided_works_acceptance_level: String, // Cấp quyết định nghiệm thu
  decided_works_acceptance_off: String, // Số Quyết định công nhận kết quả nghiệm thu của các cơ sở khác
  decided_works_acceptance_off_date: Number, // Ngày ký quyết định
  decided_works_acceptance_off_level: String, // Cấp quyết định
  product_edu_dh: Number, // Số lượng ĐH
  product_edu_ths: Number, // Số lượng THS
  product_edu_cki: Number, // Số lượng CKI
  product_edu_ckii: Number, // Số lượng CKII
  product_edu_ts: Number, // Số lượng TS
  product_edu_nt: Number, // Số lượng Bác sỹ Nội trú
  product_edu_other: Number, // Số lượng khác
  product_science_cd: Number, // Số lượng chuyên đề
  product_science_qt: Number, // Số lượng quy trình
  product_science_bb: Number, // Số lượng bài báo
  product_science_sa: Number, // Số lượng sách
  product_science_other: Number, // Số lượng khác
  month_perform: Number, // Số tháng thực hiện
  work_parent: Array, // Đề tài cha -> work_parent ['idDetai',''Tendetai]

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
  keyword: Array,
  summary: String,
  issn: String,
  url: String
});

/********** Export Schema ***********/
module.exports = mongoose.model("Manage_Work_Work", WorkSchema, "works");
