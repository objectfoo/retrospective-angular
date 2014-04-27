angular.module('retrospective', [])
.value('topicKeys', [])
.value('version', 5.0)
.controller('MainCtrl', ['$scope', '$filter', 'version', 'topicKeys', 'topicStorage', '$templateCache', '$interpolate',

function MainCtrl($scope, $filter, version, topicKeys, topicStorage, $templateCache, $interpolate) {
	'use strict';

	$scope.today = new Date();
	$scope.version = version;
	
	$scope.$on('print', function () {
		var fn = $interpolate($templateCache.get('print.html'));

		var ctx = {
			today: $scope.today,
			title: "Retrospective",
			
		};

		console.log(fn(ctx));
	});
}]);
