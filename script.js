const textarea = document.querySelector("textarea"),
  select = document.querySelector("select"),
  speechButton = document.querySelector("button");

let synth = speechSynthesis;
let isSpeaking = true;

voices();

function voices() {
  for (let voice of synth.getVoices()) {
    let selected = voice.name == "Google US English" ? "selected" : "";

    let option = `<option value="${voice.name}" ${selected}>${voice.name}(${voice.lang})</option>`;
    select.insertAdjacentHTML("beforeend", option);
  }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text) {
  let utterance = new SpeechSynthesisUtterance(text);

  for (let voice of synth.getVoices()) {
    console.log(select.value);
    if (voice.name === select.value) {
      utterance.voice = voice;
    }
  }
  synth.speak(utterance);
}

speechButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (textarea.value !== "") {
    if (!synth.speaking) {
      textToSpeech(textarea.value);
    }
    if (textarea.value.length > 80) {
      if (isSpeaking) {
        synth.resume();
        isSpeaking = false;
        speechButton.innerText = "Pause";
      } else {
        synth.pause();
        isSpeaking = true;
        speechButton.innerText = "Resume";
      }
      setInterval(() => {
        if (!synth.speaking && !isSpeaking) {
          isSpeaking = true;
          speechButton.innerText = "Convert To Speech";
        }
      }, 500);
    } else {
      speechButton.innerText = "Convert To Speech";
    }
  }
});