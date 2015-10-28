(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController);

	function GlobalController(UserFactory, $state) {
		var nav = this;
		nav.user = {};
		nav.err = false;
		nav.status = UserFactory.status;

		// Scroll To Top On Page Load
		window.scrollTo(0,0);


		nav.loginUser = function(){
			UserFactory.loginUser(nav.user).then(function(res){
				nav.user = {};
				nav.overlayLogin();
				$state.go("Home");
			}, function(err){
				console.log(err);
				nav.err = err;
				// nav.err = true;
			});
		};

		nav.registerUser = function(){
			nav.user.profilePic = "https://upload.wikimedia.org/wikipedia/en/9/99/MarioSMBW.png";
			UserFactory.registerUser(nav.user).then(function(){
				nav.user = {};
				nav.overlayRegister();
				$state.go("Home");
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
