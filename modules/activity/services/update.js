const {
  DatabaseException,
} = require(process.cwd() + "/exceptions");

const Activity = require(process.cwd() + "/models/activity");

/**
 * Edit One Activity
 */
exports.editActivity = (activityId, activity) => {
  return new Promise((resolve, reject) => {
    Activity.findByIdAndUpdate(activityId, activity, {new: true}, (err, dbActivity) => {
      if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
      if (!dbActivity) return reject(new DatabaseException("Cập nhật hoạt động thất bại, vui lòng cập nhật lại"));
      resolve(dbActivity.toObject());
    });
  });
};