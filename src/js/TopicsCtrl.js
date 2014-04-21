define(['app', 'topicStorage'], function (app) {
	'use strict';

	return app.controller('TopicsCtrl', ['$scope', '$attrs', 'topicStorage', 'topicKeys', function ($scope, $attrs, topicStorage, topicKeys) {
			var topicID = $attrs.id;
	
			// save a list of topic keys for printing
			if (!~topicKeys.indexOf(topicID)) {
				topicKeys.push(topicID);
			}
	
			$scope.model = {
				topicID: topicID,
				topics: topicStorage.get(topicID)
			};
	
			$scope.$watch('model.topics', updateStore, true);
			$scope.$on('topics.clear', clearTopics);
	
			function updateStore() {
				topicStorage.put(topicID, $scope.model.topics);
			}
	
			function clearTopics() {
				$scope.model.topics.length = 0;
			}
		}]);
});
