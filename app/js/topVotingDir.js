angular.module('retrospective')
.directive('topVoting', [function () {

	return {
		priority: 100,
		restrict: 'A',
		require: '^TopicsCtrl',
		scope: '=',

		controller: ['$scope', '$rootScope', function($scope, $rootScope) {
			$scope.model.isVotingEnabled = true;

			$rootScope.$on('sort', function () {
				$scope.model.topics.sort(function (a, b) {
					var A = a.votes || 0,
						B = b.votes || 0;
					
					return A - B;
				});
			});

			$scope.add = function(newTopic) {
				if (newTopic && newTopic.length) {
					$scope.model.topics.unshift({ name: newTopic, votes: 0 });
					$scope.model.newTopic = '';
				}
			};

			$scope.increment = function (topic) {
				topic.votes++;
			};
		}]
	};
}]);