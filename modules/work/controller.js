/* eslint-disable no-undef */
const co = require("co");
const _ = require("lodash");
const moment = require("moment");

const { SuccessResponse, ErrorResponse, APIException } = require("pinpoint-fw");

const {
  DenyAccessDataException,
  InvalidDataException
} = require(process.cwd() + "/exceptions");

const Helper = require(process.cwd() + "/libraries/helper");
const getService = require("./services/get.js");
const createService = require("./services/create.js");
const deleteService = require("./services/delete.js");
const updateService = require("./services/update.js");
const validateService = require("./services/validate.js");
const pointService = require("./services/point.js");

// <---------- GET WORKS ----------> //
/**
 * Get All Works Action
 * -----
 * S1: Get Owner by Token
 * S2: Custom Search Object
 * S3: Get User By Username
 * S4: Get Work By User and Query
 * S5: Send success
 */
exports.GetAllWorkAction = (req, res) => {
  co(function*() {
    // Get Owner by Token
    const username = req.user.username;

    // Custom search object
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    let sort = req.query.sort;
    let search = req.query.search;
    let criterial = Helper.deleteProperty(req.query, [
      "token",
      "page",
      "limit",
      "sort",
      "search"
    ]);

    let sortObject = getService.sortByCondition(sort);
    if (search) criterial = getService.searchByName(criterial, search);

    // Find
    const user = yield getService.getOneUser(username);
    const [works, total] = yield getService.getAllWork(
      user,
      criterial,
      sortObject,
      limit,
      offset
    );

    //Send success
    res.send(new SuccessResponse("Thành công", { works, total }));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

/**
 * Get Level 1 Works Action
 * -----
 * S1: Get Owner by Token & RoleCode in Params
 * S2: Custom Search Object
 * S3: Get User By Username
 * S4: Get Work By User, RoleCode and Query
 * S5: Send success
 */
exports.GetFirstLevelWorkAction = (req, res) => {
  co(function*() {
    // Get Owner by Token
    const username = req.user.username;
    const roleCode = req.params.roleCode;
    if (!roleCode)
      res.send(
        new InvalidDataException(
          "Truy xuất toàn bộ công trình cấp 1. Yêu cầu nhập code của cơ quan cần truy xuất công trình"
        )
      );

    // Custom search object
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    let sort = req.query.sort;
    let search = req.query.search;
    let criterial = Helper.deleteProperty(req.query, [
      "token",
      "page",
      "limit",
      "sort",
      "search"
    ]);

    let sortObject = getService.sortByCondition(sort);
    if (search) criterial = getService.searchByName(criterial, search);

    // Find
    const user = yield getService.getOneUser(username);
    const [works, total] = yield getService.getFirstLevelWork(
      user,
      roleCode,
      criterial,
      sortObject,
      limit,
      offset
    );

    //Send success
    res.send(new SuccessResponse("Thành công", { works, total }));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

/**
 * Get Level 2 Works Action
 * -----
 * S1: Get Owner by Token & RoleCode in Params
 * S2: Custom Search Object
 * S3: Get User By Username
 * S4: Get Work By User, RoleCode and Query
 * S5: Send success
 */
exports.GetSecondLevelWorkAction = (req, res) => {
  co(function*() {
    // Get Owner by Token
    const username = req.user.username;
    const roleCode = req.params.roleCode;
    if (!roleCode)
      res.send(
        new InvalidDataException(
          "Truy xuất toàn bộ công trình cấp 2. Yêu cầu nhập code của cơ quan cần truy xuất công trình"
        )
      );

    // Custom search object
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    let sort = req.query.sort;
    let search = req.query.search;
    let criterial = Helper.deleteProperty(req.query, [
      "token",
      "page",
      "limit",
      "sort",
      "search"
    ]);

    let sortObject = getService.sortByCondition(sort);
    if (search) criterial = getService.searchByName(criterial, search);

    // Find
    const user = yield getService.getOneUser(username);
    const [works, total] = yield getService.getSecondLevelWork(
      user,
      roleCode,
      criterial,
      sortObject,
      limit,
      offset
    );

    //Send success
    res.send(new SuccessResponse("Thành công", { works, total }));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

/**
 * Get Level 3 Works Action
 * -----
 * S1: Get Owner by Token & RoleCode in Params
 * S2: Custom Search Object
 * S3: Get User By Username
 * S4: Get Work By User, RoleCode and Query
 * S5: Send success
 */
exports.GetThirdLevelWorkAction = (req, res) => {
  co(function*() {
    // Get Owner by Token
    const username = req.user.username;
    const roleCode = req.params.roleCode;
    if (!roleCode)
      res.send(
        new InvalidDataException(
          "Truy xuất toàn bộ công trình cấp 3. Yêu cầu nhập code của cơ quan cần truy xuất công trình"
        )
      );

    // Custom search object
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    let sort = req.query.sort;
    let search = req.query.search;
    let criterial = Helper.deleteProperty(req.query, [
      "token",
      "page",
      "limit",
      "sort",
      "search"
    ]);

    let sortObject = getService.sortByCondition(sort);
    if (search) criterial = getService.searchByName(criterial, search);

    // Find
    const user = yield getService.getOneUser(username);
    const [works, total] = yield getService.getThirdLevelWork(
      user,
      roleCode,
      criterial,
      sortObject,
      limit,
      offset
    );

    //Send success
    res.send(new SuccessResponse("Thành công", { works, total }));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

/**
 * get All Work Of One User Action
 * -----
 * S1 : Get Watcher by Token and Owner in params
 * S1 : Custom search object
 * S3: Get watcher and owner by username
 * S4: Get All One User Works by Query
 * S5: Send success
 */
exports.GetUserWorkAction = (req, res) => {
  co(function*() {
    // Get Watcher by Token and Owner in params
    const watcherName = req.user.username;
    const ownerName = req.params.username;
    if (!ownerName)
      res.send(
        new InvalidDataException(
          "Truy xuất toàn bộ công trình của một người dùng. Yêu cầu nhập email của người dùng muốn theo dõi"
        )
      );

    // Custom search object
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    let sort = req.query.sort;
    let search = req.query.search;
    let criterial = Helper.deleteProperty(req.query, [
      "token",
      "page",
      "limit",
      "sort",
      "search"
    ]);

    let sortObject = getService.sortByCondition(sort);
    if (search) criterial = getService.searchByName(criterial, search);

    // Find
    const watcher = yield getService.getOneUser(watcherName);
    const owner = yield getService.getOneUser(ownerName);
    let [works, total] = yield getService.getUserWork(
      watcher,
      owner,
      criterial,
      sortObject,
      limit,
      offset
    );

    //Send success
    res.send(new SuccessResponse("Thành công", { works, total }));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

/**
 * Get Detail Work Action
 * -----
 * S1: Get Owner by Token
 * S2: Get User By Username
 * S3: Get Work By WorkID
 * S4: Check Role To Access This Work
 * S5: Send success/Error
 */
exports.GetDetailWorkAction = (req, res) => {
  co(function*() {
    // Get Owner by Token
    const username = req.user.username;
    const workId = req.params.workId;
    if (!workId)
      res.send(
        new InvalidDataException(
          "Truy xuất chi tiết công trình. Yêu cầu nhập id của công trình"
        )
      );

    // Find
    const user = yield getService.getOneUser(username);
    const work = yield getService.getOneWork(workId);
    if (work.is_deleted)
      res.send(new DenyAccessDataException("Công trình đã bị xóa"));
    if (work.is_banned)
      res.send(new DenyAccessDataException("Công trình đã bị khóa"));

    const flag = yield getService.checkRole(user, work);
    if (!flag)
      res.send(
        new DenyAccessDataException(
          "Bạn không có quyền truy cập vào công trình này"
        )
      );

    //Send success
    res.send(new SuccessResponse("Thành công", work));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

// <---------- CREATE WORKS ----------> //
/**
 * Create a going topic
 */
exports.CreateGoingTopicAction = (req, res) => {
  co(function*() {
    // Get Owner by Token
    const username = req.user.username;

    // Validate data
    let user = yield getService.getOneUser(username);
    if (!user.isActived)
      res.send(new InvalidDataException("Tác giả đang là thành viên tự do"));

    yield validateService.createTopic(req.body);

    let partners = [...req.body.cochair, ...req.body.members];
    let author_in = false;
    _.each(partners, mem => {
      if (mem.username == username) author_in = true;
    });
    if (!author_in) {
      res.send(
        new InvalidDataException(
          "Thông tin khởi tạo không hợp lệ. Tác giả phải nằm trong danh sách thành viên"
        )
      );
    }

    // Custom object
    const role = req.params.role;
    req.body = yield getService.getRoles(req.body, role, user.work_roles, false);
    req.body.author = user.username;
    req.body.author_fullname = user.full_name;
    req.body.author_gender = user.gender;
    if (!req.body.status) req.body.status = 1;
    let topic = pointService.calculateTopic(req.body);
    topic.members = pointService.clearMemberPoint(topic.members);

    // Push to db
    const work = yield createService.createTopic(topic);

    //Send success
    res.send(new SuccessResponse("Thành công", work));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

/**
 * Create a new topic
 */
exports.CreateNewTopicAction = (req, res) => {
  co(function*() {
    // Get Owner by Token
    let username = req.user.username;

    // Validate data
    let user = yield getService.getOneUser(username);
    if (!user.isActived)
      res.send(new InvalidDataException("Tác giả đang là thành viên tự do"));

    yield validateService.createNewTopic(req.body);

    let partners = [...req.body.cochair, ...req.body.members];
    let author_in = false;
    _.each(partners, mem => {
      if (mem.username == username) author_in = true;
    });
    if (!author_in) {
      res.send(
        new InvalidDataException(
          "Thông tin khởi tạo không hợp lệ. Tác giả phải nằm trong danh sách thành viên"
        )
      );
    }

    // Custom object
    const role = req.params.role;
    req.body = yield getService.getRoles(req.body, role, user.work_roles, false);
    req.body.author = user.username;
    req.body.author_fullname = user.full_name;
    req.body.author_gender = user.gender;
    if (!req.body.status) req.body.status = -1;
    let topic = pointService.calculateTopic(req.body);
    topic.members = pointService.clearMemberPoint(topic.members);

    // Push to db
    const work = yield createService.createTopic(topic);

    //Send success
    res.send(new SuccessResponse("Thành công", work));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

/**
 * Create an article
 */
exports.CreateArticleAction = (req, res) => {
  co(function*() {
    // Get Owner by Token
    let username = req.user.username;

    // Validate data
    let user = yield getService.getOneUser(username);
    if (!user.isActived)
      res.send(new InvalidDataException("Tác giả đang là thành viên tự do"));

    yield validateService.createArticle(req.body);

    let author_in = false;
    _.each(req.body.cochair, mem => {
      if (mem.username == username) author_in = true;
    });
    if (!author_in) {
      res.send(
        new InvalidDataException(
          "Thông tin khởi tạo không hợp lệ. Tác giả phải nằm trong danh sách thành viên"
        )
      );
    }

    // Custom object
    const role = req.params.role;
    req.body = yield getService.getRoles(req.body, role, user.work_roles, false);
    req.body.author = user.username;
    req.body.author_fullname = user.full_name;
    req.body.author_gender = user.gender;
    const article = pointService.calculateArticle(req.body);

    // Push to db
    const work = yield createService.createArticle(article);

    //Send success
    res.send(new SuccessResponse("Thành công", work));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

// <---------- UPDATE WORKS ----------> //
/**
 * Update a topic
 */
exports.UpdateTopicAction = (req, res) => {
  co(function*() {
    // Define
    const username = req.user.username;
    const topicId = req.params.topicId;
    const partners = [...req.body.cochair, ...req.body.members];
    let author_in = false;

    // Validate data
    let user = yield getService.getOneUser(username);
    if (!user.isActived)
      res.send(new InvalidDataException("Tác giả đang là thành viên tự do"));

    _.each(partners, mem => {
      if (mem.username == username) author_in = true;
    });
    if (!author_in) {
      res.send(
        new InvalidDataException(
          "Thông tin cập nhật không hợp lệ. Tác giả phải nằm trong danh sách thành viên"
        )
      );
    }
    yield validateService.checkAuthor(username, topicId);
    yield validateService.editTopic(req.body);

    // Update in db
    const role = req.params.role;
    req.body = yield getService.getRoles(req.body, role, user.work_roles, true);
    req.body.updated_date = new Date();
    req.body = Helper.deleteProperty(req.body, [
      "author",
      "author_fullname",
      "author_gender",
      "all_point",
      "add_point",
      "work_status",
      "is_deleted",
      "type",
      "members"
    ]);
    const topic = pointService.calculateTopic(req.body);

    // Update in db
    const work = yield updateService.editTopic(topicId, topic);

    //Send success
    res.send(new SuccessResponse("Thành công", work));
  }).catch(err => {
    console.log('err: ', err);
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

/**
 * Update a new topic
 */
exports.UpdateNewTopicAction = (req, res) => {
  co(function*() {
    // Define
    const username = req.user.username;
    const topicId = req.params.topicId;
    const partners = [...req.body.cochair, ...req.body.members];
    let author_in = false;

    // Validate data
    let user = yield getService.getOneUser(username);
    if (!user.isActived)
      res.send(new InvalidDataException("Tác giả đang là thành viên tự do"));

    _.each(partners, mem => {
      if (mem.username == username) author_in = true;
    });
    if (!author_in) {
      res.send(
        new InvalidDataException(
          "Thông tin cập nhật không hợp lệ. Tác giả phải nằm trong danh sách thành viên"
        )
      );
    }
    yield validateService.checkAuthor(username, topicId);
    yield validateService.editNewTopic(req.body);

    // Update in db
    const role = req.params.role;
    req.body = yield getService.getRoles(req.body, role, user.work_roles, true);
    req.body.updated_date = new Date();
    req.body.status = 0;
    req.body.work_status = 3;
    req.body = Helper.deleteProperty(req.body, [
      "author",
      "author_fullname",
      "author_gender",
      "all_point",
      "add_point",
      "work_status",
      "status",
      "is_deleted",
      "type",
      "articles",
      "masoDeTai",
      "decided_works_approval_date",
      "decided_works_approval",
      "decided_works_acceptance",
      "decided_works_approval_level",
      "ethical_assembly",
      "ethical_assembly_date",
      "ethical_assembly_date_meeting",
      "ethical_assembly_member",
      "ethical_assembly_date_summary",
      "ethical_assembly_comment",
      "members"
    ]);
    const topic = pointService.calculateTopic(req.body);

    // Update in db
    const work = yield updateService.editTopic(topicId, topic);

    //Send success
    res.send(new SuccessResponse("Thành công", work));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

/**
 * Update an article
 */
exports.UpdateArticleAction = (req, res) => {
  co(function*() {
    // Define
    const username = req.user.username;
    const articleId = req.params.articleId;
    let author_in = false;

    // Validate data
    let user = yield getService.getOneUser(username);
    if (!user.isActived)
      res.send(new InvalidDataException("Tác giả đang là thành viên tự do"));

    _.each(req.body.cochair, mem => {
      if (mem.username == username) author_in = true;
    });
    if (!author_in) {
      res.send(
        new InvalidDataException(
          "Thông tin cập nhật không hợp lệ. Tác giả phải nằm trong danh sách thành viên"
        )
      );
    }
    yield validateService.checkAuthor(username, articleId);
    yield validateService.editArticle(req.body);

    // Update in db
    const role = req.params.role;
    req.body = yield getService.getRoles(req.body, role, user.work_roles, true);
    req.body.updated_date = new Date();
    req.body = Helper.deleteProperty(req.body, [
      "author",
      "author_fullname",
      "author_gender",
      "all_point",
      "add_point",
      "work_status",
      "status",
      "is_deleted",
      "type"
    ]);
    const article = pointService.calculateArticle(req.body);

    const work = yield updateService.editArticle(articleId, article);

    //Send success
    res.send(new SuccessResponse("Thành công", work));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

/**
 * Submit Work
 */
exports.SubmitWorkAction = (req, res) => {
  co(function*() {
    // Define
    const username = req.user.username;
    const isActived = req.user.isActived;
    const workId = req.params.workId;

    // Validate data
    if (!isActived)
      res.send(new InvalidDataException("Tác giả đang là thành viên tự do"));
    yield validateService.checkAuthor(username, workId);

    // Submit
    yield updateService.submitWork(workId);

    //Send success
    res.send(new SuccessResponse("Thành công"));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

// <---------- OPEN WORK ----------> //
/**
 * Open One Work
 */
exports.OpenWorkAction = (req, res) => {
  co(function*() {
    // Define
    let username = req.user.username;
    let isActived = req.user.isActived;
    let workId = req.params.workId;

    // Validate data
    if (!isActived)
      res.send(new InvalidDataException("Tác giả đang là thành viên tự do"));
    yield validateService.checkAuthor(username, workId);

    // Update in db
    const work = yield updateService.openWork(workId);

    //Send success
    res.send(new SuccessResponse("Thành công", work));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

// <---------- DELETE WORK ----------> //
/**
 * Delete One Work
 */
exports.DeleteWorkAction = (req, res) => {
  co(function*() {
    // Define
    let username = req.user.username;
    let isActived = req.user.isActived;
    let workId = req.params.workId;

    // Validate data
    if (!isActived)
      res.send(new InvalidDataException("Tác giả đang là thành viên tự do"));
    yield validateService.checkAuthor(username, workId);

    // Update in db
    const work = yield deleteService.deleteWork(workId);

    //Send success
    res.send(new SuccessResponse("Thành công", work));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

// <---------- ARTICLE IN TOPIC ----------> //
/**
 * Get all articles in topic
 */
exports.GetArticleInTopicAction = (req, res) => {
  co(function*() {
    // Define
    let topicId = req.params.topicId;

    // get in db
    const topic = yield getService.getOneWork(topicId);
    if (topic.type != 1) {
      res.send(new InvalidDataException("Yêu cầu đối tượng phải là đề tài"));
    }
    const articles = yield getService.getArticleInTopic(topic.articles);

    //Send success
    res.send(new SuccessResponse("Thành công", articles));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

/**
 * Push article to topic
 */
exports.AddArticleToTopicAction = (req, res) => {
  co(function*() {
    // Define
    let username = req.user.username;
    let isActived = req.user.isActived;
    let topicId = req.params.topicId;
    let articleId = req.params.articleId;

    // Validate data
    if (!isActived)
      res.send(new InvalidDataException("Tác giả đang là thành viên tự do"));
    yield validateService.checkAuthor(username, topicId);
    yield validateService.checkArticle(articleId);

    // Update in db
    const topic = yield updateService.pushToTopic(topicId, articleId);

    //Send success
    res.send(new SuccessResponse("Thành công", topic));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

/**
 * Delete article in topic
 */
exports.DeleteArticleInTopicAction = (req, res) => {
  co(function*() {
    // Define
    let username = req.user.username;
    let isActived = req.user.isActived;
    let topicId = req.params.topicId;
    let articleId = req.params.articleId;

    // Validate data
    if (!isActived)
      res.send(new InvalidDataException("Tác giả đang là thành viên tự do"));
    yield validateService.checkAuthor(username, topicId);

    // Update in db
    const topic = yield updateService.deleteInTopic(topicId, articleId);

    //Send success
    res.send(new SuccessResponse("Thành công", topic));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

// <---------- POINT IN WORK ----------> //
/**
 * Add point member in topic
 */
exports.AddPointMemberAction = (req, res) => {
  co(function*() {
    // Define
    let username = req.user.username;
    let isActived = req.user.isActived;
    let topicId = req.params.topicId;
    let topic = req.body;

    // Validate data
    if (!isActived)
      res.send(new InvalidDataException("Tác giả đang là thành viên tự do"));
    yield validateService.checkAuthor(username, topicId);
    yield validateService.editTopic(topic);

    if (!topic.members || !topic.members.length)
      res.send(
        new DataNotFoundException(
          "Không tìm thấy Thành viên đề tài trong đề tài này"
        )
      );

    // Check Point Members
    topic = yield pointService.checkPointMember(topic);

    // filter input
    topic = Helper.keepProperty(topic, ["all_point", "add_point", "members"]);

    // Update in db
    const work = yield updateService.editTopic(topicId, topic);

    //Send success
    res.send(new SuccessResponse("Thành công", work));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

// <---------- STATISTIC USER ----------> //
/**
 * GetReportAction
 */
exports.GetReportAction = (req, res) => {
  co(function*() {
    let today = new Date();
    let toDate = moment(today)
      .endOf("month")
      .format("YYYY-MM-DD");
    let fromDate = moment(today)
      .subtract(1, "month")
      .startOf("month")
      .format("YYYY-MM-DD");
    if (req.query.from_date && req.query.to_date) {
      fromDate = moment(req.query.from_date, "MM/YYYY")
        .startOf("month")
        .format("YYYY-MM-DD");
      toDate = moment(req.query.to_date, "MM/YYYY")
        .endOf("month")
        .format("YYYY-MM-DD");
    }
    let username = req.user.username;

    // Custom search object
    const page = 0;
    const limit = 0;
    const offset = (page - 1) * limit;
    const criterial = { created_date: { $gte: fromDate, $lte: toDate } };

    // Find
    let watcher = yield getService.getOneUser(username);
    let owner = watcher;
    let [works] = yield getService.getUserWork(
      watcher,
      owner,
      criterial,
      limit,
      offset
    );

    // Calculate
    let result = getService.exportReport(owner, works);

    //Send success
    res.send(new SuccessResponse("Thành công", result));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};
