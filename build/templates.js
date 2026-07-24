// ============================================================================
//  YRVIMAR — Componentes/plantillas HTML compartidos
// ============================================================================
const { SITE, PATHS, T, CATEGORIES } = require('./site');

// ---------- Iconos (Lucide-style, stroke) ----------
const I = {
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.11 3.22 5.11 4.52.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.02a9.4 9.4 0 01-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 01-1.44-5.01c0-5.18 4.22-9.4 9.42-9.4 2.51 0 4.88.98 6.65 2.76a9.35 9.35 0 012.75 6.65c0 5.18-4.22 9.4-9.4 9.4zM20.5 3.5A11.32 11.32 0 0012.05.01C5.8.01.73 5.08.73 11.32c0 2 .52 3.95 1.52 5.67L.6 23.4l6.55-1.72a11.3 11.3 0 005.4 1.38h.01c6.24 0 11.32-5.08 11.32-11.32 0-3.02-1.18-5.86-3.32-8z"/></svg>',
  arrowR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.5-1.1a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.4A4 4 0 1112.6 8 4 4 0 0116 11.4z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
  gauge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 14 8.5 9.5"/><path d="M3.3 15a9 9 0 1 1 17.4 0"/><circle cx="12" cy="14" r="1.2" fill="currentColor"/></svg>',
  valve: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12v9M8 21h8M4 6l8 6 8-6M4 6l8-3 8 3M4 6v4l8 5 8-5V6"/></svg>',
  coupling: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="8" width="8" height="8" rx="1"/><rect x="14" y="8" width="8" height="8" rx="1"/><path d="M10 12h4"/></svg>',
  hose: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4v6a6 6 0 0 0 6 6h4a4 4 0 0 1 4 4"/><rect x="2" y="2" width="5" height="4" rx="1"/><rect x="18" y="18" width="4" height="4" rx="1"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h1"/><path d="M14 9h4l3 3v5a1 1 0 0 1-1 1h-1"/><circle cx="6.5" cy="18.5" r="1.8"/><circle cx="17.5" cy="18.5" r="1.8"/></svg>',
  wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 1-5.3 5.3L4 17l3 3 5.4-5.4a4 4 0 0 0 5.3-5.3l-2.1 2.1-2.4-.6-.6-2.4 2.1-2.1z"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
  handshake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 0 0 1.4 0l4-4M18 13l1.5-1.5a2.1 2.1 0 0 0 0-3L15 4l-3 3H8L3 12l3 3 3-3"/><path d="m18 13-3-3"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5"/></svg>',
  chevDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
  chevLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
  chevRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
  box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8 12 3 3 8v8l9 5 9-5V8z"/><path d="m3 8 9 5 9-5M12 13v8"/></svg>',
};
const catIcon = { hose: I.hose, gauge: I.gauge, coupling: I.coupling, valve: I.valve, shield: I.shield };

// ---------- Helpers ----------
const ASSET = '/assets';
function img(name) { return `${ASSET}/img/${name}`; }
function logo(name) { return `${ASSET}/logo/${name}`; }

// URL builders (absolutas desde raíz)
const U = {
  home: (l) => `/${l}/`,
  products: (l) => `/${l}/${PATHS[l].products}.html`,
  category: (l, slug) => `/${l}/${PATHS[l].category}/${slug}.html`,
  product: (l, slug) => `/${l}/${PATHS[l].product}/${slug}.html`,
  about: (l) => `/${l}/${PATHS[l].about}.html`,
  contact: (l) => `/${l}/${PATHS[l].contact}.html`,
  blog: (l) => `/${l}/${PATHS[l].blog}.html`,
  article: (l, slug) => `/${l}/${PATHS[l].blog}/${slug}.html`,
};

