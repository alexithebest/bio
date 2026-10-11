const tracks = [
    { name: 'BLUFF (Slowed)',        src: 'music1.mp3' },
    { name: 'Eu Sou Blindado',       src: 'music2.mp3' },
];

const audio     = document.getElementById('audio');
const playBtn   = document.getElementById('playBtn');
const prevBtn   = document.getElementById('prevBtn');
const nextBtn   = document.getElementById('nextBtn');
const volume    = document.getElementById('volume');
const trackName = document.getElementById('trackName');

let current = 0;

function loadTrack(i, autoplay = true) {
    current = (i + tracks.length) % tracks.length;
    audio.src = tracks[current].src;
    trackName.textContent = tracks[current].name;
    if (autoplay) {
        audio.play().then(() => {
            playBtn.textContent = '❚❚';
        }).catch(() => {
            // navegador bloqueou autoplay — precisa clique
            playBtn.textContent = '▶';
        });
    }
}

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        if (!audio.src) loadTrack(0);
        else audio.play();
    } else {
        audio.pause();
    }
});

prevBtn.addEventListener('click', () => loadTrack(current - 1));
nextBtn.addEventListener('click', () => loadTrack(current + 1));

volume.addEventListener('input', () => {
    audio.volume = volume.value / 100;
});

audio.addEventListener('play',  () => playBtn.textContent = '❚❚');
audio.addEventListener('pause', () => playBtn.textContent = '▶');
audio.addEventListener('ended', () => {
    // loop=true já cuida, mas se desativar, avança:
    loadTrack(current + 1);
});

// inicial
audio.volume = volume.value / 100;
loadTrack(0);
