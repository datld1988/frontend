const { DatabaseException, DataNotFoundException } = require(process.cwd() +
  "/exceptions");

const User = require(process.cwd() + "/models/users/user");

/**
 * Get One User By Conditions
 */
exports.oneUser = criterial => {
  return new Promise((resolve, reject) => {
    User.findOne(criterial)
      .select("-password -salt")
      .exec((err, user) => {
        if (err)
          return reject(
            new DatabaseException("Truy xuất người dùng. Lỗi cơ sở dữ liệu")
          );
        if (!user)
          return reject(
            new DataNotFoundException(
              "Truy xuất người dùng. Người dùng không tồn tại trong hệ thống"
            )
          );
        if (user.isBanned)
          return reject(
            new DataNotFoundException(
              "Truy xuất người dùng. Người dùng đã bị khóa bởi hệ thống"
            )
          );
        resolve(user.toObject());
      });
  });
};

/**
 * Get All Users by Conditions
 */
exports.allUser = criterial => {
  return new Promise((resolve, reject) => {
    User.find(criterial)
      .select("-password -salt")
      .exec((err, users) => {
        if (err)
          return reject(
            new DatabaseException("Truy xuất người dùng. Lỗi cơ sở dữ liệu")
          );
        resolve(users);
      });
  });
};
