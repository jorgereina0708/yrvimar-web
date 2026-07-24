// ============================================================================
//  YRVIMAR — Datos del sitio (config, i18n, categorías, productos)
//  Sitio catálogo bilingüe (ES/EN). Sin precios (modo catálogo).
// ============================================================================

const SITE = {
  name: 'YRVIMAR Services & Supply, INC',
  shortName: 'YRVIMAR',
  // Base URL del despliegue (dominio temporal Hostinger). Usado en canonical, OG, sitemap, hreflang.
  baseUrl: 'https://seashell-dove-613694.hostingersite.com',
  domainLabel: 'yrvimar.com',
  phone: '+507 308-8843',
  phoneRaw: '+5073088843',
  whatsapp: '50768550933',            // wa.me (sin + ni guiones)
  whatsappDisplay: '+507 6855-0933',
  emailSales: 'ventas@yrvimar.com',
  emailAdmin: 'admin@yrvimar.com',
  address: 'Parque Lefevre, Av. 1B Sur, Edificio Joritza, Local 1',
  city: 'Ciudad de Panamá',
  region: 'Panamá',
  country: 'PA',
  countryName: { es: 'Panamá', en: 'Panama' },
  geo: { lat: 9.0009, lng: -79.4859 }, // Parque Lefevre approx
  instagram: 'https://www.instagram.com/yrvimar_inc/',
  instagramHandle: '@yrvimar_inc',
  founded: '2019',
  hours: {
    es: 'Lun–Vie 8:00–17:00 · Sáb 8:00–12:00',
    en: 'Mon–Fri 8:00–17:00 · Sat 8:00–12:00',
  },
};

// ---------------------------------------------------------------------------
//  Idiomas
// ---------------------------------------------------------------------------
const LANGS = ['es', 'en'];
const DEFAULT_LANG = 'es';

// Segmentos de ruta por idioma (para URLs localizadas)
const PATHS = {
  es: { products: 'productos', category: 'categoria', product: 'producto', about: 'nosotros', contact: 'contacto', blog: 'blog' },
  en: { products: 'products', category: 'category', product: 'product', about: 'about', contact: 'contact', blog: 'blog' },
};

// ---------------------------------------------------------------------------
//  Cadenas de interfaz (i18n)
// ---------------------------------------------------------------------------
const T = {
  es: {
    localeTag: 'es_PA',
    dir: 'ltr',
    skipToContent: 'Saltar al contenido',
    nav: { home: 'Inicio', products: 'Productos', categories: 'Categorías', about: 'Nosotros', blog: 'Blog', contact: 'Contacto' },
    cta: { quote: 'Cotizar por WhatsApp', viewCatalog: 'Ver catálogo', viewProduct: 'Ver producto', viewAll: 'Ver todo', askProduct: 'Consultar este producto', contactUs: 'Contáctanos', explore: 'Explorar categoría', backCatalog: 'Volver al catálogo', readMore: 'Leer artículo', allArticles: 'Ver todos los artículos' },
    words: { category: 'Categoría', categories: 'Categorías', products: 'Productos', product: 'Producto', applications: 'Aplicaciones', specs: 'Especificaciones técnicas', relatedProducts: 'Productos relacionados', relatedArticles: 'Artículos relacionados', featured: 'Destacados', catalog: 'Catálogo', home: 'Inicio', filterAll: 'Todos', results: 'productos', min: 'min de lectura', published: 'Publicado', by: 'Por', share: 'Compartir' },
    whatsappBtn: 'WhatsApp',
    backToTop: 'Volver arriba',
    langSwitch: 'English',
    langSwitchShort: 'EN',
    footer: {
      tagline: 'Soluciones industriales confiables para Panamá y la región.',
      catalog: 'Catálogo', company: 'Empresa', contact: 'Contacto', follow: 'Síguenos',
      rights: 'Todos los derechos reservados.',
      catalogNote: 'Precios disponibles bajo cotización.',
      disclaimer: 'Catálogo demostrativo. Imágenes de referencia; las especificaciones pueden variar según disponibilidad.',
    },
  },
  en: {
    localeTag: 'en_US',
    dir: 'ltr',
    skipToContent: 'Skip to content',
    nav: { home: 'Home', products: 'Products', categories: 'Categories', about: 'About', blog: 'Blog', contact: 'Contact' },
    cta: { quote: 'Quote on WhatsApp', viewCatalog: 'View catalog', viewProduct: 'View product', viewAll: 'View all', askProduct: 'Ask about this product', contactUs: 'Contact us', explore: 'Explore category', backCatalog: 'Back to catalog', readMore: 'Read article', allArticles: 'View all articles' },
    words: { category: 'Category', categories: 'Categories', products: 'Products', product: 'Product', applications: 'Applications', specs: 'Technical specifications', relatedProducts: 'Related products', relatedArticles: 'Related articles', featured: 'Featured', catalog: 'Catalog', home: 'Home', filterAll: 'All', results: 'products', min: 'min read', published: 'Published', by: 'By', share: 'Share' },
    whatsappBtn: 'WhatsApp',
    backToTop: 'Back to top',
    langSwitch: 'Español',
    langSwitchShort: 'ES',
    footer: {
      tagline: 'Reliable industrial solutions for Panama and the region.',
      catalog: 'Catalog', company: 'Company', contact: 'Contact', follow: 'Follow us',
      rights: 'All rights reserved.',
      catalogNote: 'Prices available upon request.',
      disclaimer: 'Demo catalog. Reference images; specifications may vary by availability.',
    },
  },
};

