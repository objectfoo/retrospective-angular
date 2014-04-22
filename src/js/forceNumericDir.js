retrospective.directive('forceNumeric', [function(){
	'use strict';

	return {
		require: 'ngModel',
		restrict: 'A',

		link: function($scope, element, attrs, ngModelCtrl) {
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
	};
}]);
