'use strict';

angular.module('myEasyOrganicer').factory('menuSvc', ['$firebase', '$firebaseArray',  function($firebase, $firebaseArray) {

    var modelParams = {

      estadoMenu : 'inicio'

    };

    var estadoMenuActivo= {

        getEstadoMenu: function (){
            return modelParams.estadoMenu;
        },
        setEstadoMenu: function(newEstadoMenu) {

            modelParams.estadoMenu = newEstadoMenu;
        }
    };
    console.log('newEstadoMenu', estadoMenuActivo.getEstadoMenu())

    //
    // var estadoMenu = function(pagina) {
    //     return pagina
    //     // $scope.currentNavItem='inicio'
    // }



    return {
        modelParams:modelParams,
        estadoMenuActivo:estadoMenuActivo

    };
}]);
