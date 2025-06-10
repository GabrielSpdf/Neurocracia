window.addEventListener('DOMContentLoaded', () => {
  const clearBtn = document.getElementById('clear-button');
  const chaotic = document.getElementById('chaotic-section');
  const calm = document.getElementById('calm-section');

  clearBtn.addEventListener('click', () => {
    const audio = document.querySelector('audio'); // O áudio geral da página
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    chaotic.style.display = 'none';
    if (calm) calm.style.display = 'block';
  });

  // Variável para controlar se o áudio do "trala" já foi tocado
  let tralaAudioPlayed = false;

  function updatePopups() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    // Garante que scrollPercent seja 0 se não houver rolagem ou docHeight <= 0
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0; 

    const popups = document.querySelectorAll('.popup');

    popups.forEach((popup, index) => {
      // O threshold é mantido conforme sua solicitação
      const threshold = 20 + index * 20; 

      if (scrollPercent >= threshold) {
        popup.style.opacity = '1';
        popup.style.transform = 'translateY(0)';

        // --- LÓGICA DE ATIVAÇÃO DE ANIMAÇÃO (mantida) ---
        // Aplica a animação diretamente no estilo do elemento quando ele se torna visível
        if (popup.classList.contains('spin')) {
          popup.style.animation = 'spin 1s linear';
        }
        if (popup.classList.contains('dance')) {
          popup.style.animation = 'dance 1s infinite alternate';
        }
        if (popup.classList.contains('shake')) {
          popup.style.animation = 'shake 0.3s infinite';
        }
        // As animações para 'fly' que estavam comentadas também são mantidas comentadas.


        // --- LÓGICA DO VÍDEO 'trala' E ÁUDIO ---
        // Verifica se é o pop-up do vídeo 'trala' (data-index="2") e se o áudio ainda não foi tocado
        if (popup.dataset.index === '2' && !tralaAudioPlayed) {
          const tralaAudio = popup.querySelector('#trala-audio'); // Pega o áudio específico do pop-up
          if (tralaAudio) {
            tralaAudio.play();
            tralaAudioPlayed = true; // Marca que o áudio já foi tocado

            // >>> REMOVIDA A LÓGICA DE OCULTAR O POP-UP AQUI <<<
            // tralaAudio.onended = () => {
            //   // Nada acontece aqui, o pop-up não sumirá automaticamente
            // };
          }
        }

      } else {
        // Se o pop-up não atingiu o threshold (ou está voltando para cima)
        popup.style.opacity = '0';
        popup.style.transform = 'translateY(20px)';
        
        // --- LÓGICA DE DESATIVAÇÃO DE ANIMAÇÃO (mantida) ---
        // Desativa a animação quando o pop-up não está visível
        if (popup.classList.contains('spin')) {
          popup.style.animation = 'none'; 
        }
        if (popup.classList.contains('dance')) {
          popup.style.animation = 'none';
        }
        if (popup.classList.contains('shake')) {
          popup.style.animation = 'none';
        }

        // --- LÓGICA DE RESET DO ÁUDIO 'trala' (mantida) ---
        // Se o pop-up do trala sumir antes do áudio terminar (ex: rolando rápido para cima)
        // Resetar o estado do áudio para que ele possa tocar novamente se o pop-up reaparecer
        if (popup.dataset.index === '2' && tralaAudioPlayed) {
            const tralaAudio = popup.querySelector('#trala-audio');
            if(tralaAudio) {
                tralaAudio.pause();
                tralaAudio.currentTime = 0;
                tralaAudioPlayed = false; // Permite que o áudio toque novamente
            }
        }
      }
    });
  }

  // Chama a função ao abrir
  updatePopups();
  window.addEventListener('scroll', updatePopups);
  // Adiciona este para garantir que funciona em redimensionamento também, como em mobile
  window.addEventListener('resize', updatePopups); 
});