(function () {
  "use strict";
  var $ = function (s) { return document.querySelector(s); };

  /* ---------- Mobile hamburger menu ---------- */
  var mbtn = $("#menuBtn"), nav = $("#nav");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    mbtn.setAttribute("aria-expanded", open ? "true" : "false");
    mbtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  if (mbtn && nav) {
    mbtn.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
    nav.addEventListener("click", function (e) { if (e.target.tagName === "A") setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
    window.matchMedia("(min-width: 701px)").addEventListener("change", function () { setMenu(false); });
  }

  /* ---------- Typing animation for the hero name ---------- */
  var typed = $("#typed");
  if (typed) {
    var full = typed.textContent;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      /* ghost copy reserves the final size so the layout never jumps */
      var wrap = document.createElement("span");
      wrap.className = "type-wrap";
      var ghost = document.createElement("span");
      ghost.className = "type-ghost";
      ghost.setAttribute("aria-hidden", "true");
      ghost.textContent = full;
      typed.parentNode.insertBefore(wrap, typed);
      wrap.appendChild(ghost);
      wrap.appendChild(typed);
      typed.classList.add("typed", "on");
      typed.textContent = "";
      var i = 0;
      (function tick() {
        typed.textContent = full.slice(0, ++i);
        if (i < full.length) setTimeout(tick, 70 + Math.random() * 70);
      })();
    }
  }

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
