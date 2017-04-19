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
        var refActCarp = db.ref("videos/carpetas/" + idCarpeta);
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
                    url:url,
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

    var actualizarVideo = function(datosAdded, ubicCarpeta, idCarpetaOrig, callback, callbackError, form) {
        console.log('datosAdded', datosAdded)
        console.log('ubicCarpeta', ubicCarpeta)

        // var file= datosAdded.file;
        var idVideoA= datosAdded.idCarpeta;
        var refActVideo = db.ref("videos/carpetas/" + idVideoA + "/archivos/");
        if(ubicCarpeta==='otraCarpeta'){
            console.log('ubicCarpeta otra', ubicCarpeta)
            refActVideo.push().set({
                idVideo:datosAdded.idVideo,
                idCarpeta: datosAdded.idCarpeta,
                fechaIntroduccionVideo:datosAdded.fechaIntroduccionVideo,
                fechaVideo: datosAdded.fechaVideo,
                tituloVideo:datosAdded.tituloVideo,
                url:datosAdded.url,
                chequeado:datosAdded.chequeado
            }, function(error){
                if(error){
                    callbackError(form);
                }
                else{
                    callback(form);
                }
            });
            deleteVideo(idCarpetaOrig, datosAdded.idVideo, '', '');

        }
        var archivos={};
        refActVideo.on('value',function(datos){
        	archivos=datos.val();
            angular.forEach(archivos, function(indice,valor) {
                console.log('indice', indice);
                console.log('valor', valor)
                console.log('datosAdded.idVideo', datosAdded.idVideo)
                if(indice.idVideo===datosAdded.idVideo){
                    var idVideoUni=valor;
                    var refActDefVideo = db.ref("videos/carpetas/" + idVideoA + "/archivos/"+ idVideoUni);
                    if(ubicCarpeta==='mismaCarpeta'){
                        console.log('ubicCarpeta misma', ubicCarpeta)
                        refActDefVideo.update({
                            idVideo:datosAdded.idVideo,
                            idCarpeta: datosAdded.idCarpeta,
                            fechaIntroduccionVideo:datosAdded.fechaIntroduccionVideo,
                            fechaVideo: datosAdded.fechaVideo,
                            tituloVideo:datosAdded.tituloVideo,
                            url:datosAdded.url,
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
        var deleteCarpeta = db.ref("videos/carpetas/" + idCarpeta);
        deleteCarpeta.remove(function(error){
            if(error){
                callbackError()
            }
            else{
                callback();
            }
        });

    };

    var deleteVideo = function(idCarpeta, idVideo, callback, callbackError){
        var refArchivos = db.ref("videos/carpetas/" + idCarpeta + "/archivos/");
        var archivos={};
        refArchivos.on('value',function(datos){
        	archivos=datos.val();
            angular.forEach(archivos, function(indice,valor) {

                if(indice.idVideo===idVideo){
                    var idVideoUni=valor;
                    var deleteVideo = db.ref("videos/carpetas/" + idCarpeta + "/archivos/"+ idVideoUni);
                    deleteVideo.remove(function(error){
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

    var deleteVariasVideos = function(idCarpeta, video, callback, callbackError){
        var refArchivos = db.ref("videos/carpetas/" + idCarpeta + "/archivos/");
        for (var a in video) {
            if (video[a].chequeado===true) {
                var idVideo=video[a].idVideo;
                console.log('idVideo',idVideo);
                var archivos={};
                refArchivos.on('value',function(datos){
                	archivos=datos.val();
                    angular.forEach(archivos, function(indice,valor) {

                        if(indice.idVideo===idVideo){
                            var idVideoUni=valor;
                            var deleteVideo = db.ref("videos/carpetas/" + idCarpeta + "/archivos/"+ idVideoUni);
                            deleteVideo.remove(function(error){
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
                // console.log('idVideo',idFoto);


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
        deleteVideo:deleteVideo,
        deleteVariasVideos:deleteVariasVideos,
        deleteVariasCarpetas:deleteVariasCarpetas,
        actualizarCarpeta:actualizarCarpeta,
        actualizarVideo:actualizarVideo

    };
}]);
