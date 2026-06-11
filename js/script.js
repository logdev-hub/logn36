(function () {
  function initSearch() {
    document.querySelectorAll("[data-search-target]").forEach(function (input) {
      var selector = input.getAttribute("data-search-target");
      input.addEventListener("input", function () {
        var value = input.value.trim().toLowerCase();
        document.querySelectorAll(selector).forEach(function (item) {
          item.classList.toggle("hidden-by-search", value && !item.textContent.toLowerCase().includes(value));
        });
      });
    });
  }
  function initButtons() {
    document.querySelectorAll("[data-toggle-sidebar]").forEach(function (btn) {
      btn.addEventListener("click", function () { document.body.classList.toggle("sidebar-open"); });
    });
    document.querySelectorAll("[data-print]").forEach(function (btn) {
      btn.addEventListener("click", function () { window.print(); });
    });
  }
  function initSlides() {
    var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
    if (!slides.length) return;
    var counter = document.querySelector("[data-slide-counter]");
    var current = 0;
    function show(index) {
      current = Math.max(0, Math.min(slides.length - 1, index));
      slides.forEach(function (slide, i) { slide.classList.toggle("active", i === current); });
      if (counter) counter.textContent = (current + 1) + " / " + slides.length;
    }
    document.addEventListener("keydown", function (event) {
      if (event.key === "ArrowRight" || event.key === "PageDown") show(current + 1);
      if (event.key === "ArrowLeft" || event.key === "PageUp") show(current - 1);
      if (event.key === "Home") show(0);
      if (event.key === "End") show(slides.length - 1);
    });
    slides.forEach(function (slide) { slide.addEventListener("click", function () { show(current + 1); }); });
    show(0);
  }
  function initCharts() {
    if (!window.dashboardData || !window.Chart) return;
    var data = window.dashboardData;
    var bar = document.getElementById("barChart");
    var line = document.getElementById("lineChart");
    if (bar) {
      new Chart(bar, {
        type: "bar",
        data: { labels: data.labels, datasets: [{ label: "Indicador", data: data.values, backgroundColor: ["#004C94", "#F7941D", "#2f9e44", "#FDC180", "#d9480f"] }] },
        options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
      });
    }
    if (line) {
      new Chart(line, {
        type: "line",
        data: { labels: ["S-4", "S-3", "S-2", "S-1", "Atual"], datasets: [{ label: "Acuracidade", data: data.trend, borderColor: "#F7941D", backgroundColor: "rgba(247,148,29,.18)", fill: true, tension: .35 }] },
        options: { responsive: true, scales: { y: { min: 80, max: 100 } } }
      });
    }
  }
  document.addEventListener("DOMContentLoaded", function () {
    initSearch();
    initButtons();
    initSlides();
    initCharts();
    if (window.bootstrap) {
      document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function (el) { new bootstrap.Tooltip(el); });
    }
  });
})();
