window.retro
	.service('printService', ['$templateCache', '$interpolate',
	function ($templateCache, $interpolate) {
		'use strict';

		return {
			write: function (template, data) {
				/*jshint evil:true*/
				var tmpl = $templateCache.get(template);

				document.write($interpolate(tmpl)(data));
			}
		};
	}]);
