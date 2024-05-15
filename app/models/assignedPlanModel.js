'use strict';

/** *********** Modules ********** */
const MONGOOSE = require('mongoose');
const { Schema } = MONGOOSE;
const { TRAINING_STATUS } = require('../utils/constants');

//1 user can have 1 
// NOTE: this model is uses for development only( not live and staging server)
/** *********** User Session Model ********** */
const assignedPlanSchema = new Schema({
  userId: { type: String, required: true },
  date: { type: Date, default: new Date() },
  estimatedTime: { type: Number },
  consumedTime: { type: Number },
  plans: [{ type: Schema.Types.ObjectId, ref: 'Plan' }],
  createdBy: { type: String },
  deleted: { type: Boolean, default: false },
  approved: { type: Boolean, default: false },
  trainingStatus: { type: Number, default: TRAINING_STATUS.ONGOING },
}, { timestamps: true, versionKey: false, collection: 'assignedPlan' });

module.exports = MONGOOSE.model('assignedPlan', assignedPlanSchema);
