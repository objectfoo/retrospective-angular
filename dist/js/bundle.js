(function (retrospective) {
	'use strict';

	retrospective
	.value('topicMeta', [])
	.value('version', 5.2)
	.controller('MainCtrl',
		[ '$scope', '$filter', 'version', 'topicMeta', 'printService', MainCtrl ]);

	function MainCtrl($scope, $filter, version, topicMeta, printService) {
		$scope.today = new Date();
		$scope.version = version;
		
		$scope.$on('print', function () {
			printService.write('print-header.html', { today: $scope.today });
		});
	}
})(angular.module('retrospective', []));

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
			var list = this.list;
			list.splice(list.indexOf(topic), 1);
			this.save();
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

(function (retrospective) {
	'use strict';

	retrospective.directive('topVoting', [function () {
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
})(angular.module('retrospective'));

(function (retrospective) {
	'use strict';

	retrospective.directive('escInInput', [function(){
		var ESC_KEY = 27;

		return function (scope, elem, attrs) {
			elem.on('keydown', function (e) {
				if (e.keyCode === ESC_KEY) {
					scope.$apply(attrs.escInInput);
				}
			});
		};
	}]);
})(angular.module('retrospective'));


(function (retrospective) {
	'use strict';

	retrospective.directive('focusInput', ['$timeout', function todoFocus($timeout) {
		return function (scope, elem, attrs) {
			scope.$watch(attrs.focusInput, function (newVal) {
				if (newVal) {
					$timeout(function () {
						elem[0].focus();
					}, 0, false);
				}
			});
		};
	}]);	
})(angular.module('retrospective'));

(function (retrospective) {
	'use strict';

	retrospective.directive('forceNumeric', [function(){
		return {
			require: 'ngModel',
			restrict: 'A',

			link: ['$scope', '$element', '$attrs', 'ngModelCtrl', function($scope, element, attrs, ngModelCtrl) {
				ngModelCtrl.$parsers.push(voteParser);

				function voteParser(text) {
					var transformed = text.replace(/[^0-9]/g, '');

					if (transformed !== text) {
						ngModelCtrl.$setViewValue(transformed);
						ngModelCtrl.$render();						
					}

					return transformed;
				}
			}]
		};
	}]);
})(angular.module('retrospective'));

(function (retrospective) {
	'use strict';

	retrospective.service('printService',
		['$templateCache', '$interpolate', printService]);

	function printService($templateCache, $interpolate) {
		return {
			write: function (template, data) {
				var tmpl = $templateCache.get(template);

				document.write($interpolate(tmpl)(data));
			}
		};
	}
})(angular.module('retrospective'));

