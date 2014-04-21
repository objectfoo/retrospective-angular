define(['angular'], function (angular) {
	'use strict';

	return angular.module('retrospective', [])

		.value('topicIDs', [])

		.controller('MainCtrl', function MainCtrl($scope, $rootScope, topicStorage, topicIDs) {
		$scope.today = new Date();
	});
});
