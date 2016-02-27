'use strict';

/**
 * @ngdoc function
 * @name websocketApp.controller:WebsocketCtrl
 * @description
 * # WebsocketCtrl
 * Controller of the websocketApp
 */
angular.module('websocketApp')
  .controller('WebSocketCtrl', function ($scope, WebSocketFactory) {
      $scope.connect = function() {
        WebSocketFactory.connect();
        $scope.connected = true;
      };
  });
