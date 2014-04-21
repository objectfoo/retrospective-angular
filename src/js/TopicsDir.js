define(['app'], function (app) {
	'use strict';

	app.directive('retTopics', [function () {

		return {
			priority: 200, // after ret-add-voting directive
			restrict: 'A',
			require: '^TopicsCtrl',
			scope: '=',
			templateUrl: 'topics.html',
			controller: function($scope, $attrs) {
				$scope.addTopic = addTopic;
				$scope.model.placeholder = $attrs.retTopics;

				function addTopic(newTopic) {
					if (newTopic.length > 0) {
						$scope.model.topics.push({ name: newTopic });
					}
				}
			}
		};
	}]);
});
