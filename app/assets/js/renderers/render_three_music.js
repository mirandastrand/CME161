// Sources: https://developers.google.com/web/updates/2015/07/mediastream-deprecations?hl=en

'use strict';

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var constraints = {
  audio: true,
  video: false
};

function successCallback(stream) {
    /*console.log("success");
    //console.log(stream);
    //console.log(stream.getAudioTracks());
    var left = stream.inputBuffer.getChannelData (0);
    var right = stream.inputBuffer.getChannelData (1);
    console.log(left);
    console.log(right);*/

    var audioContext = new AudioContext();
    var analyser = audioContext.createAnalyser();
    var microphone = audioContext.createMediaStreamSource(stream);
    var javascriptNode = audioContext.createJavaScriptNode(2048, 1, 1);

    analyser.smoothingTimeConstant = 0.3;
    analyser.fftSize = 1024;

    microphone.connect(analyser);
    analyser.connect(javascriptNode);
    javascriptNode.connect(audioContext.destination);

    //canvasContext = $("#canvas")[0].getContext("2d");
    //canvasContext = document.getElementById("test");
    //canvasContext= canvasContext.getContext("2d");

    javascriptNode.onaudioprocess = function() {
        var array =  new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        var values = 0;

        var length = array.length;
        for (var i = 0; i < length; i++) {
            values += array[i];
        }

        var average = values / length;
        //canvasContext.clearRect(0, 0, 60, 130);
        //canvasContext.fillStyle = '#00ff00';
        //canvasContext.fillRect(0,130-average,25,130);
        console.log(average);
    }
}  

function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);
