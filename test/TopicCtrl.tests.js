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
		injector = angular.injector(['ng', 'retro.Topics']);
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

	test('add() should call topic.add() and reset newTopic property', function () {
		var topicName = 'test topic';
		$scope.newTopic = 'test topic';
		
		$scope.add(topicName);
		
		ok($scope.topics.add.calledOnce, 'add() called once');
		ok($scope.topics.add.calledWith({name: topicName}), 'Called with {name: "test topic"}');
		equal($scope.newTopic.length, 0, 'Clears $scope.newTopic');
	});

	test('remove() should call topic.remove()', function () {
		var testTopic = { name: 'test topic' };
		$scope.topics.list[0] = testTopic;
		
		$scope.remove(testTopic);

		ok($scope.topics.remove.calledOnce, 'remove() called once');
		ok($scope.topics.remove.calledWith(testTopic), 'called with ' + angular.toString(testTopic));
	});

	test('editTopic() should set topics editing property to true', function () {
		var testTopic = { name: 'test topic' };

		$scope.editTopic(testTopic);

		ok(testTopic.editing, 'editing is true');
	});

	test('doneEditing() should save topic', function () {
		var testTopic = { name: 'test topic', editing: true };

		$scope.doneEditing(testTopic);

		ok($scope.topics.endEditing.calledOnce, 'topics.endEditing() called');
		ok($scope.topics.endEditing.calledWith(testTopic), 'called with ' + angular.toString(testTopic));
	});

	test('doneEditing() should delete topic if name length is zero', function () {
		var testTopic = { name: '', editing: true };

		$scope.doneEditing(testTopic);

		ok($scope.topics.remove.calledOnce, 'topics.remove() called');
		ok($scope.topics.remove.calledWith(testTopic), 'called with ' + angular.toString(testTopic));
	});

	test('revertEditing() ', function () {
		var testName = 'test topic';
		var testTopic = { name: testName };

		$scope.topics.list[0] = testTopic;
		$scope.editTopic(testTopic);
		testTopic['name'] = 'another name';

		$scope.revertEditing(testTopic);

		equal(testTopic.editing, false, 'editing is false');
		equal($scope.topics.list[0].name, testName, 'topic name set back to original name');
	});

})(window.given || {});