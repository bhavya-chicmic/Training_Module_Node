'use strict';

const MESSAGES = require('../utils/messages');
const { createErrorResponse, createSuccessResponse } = require('../helpers/common/resHelper');
const { dbService } = require('../services');
const { CourseModel, PhaseModel, TaskModel } = require('../models');
const CONSTANTS = require('../utils/constants');
const { getPaginationConditionForAggregate, convertIdToMongooseId } = require('../utils/utils');
const fs = require('fs')
/**************************************************
 ***** Auth controller for authentication logic ***
 **************************************************/
const courseController = {};

courseController.getCourses = async (payload) => {

    let matchQuery = { isDeleted: false, $or: [
        { isApproved: true },
        { $and: [ { isApproved: true }, { approver: { $in: [ payload.user._id ] } } ] },
        { $and: [ { isApproved: true }, { createdBy: payload.user._id } ] }
    ] };

    if(payload.searchString) matchQuery.name =  { $regex: query, $options: 'i' };
    if(payload.isDropDown){ 
        payload.sortKey = 'name', payload.sortDirection = 1;
        matchQuery =  { isDeleted: false, $or: [ { isApproved: true } ] };
    }
    if(payload.sortKey == 'courseName') payload.sortKey = 'name';

    let sort = { [payload.sortKey]: payload.sortDirection };
    let pagination = getPaginationConditionForAggregate(sort, payload.index, payload.limit);

    let course = await dbService.aggregate(CourseModel, [
        { $match: matchQuery },
        ...(payload.isDropDown ? [{ $sort: sort }] : [{ $lookup: {
            from: 'phase',
            let: { courseId: '$_id' },
            pipeline: [
                { $match: { $expr: { $and: [
                    { $ne: [ '$isDeleted', true ] },
                    { $eq: [ '$$courseId', '$courseId' ] } 
                ] } } },
                { $lookup: {
                    from: 'task',
                    let: { phase: '$_id' },
                    pipeline: [
                        { $match: { $expr: { $and: [
                            { $ne: [ '$isDeleted', true ] },
                            { $eq: [ '$$phase', '$phase' ] } 
                        ] } } },
                        { $project: {
                            subtasks: 0
                        }}
                    ],
                    as: 'task'
                }},
                { $addFields: { totalTasks: { $size: '$task' } } },
                { $project: {
                    tasks: 0,
                    entity: 0,
                    isDeleted: 0
                }}
            ],
            as: 'phases'
        }},
        { $addFields: { totalPhases: { $size: '$phases' } } },
        { $facet: {
            courseData: [ ...pagination ],
            totalCount: [{ '$count': 'total' }]
        }}])
    ]);

    if(payload.isDropDown){
        return createSuccessResponse(MESSAGES.GAME_CATEGORIES_LIST_FETCH_SUCCESSFULLY, course);
    } else{
        return createSuccessResponse(MESSAGES.GAME_CATEGORIES_LIST_FETCH_SUCCESSFULLY, { course: course[0].courseData, count: course[0].totalCount.length ? course[0].totalCount[0].total : 0 });
    }
};

/* export controller */
module.exports = courseController;
