const { DatabaseException, DataNotFoundException } = require(process.cwd() +
  "/exceptions");

const User = require(process.cwd() + "/models/users/user");
const Activity = require(process.cwd() + "/models/activity");

//* Get All Activity
exports.getAllActivities = criterial => {
  return new Promise((resolve, reject) => {
    // Find
    Activity.find(criterial, (err, activities) => {
      if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
      resolve(activities);
    });
  });
};

//* Get One Activity
exports.getOneActivity = activityId => {
  return new Promise((resolve, reject) => {
    // Find
    Activity.findById(activityId, (err, activity) => {
      if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
      if (!activity)
        return reject(
          new DataNotFoundException("Không tìm thấy hoạt động trong hệ thống")
        );
      resolve(activity);
    });
  });
};

//! ********** Support *********** !//
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
