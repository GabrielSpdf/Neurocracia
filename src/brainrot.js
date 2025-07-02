let popupsAtivos = true;
window.addEventListener('DOMContentLoaded', () => {
  const clearBtn = document.getElementById('clear-button');
  const chaotic = document.getElementById('chaotic-section');
  const calm = document.getElementById('calm-section');

  clearBtn.addEventListener('click', () => {
    // Pausa todos os áudios da página
    document.querySelectorAll('audio').forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });

    // Oculta completamente a seção caótica
    chaotic.style.display = 'none';

    // Mostra a seção de clareza
    calm.style.display = 'block';

    popupsAtivos = false;


    // Força scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  let tralaAudioPlayed = false;

  function updatePopups() {
    if (!popupsAtivos) return;
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0; 

    const popups = Array.from(document.querySelectorAll('.popup[data-index]'));
    popups.forEach((popup) => {
      const index = parseInt(popup.dataset.index);
      const threshold = 20 + index * 20;

      if (scrollPercent >= threshold) {
        popup.style.opacity = '1';
        popup.style.transform = 'translateY(0)';
        popup.style.pointerEvents = 'auto';

        if (popup.classList.contains('spin')) {
          popup.style.animation = 'spin 1s linear';
        }
        if (popup.classList.contains('dance')) {
          popup.style.animation = 'dance 1s infinite alternate';
        }
        if (popup.classList.contains('shake')) {
          popup.style.animation = 'shake 0.3s infinite';
        }

        if (popup.dataset.index === '2' && !tralaAudioPlayed) {
          const tralaAudio = popup.querySelector('#trala-audio'); 
          if (tralaAudio) {
            tralaAudio.play();
            tralaAudioPlayed = true; 

          }
        }

      } else {

        popup.style.opacity = '0';
        popup.style.transform = 'translateY(20px)';
        popup.style.pointerEvents = 'none';

        if (popup.classList.contains('spin')) {
          popup.style.animation = 'none'; 
        }
        if (popup.classList.contains('dance')) {
          popup.style.animation = 'none';
        }
        if (popup.classList.contains('shake')) {
          popup.style.animation = 'none';
        }

        if (popup.dataset.index === '2' && tralaAudioPlayed) {
            const tralaAudio = popup.querySelector('#trala-audio');
            if(tralaAudio) {
                tralaAudio.pause();
                tralaAudio.currentTime = 0;
                tralaAudioPlayed = false; 
            }
        }
        if (popup.classList.contains('bombardiro')) {
          popup.remove();
        }

      }
    });
  }


  updatePopups();


  let popup0Clicks = 0;

  const popup0 = document.querySelector('.popup[data-index="0"]');
  if (popup0) {
    popup0.addEventListener('click', () => {
      popup0Clicks++;

      if (popup0Clicks === 3) {
        const audio = new Audio('../audios/w3-song.mp3');
        audio.play().catch(e => console.warn('Som especial falhou:', e));

        // Troca animação
        popup0.classList.remove('dance');  // remove anterior
        popup0.classList.add('party');     // adiciona nova

        // Quando a música terminar, volta a dança original
        audio.addEventListener('ended', () => {
          popup0.classList.remove('party');
          popup0.classList.add('dance');
        });

      } else {
        const audio = new Audio('../audios/w3.mp3');
        audio.play().catch(e => console.warn('Som popup 0 falhou:', e));
      }
    });
  }

  const popup1 = document.querySelector('.popup[data-index="1"]');
  if (popup1) {
    popup1.addEventListener('click', () => {
      const audio = new Audio('../audios/w2.mp3');
      audio.play().catch(e => console.warn('Som popup 1 falhou:', e));
    });
  }

  const popup3 = document.querySelector('.popup[data-index="3"]');
  if (popup3) {
    popup3.addEventListener('click', () => {
      const audio = new Audio('../audios/w1.mp3');
      audio.play().catch(e => console.warn('Som popup 3 falhou:', e));
    });
  }

  let vidasBombardiro = 5;

  const popupTrala = document.querySelector('.popup[data-index="2"]');
  if (popupTrala) {
    popupTrala.addEventListener('click', () => {
      // Já existe? Não recria
      if (document.querySelector('.popup.bombardiro')) return;

      // Cria novo
      vidasBombardiro = 5;

      const bombardiro = document.createElement('video');
      bombardiro.src = '../videos/bombardiro.mp4';
      bombardiro.autoplay = true;
      bombardiro.loop = true;
      bombardiro.muted = true;
      bombardiro.playsInline = true;

      bombardiro.classList.add('popup', 'shake', 'bombardiro');
      bombardiro.dataset.index = '2';
      Object.assign(bombardiro.style, {
        top: '20vh',
        left: '50vw',
        position: 'fixed',
        opacity: '0',
        transform: 'translateY(20px)',
        width: '350px',
        pointerEvents: 'none',
        zIndex: '1000',
      });

      document.querySelector('.popups').appendChild(bombardiro);

      bombardiro.addEventListener('click', () => {
        if (vidasBombardiro <= 0) return;

        // Efeito vermelho (dano)
        bombardiro.style.filter = 'brightness(0.5) sepia(1) hue-rotate(-50deg) saturate(6)';
        setTimeout(() => {
          bombardiro.style.filter = 'none';
        }, 200);

        // Áudio de dano
        const danoAudio = new Audio('../audios/uh.mp3');
        danoAudio.play().catch(e => console.warn('Erro som dano:', e));

        // Diminui vida
        vidasBombardiro--;

        if (vidasBombardiro === 0) {
          // Som de morte
          const morteAudio = new Audio('../audios/slow-uh.mp3');
          morteAudio.play().catch(e => console.warn('Erro ao tocar som de morte:', e));

          // Morre com fade-out
          bombardiro.style.transition = 'opacity 1s ease';
          bombardiro.style.opacity = '0';

          setTimeout(() => {
            bombardiro.remove();
          }, 1000);
        }
      });

      // Toca som ao aparecer
      const audio = new Audio('../audios/bombardiro.mp3');
      audio.play().catch(e => console.warn('Áudio bloqueado:', e));

      updatePopups();
      window.dispatchEvent(new Event('scroll'));
    });
  }




  window.addEventListener('scroll', updatePopups);

  window.addEventListener('resize', updatePopups); 
});