require.config({
	paths: {
		angular: '../vendor/angular/angular'
	},
	shim: {
		angular: {
			exports: 'angular'
		}
	}
});

require(['angular', 'app', 'TopicsCtrl', 'TopicsDir', 'AddVotingDir', 'topicStorage', 'forceNumericDir'], function (angular) {
	'use strict';
	angular.bootstrap(document, ['retrospective']);
});
