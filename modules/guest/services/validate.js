const {
    Language,
    Validator
} = require("pinpoint-fw");
const {
	InvalidDataException
} = require(process.cwd() + "/exceptions");

/**
 * Validate Login User
 */
exports.loginUser = user => {
    return new Promise((resolve, reject) => {
        //Validate data
        let validator = validateUser(user);

        if (!validator.isValid()) {
            reject(new InvalidDataException("Thông tin đăng nhập không hợp lệ", validator.getErrors()))
        } else {
            resolve();
        }
    });
}

/**
 * Validate None Reasearcher
 */
exports.registerNoneResearcher = user => {
    return new Promise((resolve, reject) => {
        //Validate data
        let validator = validateNoneResearcher(user);

        if (!validator.isValid()) {
            reject(new InvalidDataException("Thông tin đăng ký không hợp lệ", validator.getErrors()))
        } else {
            resolve();
        }
    });
}

/**
 * Validate Researcher
 */
exports.registerResearcher = user => {
    return new Promise((resolve, reject) => {
        //Validate data
        let validator = validateResearcher(user);

        if (!validator.isValid()) {
            reject(new InvalidDataException("Thông tin đăng ký không hợp lệ", validator.getErrors()))
        } else {
            resolve();
        }
    });
}

/********** Functions ***********/
function validateUser({ username, password }) {
    let validator = new Validator();
    validator.ensure("username", username, [
        ["Required", [], Language("USERNAME_REQUIRED")],
        ["Email", {}, Language("USERNAME_VALIDATION")]
    ]);
    validator.ensure("password", password, [
        ["Required", null, Language("PASSWORD_REQUIRED")],
        ["Length", { min: 6, max: 32 }, Language("PASSWORD_LENGTH")]
    ]);
    return validator;
}

function validateNoneResearcher({ username, password, full_name }) {
    let validator = new Validator();
    validator.ensure("username", username, [
        ["Required", [], Language("USERNAME_REQUIRED")],
        ["Email", {}, Language("USERNAME_VALIDATION")]
    ]);
    validator.ensure("password", password, [
        ["Required", null, Language("PASSWORD_REQUIRED")],
        ["Length", { min: 6, max: 32 }, Language("PASSWORD_LENGTH")]
    ]);
    validator.ensure("full_name", full_name, [
        ["Required", null, Language("FULL_NAME_REQUIRED")]
    ]);
    return validator;
}

function validateResearcher(user) {
    let validator = new Validator();
    validator.ensure("username", user.username, [
        ["Required", null, Language("USERNAME_REQUIRED")],
        ["Email", {}, Language("USERNAME_VALIDATION")]
    ]);
    validator.ensure("password", user.password, [
        ["Required", null, Language("PASSWORD_REQUIRED")],
        ["Length", { min: 6, max: 32 }, Language("PASSWORD_LENGTH")]
    ]);
    validator.ensure("work_roles", user.work_roles, [
        ["Required", null, Language("WORK_ROLES_REQUIRED")]
    ]);
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