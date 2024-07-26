document.addEventListener("DOMContentLoaded", () => {
  const carouselItems = document.querySelectorAll(".carousel-item");
  let currentSlide = 0;

  const showSlide = (n) => {
    carouselItems[currentSlide].classList.remove("active");
    currentSlide = (n + carouselItems.length) % carouselItems.length;
    carouselItems[currentSlide].classList.add("active");
  };

  const prevButton = document.querySelector('[data-bs-slide="prev"]');
  const nextButton = document.querySelector('[data-bs-slide="next"]');

  if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => {
      showSlide(currentSlide - 1);
    });

    nextButton.addEventListener("click", () => {
      showSlide(currentSlide + 1);
    });
  } else {
    console.error("Carousel navigation buttons not found.");
  }
});
