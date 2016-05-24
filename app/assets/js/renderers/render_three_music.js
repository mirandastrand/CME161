var gumStream;

navigator.getUserMedia({audio: true, video: false},
    function(stream) {
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