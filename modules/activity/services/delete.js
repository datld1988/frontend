const {
  DatabaseException,
} = require(process.cwd() + "/exceptions");

const Activity = require(process.cwd() + "/models/activity");

/**
 * Delete One Activity
 */
exports.deleteActivity = (activityId) => {
  return new Promise((resolve, reject) => {
    Activity.findByIdAndRemove(activityId, (err, dbActivity) => {
      if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
      if (!dbActivity) return reject(new DatabaseException("Xóa hoạt động thất bại, vui lòng cập nhật lại"));
      resolve(dbActivity.toObject());
    });
  });
};