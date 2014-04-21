define(['angular'], function (angular) {
	'use strict';

	return angular.module('retrospective', [])

		.value('topicKeys', [])

		.controller('MainCtrl', function MainCtrl($scope, $rootScope, topicStorage, topicKeys) {
		$scope.today = new Date();
	});
});
