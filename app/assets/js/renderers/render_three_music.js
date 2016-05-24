// Sources: https://developers.google.com/web/updates/2015/07/mediastream-deprecations?hl=en

'use strict';

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var constraints = {
  audio: true,
  video: false
};

function successCallback(stream) {
    console.log("success");
    //console.log(stream);
    console.log(stream.getAudioTracks());
}

function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);
