/* eslint-disable no-undef */
const co = require("co");

const { SuccessResponse, ErrorResponse, APIException } = require("pinpoint-fw");

const {
  DenyAccessDataException,
  InvalidDataException
} = require(process.cwd() + "/exceptions");

const getService = require("./services/get.js");
const deleteService = require("./services/delete.js");

/**
 * Check Role Action
 * -----
 */
exports.CheckRoleAction = (req, res) => {
  co(function*() {
    // Get Owner by Token
    let username = req.user.username;
    let workId = req.params.workId;

    // Find
    const work = yield getService.getOneWork(workId);
    const flag = yield getService.checkAuthor(username, work);

    if (!flag)
      res.send(
        new DenyAccessDataException(
          "Bạn không có quyền truy cập vào công trình này"
        )
      );
    else res.send(new SuccessResponse("Thành công"));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

/**
 * Check User Action
 * -----
 */
exports.CheckUserAction = (req, res) => {
  if (req.params.username != req.user.username) {
    res.send(
      new DenyAccessDataException(
        "Thông tin người dùng truyền lên không đúng, không có quyền thay đổi"
      )
    );
  } else {
    res.send(new SuccessResponse("Thành công"));
  }
};

/**
 * Get All File Action
 * -----
 */
exports.GetAllFileAction = (req, res) => {
  co(function*() {
    let workId = req.params.workId;
    let type = req.query.type ? req.query.type : 0;

    if (!workId)
      res.send(new InvalidDataException("Yêu cầu nhập id của công trình"));

    // Find
    let files = yield getService.getAllFile(workId, type);

    res.send(new SuccessResponse("Thành công", files));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

/**
 * Delete One File Action
 * -----
 */
exports.DeleteFileAction = (req, res) => {
  co(function*() {
    let username = req.user.username;
    let workId = req.params.workId;
    let fileId = req.params.fileId;

    // Find
    const work = yield getService.getOneWork(workId);
    const flag = yield getService.checkAuthor(username, work);

    if (!flag)
      res.send(
        new DenyAccessDataException(
          "Bạn không có quyền truy cập vào công trình này"
        )
      );
    else {
      yield deleteService.deleteById(fileId);
      res.send(new SuccessResponse("Thành công"));
    }
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};
