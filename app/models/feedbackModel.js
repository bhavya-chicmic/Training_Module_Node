'use strict';

/** *********** Modules ********** */
const MONGOOSE = require('mongoose');
const { Schema } = MONGOOSE;
const { FEEDBACK_TYPE } = require('../utils/constants');


// NOTE: this model is uses for development only( not live and staging server)
/** *********** User Session Model ********** */
const feedbackSchema = new Schema({
    traineeId: { type: String },
    type: { type: String, enum: Object.values(FEEDBACK_TYPE) },
    overallRating: { type: Number },
    details: { type: Schema.Types.Mixed },
    phaseIds: { type: [ { type: Schema.Types.ObjectId, ref: 'phase' } ], default: [] },
    milestoneIds: { type: [ { type: Schema.Types.ObjectId, ref: 'phase' } ], default: [] },
    comment: { type: String },
    createdBy: { type: String },
    planId: { type: Schema.Types.ObjectId, ref: 'plan' },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false, collection: 'feedback_V2' });

module.exports = MONGOOSE.model('feedback_V2', feedbackSchema);
