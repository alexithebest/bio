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

if (bgVideo) {
    bgVideo.volume = 0.25;
    bgVideo.muted = false;
}

function loadTrack(i, autoplay = true) {
    current = (i + tracks.length) % tracks.length;
    const track = tracks[current];

    console.log('[audio] carregando:', track.name, '->', track.src);

    // limpa source antigo e força reload
    audio.pause();
    audio.removeAttribute('src');
    audio.load();

    audio.src = track.src;
    audio.load();
    trackName.textContent = track.name;

    if (autoplay) {
        if (bgVideo) bgVideo.muted = true;
        audio.play()
            .then(() => {
                playBtn.textContent = '❚❚';
                console.log('[audio] tocando:', track.name);
            })
            .catch(err => {
                playBtn.textContent = '▶';
                console.error('[audio] erro ao tocar:', err.name, err.message);
            });
    }
}

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        if (!audio.src) loadTrack(0, true);
        else {
            if (bgVideo) bgVideo.muted = true;
            audio.play().catch(err => console.error('[audio]', err));
        }
    } else {
        audio.pause();
        if (bgVideo) bgVideo.muted = false;
    }
});

prevBtn.addEventListener('click', () => loadTrack(current - 1, true));
nextBtn.addEventListener('click', () => loadTrack(current + 1, true));

volume.addEventListener('input', () => {
    audio.volume = volume.value / 100;
});

audio.addEventListener('play',  () => {
    playBtn.textContent = '❚❚';
    if (bgVideo) bgVideo.muted = true;
});
audio.addEventListener('pause', () => {
    playBtn.textContent = '▶';
    if (bgVideo) bgVideo.muted = false;
});

audio.addEventListener('error', () => {
    const err = audio.error;
    console.error('[audio] erro no elemento:', err ? `${err.code} — ${err.message}` : 'unknown');
    playBtn.textContent = '▶';
});

// diagnóstico: testa se os arquivos são acessíveis antes de tocar
(async () => {
    for (const t of tracks) {
        try {
            const res = await fetch(t.src, { method: 'HEAD' });
            console.log(`[diag] ${t.src}: HTTP ${res.status}, Content-Type: ${res.headers.get('content-type')}, Size: ${res.headers.get('content-length')}`);
        } catch (e) {
            console.warn(`[diag] ${t.src}: inacessível —`, e.message);
        }
    }
})();

audio.volume = volume.value / 100;
loadTrack(0, false);
