(function() {
	'use strict';
	angular.module('app')
	.controller('EditCommentController', EditCommentController);

	function EditCommentController() {
		var vm = this;
		vm.edittedComment = {};

		CommentFactory.getAllComments().then(function(res){
			vm.comments = res;
			console.log(vm.comments);
		});

		// vm.comments = [{
		// 	user: "test",
		// 	userComment: "test"
		// }];

		vm.getCommentCopy = function(post) {
			return angular.copy(post);
		};

		vm.createComment = function(){
			CommentFactory.createComment(vm.comment).then(function(){
				$state.go('topic');
			});
		};

		vm.deleteComment = function(comment){
			CommentFactory.deleteComment(comment._id).then(function(){
				vm.comments.splice(vm.comments.indexOf(comment), 1);
			});
			$state.go('topic');
		};

		vm.editComment = function(commentId, comment){
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
