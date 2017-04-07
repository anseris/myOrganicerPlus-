'use strict';

angular.module('myEasyOrganicer')
.directive('mensajesConfirm', ['$timeout',function ($timeout)
{
    return {
        restrict: 'AE',
        templateUrl: 'views/vistasDirectivas/mensaje.html',
        scope:{
           result:'=',
           classname: '='
       },
        link: function(scope){
            console.log('HHHHHHHHH');
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
