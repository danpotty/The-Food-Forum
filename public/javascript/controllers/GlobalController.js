(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController);

	function GlobalController(UserFactory, $state) {
		var nav = this;
		nav.user = {};
		nav.err = false;
		nav.status = UserFactory.status;

		nav.loginUser = function(){
			UserFactory.loginUser(nav.user).then(function(res){
				nav.user = {};
				nav.overlay();
			}, function(err){
				console.log(err);
				nav.err = err;
				// nav.err = true;
			});
		};

		nav.registerUser = function(){
			UserFactory.registerUser(nav.user).then(function(){
				nav.user = {};
				nav.overlay();
			});
		};

		nav.logoutUser = function(){
			UserFactory.logout();
			$state.go("Home");
		};

		nav.overlay = function() {
			nav.el = document.getElementById("overlay-login");
			nav.el.style.display = (nav.el.style.display == "block") ? "none" : "block";
		};

	}
})();
