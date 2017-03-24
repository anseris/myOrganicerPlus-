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

            });
        };


  }]);



  angular.module('myEasyOrganicer')
  .controller('mdlAddCtrl', ['$scope', '$mdDialog', '$firebase', 'fotosService', '$filter',  function($scope, $mdDialog, $firebase, fotosService, $filter) {

      // Recuperar datos
      //   $scope.loading= true;

      var datosRecuperados = function(datos) {
          $scope.carpetasFotos=datos;
          //   $scope.loading= false;
      };
      var errorLLamada = function() {
      };

      fotosService.recuperarCarpetas(datosRecuperados, errorLLamada);

      // añadir carpetas

      var fechaActual= $filter('date')(new Date(),'dd-MM-yyyy');

      // var datosAddOk = function(datos) {
      //     $scope.carpetasFotos=datos;
      // };

      $scope.agregarCarpeta =function(){
          var id=($scope.carpetasFotos).length + 1;

          var datosAEnviar= {
              idCarpeta: id,
              titulo:$scope.tituloCarpeta,
              fechaActual:fechaActual
          }

          fotosService.addCarpeta(datosAEnviar);
      };

      $scope.agregarFoto =function(){
        //   var id=($scope.carpetasFotos).length + 1;

          var datosAEnviar= {
              idFoto: $scope.carpetas,
              titulo:$scope.tituloFoto
          }
          console.log('datosAEnviar', datosAEnviar)
          fotosService.addFoto(datosAEnviar);

        //   fotosService.addCarpeta(datosAEnviar);
      };

      $scope.cancel = function() {
          $mdDialog.cancel();
      };

  }]);
