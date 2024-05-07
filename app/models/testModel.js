'use strict';

/** *********** Modules ********** */
const MONGOOSE = require('mongoose');
const { Schema } = MONGOOSE;


// NOTE: this model is uses for development only( not live and staging server)
/** *********** User Session Model ********** */
const testSchema = new Schema({
    testName: { type: String, unique: true, index: true },
    teams: [{ type: String }],
    milestones: [{ type: Schema.Types.ObjectId, ref: 'phase' }],
    approver: { type: [ { type: String } ], default: [] },
    approvedBy: { type: [ { type: String } ], default: [] },
    createdBy: { type: String },
    deleted: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    estimatedTime: { type: Number },
    completedTasks: { type: Number },
    totalTasks: { type: Number }
  }, { timestamps: true, versionKey: false });

module.exports = MONGOOSE.model('test', testSchema);
