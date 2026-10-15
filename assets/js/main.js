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

  /* The oath modal (index.html): a native <dialog>, so Escape, focus trapping and
     returning focus to the button are handled by the browser */
  var oathBtn = document.querySelector("[data-open-oath]");
  var oathDialog = document.getElementById("oath-modal");
  if (oathBtn && oathDialog && typeof oathDialog.showModal === "function") {
    oathBtn.addEventListener("click", function () { oathDialog.showModal(); });
    oathDialog.addEventListener("click", function (e) {
      if (e.target === oathDialog) oathDialog.close(); /* click on the dimmed backdrop */
    });
    oathDialog.querySelectorAll("[data-close]").forEach(function (b) {
      b.addEventListener("click", function () { oathDialog.close(); });
    });
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
