'use strict';

angular.module('supercall')
  .factory('Files', ['$resource', function ($resource) {
    return $resource('supercall/Records/openFile/:id', {}, {
      'get': { method: 'GET'}
    });
  }]);
