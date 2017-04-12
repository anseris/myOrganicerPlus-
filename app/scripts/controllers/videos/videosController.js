'use strict';

/**
* @ngdoc function
* @name pruebaApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the pruebaApp
*/
angular.module('myEasyOrganicer')
.controller('videosCtrl',['$scope', '$mdDialog', 'videosService', '$filter','$firebase', 'Lightbox','$timeout', function ($scope, $mdDialog, videosService, $filter, $firebase,Lightbox, $timeout) {

    $scope.formatoIcons =true;
    $scope.formatoLista =false;
    $scope.fotoAgregada =false;

    $scope.formatoIconsFunc = function() {
        $scope.formatoIcons =true;
        $scope.formatoLista =false;
    };

    $scope.formatoListaFunc = function() {
        $scope.formatoIcons =false;
        $scope.formatoLista =true;
    };

    $scope.addCarpetaExpanded =false;
    $scope.addVideoExpanded =false;
    $scope.searchExpanded =false;

    $scope.expandedCarpeta= function(){
        $scope.addCarpetaExpanded =!$scope.addCarpetaExpanded;
        $scope.addVideoExpanded =false;
        $scope.searchExpanded =false;
    };

    $scope.expandedVideo= function(){
        $scope.addVideoExpanded =!$scope.addVideoExpanded;
        $scope.addCarpetaExpanded =false;
        $scope.searchExpanded =false;
    };
    $scope.expandedSearch= function(){
        $scope.searchExpanded =!$scope.searchExpanded;
        $scope.addCarpetaExpanded =false;
        $scope.addVideoExpanded =false;
    };
    // Recuperar datos

    var datosRecuperados = function(datos) {
        $scope.carpetasVideos=datos;
        var fotos=($scope.carpetasVideos).length;
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

    videosService.recuperarCarpetas(datosRecuperados, errorLLamada);


    // añadir carpetas

    var fechaActual= $filter('date')(new Date(),'dd-MM-yyyy');

    var agregarCarpetaVidOK= function(form){
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

    var agregarCarpetaVidKO= function(form){
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


    $scope.agregarCarpetaVid =function(form){
        var id=($scope.carpetasVideos).length + 1;
        var fechaCarpeta = $filter('date')($scope.fechaCarpeta,'dd-MM-yyyy');

        var datosAEnviar= {
            idCarpeta: id,
            titulo:$scope.tituloCarpeta,
            fechaActual:fechaActual,
            fechaCarpeta:fechaCarpeta,
            chequeado:false
        };
        $scope.loading=true;

        videosService.addCarpeta(datosAEnviar, agregarCarpetaVidOK, agregarCarpetaVidKO, form);
    };


    // añadir Videos
    var agregarVideoOK= function(form){
        $scope.mensaje= {
            show:true,
            texto: 'La foto se ha agregado correctamente',
            classMsg: true
        };
        $scope.loading=false;
        $scope.tituloVideo='';
        $scope.carpetas='';
        $scope.fechaVideo='';
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

    var agregarVideoKO= function(form){
        $scope.mensaje= {
            show:true,
            texto: 'Error al guardar la foto, vuelva a intentarlo',
            classMsg: false
        };
        $scope.loading=false;
        $scope.tituloVideo='';
        $scope.carpetas='';
        $scope.fechaVideo='';
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

    $scope.agregarVideo =function(form){
        var idVideo = Math.floor((Math.random() * 10000) + 1);
        if($scope.fechaVideo===undefined){
            var fechaVideo = fechaActual;
        }
        else{
            var fechaVideo = $filter('date')($scope.fechaVideo,'dd-MM-yyyy');
        }

        if($scope.tituloVideo===undefined || $scope.fechaVideo===''){
            var tituloVideo = 'video' + idVideo;
        }
        else{
            var tituloVideo =$scope.tituloVideo;
        }
        var file=$('#file').get(0).files[0];
        var datosAEnviar= {
            idVideo:idVideo,
            idCarpeta: $scope.carpetas,
            fechaIntroduccionVideo:fechaActual,
            tituloVideo: tituloVideo,
            fechaVideo:fechaVideo,
            file:file,
            chequeado:false
        };
        console.log('datosAEnviar', datosAEnviar)
        $scope.loading=true;
        videosService.addVideo(datosAEnviar, agregarVideoKO, agregarVideoKO, form);
    };


    $scope.mostarModalVideos = function(carpeta) {
        console.log('carpeta', carpeta)
        $mdDialog.show({
            controller: 'mdlListVideosCtrl',
            templateUrl: 'views/videos/modales/mdlListVideos.html',
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
        videosService.deleteCarpetas(claveCarpeta, eliminarCarpetaOK, eliminarCarpetaKO);
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
                videosService.deleteVariasCarpetas(carpeta, eliminarVariasCarpetasOK, eliminarVariasCarpetasKO);

            }
            else{
                $scope.formatoIcons=true;
                $scope.formatoLista=false;
                $scope.mensaje= {
                    show:true,
                    texto: 'Tiene que chequear alguna carpeta para poder eliminar',
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
        videosService.deleteFotos(claveCarpeta, idFoto, eliminarFotoOK, eliminarFotoKO);
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
