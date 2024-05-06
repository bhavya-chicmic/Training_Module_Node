'use strict';

/** *********** Modules ********** */
const MONGOOSE = require('mongoose');
const { USER_PRIZE_TYPE } = require('../utils/constants');

const { Schema } = MONGOOSE;

/** *********** User Model ********** */
const userSchema = new Schema({
	walletAddress: { type: String, default: '' },
	email: { type: String },
	isActive: { type: Boolean, default: true },
	prizePrefferedtype: { type: Number, enum: Object.values(USER_PRIZE_TYPE) },
	twitterProfileURL: { type: String },
	telegramUsername: { type: String },
	instagramProfileURL: { type: String },
	facebookProfileURL: { type: String },
	discordUsername: { type: String },
	tiktokProfileURL: { type: String },
	isTransactionCompleted: { type: Boolean, default: true },
	isAirdropRequested: { type: Boolean, default: false },
	airdropRequestDate: { type: Date }
}, { timestamps: true, versionKey: false, collection: 'users' });

module.exports = MONGOOSE.model('users', userSchema);
