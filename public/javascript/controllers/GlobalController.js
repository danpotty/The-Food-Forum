(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController);

	function GlobalController(UserFactory,$state) {
		var nav = this;
		nav.user = {};
		nav.status = UserFactory.status;

		nav.loginUser = function(){
			UserFactory.loginUser(nav.user).then(function(){
				$state.go("Home");
			});
		};

		nav.registerUser = function(){
			console.log("from controller at the start");
			UserFactory.registerUser(nav.user).then(function(){
				$state.go("Home");
			});
		};

		nav.logoutUser = function(){
			UserFactory.logout();
			$state.go("Home");
		};

	}
})();
