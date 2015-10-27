(function() {
	'use strict';
	angular.module('app')
	.controller('EditCommentController', EditCommentController);

	function EditCommentController(CommentFactory, $state) {
		var vm = this;
		vm.edittedComment = {};

		CommentFactory.getAllComments().then(function(res){
			vm.comments = res;
			console.log(vm.comments);
		});

		vm.getCommentCopy = function(post) {
			return angular.copy(post);
		};

		vm.saveComment = function(commentId, comment){
			CommentFactory.editComment({IdofCommentToEdit: commentId, commentEditted: comment}).then(function(res){
				console.log(res);
				vm.edittedComment = null;
				CommentFactory.getAllComments().then(function(res){
					vm.posts = res;
				});
				$state.go('topic');
			});
		};
	}
})();
