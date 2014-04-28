(function (retrospective) {
	'use strict';

	retrospective.directive('topVoting', [function () {
		return {
			priority: 100,
			restrict: 'A',
			require: '^TopicCtrl',
			scope: '=',

			controller: ['$scope', '$rootScope', function($scope, $rootScope) {
				$scope.isVotingEnabled = true;

				$rootScope.$on('sort', function () {
					$scope.topics.list.sort(function (a, b) {
						return (a.votes || 0) - (b.votes || 0);
					});
					$scope.topics.save();
				});

				$scope.add = function(newTopic) {
					$scope.topics.add({ name: newTopic, votes: 0 });
					this.newTopic = '';
				};

				$scope.increment = function (topic) {
					topic.votes++;
					$scope.topics.save();
				};
			}]
		};
	}]);
})(angular.module('retrospective'));
