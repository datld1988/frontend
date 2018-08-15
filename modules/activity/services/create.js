const {
  DatabaseException
} = require(process.cwd() + "/exceptions");

const Activity = require(process.cwd() + "/models/activity");

/**
 * Create One Activity
 */
exports.createActivity = activity => {
  return new Promise((resolve, reject) => {
    new Activity(activity).save((err, dbActivity) => {
      if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
      if (!dbActivity) return reject(new DatabaseException("Khởi tạo hoạt động thất bại, vui lòng tạo lại"));
      resolve(dbActivity.toObject());
    });
  });
};
