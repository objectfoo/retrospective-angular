angular
    .module('retro')
    .controller('MainCtrl', ['$scope', 'version', 'printService',
    function ($scope, version, printService) {
        'use strict';

        $scope.today = new Date();
        $scope.version = version;

        $scope.$on('print', function () {
            printService.write('print-header.html', { today: $scope.today });
        });
    }]);
