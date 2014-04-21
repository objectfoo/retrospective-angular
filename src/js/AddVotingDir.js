define(['app'], function (app) {
	'use strict';

	app.directive('retAddVoting', [function () {

		return {
			priority: 100,
			restrict: 'A',
			require: '^TopicsCtrl',
			scope: '=',
			controller: function($scope) {
				$scope.addTopic = function(newTopic) {
					if (newTopic.length > 0) {
						$scope.model.topics.push({ name: newTopic, votes: 0 });
					}
				};
			}
		};
	}]);
});

