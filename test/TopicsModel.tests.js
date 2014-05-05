/*global sinon, module, test, equal, ok, deepEqual*/
(function (given) {
	'use strict';

	var injector, TopicsModel, $window, topicsModel;

	/**
	 * givens
	 *************************************************************************/
	given.testModel = function(id, ph) {
		topicsModel = new TopicsModel(id || 'test-id', ph || 'test-placeholder');
	};

	/**
	 * setup / teardown
	 *************************************************************************/
	 function setup() {
		injector = angular.injector(['ng', 'retro']);
		TopicsModel = injector.get('TopicsModel');
		$window = injector.get('$window');

		this.getItemStub = sinon.stub($window.localStorage, 'getItem');
		this.setItemStub = sinon.stub($window.localStorage, 'setItem');

		localStorage.clear();
	 }

	 function teardown() {
		injector = TopicsModel = null;
		this.getItemStub.restore();
		this.setItemStub.restore();
		topicsModel = null;
	 }

	/**
	 * module
	 *************************************************************************/
	module('TopicsModel', { setup: setup, teardown: teardown });

	test('Constructor', function () {
		given.testModel();

		equal(topicsModel.id, 'test-id', 'instance id = test-id');
		equal(topicsModel.placeholder, 'test-placeholder', 'instance placeholder = test-placeholder');
		ok(angular.isArray(topicsModel.list),'instance list property is an array');
		equal(topicsModel.editing, false, 'instance editing initialized to false');
	});

	test('TopicsModel.add()', function () {
		given.testModel();
		var mockTopic = {name: 'test topic'};
		var otherMockTopic = {name: 'other topic'};

		topicsModel.add(mockTopic);
		equal(topicsModel.list[0], mockTopic, 'first element of list property contains mockTopic');

		topicsModel.add(otherMockTopic);
		equal(topicsModel.list[0], otherMockTopic, 'when adding a second topic first element of list contains otherMockTopic');
		equal(topicsModel.list[1], mockTopic, 'when adding a second topic second element of list property contains mockTopic');
		ok(this.setItemStub.calledTwice, 'Saves to localStorage once per call to add()');
	});

	test('TopicsModel.add() with votes', function () {
		given.testModel();
		var mockVoteTopic = {name: 'test topic', votes: 1};

		topicsModel.add(mockVoteTopic);
		equal(topicsModel.list[0], mockVoteTopic, 'first element of list property contains mockVoteTopic');
		ok(this.setItemStub.calledOnce, 'Saves to localStorage one time');
	});

	test('TopicsModel.save()', function () {
		given.testModel();
		var mockTopic = { name: 'topic 1' };
		topicsModel.list = [mockTopic];
		topicsModel.save();

		ok(this.setItemStub.calledOnce, 'setItem was called once');
		ok(this.setItemStub.calledWith('test-id'), 'localStorage called with id "test-id"');
		
		ok(this.setItemStub.calledWith(sinon.match.string, JSON.stringify([mockTopic])),
			'localStorage called with data ' + JSON.stringify([mockTopic]));
	});

	test('TopicsModel.remove()', function () {
		given.testModel();
		var MockTopic1 = { name: 'topic 1', votes: 1 };
		var MockTopic2 = { name: 'topic 2', votes: 2 };
		var MockTopic3 = { name: 'topic 3', votes: 3 };

		topicsModel.list = [MockTopic1, MockTopic2, MockTopic3];
		topicsModel.remove(MockTopic2);
		deepEqual(topicsModel.list, [MockTopic1, MockTopic3], 'Removes object from list');

		topicsModel.remove(MockTopic2);
		deepEqual(topicsModel.list, [MockTopic1, MockTopic3], 'Only removes object if object exists in list');
		ok(this.setItemStub.calledOnce, 'Saves to localStorage one time');
	});


	test('TopicsModel.clear()', function () {
		given.testModel();
		var MockTopic1 = { name: 'topic 1', votes: 1 };
		var MockTopic2 = { name: 'topic 2', votes: 2 };
		var MockTopic3 = { name: 'topic 3', votes: 3 };

		topicsModel.list = [MockTopic1, MockTopic2, MockTopic3];
		topicsModel.clear();

		equal(topicsModel.list.length, 0, 'Sets list to zero elements');
		ok(this.setItemStub.calledOnce, 'Saves to localStorage one time');
	});

	test('TopicsModel.endEditing()', function () {
		given.testModel();
		var MockTopic1 = { name: 'test topic', editing: true };
		topicsModel.list = [MockTopic1];
		topicsModel.endEditing(MockTopic1);

		equal(topicsModel.editing, false, 'sets editing to false');
	});
})({});
