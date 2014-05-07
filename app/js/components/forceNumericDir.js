(function (module) {
	'use strict';

	function forceNumeric(){
		return {
			require: 'ngModel',
			restrict: 'A',
			link: linkFn
		};
	}

	function linkFn($scope, element, attrs, ngModelCtrl) {
		ngModelCtrl.$parsers.push(voteParser);

		function voteParser(text) {
			var transformed = text.replace(/[^0-9]/g, '');

			if (transformed !== text) {
				ngModelCtrl.$setViewValue(transformed);
				ngModelCtrl.$render();						
			}

			return transformed;
		}
	}
	linkFn.$inject = ['$scope', '$element', '$attrs', 'ngModelCtrl'];

	module.directive('forceNumeric', forceNumeric);

})(angular.module('ForceNumeric', []));
