window.addEventListener('DOMContentLoaded', () => {
  const clearBtn = document.getElementById('clear-button');
  const chaotic = document.getElementById('chaotic-section');
  const calm = document.getElementById('calm-section');

  clearBtn.addEventListener('click', () => {
    const audio = document.querySelector('audio'); 
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    chaotic.style.display = 'none';
    if (calm) calm.style.display = 'block';
  });

  let tralaAudioPlayed = false;

  function updatePopups() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0; 

    const popups = document.querySelectorAll('.popup');

    popups.forEach((popup, index) => {
      const threshold = 20 + index * 20; 

      if (scrollPercent >= threshold) {
        popup.style.opacity = '1';
        popup.style.transform = 'translateY(0)';

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
      }
    });
  }


  updatePopups();
  window.addEventListener('scroll', updatePopups);

  window.addEventListener('resize', updatePopups); 
});