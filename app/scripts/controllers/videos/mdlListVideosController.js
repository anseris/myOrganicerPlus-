angular.module('myEasyOrganicer')
.controller('mdlListVideosCtrl', ['$scope', '$mdDialog',  'carpeta', 'Lightbox', 'videosService',  '$timeout', '$window', function($scope, $mdDialog, carpeta, Lightbox, videosService,  $timeout, $window) {

    $scope.carpetas= carpeta;
    $scope.Lightbox= Lightbox;
    $scope.verVideo = function (video, index) {
        $window.open(video.url, '_blank', 'toolbar=no,scrollbars=no,resizable=yes,top=0,left=0,width=750,height=600');
    };

    var eliminarVideoOK= function(){
        $scope.mensaje= {
            show:true,
            texto: 'El video se ha eliminado correctamente',
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
            texto: 'ERROR al eliminar el video, vuelva a intentar',
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

    $scope.eliminarVideo= function(carpeta,  video){
        var claveCarpeta =carpeta.$id;
        var idVideo =video.idVideo;
        $scope.loading=true;
        videosService.deleteVideo(claveCarpeta, idVideo, eliminarVideoOK, eliminarVideoKO);
    }

    var eliminarVariosVideosOK= function(){
        $scope.mensaje= {
            show:true,
            texto: 'Los videos se han eliminado correctamente',
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
            texto: 'ERROR al eliminar los videos, vuelva a intentar',
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
        var videos =videos;
        $scope.loading=true;
        videosService.deleteVariasVideos(claveCarpeta, videos, eliminarVariosVideosOK, eliminarVariosVideosKO);
    }

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

}]);
