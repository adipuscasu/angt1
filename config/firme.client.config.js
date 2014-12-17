'use strict';

// Configuring the Articles module
angular.module('firme').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Firme', 'firme', 'dropdown', '/firme(/create)?');
		Menus.addSubMenuItem('topbar', 'firme', 'Lista firme', 'firme');
		Menus.addSubMenuItem('topbar', 'firme', 'Adauga firma', 'firme/create');
	}
]);