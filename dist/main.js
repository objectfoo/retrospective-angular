window.retro = angular.module('retrospective', [])
  .value('version', 5.2)
  .controller('MainCtrl', ['$scope', 'version', 'printService',

  function ($scope, version, printService) {
    'use strict';

    $scope.today = new Date();
    $scope.version = version;
    $scope.$on('print', function () {
        printService.write('print-header.html', { today: $scope.today });
    });
  }])

  .controller('TopicCtrl',
  ['$scope', '$attrs', 'TopicsModel', '$rootScope', 'printService',
  function ($scope, $attrs, TopicsModel, $rootScope, printService) {
    'use strict';

    var originalTopic, topics;

    $rootScope.$on('print', printToWindow);
    $scope.$on('topics.clear', function () { topics.clear(); });

    $scope.topics = topics =
      new TopicsModel($attrs.topId, $attrs.topPlaceholder);

    $scope.add = function (topic) {
      topics.add({ name: topic });
      this.newTopic = '';
    };

    $scope.editTopic = function (topic) {
      originalTopic = angular.extend({}, topic);
      topic.editing = true;
    };

    $scope.doneEditing = function (topic) {
      if (topic.editing && topic.name.length === 0) {
        topics.remove(topic);
      }
      topics.endEditing(topic);
    };

    $scope.revertEditing = function (topic) {
      topics.list[topics.list.indexOf(topic)] = originalTopic;
      topic.editing = false;
      originalTopic = null;
    };

    function printToWindow() {
      if (topics.list.length > 0) {
        printService.write('print-placeholder.html', { placeholder: topics.placeholder });

        topics.list.forEach(function (topic) {
          printService.write('print-topic.html', { votes: topic.votes, name: topic.name });
        });
      }
    }
  }])

  .factory('TopicsModel', ['$window', function ($window) {
    'use strict';

    function Topics(id, placeholder) {
      this.id = id;
      this.placeholder = placeholder;
      this.list = angular.fromJson($window.localStorage.getItem(id)) || [];
      this.editing = false;
    }

    Topics.prototype = {
      add: function (topic) {
        if (topic.name && topic.name.length) {
          this.list.unshift(topic);
          this.save();
        }
      },

      save: function () {
        $window.localStorage.setItem(this.id, angular.toJson(this.list));
      },

      remove: function (topic) {
        var list = this.list,
          idx = list.indexOf(topic);

        if (idx >= 0) {
          list.splice(list.indexOf(topic), 1);
          this.save();
        }
      },

      clear: function () {
        this.list = [];
        this.save();
      },

      endEditing: function (topic) {
        if (topic.editing) {
          topic.editing = false;
          this.save();
        }
      }
    };

    return Topics;

  }])

  .directive('topVoting', function () {
    'use strict';

    return {
      priority: 100,
      restrict: 'A',
      require: '^TopicCtrl',
      scope: '=',

      controller: ['$scope', '$rootScope', function($scope, $rootScope) {
        $scope.isVotingEnabled = true;

        $rootScope.$on('sort', function () {
          $scope.topics.list.sort(function (a, b) {
            return (a.votes || 0) - (b.votes || 0);
          });
          $scope.topics.save();
        });

        $scope.add = function(newTopic) {
          $scope.topics.add({ name: newTopic, votes: 0 });
          this.newTopic = '';
        };

        $scope.increment = function (topic) {
          topic.votes++;
          $scope.topics.save();
        };
      }]
    };
  })

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
  }])

  .directive('forceNumeric', function () {
    'use strict';

    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attrs, ngModelCtrl) {
        ngModelCtrl.$parsers.push(voteParser);

        function voteParser(text) {
          var transformed = text.replace(/[^0-9]/g, '');

          if (transformed !== text) {
            ngModelCtrl.$setViewValue(transformed);
            ngModelCtrl.$render();
          }

          return transformed;
        }
      }
    };
  })

  .directive('focusInput', ['$timeout', function ($timeout) {

    return function (scope, elem, attrs) {
      scope.$watch(attrs.focusInput, function (newVal) {

        if (newVal) {
          $timeout(function () { elem[0].focus(); }, 0, false);
        }
      });
    };
  }])

  .directive('escInInput', function () {
    'use strict';

    var ESC_KEY = 27;

    return function (scope, elem, attrs) {
      elem.on('keydown', function (e) {
        if (e.keyCode === ESC_KEY) {
          scope.$apply(attrs.escInInput);
        }
      });
    };
  });
