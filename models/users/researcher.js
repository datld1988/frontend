const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/********** Define Schema ***********/
let ResearcherSchema = new Schema({
  //must have
  username: {
    unique: true,
    type: String
  }, //--> email
  password: String,
  point: { type: Number, default: 0 },
  topic: { type: Number, default: 0 },
  article: { type: Number, default: 0 },
  file: { type: Number, default: 0 },
  user_type: { type: Number, default: 1 }, //--> 0: none research, 1: research
  role: Number, //--> lấy từ master data [director, manager, staff] Constants: [0, 1, 2, 3...]
  work_roles: { type: Array, default: [] },
  family_name: String,
  middle_name: String,
  first_name: String,
  full_name: String,
  gender: Number, //--> [0, 1, 2] 0: nữ, 1: nam, 2:other
  birthday: Number, //--> yyyyMMdd
  academic_rank: Number, //--> lấy từ master data: [Giáo sư, Phó Giáo sư]  Constants: [0, 1, 2, 3...]
  degree: Number, //--> lấy từ master data: [Tiến sỹ khoa học, Tiến sỹ, phó tiến sỹ, Thạc Sỹ, Cử nhân] Constants: [0, 1, 2, 3...]
  mobile: String,
  address: String,
  homepage: Array,
  research_area: Number, //--> lấy từ master data: [y học dự phòng, y học lâm sàng, y tế cộng đồng] Constants: [0, 1, 2, 3...]
  salt: String, //--> new Date().getTime() hỗ trợ md5 pass
  isActived: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false },
  avatar: { big: String, normal: String, small: String },
  code: String,
  time_code: Number,
  first_login: { type: Boolean, default: true },
  work_roles_temp: { type: Array, default: [] },

  //optionale
  research_topic: Array,
  scientific_association: Array,
  research_experience: [
    {
      name: String,
      work_place: String,
      date_from: String,
      date_to: String,
      address: String,
      role: String
    }
  ],
  teaching_experience: [
    {
      name: String,
      work_place: String,
      date_from: String,
      date_to: String,
      address: String,
      role: String
    }
  ],
  commendation_experience: [
    {
      name: String,
      decision: String,
      date: String,
      level: String,
      content: String
    }
  ],
  expired_date: Number, //--> yyyyMMdd

  // unnesseccery
  website: String,
  facebook: String,
  twitter: String,
  linkedin: String,
  researchgate: String,
  created_at: {
    default: new Date(),
    type: Date
  },
  updated_at: {
    default: new Date(),
    type: Date
  }
});

/********** Export Schema ***********/
module.exports = mongoose.model("Researcher", ResearcherSchema, "users");
