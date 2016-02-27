'use strict';

/**
 * @ngdoc function
 * @name MonitoringClientApp.controller:DiskCtrl
 * @description
 * # DiskCtrl
 * Controller of the MonitoringClientApp
 */
angular.module('MonitoringClientApp')
  .controller('DiskCtrl', function ($scope, WebSocketFactory) {
      WebSocketFactory.subscribe('disk', function (value) {
        console.log('disk', value);
        $scope.$apply(function () {
           $scope.value = value;
        });
      });
  });
