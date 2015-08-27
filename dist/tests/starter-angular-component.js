var StarterAngularComponent;
(function(StarterAngularComponent) {
  "use strict";
  var Tests;
  (function(Tests) {

    // SetupTestData class to set all our default mock data
    var SetupTestData = (function() {
      function SetupTestData() {}
      SetupTestData.app = angular.module("testFilters", ["starter.angular.component"]);
      SetupTestData.firstWordFilterFullText = "Lorem.ipsum.ad.his.scripta.blandit.partiendo";
      SetupTestData.firstWordSeparator = ".";
      SetupTestData.firstWordResult = "Lorem";
      return SetupTestData;
    })();

    describe("firstWord filter", function() {
      var _$filter;
      beforeEach(module("testFilters"));
      beforeEach(inject(function($filter) {
        _$filter = $filter;
      }));
      it("should return the first word", function() {
        var result = _$filter('firstWord')(SetupTestData.firstWordFilterFullText, SetupTestData.firstWordSeparator);
        expect(result.toString()).toBe(SetupTestData.firstWordResult);
      });
    });
    angular.noop(Tests);

  })(Tests = StarterAngularComponent.Tests || (StarterAngularComponent.Tests = {}));
})(StarterAngularComponent || (StarterAngularComponent = {}));

var StarterAngularComponent;
(function(StarterAngularComponent) {
  "use strict";
  var Tests;
  (function(Tests) {

    // SetupTestData class to set all our default mock data
    var SetupTestData = (function() {
      function SetupTestData() {}
      SetupTestData.app = angular.module("testFakeApiCall", ["starter.angular.component"]);
      SetupTestData.backendPathHttp = "/hiHttp";
      SetupTestData.httpMethod = "GET";
      SetupTestData.backendResponse = { result: "OK" };
      return SetupTestData;
    })();

    describe("appCall service", function() {
      var _$httpBackend, _fakeApiCall;
      beforeEach(module("testFakeApiCall"));
      beforeEach(inject(function($httpBackend, fakeApiCall) {
        _$httpBackend = $httpBackend;
        _fakeApiCall = fakeApiCall;
      }));

      it("testNgHttpRequest mock backend should work", function() {
        var apiData;
        // setup our fake backend to listen for angular's $http 'GET' requests on '/hi'
        _$httpBackend.when(SetupTestData.httpMethod, SetupTestData.backendPath).respond(SetupTestData.backendResponse);
        _fakeApiCall.testNgHttpRequest()
          .then(function(data) { apiData = data; })
          .catch(function(error) { console.log(error); });
        _$httpBackend.flush();
        expect(apiData.result).toBe(SetupTestData.backendResponse.result);
      });

      it("testAjaxRequest mock backend should work", function() {
        jasmine.Ajax.install();
        var doneFn = jasmine.createSpy("ajaxRequestWorked"),
            successCallback = function (data) { doneFn(data); },
            errorCallback = function (error) { console.log(error); };
        _fakeApiCall.testAjaxRequest(successCallback, errorCallback);
        jasmine.Ajax.requests.mostRecent().respondWith({
            "status": 200,
            "contentType": "application/json",
            "responseText": SetupTestData.backendResponse
        });
        expect(doneFn).toHaveBeenCalledWith(SetupTestData.backendResponse);
        jasmine.Ajax.uninstall();
      });

    });
    angular.noop(Tests);

  })(Tests = StarterAngularComponent.Tests || (StarterAngularComponent.Tests = {}));
})(StarterAngularComponent || (StarterAngularComponent = {}));

var StarterAngularComponent;
(function(StarterAngularComponent) {
  "use strict";
  var Tests;
  (function(Tests) {

    var SetupTestData = (function() {
      function SetupTestData() {}
      SetupTestData.app = angular.module("testShowMoreOrLess", ["starter.angular.component"]);
      SetupTestData.text = "12345 abcde 67890";
      SetupTestData.maxLengthTestCases = [16, 17, 18];
      SetupTestData.template = '<show-more-or-less data-text="{{ truncateableText }}" data-max-length="{{ maxLength }}"></show-more-or-less>';
      SetupTestData.truncatedInnerText = "12345 abcde  ... [+] show more";
      SetupTestData.expandedInnerText = "12345 abcde 67890 [-] show less";
      return SetupTestData;
    })();

    describe("showMoreOrLess directive", function() {
      var _$compile, _$rootScope, _$timeout;
      beforeEach(module("testShowMoreOrLess"));
      beforeEach(inject(function($compile, $rootScope, $timeout) {
        _$compile = $compile;
        _$rootScope = $rootScope;
        _$timeout = $timeout;
      }));
      it("should truncate text, and show expected truncated inner text", function() {
        var scope = _$rootScope.$new(),
          element, isolatedScope;
        element = _$compile(SetupTestData.template)(scope);
        scope["truncateableText"] = SetupTestData.text;
        // First max length test case
        scope["maxLength"] = SetupTestData.maxLengthTestCases[0];
        scope.$digest();

        isolatedScope = element.children().scope();
        expect(element.text()).toBe(SetupTestData.truncatedInnerText);
        // Verify we can truncate this text for the initial test case (16 length)
        expect(isolatedScope.isTruncateable()).toBeTruthy();
        // Default state is collapsed
        expect(isolatedScope.text).toBe(SetupTestData.text);
        expect(isolatedScope.isTruncated).toBeTruthy(); // Initial state is to truncate
        isolatedScope.toggleCollapse(); // Expand the text
        _$timeout.flush();
        expect(element.text()).toBe(SetupTestData.expandedInnerText);
        expect(isolatedScope.isTruncated).toBeFalsy();
        // The second and third maxLength tests should not truncate
        scope["maxLength"] = SetupTestData.maxLengthTestCases[1];
        scope.$digest();
        expect(isolatedScope.isTruncateable()).toBeFalsy();
        expect(element.text().trim()).toBe(SetupTestData.text.trim());
        scope["maxLength"] = SetupTestData.maxLengthTestCases[2];
        scope.$digest();
        expect(isolatedScope.isTruncateable()).toBeFalsy();
        expect(element.text().trim()).toBe(SetupTestData.text.trim());
      });
    });
    angular.noop(Tests);

  })(Tests = StarterAngularComponent.Tests || (StarterAngularComponent.Tests = {}));
})(StarterAngularComponent || (StarterAngularComponent = {}));
