'use strict';

const MESSAGES = require('../utils/messages');
const { createErrorResponse, createSuccessResponse } = require('../helpers/common/resHelper');
const { dbService } = require('../services');
const { userModel } = require('../models');
const CONSTANTS = require('../utils/constants');

/**************************************************
 ***** Auth controller for authentication logic ***
 **************************************************/
const userController = {};


/* export controller */
module.exports = userController;
