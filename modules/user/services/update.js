const {
  InvalidDataException,
  DatabaseException,
  DataNotFoundException
} = require(process.cwd() + "/exceptions");
const Helper = require(process.cwd() + "/libraries/helper");

const NoneResearcher = require(process.cwd() + "/models/users/none_researcher");
const Researcher = require(process.cwd() + "/models/users/researcher");
const User = require(process.cwd() + "/models/users/user");
const Work = require(process.cwd() + "/models/works/work");

/**
 * Update None Researcher
 */
exports.noneResearcher = user => {
  return new Promise((resolve, reject) => {
    NoneResearcher.findOneAndUpdate(
      { username: user.username, user_type: 0, isBanned: { $ne: true } },
      user,
      { new: true }
    )
      .select("-password -salt")
      .exec((err, dbUser) => {
        if (err)
          return reject(
            new DatabaseException("Không thể cập nhật. Lỗi cơ sở dữ liệu")
          );
        if (!dbUser)
          return reject(
            new DataNotFoundException(
              "Không thể cập nhật. Người dùng không tồn tại trong hệ thống"
            )
          );
        resolve(dbUser.toObject());
      });
  });
};

/**
 * Update Researcher
 */
exports.researcher = user => {
  return new Promise((resolve, reject) => {
    Researcher.findOneAndUpdate(
      { username: user.username, user_type: 1, isBanned: { $ne: true } },
      user,
      { new: true }
    )
      .select("-password -salt")
      .exec((err, dbUser) => {
        if (err)
          return reject(
            new DatabaseException("Không thể cập nhật. Lỗi cơ sở dữ liệu")
          );
        if (!dbUser)
          return reject(
            new DataNotFoundException(
              "Không thể cập nhật. Y sĩ không tồn tại trong hệ thống"
            )
          );
        resolve(dbUser.toObject());
      });
  });
};

/**
 * Update Researcher Info in Work
 */
exports.updateResearcherInWork = ({ username, full_name, gender }) => {
  return new Promise((resolve, reject) => {
    Promise.all([
      Work.update(
        { author: username },
        {
          $set: {
            author_fullname: full_name,
            author_gender: gender
          }
        },
        { multi: true }
      ),
      Work.update(
        { "cochair.username": username },
        {
          $set: {
            "cochair.$.fullname": full_name,
            "cochair.$.gender": gender
          }
        },
        { multi: true }
      ),
      Work.update(
        { "members.username": username },
        {
          $set: {
            "members.$.fullname": full_name,
            "members.$.gender": gender
          }
        },
        { multi: true }
      )
    ])
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 * Update Password
 */
exports.pass = ({ oldPassword, newPassword, username }) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username }, (err, dbUser) => {
      if (err)
        return reject(
          new DatabaseException(
            "Không thể cập nhật mật khẩu. Lỗi cơ sở dữ liệu"
          )
        );
      if (!dbUser)
        return reject(
          new DataNotFoundException(
            "Không thể cập nhật mật khẩu. Người dùng không tồn tại trong hệ thống"
          )
        );
      if (!dbUser.salt)
        return reject(
          new DataNotFoundException(
            "Không thể cập nhật mật khẩu. Không tìm thấy dữ liệu salt cần thiết"
          )
        );
      dbUser = dbUser.toObject();

      const encryptedPassword = Helper.encryptPassword(
        dbUser.salt,
        oldPassword
      );
      if (encryptedPassword != dbUser.password)
        return reject(new InvalidDataException("Nhập mật khẩu cũ sai"));

      const encryptedNewPassword = Helper.encryptPassword(
        dbUser.salt,
        newPassword
      );
      User.findOneAndUpdate(
        { username },
        { password: encryptedNewPassword },
        { new: true },
        (err, updatedUser) => {
          if (err)
            return reject(
              new DatabaseException(
                "Không thể cập nhật mật khẩu. Lỗi cơ sở dữ liệu"
              )
            );
          if (!updatedUser)
            return reject(
              new DataNotFoundException(
                "Không thể cập nhật mật khẩu. Người dùng không tồn tại trong hệ thống"
              )
            );
          resolve();
        }
      );
    });
  });
};
