(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController);

	function GlobalController(UserFactory, $state) {
		var nav = this;
		nav.user = {};
		nav.status = UserFactory.status;
		nav.loggedIn = false;

		nav.loginUser = function(){
			UserFactory.loginUser(nav.user).then(function(){
				console.log(nav.loggedIn);
				$state.go("Home");
				nav.loggedIn = true;
			});
		};

		nav.registerUser = function(){
			UserFactory.registerUser(nav.user).then(function(){
				$state.go("Home");
				nav.loggedIn = true;
			});
		};

		nav.logoutUser = function(){
			UserFactory.logout();
			$state.go("Home");
			nav.loggedIn = false;
		};

	}
})();
