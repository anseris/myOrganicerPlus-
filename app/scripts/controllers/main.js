'use strict';

/**
 * @ngdoc function
 * @name pruebaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pruebaApp
 */
angular.module('myEasyOrganicer')
  .controller('MainCtrl', function ($scope, $firebase) {



// var refTareas = firebase.database();
// var ref = refTareas.ref('https://myorganicerplus.firebaseio.com/');
// console.log(refTareas)
    //   var refTareas= new Firebase('https://myorganicerplus.firebaseio.com/fotos');

        // $scope.tareas =ref;
        $scope.agregarTarea =function(){
          firebase.database().ref('myorganicerplus/').set({
            texto: $scope.textoNuevaTarea,
            hecho: false
          });
          $scope.textoNuevaTarea='';
        }

        // $scope.agregarTarea =function(){
        //     $scope.tareas.$add({texto:$scope.textoNuevaTarea, hecho:false});
        //     $scope.textoNuevaTarea='';
        // };

        $scope.restantes =function(){
            var cuenta = 0;
            angular.forEach($scope.tareas, function(tarea){
                cuenta += tarea.hecho ? 0 : 1;
            });
            return cuenta;
        };

        $scope.eliminar =function(){
            var tareasViejas= $scope.tareas;
            $scope.tareas= [];
            angular.forEach(tareasViejas, function(tarea){
                if(!tarea.hecho){
                    $scope.tareas.push(tarea)
                }
            });
        };

  });
