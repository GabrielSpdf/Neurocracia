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

  function updatePopups() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    const popups = document.querySelectorAll('.popup');

    popups.forEach((popup, index) => {
      const threshold = 5 + index * 10; // 5%, 15%, 25% - aparece BEM CEDO!
      if (scrollPercent >= threshold) {
        popup.style.opacity = '1';
        popup.style.transform = 'translateY(0)';
      } else {
        popup.style.opacity = '0';
        popup.style.transform = 'translateY(20px)';
      }
    });
  }

  // Chama a função ao abrir
  updatePopups();
  window.addEventListener('scroll', updatePopups);
});
