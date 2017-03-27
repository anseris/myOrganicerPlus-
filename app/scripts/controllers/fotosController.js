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

        // $scope.abrirModalAdd = function() {
        //     $mdDialog.show({
        //         controller: 'mdlAddCtrl',
        //         templateUrl: 'views/fotos/mdlAdd.html',
        //         parent: angular.element(document.body),
        //         clickOutsideToClose: true,
        //         // resolve: {
        //         //     card: function() {
        //         //         return card;
        //         //     },
        //         //     client: function() {
        //         //         return client;
        //         //     }
        //         // }
        //     }).then(function(answer) {
        //
        //
        //     }, function() {
        //
        //     });
        // };






        // Recuperar datos
        //   $scope.loading= true;

        var datosRecuperados = function(datos) {
            $scope.carpetasFotos=datos;
            var fotos=($scope.carpetasFotos).length;
            console.log('fotos', fotos);
            //   $scope.loading= false;
        };
        $scope.holad =function(){
            var fotos=$scope.carpetasFotos;
            console.log('fotos', fotos);
            for(var h in fotos){
                if(fotos[h].fotos!== undefined){
                    $scope.fotos= fotos[h].fotos;
                }
                var fotosH= fotos[h];
            }
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


  }]);



  // angular.module('myEasyOrganicer')
  // .controller('mdlAddCtrl', ['$scope', '$mdDialog', '$firebase', 'fotosService', '$filter',  function($scope, $mdDialog, $firebase, fotosService, $filter) {
  //
  //     // Recuperar datos
  //     //   $scope.loading= true;
  //
  //     var datosRecuperados = function(datos) {
  //         $scope.carpetasFotos=datos;
  //         //   $scope.loading= false;
  //     };
  //     var errorLLamada = function() {
  //     };
  //
  //     fotosService.recuperarCarpetas(datosRecuperados, errorLLamada);
  //
  //     // añadir carpetas
  //
  //     var fechaActual= $filter('date')(new Date(),'dd-MM-yyyy');
  //
  //     // var datosAddOk = function(datos) {
  //     //     $scope.carpetasFotos=datos;
  //     // };
  //
  //     $scope.agregarCarpeta =function(){
  //         var id=($scope.carpetasFotos).length + 1;
  //
  //         var datosAEnviar= {
  //             idCarpeta: id,
  //             titulo:$scope.tituloCarpeta,
  //             fechaActual:fechaActual
  //         }
  //
  //         fotosService.addCarpeta(datosAEnviar);
  //     };
  //
  //     $scope.agregarFoto =function(){
  //       //   var id=($scope.carpetasFotos).length + 1;
  //
  //         var datosAEnviar= {
  //             idFoto: $scope.carpetas,
  //             titulo:$scope.tituloFoto,
  //             nombreFila:$scope.hola
  //         }
  //         console.log('datosAEnviar', datosAEnviar)
  //       //   fotosService.addFoto(datosAEnviar);
  //
  //       //   fotosService.addCarpeta(datosAEnviar);
  //     };
  //     $scope.$watch('files.length',function(newVal,oldVal){
  //           console.log($scope.files);
  //       });
  //
  //     $scope.cancel = function() {
  //         $mdDialog.cancel();
  //     };
  //
  // }]);
