'use strict';

/**
 * @ngdoc function
 * @name websocketApp.controller:DiskCtrl
 * @description
 * # DiskCtrl
 * Controller of the websocketApp
 */
angular.module('websocketApp')
  .controller('DiskCtrl', function ($scope, WebSocketFactory) {
      WebSocketFactory.subscribe('disk', function (value) {
        console.log('disk', value);
        $scope.$apply(function () {
           $scope.value = value;
        });
      });
  });
