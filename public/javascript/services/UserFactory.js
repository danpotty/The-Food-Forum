(function() {
	'use strict';
	angular.module('app')
	.factory('UserFactory', UserFactory);

	function UserFactory($http, $q) {
		var o = {};
		o.status ={};

		o.loginUser

		o.registerUser = function(){
			var q = $q.defer();
			$http.post("/api/user/register", user).then(function(res){
				setToken(res.data); // Token is not yet parsed into JSON obj
				setUser();
				q.resolve(res.data);
			});
return q.promise;
		}

		o.logout = function(){

		}


		return o;
	}
})();
