const co = require("co");

const {
  SuccessResponse,
  ErrorResponse,
  APIException,
  Language
} = require("pinpoint-fw");

const getService = require("./services/get.js");

/**
 * GetParentOfficesAction
 * -----
 * S1: Find Work Offices Role 1
 * S2: Send success
 */
exports.GetParentOfficesAction = (req, res) => {
  co(function*() {
    //Find Work Offices Role 1
    const offices = yield getService.parentOffices();

    //Send success
    res.send(
      new SuccessResponse("Thành công", {
        offices: offices
      })
    );
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

/**
 * GetChildrenOfficesAction
 * -----
 * S1: Find Work Offices Role > 1
 * S2: Send success
 */
exports.GetChildrenOfficesAction = (req, res) => {
  co(function*() {
    const parent_code = req.params.parent_code;

    //Find Work Offices
    const offices = yield getService.childrenOffices(parent_code);

    //Send success
    res.send(
      new SuccessResponse(Language("LOGIN_SUCCESS"), {
        offices: offices
      })
    );
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

/**
 * GetDetailOfficeAction
 * -----
 * S1: Find Work Office By Code
 * S2: Send success
 */
exports.GetDetailOfficeAction = (req, res) => {
  co(function*() {
    const code = req.params.code;

    //Find Work Offices
    const office = yield getService.detailOffice(code);

    //Send success
    res.send(new SuccessResponse(Language("LOGIN_SUCCESS"), { office }));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};
