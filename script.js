const tracks = [
    { name: 'BLUFF (Slowed)',  src: 'music1.mp3' },
    { name: 'Eu Sou Blindado', src: 'music2.mp3' },
];

const audio     = document.getElementById('audio');
const playBtn   = document.getElementById('playBtn');
const prevBtn   = document.getElementById('prevBtn');
const nextBtn   = document.getElementById('nextBtn');
const volume    = document.getElementById('volume');
const trackName = document.getElementById('trackName');

let current = 0;

function loadTrack(i, autoplay = false) {
    current = (i + tracks.length) % tracks.length;
    audio.src = tracks[current].src;
    trackName.textContent = tracks[current].name;
    if (autoplay) {
        audio.play().then(() => {
            playBtn.textContent = '❚❚';
        }).catch(() => {
            playBtn.textContent = '▶';
        });
    }
}

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        if (!audio.src) loadTrack(0, true);
        else audio.play();
    } else {
        audio.pause();
    }
});

prevBtn.addEventListener('click', () => loadTrack(current - 1, true));
nextBtn.addEventListener('click', () => loadTrack(current + 1, true));

volume.addEventListener('input', () => {
    audio.volume = volume.value / 100;
});

audio.addEventListener('play',  () => playBtn.textContent = '❚❚');
audio.addEventListener('pause', () => playBtn.textContent = '▶');

audio.volume = volume.value / 100;
loadTrack(0, false);
