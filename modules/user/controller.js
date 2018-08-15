const co = require("co");

const { SuccessResponse, ErrorResponse, APIException } = require("pinpoint-fw");

const Helper = require(process.cwd() + "/libraries/helper");
const getService = require("./services/get.js");
const validateService = require("./services/validate.js");
const updateService = require("./services/update.js");

// <---------- GET USER ----------> //
/**
 * getUserByUsernameAction
 * -----
 * S1: Get User by userId from params
 * S2: Send success
 */
exports.GetOneUserAction = (req, res) => {
  co(function*() {
    // Custom search object
    let obj = req.query;
    obj = Helper.deleteProperty(obj, ["token"]);
    if (!Object.keys(obj).length) obj.username = req.user.username;

    // Get One User by Query
    let user = yield getService.oneUser(obj);

    //Check Owner || not
    let username = obj.username;
    user.is_owner = username == req.user.username ? true : false;

    //Send success
    res.send(new SuccessResponse("Thành công", user));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

/**
 * getAllUserAction
 * -----
 * S1: Get All User by condition in query
 * S2: Send success
 */
exports.GetAllUserAction = (req, res) => {
  co(function*() {
    // Custom search object
    req.query = Helper.deleteProperty(req.query, ["token"]);
    req.query.isBanned = { $ne: true };
    
    // Get All User by Query
    let users = yield getService.allUser(req.query);

    //Send success
    res.send(new SuccessResponse("Thành công", users));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

// <---------- UPDATE USER ----------> //
/**
 * editNoneResearcherAction
 * -----
 * S1: Validate data
 * S2: Custom update user
 * S3: Find and Update in db
 */
exports.EditNoneResearcherAction = (req, res) => {
  co(function*() {
    //Validate data
    yield validateService.editNoneResearcher(req.body);

    // Custom update object
    let user = req.body;
    user.username = req.user.username;
    user = Helper.deleteProperty(user, [
      "_id",
      "password",
      "user_type",
      "work_roles"
    ]);

    //Update User to db
    user = yield updateService.noneResearcher(user);

    //Send success
    res.send(new SuccessResponse("Thành công", user));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

/**
 * editResearcherAction
 * -----
 * S1: Validate data
 * S2: Custom update user
 * S3: Find and Update in db
 */
exports.EditResearcherAction = (req, res) => {
  co(function*() {
    //Validate data
    yield validateService.editResearcher(req.body);

    // Custom update object
    let user = req.body;
    user.username = req.user.username;
    user = Helper.deleteProperty(user, [
      "_id",
      "password",
      "user_type",
      "work_roles",
      "expired_date",
      "actived"
    ]);

    //Store full_name from 3 parts name
    let family_name = user.family_name;
    let middle_name = user.middle_name;
    let first_name = user.first_name;
    user.full_name = `${family_name} ${middle_name} ${first_name}`;

    //Update User to db
    const beforeUser = yield getService.oneUser({
      username: user.username,
      user_type: 1
    });
    const afterUser = yield updateService.researcher(user);

    if (
      beforeUser.full_name != afterUser.full_name ||
      beforeUser.gender != afterUser.gender
    ) {
      yield updateService.updateResearcherInWork(afterUser);
      //Send success
      res.send(new SuccessResponse("Thành công", afterUser));
    } else {
      //Send success
      res.send(new SuccessResponse("Thành công", afterUser));
    }
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

/**
 * changePassAction
 * -----
 * S1: Validate data
 * S2: Custom update object
 * S3: Find and Update in db
 */
exports.ChangePassAction = (req, res) => {
  co(function*() {
    //Validate data
    yield validateService.passUser(req.body);

    // Custom update object
    req.body.username = req.user.username;

    //Update Password to db
    yield updateService.pass(req.body);

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
