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
const bgVideo   = document.getElementById('bgVideo');

let current = 0;
let loaded  = false;

if (bgVideo) {
    bgVideo.volume = 0.2;
    bgVideo.muted = false;
}

function loadTrack(i) {
    current = (i + tracks.length) % tracks.length;
    const track = tracks[current];
    trackName.textContent = track.name;

    audio.pause();
    audio.src = track.src;
    audio.load();
    loaded = false;

    audio.addEventListener('canplay', function onReady() {
        audio.removeEventListener('canplay', onReady);
        loaded = true;
        console.log('[audio] pronto:', track.name);
    });
}

function tryPlay() {
    if (!audio.src) {
        loadTrack(0);
        setTimeout(tryPlay, 100);
        return;
    }
    if (!loaded) {
        console.log('[audio] aguardando carregar...');
        audio.addEventListener('canplay', () => tryPlay(), { once: true });
        return;
    }
    if (bgVideo) bgVideo.muted = true;
    audio.volume = volume.value / 100;
    const p = audio.play();
    if (p) p.then(() => {
        playBtn.textContent = '❚❚';
        console.log('[audio] tocando');
    }).catch(err => {
        playBtn.textContent = '▶';
        console.warn('[audio] falha:', err.name, err.message);
    });
}

playBtn.addEventListener('click', () => {
    if (audio.paused) tryPlay();
    else {
        audio.pause();
        if (bgVideo) bgVideo.muted = false;
    }
});

prevBtn.addEventListener('click', () => { loadTrack(current - 1); setTimeout(tryPlay, 100); });
nextBtn.addEventListener('click', () => { loadTrack(current + 1); setTimeout(tryPlay, 100); });

volume.addEventListener('input', () => { audio.volume = volume.value / 100; });

audio.addEventListener('play',  () => playBtn.textContent = '❚❚');
audio.addEventListener('pause', () => playBtn.textContent = '▶');
audio.addEventListener('error', () => {
    const e = audio.error;
    console.error('[audio] erro:', e ? `code ${e.code} — ${e.message}` : 'desconhecido');
    trackName.textContent = 'erro ao carregar';
});

audio.volume = volume.value / 100;
loadTrack(0);

// expõe pra o overlay
window.playerPlay = tryPlay;
