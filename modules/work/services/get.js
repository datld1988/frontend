const {
  DatabaseException,
  DataNotFoundException,
  InvalidDataException
} = require(process.cwd() + "/exceptions");
const _ = require("lodash");

const User = require(process.cwd() + "/models/users/user");
const Work = require(process.cwd() + "/models/works/work");
const Article = require(process.cwd() + "/models/works/article");

//* Get All Works
exports.getAllWork = (user, criterial, sortObject, limit, offset) => {
  return new Promise((resolve, reject) => {
    criterial.is_deleted = { $ne: true };
    if (!criterial.status) criterial.status = { $gte: 1 };
    if (!criterial.work_status) criterial.work_status = 0;

    if (criterial.work_status == 1 || criterial.work_status == 2) {
      criterial.author = user.username;
    } else {
      // Custome input
      let condition = [
        {
          $and: [
            {
              $or: [
                {
                  "cochair.username": user.username
                },
                {
                  "member.username": user.username
                }
              ]
            },
            {
              "roles.private": true
            }
          ]
        },
        {
          "roles.public": true
        }
      ];

      _.each(user.work_roles, work_role => {
        let role = {};
        role[`roles.${work_role}`] = true;
        condition.push(role);
      });

      // Complete query
      criterial["$or"] = condition;
    }

    // Find
    Promise.all([
      Work.find(criterial)
        .limit(limit)
        .skip(offset)
        .sort(sortObject),
      Work.count(criterial)
    ])
      .then(data => {
        resolve(data);
      })
      .catch(() => {
        return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
      });
  });
};

//* Get All Level 1 Works
exports.getFirstLevelWork = (
  user,
  roleCode,
  criterial,
  sortObject,
  limit,
  offset
) => {
  return new Promise((resolve, reject) => {
    criterial.is_deleted = { $ne: true };
    if (!criterial.status) criterial.status = { $gte: 1 };
    if (!criterial.work_status) criterial.work_status = 0;

    if (criterial.work_status == 1 || criterial.work_status == 2) {
      criterial.author = user.username;
    } else {
      //? Get public and private Work by roleCode
      let condition = getConditionByTargetRole(user, roleCode);

      // if user belongs to office
      if (roleCode == user.work_roles[0]) {
        _.each(user.work_roles, work_role => {
          let role = {};
          role[`roles.${work_role}`] = true;
          condition.push(role);
        });
      }

      // Complete query
      criterial["$or"] = condition;
    }

    // Find
    Promise.all([
      Work.find(criterial)
        .limit(limit)
        .skip(offset)
        .sort(sortObject),
      Work.count(criterial)
    ])
      .then(data => {
        resolve(data);
      })
      .catch(() => {
        return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
      });
  });
};

//* Get All Level 2 Works
exports.getSecondLevelWork = (
  user,
  roleCode,
  criterial,
  sortObject,
  limit,
  offset
) => {
  return new Promise((resolve, reject) => {
    criterial.is_deleted = { $ne: true };
    if (!criterial.status) criterial.status = { $gte: 1 };
    if (!criterial.work_status) criterial.work_status = 0;

    if (criterial.work_status == 1 || criterial.work_status == 2) {
      criterial.author = user.username;
    } else {
      //? Get public and private Work by roleCode
      let condition = getConditionByTargetRole(user, roleCode);

      // if user belongs to office
      if (roleCode == user.work_roles[1]) {
        delete user.work_roles[0];
        _.each(user.work_roles, work_role => {
          let role = {};
          role[`roles.${work_role}`] = true;
          condition.push(role);
        });
      }

      // Complete query
      criterial["$or"] = condition;
    }

    // Find
    Promise.all([
      Work.find(criterial)
        .limit(limit)
        .skip(offset)
        .sort(sortObject),
      Work.count(criterial)
    ])
      .then(data => {
        resolve(data);
      })
      .catch(() => {
        return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
      });
  });
};

//* Get All Level 3 Works
exports.getThirdLevelWork = (
  user,
  roleCode,
  criterial,
  sortObject,
  limit,
  offset
) => {
  return new Promise((resolve, reject) => {
    criterial.is_deleted = { $ne: true };
    if (!criterial.status) criterial.status = { $gte: 1 };
    if (!criterial.work_status) criterial.work_status = 0;

    if (criterial.work_status == 1 || criterial.work_status == 2) {
      criterial.author = user.username;
    } else {
      //? Get public and private Work by roleCode
      let condition = getConditionByTargetRole(user, roleCode);

      // if user belongs to office
      if (roleCode == user.work_roles[2]) {
        let role = {};
        role[`roles.${roleCode}`] = true;
        condition.push(role);
      }

      // Complete query
      criterial["$or"] = condition;
    }

    // Find
    Promise.all([
      Work.find(criterial)
        .limit(limit)
        .skip(offset)
        .sort(sortObject),
      Work.count(criterial)
    ])
      .then(data => {
        resolve(data);
      })
      .catch(() => {
        return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
      });
  });
};

