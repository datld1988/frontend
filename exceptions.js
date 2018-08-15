const { APIException, Language } = require("pinpoint-fw");

/**
 * AUTHENTICATION & AUTHORIZATION EXCEPTIONS
 * -----
 * 1000: AUTHENTICATION EXCEPTION
 * 1001: WRONG USER EXCEPTION
 * 1002: AUTHORIZATION EXCEPTION
 * 1003: NOT ACTIVED EXCEPTION
 */
exports.AthenticationException = class AthenticationException extends APIException {
	constructor(traceMessage, responseObject) {
		super(1000, Language("INVALID_TOKEN"), traceMessage, responseObject);
	}
}

exports.WrongUserException = class WrongUserException extends APIException {
	constructor(traceMessage, responseObject) {
		super(1001, Language("WRONG_USER_OR_PASSWORD_EXCEPTION"), traceMessage, responseObject);
	}
}

exports.AuthorizationException = class AuthorizationException extends APIException {
	constructor(traceMessage, responseObject) {
		super(1002, Language("AUTHORIZATION_EXCEPTION"), traceMessage, responseObject);
	}
}

exports.NotActivedException = class NotActivedException extends APIException {
	constructor(traceMessage, responseObject) {
		super(1003, Language("NOT_ACTIVED_EXCEPTION"), traceMessage, responseObject);
	}
}

exports.BannedException = class BannedException extends APIException {
	constructor(traceMessage, responseObject) {
		super(1004, Language("BANNED_EXCEPTION"), traceMessage, responseObject);
	}
}

exports.HomelessException = class HomelessException extends APIException {
	constructor(traceMessage, responseObject) {
		super(1005, Language("HOMELESS_EXCEPTION"), traceMessage, responseObject);
	}
}

/**
 * DATABASE EXCEPTIONS
 * -----
 * 2000: UNDEFINED DATABASE EXCEPTION
 */
exports.DatabaseException = class DatabaseException extends APIException {
	constructor(traceMessage, responseObject) {
		super(2000, Language("UNDEFINED_DATABASE_EXCEPTION"), traceMessage, responseObject);
	}
}


/**
 * DATA EXCEPTIONS
 * -----
 * 3000: INVALID DATA EXCEPTION
 */
exports.InvalidDataException = class InvalidDataException extends APIException {
	constructor(traceMessage, responseObject) {
		super(3000, Language("INVALID_DATA_EXCEPTION"), traceMessage, responseObject);
	}
}

exports.ExistedDataException = class ExistedDataException extends APIException {
	constructor(traceMessage, responseObject) {
		super(3001, Language("EXISTED_DATA_EXCEPTION"), traceMessage, responseObject);
	}
}

exports.DataNotFoundException = class DataNotFoundException extends APIException {
	constructor(traceMessage, responseObject) {
		super(3002, Language("DATA_NOT_FOUND_EXCEPTION"), traceMessage, responseObject);
	}
}

exports.DenyAccessDataException = class DenyAccessDataException extends APIException {
	constructor(traceMessage, responseObject) {
		super(3003, Language("DATA_NOT_FOUND_EXCEPTION"), traceMessage, responseObject);
	}
}
