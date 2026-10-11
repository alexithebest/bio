const tracks = [
    { name: 'BLUFF (Slowed)',  videoId: 'AMfbxv2h65w' },
    { name: 'Eu Sou Blindado', videoId: 'El13Zpb3wxo' },
];

const trackName = document.getElementById('trackName');
const playBtn   = document.getElementById('playBtn');
const volume    = document.getElementById('volume');

let ytPlayer = null;
let current  = 0;
let isPlaying = false;
let ytReady  = false;

window.onYouTubeIframeAPIReady = function () {
    ytPlayer = new YT.Player('ytPlayer', {
        height: '1',
        width: '1',
        videoId: tracks[0].videoId,
        playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
            origin: window.location.origin,
        },
        events: {
            'onReady': () => {
                ytReady = true;
                console.log('[yt] pronto');
            },
            'onStateChange': (e) => {
                if (e.data === YT.PlayerState.PLAYING) {
                    isPlaying = true;
                    updateFavIcons();
                } else if (e.data === YT.PlayerState.PAUSED) {
                    isPlaying = false;
                    updateFavIcons();
                } else if (e.data === YT.PlayerState.ENDED) {
                    loadTrack((current + 1) % tracks.length, true);
                }
            },
            'onError': (e) => {
                console.error('[yt] erro:', e.data);
                if (e.data === 101 || e.data === 150) {
                    console.warn('[yt] vídeo bloqueado para embed — troca o ID');
                }
            }
        }
    });
};

function loadTrack(i, autoplay) {
    current = (i + tracks.length) % tracks.length;
    updateActiveFav();
    if (!ytReady) return;
    if (autoplay) ytPlayer.loadVideoById(tracks[current].videoId);
    else ytPlayer.cueVideoById(tracks[current].videoId);
}

function playTrack(i) {
    current = i;
    updateActiveFav();
    if (!ytReady) return;
    ytPlayer.loadVideoById(tracks[i].videoId);
}

function updateActiveFav() {
    document.querySelectorAll('.fav-item').forEach((el, idx) => {
        el.classList.toggle('active', idx === current);
    });
}

function updateFavIcons() {
    document.querySelectorAll('.fav-item .play-icon').forEach((el, idx) => {
        el.textContent = (idx === current && isPlaying) ? '❚❚' : '▶';
    });
}

// cliques nas músicas favoritas
document.querySelectorAll('.fav-item').forEach((el, idx) => {
    el.addEventListener('click', () => {
        if (idx === current && isPlaying) ytPlayer.pauseVideo();
        else playTrack(idx);
    });
});

window.ytPlay = () => {
    if (!ytReady) return;
    if (isPlaying) ytPlayer.playVideo();
    else ytPlayer.playVideo();
};

window.ytIsReady = () => ytReady;
window.ytFirstPlay = () => {
    if (!ytReady) return;
    current = 0;
    updateActiveFav();
    ytPlayer.loadVideoById(tracks[0].videoId);
};
