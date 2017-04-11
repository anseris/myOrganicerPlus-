'use strict';

/**
 * @ngdoc overview
 * @name pruebaApp
 * @description
 * # pruebaApp
 *
 * Main module of the application.
 */
angular
  .module('myEasyOrganicer', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'firebase',
    'bootstrapLightbox'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl:  'views/inicio.html',
        controller: 'inicioCtrl',
        controllerAs: 'inicio'
      })
      .when('/fotos', {
        templateUrl:  'views/fotos/fotos.html',
        controller: 'fotosCtrl',
        controllerAs: 'fotos'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
