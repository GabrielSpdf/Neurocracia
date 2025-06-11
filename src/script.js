document.addEventListener("DOMContentLoaded", function () {
  console.log("Página carregada com sucesso!");

  let currentSlide = 0;
  const slides = document.querySelector(".slides");
  const dots = document.querySelectorAll(".dot");
  const totalSlides = dots.length;

  function showSlide(index) {
    slides.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }
 
  const autoSlide = setInterval(nextSlide, 4000);

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentSlide = i;
      showSlide(i);
    });
  });
});
