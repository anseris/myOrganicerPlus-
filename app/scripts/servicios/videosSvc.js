'use strict';

angular.module('myEasyOrganicer').factory('videosService', ['$firebase', '$firebaseArray',  function($firebase, $firebaseArray) {


    var db = firebase.database();

    var ref = db.ref("videos/carpetas");
    var storage = firebase.storage().ref("videos");
    var listacarpetasVideos=$firebaseArray(ref);

    var recuperarCarpetas = function(callback, callbackError) {
        if(listacarpetasVideos===undefined){
            callbackError();
        }
        else{
            callback(listacarpetasVideos);
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

    var addVideo = function(datosAdded,callback, callbackError, form) {
        console.log('datosAdded', datosAdded)

        var file= datosAdded.file;
        var idVideoA= datosAdded.idCarpeta;
        var refVideo = db.ref("videos/carpetas/" + idVideoA + "/archivos");
        // var listacarpetasVideos=$firebaseArray(ref);

        storage.child(file.name).put(file).then(function(){
            storage.child(file.name).getDownloadURL().then(function(url){
                refVideo.push().set({
                    idVideo:datosAdded.idVideo,
                    idCarpeta: datosAdded.idCarpeta,
                    fechaIntroduccionVideo:datosAdded.fechaIntroduccionVideo,
                    fechaVideo: datosAdded.fechaVideo,
                    tituloVideo:datosAdded.tituloVideo,
                    video:{
                        type:file.type,
                        url:url
                    },
                    img:url,
                    chequeado:datosAdded.chequeado
                }, function(error){
                    if(error){
                        callbackError(form);
                    }
                    else{
                        callback(form);
                        console.log('url', url)
                    }
                });
            });
        });
    };

    var actualizarFoto = function(datosAdded, ubicCarpeta, idCarpetaOrig, callback, callbackError, form) {
        console.log('datosAdded', datosAdded)
        console.log('ubicCarpeta', ubicCarpeta)

        // var file= datosAdded.file;
        var idVideoA= datosAdded.idCarpeta;
        var refActVideo = db.ref("fotos/carpetas/" + idVideoA + "/archivos/");
        if(ubicCarpeta==='otraCarpeta'){
            console.log('ubicCarpeta otra', ubicCarpeta)
            refActVideo.push().set({
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
                    var refActDefFoto = db.ref("fotos/carpetas/" + idVideoA + "/archivos/"+ idFotoUni);
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


                    var deleteCarpeta = db.ref("videos/carpetas/" + idCarpeta);
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
        addVideo:addVideo,
        deleteCarpetas:deleteCarpetas,
        deleteFotos:deleteFotos,
        deleteVariasFotos:deleteVariasFotos,
        deleteVariasCarpetas:deleteVariasCarpetas,
        actualizarCarpeta:actualizarCarpeta,
        actualizarFoto:actualizarFoto

    };
}]);
