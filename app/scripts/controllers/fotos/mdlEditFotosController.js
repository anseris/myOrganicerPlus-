angular.module('myEasyOrganicer')
.controller('mdlEditFotoCtrl', ['$scope', '$mdDialog',  'carpeta', 'foto', 'carpetas', 'fotosService', '$filter', '$timeout', function($scope, $mdDialog, carpeta, foto, carpetas, fotosService, $filter, $timeout) {

  $scope.carpeta=carpeta;
  $scope.foto=foto;
  $scope.carpetas=carpetas;

  console.log('carpeta', $scope.carpetas)

  var fechaActual= $filter('date')(new Date(),'dd-MM-yyyy');
  // console.log('carpeta', carpeta.hola)


  var actualizarFotoOK= function(form){
          $scope.mensaje= {
              show:true,
              texto: 'La foto se ha modificado correctamente',
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
          $mdDialog.cancel();
      },4000);

  }

  var actualizarFotoKO= function(form){
          $scope.mensaje= {
              show:true,
              texto: 'Error al modificar la foto, vuelva a intentarlo',
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
          $mdDialog.cancel();
      },4000);

  }
  $scope.actualizarFoto =function(form){
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
          $scope.loading=false;
    if($scope.carpeta.$id=== $scope.carpetasMdl){
        fotosService.actualizarFoto(datosAEnviar, 'mismaCarpeta', $scope.carpeta.$id, actualizarFotoOK, actualizarFotoKO, form);
    }
    else{
        fotosService.actualizarFoto(datosAEnviar, 'otraCarpeta', $scope.carpeta.$id , actualizarFotoOK, actualizarFotoKO, form);
    }

  };


  $scope.cancel = function() {
      $mdDialog.cancel();
  };

}]);
