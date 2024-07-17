document.addEventListener('DOMContentLoaded', function() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentSlide = 0;
  
    function showSlide(n) {
      carouselItems[currentSlide].classList.remove('active');
      currentSlide = (n + carouselItems.length) % carouselItems.length;
      carouselItems[currentSlide].classList.add('active');
    }
  
    const prevButton = document.querySelector('[data-bs-slide="prev"]');
    const nextButton = document.querySelector('[data-bs-slide="next"]');
  
    prevButton.addEventListener('click', function() {
      showSlide(currentSlide - 1);
    });
  
    nextButton.addEventListener('click', function() {
      showSlide(currentSlide + 1);
    });
  });
  