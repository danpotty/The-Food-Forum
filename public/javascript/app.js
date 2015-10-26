(function() {
	'use strict';
<<<<<<< HEAD
	angular.module('app', ['ui.router', "ngMaterial"])
	.config(Config);

=======
	angular.module('app', ['ui.router', 'ngMaterial'])
	.config(Config);
>>>>>>> 769bb448efb479ee657fe5f73fdb1fc6a3f276b2
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/home.html'
		})
		.state('CreateTopic',{
			url: '/createtopic',
			templateUrl: 'views/createtopic.html'
		}).state('EditComment',{
			url: '/editcomment',
			templateUrl: 'views/editComment.html'
		}).state('Profile',{
			url: '/profile',
			templateUrl: 'views/profile.html'
		}).state('SubForum',{
			url: '/subforum',
			templateUrl: 'views/subForum.html'
		}).state('Topic',{
			url: '/topic',
			templateUrl: 'views/topic.html'
		}).state('Login_Register',{
			url: '/login_register',
			templateUrl: 'views/login_register.html'
		});
		$urlRouterProvider.otherwise('/');
	}
})();
