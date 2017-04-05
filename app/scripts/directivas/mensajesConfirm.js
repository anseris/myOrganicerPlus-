'use strict';

angular.module('ciberAppApp')
.directive('mensajesConfirm', ['$timeout',function ($timeout)
{
    return {
        restrict: 'AE',
        templateUrl: 'views/vistasDirectivas/mensajes.html',
        scope:{
           result:'=',
           classname: '='
       },
        link: function(scope){
          scope.$watch(function(){

            return scope.result;
          },function(v){
            if(v!==''){
              $timeout(function(){
                scope.result='';
              },4000);

            }
          });
        }
    };
}]);
