

// stuff for previews n shit

document.addEventListener("DOMContentLoaded", () => {
    const previews = document.querySelectorAll(".preview-btn");

    previews.forEach(btn => {
        let audio = new Audio(btn.dataset.audio);
        let isPlaying = false;

        btn.addEventListener("click", () => {
            if (!isPlaying) {
                btn.classList.add("loading");
                audio.play().then(() => {
                    btn.classList.remove("loading");
                    btn.classList.add("playing");
                    isPlaying = true;
                });

                audio.addEventListener("ended", () => {
                    btn.classList.remove("playing");
                    isPlaying = false;
                });

            } else {
                audio.pause();
                audio.currentTime = 0;
                btn.classList.remove("playing");
                isPlaying = false;
            }
        });
    });
});

// Carrousel script, hello world

const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const dotsContainer = document.querySelector(".carousel-dots");

let index = 0;

slides.forEach((_, i) => {
  const dot = document.createElement("div");
  if (i === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);
});

const dots = Array.from(dotsContainer.children);

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

function nextSlide() {
  index = (index + 1) % slides.length;
  updateCarousel();
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    index = i;
    updateCarousel();
  });
});

setInterval(nextSlide, 4000);
