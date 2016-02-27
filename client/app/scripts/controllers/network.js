'use strict';

/**
 * @ngdoc function
 * @name websocketApp.controller:NetworkCtrl
 * @description
 * # NetworkCtrl
 * Controller of the websocketApp
 */
angular.module('websocketApp')
  .controller('NetworkCtrl', function ($scope, WebSocketFactory) {
      WebSocketFactory.subscribe('net', function (value) {
        console.log('network', value);
        $scope.$apply(function () {
           $scope.value = value;
        });
      });
  });
