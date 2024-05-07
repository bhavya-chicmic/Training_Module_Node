'use strict';

/** *********** Modules ********** */
const MONGOOSE = require('mongoose');
const { PROGRESS_STATUS } = require('../utils/constants');
const { Schema } = MONGOOSE;


/** *********** User Model ********** */
const userSchema = new Schema({
	traineeId: { type: String  },
	planId: { type: Schema.Types.ObjectId, ref: 'plan' },
	courseId: { type: Schema.Types.ObjectId, ref: 'course' },
	planTaskId: { type: Schema.Types.ObjectId, ref: 'planTask' },
	progressType: { type: Number },
	subTaskId: { type: Schema.Types.ObjectId, ref: 'subTask' },
    status: { type: Number, enum: Object.values(PROGRESS_STATUS), default: PROGRESS_STATUS.NOT_STARTED },
	startDate: { type: Date },
	endDate: { type: Date },
	feedbackId: { type: Schema.Types.ObjectId, ref: 'feedback_V2' }
}, { timestamps: true, versionKey: false });

module.exports = MONGOOSE.model('userProgress', userSchema);
