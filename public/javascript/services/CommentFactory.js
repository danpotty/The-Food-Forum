(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	function HomeFactory($http, $q) {
		var o = {};

    o.getAllComments = function() {
			var q = $q.defer();
			$http.get('/comments').then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

    o.getCommentById = function(id){
      var q = $q.defer();
      $http.get('/comments/' + id).then(function(res){
        q.resolve(res.data);
      });
      return q.promise;
    };

		o.createComment = function(comment, topicId){
			var q = $q.defer();
			$http.post('/comments/' + topicId + '/comment', comment).then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};

    o.deleteComment = function(id){
      var q = $q.defer();
      $http.delete('/comments' + id).then(function(res){
        q.resolve(res.data);
      });
      return q.promise;
    };

    o.editComment = function(edittedCommentObj){
      var q = $q.defer();
      console.log(edittedCommentObj);
      $http.put('/comments', edittedCommentObj).then(function(res){
        q.resolve(res.data);
      });
      return q.promise;
    };

		return o;
	}
})();