function wa(text) { return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`; }
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const abs = (path) => SITE.baseUrl + path;

// ---------- <head> ----------
function head({ lang, title, desc, path, alternates, ogImage, ogType, jsonld, robots, ver, preload }) {
  const t = T[lang];
  const v = ver ? `?v=${ver}` : '';
  const other = lang === 'es' ? 'en' : 'es';
  const canonical = abs(path);
  const og = abs(ogImage || img('og-image.jpg'));
  const altLinks = [
    `<link rel="alternate" hreflang="es" href="${abs(alternates.es)}">`,
    `<link rel="alternate" hreflang="en" href="${abs(alternates.en)}">`,
    `<link rel="alternate" hreflang="x-default" href="${abs(alternates.es)}">`,
  ].join('\n  ');
  const ld = (jsonld || []).map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n  ');
  return `<!DOCTYPE html>
<html lang="${lang}" dir="${t.dir}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <meta name="robots" content="${robots || 'index, follow, max-image-preview:large'}">
  <link rel="canonical" href="${canonical}">
  ${altLinks}
  <meta name="theme-color" content="#0a0a0b">
  <meta name="author" content="${SITE.name}">
  <meta name="geo.region" content="PA">
  <meta name="geo.placename" content="Panamá">
  <!-- Open Graph -->
  <meta property="og:type" content="${ogType || 'website'}">
  <meta property="og:site_name" content="${esc(SITE.shortName)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${og}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="${t.localeTag}">
  <meta property="og:locale:alternate" content="${T[other].localeTag}">
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(desc)}">
  <meta name="twitter:image" content="${og}">
  <!-- Icons -->
  <link rel="icon" type="image/png" sizes="32x32" href="${logo('favicon-32.png')}">
  <link rel="icon" type="image/png" sizes="192x192" href="${logo('icon-192.png')}">
  <link rel="apple-touch-icon" href="${logo('apple-touch-icon.png')}">
  <link rel="manifest" href="/site.webmanifest">
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  ${preload ? `<link rel="preload" as="image" href="${preload}" fetchpriority="high">` : ''}
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${ASSET}/css/style.css${v}">
  ${ld}
</head>`;
}

// ---------- Header ----------
function header(lang, active, alternates) {
  const t = T[lang];
  const other = lang === 'es' ? 'en' : 'es';
  const n = t.nav;
  const L = lang === 'es';
  const link = (href, label, key) => `<a href="${href}"${active === key ? ' aria-current="page"' : ''}>${label}</a>`;
  const mlink = (href, label) => `<a href="${href}">${label} <span class="arw">${I.arrowR}</span></a>`;

  const megaLinks = CATEGORIES.map((c) => `<a class="mega-link" href="${U.category(lang, c.slug[lang])}">
        <span class="mi">${catIcon[c.icon] || I.box}</span>
        <span><h4>${c.name[lang]}</h4><p>${c.tagline[lang]}</p></span>
      </a>`).join('\n      ');
  const mCatLinks = CATEGORIES.map((c) => `<a href="${U.category(lang, c.slug[lang])}">${catIcon[c.icon] || I.box}<span>${c.name[lang]}</span></a>`).join('\n      ');

  return `<a class="skip-link" href="#main">${t.skipToContent}</a>
<div class="topbar">
  <div class="container">
    <div class="topbar-left">
      <a href="tel:${SITE.phoneRaw}">${I.phone}<span>${SITE.phone}</span></a>
      <span class="sep hide-sm"></span>
      <a class="hide-sm" href="mailto:${SITE.emailSales}">${I.mail}<span>${SITE.emailSales}</span></a>
      <span class="sep hide-sm"></span>
      <span class="hide-xs" style="display:inline-flex;gap:7px;align-items:center">${I.pin}<span>${SITE.city}, ${SITE.countryName[lang]}</span></span>
    </div>
    <div class="topbar-right">
      <div class="topbar-social">
        <a href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${I.ig}</a>
        <a href="${wa(L ? 'Hola YRVIMAR' : 'Hello YRVIMAR')}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.wa}</a>
      </div>
      <span class="sep"></span>
      <a href="${alternates[other]}" hreflang="${other}">${I.globe}<span>${t.langSwitchShort}</span></a>
    </div>
  </div>
