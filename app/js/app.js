angular.module('retrospective', [])
.value('topicMeta', [])
.value('version', 5.0)
.controller('MainCtrl', ['$scope', '$filter', 'version', 'topicMeta', 'topicStorage', '$templateCache', '$interpolate',

function MainCtrl($scope, $filter, version, topicMeta, topicStorage, $templateCache, $tmpl) {
	'use strict';

	$scope.today = new Date();
	$scope.version = version;
	
	$scope.$on('print', function () {
		var html = '';
		var tmplHeader = $templateCache.get('print-header.html');
		var tmplPlaceholder = $templateCache.get('print-placeholder.html');
		var tmplTopic = $templateCache.get('print-topic.html');

		html += $tmpl(tmplHeader)({
			today: $scope.today
		});

		topicMeta.forEach(function (meta) {
			var topics = topicStorage.get(meta.id);
			
			if (topics.length > 0) {
				html += $tmpl(tmplPlaceholder)({placeholder: meta.placeholder});

				topics.forEach(function (topic) {
					html += $tmpl(tmplTopic)(topic);
				});
			}
		});
		document.write(html);
	});
}]);
