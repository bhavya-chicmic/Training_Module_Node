'use strict';

/** ******************************
 ********* Import All routes ***********
 ******************************* */
const v1Routes = [
	...require('./serverRoutes'),
	...require('./userRoutes'),
	...require('./courseRoutes'),
];

module.exports = v1Routes;
