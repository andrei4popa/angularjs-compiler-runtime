'use strict';

/* Directives */


angular.module('runtimeBuilder.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).directive("runtime", function($compile) {
    return {
        link: postLink,
    };
    function postLink(scope, elem, attrs) {
        var rawHTML = scope.$eval(attrs.html)
        var linkFn = $compile(rawHTML);
        var $html = linkFn(scope);
        elem.append($html);
    }
})
  ;
