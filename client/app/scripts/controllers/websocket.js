'use strict';

/**
 * @ngdoc function
 * @name MonitoringClientApp.controller:WebsocketCtrl
 * @description
 * # WebsocketCtrl
 * Controller of the MonitoringClientApp
 */
angular.module('MonitoringClientApp')
  .controller('WebSocketCtrl', function ($scope, WebSocketFactory) {
      $scope.connect = function() {
        WebSocketFactory.connect();
        $scope.connected = true;
      };
  });