//* Get One User Works
exports.getUserWork = (
  watcher,
  owner,
  criterial,
  sortObject,
  limit,
  offset
) => {
  return new Promise((resolve, reject) => {
    criterial.is_deleted = { $ne: true };
    if (!criterial.status) criterial.status = { $gte: 1 };
    if (!criterial.work_status) criterial.work_status = 0;

    if (criterial.work_status == 1 || criterial.work_status == 2) {
      criterial.author = owner.username;
    } else {
      // Get works belong to owner
      let firstCondition = {
        $or: [
          {
            "cochair.username": owner.username
          },
          {
            "member.username": owner.username
          }
        ]
      };

      // All public works
      let secondCondition = {
        $or: [
          {
            "roles.public": true
          }
        ]
      };

      // All private works
      secondCondition["$or"].push({
        "roles.private": true,
        $or: [
          {
            "cochair.username": watcher.username
          },
          {
            "member.username": watcher.username
          }
        ]
      });

      // All first level works
      if (owner.work_roles[0] == watcher.work_roles[0]) {
        let role = {};
        role[`roles.${owner.work_roles[0]}`] = true;
        secondCondition["$or"].push(role);

        // All second level works
        if (owner.work_roles[1] == watcher.work_roles[1]) {
          role = {};
          role[`roles.${owner.work_roles[1]}`] = true;
          secondCondition["$or"].push(role);

          // All third level works
          if (owner.work_roles[2] == watcher.work_roles[2]) {
            role = {};
            role[`roles.${owner.work_roles[2]}`] = true;
            secondCondition["$or"].push(role);
          }
        }
      }

      // Complete query
      criterial["$and"] = [firstCondition, secondCondition];
    }

    // Find
    Promise.all([
      Work.find(criterial)
        .limit(limit)
        .skip(offset)
        .sort(sortObject),
      Work.count(criterial)
    ])
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        console.log("err: ", err);
        return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
      });
  });
};

//* Get Detail Work By Id
exports.getOneWork = workId => {
  return new Promise((resolve, reject) => {
    Work.findOneAndUpdate(
      { _id: workId, is_deleted: { $ne: true } },
      { $inc: { "statitics.view_number": 1 } },
      (err, workDetail) => {
        if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));

        if (!workDetail || workDetail.is_deleted) {
          return reject(
            new DataNotFoundException(
              "Lỗi! Không tìm thấy công trình này trong hệ thống"
            )
          );
        } else {
          resolve(workDetail.toObject());
        }
      }
    );
  });
};

//* Get Article In Topic
exports.getArticleInTopic = articles => {
  return new Promise((resolve, reject) => {
    Article.find(
      { _id: { $in: articles }, is_deleted: { $ne: true } },
      (err, articles) => {
        if (err) reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
        else resolve(articles);
      }
    );
  });
};

exports.exportReport = (user, works) => {
  let report = {
    name: user.full_name,
    enArticle: 0,
    vnArticle: 0,
    articlePoint: 0,
    topicPoint: 0,
    firstLevel: {
      count: 0,
      participant: 0,
      point: 0
    },
    secondLevel: {
      count: 0,
      participant: 0,
      point: 0
    },
    thirdLevel: {
      count: 0,
      participant: 0,
      point: 0
    },
    totalPoint: 0
  };

  _.each(works, work => {
    let [participant, point, flag] = findPointInCochair(
      work.cochair,
      user.username
    );
    if (work.type == 1) {
      // When cannot find you in conchair
      if (!flag) {
        [participant, point] = findPointInMember(
          participant,
          work.members,
          user.username
        );
      }
      report.topicPoint++;
      switch (parseInt(work.level)) {
        case 1:
          report.firstLevel.count++;
          report.firstLevel.participant += participant;
          report.firstLevel.point += point;
          break;
        case 2:
          report.secondLevel.count++;
          report.secondLevel.participant += participant;
          report.secondLevel.point += point;
          break;
        case 3:
          report.thirdLevel.count++;
          report.thirdLevel.participant += participant;
          report.thirdLevel.point += point;
          break;
      }
    } else {
      report.articlePoint++;
      switch (parseInt(work.article_kind)) {
        case 1:
          report.enArticle++;
          break;
        case 2:
          report.vnArticle++;
          break;
      }
    }
  });
  report.totalPoint = report.articlePoint + report.topicPoint;
  return report;
};