</div>
<header class="site-header" id="site-header">
  <div class="container nav">
    <a class="brand" href="${U.home(lang)}" aria-label="${esc(SITE.name)}">
      <img src="${logo('yrvimar-dark.png')}" alt="${esc(SITE.name)}" width="90" height="41">
    </a>
    <nav class="nav-links" aria-label="${L ? 'Principal' : 'Main'}">
      ${link(U.home(lang), n.home, 'home')}
      <div class="nav-item">
        <button aria-haspopup="true" aria-expanded="false">${n.categories} <span class="chev">${I.chevDown}</span></button>
        <div class="mega">
          <div class="mega-grid">
      ${megaLinks}
          </div>
          <div class="mega-foot">
            <span style="font-size:.85rem;color:var(--mute)">${L ? 'Precios bajo cotización' : 'Prices upon request'}</span>
            <a href="${U.products(lang)}">${t.cta.viewCatalog} ${I.arrowR}</a>
          </div>
        </div>
      </div>
      ${link(U.products(lang), n.products, 'products')}
      ${link(U.about(lang), n.about, 'about')}
      ${link(U.blog(lang), n.blog, 'blog')}
      ${link(U.contact(lang), n.contact, 'contact')}
    </nav>
    <div class="nav-actions">
      <a class="lang-switch lang-desktop" href="${alternates[other]}" hreflang="${other}" aria-label="${t.langSwitch}">${I.globe}<span>${t.langSwitchShort}</span></a>
      <a class="btn btn--primary lang-desktop" href="${wa(L ? 'Hola YRVIMAR, quisiera cotizar productos.' : 'Hello YRVIMAR, I would like a quote.')}" target="_blank" rel="noopener">${I.wa}<span>${t.cta.quote}</span></a>
      <button class="nav-toggle" id="nav-toggle" aria-label="${L ? 'Abrir menú' : 'Open menu'}" aria-expanded="false" aria-controls="nav-mobile"><span></span></button>
    </div>
  </div>
  <div class="nav-mobile" id="nav-mobile">
    ${mlink(U.home(lang), n.home)}
    <button class="m-cat-toggle" id="m-cat-toggle" aria-expanded="false">${n.categories} <span class="chev">${I.chevDown}</span></button>
    <div class="m-cat-panel" id="m-cat-panel">
      ${mCatLinks}
    </div>
    ${mlink(U.products(lang), n.products)}
    ${mlink(U.about(lang), n.about)}
    ${mlink(U.blog(lang), n.blog)}
    ${mlink(U.contact(lang), n.contact)}
    <div class="nav-mobile-cta">
      <a class="btn btn--primary btn--block" href="${wa(L ? 'Hola YRVIMAR, quisiera cotizar productos.' : 'Hello YRVIMAR, I would like a quote.')}" target="_blank" rel="noopener">${I.wa}<span>${t.cta.quote}</span></a>
      <a class="btn btn--ghost btn--block" href="${alternates[other]}" hreflang="${other}">${I.globe}<span>${t.langSwitch}</span></a>
    </div>
  </div>
</header>`;
}

// ---------- Footer ----------
function footer(lang) {
  const t = T[lang];
  const f = t.footer;
  const catLinks = CATEGORIES.map((c) => `<li><a href="${U.category(lang, c.slug[lang])}">${c.name[lang]}</a></li>`).join('\n        ');
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <img src="${logo('yrvimar-white.png')}" alt="${esc(SITE.name)}" width="112" height="51">
        <p>${f.tagline}</p>
        <div class="footer-social">
          <a href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${I.ig}</a>
          <a href="${wa(lang === 'es' ? 'Hola YRVIMAR' : 'Hello YRVIMAR')}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.wa}</a>
          <a href="mailto:${SITE.emailSales}" aria-label="Email">${I.mail}</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>${f.catalog}</h4>
        <ul>
        ${catLinks}
        <li><a href="${U.products(lang)}">${t.cta.viewCatalog}</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>${f.company}</h4>
        <ul>
          <li><a href="${U.about(lang)}">${t.nav.about}</a></li>
          <li><a href="${U.blog(lang)}">${t.nav.blog}</a></li>
          <li><a href="${U.contact(lang)}">${t.nav.contact}</a></li>
          <li><a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>${f.contact}</h4>
        <ul>
          <li><a href="tel:${SITE.phoneRaw}">${SITE.phone}</a></li>
          <li><a href="${wa('')}" target="_blank" rel="noopener">${SITE.whatsappDisplay}</a></li>
          <li><a href="mailto:${SITE.emailSales}">${SITE.emailSales}</a></li>
          <li class="muted">${SITE.address}, ${SITE.city}</li>
          <li class="muted">${SITE.hours[lang]}</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${'2026'} ${esc(SITE.name)}. ${f.rights}</p>
      <p class="disc">${f.disclaimer}</p>
    </div>
  </div>
</footer>`;
}

// ---------- Floating widgets ----------
function widgets(lang) {
  const t = T[lang];
  const msg = lang === 'es' ? 'Hola YRVIMAR, tengo una consulta.' : 'Hello YRVIMAR, I have a question.';
  return `<a class="fab-wa" href="${wa(msg)}" target="_blank" rel="noopener" aria-label="WhatsApp">
  ${I.wa}<span class="tip">${lang === 'es' ? '¿Hablamos por WhatsApp?' : 'Chat on WhatsApp'}</span>
</a>
<button class="back-top" id="back-top" aria-label="${t.backToTop}">${I.arrowUp}</button>`;
}

