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



    var actualizarCarpeta = function(datosAdded, idCarpeta) {
        var refActCarp = db.ref("fotos/carpetas/" + idCarpeta);
        refActCarp.update(datosAdded);
    };

    var addFoto = function(datosAdded) {
        console.log('datosAdded', datosAdded)

        var file= datosAdded.file;
        var idFotoA= datosAdded.idCarpeta;
        var refFoto = db.ref("fotos/carpetas/" + idFotoA + "/archivos");
        // var listacarpetasFotos=$firebaseArray(ref);

        storage.child(file.name).put(file).then(function(){
            storage.child(file.name).getDownloadURL().then(function(url){
                refFoto.push({
                    idFoto:datosAdded.idFoto,
                    idCarpeta: datosAdded.idCarpeta,
                    fechaIntroduccionFoto:datosAdded.fechaIntroduccionFoto,
                    fechaFoto: datosAdded.fechaFoto,
                    tituloFoto:datosAdded.tituloFoto,
                    img:url,
                    chequeado:datosAdded.chequeado
                });
            });
        });
    };

    var deleteCarpetas = function(idCarpeta){
        var deleteCarpeta = db.ref("fotos/carpetas/" + idCarpeta);
        deleteCarpeta.remove();

    };

    var deleteFotos = function(idCarpeta, idFoto){
        var refArchivos = db.ref("fotos/carpetas/" + idCarpeta + "/archivos/");
        var archivos={};
        refArchivos.on('value',function(datos){
        	archivos=datos.val();
            angular.forEach(archivos, function(indice,valor) {

                if(indice.idFoto===idFoto){
                    var idFotoUni=valor;
                    var deleteFoto = db.ref("fotos/carpetas/" + idCarpeta + "/archivos/"+ idFotoUni);
                    deleteFoto.remove();
                }
            });
        });
    }

    var deleteVariasFotos = function(idCarpeta, fotos){
        var refArchivos = db.ref("fotos/carpetas/" + idCarpeta + "/archivos/");
        for (var a in fotos) {
            if (fotos[a].chequeado===true) {
                var idFoto=fotos[a].idFoto;
                console.log('idFoto',idFoto);
                var archivos={};
                refArchivos.on('value',function(datos){
                	archivos=datos.val();
                    angular.forEach(archivos, function(indice,valor) {

                        if(indice.idFoto===idFoto){
                            var idFotoUni=valor;
                            var deleteFoto = db.ref("fotos/carpetas/" + idCarpeta + "/archivos/"+ idFotoUni);
                            deleteFoto.remove();
                        }
                    });
                });

            }
        }



    }



    return {
        addCarpeta: addCarpeta,
        recuperarCarpetas:recuperarCarpetas,
        addFoto:addFoto,
        deleteCarpetas:deleteCarpetas,
        deleteFotos:deleteFotos,
        deleteVariasFotos:deleteVariasFotos,
        actualizarCarpeta:actualizarCarpeta

    };
}]);
