'use strict';

/** ******************************
 ********* Import All routes ***********
 ******************************* */
const v1Routes = [
	...require('./serverRoutes'),
	...require('./userRoutes'),
];

module.exports = v1Routes;
