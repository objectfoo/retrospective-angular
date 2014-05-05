(function (retro) {
	'use strict';

	retro.directive('focusInput', ['$timeout', function todoFocus($timeout) {
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
})(angular.module('FocusInput', []));

