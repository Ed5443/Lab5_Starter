// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
  var synth = window.speechSynthesis;
  var voiceSelect = document.querySelector("select");
  var inputForm = document.querySelector('textarea');
  var speakButton = document.querySelector('button');
  var face = document.querySelector('img');
  var voices = [];

  function populateVoiceList() {
    voices = synth.getVoices();
  
    for(var i = 0; i < voices.length ; i++) {
      var option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
  
      if(voices[i].default) {
        option.textContent += ' -- DEFAULT';
      }
  
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);
    }
  }
  
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  speakButton.addEventListener('click', (event => {
    if (inputForm.value !== "") {
      var utterThis = new SpeechSynthesisUtterance(inputForm.value);
      var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
      for(var i = 0; i < voices.length ; i++) {
        if(voices[i].name === selectedOption) {
          utterThis.voice = voices[i];
        }
      }
      utterThis.pitch = 1;
      utterThis.rate = 1;
      utterThis.volume = 1;
      synth.speak(utterThis);
      utterThis.addEventListener('start', (event) =>{
        face.src = "assets/images/smiling-open.png";
      })
    
      utterThis.addEventListener('end', (event) =>{
        face.src = "assets/images/smiling.png";
      })
    }
  }))


}