// Declare app level module which depends on filters, and services
angular.module('supercall', ['ngResource', 'ngRoute', 'ui.bootstrap', 'ui.date', 'ui.select', 'angular-humanize'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home/home.html', 
        controller: 'HomeController'})
      .otherwise({redirectTo: '/'});
  }]);
