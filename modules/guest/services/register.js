const { DatabaseException, ExistedDataException } = require(process.cwd() +
  "/exceptions");
const Helper = require(process.cwd() + "/libraries/helper");

const NoneResearcher = require(process.cwd() + "/models/users/none_researcher");
const Researcher = require(process.cwd() + "/models/users/researcher");
const User = require(process.cwd() + "/models/users/user");

/**
 * Create None Researcher
 */
exports.createNoneResearcher = user => {
  return new Promise((resolve, reject) => {
    User.findOne({ username: user.username }, (err, dbUser) => {
      if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
      if (dbUser)
        return reject(
          new ExistedDataException(
            "Email đã tồn tại, vui lòng đổi email và đăng ký lại"
          )
        );

      // Encrypt password by md5
      user.salt = new Date().getTime().toString();
      user.password = Helper.encryptPassword(user.salt, user.password);
      new NoneResearcher(user).save((err, noneResearcher) => {
        if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
        if (!noneResearcher)
          return reject(
            new DatabaseException(
              "Khởi tạo người dùng thất bại, vui lòng đăng ký lại"
            )
          );
        resolve(noneResearcher.toObject());
      });
    });
  });
};

/**
 * Create Researcher
 */
exports.createResearcher = user => {
  return new Promise((resolve, reject) => {
    User.findOne({ username: user.username }, (err, dbUser) => {
      if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
      if (dbUser)
        return reject(
          new ExistedDataException(
            "Email đã tồn tại, vui lòng đổi email và đăng ký lại"
          )
        );

      // Encrypt password by md5
      user.salt = new Date().getTime().toString();
      user.password = Helper.encryptPassword(user.salt, user.password);
      new Researcher(user).save((err, researcher) => {
        if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
        if (!researcher)
          return reject(
            new DatabaseException(
              "Khởi tạo y sĩ thất bại, vui lòng đăng ký lại"
            )
          );
        resolve(researcher.toObject());
      });
    });
  });
};
