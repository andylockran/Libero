'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Category Schema
 */
var CategorySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill our the category name',
		trim: true
	},
	description: {
		type: String,
		default: '',
		required: 'Please fill out a description',
		trim: true
	},
	color: {
		type: String,
		default: '#000000',
		required: 'Please fill out the category colour'
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Category', CategorySchema);
