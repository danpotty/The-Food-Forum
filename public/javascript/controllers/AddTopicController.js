(function() {
	'use strict';
	angular.module('app')
	.controller('AddTopicController', AddTopicController);

	function AddTopicController(GlobalFactory, UserFactory, CommentFactory, $state) {
		var vm = this;
		vm.comments = {};
		vm.newTopic = {};
		vm.Topics = {};
		vm.editting = false;
		vm.voted = false;
		vm.selectedIndex = 0;
		vm.currentTopic = GlobalFactory.currentTopic;
		vm.subForum = GlobalFactory.subForum;

		// In Case We Don't Have SubForum Value, Force User Back Home
		if(vm.subForum === "Home") {
		$state.go("Home");
		}

		// Scroll To Top On Page Load
		window.scrollTo(0,0);


		// ------------------------------------------------------------------
		// ----------------------Topics ----------------------------------

		// Get Topics By SubForum
		vm.getTopics = function(subforum) {
			GlobalFactory.getTopics(subforum).then(function(res){
				vm.Topics = res;
			});
		};
		vm.getTopics(vm.subForum);

		// Set Current Topic Marker
		vm.setCurrentTopic = function(topic){
			GlobalFactory.setCurrentTopic(topic).then(function(res){
				vm.currentTopic = GlobalFactory.currentTopic;
			});
		};

		// Create Topic
		vm.createTopic = function(){
			vm.newTopic.subForum = vm.subForum;
			vm.newTopic.author = UserFactory.status.username;
			vm.newTopic.createdOn = new Date();

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

		// ------------------------------------------------------------------
		// ----------------------Comments ----------------------------------

		// Get Comments By Topic
		vm.getCommentsByTopic = function(id){
			CommentFactory.getComments(id).then(function(res){
				vm.comments = res;
			});
		};
		vm.getCommentsByTopic(vm.currentTopic._id);

		// Get Current Comment
		vm.deleteComment = function(comment){
			CommentFactory.deleteComment(comment._id).then(function(){
				vm.comments.splice(vm.comments.indexOf(comment), 1);
			});
			$state.go('Topic');
		};

		// Create Comment
		vm.createComment = function(){
			vm.newComment.topicid = vm.currentTopic._id;
			vm.newComment.author = UserFactory.status.username;
			vm.newComment.upvote = 0;
			vm.newComment.date = new Date();
			vm.newComment.votedOn = [];
			CommentFactory.createComment(vm.newComment).then(function(){
				vm.getCommentsByTopic(vm.currentTopic._id);
				$state.go('Topic');
				vm.newComment = {};
			});
		};

		// Delete Comment
		vm.deleteComment = function(comment){
			CommentFactory.deleteComment(comment._id).then(function(){
				vm.comments.splice(vm.comments.indexOf(comment), 1);
				$state.go('Topic');
			});
		};

		// Save Comment Edits
		vm.saveComment = function(comment){
			CommentFactory.saveComment(comment).then(function(){
				// Really Don't Need Anything Here Since We Are Updating In Real Time
			});
		};


		// ------------------------------------------------------------------
		// ----------------------Voting ----------------------------------

		// Up Vote
		vm.Vote = function(comment, vote){
			// Convert Vote To Number
			var Vote = Number(vote);
			// Second Check If User Has Voted Vs Our Array Of Voters
			for (var i = 0; i < comment.voters.length; i++) {
				// If Already Voted, Return Out
				if (comment.voters[i] === UserFactory.status.username) {
					return;
				}
			}
			// Push Vote Into Array
			comment.voters.push(UserFactory.status.username);
			if (Vote === 1) {
				comment.upvote += 1;
			} else if (Vote === 0) {
				comment.upvote -= 1;
				// If Comment Has < -5 Votes, Delete Comment
				if(comment.upvote == -2) {
					vm.deleteComment(comment);
					return;
				}
			} else {
				alert("error");
			}
			CommentFactory.Vote(comment).then(function(){
				vm.getCommentsByTopic(vm.currentTopic._id);
			});
		};

		// Function To Determine Whether Or Not User Is On Comments "voters" Property
		vm.display = function(voters) {
			var x = voters.indexOf(UserFactory.status.username);
			if (x == -1) {
				return true;
			} else {
				return false;
			}
		};

	}
})();
