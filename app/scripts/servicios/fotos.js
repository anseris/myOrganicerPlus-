'use strict';

angular.module('myEasyOrganicer').factory('fotosService', ['$firebase', '$firebaseArray',  function($firebase, $firebaseArray) {


    var db = firebase.database();

        var ref = db.ref("fotos/carpetas");
        // var refFotos = db.ref("fotos/carpetas/fotos");
        var storage = firebase.storage().ref("images");
        // var refFoto = db.ref("fotos/carpetas/" + idFoto);
        var listacarpetasFotos=$firebaseArray(ref);
        // var listacarpetasFotos=$firebaseArray(ref);

        // var refFoto = firebase.database().ref().child('fotos/carpetas');
        //
        // var listaFotos = $firebaseArray(refFoto);

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
    };

    var addFoto = function(datosAdded) {
        console.log('datosAdded', datosAdded)

        var file= datosAdded.file;
        var idFotoA= datosAdded.idCarpeta;
        var refFoto = db.ref("fotos/carpetas/" + idFotoA + "/fotos");
        // var listacarpetasFotos=$firebaseArray(ref);

        storage.child(file.name).put(file).then(function(){
            storage.child(file.name).getDownloadURL().then(function(url){
                refFoto.push({
                    idCarpeta: datosAdded.idCarpeta,
                    fechaIntroduccionFoto:datosAdded.fechaIntroduccionFoto,
                    fechaFoto: datosAdded.fechaFoto,
                    tituloFoto:datosAdded.tituloFoto,
                    img:url
                });
            });
        });
    };








    return {
        addCarpeta: addCarpeta,
        recuperarCarpetas:recuperarCarpetas,
        addFoto:addFoto

    };
}]);
