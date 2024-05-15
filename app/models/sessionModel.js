'use strict';

/** *********** Modules ********** */
const MONGOOSE = require('mongoose');
const { Schema } = MONGOOSE;
const { ATTENDENCE_STATUS, SESSION_STATUS } = require('../utils/constants');


// NOTE: this model is uses for development only( not live and staging server)
/** *********** User Session Model ********** */
const sessionSchema = new Schema({
	title: { type: String, trim: true },
	teams: [{ type: String }],
	trainees: [{
		attendanceStatus: { type: Number, enum: Object.values(ATTENDENCE_STATUS), default: ATTENDENCE_STATUS.PENDING }
	}],
	sessionBy: [{ type: String }],
	location: {
		type: String,
		trim: true
	},
	approver: {
		type: [{ type: String }],
		default: []
	},
	approvedBy: {
		type: [{ type: String }],
		default: []
	},
	createdBy: { type: String },
	dateTime: { type: Date },
	status: { type: Number, enum: Object.values(SESSION_STATUS), default: SESSION_STATUS.PENDING },
	isDeleted: {
	  type: Boolean,
	  default: false
	},
	isApproved: {
	  type: Boolean,
	  default: false
	},
	MOM: Schema.Types.Mixed, // Dependent on the structure of MomMessage
}, { timestamps: true, versionKey: false, collection: 'session' });

module.exports = MONGOOSE.model('session', sessionSchema);
