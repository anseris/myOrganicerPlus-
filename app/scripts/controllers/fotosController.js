'use strict';

/**
 * @ngdoc function
 * @name pruebaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pruebaApp
 */
angular.module('myEasyOrganicer')
  .controller('fotosCtrl',['$scope', '$mdDialog', 'fotosService', '$filter','$firebase', 'Lightbox', function ($scope, $mdDialog, fotosService, $filter, $firebase,Lightbox) {

        $scope.formatoIcons =true;
        $scope.formatoLista =false;
        $scope.fotoAgregada =false;


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
        $scope.comprobarInpFile= function(){
            var file=$('#file').get(0).files[0];
            if(file!==undefined){
                $scope.fotoAgregada = true;
            }
        }


        $scope.$watch($scope.comprobarInpFile);


        $scope.agregarFoto =function(){
            var idFoto = Math.floor((Math.random() * 10000) + 1);
            if($scope.fechaFoto===undefined){
                var fechaFoto = fechaActual;
            }
            else{
                var fechaFoto = $filter('date')($scope.fechaFoto,'dd-MM-yyyy');
            }
            // var fechaFoto = $filter('date')($scope.fechaFoto,'dd-MM-yyyy');
            var file=$('#file').get(0).files[0];
                var datosAEnviar= {
                    idFoto:idFoto,
                    idCarpeta: $scope.carpetas,
                    fechaIntroduccionFoto:fechaActual,
                    fechaFoto: fechaFoto,
                    tituloFoto:$scope.tituloFoto,
                    file:file,
                    chequeado:false
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

        $scope.fotos= [];
        $scope.verFoto = function (foto,index) {

            for (var a in foto.archivos) {
                $scope.fotos.push(foto.archivos[a].img);
            }
          Lightbox.openModal($scope.fotos, index);
        };

        $scope.eliminarCarpeta= function(carpeta){
            var claveCarpeta =carpeta.$id;
             fotosService.deleteCarpetas(claveCarpeta);
        }
        $scope.eliminarFoto= function(carpeta,  foto){
            var claveCarpeta =carpeta.$id;
            var idFoto =foto.idFoto;
            fotosService.deleteFotos(claveCarpeta, idFoto);
        }

        $scope.editarCarpeta= function(carpeta){
            $mdDialog.show({
                controller: 'mdlEditCarpetaCtrl',
                templateUrl: 'views/fotos/mdlEditarCarpeta.html',
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
        }

        $scope.editarFoto= function(carpeta, foto, carpetas){
            $mdDialog.show({
                controller: 'mdlEditFotoCtrl',
                templateUrl: 'views/fotos/mdlEditarFotos.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                resolve: {
                    carpeta: function() {
                        return carpeta;
                    },
                    foto: function() {
                        return foto;
                    },
                    carpetas: function() {
                        return carpetas;
                    }
                }
            }).then(function(answer) {


            }, function() {

            });
        }




  }]);



angular.module('myEasyOrganicer')
.controller('mdlListFotosCtrl', ['$scope', '$mdDialog',  'carpeta', 'Lightbox', 'fotosService', function($scope, $mdDialog, carpeta, Lightbox, fotosService) {
    console.log('carpeta', carpeta)
      // Recuperar datos
    $scope.carpetas= carpeta;
    $scope.fotos= [];
    $scope.verFoto = function (index) {
        for (var a in $scope.carpetas.archivos) {
            $scope.fotos.push($scope.carpetas.archivos[a].img);
        }
        Lightbox.openModal($scope.fotos, index);
    };

    $scope.eliminarFoto= function(carpeta,  foto){
        var claveCarpeta =carpeta.$id;
        var idFoto =foto.idFoto;
        fotosService.deleteFotos(claveCarpeta, idFoto);
    }

    $scope.eliminarVariasFotos= function(carpeta,fotos){
        var claveCarpeta =carpeta.$id;
        var fotos =fotos;
        fotosService.deleteVariasFotos(claveCarpeta, fotos);
    }

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

}]);


  angular.module('myEasyOrganicer')
  .controller('mdlEditCarpetaCtrl', ['$scope', '$mdDialog',  'carpeta', 'fotosService', '$filter', function($scope, $mdDialog, carpeta, fotosService, $filter) {

    $scope.carpeta=carpeta;

    var fechaActual= $filter('date')(new Date(),'dd-MM-yyyy');
    console.log('carpeta', carpeta.hola)

    $scope.actualizarCarpeta = function() {
        if($scope.carpeta.newFechaCarpeta===undefined){
            var fechaCarpeta = $scope.carpeta.fechaCarpeta;
        }
        else{
            var fechaCarpeta = $filter('date')($scope.carpeta.newFechaCarpeta,'dd-MM-yyyy');
        }
        var idCarpeta= $scope.carpeta.$id;

        var datosAEnviar= {
            idCarpeta: $scope.carpeta.idCarpeta,
            titulo:$scope.carpeta.titulo,
            fechaActual:fechaActual,
            fechaCarpeta:fechaCarpeta
        };

        fotosService.actualizarCarpeta(datosAEnviar, idCarpeta);
    };




    $scope.cancel = function() {
        $mdDialog.cancel();
    };

}]);


angular.module('myEasyOrganicer')
.controller('mdlEditFotoCtrl', ['$scope', '$mdDialog',  'carpeta', 'foto', 'carpetas', 'fotosService', '$filter', function($scope, $mdDialog, carpeta, foto, carpetas, fotosService, $filter) {

  $scope.carpeta=carpeta;
  $scope.foto=foto;
  $scope.carpetas=carpetas;

  console.log('carpeta', $scope.carpetas)

  var fechaActual= $filter('date')(new Date(),'dd-MM-yyyy');
  // console.log('carpeta', carpeta.hola)



  $scope.actualizarFoto =function(){
      if($scope.newFechaFoto===undefined){
          var fechaFoto = $scope.foto.fechaFoto;
      }
      else{
          var fechaFoto = $filter('date')($scope.newFechaFoto,'dd-MM-yyyy');
      }
      console.log('carpeta', $scope.carpeta)
      console.log('foto', $scope.foto.idFoto)
      var idFoto = $scope.foto.idFoto;
          var datosAEnviar= {
              idFoto:idFoto,
              idCarpeta: $scope.carpetasMdl,
              fechaIntroduccionFoto:fechaActual,
              fechaFoto: fechaFoto,
              tituloFoto:$scope.foto.tituloFoto,
              img:$scope.foto.img,
              chequeado:false
          };

          console.log('datosAEnviardddddd', $scope.foto.idFoto)
    if($scope.carpeta.$id=== $scope.carpetasMdl){
        fotosService.actualizarFoto(datosAEnviar, 'mismaCarpeta', $scope.carpeta.$id);
    }
    else{
        fotosService.actualizarFoto(datosAEnviar, 'otraCarpeta', $scope.carpeta.$id);
    }

  };


  $scope.cancel = function() {
      $mdDialog.cancel();
  };

}]);
