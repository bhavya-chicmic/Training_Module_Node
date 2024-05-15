'use strict';

/** *********** Modules ********** */
const MONGOOSE = require('mongoose');
const { Schema } = MONGOOSE;


// NOTE: this model is uses for development only( not live and staging server)
/** *********** User Session Model ********** */
const subTaskSchema = new Schema({
    entityType: { type: Number },
    subTask: { type: String, required: true, trim: true },
    estimatedTime: { type: Number },
    link: {
      type: String,
      default: '',
      trim: true  // Handles the @Trim annotation
    },
    reference: { type: String, trim: true },
    task: { type: Schema.Types.ObjectId, ref: 'task' },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, versionKey: false, collection: 'subTask' });

module.exports = MONGOOSE.model('subTask', subTaskSchema);
