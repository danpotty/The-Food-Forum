(function() {
	'use strict';
	angular.module('app')
	.factory('UserFactory', UserFactory);

	function UserFactory($http, $q) {
		var o = {};
		o.status = {};

		o.loginUser = function(user){
			var q = $q.defer();
			$http.post("/api/user/login", user).then(function(res){
				setToken(res.data);
				setUser();
				q.resolve(res);
			}, function(res){
				q.reject("Incorrect username and password combination.");
			});
			return q.promise;
		};

		o.registerUser = function(user){
			var q = $q.defer();
			$http.post("/api/user/register", user).then(function(res){
				setToken(res.data); // Token is not yet parsed into JSON obj
				setUser();
				q.resolve(res.data);
			}, function(res){
				q.reject("Username or email address has already been used. Try a new one.");
			});
			return q.promise;
		};

		o.logout = function(){
			removeToken();
			removeUser();
		};

		o.getUser = function(){
			return JSON.parse(urlBase64Decode(getToken().split(".")[1]));
		};

function setUser(){
	var user = JSON.parse(urlBase64Decode(getToken().split(".")[1]));
	o.status.username = user.username;
	o.status._id = user._id;
	o.status.bio = user.bio;
}

function removeUser(){
	o.status.username = null;
	o.status._id = null;
}

function setToken(token){
	return localStorage.setItem("token", token);
}

function getToken(){
	return localStorage.getItem("token");
}

function removeToken(){
	return localStorage.removeItem("token");
}

function urlBase64Decode(str) {
	        var output = str.replace(/-/g, '+').replace(/_/g, '/');
	        switch (output.length % 4) {
	          case 0: { break; }
	          case 2: { output += '=='; break; }
	          case 3: { output += '='; break; }
	          default: {
	            throw 'Illegal base64url string!';
	          }
	        }
	        return decodeURIComponent(escape(window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
	      }

var token = getToken();
o.status = {};
if(token){
	var user = o.getUser();
	o.status.username = user.username;
	o.status._id = user._id;
	o.status.bio = user.bio;
}

	if(getToken()) setUser();

	o.getTopics = function(author) {
		var q = $q.defer();
		$http.get('/subforum/' + author).then(function(res){
			q.resolve(res.data);
		});
		return q.promise;
	};

	o.updateBio = function(Obj){
		var q = $q.defer();
		var editObj = {
			newBio: Obj,
			userId: o.status._id
		};
		$http.post('/api/user/bio', editObj).then(function(res){
			o.status.bio = Obj;
			q.resolve(res.data);
		});
		return q.promise;
	};

	o.updateProfilePic = function(urlObject){
		var q = $q.defer();
		var picObj = {
			newPic: urlObject,
			userId: o.status._id
		};
		$http.post('/api/user/profilePic', picObj).then(function(res){
			o.status.profilePic = urlObject;
			q.resolve(res.data);
		});
		return q.promise;
	};

	o.getUserInfo = function(){
		var q = $q.defer();
		$http.post('/api/user/getinfo', {userId: o.status._id}).then(function(res){
			q.resolve(res.data);
			console.log(res.data);
		});
		return q.promise;
	};

	// o.bgChange= function(){
	// 	o.num = (Math.floor(Math.random()*4));
	// 	o.array = ['one', 'two', 'three', 'four'];
	// 	o.elem = document.getElementsByClassName('bg');
	// 	o.elem.classList.add(array[num]);
	// };


	//
	// o.randombgs=["/assets/food1.jpg", "/assets/food2.jpg", "/assets/food3.jpg"];
	// document.body.style.background='white url('+Math.floor(Math.random()*randombgs.length)]+')')

		return o;
	}
})();
