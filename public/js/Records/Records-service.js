'use strict';

angular.module('supercall')
  .factory('Records', ['$resource', function ($resource) {
    return $resource('supercall/Records/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'},
      'open': { method: 'GET'}
    });
  }]);
