var StarterAngularComponent;
(function(StarterAngularComponent) {
  "use strict";

  var Modules = (function() {
    function Modules() {}
    Modules.customDirectives = angular.module("customDirectives", []);
    Modules.customFilters = angular.module("customFilters", []);
    Modules.customServices = angular.module("customServices", []);
    Modules.main = angular.module("starter.angular.component", [
      "customDirectives",
      "customFilters",
      "customServices"
    ]);
    return Modules;
  })();

  StarterAngularComponent.Modules = Modules;
})(StarterAngularComponent || (StarterAngularComponent = {}));

var StarterAngularComponent;
(function(StarterAngularComponent) {
  "use strict";
  var Base;
  (function(Base) {

    var ExamComponentApiService = (function() {
      // Constructor fn
      function ExamComponentApiService($http, $rootScope) {
        var self = this, currentCount; // currentCount is undefined until we get api data
        // First initialization for currentCount
        syncWithStoredCount();

        this.getCurrentCount = function() { return currentCount; };
        this.syncWithStoredCount = syncWithStoredCount;
        this.incrementCount = function () { // Can only increment if we have some initial value
          if (currentCount !== undefined) {
            currentCount++;
            $rootScope.$broadcast("examComponent:updateCount");
          }
        };

        // Functions
        function syncWithStoredCount() {
          $http.get("/demo/getStoredCount.json")
            .success(function(data) {
              currentCount = data.count;
              $rootScope.$broadcast("examComponent:updateCount");
            }).error(function(error) { console.log(error); });
        }
      }
      ExamComponentApiService.$inject = ["$http", "$rootScope"];
      return ExamComponentApiService;
    })();
    Base.ExamComponentApiService = ExamComponentApiService;

    StarterAngularComponent.Modules.customServices.service("examComponentApi",
    ["$http", "$rootScope",
      function($http, $rootScope) {
        return new ExamComponentApiService($http, $rootScope);
      }
    ]);

  })(Base = StarterAngularComponent.Base || (StarterAngularComponent.Base = {}));
})(StarterAngularComponent || (StarterAngularComponent = {}));

var StarterAngularComponent;
(function(StarterAngularComponent) {
  "use strict";
  var Base;
  (function(Base) {

    /* <exam-component></exam-component>
     */
    var ExamComponentDirective = (function() {
      function ExamComponentDirective(examComponentApi) {
        this.scope = {};
        this.restrict = "E";
        this.replace = false;
        this.transclude = false;
        this.templateUrl = "lib/examComponent/examComponentView.html";
        this.link = function($scope, $element, $attrs) {
          angular.noop($element, $attrs);
          syncCount();

          $scope.incrementCount = function() {
            examComponentApi.incrementCount();
          };
          // Event listeners
          var desregisterExamComponentListener = $scope.$on("examComponent:updateCount", syncCount);
          $scope.$on("$destroy", function() { desregisterExamComponentListener(); });
          // Functions
          function syncCount() { $scope.count = examComponentApi.getCurrentCount(); }
        };
      }

      ExamComponentDirective.$inject = ["examComponentApi"];
      return ExamComponentDirective;
    })();

    Base.ExamComponentDirective = ExamComponentDirective;
    StarterAngularComponent.Modules.customDirectives.directive("examComponent", [
      "examComponentApi",
      function(examComponentApi) {
        return new ExamComponentDirective(examComponentApi);
      }
    ]);

  })(Base = StarterAngularComponent.Base || (StarterAngularComponent.Base = {}));
})(StarterAngularComponent || (StarterAngularComponent = {}));

var StarterAngularComponent;
(function(StarterAngularComponent) {
  "use strict";
  var Base;
  (function(Base) {

    // Filter that returns the first word using space as default word separator
    StarterAngularComponent.Modules.customFilters.filter("firstWord", function() {
      return function(input, wordsSeparator) {
        var ret = "";
        if (wordsSeparator === undefined) {
          wordsSeparator = " ";
        }
        if (input && input.length) {
          ret = input.split(wordsSeparator)[0];
        }
        return ret;
      };
    });
    angular.noop(Base);

  })(Base = StarterAngularComponent.Base || (StarterAngularComponent.Base = {}));
})(StarterAngularComponent || (StarterAngularComponent = {}));

