'use strict';

/** *********** Modules ********** */
const MONGOOSE = require('mongoose');
const { Schema } = MONGOOSE;


// NOTE: this model is uses for development only( not live and staging server)
/** *********** User Session Model ********** */
const phaseSchema = new Schema({
    entityType: { type: Number },
    name: { type: String },
    estimatedTime: { type: Number, default: 0 },
    // tasksModel: {
    //   type: String,
    //   required: true,
    //   enum: ['Task', 'PlanTask'] // Adjust based on the models you are referencing
    // },
    // entity: { type: Schema.Types.Mixed // As we do not have details on the entity field
    // },
    testId: { type: Schema.Types.ObjectId, ref: 'test' },
    courseId: { type: Schema.Types.ObjectId, ref: 'course' },
    planId: { type: Schema.Types.ObjectId, ref: 'plan' },
    isDeleted: { type: Boolean, default: false }
  }, { timestamps: true, versionKey: false, collection: 'phase' });

module.exports = MONGOOSE.model('phase', phaseSchema);
