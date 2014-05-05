(function (print) {
	'use strict';

	print.service('printService',
		['$templateCache', '$interpolate', printService]);

	function printService($templateCache, $interpolate) {
		return {
			write: function (template, data) {
				var tmpl = $templateCache.get(template);

				document.write($interpolate(tmpl)(data));
			}
		};
	}
})(angular.module('retro.Print', []));
