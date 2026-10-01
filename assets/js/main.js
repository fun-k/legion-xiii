(function () {
  "use strict";

  /* Mobile navigation */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function setNav(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setNav(false);
    });
  }

  /* Header shadow once the page scrolls */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Reveal on scroll */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  }

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Loading splash: shown once per browser session */
  var loader = document.getElementById("loader");
  if (loader) {
    if (document.documentElement.classList.contains("no-splash") || reduceMotion) {
      loader.remove();
    } else {
      var splashStart = Date.now();
      var splashDone = false;
      var hideSplash = function () {
        if (splashDone) return;
        splashDone = true;
        loader.classList.add("fade-out");
        try { sessionStorage.setItem("l13-splash", "1"); } catch (e) {}
        setTimeout(function () { loader.remove(); }, 1000);
      };
      var scheduleHide = function () {
        setTimeout(hideSplash, Math.max(0, 1600 - (Date.now() - splashStart)));
      };
      if (document.readyState === "complete") scheduleHide();
      else window.addEventListener("load", scheduleHide);
      setTimeout(hideSplash, 4000); /* failsafe if a font or frame is slow */
    }
  }

  /* Footer year */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* Roster embed (roster.html only) */
  var frame = document.getElementById("roster-frame");
  if (frame) {
    var cfg = window.LEGION_CONFIG || {};
    var empty = document.getElementById("ledger-empty");
    var open = document.getElementById("roster-open");

    if (cfg.rosterEmbedUrl) {
      frame.src = cfg.rosterEmbedUrl;
      frame.hidden = false;
      if (empty) empty.hidden = true;
    }
    if (open && cfg.rosterOpenUrl) {
      open.href = cfg.rosterOpenUrl;
      open.hidden = false;
      var foot = document.getElementById("ledger-foot");
      if (foot) foot.hidden = false;
    }
  }
})();
