(function (angular) {
	'use strict';

	/**
	 * TopicCtrl
	 *************************************************************************/
	 function TopicCtrl($scope, $attrs, TopicsModel, $rootScope, printService) {
		var originalTopic, topics;

		$rootScope.$on('print', printToWindow);

		$scope.$on('topics.clear', function () {
			topics.clear();
		});

		topics = new TopicsModel($attrs.topId, $attrs.topPlaceholder);


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
				if (topic.editing && topic.name.length === 0) {
					topics.remove(topic);
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

	TopicCtrl.$inject = [ '$scope', '$attrs', 'TopicsModel', '$rootScope', 'printService'];
	angular.module('retro.Topics', []).controller('TopicCtrl', TopicCtrl);

})(angular);