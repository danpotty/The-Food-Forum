(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController);

	function GlobalController(UserFactory, $state) {
		var nav = this;
		nav.user = {};
		nav.errLog = false;
		nav.errReg = false;
		nav.status = UserFactory.status;

		nav.loginUser = function(){
			UserFactory.loginUser(nav.user).then(function(res){
				nav.user = {};
				nav.errLog = "";
				nav.overlayLogin();
			}, function(err){
				console.log(err);
				nav.errLog = err;
				// nav.err = true;
			});
		};

		nav.registerUser = function(){
			UserFactory.registerUser(nav.user).then(function(){
				nav.user = {};
				nav.errReg = "";
				nav.overlayRegister();
			}, function(err){
				console.log(err);
				nav.errReg = err;
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
