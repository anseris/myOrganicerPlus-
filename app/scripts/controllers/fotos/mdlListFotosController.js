angular.module('myEasyOrganicer')
.controller('mdlListFotosCtrl', ['$scope', '$mdDialog',  'carpeta', 'Lightbox', 'fotosService',  '$timeout', function($scope, $mdDialog, carpeta, Lightbox, fotosService,  $timeout) {
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

    var eliminarVariasFotosOK= function(){
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

    var eliminarVariasFotosKO= function(){
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

    $scope.eliminarVariasFotos= function(carpeta,fotos){
        var claveCarpeta =carpeta.$id;
        var fotos =fotos;
        $scope.loading=true;
        fotosService.deleteVariasFotos(claveCarpeta, fotos, eliminarVariasFotosOK, eliminarVariasFotosKO);
    }

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

}]);


 
