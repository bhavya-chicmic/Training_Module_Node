'use strict';

const CONFIG = require('../../config');
const jwt = require('jsonwebtoken');
const { decryptJwt } = require('../utils/utils');
const { createErrorResponse } = require('../helpers');
const dbService = require('./dbService');
const { conversationRoomModel, sessionModel, userModel, adminModel } = require('../models');
const {
	MESSAGES, ERROR_TYPES, NORMAL_PROJECTION, TOKEN_TYPES
} = require('../utils/constants');
const CONSTANTS = require('../utils/constants');


const authService = {};

/**
 * function to validate user's token and fetch its details from the system.
 * @param {} request
 */
const validateUser = async (request, authType) => {
	try {
		if (authType == CONSTANTS.AVAILABLE_AUTHS.SERVER) {
			if (CONFIG.API_KEY === '') {
				return true;
			} else {
				if (!request.headers.hasOwnProperty('x-api-key') || !request.headers['x-api-key']) {
					return false;
				}
				if (request.headers['x-api-key'] === CONFIG.API_KEY) {
					return true;
				}
			}
		} else {
			let user;
			const session = await sessionModel.findOne({ token: (request.headers.authorization), tokenType: TOKEN_TYPES.LOGIN }).lean();
			if (!session) {
				return false;
			}

			if (session.role === CONSTANTS.USER_ROLES.USER) {
				user = await userModel.findOne({ _id: session.userId }).lean();
			}

			if (user) {
				user.session = session;
				request.user = user;
				return true;
			}
		}
		return false;

	} catch (err) {
		return false;
	}
};

/**
 * function to authenticate user.
 */
authService.userValidate = (authType) => {
	return (request, response, next) => {
		validateUser(request, authType).then((isAuthorized) => {
			if (request.user && !request.user.isActive) {
				const responseObject = createErrorResponse(MESSAGES.FORBIDDEN, ERROR_TYPES.FORBIDDEN);
				return response.status(responseObject.statusCode).json(responseObject);
			}
			if (typeof (isAuthorized) === 'string') {
				const responseObject = createErrorResponse(MESSAGES.FORBIDDEN(request.method, request.url), ERROR_TYPES.FORBIDDEN);
				return response.status(responseObject.statusCode).json(responseObject);
			}
			if (isAuthorized) {
				return next();
			}
			const responseObject = createErrorResponse(MESSAGES.UNAUTHORIZED, ERROR_TYPES.UNAUTHORIZED);
			return response.status(responseObject.statusCode).json(responseObject);
		}).catch(() => {
			const responseObject = createErrorResponse(MESSAGES.UNAUTHORIZED, ERROR_TYPES.UNAUTHORIZED);
			return response.status(responseObject.statusCode).json(responseObject);
		});
	};
};

/**
 * function to authenticate admin.
 */
authService.adminValidate = (continueWithoutToken = false) => {
	return (request, response, next) => {
		if (continueWithoutToken && !request.headers.authorization) {
			return next();
		}

		validateAdmin(request)
			.then((isAuthorized) => {
				if (isAuthorized) {
					return next();
				}
				const responseObject = createErrorResponse(MESSAGES.UNAUTHORIZED, ERROR_TYPES.UNAUTHORIZED);
				return response.status(responseObject.statusCode).json(responseObject);
			}).catch((err) => {
				const responseObject = createErrorResponse(MESSAGES.UNAUTHORIZED, ERROR_TYPES.UNAUTHORIZED);
				return response.status(responseObject.statusCode).json(responseObject);
			});
	};
};


/**
 * function to validate admin's jwt token and fetch its details from the system.
 * @param {} request
 */
const validateAdmin = async (request) => {
	try {
		// return request.headers.authorization === SECURITY.STATIC_TOKEN_FOR_AUTHORIZATION
		const decodedToken = jwt.verify(request.headers.authorization, CONSTANTS.SECURITY.JWT_SIGN_KEY);
		const authenticatedAdmin = await adminModel.findOne({ _id: decodedToken._id }).lean();
		if (authenticatedAdmin) {
			request.user = authenticatedAdmin;
			return true;
		}
		return false;
	} catch (err) {
		// log.error("", err);
		return false;
	}
};


/*
 * function to authenticate socket token
 */
authService.socketAuthentication = async (socket, next) => {
	try {
		const session = await decryptJwt(socket.handshake.query.authorization);
		if (!session) {
			return next({ success: false, message: MESSAGES.UNAUTHORIZED });
		}

		const user = await dbService.findOne(userModel, { _id: session.userId }, NORMAL_PROJECTION);
		if (!user) {
			return next({ success: false, message: MESSAGES.UNAUTHORIZED });
		}
		const userId = session.userId.toString();
		socket.join(userId); // -- user to join room
		socket.userId = userId;

		const groupData = await dbService.find(conversationRoomModel, { 'members.userId': { $eq: socket.userId } });
		if (!groupData) {
			return ({ success: false, message: MESSAGES.NOT_FOUND });
		}

		for (let i = 0; i < groupData.length; i++) {
			socket.join(groupData[i].uniqueCode);
		}

		return next();
	} catch (err) {
		return next({ success: false, message: MESSAGES.SOMETHING_WENT_WRONG });
	}
};

module.exports = authService;
