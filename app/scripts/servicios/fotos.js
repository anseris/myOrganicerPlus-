'use strict';

angular.module('myEasyOrganicer').factory('fotosService', ['$firebase', '$firebaseArray', '$filter', function($firebase, $firebaseArray, $filter) {


    var db = firebase.database();

        var refCarpeta = db.ref("fotos/carpetas");
        // var refFoto = db.ref("fotos/carpetas/" + idFoto);
        var listacarpetasFotos=$firebaseArray(refCarpeta);

    var recuperarCarpetas = function(callback, callbackError) {
        if(listacarpetasFotos===undefined){
            callbackError();
        }
        else{
            callback(listacarpetasFotos);
        }


    };


    var addCarpeta = function(datosAdded) {
        refCarpeta.push().set(datosAdded);
        // callback(listacarpetasFotos)


    };
    var addFoto = function(datosAdded) {
        var idFotoA= datosAdded.idFoto
        var refFoto = db.ref("fotos/carpetas/" + idFotoA);
        refFoto.push().set(datosAdded);
    };








    return {
        addCarpeta: addCarpeta,
        recuperarCarpetas:recuperarCarpetas,
        addFoto:addFoto

    };
}]);
