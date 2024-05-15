'use strict';

const { createErrorResponse } = require('../helpers');
const { convertIdToMongooseId } = require('../utils/utils');
const { MESSAGES, ERROR_TYPES, AUTH_TYPE } = require('../utils/constants');
const CONFIG = require('../../config');

const authService = {};

/**
 * function to authenticate user.
 */
authService.userValidate = () => {
	return (request, response, next) => {
		validateUser(request)
			.then((isAuthorized) => {
				if (isAuthorized) {
					return next();
				}
				const responseObject = createErrorResponse(MESSAGES.UNAUTHORIZED, ERROR_TYPES.UNAUTHORIZED);
				return response.status(responseObject.statusCode).json(responseObject);
			})
			.catch(() => {
				const responseObject = createErrorResponse(MESSAGES.UNAUTHORIZED, ERROR_TYPES.UNAUTHORIZED);
				return response.status(responseObject.statusCode).json(responseObject);
			});
	};
};

/**
 * function to validate user's jwt token and fetch its details from the system.
 * @param {} request
 */
const validateUser = async (request) => {
	try {
		const authenticatedUser = request.headers.usermeta;
		if (authenticatedUser) {
			request.user = JSON.parse(authenticatedUser)?.user?.data;
			request.user._id = convertIdToMongooseId(request.user._id);
			request.user.sessionToken = request.headers.authorization;
			return true;
		}
		return false;
	} catch (err) {
		return false;
	}
};

/**
 * function to check user permission.
 */
authService.checkPermission = (permission) => {
	return (request, response, next) => {
		validatePermission(request, permission)
			.then((isAuthorized) => {
				if (isAuthorized) {
					return next();
				}
				const responseObject = createErrorResponse(MESSAGES.FORBIDDEN, ERROR_TYPES.FORBIDDEN);
				return response.status(responseObject.statusCode).json(responseObject);
			})
			.catch((err) => {
				console.log('Error: ', err.message);
				const responseObject = createErrorResponse(MESSAGES.FORBIDDEN, ERROR_TYPES.FORBIDDEN);
				return response.status(responseObject.statusCode).json(responseObject);
			});
	};
};

/**
 * function to validate user's permission.
 * @param {} request
 */
const validatePermission = async (request, permission) => {
	try {
		const userPermission = request.user.permissions;

		if (userPermission && userPermission[permission]) {
			return true;
		}
		return false;
	} catch (err) {
		return false;
	}
};

/**
 * function to check user permission.
 */
authService.checkUserRole = (roles) => {
	return (request, response, next) => {
		validateUserRole(request, roles)
			.then((isAuthorized) => {
				if (isAuthorized) {
					return next();
				}
				const responseObject = createErrorResponse(MESSAGES.FORBIDDEN, ERROR_TYPES.FORBIDDEN);
				return response.status(responseObject.statusCode).json(responseObject);
			})
			.catch((err) => {
				console.log('Error: ', err.message);
				const responseObject = createErrorResponse(MESSAGES.FORBIDDEN, ERROR_TYPES.FORBIDDEN);
				return response.status(responseObject.statusCode).json(responseObject);
			});
	};
};

/**
 * function to validate user's permission.
 * @param {} request
 */
const validateUserRole = async (request, roles) => {
	try {
		const userRole = request?.user?.roleData[0]?.role;

		if (roles.includes(userRole)) {
			return true;
		}
		return false;
	} catch (err) {
		return false;
	}
};

authService.authValidate = (authType) => {
	return async (request, response, next) => {
		Promise.allSettled([ authService.validateApiKey(request), validateUser(request) ]).then((result) => {
			if (authType === AUTH_TYPE.AUTH_OR_KEY) {
				if (!(result?.[0]?.value || result?.[1]?.value)) {
					const responseObject = createErrorResponse(MESSAGES.UNAUTHORIZED, ERROR_TYPES.UNAUTHORIZED);
					return response.status(responseObject.statusCode).json(responseObject);
				}
			} else if (authType === AUTH_TYPE.AUTH_AND_KEY) {
				if (!(result?.[0]?.value && result?.[1].value)) {
					const responseObject = createErrorResponse(MESSAGES.UNAUTHORIZED, ERROR_TYPES.UNAUTHORIZED);
					return response.status(responseObject.statusCode).json(responseObject);
				}
			}

			return next();
		});
	};
};

/**
 * function to validate api key
 */
authService.validateApiKey = async (request) => {
	if (request.headers['x-api-key'] === CONFIG.SERVER.X_API_KEY) {
		return true;
	}
	return false;
};

module.exports = authService;
