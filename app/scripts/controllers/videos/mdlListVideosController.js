angular.module('myEasyOrganicer')
.controller('mdlListVideosCtrl', ['$scope', '$mdDialog',  'carpeta', 'Lightbox', 'fotosService',  '$timeout', '$window', function($scope, $mdDialog, carpeta, Lightbox, fotosService,  $timeout, $window) {
    console.log('carpeta', carpeta)

    $scope.images = [
    {
      'type': 'video',
      'url': 'https://firebasestorage.googleapis.com/v0/b/myorganicerplus.appspot.com/o/videos%2F20160517_194919.mp4?alt=media&token=9dfb463b-e947-4a32-96a1-b446185a21af',
      'thumbUrl': 'https://i.ytimg.com/vi/N7TkK2joi4I/1.jpg'
    },
    {
        'type': 'video',
      'url': '"https://firebasestorage.googleapis.com/v0/b/myorganicerplus.appspot.com/o/videos%2F20151101_163702.mp4?alt=media&token=aac4beee-b56c-47ab-9c1f-1e3f8f8ff628',
      'thumbUrl': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Kamp_Alexisdorf_3.jpg/120px-Kamp_Alexisdorf_3.jpg'
    },
    {
      'type': 'video',
      'url': 'https://www.youtube.com/watch?v=01Sco8pxjpQ',
      'thumbUrl': 'https://i.ytimg.com/vi/khrAhOrSZQc/1.jpg'
    }
  ];
   $scope.Lightbox = Lightbox;
    // Recuperar datos
    $scope.carpetas= carpeta;
    $scope.Lightbox= Lightbox;
    $scope.videos= [];
    $scope.verVideo = function (video, index) {
        console.log('video', video)
        console.log('index', index)
        // $window.open(video.url, '_blank');
        // for (var a in $scope.carpetas.archivos) {
        //     $scope.videos.push($scope.carpetas.archivos[a].img);
        //
        // }
        var videol={
            'type':'video',
            'url':video.url
        }
        console.log('videoLLLL', videol)
        Lightbox.openModal(videol.url);
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
