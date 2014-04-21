define(['app', 'topicStorage'], function (app) {
	'use strict';

	return app.controller('TopicsCtrl', function ($scope, $attrs, topicStorage, topicIDs) {
		var topicID = $attrs.id;

		if (!~topicIDs.indexOf(topicID)) {
			topicIDs.push(topicID)
		}

		$scope.model = {
			topicID: topicID,
			topics: topicStorage.get(topicID)
		};

		$scope.$watchCollection('model.topics', updateStore);
		$scope.$on('topics.clear', clearTopics);

		function updateStore() {
			topicStorage.put(topicID, $scope.model.topics);
		}

		function clearTopics() {
			$scope.model.topics.length = 0;
		}
	});
});
