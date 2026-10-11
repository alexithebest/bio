(function () {
    const overlay = document.createElement('div');
    overlay.innerHTML = '<div style="color:#fff;font-size:15px;font-weight:500;letter-spacing:2px;text-transform:uppercase;padding:16px 32px;border:1px solid rgba(255,255,255,.2);border-radius:50px;animation:pulse 1.8s ease-in-out infinite">clicar para entrar</div>';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(5,5,10,.88);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:opacity .5s';

    const st = document.createElement('style');
    st.textContent = '@keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}';
    document.head.appendChild(st);

    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 500);

        const bgVideo = document.getElementById('bgVideo');
        if (bgVideo) {
            bgVideo.muted = false;
            bgVideo.volume = 0.2;
            bgVideo.play().catch(() => {});
        }

        const tryPlay = (n = 0) => {
            if (window.ytIsReady && window.ytIsReady()) window.ytPlay();
            else if (n < 30) setTimeout(() => tryPlay(n + 1), 200);
        };
        tryPlay();
    });
})();
