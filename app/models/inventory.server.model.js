'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


/**
 * Inventory Schema
 */
var InventorySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Inventory name',
		trim: true
	},
	location: {
		type: String,
		default: ''
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	category: {
		type: Schema.ObjectId,
		required: 'Please fill out the category',
		ref: 'Category'
	}
});

mongoose.model('Inventory', InventorySchema);
