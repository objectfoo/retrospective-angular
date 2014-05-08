angular
	.module('FocusInput', [])
	.directive('focusInput', ['$timeout', function ($timeout) {

		return function (scope, elem, attrs) {
			scope.$watch(attrs.focusInput, function (newVal) {

				if (newVal) {
					$timeout(function () { elem[0].focus(); }, 0, false);
				}
			});
		};
	}]);
