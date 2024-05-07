'use strict';

/** *********** Modules ********** */
const MONGOOSE = require('mongoose');
const { Schema } = MONGOOSE;


// NOTE: this model is uses for development only( not live and staging server)
/** *********** User Session Model ********** */
const taskSchema = new Schema({
    entityType:  { type: Number },
    mainTask: { type: String, trim: true },
    estimatedTime:  { type: Number },
    phase: { type: Schema.Types.ObjectId, ref: 'phase' },
    isDeleted: { type: Boolean, default: false }
  }, { timestamps: true, versionKey: false });

module.exports = MONGOOSE.model('task', taskSchema);
