'use strict';

angular.module('myEasyOrganicer')
.controller('menuCtrl', ['$scope', '$location', 'menuSvc', function ($scope, $location, menuSvc) {




    $scope.currentNavItem= menuSvc.estadoMenuActivo;

    // $scope.header = baseModel.header.user.getUserData();
    // console.log('$scope.currentNavItem', $scope.currentNavItem)

     $location.path('/');

    $scope.goTo= function(pagina){
        console.log('$scope.currentNavItem', $scope.currentNavItem)
        $location.path('/' + pagina);
        menuSvc.estadoMenuActivo.setEstadoMenu(pagina);
    }




}]);

//Try no more than 100 lines
