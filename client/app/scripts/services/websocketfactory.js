'use strict';

/**
 * @ngdoc service
 * @name MonitoringClientApp.websocketFactory
 * @description
 * # websocketFactory
 * Factory in the MonitoringClientApp.
 */
angular.module('MonitoringClientApp')
  .factory('WebSocketFactory', function () {
        var service = {};
        service.callbacks = {}; //note the object declaration, not Array
        service.connect = function() {
            if(service.ws) {
              return;
            }
            var ws = new WebSocket('ws://localhost:3000/ws');
            ws.onmessage = function (message) {
                var data = angular.fromJson(message.data);
                console.log(data);
                if( 'monitors' in data ) {
                    angular.forEach(data.monitors, function(monitor){
                         service.callbacks[monitor.to](monitor.data);
                    });
                } else {
                    angular.forEach(service.callbacks, function(callback){
                        callback(data);
                    });
                }
            };
            service.ws = ws;
        };

        service.send = function(message) {
            service.ws.send(message);
        };

        service.subscribe = function(concernedScopeId, callback) {
          service.callbacks[concernedScopeId] = callback;
        };

        service.unsubscribe = function(concernedScopeId) {
          delete service.callbacks[concernedScopeId];
        };

        return service;
});
