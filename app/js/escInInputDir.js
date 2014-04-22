angular.module('escInInput', [])
.directive('escInInput', [function(){
	'use strict';
	var ESC_KEY = 27;

	return function (scope, elem, attrs) {
		elem.on('keydown', function (e) {
			if (e.keyCode === ESC_KEY) {
				scope.$apply(attrs.escInInput);
			}
		});
	};
}]);