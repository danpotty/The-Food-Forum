(function() {
	'use strict';
	angular.module('app')
	.controller('ProfileController', ProfileController);

	function ProfileController(UserFactory, $state) {
		var vm = this;
		vm.editting = false;
		vm.selectedIndex = 0;

    vm.updateProfile = function(){
      UserFactory.editProfile();
    };



	}
})();
