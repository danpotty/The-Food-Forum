(function() {
	'use strict';
	angular.module('app')
	.controller('ProfileController', ProfileController);

	function ProfileController(UserFactory, $state) {
		var vm = this;
		vm.editing = false;
		vm.updatePic = false;
		vm.userInfo;

		vm.getUser = function(){
			UserFactory.getUserInfo().then(function(res){
				vm.userInfo = res;
				console.log(res);
			});
		};
		vm.getUser();


    vm.updateBio = function(){
      UserFactory.updateBio(vm.userInfo.bio).then(function(res){
			});
			vm.getUser();
    };

		vm.updateProfilePic = function(){
			UserFactory.updateProfilePic(vm.userInfo.profilePic).then(function(res){
			});
			vm.getUser();
		};

	}
})();
