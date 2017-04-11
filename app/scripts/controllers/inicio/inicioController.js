'use strict';

angular.module('myEasyOrganicer')
.controller('inicioCtrl', ['$scope', '$location', 'menuSvc',  function ($scope, $location, menuSvc) {

    $scope.secciones= [
        {
            'nombreSeccion':'Fotos',
            'bgSection':'bgSectionFotos',
            'icono':'fa-camera-retro',
            'colorIcono':'colorMarron',
            'secion':'fotos'
        },
        {
            'nombreSeccion':'Videos',
            'bgSection':'bgSectionVideos',
            'icono':'fa-video-camera',
            'colorIcono':'colorMarron',
            'secion':'videos'
        },
        {
            'nombreSeccion':'Peliculas',
            'bgSection':'bgSectionPeliculas',
            'icono':'fa-film',
            'colorIcono':'colorMarron',
            'secion':'peliculas'
        }

    ]

    $scope.goTo= function(pagina){

        $location.path('/' + pagina)
        menuSvc.estadoMenuActivo.setEstadoMenu(pagina);
    }

}]);
