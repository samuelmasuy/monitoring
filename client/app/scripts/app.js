'use strict';

/**
 * @ngdoc overview
 * @name websocketApp
 * @description
 * # websocketApp
 *
 * Main module of the application.
 */
angular
  .module('websocketApp', [
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
