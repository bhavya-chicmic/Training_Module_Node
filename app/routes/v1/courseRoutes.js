'use strict';
const { Joi } = require('../../utils/joiUtils');
const { courseController } = require('../../controllers');

module.exports = [
	{
		method: 'GET',
		path: '/v1/training/course',
		joiSchemaForSwagger: {
            query: {
                traineeId: Joi.string().objectId().optional().description('traineeId'),
                courseId: Joi.string().objectId().optional().description('courseId'),
                isPhaseRequired: Joi.boolean().default(false).optional().description('isPhaseRequired'),
                isDropdown: Joi.boolean().default(false).optional().description('isDropdown'),
                searchString: Joi.string().optional().description('Search String'),
                limit: Joi.number().default(10).optional().description('limit'),
                index: Joi.number().min(0).default(0).optional().description('skip'),
                sortKey: Joi.string().optional().default('createdAt').description('Sort Key'),
                sortDirection: Joi.number().valid(1, -1).default(-1).optional().description('Sort Key'),
            },
			group: 'COURSE',
			description: 'Route to check server status.',
			model: 'ServerStatus',
		},
		handler: courseController.getCourses,
	}
];
