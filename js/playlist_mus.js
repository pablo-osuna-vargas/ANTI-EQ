const trackTitle = document.getElementById("track-title");
const audioPlayer = document.getElementById("audio-player");

const playlist = [
  { title: "¦", file: "audio/Grisey_Partiels.mp3" },
  { title: "¦§", file: "audio/Ligeti_Lux Aeterna.mp3" },
  { title: "¦§°", file: "audio/Parmegiani_Pop Eclectic.mp3" },
  { title: "¦§°µ", file: "audio/Penderecki_Threnody for the Victims of Hiroshima.mp3" },
  { title: "¦§°µØ", file: "audio/Saariaho_Lichtbogen.mp3" },
];

let lastIndex = -1;
let canScroll = true;

function getRandomTrackIndex() {
  let index;
  do {
    index = Math.floor(Math.random() * playlist.length);
  } while (index === lastIndex);
  lastIndex = index;
  return index;
}

function showTrack(index) {
  const track = playlist[index];
  trackTitle.style.opacity = 0;

  setTimeout(() => {
    trackTitle.textContent = track.title;
    trackTitle.style.opacity = 1;
    audioPlayer.src = track.file;
    audioPlayer.play().catch(() => {});
  }, 500);
}

// Evento de scroll (rueda o touchpad)
window.addEventListener("wheel", (event) => {
  event.preventDefault();
  if (!canScroll) return;

  const index = getRandomTrackIndex();
  showTrack(index);

  canScroll = false;
  setTimeout(() => canScroll = true, 2000);
}, { passive: false });

// Previene scroll por teclado
window.addEventListener("keydown", (e) => {
  const keys = ["ArrowUp", "ArrowDown", "Space", "PageUp", "PageDown"];
  if (keys.includes(e.code)) {
    e.preventDefault();
  }
});

// Previene scroll táctil en móviles
window.addEventListener("touchmove", (e) => {
  e.preventDefault();
}, { passive: false });

// Reproduce una obra automáticamente al cargar
window.addEventListener("load", () => {
  const index = getRandomTrackIndex();
  showTrack(index);
});