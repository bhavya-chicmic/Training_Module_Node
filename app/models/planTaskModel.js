'use strict';

/** *********** Modules ********** */
const MONGOOSE = require('mongoose');
const { Schema } = MONGOOSE;
const { FEEDBACK_TYPE } = require('../utils/constants');


// NOTE: this model is uses for development only( not live and staging server)
/** *********** User Session Model ********** */
const planTaskSchema = new Schema({
    planType: { type: Number },
    plan: {
      type: String,
      required: [true, 'Plan Id cannot be empty']
    },
    milestones: {
      type: [Schema.Types.Mixed], // Depending on the type of milestones
      default: [],
    },
    mentor: [String],
    totalTasks: { type: Number },
    date: { type: Date, default: new Date() },
    estimatedTime: { type: Number },
    isDeleted: { type: Boolean, default: false },
    phase: { type: Schema.Types.ObjectId, ref: 'phase' },
    plans: { type: Schema.Types.ObjectId, ref: 'plan' }
}, { timestamps: true, versionKey: false });

module.exports = MONGOOSE.model('planTask', planTaskSchema);
