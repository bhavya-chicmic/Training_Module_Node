'use strict';

const CONSTANTS = {};

CONSTANTS.SERVER = {
	ONE: 1,
};

CONSTANTS.ERROR_TYPES = {
	DATA_NOT_FOUND: 'DATA_NOT_FOUND',
	BAD_REQUEST: 'BAD_REQUEST',
	MONGO_EXCEPTION: 'MONGO_EXCEPTION',
	ALREADY_EXISTS: 'ALREADY_EXISTS',
	FORBIDDEN: 'FORBIDDEN',
	INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
	TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
	UNAUTHORIZED: 'UNAUTHORIZED',
	INVALID_MOVE: 'InvalidMove',
};

CONSTANTS.REFERRAL_CODE_LENGTH = 6;

CONSTANTS.SERVER_TYPES = {
	API: 'api',
	SOCKET: 'socket',
};

CONSTANTS.USER_ROLES = {
	ADMIN: 1,
};

CONSTANTS.AVAILABLE_AUTHS = {
	ADMIN: 1,
	USER: 2,
};

CONSTANTS.FILE_UPLOAD_TYPE = {
	PROFILE_IMAGE: 1,
};

CONSTANTS.TOKEN_TYPES = {
	LOGIN: 1,
	OTP: 2,
	RESET_PASSWORD: 3,
};

CONSTANTS.OTP_TYPES = {
	EMAIL_VERIFICATION: 1,
	FORGOT_PASSWORD: 2,
};

CONSTANTS.DATABASE_VERSIONS = {
	ONE: 1,
};

CONSTANTS.USER_TYPE = {
	ADMIN: 1,
};

CONSTANTS.PASSWORD_PATTER_REGEX = /^(?=.{6,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/;

CONSTANTS.NAME_REGEX = /^[a-zA-Z\s]{1,20}[a-zA-Z\s]$/;
CONSTANTS.PHONE_REGEX = /^\+\d{1,3}\d{8,10}$/;

CONSTANTS.NORMAL_PROJECTION = {
	__v: 0, isDeleted: 0, createdAt: 0, updatedAt: 0,
};

CONSTANTS.MESSAGES = require('./messages');

CONSTANTS.SECURITY = {
	JWT_SIGN_KEY: 'fasdkfjklandfkdsfjladsfodfafjalfadsfkads',
	BCRYPT_SALT: 8,
	STATIC_TOKEN_FOR_AUTHORIZATION: '58dde3df315587b279edc3f5eeb98145',
};

CONSTANTS.EMAIL_TYPES = {
	RESET_PASSWORD_EMAIL: 1,
	EMAIL_VERIFICATION: 2,
	SETUP_PASSWORD: 3,
};
  
CONSTANTS.EMAIL_SUBJECTS = {
	RESET_PASSWORD_EMAIL: 'Reset Password',
	EMAIL_VERIFICATION: 'Verify Your Email',
	SETUP_PASSWORD: 'Setup Your Password'
};
  
CONSTANTS.EMAIL_CONTENTS = {

	RESET_PASSWORD_EMAIL: 'public/templates/resetPasswordEmail.html',
	RESET_PASSWORD_TEMPLATE: '../public/templates/reset-password.html',
	SETUP_PASSWORD_EMAIL_TEMPLATE: 'public/templates/setup-password-email.html',
	SETUP_PASSWORD_TEMPLATE: '../public/templates/setup-password.html',
	RESET_PASSWORD_LINK_EXPIRED_TEMPLATE: '../public/templates/password-link-expired.html',
	EMAIL_VERIFICATION_TEMPLATE: 'public/templates/verify-admin-email.html',
	EMAIL_VERIFIED_SUCCESSFULLY_TEMPLATE: '../public/templates/verified-email-successfully.html',
	SOMETHING_WENT_WRONG_TEMPLATE: '../public/templates/something-went-wrong.html'
};


CONSTANTS.AVAILABLE_EXTENSIONS_FOR_FILE_UPLOADS = [ 'csv', 'png', 'jpeg', 'svg', 'jpg', 'mp4', 'x-m4v', 'webm', 'mov', 'svg', 'xls', 'xlsx' ];
CONSTANTS.ALLOWED_EXTENSIONS_FOR_PROFILE_IMAGE = [ 'jpg', 'png', 'jpeg', 'JPG', 'PNG', 'JPEG', 'webp', 'WEBP' ];

CONSTANTS.OTP_EXPIRIED_TIME_IN_SECONDS = 300;

CONSTANTS.OTP_EXPIRY_TIME = 5; // minutes

CONSTANTS.S3_DEFAULT_IMAGE = 'default.png';

CONSTANTS.REDIS_EXPIRE_TIME_IN_SEC = 10800;

CONSTANTS.SOCKET_EVENTS = {
	TEST: 'test',
	DISCONNECT: 'disconnect',
};

CONSTANTS.PAGINATION = {
	SKIP: 0,
	LIMIT: 10,
};

CONSTANTS.REDIS_EVENTS = {
	TEST: 'test',
};

CONSTANTS.TRAINING_STATUS = {
	ONGOING: 1,
	CANCELLED: 2,
	COMPLETED: 3,
	PENDING: 4
};

CONSTANTS.FEEDBACK_TYPE = {
	PPT: 4,
	TEST: 2,
	VIVA: 3,
	BEHAVIUOR: 5
}

CONSTANTS.ATTENDENCE_STATUS = {
	PENDING: 1,
	ATTENDED: 2,
	NOT_ATTENDED: 3
}

CONSTANTS.SESSION_STATUS = {
	PENDING: 1,
	UPCOMING: 2,
	COMPLETED: 3
}

CONSTANTS.PROGRESS_STATUS = {
	NOT_STARTED: 1,
	IN_PROGRESS: 2,
	COMPLETED: 3
}

module.exports = CONSTANTS;
