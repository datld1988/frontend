const {
  DatabaseException,
  WrongUserException,
  DataNotFoundException,
  InvalidDataException
} = require(process.cwd() + "/exceptions");
const Helper = require(process.cwd() + "/libraries/helper");
const User = require(process.cwd() + "/models/users/user");

/**
 * CheckUser
 */
exports.checkUser = username => {
  return new Promise((resolve, reject) => {
    User.findOne(
      { username },
      (err, dbUser) => {
        console.log('dbUser: ', dbUser);
        if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
        if (!dbUser)
          return reject(new WrongUserException("Tài khoản không tồn tại"));
        if (dbUser.code || dbUser.time_code)
          return reject(
            new InvalidDataException(
              "Email xác nhận đã được gửi tới hòm thư của bạn"
            )
          );
        resolve();
      }
    );
  });
};


/**
 * Gen Code
 */
exports.genCode = username => {
  return new Promise((resolve, reject) => {
    const code = Helper.randomString(6);
    const time_code = new Date().getTime() + 7 * 24 * 60 * 1000;

    User.findOneAndUpdate(
      { username },
      { $set: { code, time_code } },
      { new: true },
      (err, dbUser) => {
        if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
        if (!dbUser)
          return reject(new WrongUserException("Tài khoản không tồn tại"));
        resolve(dbUser);
      }
    );
  });
};

/**
 * Check Code
 */
exports.checkCodeAndGetUser = (username, code) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username }, (err, dbUser) => {
      if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
      if (!dbUser)
        return reject(
          new DataNotFoundException("Không tìm thấy tài khoản hợp lệ")
        );
      if (dbUser.code != code)
        return reject(new InvalidDataException("Mã xác nhận không hợp lệ"));
      if (dbUser.time_code < new Date().getTime())
        return reject(new InvalidDataException("Mã xác nhận quá hạn"));
      resolve(dbUser);
    });
  });
};

/**
 * Change Pass
 */
exports.changePass = (user, newPass) => {
  console.log('user: ', user);
  return new Promise((resolve, reject) => {
    if (!user.salt) {
      return reject(
        new DataNotFoundException("Không tìm thấy dự liệu salt cần thiết")
      );
    }
    const encryptedPassword = Helper.encryptPassword(user.salt, newPass);

    User.findOneAndUpdate(
      { username: user.username },
      { password: encryptedPassword, code: "", time_code: 0 },
      { new: true },
      (err, dbUser) => {
        if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
        if (!dbUser)
          return reject(
            new DataNotFoundException("Không tìm thấy tài khoản hợp lệ")
          );
        resolve();
      }
    );
  });
};
