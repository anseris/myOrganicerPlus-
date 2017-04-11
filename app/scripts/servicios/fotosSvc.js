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


    var addCarpeta = function(datosAdded, callback, callbackError, form) {
        ref.push().set(datosAdded, function(error){
            if(error){
                callbackError(form)
            }
            else{
                callback(form);
            }
        });
    };



    var actualizarCarpeta = function(datosAdded, idCarpeta, callback, callbackError, form) {
        var refActCarp = db.ref("fotos/carpetas/" + idCarpeta);
        refActCarp.update(datosAdded, function(error){
            if(error){
                callbackError(form)
            }
            else{
                callback(form);
            }
        });
    };

    var addFoto = function(datosAdded, callback, callbackError, form) {
        console.log('datosAdded', datosAdded)

        var file= datosAdded.file;
        var idFotoA= datosAdded.idCarpeta;
        var refFoto = db.ref("fotos/carpetas/" + idFotoA + "/archivos");
        // var listacarpetasFotos=$firebaseArray(ref);

        storage.child(file.name).put(file).then(function(){
            storage.child(file.name).getDownloadURL().then(function(url){
                refFoto.push().set({
                    idFoto:datosAdded.idFoto,
                    idCarpeta: datosAdded.idCarpeta,
                    fechaIntroduccionFoto:datosAdded.fechaIntroduccionFoto,
                    fechaFoto: datosAdded.fechaFoto,
                    tituloFoto:datosAdded.tituloFoto,
                    img:url,
                    chequeado:datosAdded.chequeado
                }, function(error){
                    if(error){
                        callbackError(form);
                    }
                    else{
                        callback(form);
                    }
                });
            });
        });
    };

    var actualizarFoto = function(datosAdded, ubicCarpeta, idCarpetaOrig, callback, callbackError, form) {
        console.log('datosAdded', datosAdded)
        console.log('ubicCarpeta', ubicCarpeta)

        // var file= datosAdded.file;
        var idFotoA= datosAdded.idCarpeta;
        var refActFoto = db.ref("fotos/carpetas/" + idFotoA + "/archivos/");
        if(ubicCarpeta==='otraCarpeta'){
            console.log('ubicCarpeta otra', ubicCarpeta)
            refActFoto.push().set({
                idFoto:datosAdded.idFoto,
                idCarpeta: datosAdded.idCarpeta,
                fechaIntroduccionFoto:datosAdded.fechaIntroduccionFoto,
                fechaFoto: datosAdded.fechaFoto,
                tituloFoto:datosAdded.tituloFoto,
                img:datosAdded.img,
                chequeado:datosAdded.chequeado
            }, function(error){
                if(error){
                    callbackError(form);
                }
                else{
                    callback(form);
                }
            });
            deleteFotos(idCarpetaOrig, datosAdded.idFoto, '', '');

        }
        var archivos={};
        refActFoto.on('value',function(datos){
        	archivos=datos.val();
            angular.forEach(archivos, function(indice,valor) {
                console.log('indice', indice);
                console.log('valor', valor)
                console.log('datosAdded.idFoto', datosAdded.idFoto)
                if(indice.idFoto===datosAdded.idFoto){
                    var idFotoUni=valor;
                    var refActDefFoto = db.ref("fotos/carpetas/" + idFotoA + "/archivos/"+ idFotoUni);
                    if(ubicCarpeta==='mismaCarpeta'){
                        console.log('ubicCarpeta misma', ubicCarpeta)
                        refActDefFoto.update({
                            idFoto:datosAdded.idFoto,
                            idCarpeta: datosAdded.idCarpeta,
                            fechaIntroduccionFoto:datosAdded.fechaIntroduccionFoto,
                            fechaFoto: datosAdded.fechaFoto,
                            tituloFoto:datosAdded.tituloFoto,
                            img:datosAdded.img,
                            chequeado:datosAdded.chequeado
                        }, function(error){
                            if(error){
                                callbackError(form);
                            }
                            else{
                                callback(form);
                            }
                        });
                    }




                }
            });
        });

    };

    var deleteCarpetas = function(idCarpeta, callback, callbackError){
        var deleteCarpeta = db.ref("fotos/carpetas/" + idCarpeta);
        deleteCarpeta.remove(function(error){
            if(error){
                callbackError()
            }
            else{
                callback();
            }
        });

    };

    var deleteFotos = function(idCarpeta, idFoto, callback, callbackError){
        var refArchivos = db.ref("fotos/carpetas/" + idCarpeta + "/archivos/");
        var archivos={};
        refArchivos.on('value',function(datos){
        	archivos=datos.val();
            angular.forEach(archivos, function(indice,valor) {

                if(indice.idFoto===idFoto){
                    var idFotoUni=valor;
                    var deleteFoto = db.ref("fotos/carpetas/" + idCarpeta + "/archivos/"+ idFotoUni);
                    deleteFoto.remove(function(error){
                        if(error){
                            callbackError()
                        }
                        else{
                            callback();
                        }
                    });
                }
            });
        });
    }

    var deleteVariasFotos = function(idCarpeta, fotos, callback, callbackError){
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
                            deleteFoto.remove(function(error){
                                if(error){
                                    callbackError()
                                }
                                else{
                                    callback();
                                }
                            });
                        }
                    });
                });

            }
        }



    }

    var deleteVariasCarpetas = function(carpetas, callback, callbackError){
        // var refArchivos = db.ref("carpetas/carpetas/");
        for (var a in carpetas) {
            if (carpetas[a].chequeado===true) {
                var idCarpeta=carpetas[a].$id;
                // console.log('idFoto',idFoto);


                    var deleteCarpeta = db.ref("fotos/carpetas/" + idCarpeta);
                    deleteCarpeta.remove(function(error){
                        if(error){
                            callbackError()
                        }
                        else{
                            callback();
                        }
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
        deleteVariasCarpetas:deleteVariasCarpetas,
        actualizarCarpeta:actualizarCarpeta,
        actualizarFoto:actualizarFoto

    };
}]);
