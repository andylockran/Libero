'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var inventories = require('../../app/controllers/inventories');

	// Inventories Routes
	app.route('/inventories')
		.get(inventories.list)
		.post(users.requiresLogin, inventories.create);

	app.route('/inventories/:inventoryId')
		.get(inventories.read)
		.put(users.requiresLogin, inventories.hasAuthorization, inventories.update)
		.delete(users.requiresLogin, inventories.hasAuthorization, inventories.delete);

	// Finish by binding the Inventory middleware
	app.param('inventoryId', inventories.inventoryByID);
};