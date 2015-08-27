;(function(){

'use strict';

angular.module('starter.angular.component').run(['$templateCache', function($templateCache) {

  $templateCache.put('lib/examComponent/examComponentView.html', '<button class="btn btn-default" ng-click="incrementCount()" ng-disabled="count === undefined">{{ count === undefined ? \'Api is needed\' : count }}</button>');

  $templateCache.put('lib/directives/showMoreOrLess/showMoreOrLess.html', '<span class="showMoreOrLess"><span>{{ getTruncatedString() }}</span> <a href ng-if="isTruncateable()" ng-click="toggleCollapse()">{{ isTruncated ? showMoreText : showLessText }}</a></span>');

}]);

})();