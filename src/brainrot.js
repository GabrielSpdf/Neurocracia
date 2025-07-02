/*global window, document, Audio, console, setTimeout, Event */
"use strict";

let popupsAtivos = true;

window.addEventListener("DOMContentLoaded", function () {
  const clearBtn = document.getElementById("clear-button");
  const chaotic = document.getElementById("chaotic-section");
  const calm = document.getElementById("calm-section");

  clearBtn.addEventListener("click", function () {
    document.querySelectorAll("audio").forEach(function (audioEl) {
      audioEl.pause();
      audioEl.currentTime = 0;
    });
    chaotic.style.display = "none";
    calm.style.display = "block";
    popupsAtivos = false;
    window.scrollTo({ behavior: "smooth", top: 0 });
  });

  let tralaAudioPlayed = false;
  let tralaAudioRef = null;

  function updatePopups() {
    if (!popupsAtivos) {
      return;
    }

    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (
      docHeight > 0
        ? ((scrollTop / docHeight) * 100)
        : 0
    );

    const popups = Array.from(document.querySelectorAll(".popup[data-index]"));
    popups.forEach(function (popup) {
      const index = parseInt(popup.dataset.index, 10);
      const threshold = 20 + index * 20;

      if (scrollPercent >= threshold) {
        popup.style.opacity = "1";
        popup.style.transform = "translateY(0)";
        popup.style.pointerEvents = "auto";

        if (popup.classList.contains("spin")) {
          popup.style.animation = "spin 1s linear";
        }
        if (popup.classList.contains("dance")) {
          popup.style.animation = "dance 1s infinite alternate";
        }
        if (popup.classList.contains("shake")) {
          popup.style.animation = "shake 0.3s infinite";
        }

        if (popup.dataset.index === "2" && !tralaAudioPlayed) {
          tralaAudioRef = popup.querySelector("#trala-audio");
          if (tralaAudioRef) {
            tralaAudioRef.play();
            tralaAudioPlayed = true;
          }
        }
      } else {
        popup.style.opacity = "0";
        popup.style.transform = "translateY(20px)";
        popup.style.pointerEvents = "none";

        if (popup.classList.contains("spin")) {
          popup.style.animation = "none";
        }
        if (popup.classList.contains("dance")) {
          popup.style.animation = "none";
        }
        if (popup.classList.contains("shake")) {
          popup.style.animation = "none";
        }

        if (popup.dataset.index === "2" && tralaAudioPlayed) {
          if (tralaAudioRef) {
            tralaAudioRef.pause();
            tralaAudioRef.currentTime = 0;
            tralaAudioPlayed = false;
          }
        }

        if (popup.classList.contains("bombardiro")) {
          popup.remove();
        }
      }
    });
  }

  updatePopups();

  let popup0Clicks = 0;
  const popup0 = document.querySelector(".popup[data-index=\"0\"]");
  if (popup0) {
    popup0.addEventListener("click", function () {
      popup0Clicks += 1;
      let audio;
      if (popup0Clicks === 3) {
        audio = new Audio("../audios/w3-song.mp3");
        audio.play().catch(function (e) {
          console.warn("Som especial falhou:", e);
        });
        popup0.classList.remove("dance");
        popup0.classList.add("party");
        audio.addEventListener("ended", function () {
          popup0.classList.remove("party");
          popup0.classList.add("dance");
        });
      } else {
        audio = new Audio("../audios/w3.mp3");
        audio.play().catch(function (e) {
          console.warn("Som popup 0 falhou:", e);
        });
      }
    });
  }

  const popup1 = document.querySelector(".popup[data-index=\"1\"]");
  if (popup1) {
    popup1.addEventListener("click", function () {
      const audio = new Audio("../audios/w2.mp3");
      audio.play().catch(function (e) {
        console.warn("Som popup 1 falhou:", e);
      });
    });
  }

  const popup3 = document.querySelector(".popup[data-index=\"3\"]");
  if (popup3) {
    popup3.addEventListener("click", function () {
      const audio = new Audio("../audios/w1.mp3");
      audio.play().catch(function (e) {
        console.warn("Som popup 3 falhou:", e);
      });
    });
  }

  let vidasBombardiro = 5;
  const popupTrala = document.querySelector(".popup[data-index=\"2\"]");
  if (popupTrala) {
    popupTrala.addEventListener("click", function () {
      if (document.querySelector(".popup.bombardiro")) {
        return;
      }
      vidasBombardiro = 5;
      const bombardiro = document.createElement("video");
      bombardiro.src = "../videos/bombardiro.mp4";
      bombardiro.autoplay = true;
      bombardiro.loop = true;
      bombardiro.muted = true;
      bombardiro.playsInline = true;
      bombardiro.classList.add("popup", "shake", "bombardiro");
      bombardiro.dataset.index = "2";
      Object.assign(bombardiro.style, {
        opacity: "0",
        pointerEvents: "none",
        position: "fixed",
        top: "20vh",
        left: "50vw",
        transform: "translateY(20px)",
        width: "350px",
        zIndex: "1000"
      });
      document.querySelector(".popups").appendChild(bombardiro);
      bombardiro.addEventListener("click", function () {
        if (vidasBombardiro <= 0) {
          return;
        }
        bombardiro.style.filter =
          "brightness(0.5) sepia(1) hue-rotate(-50deg) saturate(6)";
        setTimeout(function () {
          bombardiro.style.filter = "none";
        }, 200);
        const danoAudio = new Audio("../audios/uh.mp3");
        danoAudio.play().catch(function (e) {
          console.warn("Erro som dano:", e);
        });
        vidasBombardiro -= 1;
        if (vidasBombardiro === 0) {
          const morteAudio = new Audio("../audios/slow-uh.mp3");
          morteAudio.play().catch(function (e) {
            console.warn("Erro ao tocar som de morte:", e);
          });
          bombardiro.style.transition = "opacity 1s ease";
          bombardiro.style.opacity = "0";
          setTimeout(function () {
            bombardiro.remove();
          }, 1000);
        }
      });
      const audio = new Audio("../audios/bombardiro.mp3");
      audio.play().catch(function (e) {
        console.warn("Áudio bloqueado:", e);
      });
      updatePopups();
      window.dispatchEvent(new Event("scroll"));
    });
  }

  window.addEventListener("scroll", updatePopups);
  window.addEventListener("resize", updatePopups);
});
