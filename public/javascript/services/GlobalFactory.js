(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	function HomeFactory($http, $q) {
		var o = {};

		o.createTopic = function(){
			var q = $q.defer();
			$http.post('/subforum').then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.createComment = function(){
			var q = $q.defer();
			$http.post('/topic').then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};

		return o;
	}
})();
