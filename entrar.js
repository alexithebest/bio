// overlay de entrada — desbloqueia audio no primeiro clique
(function () {
    const overlay = document.createElement('div');
    overlay.id = 'enterOverlay';
    overlay.innerHTML = '<div class="enter-inner"><span>clicar para entrar</span></div>';
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 500);

        const audio = document.getElementById('audio');
        if (audio && audio.src) {
            audio.play().then(() => {
                const playBtn = document.getElementById('playBtn');
                if (playBtn) playBtn.textContent = '❚❚';
            }).catch(() => {});
        }
    });
})();
