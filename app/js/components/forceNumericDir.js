(function (module) {
	'use strict';

	module.directive('forceNumeric', [function(){
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
})(angular.module('ForceNumeric', []));

