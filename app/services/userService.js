'use strict';
const { userModel } = require('../models');
const userService = {};

/**
 * Function to add admin in database.
 * @param {*} payload 
 */
userService.saveUserData = async (payload) => {
	return await userModel(payload).save();
};


/**
 * Function to find one user in db
 * @param {*} payload 
 */
userService.findOneUser = async (payload) => {
	return await userModel(payload).save();
};

module.exports = userService;
