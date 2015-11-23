'use strict';

// Declare app level module which depends on views, and components
angular.module('angularApp', [
  'ngRoute',
  'ui.router'
])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('base', {
        url: '',
        abstract: true,
        templateUrl: 'layout.html'
      });
  }]);
