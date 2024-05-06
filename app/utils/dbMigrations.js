/* eslint-disable eqeqeq */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */

'use strict';

const MODELS = require('../models');
const CONFIG = require('../../config');
const { hashPassword } = require('../utils/utils');

const dbMigrations = {};

/**
 * Function to run migrationsfor database based on version number.
 * @returns
 */
dbMigrations.migerateDatabase = async () => {

	let dbVersion = await MODELS.dbVersionModel.findOne({});
	if (!dbVersion || dbVersion.version < 1) {
		dbVersion = await MODELS.dbVersionModel
			.findOneAndUpdate({}, { version: 1 }, { upsert: true, new: true });
	}

// 	/** -- database migeration for initial version */
// 	if (version < DATABASE_VERSIONS.ONE) {
// 		/** -- create admin if not exist */
// 		const password = hashPassword(ADMIN.PASSWORD);
// 		await adminModel({ email: ADMIN.EMAIL, password: password, name: ADMIN.NAME }).save();
// 		await locationModel.insertMany(LOCATION);
// 		await dbVersionModel.findOneAndUpdate({ version: DATABASE_VERSIONS.ONE }).lean();
// 		await dbVersionModel({ version: DATABASE_VERSIONS.ONE }).save();
// 		version = DATABASE_VERSIONS.ONE;
// 		await addMessages(historicMessageHash);
// 	}
};

module.exports = dbMigrations;
