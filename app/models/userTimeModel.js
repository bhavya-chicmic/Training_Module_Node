'use strict';

/** *********** Modules ********** */
const MONGOOSE = require('mongoose');
const { USER_PRIZE_TYPE, PROGRESS_STATUS } = require('../utils/constants');
const { Schema } = MONGOOSE;


/** *********** User Model ********** */
const userTimeSchema = new Schema({
	traineeId: { type: String  },
	planId: { type: Schema.Types.ObjectId, ref: 'plan' },
    sessionId: { type: Schema.Types.ObjectId, ref: 'session' },
	planTaskId: { type: Schema.Types.ObjectId, ref: 'planTask' },
    subTaskId: { type: Schema.Types.ObjectId, ref: 'subTask' },
    consumedTime: { type: Number },
    isDeleted: { type: Boolean },
    type: { type: Number },
}, { timestamps: true, versionKey: false, collection: 'userTime' });

module.exports = MONGOOSE.model('userTime', userTimeSchema);
