
var gumStream;

navigator.mediaDevices.getUserMedia({audio: false, video: true},
    function(stream) {
        console.log("getting stream");
         gumStream = stream;
        // ...
    },
    function(error) {
        console.log('getUserMedia() error', error);
    });

// …

if (gumStream.active) {
    // do something with the stream
    console.log("gum stream active");
    console.log(gumStream);
}