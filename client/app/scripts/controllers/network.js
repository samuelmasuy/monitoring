'use strict';

/**
 * @ngdoc function
 * @name MonitoringClientApp.controller:NetworkCtrl
 * @description
 * # NetworkCtrl
 * Controller of the MonitoringClientApp
 */
angular.module('MonitoringClientApp')
  .controller('NetworkCtrl', function ($scope, WebSocketFactory) {
      WebSocketFactory.subscribe('net', function (value) {
        console.log('network', value);
        $scope.$apply(function () {
           $scope.value = value;
        });
      });
  });
