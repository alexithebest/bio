const tracks = [
    { name: 'BLUFF (Slowed)',  videoId: 'AMfbxv2h65w' },
    { name: 'Eu Sou Blindado', videoId: 'El13Zpb3wxo' },
];

const playBtn   = document.getElementById('playBtn');
const prevBtn   = document.getElementById('prevBtn');
const nextBtn   = document.getElementById('nextBtn');
const volume    = document.getElementById('volume');
const trackName = document.getElementById('trackName');

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
        },
        events: {
            'onReady': () => {
                ytReady = true;
                ytPlayer.setVolume(parseInt(volume.value));
                trackName.textContent = tracks[0].name;
            },
            'onStateChange': (e) => {
                if (e.data === YT.PlayerState.PLAYING) {
                    isPlaying = true;
                    playBtn.textContent = '❚❚';
                } else if (e.data === YT.PlayerState.PAUSED) {
                    isPlaying = false;
                    playBtn.textContent = '▶';
                } else if (e.data === YT.PlayerState.ENDED) {
                    loadTrack(current + 1, true);
                }
            }
        }
    });
};

function loadTrack(i, autoplay) {
    current = (i + tracks.length) % tracks.length;
    trackName.textContent = tracks[current].name;
    if (!ytReady) return;
    if (autoplay) ytPlayer.loadVideoById(tracks[current].videoId);
    else ytPlayer.cueVideoById(tracks[current].videoId);
}

playBtn.addEventListener('click', () => {
    if (!ytReady) return;
    if (isPlaying) ytPlayer.pauseVideo();
    else ytPlayer.playVideo();
});

prevBtn.addEventListener('click', () => loadTrack(current - 1, true));
nextBtn.addEventListener('click', () => loadTrack(current + 1, true));

volume.addEventListener('input', () => {
    if (ytReady) ytPlayer.setVolume(parseInt(volume.value));
});

window.ytPlay = () => { if (ytReady) ytPlayer.playVideo(); };
window.ytIsReady = () => ytReady;
