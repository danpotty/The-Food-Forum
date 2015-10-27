(function() {
	'use strict';
	angular.module('app')
	.controller('AddTopicController', AddTopicController);

	function AddTopicController(GlobalFactory, $state) {
		var vm = this;
		vm.newTopic = {};
		vm.currentTopic = {};
		vm.subForum = GlobalFactory.subForum;

		// In Case We Don't Have SubForum Value, Force User Back Home
		if(vm.subForum === "Home") {
		$state.go("Home");
		}

		// Scroll To Top On Page Load
		window.scrollTo(0,0);

		// Placeholders
		vm.Topics = {};

		vm.comments = {
			test1: { user: "someoneNew223",
			userComment: "adsfasdfsa" },
			test2: { user: "Sam3293",
			userComment: "great job" },
			test3: { user: "BigDawg292",
			userComment: "blahblah" }
		};

		// Get Topics By SubForum
		vm.getTopics = function(subforum) {
			GlobalFactory.getTopics(subforum).then(function(res){
				vm.Topics = res;
			});
		};
		vm.getTopics(vm.subForum);

		// Set Current Topic Marker
		vm.setCurrentTopic = function(topic){
			vm.currentTopic = topic;
			console.log(vm.currentTopic);
		};

		// Create Topic
		vm.createTopic = function(){
			vm.newTopic.subForum = vm.subForum;
			GlobalFactory.createTopic(vm.newTopic).then(function(){
				vm.getTopics(vm.subForum);
				$state.go('SubForum');
			});
		};

		// Delete Topic
		vm.deleteTopic = function(topic){
			GlobalFactory.deleteTopic(topic._id).then(function(){
				vm.getTopics(vm.subForum);
			});
		};

		// Create Comment
		vm.createComment = function(){
			GlobalFactory.createComment(vm.comment).then(function(){
				$state.go('Topic');
			});
		};
	}
})();
