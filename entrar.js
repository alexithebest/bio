(function () {
    const overlay = document.createElement('div');
    overlay.id = 'enterOverlay';
    overlay.innerHTML = '<div class="enter-inner"><span>clicar para entrar</span></div>';
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 500);

        const bgVideo = document.getElementById('bgVideo');
        if (bgVideo) {
            bgVideo.muted = false;
            bgVideo.volume = 0.25;
            bgVideo.play().catch(() => {});
        }

        const audio = document.getElementById('audio');
        if (audio && audio.src) {
            audio.play().then(() => {
                const playBtn = document.getElementById('playBtn');
                if (playBtn) playBtn.textContent = '❚❚';
            }).catch(err => console.error('[audio] overlay:', err));
        }
    });
})();
