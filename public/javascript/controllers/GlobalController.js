(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController);

	function GlobalController(UserFactory, $state, $rootScope) {
		var nav = this;
		nav.user = {};
		nav.errLog = false;
		nav.errReg = false;
		nav.status = UserFactory.status;

		// Scroll To Top On Page Load
		window.scrollTo(0,0);


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
			nav.user.profilePic = "https://upload.wikimedia.org/wikipedia/en/9/99/MarioSMBW.png";
			UserFactory.status.profilePic = "https://upload.wikimedia.org/wikipedia/en/9/99/MarioSMBW.png";
			nav.user.bio = "This is a default biography for you created by 'The Food Forum'. If you would like to change this, please click the edit button above.";
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
