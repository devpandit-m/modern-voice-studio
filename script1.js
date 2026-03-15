const synth = window.speechSynthesis;
const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice-select');
const rateInput = document.getElementById('rate');
const speakBtn = document.getElementById('speak-btn');

let voices = [];

// Function to load clear system voices
function loadVoices() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = '';
    
    voices.forEach((voice, i) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
}

// Fixed for Chrome where voices are loaded asynchronously
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
}
loadVoices();

speakBtn.addEventListener('click', () => {
    if (synth.speaking) {
        console.error('Already speaking...');
        return;
    }

    if (textInput.value !== '') {
        const utterThis = new SpeechSynthesisUtterance(textInput.value);
        
        // Find selected voice
        const selectedVoiceName = voiceSelect.selectedOptions[0].getAttribute('data-name');
        voices.forEach((voice) => {
            if (voice.name === selectedVoiceName) {
                utterThis.voice = voice;
            }
        });

        // Set speed/rate for clear audio
        utterThis.rate = rateInput.value;
        utterThis.pitch = 1;

        synth.speak(utterThis);
    }
});
