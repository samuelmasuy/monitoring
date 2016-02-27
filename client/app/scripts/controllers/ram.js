'use strict';

/**
 * @ngdoc function
 * @name MonitoringClientApp.controller:RamCtrl
 * @description
 * # RamCtrl
 * Controller of the MonitoringClientApp
 */
angular.module('MonitoringClientApp')
  .controller('RamCtrl', function ($scope, WebSocketFactory) {
      WebSocketFactory.subscribe('ram', function (value) {
        console.log('ram', value);
        $scope.$apply(function () {
           $scope.value = value;
        });
      });
  });
