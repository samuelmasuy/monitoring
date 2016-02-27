'use strict';

/**
 * @ngdoc function
 * @name websocketApp.controller:CpuCtrl
 * @description
 * # CpuCtrl
 * Controller of the websocketApp
 */
angular.module('websocketApp')
  .controller('CpuCtrl', function ($scope, WebSocketFactory) {
      WebSocketFactory.subscribe('cpu', function (value) {
        console.log('cpu', value);
        $scope.$apply(function () {
           $scope.value = value;
        });
      });
  });
