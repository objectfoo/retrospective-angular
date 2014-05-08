window.retro
	.controller('TopicCtrl',
	['$scope', '$attrs', 'TopicsModel', '$rootScope', 'printService',
	function ($scope, $attrs, TopicsModel, $rootScope, printService) {
		'use strict';

		var originalTopic, topics;

		$rootScope.$on('print', printToWindow);
		$scope.$on('topics.clear', function () { topics.clear(); });

		$scope.topics = topics =
			new TopicsModel($attrs.topId, $attrs.topPlaceholder);

		$scope.add = function (topic) {
			topics.add({ name: topic });
			this.newTopic = '';
		};

		$scope.editTopic = function (topic) {
			originalTopic = angular.extend({}, topic);
			topic.editing = true;
		};

		$scope.doneEditing = function (topic) {
			if (topic.editing && topic.name.length === 0) {
				topics.remove(topic);
			}
			topics.endEditing(topic);
		};

		$scope.revertEditing = function (topic) {
			topics.list[topics.list.indexOf(topic)] = originalTopic;
			topic.editing = false;
			originalTopic = null;
		};

		function printToWindow() {
			if (topics.list.length > 0) {
				printService.write('print-placeholder.html', { placeholder: topics.placeholder });

				topics.list.forEach(function (topic) {
					printService.write('print-topic.html', { votes: topic.votes, name: topic.name });
				});
			}
		}
	}]);
