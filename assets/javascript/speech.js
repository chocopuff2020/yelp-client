(function(){
  var trigger = document.querySelector('#audio-trigger');
  var audioInput = document.querySelector('#audio-input');
  // var apiUrl = 'http://localhost:3000/speech';
  var apiUrl = 'http://35.185.203.208:3000/speech';
  var rec;
  var audioChunks = [];
  var state = 'idle';

  function upload(blob) {
    var data = new FormData();
    data.append('speech', new File([blob], 'audio'));

    fetch(apiUrl, {
      method: 'POST',
      body: data,
    })
    .then(function(response) {
      return response.json();
    })
    .then((response) => {
      audioInput.value = response.transcript;
    });
  }

  navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
          rec = new MediaRecorder(stream);
          rec.ondataavailable = e => {
              audioChunks.push(e.data);
              if (rec.state == "inactive") {
                  var blob = new Blob(audioChunks, { type: 'audio/x-wav' });
                  upload(blob);
              }
          }
      })
      .catch(e => console.log(e));

  trigger.addEventListener('click', function() {
    if (state === 'idle') {
      audioChunks = [];
      rec.start();
      audioInput.value = '';
      state = 'active';
      trigger.querySelector('i').className = 'sound icon';
    } else {
      rec.stop();
      state = 'idle';
      trigger.querySelector('i').className = 'unmute icon';
    }
  });
})();
