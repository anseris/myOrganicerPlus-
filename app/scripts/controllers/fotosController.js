'use strict';

/**
 * @ngdoc function
 * @name pruebaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pruebaApp
 */
angular.module('myEasyOrganicer')
  .controller('fotosCtrl',['$scope', '$mdDialog', '$firebase', function ($scope, $mdDialog, $firebase) {

        $scope.hola ='hola';

        $scope.abrirModalAdd = function() {
            $mdDialog.show({
                controller: 'mdlAddCtrl',
                templateUrl: 'views/fotos/mdlAdd.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                // resolve: {
                //     card: function() {
                //         return card;
                //     },
                //     client: function() {
                //         return client;
                //     }
                // }
            }).then(function(answer) {


            }, function() {

            })
        }


  }]);



  angular.module('myEasyOrganicer')
      .controller('mdlAddCtrl', ['$scope', '$mdDialog', '$firebase', '$firebaseArray', '$filter',  function($scope, $mdDialog, $firebase, $firebaseArray, $filter) {
    
        var db = firebase.database();
        var ref = db.ref("fotos/carpetas");
        $scope.carpetasFotos=$firebaseArray(ref);
        var fechaActual= $filter('date')(new Date(),'dd-MM-yyyy');
        //  var id= $scope.carpetasFotos ;
        $scope.agregarCarpeta =function(){
            var id=($scope.carpetasFotos).length + 1;

             console.log('$scope.fechaActual',fechaActual)
            // var usersRef = ref.child("carpetas");
                ref.push().set({

                    idCarpeta: id,
                    titulo:$scope.tituloCarpeta,
                    fechaActual:fechaActual

                });
                $scope.carpetasFotos=$firebaseArray(ref);


            };

          $scope.cancel = function() {
              $mdDialog.cancel();
          };

      }]);
