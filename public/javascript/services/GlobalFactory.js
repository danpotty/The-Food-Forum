(function() {
	'use strict';
	angular.module('app')
	.factory('GlobalFactory', GlobalFactory);

	function GlobalFactory($http, $q) {
		var o = {};
		o.subForum = "Home";
		o.currentTopic = {};

		// Track Sub Forum
		o.setSubForum = function(subforum){
			var q = $q.defer();
			o.subForum = subforum;
			return q.promise;
		};

		// Track Topic
		o.setCurrentTopic = function(topic){
			var q = $q.defer();
			o.currentTopic = topic;
			return q.promise;
		};

		// Get Topics By SubForum - GET
		o.getTopics = function(subforum){
			var q = $q.defer();
			$http.get('/subforum/' + subforum).then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};

		// Create Topic - POST
		o.createTopic = function(topic){
			var q = $q.defer();
			$http.post('/subforum/', topic).then(function(res){
				q.resolve();
			});
			return q.promise;
		};

		// Delete Topic - DELETE
		o.deleteTopic = function(id){
			var q = $q.defer();
			$http.delete('/subforum/' + id).then(function(res){
				q.resolve();
			});
			return q.promise;
		};


		return o;
	}
})();
