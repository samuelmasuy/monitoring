'use strict';

/**
 * @ngdoc function
 * @name websocketApp.controller:RamCtrl
 * @description
 * # RamCtrl
 * Controller of the websocketApp
 */
angular.module('websocketApp')
  .controller('RamCtrl', function ($scope, WebSocketFactory) {
      WebSocketFactory.subscribe('ram', function (value) {
        console.log('ram', value);
        $scope.$apply(function () {
           $scope.value = value;
        });
      });
  });
