'use strict';

/** *********** Modules ********** */
const MONGOOSE = require('mongoose');
const { Schema } = MONGOOSE;


// NOTE: this model is uses for development only( not live and staging server)
/** *********** User Session Model ********** */
const courseSchema = new Schema({
    name: { type: String, unique: true, index: true },
    figmaLink: { type: String },
    guidelines: { type: String },
    phases: [{ type: Schema.Types.ObjectId, ref: 'phase' }],
    approver: { type: [ { type: String } ], default: [] },
    approvedBy: { type: [ { type: String } ], default: [] },
    createdBy: { type: String },
    isDeleted: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    estimatedTime: { type: Number },
    completedTasks: { type: Number },
    totalTasks: { type: Number }
  }, { timestamps: true, versionKey: false });

module.exports = MONGOOSE.model('course', courseSchema);
