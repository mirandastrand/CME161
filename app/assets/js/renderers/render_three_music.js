/*function hasUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

if (hasUserMedia()) {
    console.log("has user media");
} else {
    console.log("user media not supported");
}

var errorCallback = function(e) {
    console.log('error: ', e);
};

navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

if (navigator.getUserMedia) {
    console.log("gonna get user media");
  navigator.getUserMedia({audio: false, video: true}, function(stream) {
    //video.src = window.URL.createObjectURL(stream);
    console.log("getting audio");
  }, errorCallback);
} else {
  console.log("failed to get audio");
}*/

var onError = function(e) {
    console.log("error: ", e);
}

var session = {
  audio: true,
  video: false
};
var recordRTC = null;
navigator.getUserMedia(session, initializeRecorder, onError);

function initializeRecorder(stream) {
  var audioContext = window.AudioContext;
  var context = new audioContext();
  var audioInput = context.createMediaStreamSource(stream);
  var bufferSize = 2048;
  // create a javascript node
  var recorder = context.createJavaScriptNode(bufferSize, 1, 1);
  // specify the processing function
  recorder.onaudioprocess = recorderProcess;
  // connect stream to our recorder
  audioInput.connect(recorder);
  // connect our recorder to the previous destination
  recorder.connect(context.destination);
}

function recorderProcess(e) {
  var left = e.inputBuffer.getChannelData(0);
  console.log(e);
}