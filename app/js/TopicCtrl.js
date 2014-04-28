(function (angular, retrospective) {
	'use strict';

	retrospective.controller('TopicCtrl', 
		[ '$scope', '$attrs', 'TopicsModel', '$rootScope', 'printService', TopicCtrl]);

	function TopicCtrl($scope, $attrs, TopicsModel, $rootScope, printService) {
		var originalTopic,
			topics = new TopicsModel($attrs.topId, $attrs.topPlaceholder);

		$rootScope.$on('print', printToWindow);
		$scope.$on('topics.clear', function () {
			topics.clear();
		});

		angular.extend($scope, {
			topics: topics,
			
			add: function (topic) {
				topics.add({ name: topic });
				this.newTopic = '';
			},

			remove: function (topic) {
				topics.remove(topic);
			},

			editTopic: function(topic) {
				originalTopic = angular.extend({}, topic);
				topic.editing = true;
			},

			doneEditing: function (topic) {
				if (topic.editing && this.topic.name.length === 0) {
					topics.remove(this.topic);
				}
				topics.endEditing(topic);
			},

			revertEditing: function (topic) {
				topics.list[topics.list.indexOf(topic)] = originalTopic;
				topic.editing = false;
				originalTopic = null;
			}
		});
	
		function printToWindow() {
			if (topics.list.length > 0) {
				printService.write('print-placeholder.html', { placeholder: topics.placeholder });

				topics.list.forEach(function (topic) {
					printService.write('print-topic.html', { votes: topic.votes, name: topic.name });
				});
			}
		}
	}

})(angular, angular.module('retrospective'));