//! ********** Support *********** !//
//* Get One User By Username
exports.getOneUser = username => {
  return new Promise((resolve, reject) => {
    User.findOne({
      username
    })
      .select("-password -salt")
      .exec((err, user) => {
        if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
        if (!user)
          return reject(
            new DataNotFoundException(
              "Lỗi! Người dùng truy cập không tồn tại trong hệ thống"
            )
          );
        if (user.isBanned)
          return reject(
            new DataNotFoundException("Lỗi! Người dùng đã bị khóa")
          );
        if (!user.isActived && user.first_login)
          return reject(
            new DataNotFoundException("Lỗi! Người dùng chưa được duyệt")
          );
        resolve(user.toObject());
      });
  });
};

//* Get One Office By code
exports.getOneOffice = code => {
  return new Promise((resolve, reject) => {
    User.findOne({
      code
    })
      .select("-password -salt")
      .exec((err, user) => {
        if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
        if (!user)
          return reject(
            new DataNotFoundException(
              "Lỗi! Người dùng truy cập không tồn tại trong hệ thống"
            )
          );
        resolve(user.toObject());
      });
  });
};

//* Check Detail Work by Role
exports.checkRole = (user, work) => {
  return new Promise(resolve => {
    let roles = work.roles;
    let flag = false;
    if (roles.public) {
      flag = true;
    } else if (roles.private) {
      _.each(work.cochair, owner => {
        if (owner.username == user.username) flag = true;
      });
      if (!flag) {
        _.each(work.members, owner => {
          if (owner.username == user.username) flag = true;
        });
      }
    } else {
      _.each(user.work_roles, work_role => {
        if (roles[work_role]) flag = true;
      });
    }
    console.log(flag);
    resolve(flag);
  });
};

//* Search
exports.searchByName = (work, search) => {
  work.name = { $regex: search, $options: "i" };
  return work;
};

//* Sort
exports.sortByCondition = sort => {
  let sortObject = {};
  switch (sort) {
    case "newest":
      sortObject["created_date"] = -1;
      break;
    case "oldest":
      sortObject["created_date"] = 1;
      break;
    case "view_highest":
      sortObject["statitics.view_number"] = -1;
      break;
    case "view_lowest":
      sortObject["statitics.view_number"] = 1;
      break;
    default:
      sortObject["_id"] = -1;
      break;
  }
  return sortObject;
};

exports.getRoles = (work, work_role, user_roles, is_update) => {
  return new Promise((resolve, reject) => {
    // truong hop update de tai, ko thay role
    if (is_update) {
      if (work_role == "default") {
        delete work.roles;
        resolve(work);
      }
    }

    let result = {
      private: false,
      public: false
    };
    _.each(user_roles, r => {
      result[r] = false;
    });

    if (!result.hasOwnProperty(work_role)) {
      reject(
        new InvalidDataException(
          "Quyền cấp cho công trình không thuộc về tác giả"
        )
      );
    } else {
      result[work_role] = true;
      work.roles = result;
      resolve(work);
    }
  });
};

//? ********** Functions *********** ?//
function getConditionByTargetRole({ username }, roleCode) {
  let condition = [];

  let publicWork = {
    "roles.public": true
  };
  publicWork[`roles.${roleCode}`] = false;
  condition.push(publicWork);

  let privateWork = {
    $and: [
      {
        $or: [
          {
            "cochair.username": username
          },
          {
            "member.username": username
          }
        ]
      },
      {
        "roles.private": true
      }
    ]
  };
  privateWork[`roles.${roleCode}`] = false;
  condition.push(privateWork);

  return condition;
}

function findPointInCochair(cochairs, username) {
  let flag = false;
  let point = 0;
  _.each(cochairs, cochair => {
    if (cochair.username == username) {
      if (cochair.point) {
        point = cochair.point;
        flag = true;
        return false;
      }
    }
  });
  return [cochairs.length, point, flag];
}

function findPointInMember(participant, members, username) {
  let point = 0;
  _.each(members, member => {
    if (member.username == username) {
      if (member.point) {
        point = member.point;
        return false;
      }
    }
  });
  return [participant + members.length, point];
}
