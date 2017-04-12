angular.module('myEasyOrganicer')
.controller('mdlListVideosCtrl', ['$scope', '$mdDialog',  'carpeta', 'Lightbox', 'fotosService',  '$timeout', '$window', function($scope, $mdDialog, carpeta, Lightbox, fotosService,  $timeout, $window) {
    console.log('carpeta', carpeta)
    // Recuperar datos
    $scope.carpetas= carpeta;
    $scope.Lightbox= Lightbox;
    $scope.videos= [];
    $scope.verVideo = function (video, index) {
        console.log('video', video)
        console.log('index', index)
        $window.open(video.url, '_blank');
        // for (var a in $scope.carpetas.archivos) {
        //     $scope.videos.push($scope.carpetas.archivos[a].img);
        //
        // }
        // var videol={
        //     'type':'video',
        //     'url':video.url
        // }
        // console.log('videoLLLL', videol)
        // Lightbox.openModal(videol.url);
    };

    var eliminarVideoOK= function(){
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

    var eliminarVideoKO= function(){
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

    $scope.eliminarVideo= function(carpeta,  foto){
        var claveCarpeta =carpeta.$id;
        var idFoto =foto.idFoto;
        $scope.loading=true;
        fotosService.deleteFotos(claveCarpeta, idFoto, eliminarVideoOK, eliminarVideoKO);
    }

    var eliminarVariosVideosOK= function(){
        $scope.mensaje= {
            show:true,
            texto: 'Las fotos se han eliminado correctamente',
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

    var eliminarVariosVideosKO= function(){
        $scope.mensaje= {
            show:true,
            texto: 'ERROR al eliminar las fotos, vuelva a intentar',
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

    $scope.eliminarVariosVideos= function(carpeta,videos){
        var claveCarpeta =carpeta.$id;
        var fotos =fotos;
        $scope.loading=true;
        fotosService.deleteVariasFotos(claveCarpeta, fotos, eliminarVariosVideosOK, eliminarVariosVideosKO);
    }

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

}]);
