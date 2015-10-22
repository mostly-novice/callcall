'use strict';

angular.module('supercall')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/Records', {
        templateUrl: 'views/Records/Records.html',
        controller: 'RecordsController',
        resolve:{
          resolvedRecords: ['Records', function (Records) {
            return Records.query();
          }]
        }
      })
    }]);
