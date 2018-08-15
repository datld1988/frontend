const { Config } = require("pinpoint-fw");
const {
  DatabaseException,
  WrongUserException,
  DataNotFoundException
} = require(process.cwd() + "/exceptions");
const jwt = require("jsonwebtoken");
const Helper = require(process.cwd() + "/libraries/helper");
const User = require(process.cwd() + "/models/users/user");

/**
 * Check User's username and password
 */
exports.checkUser = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username }, (err, dbUser) => {
      console.log('username: ', username);
      console.log('err: ', err);
      if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
      if (!dbUser)
        return reject(
          new WrongUserException("Đăng nhập với tài khoản không tồn tại")
        );
      if (!dbUser.salt)
        return reject(
          new DataNotFoundException(
            "Không thể cập nhật mật khẩu. Không tìm thấy dữ liệu salt cần thiết"
          )
        );
      dbUser = dbUser.toObject();

      const encryptedPassword = Helper.encryptPassword(dbUser.salt, password);
      if (encryptedPassword != dbUser.password)
        return reject(new WrongUserException("Sai mật khẩu"));
      resolve(dbUser);
    });
  });
};

/**
 * User join to one office
 */
exports.joinUser = (username, work_roles_temp) => {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(
      {
        username,
        work_roles: [],
        work_roles_temp: [],
        isActived: false,
        first_login: false
      },
      { work_roles_temp },
      (err, dbUser) => {
        if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
        if (!dbUser)
          return reject(
            new DataNotFoundException("Không tìm tài khoản hợp lệ")
          );
        resolve(dbUser);
      }
    );
  });
};

/**
 * Gen User Token
 */
exports.genToken = dbUser => {
  //Generate jwt token
  let token = jwt.sign(
    {
      username: dbUser.username,
      roles: dbUser.work_roles,
      isActived: dbUser.isActived
    },
    Config("app").TOKEN_SECRET,
    { expiresIn: Config("app").TOKEN_DURATION }
  );
  return token;
};
