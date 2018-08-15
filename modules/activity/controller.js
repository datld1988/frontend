/* eslint-disable no-undef */
const co = require("co");

const { SuccessResponse, ErrorResponse, APIException } = require("pinpoint-fw");

const Helper = require(process.cwd() + "/libraries/helper");
const getService = require("./services/get.js");
const createService = require("./services/create.js");
const updateService = require("./services/update.js");
const deleteService = require("./services/delete.js");
const validateService = require("./services/validate.js");

// <---------- GET ACTIVITY ----------> //
/**
 * Get All Works Action
 * -----
 */
exports.GetAllActivityAction = (req, res) => {
  co(function*() {
    const workId = req.params.workId;

    // Custom search object
    req.query = Helper.deleteProperty(req.query, ["token"]);
    req.query.work_id = workId;

    // Find
    const activities = yield getService.getAllActivities(req.query);

    //Send success
    res.send(new SuccessResponse("Thành công", activities));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

// <---------- CREATE ACTIVITY ----------> //
/**
 * Create an activity
 */
exports.CreateActivityAction = (req, res) => {
  co(function*() {
    // Get Owner by Token
    const username = req.user.username;
    const workId = req.params.workId;

    // Validate data
    yield validateService.checkRole(username, workId);
    yield validateService.createActivity(req.body);

    // Custom object
    const user = yield getService.getOneUser(username);
    req.body.work_id = workId;
    req.body.username = username;
    req.body.fullname = user.full_name;

    // Push to db
    const activity = yield createService.createActivity(req.body);

    //Send success
    res.send(new SuccessResponse("Thành công", activity));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

// <---------- UPDATE ACTIVITY ----------> //
/**
 * Update an activity
 */
exports.UpdateActivityAction = (req, res) => {
  co(function*() {
    // Get Owner by Token
    const username = req.user.username;
    const activityId = req.params.activityId;

    //  Get Activity
    let activity =  yield getService.getOneActivity(activityId);
    const workId = activity.work_id;
    console.log('workId: ', workId);

    // Validate data
    yield validateService.checkRole(username, workId);
    yield validateService.editActivity(req.body);

    // Push to db
    activity = yield updateService.editActivity(activityId,{description: req.body.description});

    //Send success
    res.send(new SuccessResponse("Thành công", activity));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

// <---------- DELETE ACTIVITY ----------> //
/**
 * Delete an activity
 */
exports.DeleteActivityAction = (req, res) => {
  co(function*() {
    // Get Owner by Token
    const username = req.user.username;
    const activityId = req.params.activityId;

    //  Get Activity
    let activity =  yield getService.getOneActivity(activityId);
    const workId = activity.work_id;

    // Validate data
    yield validateService.checkRole(username, workId);

    // Push to db
    activity = yield deleteService.deleteActivity(activityId);

    //Send success
    res.send(new SuccessResponse("Thành công", activity));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};
