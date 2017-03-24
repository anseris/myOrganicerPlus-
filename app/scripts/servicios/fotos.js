'use strict';

angular.module('myEasyOrganicer').factory('fotosService', ['$firebase', '$firebaseArray', '$filter', function($firebase, $firebaseArray, $filter) {


    var db = firebase.database();

        var ref = db.ref("fotos/carpetas");
        var listacarpetasFotos=$firebaseArray(ref);

    var recuperarCarpetas = function(callback, callbackError) {
        if(listacarpetasFotos===undefined){
            callbackError();
        }
        else{
            callback(listacarpetasFotos);
        }


    };


    var addCarpeta = function(datosAdded) {
        ref.push().set(datosAdded);
        // callback(listacarpetasFotos)


    };








    return {
        addCarpeta: addCarpeta,
        recuperarCarpetas:recuperarCarpetas

    };
}]);
