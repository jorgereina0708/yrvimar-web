/* ==========================================================================
   YRVIMAR — main.js  (interacción + animación)
   Sin dependencias obligatorias. Mejora progresiva con GSAP si está presente.
   ========================================================================== */
(function () {
  'use strict';
  var doc = document;
  var body = doc.body;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header scroll ---------- */
  var header = doc.getElementById('site-header');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 24);
    var bt = doc.getElementById('back-top');
    if (bt) bt.classList.toggle('show', window.scrollY > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  var toggle = doc.getElementById('nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    doc.querySelectorAll('#nav-mobile a').forEach(function (a) {
      a.addEventListener('click', function () {
        body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Back to top ---------- */
  var backTop = doc.getElementById('back-top');
  if (backTop) {
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Catalog filters ---------- */
  var filters = doc.getElementById('filters');
  if (filters) {
    var items = Array.prototype.slice.call(doc.querySelectorAll('#catalog-grid .prod-item'));
    var countEl = doc.getElementById('catalog-count');
    var countTpl = countEl ? countEl.textContent.replace(/^\d+/, '{n}') : '';
    filters.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filters.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      var shown = 0;
      items.forEach(function (it) {
        var match = f === 'all' || it.getAttribute('data-cat') === f;
        it.style.display = match ? '' : 'none';
        if (match) shown++;
      });
      if (countEl) countEl.textContent = countTpl.replace('{n}', shown);
    });
  }

  /* ---------- Contact form -> WhatsApp ---------- */
  var form = doc.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var lang = form.getAttribute('data-lang') || 'es';
      var name = (form.querySelector('[name=name]') || {}).value || '';
      var topic = (form.querySelector('[name=topic]') || {}).value || '';
      var msg = (form.querySelector('[name=message]') || {}).value || '';
      var text = lang === 'es'
        ? 'Hola YRVIMAR, soy ' + name + '.\n' + (topic ? 'Producto de interés: ' + topic + '.\n' : '') + 'Mensaje: ' + msg
        : 'Hello YRVIMAR, I am ' + name + '.\n' + (topic ? 'Product of interest: ' + topic + '.\n' : '') + 'Message: ' + msg;
      var url = 'https://wa.me/50768550933?text=' + encodeURIComponent(text);
      window.open(url, '_blank', 'noopener');
    });
  }

  /* ---------- Reveal on scroll (IntersectionObserver) ---------- */
  function setupReveal() {
    var singles = doc.querySelectorAll('[data-reveal]');
    var groups = doc.querySelectorAll('[data-reveal-stagger]');
    // stagger delays for children
    groups.forEach(function (g) {
      var kids = g.children;
      for (var i = 0; i < kids.length; i++) {
        kids[i].style.transitionDelay = Math.min(i * 0.07, 0.6) + 's';
      }
    });
    if (reduce || !('IntersectionObserver' in window)) {
      singles.forEach(function (el) { el.classList.add('in'); });
      groups.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    singles.forEach(function (el) { io.observe(el); });
    groups.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Hero entrance (GSAP if available) ---------- */
  var heroDone = false;
  function setupHero() {
    if (heroDone || reduce || !window.gsap) return;
    heroDone = true;
    var g = window.gsap;
    var tl = g.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.6 })
      .from('.hero h1', { y: 34, opacity: 0, duration: 0.9 }, '-=0.3')
      .from('.hero-sub', { y: 24, opacity: 0, duration: 0.7 }, '-=0.55')
      .from('.hero-cta > *', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.4')
      .from('.hero-meta .item', { y: 18, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.3')
      .from('.hero-visual .frame', { scale: 0.92, opacity: 0, duration: 1 }, '-=0.9')
      .from('.hero-chip', { y: 16, opacity: 0, duration: 0.5, stagger: 0.12 }, '-=0.4');

    // subtle parallax on hero visual
    if (window.ScrollTrigger) {
      g.registerPlugin(window.ScrollTrigger);
      g.to('.hero-visual', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      g.to('.hero-orbit', { rotation: 12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    }
  }

  /* ---------- Magnetic buttons ---------- */
  function setupMagnetic() {
    if (reduce || !window.matchMedia('(pointer:fine)').matches) return;
    doc.querySelectorAll('.btn--primary').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = 'translate(' + x * 0.12 + 'px,' + (y * 0.18 - 2) + 'px)';
      });
      btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
    });
  }

  /* ---------- Init ---------- */
  function init() { setupReveal(); setupHero(); setupMagnetic(); }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();
  // hero may need gsap which loads deferred; re-attempt after load
  window.addEventListener('load', function () { setupHero(); });
})();
