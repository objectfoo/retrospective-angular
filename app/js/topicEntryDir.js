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
			$scope.editedTopic = null;
			$scope.originalTopic = null;

			angular.extend($scope, {
				remove: function (idx) {
					$scope.model.topics.splice(idx, 1);
				},

				add: function (newTopic) {
					if (newTopic && newTopic.length) {
						$scope.model.topics.unshift({ name: newTopic });
						$scope.model.newTopic = '';
					}
				},

				editTopic: function (topic) {
					$scope.editedTopic = topic;
					$scope.originalTopic = angular.extend({}, topic);
				},

				doneEditing: function (topic) {
					$scope.editedTopic = null;
					if (!topic.name) {
						// remove
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
