document.addEventListener("DOMContentLoaded", function () {
  let currentSlide = 0;
  const slides = document.querySelector(".slides");
  const dots = document.querySelectorAll(".dot");
  const totalSlides = dots.length;
  let autoSlide;

  function showSlide(index) {
    slides.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 4000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  // Iniciar o carrossel automático
  startAutoSlide();

  // Navegação por clique nos dots
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentSlide = i;
      showSlide(i);
    });
  });

  // Botões laterais
  document.getElementById("prevBtn").addEventListener("click", prevSlide);
  document.getElementById("nextBtn").addEventListener("click", nextSlide);

  // Parar ao passar o mouse
  const carousel = document.querySelector(".carousel");
  carousel.addEventListener("mouseover", stopAutoSlide);
  carousel.addEventListener("mouseout", startAutoSlide);
});
