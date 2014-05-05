/**
 * Topics
 *
 * TopicCtrl: base topics controller
 * TopicsModel: model for a topics list
 * topVoting: directive that adds voting for a list
 *****************************************************************************/
(function (angular, Topics) {
	'use strict';

	/**
	 * TopicCtrl
	 *************************************************************************/
	Topics.controller('TopicCtrl', [ '$scope', '$attrs', 'TopicsModel', '$rootScope', 'printService',
	function ($scope, $attrs, TopicsModel, $rootScope, printService) {
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
	}])

	/**
	 * TopicsModel
	 *************************************************************************/
	.factory('TopicsModel',
		['$window', function ($window) {

		function Topics(id, placeholder) {
			this.id = id;
			this.placeholder = placeholder;
			this.list = angular.fromJson($window.localStorage.getItem(id)) || [];
			this.editing = false;
		}

		Topics.prototype.add = function (topic) {
			if (topic.name && topic.name.length) {
				this.list.unshift(topic);
				this.save();
			}
		};

		Topics.prototype.save = function () {
			$window.localStorage.setItem(this.id, angular.toJson(this.list));
		};

		Topics.prototype.remove = function (topic) {
			var list = this.list,
				idx = list.indexOf(topic);

			if (idx >= 0) {
				console.log(idx);
				list.splice(list.indexOf(topic), 1);
				this.save();
			}
		};

		Topics.prototype.clear = function () {
			this.list = [];
			this.save();
		};

		Topics.prototype.endEditing = function (topic) {
			if (topic.editing) {
				topic.editing = false;
				this.save();
			}
		};

		return Topics;
	}])

	/**
	 * Directive: topVoting
	 *************************************************************************/
	.directive('topVoting', [function () {
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

})(angular, angular.module('retro.Topics', []));