var StarterAngularComponent;
(function(StarterAngularComponent) {
  "use strict";
  var Base;
  (function(Base) {

    // FakeApiCall class will be exported as an angular service
    var FakeApiCall = (function() {
      function FakeApiCall($http, $q) {

        // Call a backend method using angular's $http service
        this.testNgHttpRequest = function() {
          var deferred = $q.defer();
          $http.get("/hiHttp")
            .success(function(data) {
              deferred.resolve(data);
            })
            .error(function(error) {
              deferred.reject(error);
            });
          return deferred.promise;
        };

        // Call a backend method using ajax
        this.testAjaxRequest = function(onSuccessCallback, onErrorCallback) {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", "/hiAjax", true);
          xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) { // NOTE: status 4 - request finished and response is ready
              if (xhr.status === 200) { onSuccessCallback(xhr.responseText); } // NOTE: status 200 - "OK"
              else { onErrorCallback(xhr); }
            } else { onErrorCallback(xhr); }
          };
          xhr.onerror = function() { onErrorCallback(xhr); };
          xhr.send();
        };

      }
      FakeApiCall.$inject = ["$http", "$q"];
      return FakeApiCall;
    })();
    Base.FakeApiCall = FakeApiCall;

    StarterAngularComponent.Modules.customServices.service("fakeApiCall", ["$http", "$q",
      function($http, $q) {
        return new FakeApiCall($http, $q);
      }
    ]);

  })(Base = StarterAngularComponent.Base || (StarterAngularComponent.Base = {}));
})(StarterAngularComponent || (StarterAngularComponent = {}));

var StarterAngularComponent;
(function(StarterAngularComponent) {
  "use strict";
  var Base;
  (function(Base) {

    /* <show-more-or-less data-text="{{ getInnerText() }}"
     *                    data-max-length="10">
     * <show-more-or-less>
     */
    var ShowMoreOrLess = (function() {
      function ShowMoreOrLess($timeout) {
        this.scope = {
          text: "@",
          maxLength: "@",
          showMoreText: "@",
          showLessText: "@",
          truncateSymbol: "@"
        };
        this.restrict = "E";
        this.replace = false;
        this.transclude = false;
        this.templateUrl = "lib/directives/showMoreOrLess/showMoreOrLess.html";
        this.link = {
          post: function($scope, $element, $attrs) {
            angular.noop($element, $attrs);
            if ($scope.showMoreText === undefined) {
              $scope.showMoreText = "[+] show more";
            }
            if ($scope.showLessText === undefined) {
              $scope.showLessText = "[-] show less";
            }
            if ($scope.truncateSymbol === undefined) {
              $scope.truncateSymbol = " ...";
            }
            $scope.isTruncateable = function() {
              return $scope.text.length > parseInt($scope.maxLength, 10);
            };
            $scope.isTruncated = true;
            $scope.toggleCollapse = function() {
              $timeout(function() {
                $scope.isTruncated = !$scope.isTruncated;
                $scope.$apply();
              });
            };
            $scope.getTruncatedString = function() {
              var maxLength = parseInt($scope.maxLength, 10) - $scope.truncateSymbol.length,
                ret = $scope.text;
              if (!$scope.isTruncateable() || !$scope.isTruncated) {
                ret = $scope.text;
              } else if (maxLength <= 0) {
                ret = $scope.truncateSymbol;
              } else if ($scope.text.length > maxLength) {
                ret = $scope.text.substring(0, maxLength) + $scope.truncateSymbol;
              }
              return ret;
            };
          }
        };
      }
      ShowMoreOrLess.$inject = ["$timeout"];
      return ShowMoreOrLess;
    })();
    Base.ShowMoreOrLess = ShowMoreOrLess;

    StarterAngularComponent.Modules.customDirectives.directive("showMoreOrLess", [
      "$timeout",
      function($timeout) {
        return new ShowMoreOrLess($timeout);
      }
    ]);

  })(Base = StarterAngularComponent.Base || (StarterAngularComponent.Base = {}));
})(StarterAngularComponent || (StarterAngularComponent = {}));