// ---------- Cards ----------
function productCard(p, lang) {
  const cat = CATEGORIES.find((c) => c.id === p.cat);
  const url = U.product(lang, p.slug[lang]);
  const msg = (lang === 'es' ? `Hola YRVIMAR, me interesa: ${p.name.es}. ¿Me pueden dar más información?` : `Hello YRVIMAR, I'm interested in: ${p.name.en}. Could you send more info?`);
  return `<article class="prod-card">
  <div class="prod-card__media">
    <span class="prod-card__tag">${cat.name[lang]}</span>
    ${p.featured ? `<span class="prod-card__star">${I.star}</span>` : ''}
    <img src="${img(p.image)}" alt="${esc(p.name[lang])}" loading="lazy" width="600" height="600">
  </div>
  <div class="prod-card__body">
    <h3>${p.name[lang]}</h3>
    <p>${p.short[lang]}</p>
    <div class="prod-card__foot">
      <span class="view">${T[lang].cta.viewProduct} <span class="arw">${I.arrowR}</span></span>
      <a class="prod-card__wa" href="${wa(msg)}" target="_blank" rel="noopener" aria-label="WhatsApp — ${esc(p.name[lang])}" onclick="event.stopPropagation()">${I.wa}</a>
    </div>
  </div>
  <a class="prod-card__link" href="${url}" aria-label="${esc(p.name[lang])}"></a>
</article>`;
}

function categoryCard(c, lang, idx) {
  const url = U.category(lang, c.slug[lang]);
  return `<a class="cat-card${idx === 0 ? ' cat-card--wide' : ''}" href="${url}">
  <div class="cat-card__img"><img src="${img(c.image)}" alt="${esc(c.name[lang])}" loading="lazy" width="800" height="600"></div>
  <span class="idx">0${idx + 1} / ${String(CATEGORIES.length).padStart(2, '0')}</span>
  <div class="ic">${catIcon[c.icon] || I.box}</div>
  <h3>${c.name[lang]}</h3>
  <div class="tl">${c.tagline[lang]}</div>
  <span class="go">${T[lang].cta.explore} <span class="arw">${I.arrowR}</span></span>
</a>`;
}

function postCard(a, lang, feat) {
  const cat = CATEGORIES.find((c) => c.id === a.cat);
  const url = U.article(lang, a.slug[lang]);
  const dateStr = fmtDate(a.date, lang);
  return `<article class="post-card${feat ? ' post-card--feat' : ''}">
  <div class="post-card__media"><img src="${img(a.image)}" alt="${esc(a.title[lang])}" loading="lazy" width="800" height="500"></div>
  <div class="post-card__body">
    <div class="post-meta"><span class="cat">${cat ? cat.name[lang] : ''}</span><span>${dateStr}</span><span>${a.readMin} ${T[lang].words.min}</span></div>
    <h3>${a.title[lang]}</h3>
    <p>${a.excerpt[lang]}</p>
    <div class="post-card__foot"><span class="textlink">${T[lang].cta.readMore} <span class="arw">${I.arrowR}</span></span></div>
  </div>
  <a class="post-card__link" href="${url}" aria-label="${esc(a.title[lang])}"></a>
</article>`;
}

function fmtDate(iso, lang) {
  const [y, m, d] = iso.split('-').map(Number);
  const months = {
    es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  };
  return lang === 'es' ? `${d} ${months.es[m - 1]} ${y}` : `${months.en[m - 1]} ${d}, ${y}`;
}

// ---------- Section head ----------
function sectionHead({ num, eyebrow, title, lead, split }) {
  return `<div class="section-head${split ? ' section-head--split' : ''}">
    <div>
      <span class="eyebrow" data-num="${num}"><span class="tick"></span>${eyebrow}</span>
      <h2>${title}</h2>
      ${lead ? `<p class="lead">${lead}</p>` : ''}
    </div>
    ${split || ''}
  </div>`;
}

module.exports = { I, catIcon, ASSET, img, logo, U, wa, esc, abs, head, header, footer, widgets, productCard, categoryCard, postCard, fmtDate, sectionHead };