// ---------------------------------------------------------------------------
//  Categorías
// ---------------------------------------------------------------------------
const CATEGORIES = [
  {
    id: 'mangueras-industriales',
    slug: { es: 'mangueras-industriales', en: 'industrial-hoses' },
    name: { es: 'Mangueras Industriales', en: 'Industrial Hoses' },
    tagline: { es: 'Succión, descarga y multiuso', en: 'Suction, discharge & multipurpose' },
    icon: 'hose',
    image: 'cat-industriales.webp',
    desc: {
      es: 'Mangueras industriales para conducción de agua, aire, líquidos y aplicaciones de servicio pesado. Modelos de succión y descarga, layflat y multiuso reforzadas para riego, drenaje, construcción y minería.',
      en: 'Industrial hoses for water, air and fluid handling in heavy-duty service. Suction and discharge, layflat and reinforced multipurpose models for irrigation, drainage, construction and mining.',
    },
  },
  {
    id: 'mangueras-hidraulicas',
    slug: { es: 'mangueras-hidraulicas', en: 'hydraulic-hoses' },
    name: { es: 'Mangueras Hidráulicas', en: 'Hydraulic Hoses' },
    tagline: { es: 'Alta presión R1 · R2 · 4SP', en: 'High pressure R1 · R2 · 4SP' },
    icon: 'gauge',
    image: 'cat-hidraulicas.webp',
    desc: {
      es: 'Mangueras hidráulicas de alta presión con refuerzo de acero trenzado para maquinaria pesada, equipos móviles y sistemas oleohidráulicos. Ensamblaje con conexiones prensadas a la medida.',
      en: 'High-pressure hydraulic hoses with braided steel reinforcement for heavy machinery, mobile equipment and oil-hydraulic systems. Custom crimped fitting assemblies made to spec.',
    },
  },
  {
    id: 'conexiones-acoples',
    slug: { es: 'conexiones-acoples', en: 'fittings-couplings' },
    name: { es: 'Conexiones y Acoples', en: 'Fittings & Couplings' },
    tagline: { es: 'Chicago, Camlock, JIC, NPT', en: 'Chicago, Camlock, JIC, NPT' },
    icon: 'coupling',
    image: 'cat-conexiones.webp',
    desc: {
      es: 'Amplia línea de conexiones y acoples en bronce, aluminio y acero galvanizado: acoples rápidos Chicago, Camlock cam-and-groove, espigas, adaptadores JIC/NPT y uniones para cada estándar.',
      en: 'A broad line of brass, aluminum and galvanized steel fittings and couplings: Chicago quick couplings, cam-and-groove Camlock, hose barbs, JIC/NPT adapters and unions for every standard.',
    },
  },
  {
    id: 'valvulas',
    slug: { es: 'valvulas', en: 'valves' },
    name: { es: 'Válvulas', en: 'Valves' },
    tagline: { es: 'Bola en inoxidable y bronce', en: 'Stainless & bronze ball valves' },
    icon: 'valve',
    image: 'cat-valvulas.webp',
    desc: {
      es: 'Válvulas de bola en acero inoxidable 304 y bronce, rango 1/4" a 4", rating 1000 WOG. Control de flujo confiable para agua, aire, vapor y aplicaciones industriales y marinas.',
      en: 'Stainless steel 304 and bronze ball valves, 1/4" to 4", rated 1000 WOG. Reliable flow control for water, air, steam and industrial or marine applications.',
    },
  },
  {
    id: 'accesorios-seguridad',
    slug: { es: 'accesorios-seguridad', en: 'accessories-safety' },
    name: { es: 'Accesorios y Seguridad', en: 'Accessories & Safety' },
    tagline: { es: 'Abrazaderas, whip check, reparación', en: 'Clamps, whip check, repair' },
    icon: 'shield',
    image: 'cat-accesorios.webp',
    desc: {
      es: 'Accesorios y elementos de seguridad para líneas de manguera: abrazaderas sinfín inoxidables, cables de seguridad whip check y abrazaderas de reparación de tubería para fugas y grietas.',
      en: 'Accessories and safety elements for hose lines: stainless worm-gear clamps, whip check safety cables and pipe repair clamps for leaks and cracks.',
    },
  },
];

