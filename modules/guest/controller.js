const co = require("co");
const {
  SuccessResponse,
  ErrorResponse,
  APIException,
  Language
} = require("pinpoint-fw");
const { InvalidDataException, NotActivedException, HomelessException } = require(process.cwd() +
  "/exceptions");

const Email = require(process.cwd() + "/libraries/email");
const validateService = require("./services/validate.js");
const loginService = require("./services/login.js");
const forgotService = require("./services/forgot.js");
const registerService = require("./services/register.js");

/**
 * ForgotPassAction
 * -----
 * S1: Validate data
 * S2: Check User + Gen Code
 * S3: Send Mail
 * S4: Send success
 */
exports.ForgotPassAction = (req, res) => {
  co(function*() {
    //Validate data
    const username = req.params.username;
    const link = req.body.link;

    if (!link) res.send(new InvalidDataException("Thiếu thông tin truyền lên"));

    //Find and check User
    yield forgotService.checkUser(username);
    const dbUser = yield forgotService.genCode(username);

    // Send Pass to Email
    Email.sendMail(
      dbUser.username,
      `Gửi lại thông tin đăng nhập, tài khoản ${dbUser.username}, hệ thống quanlykhoahoc.vn`,
      `Người dùng vui lòng click vào link để đổi pass: ${link.trim()}/${dbUser.username.trim()}/${dbUser.code.trim()}a`
    );

    //Send success
    res.send(new SuccessResponse(Language("Thành công")));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

/**
 * ChangePassAction
 * -----
 * S1: Validate data
 * S2: Check User and Code + Change Pass
 * S4: Send success
 */
exports.ChangePassAction = (req, res) => {
  co(function*() {
    //Validate data
    const username = req.params.username;
    const code = req.body.code;
    const newPass = req.body.newPass;

    if (!code || !newPass)
      res.send(new InvalidDataException("Thiếu thông tin truyền lên"));

    const user = yield forgotService.checkCodeAndGetUser(username, code);
    yield forgotService.changePass(user, newPass);

    //Send success
    res.send(new SuccessResponse(Language("Thành công")));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

/**
 * InviteAction
 * -----
 * S1: Validate data
 * S2: Send Mail
 * S4: Send success
 */
exports.InviteAction = (req, res) => {
  //Validate data
  let username = req.params.username;
  if (!username)
    res.send(new InvalidDataException("Yêu cầu truyền lên email đăng nhập"));

  // Send Pass to Email
  Email.sendMail(
    username,
    `Hệ thống quanlykhoahoc.vn mời bạn tham gia`,
    `Hãy tham gia ngay vào cổng thông tin khoa học quanlykhoahoc.vn ngay theo đường dẫn: http://hmu.chienluoc.top/dang-ky`
  );

  //Send success
  res.send(new SuccessResponse(Language("Thành công")));
};

/**
 * LoginAction
 * -----
 * S1: Validate data
 * S2: Check User
 * S3: Generate jwt token
 * S4: Send success
 */
exports.LoginAction = (req, res) => {
  co(function*() {
    //Validate data
    yield validateService.loginUser(req.body);

    //Find and check User
    const dbUser = yield loginService.checkUser(req.body);

    //User is banned
    if (dbUser.isBanned) {
      res.send(
        new NotActivedException(
          "Đăng nhập bị từ chối, tài khoản của bạn đang bị khóa"
        )
      );
    }

    //User is researcher and not actived yet
    if (dbUser.user_type == 1 && !dbUser.isActived) {
      if (dbUser.first_login) {
        res.send(
          new NotActivedException(
            "Đăng nhập bị từ chối, tài khoản của bạn đang chờ được admin duyệt"
          )
        );
      } else {
        if (!dbUser.work_roles_temp.length) {
          res.send(
            new HomelessException(
              "Tài khoản đang không có cơ sở công tác, vui lòng nhập"
            )
          );
        }
      }
    }

    //Generate jwt token
    const token = loginService.genToken(dbUser);

    //Send success
    res.send(
      new SuccessResponse(Language("LOGIN_SUCCESS"), {
        token: token
      })
    );
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
 * NoneResearcher_RegisterAction
 * -----
 * S1: Validate data
 * S2: Save User to db
 * S3: Send success
 */
exports.NoneResearcherRegisterAction = (req, res) => {
  co(function*() {
    //Validate data
    yield validateService.registerNoneResearcher(req.body);

    //Save User to db
    yield registerService.createNoneResearcher(req.body);

    //Send success
    res.send(new SuccessResponse(Language("REGISTER_SUCCESS")));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

/**
 * Researcher_RegisterAction
 * -----
 * S1: Validate data
 * S2: Save User to db
 * S3: Send success
 */
exports.ResearcherRegisterAction = (req, res) => {
  co(function*() {
    //Validate data
    yield validateService.registerResearcher(req.body);

    //Store full_name from 3 parts name
    let family_name = req.body.family_name;
    let middle_name = req.body.middle_name;
    let first_name = req.body.first_name;
    req.body.full_name = `${family_name} ${middle_name} ${first_name}`;

    //Save User to db
    yield registerService.createResearcher(req.body);

    //Send success
    res.send(new SuccessResponse(Language("REGISTER_SUCCESS")));
  }).catch(err => {
    if (err instanceof APIException) {
      res.send(err);
    } else {
      res.send(new ErrorResponse(err));
    }
  });
};

/**
 * JoinAction
 * -----
 * S1: Validate data
 * S2: Check User
 * S3: Generate jwt token
 * S4: Send success
 */
exports.JoinAction = (req, res) => {
  co(function*() {
    const work_roles_temp = req.body.work_roles_temp;
    if (!work_roles_temp || !work_roles_temp.length) {
      res.send(new InvalidDataException("Dữ liệu truyền vào không hợp lệ"));
    }

    //Find and check User
    const dbUser = yield loginService.joinUser(
      req.params.username,
      req.body.work_roles_temp
    );

    //Generate jwt token
    const token = loginService.genToken(dbUser);

    //Send success
    res.send(
      new SuccessResponse(Language("LOGIN_SUCCESS"), {
        token: token
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
