var webMic = function(callback) {

  var gotAudio = function(stream) {
    var source = audio_context.createMediaStreamSource(stream);
    var node = audio_context.createScriptProcessor(16384, 1, 1);
    node.onaudioprocess = function(e) {
      callback(e.inputBuffer.getChannelData(0));
    };
    
    source.connect(node);
    node.connect(audio_context.destination);  // idealy unnecessary.
  };

  return {
    initialize: function() {
    try {
      // webkit shim
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
      window.URL = window.URL || window.webkitURL;
      
      audio_context = new AudioContext;
    } catch (e) {
      console.log('No web audio support in this browser!');
    }
    
    navigator.getUserMedia({audio: true}, gotAudio, function(e) {});
  }
  }
}

var webAudio = function(source_file, callback) {
  try {
  // webkit shim
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
  window.URL = window.URL || window.webkitURL;
  
  audio_context = new AudioContext;
  } catch (e) {
    console.log('No web audio support in this browser!');
  }

  var audio_element = document.createElement('audio');
  audio_element.setAttribute('src', source_file);

  var source = audio_context.createMediaElementSource(audio_element);
  
  var node = audio_context.createScriptProcessor(16384, 1, 1);
  node.onaudioprocess = function(e) {
      callback(e.inputBuffer.getChannelData(0));
    };
  
  source.connect(node);
  node.connect(audio_context.destination);  // idealy unnecessary.

  return {
    play: function() { source.noteOn(0); }
  }
}
