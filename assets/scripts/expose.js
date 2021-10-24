// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
  const hornSelect = document.getElementById("horn-select");
  const volumeSlider = document.getElementById("volume");
  const hornAudio = document.querySelector(".hidden");
  const playButton = document.querySelector("button");
  const jsConfetti = new JSConfetti();
  hornSelect.addEventListener('change', (event) => {
      document.querySelector("img:not(.div)").src = "assets/images/" + event.target.value + ".svg";
      hornAudio.src = "assets/audio/" + event.target.value + ".mp3";
  })

  volumeSlider.addEventListener('input', (event) =>{
      if(event.target.value == 0){
        document.querySelector("div > img").src = "assets/icons/volume-level-0.svg";
      }
      else if (event.target.value < 33 ){
        document.querySelector("div > img").src = "assets/icons/volume-level-1.svg";
      }
      else if (event.target.value < 67){
        document.querySelector("div > img").src = "assets/icons/volume-level-2.svg";
      }
      else {
        document.querySelector("div > img").src = "assets/icons/volume-level-3.svg";
      }
      hornAudio.volume = event.currentTarget.value / 100;
  })

  playButton.addEventListener('click', (event) =>{
    hornAudio.play(); 
    if(hornSelect.value == "party-horn" && hornAudio.volume != 0)
    {
      jsConfetti.addConfetti();
    }
  })
}