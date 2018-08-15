const { DatabaseException, DataNotFoundException } = require(process.cwd() +
  "/exceptions");

const User = require(process.cwd() + "/models/users/user");
const Work = require(process.cwd() + "/models/works/work");
const File = require(process.cwd() + "/models/file");

//* Get All File By WorkId
exports.getAllFile = (work_id, type) => {
  return new Promise((resolve, reject) => {
    File.find({ work_id, type, is_deleted: { $ne: true } })
      .select("-file_url -__v")
      .exec((err, files) => {
        if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
        resolve(files);
      });
  });
};

//! ********** Support *********** !//
//* Get Detail Work By Id
exports.getOneWork = workId => {
  return new Promise((resolve, reject) => {
    Work.findOne(
      { _id: workId, is_deleted: { $ne: true } },
      (err, workDetail) => {
        if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
        if (!workDetail)
          return reject(
            new DataNotFoundException("Không có công trình trong hệ thống")
          );
        resolve(workDetail.toObject());
      }
    );
  });
};

//* Get One User By Username
exports.getOneUser = username => {
  return new Promise((resolve, reject) => {
    User.findOne({
      username,
      user_type: 1
    })
      .select("-password -salt")
      .exec((err, user) => {
        if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
        if (!user)
          return reject(
            new DataNotFoundException("Người dùng không tồn tại trong hệ thống")
          );
        resolve(user.toObject());
      });
  });
};

//* Check Detail Work by Role
exports.checkAuthor = (username, work) => {
  return new Promise(resolve => {
    if (username == work.author) resolve(true);
    else resolve(false);
  });
};
