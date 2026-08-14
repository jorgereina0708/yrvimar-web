// ============================================================================
//  YRVIMAR — Generador estático bilingüe
//  node build/build.js  ->  genera /dist
// ============================================================================
const fs = require('fs');
const path = require('path');
const { SITE, LANGS, DEFAULT_LANG, PATHS, T, CATEGORIES, PRODUCTS, BRANDS, PROJECTS } = require('./site');
const { ARTICLES } = require('./articles');
const Tpl = require('./templates');
const { I, catIcon, img, logo, U, wa, esc, abs, head, header, footer, widgets, productCard, categoryCard, mainCatTile, postCard, fmtDate, sectionHead } = Tpl;

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const STATIC = path.join(ROOT, 'static');

// ---------- utilidades de archivo ----------
function rmrf(p) { if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true }); }
function ensure(dir) { fs.mkdirSync(dir, { recursive: true }); }
function write(rel, content) {
  const full = path.join(DIST, rel);
  ensure(path.dirname(full));
  fs.writeFileSync(full, content);
}
function copyDir(src, dest) {
  ensure(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

// ---------- versión de assets (cache-busting) ----------
const VER = Date.now().toString(36);

// ---------- shell ----------
function shell({ lang, active, meta, main }) {
  meta.ver = VER;
  return `${head(meta)}
<body>
${header(lang, active, meta.alternates)}
<main id="main">
${main}
</main>
${footer(lang)}
${widgets(lang)}
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
<script src="/assets/js/main.js?v=${VER}" defer></script>
</body>
</html>`;
}

// ---------- JSON-LD ----------
// ---------- Meta description: corta por palabra, nunca a media palabra ----------
function clampDesc(text, max = 158) {
  const s = String(text).replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 60 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:\s]+$/, '') + '…';
}

// Añade el sufijo de marca solo si el título no se pasa del límite de SERP
function clampTitle(base, suffix = ' | YRVIMAR', max = 60) {
  const b = String(base).trim();
  if (b.length + suffix.length <= max) return b + suffix;
  if (b.length <= max) return b;
  const cut = b.slice(0, max - 1);
  const sp = cut.lastIndexOf(' ');
  return (sp > 30 ? cut.slice(0, sp) : cut) + '…';
}

// Fecha real de build (para lastmod del sitemap y llms.txt)
const BUILD_DATE = new Date().toISOString().slice(0, 10);

const ORG_ID = `${SITE.baseUrl}/#organization`;
const AREA_SERVED = { '@type': 'Country', name: SITE.countryName.es };
const OPENING_HOURS = [
  { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' },
  { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '08:00', closes: '12:00' },
];
const CONTACT_POINTS = [
  { '@type': 'ContactPoint', telephone: SITE.phone, contactType: 'sales', areaServed: SITE.country, availableLanguage: ['es', 'en'] },
  { '@type': 'ContactPoint', telephone: `+${SITE.whatsapp}`, contactType: 'customer support', contactOption: 'TollFree', areaServed: SITE.country, availableLanguage: ['es', 'en'] },
];
function ldOrg() {
  return {
    '@context': 'https://schema.org', '@type': 'Organization', '@id': ORG_ID,
    name: SITE.name, alternateName: SITE.shortName, url: SITE.baseUrl,
    logo: { '@type': 'ImageObject', url: abs(logo('icon-512.png')), width: 512, height: 512 },
    image: abs(img('og-image.jpg')),
    email: SITE.emailSales, telephone: SITE.phone,
    areaServed: AREA_SERVED, contactPoint: CONTACT_POINTS,
    sameAs: [SITE.instagram, SITE.facebook],
    address: { '@type': 'PostalAddress', streetAddress: SITE.address, addressLocality: SITE.city, addressRegion: SITE.region, addressCountry: SITE.country },
  };
}
function ldWebsite(lang) {
  return { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.baseUrl, inLanguage: lang };
}
function ldBreadcrumb(items) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.url) })),
  };
}
function ldProduct(p, lang) {
  const cat = CATEGORIES.find((c) => c.id === p.cat);
  return {
    '@context': 'https://schema.org', '@type': 'Product',
    name: p.name[lang], description: p.short[lang], image: abs(img(p.image || 'og-image.jpg')),
    category: cat.name[lang], sku: p.id.toUpperCase(),
    brand: { '@type': 'Brand', name: SITE.shortName },
    manufacturer: { '@type': 'Organization', name: SITE.name },
  };
}
function ldArticle(a, lang) {
  return {
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: a.title[lang], description: a.excerpt[lang], image: [abs(img(a.image))],
    datePublished: a.date, dateModified: a.date, inLanguage: lang,
    author: { '@type': 'Organization', '@id': ORG_ID, name: lang === 'es' ? 'Equipo Técnico YRVIMAR' : 'YRVIMAR Technical Team', url: abs(U.about(lang)) },
    publisher: { '@type': 'Organization', '@id': ORG_ID, name: SITE.name, logo: { '@type': 'ImageObject', url: abs(logo('icon-512.png')) } },
    mainEntityOfPage: abs(U.article(lang, a.slug[lang])),
    keywords: a.keywords[lang],
  };
}
function ldLocalBusiness(lang) {
  return {
    '@context': 'https://schema.org', '@type': 'Store', '@id': ORG_ID,
    name: SITE.name, alternateName: SITE.shortName,
    image: abs(img('about-warehouse.webp')), url: SITE.baseUrl,
    logo: abs(logo('icon-512.png')),
    telephone: SITE.phone, email: SITE.emailSales, priceRange: '$$',
    address: { '@type': 'PostalAddress', streetAddress: SITE.address, addressLocality: SITE.city, addressRegion: SITE.region, addressCountry: SITE.country },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    hasMap: SITE.mapUrl,
    areaServed: AREA_SERVED,
    contactPoint: CONTACT_POINTS,
    openingHoursSpecification: OPENING_HOURS,
    sameAs: [SITE.instagram, SITE.facebook],
  };
}

// ---------- alternates helper ----------
function alts(esPath, enPath) { return { es: esPath, en: enPath }; }

// ============================================================================
//  PÁGINA: HOME
// ============================================================================
const HOME_COPY = {
  es: {
    eyebrow: 'Suministros industriales · Panamá',
    h1a: 'Soluciones industriales que ', h1b: 'no se detienen', h1c: '.',
    sub: 'Mangueras, conexiones, válvulas y accesorios de alta calidad, con asesoría técnica y existencias locales para mantener tu operación siempre en marcha.',
    chipA: 'En inventario local', chipAsub: 'Listo para despacho',
    chipB: 'Asesoría técnica', chipBsub: 'Te ayudamos a elegir',
    catEye: 'Categorías', catTitle: 'Todo para tu línea, en un solo lugar', catLead: 'Siete líneas de producto que cubren la conducción de fluidos de principio a fin.',
    prodEye: 'Destacados', prodTitle: 'Productos más solicitados', prodLead: 'Una selección de lo que más mueve la industria panameña.',
    whyEye: 'Por qué YRVIMAR', whyTitle: 'Confiabilidad que se nota en cada conexión',
    whyItems: ['Productos de alta calidad respaldados por marcas nacionales e internacionales.', 'Asesoría técnica real: te ayudamos a identificar medida, norma y compatibilidad.', 'Existencias locales que reducen tus tiempos de paro de días a horas.', 'Ensamblaje de mangueras hidráulicas a la medida de tu equipo.'],
    stats: [['Desde', '2019', 'Sirviendo a la industria'], ['+', '500', 'Referencias en catálogo'], ['', '7', 'Líneas de producto'], ['', 'Nacional', 'Envíos a todo Panamá']],
    blogEye: 'Blog técnico', blogTitle: 'Guías y consejos de la industria', blogLead: 'Contenido práctico para elegir y mantener tus componentes.',
    ctaTitle: 'Cuéntanos qué necesitas y te cotizamos hoy', ctaP: 'Escríbenos por WhatsApp con la medida, norma o foto de tu componente. Nuestro equipo te responde con la solución correcta.',
  },
  en: {
    eyebrow: 'Industrial supplies · Panama',
    h1a: 'Industrial solutions that ', h1b: "don't stop", h1c: '.',
    sub: 'High-quality hoses, fittings, valves and accessories, with technical advice and local stock to keep your operation always running.',
    chipA: 'In local stock', chipAsub: 'Ready to ship',
    chipB: 'Technical advice', chipBsub: 'We help you choose',
    catEye: 'Categories', catTitle: 'Everything for your line, in one place', catLead: 'Seven product lines covering fluid handling from end to end.',
    prodEye: 'Featured', prodTitle: 'Most requested products', prodLead: 'A selection of what moves Panamanian industry the most.',
    whyEye: 'Why YRVIMAR', whyTitle: 'Reliability you feel in every connection',
    whyItems: ['High-quality products backed by national and international brands.', 'Real technical advice: we help you identify size, standard and compatibility.', 'Local stock that cuts your downtime from days to hours.', 'Custom hydraulic hose assembly to fit your equipment.'],
    stats: [['Since', '2019', 'Serving the industry'], ['+', '500', 'Catalog references'], ['', '7', 'Product lines'], ['', 'Nationwide', 'Shipping across Panama']],
    blogEye: 'Technical blog', blogTitle: 'Industry guides and tips', blogLead: 'Practical content to choose and maintain your components.',
    ctaTitle: 'Tell us what you need and we quote you today', ctaP: 'Message us on WhatsApp with the size, standard or a photo of your component. Our team replies with the right solution.',
  },
};

