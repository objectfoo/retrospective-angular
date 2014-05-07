(function (angular) {
	'use strict';

	function printService($templateCache, $interpolate) {
		return {
			write: function (template, data) {
				var tmpl = $templateCache.get(template);

				document.write($interpolate(tmpl)(data));
			}
		};
	}

	printService.$inject = ['$templateCache', '$interpolate'];
	angular.module('retro.Print', []).service('printService', printService);

})(angular);
