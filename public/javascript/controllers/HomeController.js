(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	function HomeController(GlobalFactory, $state) {
		var vm = this;

		// Set Current SubForum Marker
		vm.setSubForum = function(subforum){
			GlobalFactory.setSubForum(subforum).then(function() {
				$state.go("SubForum");
			});
		};

	}
})();
