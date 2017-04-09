angular.module('myEasyOrganicer')
.controller('mdlEditCarpetaCtrl', ['$scope', '$mdDialog',  'carpeta', 'fotosService', '$filter', '$timeout', function($scope, $mdDialog, carpeta, fotosService, $filter, $timeout) {

  $scope.carpeta=carpeta;

  var fechaActual= $filter('date')(new Date(),'dd-MM-yyyy');

  var actualizarCarpetaOK= function(form){
          $scope.mensaje= {
              show:true,
              texto: 'La carpeta se ha modificado correctamente',
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

  var actualizarCarpetaKO= function(form){
          $scope.mensaje= {
              show:true,
              texto: 'Error al modificar la carpeta, vuelva a intentarlo',
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

  $scope.actualizarCarpeta = function(form) {
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
      $scope.loading=true;

      fotosService.actualizarCarpeta(datosAEnviar, idCarpeta, actualizarCarpetaOK, actualizarCarpetaKO, form);
  };




  $scope.cancel = function() {
      $mdDialog.cancel();
  };

}]);
