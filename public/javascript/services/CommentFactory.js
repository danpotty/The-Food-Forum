(function() {
	'use strict';
	angular.module('app')
	.factory('CommentFactory', CommentFactory);

	function CommentFactory ($http, $q) {
		var o = {};


		// Get Comments By Topic
    o.getComments = function(id) {
			var q = $q.defer();
			$http.get('/topic/' + id).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

		// Add Comment
		o.createComment = function(comment){
			var q = $q.defer();
			$http.post('/topic/', comment).then(function(res){
				q.resolve();
			});
			return q.promise;
		};

		// Delete Comment
    o.deleteComment = function(id){
      var q = $q.defer();
      $http.delete('/topic/' + id).then(function(res){
        q.resolve(res.data);
      });
      return q.promise;
    };

		// Save Comment Edits
    o.saveComment = function(comment){
      var q = $q.defer();
      $http.put('/topic/', comment).then(function(res){
        q.resolve(res.data);
      });
      return q.promise;
    };

		// Up Vote
		o.upVote = function(id, voteCount){
			var q = $q.defer();
			$http.put('/topic/' + id, voteCount).then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};

		// Down Vote
		o.upVote = function(comment){
			var q = $q.defer();
			$http.put('/topic/vote', comment).then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};

		return o;
	}
})();
