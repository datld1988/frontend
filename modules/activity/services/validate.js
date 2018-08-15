/* eslint-disable no-undef */
const { Language, Validator } = require("pinpoint-fw");
const {
  InvalidDataException,
  DatabaseException,
  DataNotFoundException
} = require(process.cwd() + "/exceptions");

const Work = require(process.cwd() + "/models/works/work");

//* Validate Create A New Activity
exports.createActivity = activity => {
  return new Promise((resolve, reject) => {
    //Validate data
    let validator = validateActivity(activity);

    if (!validator.isValid()) {
      console.log("validator.getErrors(): ", validator.getErrors());
      reject(
        new InvalidDataException(
          "Thông tin khởi tạo không hợp lệ",
          validator.getErrors()
        )
      );
    } else {
      resolve();
    }
  });
};

//* Validate Edit An Activity
exports.editActivity = activity => {
  return new Promise((resolve, reject) => {
    //Validate data
    let validator = validateActivity(activity);

    if (!validator.isValid()) {
      console.log("validator.getErrors(): ", validator.getErrors());
      reject(
        new InvalidDataException(
          "Thông tin cập nhật không hợp lệ",
          validator.getErrors()
        )
      );
    } else {
      resolve();
    }
  });
};

//! ************* Support *************** !//
//* Check Author
exports.checkRole = (username, workId) => {
  return new Promise((resolve, reject) => {
    Work.findById(workId, (err, workDetail) => {
      if (err)
        return reject(
          new DatabaseException("Cập nhật không thành công. Lỗi cơ sở dữ liệu")
        );
      if (!workDetail || workDetail.is_deleted == true)
        return reject(
          new DataNotFoundException("Không có công trình trong hệ thống")
        );
      if (workDetail.type != 1)
        return reject(new DataNotFoundException("Không phải đề tài"));
      if (username != workDetail.author)
        return reject(
          new InvalidDataException(
            "Yêu cầu người dùng phải tác giả mới có quyền cập nhật thông tin đề tài"
          )
        );
      resolve();
    });
  });
};

//? ************* Function *************** ?//
function validateActivity(activity) {
  let validator = new Validator();
  validator.ensure("description", activity.description, [
    ["Required", null, Language("DESCRIPTION_REQUIRED")]
  ]);
  return validator;
}
