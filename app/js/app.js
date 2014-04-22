angular.module('retrospective', ['retrospective.topics', 'forceNumeric', 'escInInput'])

.value('topicKeys', [])
.value('version', 5.0)

.controller('MainCtrl', ['$scope', 'version', function MainCtrl($scope, version) {
	$scope.today = new Date();
	$scope.version = version;
}]);
