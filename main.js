// page stuff ok

document.addEventListener("DOMContentLoaded", () => {
  const products = Array.from(document.querySelectorAll(".product"));
  const perPage = 10;
  const pages = Math.ceil(products.length / perPage);

  const pagination = document.querySelector(".pagination");
  const searchInput = document.getElementById("searchInput");

  function showPage(page) {
    const start = (page - 1) * perPage;
    const end = page * perPage;

    products.forEach((p, i) => {
      if (i >= start && i < end) {
        p.classList.remove("is-hidden");
        p.style.display = "flex";
      } else {
        p.classList.add("is-hidden");
        p.style.display = "none";
      }
    });

    pagination.querySelectorAll(".page").forEach((btn, i) => {
      btn.classList.toggle("active", i + 1 === page);
    });
  }

  showPage(1);

  pagination.addEventListener("click", (e) => {
    const btn = e.target.closest(".page");
    if (!btn) return;
    e.preventDefault();
    const page = Array.from(pagination.querySelectorAll(".page")).indexOf(btn) + 1;
    showPage(page);
  });

// search bar stuff ok

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const isSearching = query.length > 0;

    products.forEach(product => {
      const title = product.querySelector("h3").textContent.toLowerCase();
      const artist = product.querySelector("p").textContent.toLowerCase();
      const match = title.includes(query) || artist.includes(query);

      if (isSearching) {
        product.classList.remove("is-hidden");
        product.style.display = match ? "flex" : "none";
      } else {
        product.style.display = "flex";
      }
    });

    pagination.style.display = isSearching ? "none" : "flex";

    if (!isSearching) {
      showPage(1);
    }
  });
});


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
