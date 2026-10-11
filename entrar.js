(function () {
    const overlay = document.createElement('div');
    overlay.id = 'enterOverlay';
    overlay.innerHTML = '<div class="inner">entrar</div>';

    const st = document.createElement('style');
    st.textContent = '@keyframes pulse{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:1;transform:scale(1.02)}}';
    document.head.appendChild(st);

    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 600);

        // vídeo de fundo SEM som — sempre mudo
        const bgVideo = document.getElementById('bgVideo');
        if (bgVideo) {
            bgVideo.muted = true;
            bgVideo.play().catch(() => {});
        }

        // música — YouTube
        const tryPlay = (n = 0) => {
            if (window.ytIsReady && window.ytIsReady()) {
                window.ytFirstPlay();
            } else if (n < 40) {
                setTimeout(() => tryPlay(n + 1), 200);
            }
        };
        tryPlay();
    });
})();