function pageHome(lang) {
  const t = T[lang]; const c = HOME_COPY[lang];
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8);
  const latest = ARTICLES.slice(0, 3);
  const marqueeItems = [...CATEGORIES.map((x) => x.name[lang]), lang === 'es' ? 'Envíos a todo Panamá' : 'Shipping across Panama', 'SAE 100 R2', '1000 WOG', 'Camlock', 'Chicago'];
  const marquee = marqueeItems.concat(marqueeItems).map((m) => `<span class="marquee-item"><span>${m}</span></span>`).join('');

  const L = lang === 'es';
  const catBy = (id) => CATEGORIES.find((x) => x.id === id);
  const heroSlides = [
    { img: 'banner-1.webp', eye: c.eyebrow,
      h1: `${c.h1a}<span class="gold">${c.h1b}</span>${c.h1c}`, p: c.sub,
      c1: { href: U.products(lang), label: t.cta.viewCatalog, cls: 'btn--primary' }, c2: { wa: true, label: t.cta.quote } },
    { img: 'banner-2.webp', eye: L ? 'Conexiones · Válvulas · Acoples' : 'Fittings · Valves · Couplings',
      h1: L ? `Conexiones y válvulas para <span class="gold">cada estándar</span>.` : `Fittings and valves for <span class="gold">every standard</span>.`,
      p: L ? 'Bronce, acero inoxidable y aluminio: Camlock, Chicago, JIC, NPT y válvulas de bola 1000 WOG.' : 'Brass, stainless steel and aluminum: Camlock, Chicago, JIC, NPT and 1000 WOG ball valves.',
      c1: { href: U.category(lang, catBy('conexiones-industriales').slug[lang]), label: t.cta.explore, cls: 'btn--primary' }, c2: { wa: true, label: t.cta.quote } },
    { img: 'banner-3.webp', eye: L ? 'Existencias locales · Panamá' : 'Local stock · Panama',
      h1: L ? `Tu operación, <span class="gold">siempre abastecida</span>.` : `Your operation, <span class="gold">always supplied</span>.`,
      p: L ? 'Inventario local y asesoría técnica para reducir tus tiempos de paro de días a horas.' : 'Local inventory and technical advice to cut your downtime from days to hours.',
      c1: { href: U.about(lang), label: t.nav.about, cls: 'btn--primary' }, c2: { href: U.contact(lang), label: t.cta.contactUs } },
    { img: 'hero-servicio.webp', pos: 'center 40%', eye: L ? 'Servicio en terreno' : 'Field service',
      h1: L ? `Un equipo que <span class="gold">conoce tu operación</span>.` : `A team that <span class="gold">knows your operation</span>.`,
      p: L ? 'Asesoría técnica y ensamblaje a la medida, respaldando tu producción día a día.' : 'Technical advice and custom assembly, backing your production day after day.',
      c1: { href: U.about(lang), label: t.nav.about, cls: 'btn--primary' }, c2: { wa: true, label: t.cta.quote } },
  ];
  const slideHtml = heroSlides.map((s, i) => `
    <div class="slide${i === 0 ? ' active' : ''}" data-slide="${i}">
      <div class="slide__img"><img src="${img(s.img)}" alt="" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}${s.pos ? ` style="object-position:${s.pos}"` : ''} width="1600" height="900"></div>
      <div class="container"><div class="slide__content">
        <span class="eyebrow" data-num=""><span class="tick"></span>${s.eye}</span>
        ${i === 0 ? `<h1>${s.h1}</h1>` : `<h2 class="slide-title">${s.h1}</h2>`}
        <p>${s.p}</p>
        <div class="slide__cta">
          <a class="btn ${s.c1.cls} btn--lg" href="${s.c1.href}">${s.c1.label} ${I.arrowR}</a>
          ${s.c2.wa
            ? `<a class="btn btn--wa btn--lg" href="${wa(L ? 'Hola YRVIMAR, quisiera cotizar.' : 'Hello YRVIMAR, I would like a quote.')}" target="_blank" rel="noopener">${I.wa} ${s.c2.label}</a>`
            : `<a class="btn btn--ghost-light btn--lg" href="${s.c2.href}">${s.c2.label} ${I.arrowR}</a>`}
        </div>
      </div></div>
    </div>`).join('');

  const main = `
<section class="hero">
  <div class="hero-carousel" id="hero-carousel" aria-roledescription="carousel">
    ${slideHtml}
    <button class="carousel-arrow prev" id="hero-prev" aria-label="${L ? 'Anterior' : 'Previous'}">${I.chevLeft}</button>
    <button class="carousel-arrow next" id="hero-next" aria-label="${L ? 'Siguiente' : 'Next'}">${I.chevRight}</button>
    <div class="carousel-dots" id="hero-dots">
      ${heroSlides.map((_, i) => `<button data-dot="${i}" class="${i === 0 ? 'active' : ''}" aria-label="${L ? 'Ir al banner' : 'Go to slide'} ${i + 1}"></button>`).join('')}
    </div>
  </div>
</section>

<div class="cat-strip"><div class="container"><div class="inner">
  ${CATEGORIES.map((cat) => `<a href="${U.category(lang, cat.slug[lang])}"><span class="ic">${catIcon[cat.icon] || I.box}</span><span class="lb">${cat.name[lang]}</span></a>`).join('\n  ')}
</div></div></div>

<div class="marquee" aria-hidden="true"><div class="marquee-track">${marquee}</div></div>

<section class="section" id="categorias">
  <div class="container">
    ${sectionHead({ num: '01', eyebrow: c.catEye, title: c.catTitle, split: `<a class="btn btn--dark" href="${U.products(lang)}">${t.cta.viewAll} ${I.arrowR}</a>` })}
    <div class="maincat-grid" data-reveal-stagger>
      ${CATEGORIES.map((cat, i) => mainCatTile(cat, lang, i, i === 0)).join('\n      ')}
    </div>
  </div>
</section>

<section class="section bg-soft">
  <div class="container">
    ${sectionHead({ num: '02', eyebrow: c.prodEye, title: c.prodTitle, split: `<a class="btn btn--dark" href="${U.products(lang)}">${t.cta.viewAll} ${I.arrowR}</a>` })}
    <div class="prod-grid" data-reveal-stagger>
      ${featured.map((p) => productCard(p, lang)).join('\n      ')}
    </div>
  </div>
</section>

<section class="section--tight" id="marcas">
  <div class="container center">
    <span class="eyebrow eyebrow--plain" data-num="">${t.words.brands}</span>
    <h2 style="margin-top:12px;font-size:clamp(1.5rem,3vw,2.2rem)">${L ? 'Marcas que respaldan tu operación' : 'Brands that back your operation'}</h2>
  </div>
  <div class="brands-marquee" aria-hidden="true">
    <div class="brands-track">
      ${BRANDS.concat(BRANDS, BRANDS).map((b) => `<div class="brand-logo"><img src="${img(b.img)}" alt="${esc(b.name)}" loading="lazy"></div>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container split">
    <div class="split__media ticked" data-reveal><img src="${img('proyecto/proj-2.webp')}" alt="${lang === 'es' ? 'Equipo YRVIMAR en proyecto industrial' : 'YRVIMAR team on an industrial project'}" width="900" height="620" style="object-position:center 40%"></div>
    <div data-reveal>
      <span class="eyebrow" data-num="03"><span class="tick"></span>${c.whyEye}</span>
      <h2 style="margin-top:16px">${c.whyTitle}</h2>
      <ul class="feat">
        ${c.whyItems.map((it) => `<li>${I.check}<span>${it}</span></li>`).join('\n        ')}
      </ul>
      <div class="hero-cta" style="margin-top:32px">
        <a class="btn btn--ghost" href="${U.about(lang)}">${t.nav.about} ${I.arrowR}</a>
      </div>
    </div>
  </div>
</section>

