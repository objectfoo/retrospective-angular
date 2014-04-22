var retrospective = angular.module('retrospective', [])
	.value('topicKeys', [])
	.controller('MainCtrl', function MainCtrl($scope, $rootScope, topicStorage, topicKeys) {
		'use strict';
		$scope.today = new Date();
	});
