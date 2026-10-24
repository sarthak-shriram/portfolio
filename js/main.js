(function () {
  "use strict";
  var $ = function (s) { return document.querySelector(s); };
  var root = document.documentElement;

  /* ---------- Theme toggle (remembers choice) ---------- */
  var tbtn = $("#theme");
  var dq = window.matchMedia("(prefers-color-scheme: dark)");
  function effective() { return root.dataset.theme || (dq.matches ? "dark" : "light"); }
  function paint() { tbtn.textContent = effective() === "dark" ? "Light mode" : "Dark mode"; }
  tbtn.addEventListener("click", function () {
    var next = effective() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    paint();
  });
  if (dq.addEventListener) dq.addEventListener("change", paint);
  paint();

  /* ---------- Footer year ---------- */
  var yr = $("#year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Months at Accenture (auto-updates) ---------- */
  var m = $("#months");
  if (m && m.dataset.start) {
    var s = new Date(m.dataset.start), n = new Date();
    var months = (n.getFullYear() - s.getFullYear()) * 12 + (n.getMonth() - s.getMonth());
    if (n.getDate() < s.getDate()) months--;
    if (months >= 1) m.textContent = months + "+";
  }

  /* ---------- Highlight current section in nav ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".top nav a"));
  var map = {};
  links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove("active"); a.removeAttribute("aria-current"); });
        var a = map[e.target.id];
        if (a) { a.classList.add("active"); a.setAttribute("aria-current", "true"); }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  /* ---------- Back-to-top button ---------- */
  var up = $("#toTop");
  function toggleUp() { up.hidden = window.scrollY < 600; }
  window.addEventListener("scroll", toggleUp, { passive: true });
  up.addEventListener("click", function () { window.scrollTo({ top: 0 }); });
  toggleUp();
})();
