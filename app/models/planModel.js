'use strict';

/** *********** Modules ********** */
const MONGOOSE = require('mongoose');
const { Schema } = MONGOOSE;
const { FEEDBACK_TYPE } = require('../utils/constants');


// NOTE: this model is uses for development only( not live and staging server)
/** *********** User Session Model ********** */
const planSchema = new Schema({
    planName: { type: String, unique: true, index: true },
    description: { type: String },
    estimatedTime: { type: Number },
    totalTasks: { type: Number },
    phases: [{ type: Schema.Types.ObjectId, ref: 'phase' }],
    approver: {
        type: [{ type: String }],
        default: []
    },
    approvedBy: {
        type: [{ type: String }],
        default: []
    },
    createdBy: { type: String },
    deleted: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
  }, { timestamps: true, versionKey: false });

module.exports = MONGOOSE.model('plan', planSchema);
