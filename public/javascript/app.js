(function() {
	'use strict';
	angular.module('app', ['ui.router', 'ngMaterial'])
	.config(Config);

function Config($stateProvider, $urlRouterProvider,$httpProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/home.html'
		})
		.state('CreateTopic',{
			url: '/createtopic',
			templateUrl: 'views/createTopic.html'
		}).state('Profile',{
			url: '/profile',
			templateUrl: 'views/profile.html'
		}).state('SubForum',{
			url: '/subforum',
			templateUrl: 'views/subForum.html'
		}).state('Topic',{
			url: '/topic',
			templateUrl: 'views/topic.html'
		});
		$urlRouterProvider.otherwise('/');
		$httpProvider.interceptors.push("AuthInterceptor");
	}
})();
