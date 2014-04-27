angular.module('retrospective')
.controller('TopicCtrl', ['$scope', '$attrs', 'topicStorage', 'topicKeys', function ($scope, $attrs, topicStorage, topicKeys) {
	'use strict';

	var originalTopic, topics, model,
		topicID = $attrs.topId;

	topicKeys.push(topicID);

	angular.extend($scope, {
		model: {
			placeholder: $attrs.topPlaceholder,
			editedTopic: null,
			newTopic: null,
			topics: topicStorage.get(topicID)
		},

		add: add,
		remove: remove,
		editTopic: editTopic,
		doneEditing: doneEditing,
		revertEditing: revertEditing
	});

	// shortcuts
	model = $scope.model;
	topics = model.topics;

	// events
	$scope.$watch('model.topics', updateStore, true);
	$scope.$on('topics.clear', clearTopics);

	// functions
	function updateStore() {
		topicStorage.put(topicID, topics);
	}

	function clearTopics() {
		topics.length = 0;
	}

	function add(newName) {
		if (newName && newName.length) {
			topics.unshift({ name: newName });
			model.newTopic = '';
		}
	}

	function remove(topic) {
		topics.splice(topics.indexOf(topic), 1);
	}

	function editTopic(topic) {
		model.editedTopic = topic;
		originalTopic = angular.extend({}, topic);
	}

	function doneEditing(topic) {
		if (model.editedTopic !== null) {
			model.editedTopic = null;

			if (topic.name.length === 0) {
				remove(topic);
			}
		}
	}

	function revertEditing(topic) {
		topics[topics.indexOf(topic)] = originalTopic;
		doneEditing(originalTopic);
	}

}]);
