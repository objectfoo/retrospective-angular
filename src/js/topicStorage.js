retrospective.factory('topicStorage', ['$window', function ($window) {
	'use strict';

	return {
		get: function (id) {
			return angular.fromJson($window.localStorage.getItem(id) || '[]');
		},

		put: function (id, topics) {
			$window.localStorage.setItem(id, angular.toJson(topics));
		},

		remove: function (id) {
			$window.localStorage.removeItem(id);
		}
	};
}]);