// ---------------------------------------------------------------------------
//  Productos (modo catálogo, sin precios)
// ---------------------------------------------------------------------------
const PRODUCTS = [
  {
    id: 'manguera-succion-descarga-pvc',
    cat: 'mangueras-industriales',
    featured: true,
    image: 'prod-succion-espiral.webp',
    slug: { es: 'manguera-succion-descarga-pvc', en: 'pvc-suction-discharge-hose' },
    name: { es: 'Manguera de Succión y Descarga PVC', en: 'PVC Suction & Discharge Hose' },
    short: { es: 'Manguera espiralada reforzada para succión y descarga de agua y líquidos.', en: 'Spiral-reinforced hose for suction and discharge of water and fluids.' },
    long: {
      es: 'Manguera de PVC con refuerzo helicoidal rígido, ideal para succión y descarga de agua, lodos ligeros y líquidos en riego, drenaje y achique. Pared flexible y transparente que permite ver el flujo, con excelente resistencia al colapso por vacío.',
      en: 'PVC hose with rigid helical reinforcement, ideal for suction and discharge of water, light slurry and fluids in irrigation, drainage and dewatering. Flexible, transparent wall for flow visibility with excellent resistance to vacuum collapse.',
    },
    specs: [
      { l: { es: 'Diámetros', en: 'Diameters' }, v: '1" – 8"' },
      { l: { es: 'Material', en: 'Material' }, v: { es: 'PVC + hélice de PVC rígido', en: 'PVC + rigid PVC helix' } },
      { l: { es: 'Temperatura', en: 'Temperature' }, v: '-10°C – 60°C' },
      { l: { es: 'Presentación', en: 'Format' }, v: { es: 'Rollos de 20 / 30 m', en: '20 / 30 m rolls' } },
    ],
    apps: { es: ['Riego agrícola', 'Achique y drenaje', 'Bombeo de agua', 'Construcción'], en: ['Agricultural irrigation', 'Dewatering & drainage', 'Water pumping', 'Construction'] },
  },
  {
    id: 'manguera-layflat',
    cat: 'mangueras-industriales',
    featured: true,
    image: 'prod-layflat.webp',
    slug: { es: 'manguera-layflat-descarga', en: 'layflat-discharge-hose' },
    name: { es: 'Manguera Layflat de Descarga', en: 'Layflat Discharge Hose' },
    short: { es: 'Manguera plana enrollable de alto caudal para descarga de agua.', en: 'Flat, rollable high-flow hose for water discharge.' },
    long: {
      es: 'Manguera layflat de PVC que se aplana para almacenarse y transportarse en rollos compactos. Alto caudal de descarga con mínima ocupación de espacio, perfecta para obras, bombeo temporal y contra incendios.',
      en: 'PVC layflat hose that flattens for compact roll storage and transport. High discharge flow with minimal footprint, perfect for job sites, temporary pumping and firefighting.',
    },
    specs: [
      { l: { es: 'Diámetros', en: 'Diameters' }, v: '1.5" – 12"' },
      { l: { es: 'Material', en: 'Material' }, v: { es: 'PVC reforzado con hilo', en: 'Yarn-reinforced PVC' } },
      { l: { es: 'Presión de trabajo', en: 'Working pressure' }, v: { es: 'Hasta 6 bar (según medida)', en: 'Up to 6 bar (per size)' } },
      { l: { es: 'Presentación', en: 'Format' }, v: { es: 'Rollos de 50 / 100 m', en: '50 / 100 m rolls' } },
    ],
    apps: { es: ['Descarga de bombas', 'Riego móvil', 'Achique de obra', 'Servicio contra incendios'], en: ['Pump discharge', 'Mobile irrigation', 'Site dewatering', 'Fire service'] },
  },
  {
    id: 'manguera-aire-agua',
    cat: 'mangueras-industriales',
    featured: false,
    image: 'prod-aire-agua.webp',
    slug: { es: 'manguera-multiuso-aire-agua', en: 'air-water-multipurpose-hose' },
    name: { es: 'Manguera Multiuso Aire / Agua', en: 'Air / Water Multipurpose Hose' },
    short: { es: 'Manguera de caucho versátil para aire comprimido y agua.', en: 'Versatile rubber hose for compressed air and water.' },
    long: {
      es: 'Manguera de caucho multiuso resistente a la abrasión y a la intemperie, para aire comprimido, agua y aplicaciones generales de taller e industria. Flexible y durable en uso continuo.',
      en: 'Abrasion- and weather-resistant multipurpose rubber hose for compressed air, water and general workshop and industrial use. Flexible and durable in continuous service.',
    },
    specs: [
      { l: { es: 'Diámetros', en: 'Diameters' }, v: '1/4" – 2"' },
      { l: { es: 'Material', en: 'Material' }, v: { es: 'Caucho SBR/EPDM', en: 'SBR/EPDM rubber' } },
      { l: { es: 'Presión de trabajo', en: 'Working pressure' }, v: '20 bar (300 PSI)' },
      { l: { es: 'Temperatura', en: 'Temperature' }, v: '-20°C – 80°C' },
    ],
    apps: { es: ['Aire comprimido', 'Talleres', 'Agua a presión', 'Uso general industrial'], en: ['Compressed air', 'Workshops', 'Pressurized water', 'General industrial use'] },
  },
  {
    id: 'manguera-hidraulica-r2',
    cat: 'mangueras-hidraulicas',
    featured: true,
    image: 'cat-hidraulicas.webp',
    slug: { es: 'manguera-hidraulica-r2-alta-presion', en: 'r2-high-pressure-hydraulic-hose' },
    name: { es: 'Manguera Hidráulica R2 Alta Presión', en: 'R2 High-Pressure Hydraulic Hose' },
    short: { es: 'Doble refuerzo de acero trenzado para alta presión SAE 100 R2.', en: 'Dual braided steel reinforcement for SAE 100 R2 high pressure.' },
    long: {
      es: 'Manguera hidráulica SAE 100 R2AT con doble trenza de acero de alta resistencia para líneas de alta presión en maquinaria pesada, equipos móviles y prensas. La ensamblamos con las conexiones prensadas que tu equipo requiere.',
      en: 'SAE 100 R2AT hydraulic hose with dual high-tensile steel braid for high-pressure lines in heavy machinery, mobile equipment and presses. We assemble it with the crimped fittings your equipment needs.',
    },
    specs: [
      { l: { es: 'Norma', en: 'Standard' }, v: 'SAE 100 R2AT' },
      { l: { es: 'Diámetros', en: 'Diameters' }, v: '1/4" – 2"' },
      { l: { es: 'Refuerzo', en: 'Reinforcement' }, v: { es: 'Doble trenza de acero', en: 'Dual steel braid' } },
      { l: { es: 'Presión máx.', en: 'Max pressure' }, v: { es: 'Hasta 5800 PSI (según medida)', en: 'Up to 5800 PSI (per size)' } },
    ],
    apps: { es: ['Maquinaria pesada', 'Equipos móviles', 'Sistemas oleohidráulicos', 'Prensas hidráulicas'], en: ['Heavy machinery', 'Mobile equipment', 'Oil-hydraulic systems', 'Hydraulic presses'] },
  },
  {
    id: 'manguera-hidraulica-r1',
    cat: 'mangueras-hidraulicas',
    featured: false,
    image: 'hero.webp',
    slug: { es: 'manguera-hidraulica-r1', en: 'r1-hydraulic-hose' },
    name: { es: 'Manguera Hidráulica R1', en: 'R1 Hydraulic Hose' },
    short: { es: 'Refuerzo de una trenza de acero para presión media-alta.', en: 'Single steel braid reinforcement for medium-high pressure.' },
    long: {
      es: 'Manguera hidráulica SAE 100 R1AT con una trenza de acero, ideal para líneas hidráulicas de presión media-alta en equipos agrícolas, industriales y de construcción. Ensamblaje a la medida disponible.',
      en: 'SAE 100 R1AT hydraulic hose with a single steel braid, ideal for medium-high pressure hydraulic lines in agricultural, industrial and construction equipment. Custom assembly available.',
    },
    specs: [
      { l: { es: 'Norma', en: 'Standard' }, v: 'SAE 100 R1AT' },
      { l: { es: 'Diámetros', en: 'Diameters' }, v: '1/4" – 2"' },
      { l: { es: 'Refuerzo', en: 'Reinforcement' }, v: { es: 'Una trenza de acero', en: 'Single steel braid' } },
      { l: { es: 'Presión máx.', en: 'Max pressure' }, v: { es: 'Hasta 3000 PSI (según medida)', en: 'Up to 3000 PSI (per size)' } },
    ],
    apps: { es: ['Equipos agrícolas', 'Maquinaria industrial', 'Construcción', 'Líneas de retorno'], en: ['Agricultural equipment', 'Industrial machinery', 'Construction', 'Return lines'] },
  },
  {
    id: 'acople-chicago',
    cat: 'conexiones-acoples',
    featured: true,
    image: 'prod-chicago.webp',
    slug: { es: 'acople-rapido-chicago-universal', en: 'chicago-universal-quick-coupling' },
    name: { es: 'Acople Rápido Chicago Universal', en: 'Chicago Universal Quick Coupling' },
    short: { es: 'Acople de garras para aire comprimido, conexión y desconexión rápida.', en: 'Claw coupling for compressed air, fast connect/disconnect.' },
    long: {
      es: 'Acople universal tipo Chicago en acero galvanizado para líneas de aire comprimido. Conexión y desconexión rápida de garras con junta de sellado, compatible con el estándar universal más usado en la industria.',
      en: 'Universal Chicago-style coupling in galvanized steel for compressed air lines. Fast claw connect/disconnect with sealing gasket, compatible with the most common universal standard in industry.',
    },
    specs: [
      { l: { es: 'Material', en: 'Material' }, v: { es: 'Acero galvanizado', en: 'Galvanized steel' } },
      { l: { es: 'Tipo', en: 'Type' }, v: { es: 'Garras universal (Chicago)', en: 'Universal claw (Chicago)' } },
      { l: { es: 'Roscas', en: 'Threads' }, v: '1/2" – 1-1/4" NPT' },
      { l: { es: 'Servicio', en: 'Service' }, v: { es: 'Aire comprimido', en: 'Compressed air' } },
    ],
    apps: { es: ['Aire comprimido', 'Herramientas neumáticas', 'Talleres', 'Líneas de servicio'], en: ['Compressed air', 'Pneumatic tools', 'Workshops', 'Service lines'] },
  },
  {
    id: 'acople-camlock',
    cat: 'conexiones-acoples',
    featured: true,
    image: 'prod-camlock.webp',
    slug: { es: 'acople-camlock-aluminio', en: 'aluminum-camlock-coupling' },
    name: { es: 'Acople Camlock de Aluminio', en: 'Aluminum Camlock Coupling' },
    short: { es: 'Acople cam-and-groove para conexión rápida sin herramientas.', en: 'Cam-and-groove coupling for tool-free quick connection.' },
    long: {
      es: 'Acople rápido tipo Camlock (cam-and-groove) en aluminio para transferencia de líquidos. Sistema de palancas que permite conectar y desconectar sin herramientas, disponible en todos los tipos (A, B, C, D, E, F, DC, DP).',
      en: 'Camlock (cam-and-groove) quick coupling in aluminum for liquid transfer. Cam-arm system connects and disconnects without tools, available in all types (A, B, C, D, E, F, DC, DP).',
    },
    specs: [
      { l: { es: 'Material', en: 'Material' }, v: { es: 'Aluminio (también inox y polipropileno)', en: 'Aluminum (also SS and polypropylene)' } },
      { l: { es: 'Tipos', en: 'Types' }, v: 'A · B · C · D · E · F · DC · DP' },
      { l: { es: 'Diámetros', en: 'Diameters' }, v: '1/2" – 6"' },
      { l: { es: 'Servicio', en: 'Service' }, v: { es: 'Agua, combustible, químicos', en: 'Water, fuel, chemicals' } },
    ],
    apps: { es: ['Transferencia de líquidos', 'Combustibles', 'Cisternas', 'Agroindustria'], en: ['Liquid transfer', 'Fuels', 'Tanker trucks', 'Agribusiness'] },
  },
  {
    id: 'conexion-jic-npt',
    cat: 'conexiones-acoples',
    featured: false,
    image: 'prod-jic.webp',
    slug: { es: 'conexion-hidraulica-jic-npt', en: 'jic-npt-hydraulic-fitting' },
    name: { es: 'Conexión Hidráulica JIC / NPT', en: 'JIC / NPT Hydraulic Fitting' },
    short: { es: 'Adaptadores en bronce y acero para ensamblaje hidráulico.', en: 'Brass and steel adapters for hydraulic assembly.' },
    long: {
      es: 'Conexiones y adaptadores hidráulicos JIC 37°, NPT y BSP en bronce y acero, para el ensamblaje de mangueras y líneas rígidas. Sellado confiable en alta presión y amplia variedad de configuraciones macho-hembra.',
      en: 'JIC 37°, NPT and BSP hydraulic fittings and adapters in brass and steel for assembling hoses and rigid lines. Reliable high-pressure sealing and a wide variety of male-female configurations.',
    },
    specs: [
      { l: { es: 'Estándares', en: 'Standards' }, v: 'JIC 37° · NPT · BSP' },
      { l: { es: 'Material', en: 'Material' }, v: { es: 'Bronce / acero', en: 'Brass / steel' } },
      { l: { es: 'Diámetros', en: 'Diameters' }, v: '1/4" – 2"' },
      { l: { es: 'Configuración', en: 'Configuration' }, v: { es: 'Macho, hembra, codos, tees', en: 'Male, female, elbows, tees' } },
    ],
    apps: { es: ['Ensamblaje hidráulico', 'Adaptación de roscas', 'Líneas rígidas', 'Mantenimiento'], en: ['Hydraulic assembly', 'Thread adaptation', 'Rigid lines', 'Maintenance'] },
  },
  {
    id: 'espiga-abrazadera',
    cat: 'conexiones-acoples',
    featured: false,
    image: 'cat-conexiones.webp',
    slug: { es: 'espiga-y-abrazadera', en: 'hose-barb-and-clamp' },
    name: { es: 'Espiga y Abrazadera', en: 'Hose Barb & Clamp' },
    short: { es: 'Espigas en bronce y acero con abrazadera para sellar mangueras.', en: 'Brass and steel barbs with clamp to seal hoses.' },
    long: {
      es: 'Espigas (nipples) en bronce y acero galvanizado con abrazadera para asegurar mangueras de agua y aire. Solución económica y confiable para terminar líneas de baja y media presión.',
      en: 'Brass and galvanized steel barbs (nipples) with clamp to secure water and air hoses. An economical, reliable solution to terminate low- and medium-pressure lines.',
    },
    specs: [
      { l: { es: 'Material', en: 'Material' }, v: { es: 'Bronce / acero galvanizado', en: 'Brass / galvanized steel' } },
      { l: { es: 'Diámetros', en: 'Diameters' }, v: '1/4" – 2"' },
      { l: { es: 'Roscas', en: 'Threads' }, v: 'NPT / BSP' },
      { l: { es: 'Incluye', en: 'Includes' }, v: { es: 'Abrazadera sinfín', en: 'Worm-gear clamp' } },
    ],
    apps: { es: ['Líneas de agua', 'Aire de baja presión', 'Riego', 'Reparaciones'], en: ['Water lines', 'Low-pressure air', 'Irrigation', 'Repairs'] },
  },
  {
    id: 'valvula-bola-inox',
    cat: 'valvulas',
    featured: true,
    image: 'prod-valvula-inox.webp',
    slug: { es: 'valvula-bola-acero-inoxidable-304', en: 'stainless-steel-304-ball-valve' },
    name: { es: 'Válvula de Bola Acero Inoxidable 304', en: 'Stainless Steel 304 Ball Valve' },
    short: { es: 'Válvula de bola inoxidable 1000 WOG para servicio exigente.', en: 'Stainless ball valve 1000 WOG for demanding service.' },
    long: {
      es: 'Válvula de bola de dos piezas en acero inoxidable AISI 304, rating 1000 WOG, con manija de palanca. Cierre hermético y resistencia a la corrosión para agua, aire, vapor y ambientes marinos e industriales.',
      en: 'Two-piece ball valve in AISI 304 stainless steel, rated 1000 WOG, with lever handle. Tight shut-off and corrosion resistance for water, air, steam and marine or industrial environments.',
    },
    specs: [
      { l: { es: 'Material', en: 'Material' }, v: { es: 'Acero inoxidable 304', en: 'Stainless steel 304' } },
      { l: { es: 'Rating', en: 'Rating' }, v: '1000 WOG' },
      { l: { es: 'Diámetros', en: 'Diameters' }, v: '1/4" – 4"' },
      { l: { es: 'Conexión', en: 'Connection' }, v: { es: 'Roscada NPT', en: 'Threaded NPT' } },
    ],
    apps: { es: ['Agua y aire', 'Vapor', 'Industria alimentaria', 'Ambientes marinos'], en: ['Water and air', 'Steam', 'Food industry', 'Marine environments'] },
  },
  {
    id: 'valvula-bola-bronce',
    cat: 'valvulas',
    featured: false,
    image: 'cat-valvulas.webp',
    slug: { es: 'valvula-bola-bronce', en: 'bronze-ball-valve' },
    name: { es: 'Válvula de Bola de Bronce', en: 'Bronze Ball Valve' },
    short: { es: 'Válvula de bola de bronce 1000 WOG, económica y confiable.', en: 'Bronze ball valve 1000 WOG, economical and reliable.' },
    long: {
      es: 'Válvula de bola de bronce, rating 1000 WOG, con manija de palanca. Amplio uso en instalaciones de agua, aire y gas de baja presión, con excelente relación costo-durabilidad.',
      en: 'Bronze ball valve, rated 1000 WOG, with lever handle. Widely used in water, air and low-pressure gas installations, with an excellent cost-to-durability ratio.',
    },
    specs: [
      { l: { es: 'Material', en: 'Material' }, v: { es: 'Bronce', en: 'Bronze' } },
      { l: { es: 'Rating', en: 'Rating' }, v: '1000 WOG' },
      { l: { es: 'Diámetros', en: 'Diameters' }, v: '1/4" – 4"' },
      { l: { es: 'Conexión', en: 'Connection' }, v: { es: 'Roscada NPT', en: 'Threaded NPT' } },
    ],
    apps: { es: ['Instalaciones de agua', 'Aire comprimido', 'Gas de baja presión', 'Plomería industrial'], en: ['Water installations', 'Compressed air', 'Low-pressure gas', 'Industrial plumbing'] },
  },
  {
    id: 'abrazadera-sinfin',
    cat: 'accesorios-seguridad',
    featured: false,
    image: 'prod-abrazadera.webp',
    slug: { es: 'abrazadera-sinfin-inoxidable', en: 'stainless-worm-gear-clamp' },
    name: { es: 'Abrazadera Sinfín Inoxidable', en: 'Stainless Worm-Gear Clamp' },
    short: { es: 'Abrazadera de tornillo sinfín en acero inoxidable, todas las medidas.', en: 'Stainless steel worm-gear clamp in all sizes.' },
    long: {
      es: 'Abrazadera de tornillo sinfín en acero inoxidable para sujetar y sellar mangueras. Banda perforada resistente a la corrosión, con ajuste firme y uniforme para líneas de agua, aire y combustible.',
      en: 'Stainless steel worm-gear clamp to secure and seal hoses. Corrosion-resistant slotted band with firm, uniform tightening for water, air and fuel lines.',
    },
    specs: [
      { l: { es: 'Material', en: 'Material' }, v: { es: 'Acero inoxidable', en: 'Stainless steel' } },
      { l: { es: 'Rango', en: 'Range' }, v: '8 mm – 200 mm' },
      { l: { es: 'Banda', en: 'Band' }, v: { es: 'Perforada, tornillo sinfín', en: 'Slotted, worm-gear screw' } },
      { l: { es: 'Presentación', en: 'Format' }, v: { es: 'Unidad o caja', en: 'Unit or box' } },
    ],
    apps: { es: ['Sujeción de mangueras', 'Líneas de agua y aire', 'Automotriz', 'Reparaciones'], en: ['Hose fastening', 'Water and air lines', 'Automotive', 'Repairs'] },
  },
  {
    id: 'whip-check',
    cat: 'accesorios-seguridad',
    featured: true,
    image: 'cat-accesorios.webp',
    slug: { es: 'cable-seguridad-whip-check', en: 'whip-check-safety-cable' },
    name: { es: 'Cable de Seguridad Whip Check', en: 'Whip Check Safety Cable' },
    short: { es: 'Cable de retención que evita el latigazo por desconexión de manguera.', en: 'Retention cable that prevents hose whip on disconnection.' },
    long: {
      es: 'Cable de seguridad whip check en acero inoxidable que conecta dos mangueras o una manguera a una herramienta, evitando el peligroso latigazo si la conexión falla bajo presión. Elemento de seguridad esencial en líneas de aire y agua.',
      en: 'Whip check safety cable in stainless steel that links two hoses or a hose to a tool, preventing dangerous whipping if the connection fails under pressure. An essential safety element on air and water lines.',
    },
    specs: [
      { l: { es: 'Material', en: 'Material' }, v: { es: 'Acero inoxidable', en: 'Stainless steel' } },
      { l: { es: 'Uso', en: 'Use' }, v: { es: 'Manguera a manguera / a herramienta', en: 'Hose-to-hose / to tool' } },
      { l: { es: 'Medidas de manguera', en: 'Hose sizes' }, v: '1/2" – 4"' },
      { l: { es: 'Función', en: 'Function' }, v: { es: 'Retención anti-latigazo', en: 'Anti-whip retention' } },
    ],
    apps: { es: ['Líneas de aire comprimido', 'Mangueras de agua a presión', 'Minería', 'Construcción'], en: ['Compressed air lines', 'Pressurized water hoses', 'Mining', 'Construction'] },
  },
  {
    id: 'abrazadera-reparacion',
    cat: 'accesorios-seguridad',
    featured: false,
    image: 'cat-accesorios.webp',
    slug: { es: 'abrazadera-reparacion-tuberia', en: 'pipe-repair-clamp' },
    name: { es: 'Abrazadera de Reparación de Tubería', en: 'Pipe Repair Clamp' },
    short: { es: 'Abrazadera de acero inoxidable para sellar fugas y grietas.', en: 'Stainless steel clamp to seal leaks and cracks.' },
    long: {
      es: 'Abrazadera de reparación en acero inoxidable con empaque de caucho para sellar fugas, grietas y perforaciones en tuberías sin cortar el servicio de forma definitiva. Instalación rápida como solución temporal o de emergencia.',
      en: 'Stainless steel repair clamp with rubber gasket to seal leaks, cracks and punctures in pipes without a permanent service cut. Fast installation as a temporary or emergency solution.',
    },
    specs: [
      { l: { es: 'Material', en: 'Material' }, v: { es: 'Acero inoxidable + caucho', en: 'Stainless steel + rubber' } },
      { l: { es: 'Diámetros', en: 'Diameters' }, v: '1/2" – 12"' },
      { l: { es: 'Tipo', en: 'Type' }, v: { es: 'Simple, doble o triple banda', en: 'Single, double or triple band' } },
      { l: { es: 'Aplicación', en: 'Application' }, v: { es: 'Reparación de fugas', en: 'Leak repair' } },
    ],
    apps: { es: ['Reparación de fugas', 'Tuberías de agua', 'Emergencias', 'Mantenimiento'], en: ['Leak repair', 'Water pipes', 'Emergencies', 'Maintenance'] },
  },
];

module.exports = { SITE, LANGS, DEFAULT_LANG, PATHS, T, CATEGORIES, PRODUCTS };
