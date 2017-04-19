angular.module('myEasyOrganicer')
.controller('mdlEditVideosCtrl', ['$scope', '$mdDialog',  'carpeta', 'video', 'carpetas', 'videosService', '$filter', '$timeout', function($scope, $mdDialog, carpeta, video, carpetas, videosService, $filter, $timeout) {

    $scope.carpeta=carpeta;
    $scope.video=video;
    $scope.carpetas=carpetas;

    console.log('carpeta', $scope.carpetas)

    var fechaActual= $filter('date')(new Date(),'dd-MM-yyyy');
    // console.log('carpeta', carpeta.hola)


    var actualizarVideoOK= function(form){
        $scope.mensaje= {
            show:true,
            texto: 'El video se ha modificado correctamente',
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
            $mdDialog.cancel();
        },4000);

    }

    var actualizarVideoKO= function(form){
        $scope.mensaje= {
            show:true,
            texto: 'Error al modificar el video, vuelva a intentarlo',
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
            $mdDialog.cancel();
        },4000);

    }
    $scope.actualizarVideo =function(form){
        if($scope.newFechaVideo===undefined){
            var fechaVideo = $scope.video.fechaVideo;
        }
        else{
            var fechaVideo = $filter('date')($scope.newFechaVideo,'dd-MM-yyyy');
        }
        console.log('carpeta', $scope.carpeta)
        console.log('video', $scope.video.idVideo)
        var idVideo = $scope.video.idVideo;
        var datosAEnviar= {
            idVideo:idVideo,
            idCarpeta: $scope.carpetasMdl,
            fechaIntroduccionVideo:fechaActual,
            fechaVideo: fechaVideo,
            tituloVideo:$scope.video.tituloVideo,
            url:$scope.video.url,
            chequeado:false
        };

        console.log('datosAEnviardddddd', $scope.video.idVideo)
        $scope.loading=false;
        if($scope.carpeta.$id=== $scope.carpetasMdl){
            videosService.actualizarVideo(datosAEnviar, 'mismaCarpeta', $scope.carpeta.$id, actualizarVideoOK, actualizarVideoKO, form);
        }
        else{
            videosService.actualizarVideo(datosAEnviar, 'otraCarpeta', $scope.carpeta.$id , actualizarVideoOK, actualizarVideoKO, form);
        }

    };


    $scope.cancel = function() {
        $mdDialog.cancel();
    };

}]);
