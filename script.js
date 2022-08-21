const canvas = document.getElementById("audio");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
let audioSource;
let analyser;

function play() {
  console.log("oi")
  const audio = document.getElementById('audio1')
  audio.src = 'Konfident.mp3'
  const audioContext = new AudioContext();
  audio.play();
  audioSource = audioContext.createMediaElementSource(audio);
  analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 256;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const barWidth = canvas.width / bufferLength;
  let barHeight;
  let x;

  function animate() {
    x = 0
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] * 1.6;
      const red = i * barHeight/20
      const green = i * 4
      const blue = barHeight/2
      ctx.fillStyle = "rgb(" + red + ',' + green + ',' + blue + ')';
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth;
    }
    requestAnimationFrame(animate);
  }
  animate();
}
