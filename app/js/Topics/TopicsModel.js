angular
	.module('retro.Topics')
	.factory('TopicsModel', ['$window', function ($window) {
		'use strict';

		function Topics(id, placeholder) {
			this.id = id;
			this.placeholder = placeholder;
			this.list = angular.fromJson($window.localStorage.getItem(id)) || [];
			this.editing = false;
		}

		Topics.prototype = {
			add: function (topic) {
				if (topic.name && topic.name.length) {
					this.list.unshift(topic);
					this.save();
				}
			},

			save: function () {
				$window.localStorage.setItem(this.id, angular.toJson(this.list));
			},

			remove: function (topic) {
				var list = this.list,
					idx = list.indexOf(topic);

				if (idx >= 0) {
					list.splice(list.indexOf(topic), 1);
					this.save();
				}
			},

			clear: function () {
				this.list = [];
				this.save();
			},

			endEditing: function (topic) {
				if (topic.editing) {
					topic.editing = false;
					this.save();
				}
			}
		};

		return Topics;

	}]);
