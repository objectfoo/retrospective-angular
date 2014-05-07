(function (angular) {
	'use strict';

	function escInInput() {
		var ESC_KEY = 27;

		return function (scope, elem, attrs) {
			elem.on('keydown', function (e) {
				if (e.keyCode === ESC_KEY) {
					scope.$apply(attrs.escInInput);
				}
			});
		};
	}

	angular.module('EscInInput', []).directive('escInInput', escInInput);

})(angular);
