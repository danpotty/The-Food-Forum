(function() {
	'use strict';
	angular.module('app')
	.controller('ProfileController', ProfileController);

	function ProfileController(UserFactory, $state) {
		var vm = this;
		vm.editing = false;
		vm.updatePic = false;

    vm.updateBio = function(){
      UserFactory.updateBio(vm.bioObj).then(function(res){
			});
    };

		vm.updateProfilePic = function(){
			UserFactory.updateProfilePic(vm.urlObj).then(function(res){
			});
		};

	}
})();
