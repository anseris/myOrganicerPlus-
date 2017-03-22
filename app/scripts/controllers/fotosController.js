'use strict';

/**
 * @ngdoc function
 * @name pruebaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pruebaApp
 */
angular.module('myEasyOrganicer')
  .controller('fotosCtrl',['$scope', '$mdDialog', '$firebase', function ($scope, $mdDialog, $firebase) {

        $scope.hola ='hola';

        $scope.abrirModalAdd = function() {
            $mdDialog.show({
                controller: 'mdlAddCtrl',
                templateUrl: 'views/fotos/mdlAdd.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                // resolve: {
                //     card: function() {
                //         return card;
                //     },
                //     client: function() {
                //         return client;
                //     }
                // }
            }).then(function(answer) {


            }, function() {

            })
        }


  }]);



  angular.module('myEasyOrganicer')
      .controller('mdlAddCtrl', ['$scope', '$mdDialog', '$firebase',  function($scope, $mdDialog, $firebase) {
          var refAnadirCarpetas= new Firebase('https://myorganicerplus.firebaseio.com/fotos');
        //   $scope.fotos=[];

          $scope.carpetasFotos= $firebase(refAnadirCarpetas);
          $scope.fechaActual= new Date();

          $scope.agregarCarpeta =function(){
              $scope.fechaActual= new Date();
              $scope.carpetasFotos.$add({idCarpeta: '1' ,titulo:$scope.textoNuevaTarea, fechaActual:$scope.fechaActual});
              $scope.textoNuevaTarea='';
          };

          $scope.cancel = function() {
              $mdDialog.cancel();
          };

      }]);
