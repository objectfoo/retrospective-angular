/*global sinon, module, test, equal, ok*/
(function (given) {
	'use strict';

	var injector, ctrl, $scope;
	var attrMock = {
		topId: 'test-id',
		topPlaceholder: 'test-placeholder'
	};


	/**
	 * Setup / tear down
	 *************************************************************************/
	function setup() {
		injector = angular.injector(['ng', 'retrospective']);
		$scope = injector.get('$rootScope').$new();

		ctrl = injector.get('$controller')('TopicCtrl', {
			$scope: $scope,
			$attrs: attrMock,
			TopicsModel: injector.get('TopicsModel'),
			$rootScope: injector.get('$rootScope'),
			printService: {
				write: sinon.spy()
			}
		});
		$scope.topics = sinon.stub($scope.topics);
	}

	function teardown() {
		$scope = ctrl = injector = null;
	}

	/**
	 * module
	 *************************************************************************/
	module('TopicCtrl', { setup: setup, teardown: teardown });

	test('Add calls topic.add() and resets newTopic property', function () {
		var topicName = 'test topic';
		$scope.newTopic = 'test topic';
		
		$scope.add(topicName);
		
		ok($scope.topics.add.calledOnce, 'add() called once');
		ok($scope.topics.add.calledWith({name: topicName}), 'Called with {name: "test topic"}');
		equal($scope.newTopic.length, 0, 'Clears $scope.newTopic');
	});

})(window.given || {});