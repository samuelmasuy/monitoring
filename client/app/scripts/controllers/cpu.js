'use strict';

/**
 * @ngdoc function
 * @name MonitoringClientApp.controller:CpuCtrl
 * @description
 * # CpuCtrl
 * Controller of the MonitoringClientApp
 */
angular.module('MonitoringClientApp')
  .controller('CpuCtrl', function ($scope, WebSocketFactory) {
      WebSocketFactory.subscribe('cpu', function (value) {
        console.log('cpu', value);
        $scope.$apply(function () {
           $scope.value = value;
        });
      });
  });
