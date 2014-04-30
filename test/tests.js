(function (given) {
	var injector, TopicsModel, store, $window;

	given.testModel = function(id, ph) {
		return new TopicsModel(id || 'test-id', ph || 'test-placeholder');
	};

	module("TopicsModel", {
		setup: function () {
			injector = angular.injector(['ng', 'retrospective']);
			TopicsModel = injector.get('TopicsModel');
			$window = injector.get('$window');

			this.getItemStub = sinon.stub($window.localStorage, "getItem");
			this.setItemStub = sinon.stub($window.localStorage, "setItem");

			localStorage.clear();
		},
		teardown: function () {
			injector = TopicsModel = store = null;
			this.getItemStub.restore();
			this.setItemStub.restore();
		}
	});

	test('Constructor function', function () {
		var topicsModel = given.testModel();

		equal(topicsModel.id, 'test-id', 'instance id = test-id');
		equal(topicsModel.placeholder, 'test-placeholder', 'instance placeholder = test-placeholder');
		ok(angular.isArray(topicsModel.list),'instance list property is an array');
		equal(topicsModel.editing, false, 'instance editing initialized to false');
	});

	test('TopicsModel.add', function () {
		var topicsModel = given.testModel();
		var mockTopic = {name: 'test topic'};
		var otherMockTopic = {name: 'other topic'};

		topicsModel.add(mockTopic);
		equal(this.setItemStub.called, true, 'setItem was called');
		equal(topicsModel.list[0], mockTopic, 'first element of list property contains mockTopic');

		topicsModel.add(otherMockTopic);
		equal(topicsModel.list[0], otherMockTopic, 'when adding a second topic first element of list contains otherMockTopic');
		equal(topicsModel.list[1], mockTopic, 'when adding a second topic second element of list property contains mockTopic');
	});

})({});
