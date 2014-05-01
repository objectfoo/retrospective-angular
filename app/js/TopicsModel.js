(function (angular, retrospective) {
	'use strict';

	retrospective.factory('TopicsModel',
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
			if (idx > 0) {
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
	}]);
})(angular, angular.module('retrospective'));
