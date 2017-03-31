'use strict';

/**
 * @ngdoc function
 * @name pruebaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pruebaApp
 */
angular.module('myEasyOrganicer')
  .controller('fotosCtrl',['$scope', '$mdDialog', 'fotosService', '$filter','$firebase', function ($scope, $mdDialog, fotosService, $filter, $firebase) {

        $scope.formatoIcons =true;
        $scope.formatoLista =false;

        // var database = firebase.database().ref("fotos/carpetas");
        var storage;
        storage = firebase.storage().ref("images");








        // Recuperar datos
        //   $scope.loading= true;

        var datosRecuperados = function(datos) {
            $scope.carpetasFotos=datos;
            var fotos=($scope.carpetasFotos).length;
            console.log('fotos', fotos);
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
            var fechaCarpeta = $filter('date')($scope.fechaCarpeta,'dd-MM-yyyy');

            var datosAEnviar= {
                idCarpeta: id,
                titulo:$scope.tituloCarpeta,
                fechaActual:fechaActual,
                fechaCarpeta:fechaCarpeta
            };

            fotosService.addCarpeta(datosAEnviar);
        };
        // $scope.holad =function(){
        //     var file=$('#file').get(0).files[0];
        //
        //     storage.child(file.name).put(file).then(function(){
        //         storage.child(file.name).getDownloadURL().then(function(url){
        //             database.push({
        //                 img:url
        //             })
        //         })
        //     })
        // };

        $scope.agregarFoto =function(){

            var fechaFoto = $filter('date')($scope.fechaFoto,'dd-MM-yyyy');
            console.log('fecha',fechaFoto);
            var file=$('#file').get(0).files[0];
                var datosAEnviar= {
                    idCarpeta: $scope.carpetas,
                    fechaIntroduccionFoto:fechaActual,
                    fechaFoto: fechaFoto,
                    tituloFoto:$scope.tituloFoto,
                    file:file
                };
            fotosService.addFoto(datosAEnviar);
        };

        $scope.formatoIconsFunc = function() {
            $scope.formatoIcons =true;
            $scope.formatoLista =false;
        };

        $scope.formatoListaFunc = function() {
            $scope.formatoIcons =false;
            $scope.formatoLista =true;
        };

         $scope.mostarModalFotos = function(carpeta) {
            $mdDialog.show({
                controller: 'mdlListFotosCtrl',
                templateUrl: 'views/fotos/mdlListFotos.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                resolve: {
                    carpeta: function() {
                        return carpeta;
                    }
                }
            }).then(function(answer) {


            }, function() {

            });
        };


  }]);



  angular.module('myEasyOrganicer')
  .controller('mdlListFotosCtrl', ['$scope', '$mdDialog',  'carpeta',   function($scope, $mdDialog, carpeta) {
      console.log('carpeta', carpeta)
      // Recuperar datos
      $scope.carpetas= carpeta;

      $scope.verFoto = function(foto) {
         $mdDialog.show({
             controller: 'mdlVerFotosCtrl',
             templateUrl: 'views/fotos/mdlVerFotos.html',
             parent: angular.element(document.body),
             clickOutsideToClose: true,
             resolve: {
                 carpeta: function() {
                     return $scope.carpetas;
                 },
                 foto: function() {
                     return foto;
                 }
             }
         }).then(function(answer) {


         }, function() {

         });
     };



      $scope.cancel = function() {
          $mdDialog.cancel();
      };

  }]);


  angular.module('myEasyOrganicer')
  .controller('mdlVerFotosCtrl', ['$scope', '$mdDialog',  'carpeta', 'foto', function($scope, $mdDialog, carpeta, foto) {
      console.log('carpeta', carpeta)
      // Recuperar datos
      $scope.carpetas= carpeta;
      $scope.foto= foto;



      $scope.cancel = function() {
          $mdDialog.cancel();
      };

  }]);
