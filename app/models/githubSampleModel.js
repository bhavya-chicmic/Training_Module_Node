'use strict';

/** *********** Modules ********** */
const MONGOOSE = require('mongoose');
const { Schema } = MONGOOSE;


// NOTE: this model is uses for development only( not live and staging server)
/** *********** User Session Model ********** */
const githubSampleSchema = new Schema({
    projectName: { type: String },
    url: { type: String },
    repoCreatedBy: { type: [ { type: String } ]},
    teams: { type: [ { type: String } ], default: [] },
    approver:{ type: [ { type: String } ], default: [] },
    approvedBy: { type: [ { type: String } ], default: [] },
    createdBy: { type: String },
    comment: { type: String },
    isDeleted: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false }
}, { timestamps: true, versionKey: false, collection: 'githubSample' });

module.exports = MONGOOSE.model('githubSample', githubSampleSchema);
