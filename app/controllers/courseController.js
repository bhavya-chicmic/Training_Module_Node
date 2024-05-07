'use strict';

const MESSAGES = require('../utils/messages');
const { createErrorResponse, createSuccessResponse } = require('../helpers/common/resHelper');
const { dbService } = require('../services');
const { userModel } = require('../models');
const CONSTANTS = require('../utils/constants');

/**************************************************
 ***** Auth controller for authentication logic ***
 **************************************************/
const courseController = {};

courseController.getCourses = async (payload) => {

    let matchQuery = { isDeleted: false }
    if(payload.isDropDown){
        let matchQuery = { name }
    }
};

/* export controller */
module.exports = courseController;
