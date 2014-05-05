(function (retro) {
	'use strict';

	retro
	.value('topicMeta', [])
	.value('version', 5.2)
	.controller('MainCtrl',
		[ '$scope', '$filter', 'version', 'topicMeta', 'printService', MainCtrl ]);

	function MainCtrl($scope, $filter, version, topicMeta, printService) {
		$scope.today = new Date();
		$scope.version = version;
		
		$scope.$on('print', function () {
			printService.write('print-header.html', { today: $scope.today });
		});
	}
})(angular.module('retro', ['retro.Topics', 'retro.Print', 'ForceNumeric', 'FocusInput', 'EscInInput']));
