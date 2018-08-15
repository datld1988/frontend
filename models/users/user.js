const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/********** Define Schema ***********/
let UserSchema = new Schema({
  username: String, //--> email
  password: String,
  point: Number,
  topic: Number,
  article: Number,
  file: Number,
  user_type: Number, //--> 0: none research, 1: research
  role: Number, //--> lấy từ master data [director, manager, staff] Constants: [0, 1, 2, 3...]
  work_roles: Array,
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
  isActived: Boolean,
  isBanned: Boolean,
  avatar: {
    big: String,
    normal: String,
    small: String
  },
  code: String,
  time_code: Number,
  first_login: Boolean,
  work_roles_temp: Array,

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

  website: String,
  facebook: String,
  twitter: String,
  linkedin: String,
  researchgate: String,
  created_at: Date,
  updated_at: Date
});

/********** Export Schema ***********/
module.exports = mongoose.model("User", UserSchema);
