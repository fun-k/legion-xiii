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

  /* Drifting embers */
  if (!reduceMotion) {
    var canvas = document.createElement("canvas");
    canvas.id = "ember-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);

    var ctx = canvas.getContext("2d");
    var W = 0, H = 0, embers = [], raf = 0;

    var spawn = function (anywhere) {
      return {
        x: Math.random() * W,
        y: anywhere ? Math.random() * H : H + 12,
        r: Math.random() * 1.6 + 0.6,
        vy: -(Math.random() * 0.45 + 0.2),
        vx: (Math.random() - 0.5) * 0.2,
        phase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.5 + 0.3,
        hue: Math.random() < 0.6 ? 20 : 6
      };
    };

    var resize = function () {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.round(Math.min(60, Math.max(22, W / 24)));
      while (embers.length < count) embers.push(spawn(true));
      embers.length = count;
    };

    var tick = function () {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < embers.length; i++) {
        var p = embers[i];
        p.phase += 0.02;
        p.x += p.vx + Math.sin(p.phase) * 0.25;
        p.y += p.vy;
        if (p.y < -12) { embers[i] = spawn(false); continue; }
        var a = p.alpha * Math.min(1, p.y / (H * 0.35)) * (0.7 + 0.3 * Math.sin(p.phase * 2));
        ctx.fillStyle = "hsla(" + p.hue + ", 95%, 55%, " + (a * 0.18).toFixed(3) + ")";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.2, 0, 6.2832); ctx.fill();
        ctx.fillStyle = "hsla(" + p.hue + ", 95%, 62%, " + a.toFixed(3) + ")";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", function () {
      cancelAnimationFrame(raf);
      if (!document.hidden) tick();
    });
    tick();
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
    }
  }
})();
