angular.module('retrospective')
.directive('retTopicEntry', [function ($log) {

	return {
		priority: 200, // after ret-add-voting directive
		restrict: 'A',
		require: '^TopicsCtrl',
		scope: '=',
		templateUrl: 'topics.html',

		controller: function($scope, $attrs) {
			$scope.model.placeholder = $attrs.retTopicEntry;
			$scope.editedTopic = null;
			$scope.originalTopic = null;

			angular.extend($scope, {
				remove: function (topic) {
					$scope.model.topics.splice($scope.model.topics.indexOf(topic), 1);
				},

				add: function (newTopic) {
					if (newTopic && newTopic.length) {
						$scope.model.topics.unshift({ name: newTopic });
						$scope.model.newTopic = '';
					}
				},

				editTopic: function (topic, el) {
					$scope.editedTopic = topic;
					$scope.originalTopic = angular.extend({}, topic);
				},

				doneEditing: function (topic) {
					if ($scope.editedTopic != null) {
						$scope.editedTopic = null;
						if (topic.name.length === 0) {
							$scope.remove(topic);
						}
					}
				},

				revertEditing: function (topic) {
					$scope.model.topics[$scope.model.topics.indexOf(topic)] = $scope.originalTopic;
					$scope.doneEditing($scope.originalTopic);
				}
			});

		}
	};
}]);
