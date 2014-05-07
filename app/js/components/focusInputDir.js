(function (angular) {
	'use strict';

	function focusInput($timeout) {

		return function (scope, elem, attrs) {
			scope.$watch(attrs.focusInput, function (newVal) {

				if (newVal) {
					$timeout(function () {
						elem[0].focus();
					}, 0, false);
				}
			});
		};
	}

	focusInput.$inject = ['$timeout'];
	angular.module('FocusInput', []).directive('focusInput', focusInput);
})(angular);

