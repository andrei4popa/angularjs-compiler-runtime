angular.module('runtimeBuilder', [
  'runtimeBuilder.services',
  'runtimeBuilder.controllers',
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when("/personList", {templateUrl: "partials/personList.html", controller: "personListController"}).
	otherwise({redirectTo: '/personList'});
}]);