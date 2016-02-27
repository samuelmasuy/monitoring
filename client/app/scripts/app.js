'use strict';

/**
 * @ngdoc overview
 * @name MonitoringClientApp
 * @description
 * # MonitoringClientApp
 *
 * Main module of the application.
 */
angular
  .module('MonitoringClientApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/websocket.html',
        controller: 'WebSocketCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
