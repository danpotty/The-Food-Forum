(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	function HomeController() {
		var vm = this;
		vm.topics = {
			topicTitle: "test",
			author: "test"
		};
		vm.comments = {
			user: "test",
			userComment: "test"
		};

		vm.createTopic = function(){
			GlobalFactory.createTopic(vm.topic).then(function(){
				$state.go('Subforum');
			});
		};

		vm.createComment = function(){
			GlobalFactory.createComment(vm.comment).then(function(){
				$state.go('topic');
			});
		};


	}
})();