<section class="section--tight">
  <div class="container">
    <div class="stats" data-reveal-stagger>
      ${c.stats.map(([pre, n, l]) => `<div class="stat"><div class="n">${pre ? `<span style="font-size:.5em;color:var(--mute)">${pre}</span>` : ''}${n === 'Nacional' || n === 'Nationwide' ? `<span class="u">${n}</span>` : n}</div><div class="l">${l}</div></div>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section" id="proyectos">
  <div class="container">
    ${sectionHead({ num: '04', eyebrow: t.words.projects, title: L ? 'Proyectos que respaldan nuestra experiencia' : 'Projects that back our experience', split: `<a class="btn btn--dark" href="${U.about(lang)}">${t.cta.viewProjects} ${I.arrowR}</a>` })}
    <div class="proj-grid proj-grid--preview" data-reveal-stagger>
      ${PROJECTS.slice(0, 5).map((pr, i) => `<a class="proj-item${i === 0 ? ' proj-item--big' : ''}" href="${U.about(lang)}"><img src="${img(pr.img)}" alt="${L ? 'Proyecto YRVIMAR' : 'YRVIMAR project'} ${i + 1}" loading="lazy"></a>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section bg-soft">
  <div class="container">
    ${sectionHead({ num: '05', eyebrow: c.blogEye, title: c.blogTitle, split: `<a class="btn btn--dark" href="${U.blog(lang)}">${t.cta.allArticles} ${I.arrowR}</a>` })}
    <div class="blog-grid" data-reveal-stagger>
      ${latest.map((a) => postCard(a, lang)).join('\n      ')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="cta-band ticked" data-reveal>
      <div class="glow"></div>
      <span class="eyebrow eyebrow--plain" data-num="">${lang === 'es' ? 'Cotización' : 'Get a quote'}</span>
      <h2 style="margin-top:18px">${c.ctaTitle}</h2>
      <p>${c.ctaP}</p>
      <div class="hero-cta">
        <a class="btn btn--wa btn--lg" href="${wa(lang === 'es' ? 'Hola YRVIMAR, quisiera cotizar:' : 'Hello YRVIMAR, I would like to quote:')}" target="_blank" rel="noopener">${I.wa} ${t.cta.quote}</a>
        <a class="btn btn--ghost-light btn--lg" href="${U.contact(lang)}">${t.cta.contactUs} ${I.arrowR}</a>
      </div>
    </div>
  </div>
</section>`;

  const title = lang === 'es'
    ? 'Suministros Industriales en Panamá | YRVIMAR'
    : 'Industrial Supplies in Panama | YRVIMAR';
  const desc = lang === 'es'
    ? 'Mangueras hidráulicas, conexiones Camlock y Chicago, válvulas y accesorios industriales en Panamá. Asesoría técnica y envíos a todo el país.'
    : 'Hydraulic hoses, Camlock and Chicago couplings, valves and industrial accessories in Panama. Technical advice and nationwide shipping.';

  return shell({
    lang, active: 'home',
    meta: { lang, title, desc, path: U.home(lang), alternates: alts(U.home('es'), U.home('en')), ogType: 'website', preload: img('banner-1.webp'), jsonld: [ldOrg(), ldWebsite(lang)] },
    main,
  });
}

// ============================================================================
//  PÁGINA: CATÁLOGO (todos los productos con filtros)
// ============================================================================
function pageProducts(lang) {
  const t = T[lang];
  const filters = `<button class="filter-btn active" data-filter="all">${t.words.filterAll}</button>` +
    CATEGORIES.map((c) => `<button class="filter-btn" data-filter="${c.id}">${c.name[lang]}</button>`).join('');
  const cards = PRODUCTS.map((p) => `<div class="prod-item" data-cat="${p.cat}">${productCard(p, lang)}</div>`).join('\n      ');
  const title = lang === 'es' ? 'Catálogo de Productos Industriales | YRVIMAR Panamá' : 'Industrial Products Catalog | YRVIMAR Panama';
  const desc = lang === 'es'
    ? 'Explora el catálogo YRVIMAR: mangueras, conexiones, acoples, válvulas y accesorios de seguridad para la industria en Panamá. Consulta por WhatsApp.'
    : 'Explore the YRVIMAR catalog: hoses, fittings, couplings, valves and safety accessories for industry in Panama. Ask on WhatsApp.';
  const crumbs = [{ name: t.words.home, url: U.home(lang) }, { name: t.words.catalog, url: U.products(lang) }];

  const main = `
<section class="page-hero">
  <div class="techgrid"></div>
  <div class="container">
    <nav class="crumbs" aria-label="breadcrumb">
      <a href="${U.home(lang)}">${t.words.home}</a><span class="sep">/</span><span>${t.words.catalog}</span>
    </nav>
    <span class="eyebrow" data-num="" style="margin-top:22px;display:inline-flex">${t.nav.products}</span>
    <h1>${lang === 'es' ? 'Catálogo de productos' : 'Product catalog'}</h1>
    <p class="lead">${lang === 'es' ? 'Modo catálogo: precios disponibles bajo cotización. Filtra por categoría y consulta cualquier producto por WhatsApp.' : 'Catalog mode: prices available upon request. Filter by category and ask about any product on WhatsApp.'}</p>
  </div>
</section>
<section class="section--tight">
  <div class="container">
    <div class="filters" id="filters">${filters}</div>
    <p class="catalog-count" id="catalog-count">${PRODUCTS.length} ${t.words.results}</p>
    <div class="prod-grid" id="catalog-grid">
      ${cards}
    </div>
  </div>
</section>`;
  return shell({
    lang, active: 'products',
    meta: { lang, title, desc, path: U.products(lang), alternates: alts(U.products('es'), U.products('en')), jsonld: [ldBreadcrumb(crumbs)] },
    main,
  });
}

// ============================================================================
//  PÁGINA: CATEGORÍA
// ============================================================================
function pageCategory(cat, lang) {
  const t = T[lang];
  const items = PRODUCTS.filter((p) => p.cat === cat.id);
  const others = CATEGORIES.filter((c) => c.id !== cat.id);
  const crumbs = [{ name: t.words.home, url: U.home(lang) }, { name: t.words.catalog, url: U.products(lang) }, { name: cat.name[lang], url: U.category(lang, cat.slug[lang]) }];
  const title = lang === 'es' ? `${cat.name[lang]} en Panamá | YRVIMAR` : `${cat.name[lang]} in Panama | YRVIMAR`;
  const desc = clampDesc(cat.desc[lang]);
  const catArticles = ARTICLES.filter((a) => a.cat === cat.id).slice(0, 3);

  const main = `
<section class="page-hero" style="padding-bottom:0">
  <div class="techgrid"></div>
  <div class="container">
    <nav class="crumbs" aria-label="breadcrumb">
      <a href="${U.home(lang)}">${t.words.home}</a><span class="sep">/</span>
      <a href="${U.products(lang)}">${t.words.catalog}</a><span class="sep">/</span><span>${cat.name[lang]}</span>
    </nav>
    <div class="split" style="margin-top:30px;padding-bottom:var(--section-y);align-items:center">
      <div>
        <span class="eyebrow" data-num=""><span class="tick"></span>${t.words.category}</span>
        <h1 style="margin-top:16px">${cat.name[lang]}</h1>
        <p class="lead" style="margin-top:18px">${cat.desc[lang]}</p>
        <div class="hero-cta" style="margin-top:30px">
          <a class="btn btn--wa" href="${wa(lang === 'es' ? `Hola YRVIMAR, me interesa la línea de ${cat.name.es}.` : `Hello YRVIMAR, I'm interested in ${cat.name.en}.`)}" target="_blank" rel="noopener">${I.wa} ${t.cta.quote}</a>
        </div>
      </div>
      <div class="split__media ticked"><img src="${img(cat.image)}" alt="${esc(cat.name[lang])}" width="900" height="620"></div>
    </div>
  </div>
</section>
<section class="section bg-carbon">
  <div class="container">
    <div class="block-title"><span class="bar"></span><h2>${items.length} ${t.words.products}</h2></div>
    <div class="prod-grid prod-grid--3" data-reveal-stagger style="margin-top:26px">
      ${items.map((p) => productCard(p, lang)).join('\n      ')}
    </div>
  </div>
</section>
${catArticles.length ? `<section class="section">
  <div class="container">
    ${sectionHead({ num: '', eyebrow: t.words.blog || t.nav.blog, title: lang === 'es' ? 'Guías relacionadas' : 'Related guides', lead: lang === 'es' ? `Aprende a elegir y mantener tu línea de ${cat.name.es.toLowerCase()}.` : `Learn how to choose and maintain your ${cat.name.en.toLowerCase()}.` })}
    <div class="blog-grid" data-reveal-stagger>
      ${catArticles.map((a) => postCard(a, lang)).join('\n      ')}
    </div>
  </div>
</section>` : ''}
<section class="section">
  <div class="container">
    ${sectionHead({ num: '', eyebrow: t.words.categories, title: lang === 'es' ? 'Otras líneas de producto' : 'Other product lines' })}
    <div class="cat-grid">
      ${others.map((c, i) => categoryCard(c, lang, CATEGORIES.indexOf(c))).join('\n      ')}
    </div>
  </div>
</section>`;
  const ldCollection = {
    '@context': 'https://schema.org', '@type': 'CollectionPage',
    name: cat.name[lang], description: cat.desc[lang], inLanguage: lang,
    url: abs(U.category(lang, cat.slug[lang])),
    isPartOf: { '@id': ORG_ID },
    mainEntity: {
      '@type': 'ItemList', numberOfItems: items.length,
      itemListElement: items.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name[lang], url: abs(U.product(lang, p.slug[lang])) })),
    },
  };
  return shell({
    lang, active: 'products',
    meta: { lang, title, desc, path: U.category(lang, cat.slug[lang]), alternates: alts(U.category('es', cat.slug.es), U.category('en', cat.slug.en)), jsonld: [ldCollection, ldBreadcrumb(crumbs)] },
    main,
  });
}

// ============================================================================
//  PÁGINA: PRODUCTO
// ============================================================================
function pageProduct(p, lang) {
  const t = T[lang];
  const cat = CATEGORIES.find((c) => c.id === p.cat);
  const related = PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4);
  const relFill = related.length < 4 ? PRODUCTS.filter((x) => x.id !== p.id && !related.includes(x)).slice(0, 4 - related.length) : [];
  const relatedAll = related.concat(relFill);
  const crumbs = [
    { name: t.words.home, url: U.home(lang) },
    { name: t.words.catalog, url: U.products(lang) },
    { name: cat.name[lang], url: U.category(lang, cat.slug[lang]) },
    { name: p.name[lang], url: U.product(lang, p.slug[lang]) },
  ];
  const L = lang === 'es';
  const waMsg = L
    ? `Hola YRVIMAR, me interesa el producto "${p.name.es}". ¿Me pueden dar disponibilidad y cotización?`
    : `Hello YRVIMAR, I'm interested in "${p.name.en}". Could you share availability and a quote?`;
  const title = clampTitle(p.name[lang], L ? ' | YRVIMAR Panamá' : ' | YRVIMAR Panama');
  const desc = clampDesc(L
    ? `${p.name.es} en Panamá. ${p.short.es} Disponible en YRVIMAR: cotiza por WhatsApp con envío a todo el país.`
    : `${p.name.en} in Panama. ${p.short.en} Available at YRVIMAR: request a quote on WhatsApp, nationwide shipping.`);
  const fichaBlock = p.ficha ? `
        <div class="pd-actions" style="margin-top:26px">
          <button class="btn btn--dark btn--lg" type="button" id="open-ficha">${I.doc} ${t.cta.viewDatasheet}</button>
        </div>` : '';
  const fichaModal = p.ficha ? `
<div class="ficha-modal" id="ficha-modal" hidden>
  <div class="ficha-modal__box" role="dialog" aria-modal="true" aria-label="${t.words.datasheet}">
    <button class="ficha-modal__close" id="close-ficha" aria-label="${L ? 'Cerrar' : 'Close'}">${I.close}</button>
    <div class="ficha-modal__scroll"><img src="${img(p.ficha)}" alt="${esc(L ? 'Ficha técnica' : 'Datasheet')} — ${esc(p.name[lang])}"></div>
    <a class="btn btn--dark ficha-modal__dl" href="${img(p.ficha)}" download target="_blank" rel="noopener">${I.download} ${t.cta.downloadDatasheet}</a>
  </div>
</div>` : '';

  const main = `
<section class="section" style="padding-top:120px">
  <div class="container">
    <nav class="crumbs" aria-label="breadcrumb" style="margin-bottom:30px">
      <a href="${U.home(lang)}">${t.words.home}</a><span class="sep">/</span>
      <a href="${U.products(lang)}">${t.words.catalog}</a><span class="sep">/</span>
      <a href="${U.category(lang, cat.slug[lang])}">${cat.name[lang]}</a><span class="sep">/</span><span>${p.name[lang]}</span>
    </nav>
    <div class="pd-grid">
      <div class="pd-media ticked${p.image ? '' : ' is-noimg'}">${p.image ? `<img src="${img(p.image)}" alt="${esc(p.name[lang])}" width="900" height="900">` : `<div class="noimg"><span class="noimg-ic">${catIcon[cat.icon] || I.box}</span><span class="noimg-t">${L ? 'Imagen próximamente' : 'Image coming soon'}</span></div>`}</div>
      <div class="pd-info">
        <a class="pd-cat" href="${U.category(lang, cat.slug[lang])}">${cat.name[lang]}</a>
        <h1>${p.name[lang]}</h1>
        <p class="pd-short">${p.short[lang]}</p>
        <div class="pd-actions">
          <a class="btn btn--wa btn--lg" href="${wa(waMsg)}" target="_blank" rel="noopener">${I.wa} ${t.cta.askProduct}</a>
          <a class="btn btn--ghost" href="tel:${SITE.phoneRaw}">${I.phone} ${SITE.phone}</a>
        </div>
        <p class="pd-note">${I.info}<span>${L ? 'Precio disponible bajo cotización. Consulta medidas y disponibilidad por WhatsApp.' : 'Price available upon request. Ask sizes and availability on WhatsApp.'}</span></p>
        ${fichaBlock}
      </div>
    </div>
  </div>
</section>
${fichaModal}
<section class="section bg-soft">
  <div class="container">
    ${sectionHead({ num: '', eyebrow: t.words.products, title: t.words.relatedProducts, split: `<a class="btn btn--dark" href="${U.category(lang, cat.slug[lang])}">${cat.name[lang]} ${I.arrowR}</a>` })}
    <div class="prod-grid" data-reveal-stagger>
      ${relatedAll.map((x) => productCard(x, lang)).join('\n      ')}
    </div>
  </div>
</section>`;
  return shell({
    lang, active: 'products',
    meta: { lang, title, desc, path: U.product(lang, p.slug[lang]), alternates: alts(U.product('es', p.slug.es), U.product('en', p.slug.en)), ogType: 'product', ogImage: img(p.image || 'og-image.jpg'), jsonld: [ldProduct(p, lang), ldBreadcrumb(crumbs)] },
    main,
  });
}

// ============================================================================
//  PÁGINA: NOSOTROS
// ============================================================================
const ABOUT = {
  es: {
    title: 'Nosotros | YRVIMAR Suministros Industriales Panamá',
    desc: 'Conoce a YRVIMAR: historia, misión y visión. Soluciones industriales confiables en mangueras, conexiones, válvulas y accesorios para Panamá y la región.',
    h1: 'Aliados de la industria panameña',
    lead: 'Nacimos con un compromiso simple: que tu operación nunca se detenga por falta del componente correcto.',
    historyEye: 'Historia', historyTitle: 'Crecemos junto a nuestros clientes',
    history: `<p>YRVIMAR nació con el compromiso de ofrecer soluciones industriales confiables que respondan a las necesidades de los diferentes sectores productivos. Desde nuestros inicios nos hemos dedicado al suministro de mangueras industriales, conexiones, accesorios y equipos de alta calidad, respaldados por un servicio personalizado y una atención enfocada en generar relaciones con nuestros clientes a largo plazo.</p><p>Hoy continuamos creciendo junto a ellos, ampliando nuestro portafolio y fortaleciendo alianzas con proveedores nacionales e internacionales para brindar soluciones eficientes, oportunas y de alto desempeño.</p>`,
    valuesEye: 'Cómo trabajamos', valuesTitle: 'Lo que nos define',
    values: [
      ['Calidad respaldada', 'Productos de marcas nacionales e internacionales con el desempeño que la industria exige.', 'shield'],
      ['Asesoría técnica', 'No solo vendemos: te ayudamos a identificar la solución correcta para tu aplicación.', 'wrench'],
      ['Respuesta ágil', 'Existencias locales y cotización rápida para minimizar tus tiempos de paro.', 'truck'],
    ],
    misionT: 'Misión', mision: 'Brindar soluciones industriales confiables mediante el suministro de productos de alta calidad y un servicio personalizado, contribuyendo a la continuidad y eficiencia de las operaciones de nuestros clientes.',
    visionT: 'Visión', vision: 'Ser la empresa de referencia en soluciones industriales en Panamá y la región, reconocida por la excelencia de nuestro servicio, la calidad de nuestros productos y el compromiso con el éxito de nuestros clientes.',
    ctaTitle: '¿Listo para trabajar con un aliado que entiende tu operación?',
  },
  en: {
    title: 'About Us | YRVIMAR Industrial Supplies Panama',
    desc: "Meet YRVIMAR: history, mission and vision. Reliable industrial solutions in hoses, fittings, valves and accessories for Panama and the region.",
    h1: 'Allies of Panamanian industry',
    lead: 'We were born with a simple commitment: that your operation never stops for lack of the right component.',
    historyEye: 'History', historyTitle: 'We grow alongside our clients',
    history: `<p>YRVIMAR was born with the commitment to offer reliable industrial solutions that meet the needs of different productive sectors. From the start we have dedicated ourselves to supplying industrial hoses, fittings, accessories and high-quality equipment, backed by personalized service and attention focused on building long-term relationships with our clients.</p><p>Today we keep growing alongside them, expanding our portfolio and strengthening alliances with national and international suppliers to deliver efficient, timely and high-performance solutions.</p>`,
    valuesEye: 'How we work', valuesTitle: 'What defines us',
    values: [
      ['Backed quality', 'Products from national and international brands with the performance industry demands.', 'shield'],
      ['Technical advice', "We don't just sell: we help you identify the right solution for your application.", 'wrench'],
      ['Fast response', 'Local stock and quick quoting to minimize your downtime.', 'truck'],
    ],
    misionT: 'Mission', mision: 'To provide reliable industrial solutions through the supply of high-quality products and personalized service, contributing to the continuity and efficiency of our clients\' operations.',
    visionT: 'Vision', vision: 'To be the reference company for industrial solutions in Panama and the region, recognized for the excellence of our service, the quality of our products and our commitment to our clients\' success.',
    ctaTitle: 'Ready to work with an ally that understands your operation?',
  },
};
function pageAbout(lang) {
  const t = T[lang]; const a = ABOUT[lang];
  const L = lang === 'es';
  const icons = { shield: I.shield, wrench: I.wrench, truck: I.truck };
  const crumbs = [{ name: t.words.home, url: U.home(lang) }, { name: t.nav.about, url: U.about(lang) }];
  const main = `
<section class="page-hero">
  <div class="techgrid"></div>
  <div class="container">
    <nav class="crumbs" aria-label="breadcrumb"><a href="${U.home(lang)}">${t.words.home}</a><span class="sep">/</span><span>${t.nav.about}</span></nav>
    <span class="eyebrow" data-num="" style="margin-top:22px;display:inline-flex"><span class="tick"></span>${t.nav.about}</span>
    <h1>${a.h1}</h1>
    <p class="lead">${a.lead}</p>
  </div>
</section>
<section class="section">
  <div class="container split" style="align-items:center">
    <div class="split__media ticked" data-reveal><img src="${img('team-port.webp')}" alt="${lang === 'es' ? 'Equipo YRVIMAR en operación' : 'YRVIMAR team in operation'}" width="900" height="620" style="object-position:center 30%"></div>
    <div data-reveal>
      <span class="eyebrow" data-num=""><span class="tick"></span>${a.historyEye}</span>
      <h2 style="margin-top:16px">${a.historyTitle}</h2>
      <div style="margin-top:18px;color:var(--mute);display:grid;gap:16px">${a.history}</div>
    </div>
  </div>
</section>
<section class="section bg-soft">
  <div class="container">
    ${sectionHead({ num: '', eyebrow: L ? 'Nuestro equipo' : 'Our team', title: L ? 'En terreno, junto a tu operación' : 'In the field, alongside your operation', lead: L ? 'Personas reales detrás de cada solución: asesoría, servicio y presencia en Panamá.' : 'Real people behind every solution: advice, service and presence in Panama.' })}
    <div class="team-gallery" data-reveal-stagger>
      <figure><img src="${img('team-field.webp')}" alt="${L ? 'Técnico de YRVIMAR con bomba hidráulica en campo' : 'YRVIMAR technician with hydraulic pump in the field'}" loading="lazy" width="1000" height="1331"></figure>
      <figure><img src="${img('team-port.webp')}" alt="${L ? 'Equipo YRVIMAR en operación portuaria' : 'YRVIMAR team at a port operation'}" loading="lazy" width="1000" height="1333"></figure>
      <figure><img src="${img('team-desk.webp')}" alt="${L ? 'Atención y asesoría YRVIMAR' : 'YRVIMAR customer service and advice'}" loading="lazy" width="1000" height="1773"></figure>
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    ${sectionHead({ num: '', eyebrow: L ? 'Proyectos' : 'Projects', title: L ? 'Nuestro trabajo en terreno' : 'Our work in the field', lead: L ? 'Instalaciones y proyectos reales que respaldan nuestra experiencia con la industria de Panamá.' : 'Real installations and projects backing our experience with Panamanian industry.' })}
    <div class="proj-grid" data-reveal-stagger>
      ${PROJECTS.map((pr, i) => `<a class="proj-item${i % 5 === 0 ? ' proj-item--big' : ''}" href="${img(pr.img)}" target="_blank" rel="noopener"><img src="${img(pr.img)}" alt="${L ? 'Proyecto YRVIMAR' : 'YRVIMAR project'} ${i + 1}" loading="lazy"></a>`).join('\n      ')}
    </div>
  </div>
</section>
<section class="section bg-soft">
  <div class="container">
    ${sectionHead({ num: '', eyebrow: a.valuesEye, title: a.valuesTitle })}
    <div class="value-grid" data-reveal-stagger>
      ${a.values.map(([tt, d, ic]) => `<div class="value-card"><div class="ic">${icons[ic]}</div><h3>${tt}</h3><p>${d}</p></div>`).join('\n      ')}
    </div>
  </div>
</section>
<section class="section">
  <div class="container mv-grid" data-reveal-stagger>
    <div class="mv-card"><div class="big">${I.target}</div><h3>${a.misionT}</h3><p>${a.mision}</p></div>
    <div class="mv-card"><div class="big">${I.eye}</div><h3>${a.visionT}</h3><p>${a.vision}</p></div>
  </div>
</section>
<section class="section" style="padding-top:0">
  <div class="container">
    <div class="cta-band ticked" data-reveal>
      <div class="glow"></div>
      <h2>${a.ctaTitle}</h2>
      <div class="hero-cta"><a class="btn btn--wa btn--lg" href="${wa(lang === 'es' ? 'Hola YRVIMAR, quisiera más información.' : 'Hello YRVIMAR, I would like more information.')}" target="_blank" rel="noopener">${I.wa} ${t.cta.quote}</a><a class="btn btn--ghost btn--lg" href="${U.products(lang)}">${t.cta.viewCatalog} ${I.arrowR}</a></div>
    </div>
  </div>
</section>`;
  return shell({ lang, active: 'about', meta: { lang, title: a.title, desc: a.desc, path: U.about(lang), alternates: alts(U.about('es'), U.about('en')), jsonld: [ldOrg(), ldBreadcrumb(crumbs)] }, main });
}

// ============================================================================
//  PÁGINA: CONTACTO
// ============================================================================
function pageContact(lang) {
  const t = T[lang];
  const crumbs = [{ name: t.words.home, url: U.home(lang) }, { name: t.nav.contact, url: U.contact(lang) }];
  const title = lang === 'es' ? 'Contacto | YRVIMAR Suministros Industriales Panamá' : 'Contact | YRVIMAR Industrial Supplies Panama';
  const desc = lang === 'es' ? 'Contáctanos por WhatsApp, teléfono o correo. Estamos en Parque Lefevre, Ciudad de Panamá. Cotiza tus mangueras, conexiones y válvulas hoy.' : 'Contact us by WhatsApp, phone or email. We are in Parque Lefevre, Panama City. Quote your hoses, fittings and valves today.';
  const L = lang === 'es';
  const row = (ic, lbl, val) => `<div class="ci-row"><div class="ic">${ic}</div><div><div class="lbl">${lbl}</div><div class="val">${val}</div></div></div>`;
  const main = `
<section class="page-hero">
  <div class="techgrid"></div>
  <div class="container">
    <nav class="crumbs" aria-label="breadcrumb"><a href="${U.home(lang)}">${t.words.home}</a><span class="sep">/</span><span>${t.nav.contact}</span></nav>
    <span class="eyebrow" data-num="" style="margin-top:22px;display:inline-flex"><span class="tick"></span>${t.nav.contact}</span>
    <h1>${L ? 'Hablemos de tu proyecto' : "Let's talk about your project"}</h1>
    <p class="lead">${L ? 'La forma más rápida de cotizar es por WhatsApp. También puedes escribirnos o visitarnos.' : 'The fastest way to get a quote is on WhatsApp. You can also write to us or visit.'}</p>
  </div>
</section>
<section class="section--tight">
  <div class="container contact-grid">
    <div class="contact-info">
      ${row(I.wa, 'WhatsApp', `<a href="${wa(L ? 'Hola YRVIMAR, quisiera cotizar.' : 'Hello YRVIMAR, I would like a quote.')}" target="_blank" rel="noopener">${SITE.whatsappDisplay}</a>`)}
      ${row(I.phone, L ? 'Teléfono' : 'Phone', `<a href="tel:${SITE.phoneRaw}">${SITE.phone}</a>`)}
      ${row(I.mail, 'Email', `<a href="mailto:${SITE.emailSales}">${SITE.emailSales}</a><br><a href="mailto:${SITE.emailAdmin}">${SITE.emailAdmin}</a>`)}
      ${row(I.pin, L ? 'Dirección' : 'Address', `${SITE.address}, ${SITE.city}, ${SITE.countryName[lang]}`)}
      ${row(I.clock, L ? 'Horario' : 'Hours', SITE.hours[lang])}
      ${row(I.ig, 'Instagram', `<a href="${SITE.instagram}" target="_blank" rel="noopener">${SITE.instagramHandle}</a>`)}
      ${row(I.fb, 'Facebook', `<a href="${SITE.facebook}" target="_blank" rel="noopener">YRVIMAR Services & Supply</a>`)}
      <div style="margin-top:26px"><a class="btn btn--wa btn--lg btn--block" href="${wa(L ? 'Hola YRVIMAR, quisiera cotizar.' : 'Hello YRVIMAR, I would like a quote.')}" target="_blank" rel="noopener">${I.wa} ${t.cta.quote}</a></div>
    </div>
    <div class="contact-card">
      <h2 style="font-size:1.4rem">${L ? 'Envíanos un mensaje' : 'Send us a message'}</h2>
      <p style="color:var(--mute);margin:10px 0 24px;font-size:.95rem">${L ? 'Completa el formulario y te contactamos. Se abrirá WhatsApp con tu mensaje listo.' : 'Fill out the form and we\'ll contact you. WhatsApp will open with your message ready.'}</p>
      <form id="contact-form" data-lang="${lang}">
        <div class="form-row"><label for="cf-name">${L ? 'Nombre' : 'Name'}</label><input id="cf-name" name="name" type="text" required autocomplete="name"></div>
        <div class="form-row"><label for="cf-topic">${L ? 'Producto de interés' : 'Product of interest'}</label>
          <select id="cf-topic" name="topic">
            <option value="">${L ? 'Selecciona…' : 'Select…'}</option>
            ${CATEGORIES.map((c) => `<option value="${esc(c.name[lang])}">${esc(c.name[lang])}</option>`).join('')}
            <option value="${L ? 'Otro' : 'Other'}">${L ? 'Otro' : 'Other'}</option>
          </select>
        </div>
        <div class="form-row"><label for="cf-msg">${L ? 'Mensaje' : 'Message'}</label><textarea id="cf-msg" name="message" required placeholder="${L ? 'Cuéntanos qué necesitas: medida, norma, cantidad…' : 'Tell us what you need: size, standard, quantity…'}"></textarea></div>
        <button class="btn btn--primary btn--lg btn--block" type="submit">${I.wa} ${L ? 'Enviar por WhatsApp' : 'Send via WhatsApp'}</button>
      </form>
    </div>
  </div>
</section>
<section class="section" style="padding-top:0">
  <div class="container">
    <div class="map-embed">
      <iframe title="${L ? 'Ubicación YRVIMAR' : 'YRVIMAR location'}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${SITE.mapEmbed}"></iframe>
    </div>
  </div>
</section>`;
  return shell({ lang, active: 'contact', meta: { lang, title, desc, path: U.contact(lang), alternates: alts(U.contact('es'), U.contact('en')), jsonld: [ldLocalBusiness(lang), ldBreadcrumb(crumbs)] }, main });
}

// ============================================================================
//  PÁGINA: BLOG (índice)
// ============================================================================
function pageBlog(lang) {
  const t = T[lang];
  const [first, ...rest] = ARTICLES;
  const crumbs = [{ name: t.words.home, url: U.home(lang) }, { name: t.nav.blog, url: U.blog(lang) }];
  const title = lang === 'es' ? 'Blog Técnico: Mangueras y Conexiones | YRVIMAR' : 'Technical Blog: Hoses & Fittings | YRVIMAR';
  const desc = lang === 'es' ? 'Guías técnicas sobre mangueras hidráulicas e industriales, conexiones, válvulas y seguridad. Consejos prácticos para la industria en Panamá.' : 'Technical guides on hydraulic and industrial hoses, fittings, valves and safety. Practical tips for industry in Panama.';
  const main = `
<section class="page-hero">
  <div class="techgrid"></div>
  <div class="container">
    <nav class="crumbs" aria-label="breadcrumb"><a href="${U.home(lang)}">${t.words.home}</a><span class="sep">/</span><span>${t.nav.blog}</span></nav>
    <span class="eyebrow" data-num="" style="margin-top:22px;display:inline-flex"><span class="tick"></span>${lang === 'es' ? 'Blog técnico' : 'Technical blog'}</span>
    <h1>${lang === 'es' ? 'Conocimiento que mantiene tu operación en marcha' : 'Knowledge that keeps your operation running'}</h1>
    <p class="lead">${lang === 'es' ? 'Guías prácticas para elegir, instalar y mantener tus componentes industriales.' : 'Practical guides to choose, install and maintain your industrial components.'}</p>
  </div>
</section>
<section class="section--tight">
  <div class="container">
    <div class="blog-grid" data-reveal-stagger>
      ${postCard(first, lang, true)}
      ${rest.map((a) => postCard(a, lang)).join('\n      ')}
    </div>
  </div>
</section>`;
  return shell({ lang, active: 'blog', meta: { lang, title, desc, path: U.blog(lang), alternates: alts(U.blog('es'), U.blog('en')), jsonld: [ldBreadcrumb(crumbs)] }, main });
}

// ============================================================================
//  PÁGINA: ARTÍCULO
// ============================================================================
function pageArticle(a, lang) {
  const t = T[lang];
  const cat = CATEGORIES.find((c) => c.id === a.cat);
  const related = ARTICLES.filter((x) => x.id !== a.id).slice(0, 3);
  const crumbs = [{ name: t.words.home, url: U.home(lang) }, { name: t.nav.blog, url: U.blog(lang) }, { name: a.title[lang], url: U.article(lang, a.slug[lang]) }];
  const title = clampTitle(a.title[lang]);
  const shareMsg = lang === 'es' ? `Te comparto este artículo de YRVIMAR: ${a.title.es}` : `Sharing this YRVIMAR article: ${a.title.en}`;
  const main = `
<article class="section" style="padding-top:120px">
  <div class="container">
    <nav class="crumbs" aria-label="breadcrumb" style="justify-content:center;margin-bottom:26px"><a href="${U.home(lang)}">${t.words.home}</a><span class="sep">/</span><a href="${U.blog(lang)}">${t.nav.blog}</a><span class="sep">/</span><span>${cat ? cat.name[lang] : ''}</span></nav>
    <div class="article-hero">
      <div class="post-meta" style="justify-content:center"><span class="cat">${cat ? cat.name[lang] : ''}</span><span>${fmtDate(a.date, lang)}</span><span>${a.readMin} ${t.words.min}</span></div>
      <p class="byline">${lang === 'es' ? 'Por' : 'By'} <a href="${U.about(lang)}">${lang === 'es' ? 'Equipo Técnico YRVIMAR' : 'YRVIMAR Technical Team'}</a></p>
      <h1>${a.title[lang]}</h1>
      <p class="lead" style="margin-top:18px">${a.excerpt[lang]}</p>
    </div>
    <div class="article-cover ticked"><img src="${img(a.image)}" alt="${esc(a.title[lang])}" width="980" height="500"></div>
    <div class="article">
      <div class="article-body">${a.body[lang]}</div>
      ${cat ? `<div class="article-related-cat">
        <span class="arc-eye">${lang === 'es' ? 'Ver en el catálogo' : 'See in the catalog'}</span>
        <a class="arc-link" href="${U.category(lang, cat.slug[lang])}">${catIcon[cat.icon] || I.box}<span><strong>${cat.name[lang]}</strong><em>${cat.tagline[lang]}</em></span>${I.arrowR}</a>
      </div>` : ''}
      <div class="article-cta">
        <p>${lang === 'es' ? '¿Necesitas este producto o asesoría?' : 'Need this product or advice?'}</p>
        <a class="btn btn--wa" href="${wa(lang === 'es' ? 'Hola YRVIMAR, leí un artículo del blog y tengo una consulta.' : 'Hello YRVIMAR, I read a blog article and have a question.')}" target="_blank" rel="noopener">${I.wa} ${t.cta.quote}</a>
      </div>
    </div>
  </div>
</article>
<section class="section bg-carbon">
  <div class="container">
    ${sectionHead({ num: '', eyebrow: t.nav.blog, title: t.words.relatedArticles, split: `<a class="btn btn--dark" href="${U.blog(lang)}">${t.cta.allArticles} ${I.arrowR}</a>` })}
    <div class="blog-grid" data-reveal-stagger>
      ${related.map((x) => postCard(x, lang)).join('\n      ')}
    </div>
  </div>
</section>`;
  return shell({ lang, active: 'blog', meta: { lang, title, desc: a.excerpt[lang], path: U.article(lang, a.slug[lang]), alternates: alts(U.article('es', a.slug.es), U.article('en', a.slug.en)), ogType: 'article', ogImage: img(a.image), jsonld: [ldArticle(a, lang), ldBreadcrumb(crumbs)] }, main });
}

// ============================================================================
//  ROOT redirect + robots + sitemap + manifest
// ============================================================================
function rootIndex() {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>YRVIMAR Services & Supply — Suministros Industriales Panamá</title>
<meta name="description" content="Suministros industriales en Panamá: mangueras, conexiones, válvulas y accesorios.">
<link rel="canonical" href="${abs(U.home('es'))}">
<link rel="alternate" hreflang="es" href="${abs(U.home('es'))}">
<link rel="alternate" hreflang="en" href="${abs(U.home('en'))}">
<link rel="alternate" hreflang="x-default" href="${abs(U.home('es'))}">
<link rel="icon" type="image/png" sizes="32x32" href="${logo('favicon-32.png')}">
<script>
(function(){try{var l=(navigator.language||'es').toLowerCase();var t=l.indexOf('en')===0?'/en/':'/es/';location.replace(t);}catch(e){location.replace('/es/');}})();
</script>
<meta http-equiv="refresh" content="0; url=/es/">
</head>
<body style="background:#0a0a0b;color:#f6f6f4;font-family:system-ui;display:flex;min-height:100vh;align-items:center;justify-content:center">
<p>Redirigiendo… <a href="/es/" style="color:#f5b301">YRVIMAR</a></p>
</body>
</html>`;
}

function robots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE.baseUrl}/sitemap.xml
# LLM guidance
# ${SITE.baseUrl}/llms.txt`;
}

function llmsTxt() {
  const catBlock = (l) => CATEGORIES.map((c) => {
    const prods = PRODUCTS.filter((p) => p.cat === c.id);
    const list = prods.map((p) => `  - [${p.name[l]}](${abs(U.product(l, p.slug[l]))})`).join('\n');
    return `- [${c.name[l]}](${abs(U.category(l, c.slug[l]))}): ${c.tagline[l]} — ${prods.length} ${l === 'es' ? 'productos' : 'products'}\n${list}`;
  }).join('\n');
  const artLine = (l) => ARTICLES.map((a) => `- [${a.title[l]}](${abs(U.article(l, a.slug[l]))}): ${a.excerpt[l]}`).join('\n');
  return `# YRVIMAR Services & Supply

> ${SITE.name} is an industrial supplies distributor in ${SITE.city}, ${SITE.region}, serving Panamanian industry since ${SITE.founded}. Product lines (PROFIX brand): PVC hoses (suction, discharge, layflat, food grade), rubber hoses (air, water, fuel, chemicals, welding), hydraulic hoses (SAE 100 R1, R2, R4, R7, R8, R13, R15, 4SP, 4SH), hydraulic fittings and ferrules (JIC 37°, NPT, BSP, M22), industrial couplings (Camlock types A/B/C/D/DC/DP/E/F, Chicago, combination nipples, suction strainers), valves and equipment (stainless steel ball valves, wafer butterfly valves, strapping tools), and conveyor belts. Custom hose assembly available. Catalog mode: no online prices — quotes are handled via WhatsApp (${SITE.whatsappDisplay}) or email (${SITE.emailSales}). Bilingual site (Spanish/English).

> ${SITE.name} es un distribuidor de suministros industriales en ${SITE.city}, ${SITE.region}, al servicio de la industria panameña desde ${SITE.founded}. Líneas de producto (marca PROFIX): mangueras de PVC (succión, descarga, layflat, grado alimenticio), mangueras de goma (aire, agua, combustible, químicos, soldadura), mangueras hidráulicas (SAE 100 R1, R2, R4, R7, R8, R13, R15, 4SP, 4SH), conexiones y casquillos hidráulicos (JIC 37°, NPT, BSP, M22), conexiones industriales (acoples Camlock tipos A/B/C/D/DC/DP/E/F, Chicago, niples combinados, filtros de succión), válvulas y equipos (válvulas de bola inoxidable, mariposa wafer, flejadoras) y bandas transportadoras. Ensamblaje de mangueras a la medida. Modo catálogo: sin precios en línea — las cotizaciones se gestionan por WhatsApp o correo.

## Company / Empresa
- Name: ${SITE.name} (${SITE.shortName})
- Location: ${SITE.address}, ${SITE.city}, ${SITE.region} (${SITE.country})
- Coordinates: ${SITE.geo.lat}, ${SITE.geo.lng}
- Hours: ${SITE.hours.en}
- WhatsApp: ${SITE.whatsappDisplay} · Phone: ${SITE.phone}
- Email: ${SITE.emailSales}
- Instagram: ${SITE.instagram}
- Facebook: ${SITE.facebook}
- Map: ${SITE.mapUrl}
- Sitemap: ${SITE.baseUrl}/sitemap.xml
- Brand distributed: PROFIX
- Area served: ${SITE.countryName.en} (nationwide shipping)

## Español
- [Inicio](${abs(U.home('es'))}): suministros industriales en Panamá.
- [Catálogo de productos](${abs(U.products('es'))}): ${PRODUCTS.length} productos en ${CATEGORIES.length} líneas.
- [Nosotros](${abs(U.about('es'))}): historia, equipo y proyectos de YRVIMAR.
- [Contacto](${abs(U.contact('es'))}): dirección, horario, mapa y formulario.
- [Blog](${abs(U.blog('es'))}): guías técnicas de mangueras, conexiones y válvulas.
- [Política de Privacidad](${abs(U.privacy('es'))})

### Categorías y productos
${catBlock('es')}

### Artículos del blog
${artLine('es')}

## English
- [Home](${abs(U.home('en'))}): industrial supplies in Panama.
- [Product catalog](${abs(U.products('en'))}): ${PRODUCTS.length} products across ${CATEGORIES.length} lines.
- [About](${abs(U.about('en'))}): YRVIMAR history, team and projects.
- [Contact](${abs(U.contact('en'))}): address, hours, map and contact form.
- [Blog](${abs(U.blog('en'))}): technical guides on hoses, fittings and valves.
- [Privacy Policy](${abs(U.privacy('en'))})

### Categories and products
${catBlock('en')}

### Blog articles
${artLine('en')}

## Usage
Content may be cited with attribution to ${SITE.name} (${SITE.baseUrl}).
Last-Updated: ${BUILD_DATE}
`;
}

function htaccess() {
  return `# ============================================================
#  YRVIMAR — configuración del servidor (Apache/LiteSpeed)
# ============================================================
Options -Indexes
DirectoryIndex index.html

# Página 404 personalizada
ErrorDocument 404 /404.html

# --- URLs limpias (sin .html) ---
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  # Dominio canónico: www -> sin www (evita contenido duplicado)
  RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]
  RewriteRule ^ https://%1%{REQUEST_URI} [R=301,L]
  # Redirigir /ruta.html -> /ruta (301)
  RewriteCond %{THE_REQUEST} \\s/+([^?\\s]+)\\.html[\\s?] [NC]
  RewriteRule ^ /%1 [R=301,L]
  # Servir archivo .html para la URL limpia
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME}\\.html -f
  RewriteRule ^(.+?)/?$ $1.html [L]
</IfModule>

# --- Cabeceras de seguridad ---
<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "geolocation=(), microphone=(), camera=(), interest-cohort=()"
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
  Header always set Cross-Origin-Opener-Policy "same-origin"
  Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; frame-src https://www.google.com; connect-src 'self'; base-uri 'self'; form-action 'self'; object-src 'none'; frame-ancestors 'self'"
</IfModule>

# --- Bloquear archivos ocultos y sensibles ---
<FilesMatch "(^\\.|\\.(bak|config|sql|ini|log|sh|inc|env)$)">
  Require all denied
</FilesMatch>

# --- Compresión ---
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml application/javascript application/json application/xml image/svg+xml
</IfModule>

# --- Caché de estáticos ---
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 1 hour"
</IfModule>
<IfModule mod_headers.c>
  <FilesMatch "\\.(webp|jpg|jpeg|png|ico|svg|css|js|woff2)$">
    Header set Cache-Control "public, max-age=31536000"
  </FilesMatch>
</IfModule>
`;
}

function manifest() {
  return JSON.stringify({
    name: SITE.name, short_name: SITE.shortName, start_url: '/es/', display: 'standalone',
    background_color: '#0a0a0b', theme_color: '#0a0a0b',
    icons: [
      { src: logo('icon-192.png'), sizes: '192x192', type: 'image/png' },
      { src: logo('icon-512.png'), sizes: '512x512', type: 'image/png' },
    ],
  }, null, 2);
}

function sitemap() {
  const urls = [];
  const add = (loc, priority, changefreq, altEs, altEn, lastmod) => {
    urls.push({ loc: abs(loc), priority, changefreq, altEs: abs(altEs), altEn: abs(altEn), lastmod });
  };
  const today = BUILD_DATE;
  for (const lang of LANGS) {
    add(U.home(lang), '1.0', 'weekly', U.home('es'), U.home('en'), today);
    add(U.products(lang), '0.9', 'weekly', U.products('es'), U.products('en'), today);
    add(U.about(lang), '0.6', 'monthly', U.about('es'), U.about('en'), today);
    add(U.contact(lang), '0.6', 'monthly', U.contact('es'), U.contact('en'), today);
    add(U.privacy(lang), '0.3', 'yearly', U.privacy('es'), U.privacy('en'), today);
    add(U.blog(lang), '0.8', 'weekly', U.blog('es'), U.blog('en'), today);
    for (const c of CATEGORIES) add(U.category(lang, c.slug[lang]), '0.8', 'monthly', U.category('es', c.slug.es), U.category('en', c.slug.en), today);
    for (const p of PRODUCTS) add(U.product(lang, p.slug[lang]), '0.7', 'monthly', U.product('es', p.slug.es), U.product('en', p.slug.en), today);
    for (const a of ARTICLES) add(U.article(lang, a.slug[lang]), '0.6', 'monthly', U.article('es', a.slug.es), U.article('en', a.slug.en), a.date);
  }
  const body = urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${u.altEs}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${u.altEn}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${u.altEs}"/>
  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>`;
}

// ============================================================================
//  PÁGINA: PROYECTOS
// ============================================================================
function pageProjects(lang) {
  const t = T[lang]; const L = lang === 'es';
  const crumbs = [{ name: t.words.home, url: U.home(lang) }, { name: t.words.projects, url: U.projects(lang) }];
  const title = L ? 'Proyectos | YRVIMAR Suministros Industriales Panamá' : 'Projects | YRVIMAR Industrial Supplies Panama';
  const desc = L ? 'Proyectos e instalaciones reales de YRVIMAR en la industria panameña: mangueras, conexiones, válvulas y equipos en operación.' : 'Real YRVIMAR projects and installations in Panamanian industry: hoses, fittings, valves and equipment in operation.';
  const main = `
<section class="page-hero">
  <div class="techgrid"></div>
  <div class="container">
    <nav class="crumbs" aria-label="breadcrumb"><a href="${U.home(lang)}">${t.words.home}</a><span class="sep">/</span><span>${t.words.projects}</span></nav>
    <span class="eyebrow" data-num="" style="margin-top:22px;display:inline-flex"><span class="tick"></span>${t.words.projects}</span>
    <h1>${L ? 'Nuestro trabajo en terreno' : 'Our work in the field'}</h1>
    <p class="lead">${L ? 'Instalaciones y proyectos reales que respaldan la experiencia de YRVIMAR con la industria de Panamá.' : "Real installations and projects backing YRVIMAR's experience with Panama's industry."}</p>
  </div>
</section>
<section class="section--tight">
  <div class="container">
    <div class="proj-grid" data-reveal-stagger>
      ${PROJECTS.map((pr, i) => `<a class="proj-item${i % 5 === 0 ? ' proj-item--big' : ''}" href="${img(pr.img)}" target="_blank" rel="noopener"><img src="${img(pr.img)}" alt="${L ? 'Proyecto YRVIMAR' : 'YRVIMAR project'} ${i + 1}" loading="lazy"></a>`).join('\n      ')}
    </div>
    <div class="cta-band ticked" data-reveal style="margin-top:48px">
      <div class="glow"></div>
      <h2>${L ? '¿Tienes un proyecto en mente?' : 'Have a project in mind?'}</h2>
      <p>${L ? 'Cuéntanos qué necesitas y te acompañamos con producto y asesoría técnica.' : 'Tell us what you need and we support you with products and technical advice.'}</p>
      <div class="hero-cta"><a class="btn btn--wa btn--lg" href="${wa(L ? 'Hola YRVIMAR, tengo un proyecto y quisiera asesoría.' : 'Hello YRVIMAR, I have a project and would like advice.')}" target="_blank" rel="noopener">${I.wa} ${t.cta.quote}</a><a class="btn btn--ghost btn--lg" href="${U.contact(lang)}">${t.cta.contactUs} ${I.arrowR}</a></div>
    </div>
  </div>
</section>`;
  return shell({ lang, active: 'projects', meta: { lang, title, desc, path: U.projects(lang), alternates: alts(U.projects('es'), U.projects('en')), jsonld: [ldBreadcrumb(crumbs)] }, main });
}

// ============================================================================
//  PÁGINA: POLÍTICA DE PRIVACIDAD
// ============================================================================
function pagePrivacy(lang) {
  const t = T[lang]; const L = lang === 'es';
  const label = L ? 'Política de Privacidad' : 'Privacy Policy';
  const updated = L ? 'Última actualización: agosto de 2026' : 'Last updated: August 2026';
  const crumbs = [{ name: t.words.home, url: U.home(lang) }, { name: label, url: U.privacy(lang) }];
  const title = L ? 'Política de Privacidad | YRVIMAR Panamá' : 'Privacy Policy | YRVIMAR Panama';
  const desc = L
    ? 'Política de privacidad de YRVIMAR Services & Supply: qué datos tratamos, cómo los usamos y tus derechos.'
    : 'Privacy policy of YRVIMAR Services & Supply: what data we process, how we use it and your rights.';
  const S = (h, body) => `<h2>${h}</h2>${body}`;
  const es = `
    ${S('1. Responsable del tratamiento', `<p>${SITE.name}, con domicilio en ${SITE.address}, ${SITE.city}, ${SITE.region}. Correo de contacto: <a href="mailto:${SITE.emailSales}">${SITE.emailSales}</a> · Teléfono: ${SITE.phone}.</p>`)}
    ${S('2. Alcance de este sitio', `<p>Este sitio es un <strong>catálogo informativo</strong>. No vende en línea, no procesa pagos ni requiere que crees una cuenta. No se muestran precios: las cotizaciones se gestionan por WhatsApp o correo.</p>`)}
    ${S('3. Qué datos tratamos', `<ul><li><strong>Datos que nos envías voluntariamente</strong> a través del formulario de contacto o de WhatsApp: nombre, producto de interés y el mensaje que redactes.</li><li><strong>Datos técnicos básicos</strong> del servidor (dirección IP, tipo de navegador) generados de forma estándar al visitar cualquier web.</li></ul>`)}
    ${S('4. Para qué los usamos', `<ul><li>Responder tus consultas y elaborar cotizaciones.</li><li>Dar seguimiento comercial a tu solicitud.</li><li>Mejorar el contenido y funcionamiento del sitio.</li></ul><p>No vendemos ni cedemos tus datos a terceros para fines publicitarios.</p>`)}
    ${S('5. El formulario y WhatsApp', `<p>Al enviar el formulario, tu mensaje se abre en <strong>WhatsApp</strong> para que lo envíes a nuestro número. Esa comunicación se rige además por la política de privacidad de WhatsApp (Meta).</p>`)}
    ${S('6. Servicios de terceros', `<ul><li><strong>Google Maps</strong>: mostramos un mapa de nuestra ubicación; Google puede recopilar datos de uso.</li><li><strong>Hostinger</strong>: alojamiento del sitio.</li><li><strong>WhatsApp / Meta</strong>: canal de contacto.</li></ul>`)}
    ${S('7. Cookies', `<p>Este sitio no utiliza cookies publicitarias ni de seguimiento propias. Los servicios embebidos (Google Maps) pueden usar sus propias cookies. Si en el futuro se incorporan herramientas de analítica, se informará en esta misma política.</p>`)}
    ${S('8. Conservación', `<p>Conservamos tus datos de contacto solo el tiempo necesario para atender tu solicitud y el seguimiento comercial asociado.</p>`)}
    ${S('9. Tus derechos', `<p>Puedes solicitar el acceso, la rectificación o la eliminación de tus datos escribiéndonos a <a href="mailto:${SITE.emailSales}">${SITE.emailSales}</a>.</p>`)}
    ${S('10. Cambios', `<p>Podemos actualizar esta política. La versión vigente estará siempre disponible en esta página.</p>`)}`;
  const en = `
    ${S('1. Data controller', `<p>${SITE.name}, located at ${SITE.address}, ${SITE.city}, ${SITE.region}. Contact email: <a href="mailto:${SITE.emailSales}">${SITE.emailSales}</a> · Phone: ${SITE.phone}.</p>`)}
    ${S('2. Scope of this website', `<p>This site is an <strong>informational catalog</strong>. It does not sell online, process payments or require you to create an account. No prices are shown: quotes are handled via WhatsApp or email.</p>`)}
    ${S('3. What data we process', `<ul><li><strong>Data you send voluntarily</strong> through the contact form or WhatsApp: name, product of interest and the message you write.</li><li><strong>Basic technical data</strong> from the server (IP address, browser type) generated as standard when visiting any website.</li></ul>`)}
    ${S('4. How we use it', `<ul><li>To answer your inquiries and prepare quotes.</li><li>To follow up on your request commercially.</li><li>To improve the site content and performance.</li></ul><p>We do not sell or share your data with third parties for advertising purposes.</p>`)}
    ${S('5. The form and WhatsApp', `<p>When you submit the form, your message opens in <strong>WhatsApp</strong> for you to send it to our number. That communication is also governed by WhatsApp's (Meta) privacy policy.</p>`)}
    ${S('6. Third-party services', `<ul><li><strong>Google Maps</strong>: we show a map of our location; Google may collect usage data.</li><li><strong>Hostinger</strong>: website hosting.</li><li><strong>WhatsApp / Meta</strong>: contact channel.</li></ul>`)}
    ${S('7. Cookies', `<p>This site does not use its own advertising or tracking cookies. Embedded services (Google Maps) may use their own cookies. If analytics tools are added in the future, this policy will be updated accordingly.</p>`)}
    ${S('8. Retention', `<p>We keep your contact data only as long as necessary to handle your request and the related commercial follow-up.</p>`)}
    ${S('9. Your rights', `<p>You may request access, correction or deletion of your data by writing to <a href="mailto:${SITE.emailSales}">${SITE.emailSales}</a>.</p>`)}
    ${S('10. Changes', `<p>We may update this policy. The current version will always be available on this page.</p>`)}`;
  const main = `
<section class="page-hero">
  <div class="techgrid"></div>
  <div class="container">
    <nav class="crumbs" aria-label="breadcrumb"><a href="${U.home(lang)}">${t.words.home}</a><span class="sep">/</span><span>${label}</span></nav>
    <span class="eyebrow" data-num="" style="margin-top:22px;display:inline-flex"><span class="tick"></span>${L ? 'Legal' : 'Legal'}</span>
    <h1>${label}</h1>
    <p class="lead">${updated}</p>
  </div>
</section>
<section class="section">
  <div class="container"><div class="legal-doc">${L ? es : en}</div></div>
</section>`;
  return shell({ lang, active: '', meta: { lang, title, desc, path: U.privacy(lang), alternates: alts(U.privacy('es'), U.privacy('en')), robots: 'index, follow', jsonld: [ldBreadcrumb(crumbs)] }, main });
}

function notFound() {
  const lang = 'es';
  const main = `<section class="section" style="padding-top:160px;text-align:center;min-height:70vh;display:flex;align-items:center;justify-content:center">
  <div class="container">
    <span class="eyebrow eyebrow--plain" data-num="">Error 404</span>
    <h1 style="font-size:clamp(3rem,10vw,6rem);margin-top:16px">404</h1>
    <p class="lead" style="max-width:44ch;margin:14px auto 0">La página que buscas no existe o fue movida. / The page you're looking for doesn't exist.</p>
    <div class="hero-cta" style="justify-content:center;margin-top:32px">
      <a class="btn btn--primary btn--lg" href="/es/">Inicio</a>
      <a class="btn btn--ghost btn--lg" href="/en/">Home (EN)</a>
    </div>
  </div>
</section>`;
  return shell({ lang, active: '', meta: { lang, title: '404 — YRVIMAR', desc: 'Página no encontrada', path: '/404.html', alternates: alts('/es/', '/en/'), robots: 'noindex, follow' }, main });
}

// ============================================================================
//  BUILD
// ============================================================================
function build() {
  console.log('› Limpiando dist…');
  rmrf(DIST); ensure(DIST);

  console.log('› Copiando assets…');
  copyDir(path.join(STATIC, 'css'), path.join(DIST, 'assets/css'));
  copyDir(path.join(STATIC, 'js'), path.join(DIST, 'assets/js'));
  copyDir(path.join(STATIC, 'img'), path.join(DIST, 'assets/img'));
  copyDir(path.join(STATIC, 'logo'), path.join(DIST, 'assets/logo'));

  let count = 0;
  for (const lang of LANGS) {
    write(`${lang}/index.html`, pageHome(lang)); count++;
    write(`${lang}/${PATHS[lang].products}.html`, pageProducts(lang)); count++;
    write(`${lang}/${PATHS[lang].about}.html`, pageAbout(lang)); count++;
    write(`${lang}/${PATHS[lang].contact}.html`, pageContact(lang)); count++;
    write(`${lang}/${PATHS[lang].privacy}.html`, pagePrivacy(lang)); count++;
    write(`${lang}/${PATHS[lang].blog}/index.html`, pageBlog(lang)); count++;
    for (const c of CATEGORIES) { write(`${lang}/${PATHS[lang].category}/${c.slug[lang]}.html`, pageCategory(c, lang)); count++; }
    for (const p of PRODUCTS) { write(`${lang}/${PATHS[lang].product}/${p.slug[lang]}.html`, pageProduct(p, lang)); count++; }
    for (const a of ARTICLES) { write(`${lang}/${PATHS[lang].blog}/${a.slug[lang]}.html`, pageArticle(a, lang)); count++; }
  }

  write('index.html', rootIndex());
  write('404.html', notFound());
  write('robots.txt', robots());
  write('llms.txt', llmsTxt());
  write('sitemap.xml', sitemap());
  write('site.webmanifest', manifest());
  write('.htaccess', htaccess());

  console.log(`✓ Generadas ${count} páginas HTML + root/404/robots/sitemap/manifest`);
  console.log(`✓ Salida: ${DIST}`);
}

build();
