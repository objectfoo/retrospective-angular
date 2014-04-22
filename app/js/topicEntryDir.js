angular.module('retrospective.topics')
.directive('retTopicEntry', [function () {

	return {
		priority: 200, // after ret-add-voting directive
		restrict: 'A',
		require: '^TopicsCtrl',
		scope: '=',
		templateUrl: 'topics.html',

		controller: function($scope, $attrs) {
			$scope.model.placeholder = $attrs.retTopics;

			$scope.remove = function (idx) {
				$scope.model.topics.splice(idx, 1);
			};

			$scope.add = function (newTopic) {
				if (newTopic && newTopic.length) {
					$scope.model.topics.push({ name: newTopic });
					$scope.model.newTopic = '';
				}
			};
		}
	};
}]);
