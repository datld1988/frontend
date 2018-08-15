const { Language, Validator } = require("pinpoint-fw");
const { InvalidDataException } = require(process.cwd() + "/exceptions");

/**
 * Validate Get None Reasearcher
 */
exports.getUser = user => {
  return new Promise((resolve, reject) => {
    //Validate data
    let validator = validateGetUser(user);

    if (!validator.isValid()) {
      reject(
        new InvalidDataException(
          "Thông tin truy xuất không hợp lệ",
          validator.getErrors()
        )
      );
    } else {
      resolve();
    }
  });
};

/**
 * Validate Edit None Reasearcher
 */
exports.editNoneResearcher = user => {
  return new Promise((resolve, reject) => {
    //Validate data
    let validator = validateEditNoneResearcher(user);

    if (!validator.isValid()) {
      reject(
        new InvalidDataException(
          "Thông tin cập nhật không hợp lệ",
          validator.getErrors()
        )
      );
    } else {
      resolve();
    }
  });
};

/**
 * Validate Edit Researcher
 */
exports.editResearcher = user => {
  return new Promise((resolve, reject) => {
    //Validate data
    let validator = validateEditResearcher(user);

    if (!validator.isValid()) {
      return reject(
        new InvalidDataException(
          "Thông tin cập nhật không hợp lệ",
          validator.getErrors()
        )
      );
    }
    
    resolve();
  });
};

/**
 * Validate ChangePass
 */
exports.passUser = user => {
  return new Promise((resolve, reject) => {
    //Validate data
    let validator = validateChangePass(user);

    if (!validator.isValid()) {
      reject(
        new InvalidDataException(
          "Thông tin cập nhật không hợp lệ",
          validator.getErrors()
        )
      );
    } else {
      resolve();
    }
  });
};

/********** Functions ***********/
function validateGetUser({ username }) {
  let validator = new Validator();
  validator.ensure("username", username, [
    ["Required", [], Language("USERNAME_REQUIRED")],
    ["Email", {}, Language("USERNAME_VALIDATION")]
  ]);
  return validator;
}

function validateEditNoneResearcher({ full_name }) {
  let validator = new Validator();
  validator.ensure("full_name", full_name, [
    ["Required", null, Language("FULL_NAME_REQUIRED")]
  ]);
  return validator;
}

function validateEditResearcher(user) {
  let validator = new Validator();
  validator.ensure("family_name", user.family_name, [
    ["Required", null, Language("FAMILY_NAME_REQUIRED")]
  ]);
  validator.ensure("middle_name", user.middle_name, [
    ["Required", null, Language("MIDDLE_NAME_REQUIRED")]
  ]);
  validator.ensure("first_name", user.first_name, [
    ["Required", null, Language("FIRST_NAME_REQUIRED")]
  ]);
  validator.ensure("gender", user.gender, [
    ["Required", null, Language("GENDER_REQUIRED")],
    ["In", [0, 1, 2], Language("GENDER_WRONG")]
  ]);
  validator.ensure("birthday", user.birthday, [
    ["Required", null, Language("BIRTHDAY_REQUIRED")],
    ["Int", {}, Language("BIRTHDAY_INT")]
  ]);
  validator.ensure("academic_rank", user.academic_rank, [
    ["Required", null, Language("ACADEMIC_RANK_REQUIRED")],
    ["Int", {}, Language("ACADEMIC_RANK_INT")]
  ]);
  validator.ensure("degree", user.degree, [
    ["Required", null, Language("DEGREE_REQUIRED")],
    ["Int", {}, Language("DEGREE_INT")]
  ]);
  validator.ensure("mobile", user.mobile, [
    ["Required", null, Language("MOBILE_REQUIRED")]
  ]);
  validator.ensure("research_area", user.research_area, [
    ["Required", null, Language("RESEARCH_AREA_REQUIRED")],
    ["Int", {}, Language("RESEARCH_AREA_INT")]
  ]);
  return validator;
}

function validateChangePass({ oldPassword, newPassword }) {
  let validator = new Validator();
  validator.ensure("oldPassword", oldPassword, [
    ["Required", null, Language("PASSWORD_REQUIRED")]
  ]);
  validator.ensure("newPassword", newPassword, [
    ["Required", null, Language("NEW_PASSWORD_REQUIRED")],
    [
      "Length",
      {
        min: 6,
        max: 32
      },
      Language("PASSWORD_LENGTH")
    ]
  ]);
  return validator;
}
