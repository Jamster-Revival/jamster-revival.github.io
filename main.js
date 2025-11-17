document.addEventListener("DOMContentLoaded", () => {
  const products = Array.from(document.querySelectorAll(".product"));
  const perPage = 10;
  const pages = Math.ceil(products.length / perPage);

  const pagination = document.querySelector(".pagination");

  function showPage(page) {
    const start = (page - 1) * perPage;
    const end = page * perPage;

    products.forEach((p, i) => {
      if (i >= start && i < end) {
        p.classList.remove("is-hidden");
      } else {
        p.classList.add("is-hidden");
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
});
