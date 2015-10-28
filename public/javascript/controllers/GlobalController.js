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
				nav.err = "";
				nav.overlayLogin();
			}, function(err){
				console.log(err);
				nav.err = err;
				// nav.err = true;
			});
		};

		nav.registerUser = function(){
			UserFactory.registerUser(nav.user).then(function(){
				nav.user = {};
				nav.overlayRegister();
			});
		};

		nav.logoutUser = function(){
			UserFactory.logout();
			$state.go("Home");
		};

		nav.overlayLogin = function () {
			var el = document.getElementById("overlay-login");
			el.style.display = (el.style.display == "block") ? "none" : "block";
		};

		nav.overlayRegister = function () {
			var el = document.getElementById("overlay-register");
			el.style.display = (el.style.display == "block") ? "none" : "block";
		};
	}
})();
