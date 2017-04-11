'use strict';

/**
* @ngdoc function
* @name pruebaApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the pruebaApp
*/
angular.module('myEasyOrganicer')
.controller('videosCtrl',['$scope', '$mdDialog', 'fotosService', '$filter','$firebase', 'Lightbox','$timeout', function ($scope, $mdDialog, fotosService, $filter, $firebase,Lightbox, $timeout) {

    $scope.formatoIcons =true;
    $scope.formatoLista =false;
    $scope.fotoAgregada =false;

    $scope.addCarpetaExpanded =false;
    $scope.addFotoExpanded =false;
    $scope.searchExpanded =false;

    // $scope.mensaje=false;


    $scope.expandedCarpeta= function(){
        $scope.addCarpetaExpanded =!$scope.addCarpetaExpanded;
        $scope.addFotoExpanded =false;
        $scope.searchExpanded =false;
    };

    $scope.expandedFoto= function(){
        $scope.addFotoExpanded =!$scope.addFotoExpanded;
        $scope.addCarpetaExpanded =false;
        $scope.searchExpanded =false;
    };
    $scope.expandedSearch= function(){
        $scope.searchExpanded =!$scope.searchExpanded;
        $scope.addCarpetaExpanded =false;
        $scope.addFotoExpanded =false;
    };








    // Recuperar datos
    //   $scope.loading= true;

    var datosRecuperados = function(datos) {
        $scope.carpetasFotos=datos;
        var fotos=($scope.carpetasFotos).length;
        $scope.loading=false;
        console.log('fotos', fotos);
    };


    var errorLLamada = function() {
        $scope.mensaje= {
            show:true,
            texto: 'Error al cargar las carpetas',
            classMsg: false
        };
        $scope.loading=false;
        $scope.$apply();
        $timeout(function(){
            $scope.mensaje= {
                show:false
            };
            $scope.$apply();
        },4000);
    };

    fotosService.recuperarCarpetas(datosRecuperados, errorLLamada);


    // añadir carpetas

    var fechaActual= $filter('date')(new Date(),'dd-MM-yyyy');

    var agregarCarpetaOK= function(form){
        $scope.mensaje= {
            show:true,
            texto: 'La carpeta se ha agregado correctamente',
            classMsg: true
        };
        $scope.loading=false;
        $scope.tituloCarpeta='';
        $scope.fechaCarpeta=''
        form.$setPristine();
        form.$setUntouched();
        $scope.$apply();
        $timeout(function(){
            $scope.mensaje= {
                show:false
            };
            $scope.$apply();
        },4000);
    }

    var agregarCarpetaKO= function(form){
        $scope.mensaje= {
            show:true,
            texto: 'Error al guardar la carpeta, vuelva a intentarlo',
            classMsg: false
        };
        $scope.loading=false;
        $scope.tituloCarpeta='';
        $scope.fechaCarpeta=''
        form.$setPristine();
        form.$setUntouched();
        $scope.$apply();
        $timeout(function(){
            $scope.mensaje= {
                show:false
            };
            $scope.$apply();
        },4000);
    }




    $scope.agregarCarpeta =function(form){
        var id=($scope.carpetasFotos).length + 1;
        var fechaCarpeta = $filter('date')($scope.fechaCarpeta,'dd-MM-yyyy');

        var datosAEnviar= {
            idCarpeta: id,
            titulo:$scope.tituloCarpeta,
            fechaActual:fechaActual,
            fechaCarpeta:fechaCarpeta,
            chequeado:false
        };
        $scope.loading=true;

        fotosService.addCarpeta(datosAEnviar, agregarCarpetaOK, agregarCarpetaKO, form);
    };

    var agregarFotoOK= function(form){
        $scope.mensaje= {
            show:true,
            texto: 'La foto se ha agregado correctamente',
            classMsg: true
        };
        $scope.loading=false;
        $scope.tituloFoto='';
        $scope.carpetas='';
        $scope.fechaFoto='';
        $scope.document=undefined;
        form.$setPristine();
        form.$setUntouched();
        $scope.$apply();
        $timeout(function(){
            $scope.mensaje= {
                show:false
            };
            $scope.$apply();
        },4000);
    }

    var agregarFotoKO= function(form){
        $scope.mensaje= {
            show:true,
            texto: 'Error al guardar la foto, vuelva a intentarlo',
            classMsg: false
        };
        $scope.loading=false;
        $scope.tituloFoto='';
        $scope.carpetas='';
        $scope.fechaFoto='';
        $scope.document=undefined;
        form.$setPristine();
        form.$setUntouched();
        $scope.$apply();
        $timeout(function(){
            $scope.mensaje= {
                show:false
            };
            $scope.$apply();
        },4000);
    }

    $scope.agregarFoto =function(form){
        var idFoto = Math.floor((Math.random() * 10000) + 1);
        if($scope.fechaFoto===undefined){
            var fechaFoto = fechaActual;
        }
        else{
            var fechaFoto = $filter('date')($scope.fechaFoto,'dd-MM-yyyy');
        }

        if($scope.tituloFoto===undefined || $scope.tituloFoto===''){
            var tituloFoto = 'foto' + idFoto;
        }
        else{
            var tituloFoto =$scope.tituloFoto;
        }
        var file=$('#file').get(0).files[0];
        var datosAEnviar= {
            idFoto:idFoto,
            idCarpeta: $scope.carpetas,
            fechaIntroduccionFoto:fechaActual,
            fechaFoto: fechaFoto,
            tituloFoto:tituloFoto,
            file:file,
            chequeado:false
        };
        $scope.loading=true;
        fotosService.addFoto(datosAEnviar, agregarFotoOK, agregarFotoKO, form);
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
            templateUrl: 'views/fotos/modales/mdlListFotos.html',
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

    var eliminarCarpetaOK= function(){
        $scope.mensaje= {
            show:true,
            texto: 'La carpeta se ha eliminado correctamente',
            classMsg: true
        };
        $scope.loading=false;
        $scope.$apply();
        $timeout(function(){
            $scope.mensaje= {
                show:false
            };
            $scope.$apply();
        },4000);
    }

    var eliminarCarpetaKO= function(){
        $scope.mensaje= {
            show:true,
            texto: 'ERROR al eliminar la carpeta, vuelva a intentar',
            classMsg: false
        };
        $scope.loading=false;
        $scope.$apply();
        $timeout(function(){
            $scope.mensaje= {
                show:false
            };
            $scope.$apply();
        },4000);
    }



    $scope.eliminarCarpeta= function(carpeta){
        var claveCarpeta =carpeta.$id;
        $scope.loading=true;
        fotosService.deleteCarpetas(claveCarpeta, eliminarCarpetaOK, eliminarCarpetaKO);
    }

    var eliminarVariasCarpetasOK= function(){
        $scope.mensaje= {
            show:true,
            texto: 'Se han eliminado las carpetas seleccionadas',
            classMsg: true
        };
        $scope.loading=false;
        $scope.formatoIcons=true;
        $scope.formatoLista=false;
        // $scope.carpeta.expanded=true;
        $scope.$apply();
        $timeout(function(){
            $scope.mensaje= {
                show:false
            };
            $scope.$apply();
        },4000);
    }

    var eliminarVariasCarpetasKO= function(){
        $scope.mensaje= {
            show:true,
            texto: 'ERROR al eliminar las carpetas, vuelva a intentar',
            classMsg: false
        };
        $scope.loading=false;
        // $scope.carpeta.expanded=true;
        $scope.$apply();
        $timeout(function(){
            $scope.mensaje= {
                show:false
            };
            $scope.$apply();
        },4000);
    }

    $scope.eliminarVariasCarpetas= function(carpeta){

        for (var a in carpeta) {
            if (carpeta[a].chequeado===true) {
                var carpeta =carpeta;
                $scope.loading=true;
                fotosService.deleteVariasCarpetas(carpeta, eliminarVariasCarpetasOK, eliminarVariasCarpetasKO);

            }
            else{
                $scope.formatoIcons=true;
                $scope.formatoLista=false;
                $scope.mensaje= {
                    show:true,
                    texto: 'Tiene que chequear alguna foto para poder eliminar',
                    classMsg: false
                };

                $timeout(function(){
                    $scope.mensaje= {
                        show:false
                    };
                },4000);
            }

        }

    }

    var eliminarFotoOK= function(){
        $scope.mensaje= {
            show:true,
            texto: 'La foto se ha eliminado correctamente',
            classMsg: true
        };
        $scope.loading=false;
        // $scope.carpeta.expanded=true;
        $scope.$apply();
        $timeout(function(){
            $scope.mensaje= {
                show:false
            };
            $scope.$apply();
        },4000);
    }

    var eliminarFotoKO= function(){
        $scope.mensaje= {
            show:true,
            texto: 'ERROR al eliminar la foto, vuelva a intentar',
            classMsg: false
        };
        $scope.loading=false;
        // $scope.carpeta.expanded=true;
        $scope.$apply();
        $timeout(function(){
            $scope.mensaje= {
                show:false
            };
            $scope.$apply();
        },4000);
    }

    $scope.eliminarFoto= function(carpeta,  foto){
        var claveCarpeta =carpeta.$id;
        var idFoto =foto.idFoto;
        $scope.loading=true;
        fotosService.deleteFotos(claveCarpeta, idFoto, eliminarFotoOK, eliminarFotoKO);
    }

    $scope.editarCarpeta= function(carpeta){
        $mdDialog.show({
            controller: 'mdlEditCarpetaCtrl',
            templateUrl: 'views/fotos/modales/mdlEditarCarpeta.html',
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
            templateUrl: 'views/fotos/modales/mdlEditarFotos.html',
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
