// ============================================================================
//  YRVIMAR — Datos del sitio (config, i18n, categorías, productos)
//  Catálogo real PROFIX. Fotos + fichas técnicas. Sin precios (modo catálogo).
// ============================================================================

const SITE = {
  name: 'YRVIMAR Services & Supply, INC',
  shortName: 'YRVIMAR',
  baseUrl: 'https://seashell-dove-613694.hostingersite.com',
  domainLabel: 'yrvimar.com',
  phone: '+507 308-8843',
  phoneRaw: '+5073088843',
  whatsapp: '50768550933',
  whatsappDisplay: '+507 6855-0933',
  emailSales: 'ventas@yrvimar.com',
  emailAdmin: 'admin@yrvimar.com',
  address: 'Parque Lefevre, Av. 1B Sur, Edificio Joritza, Local 1',
  city: 'Ciudad de Panamá',
  region: 'Panamá',
  country: 'PA',
  countryName: { es: 'Panamá', en: 'Panama' },
  geo: { lat: 9.0009, lng: -79.4859 },
  instagram: 'https://www.instagram.com/yrvimar_inc/',
  instagramHandle: '@yrvimar_inc',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Parque Lefevre, Av. 1B Sur, Edificio Joritza, Local 1, Ciudad de Panamá'),
  founded: '2019',
  hours: { es: 'Lun–Vie 8:00–17:00 · Sáb 8:00–12:00', en: 'Mon–Fri 8:00–17:00 · Sat 8:00–12:00' },
};

const LANGS = ['es', 'en'];
const DEFAULT_LANG = 'es';

const PATHS = {
  es: { products: 'productos', category: 'categoria', product: 'producto', about: 'nosotros', contact: 'contacto', blog: 'blog', projects: 'proyectos' },
  en: { products: 'products', category: 'category', product: 'product', about: 'about', contact: 'contact', blog: 'blog', projects: 'projects' },
};

const T = {
  es: {
    localeTag: 'es_PA', dir: 'ltr', skipToContent: 'Saltar al contenido',
    nav: { home: 'Inicio', products: 'Productos', categories: 'Categorías', about: 'Nosotros', blog: 'Blog', contact: 'Contacto', projects: 'Proyectos' },
    cta: { quote: 'Cotizar por WhatsApp', viewCatalog: 'Ver catálogo', viewProduct: 'Ver producto', viewAll: 'Ver todo', askProduct: 'Consultar este producto', contactUs: 'Contáctanos', explore: 'Explorar categoría', backCatalog: 'Volver al catálogo', readMore: 'Leer artículo', allArticles: 'Ver todos los artículos', viewDatasheet: 'Ver ficha técnica', downloadDatasheet: 'Descargar ficha', viewProjects: 'Ver proyectos' },
    words: { category: 'Categoría', categories: 'Categorías', products: 'Productos', product: 'Producto', applications: 'Aplicaciones', specs: 'Especificaciones técnicas', datasheet: 'Ficha técnica', relatedProducts: 'Productos relacionados', relatedArticles: 'Artículos relacionados', featured: 'Destacados', catalog: 'Catálogo', home: 'Inicio', filterAll: 'Todos', results: 'productos', min: 'min de lectura', brands: 'Marcas', projects: 'Proyectos' },
    whatsappBtn: 'WhatsApp', backToTop: 'Volver arriba', langSwitch: 'English', langSwitchShort: 'EN',
    footer: {
      tagline: 'Soluciones industriales confiables para Panamá y la región.',
      catalog: 'Catálogo', company: 'Empresa', contact: 'Contacto', follow: 'Síguenos',
      rights: 'Todos los derechos reservados.',
      disclaimer: 'Desarrollado por',
    },
  },
  en: {
    localeTag: 'en_US', dir: 'ltr', skipToContent: 'Skip to content',
    nav: { home: 'Home', products: 'Products', categories: 'Categories', about: 'About', blog: 'Blog', contact: 'Contact', projects: 'Projects' },
    cta: { quote: 'Quote on WhatsApp', viewCatalog: 'View catalog', viewProduct: 'View product', viewAll: 'View all', askProduct: 'Ask about this product', contactUs: 'Contact us', explore: 'Explore category', backCatalog: 'Back to catalog', readMore: 'Read article', allArticles: 'View all articles', viewDatasheet: 'View datasheet', downloadDatasheet: 'Download datasheet', viewProjects: 'View projects' },
    words: { category: 'Category', categories: 'Categories', products: 'Products', product: 'Product', applications: 'Applications', specs: 'Technical specifications', datasheet: 'Datasheet', relatedProducts: 'Related products', relatedArticles: 'Related articles', featured: 'Featured', catalog: 'Catalog', home: 'Home', filterAll: 'All', results: 'products', min: 'min read', brands: 'Brands', projects: 'Projects' },
    whatsappBtn: 'WhatsApp', backToTop: 'Back to top', langSwitch: 'Español', langSwitchShort: 'ES',
    footer: {
      tagline: 'Reliable industrial solutions for Panama and the region.',
      catalog: 'Catalog', company: 'Company', contact: 'Contact', follow: 'Follow us',
      rights: 'All rights reserved.',
      disclaimer: 'Developed by',
    },
  },
};

// ---------------------------------------------------------------------------
//  Categorías (7 líneas reales)
// ---------------------------------------------------------------------------
const CATEGORIES = [
  {
    id: 'mangueras-pvc', slug: { es: 'mangueras-pvc', en: 'pvc-hoses' },
    name: { es: 'Mangueras de PVC', en: 'PVC Hoses' },
    tagline: { es: 'Succión, descarga y layflat', en: 'Suction, discharge & layflat' },
    icon: 'hose', bg: 'catbg-industriales.webp', image: 'prod/pvc-pai.webp',
    desc: { es: 'Mangueras de PVC PROFIX para succión y descarga de agua, layflat y grado alimenticio. Livianas, pesadas y no tóxicas para riego, construcción, minería e industria.',
            en: 'PROFIX PVC hoses for water suction and discharge, layflat and food grade. Light, heavy-duty and non-toxic for irrigation, construction, mining and industry.' },
  },
  {
    id: 'mangueras-goma', slug: { es: 'mangueras-de-goma', en: 'rubber-hoses' },
    name: { es: 'Mangueras de Goma', en: 'Rubber Hoses' },
    tagline: { es: 'Aire, agua, combustible y químicos', en: 'Air, water, fuel & chemicals' },
    icon: 'hose', bg: 'catbg-goma.webp', image: 'prod/goma-ati.webp',
    desc: { es: 'Mangueras de goma PROFIX para aire y agua, gasolina, aceite, químicos, soldadura y usos múltiples de servicio pesado. Refuerzo textil o de acero según aplicación.',
            en: 'PROFIX rubber hoses for air and water, fuel, oil, chemicals, welding and heavy-duty multipurpose use. Textile or steel reinforcement per application.' },
  },
  {
    id: 'mangueras-hidraulicas', slug: { es: 'mangueras-hidraulicas', en: 'hydraulic-hoses' },
    name: { es: 'Mangueras Hidráulicas', en: 'Hydraulic Hoses' },
    tagline: { es: 'SAE 100 R1 · R2 · 4SP · 4SH', en: 'SAE 100 R1 · R2 · 4SP · 4SH' },
    icon: 'gauge', bg: 'catbg-hidraulicas.webp', image: 'prod/hid-r2.webp',
    desc: { es: 'Mangueras hidráulicas PROFIX de alta presión (SAE 100 R1, R2, R4, R7, R8, R13, R15, 4SP, 4SH) con refuerzo de acero trenzado o espiralado. Ensamblaje a la medida.',
            en: 'High-pressure PROFIX hydraulic hoses (SAE 100 R1, R2, R4, R7, R8, R13, R15, 4SP, 4SH) with braided or spiral steel reinforcement. Custom assembly.' },
  },
  {
    id: 'conexiones-hidraulicas', slug: { es: 'conexiones-hidraulicas', en: 'hydraulic-fittings' },
    name: { es: 'Conexiones Hidráulicas', en: 'Hydraulic Fittings' },
    tagline: { es: 'JIC, NPT, BSP, M22, casquillos', en: 'JIC, NPT, BSP, M22, ferrules' },
    icon: 'coupling', bg: 'catbg-conexiones.webp', image: 'prod/chid-jic-08-608.webp',
    desc: { es: 'Conexiones y casquillos (ferrules) hidráulicos JIC, NPT, BSP y M22 para el ensamblaje prensado de mangueras hidráulicas de alta presión.',
            en: 'Hydraulic fittings and ferrules JIC, NPT, BSP and M22 for crimped assembly of high-pressure hydraulic hoses.' },
  },
  {
    id: 'conexiones-industriales', slug: { es: 'conexiones-industriales', en: 'industrial-couplings' },
    name: { es: 'Conexiones Industriales', en: 'Industrial Couplings' },
    tagline: { es: 'Camlock, Chicago, niples, filtros', en: 'Camlock, Chicago, nipples, strainers' },
    icon: 'coupling', bg: 'catbg-accesorios.webp', image: 'prod/cind-qaci.webp',
    desc: { es: 'Acoples industriales de conexión rápida: Camlock tipos A–F (cam-and-groove), acoples Chicago macho/hembra, niples combinados, sellos y filtros de succión.',
            en: 'Industrial quick-connect couplings: Camlock types A–F (cam-and-groove), Chicago male/female couplings, combined nipples, seals and suction strainers.' },
  },
  {
    id: 'valvulas-equipos', slug: { es: 'valvulas-y-equipos', en: 'valves-equipment' },
    name: { es: 'Válvulas y Equipos', en: 'Valves & Equipment' },
    tagline: { es: 'Bola, mariposa, flejes, antilátigo', en: 'Ball, butterfly, banding, whip check' },
    icon: 'valve', bg: 'catbg-valvulas.webp', image: 'prod/val-valvula-acero-inox-vx.webp',
    desc: { es: 'Válvulas de bola en acero inoxidable 304, válvulas mariposa tipo wafer, flejes y flejadoras de acero inoxidable, y cables de seguridad antilátigo.',
            en: 'Stainless steel 304 ball valves, wafer butterfly valves, stainless steel banding and banding tools, and whip check safety cables.' },
  },
  {
    id: 'bandas-transportadoras', slug: { es: 'bandas-transportadoras', en: 'conveyor-belts' },
    name: { es: 'Bandas Transportadoras', en: 'Conveyor Belts' },
    tagline: { es: 'Servicio pesado para minería e industria', en: 'Heavy-duty for mining & industry' },
    icon: 'belt', bg: 'catbg-bandas.webp', image: 'prod/banda-bandas-transportadora-profix.webp',
    desc: { es: 'Bandas transportadoras PROFIX de caucho de servicio pesado para minería, canteras, agroindustria y procesos industriales.',
            en: 'Heavy-duty PROFIX rubber conveyor belts for mining, quarries, agribusiness and industrial processes.' },
  },
];

// ---------------------------------------------------------------------------
//  Productos  (P: helper compacto)
// ---------------------------------------------------------------------------
function P(id, cat, image, ficha, nameEs, nameEn, shortEs, shortEn, featured) {
  return {
    id, cat, image, ficha: ficha || null, featured: !!featured,
    slug: { es: id, en: id },
    name: { es: nameEs, en: nameEn },
    short: { es: shortEs, en: shortEn },
  };
}

const PRODUCTS = [
  // ---------- Mangueras de PVC ----------
  P('pvc-succion-descarga-liviana', 'mangueras-pvc', 'prod/pvc-pai.webp', 'ficha/f-pai.webp',
    'Manguera de Succión y Descarga de Agua Liviana (PAI)', 'Light Water Suction & Discharge Hose (PAI)',
    'PVC espiralado azul, liviana y flexible para succión y descarga de agua.', 'Blue spiral PVC, light and flexible for water suction and discharge.', true),
  P('pvc-layflat-liviana', 'mangueras-pvc', 'prod/pvc-pci.webp', 'ficha/f-pci.webp',
    'Manguera Chata Layflat Liviana (PCI)', 'Light Layflat Hose (PCI)',
    'Manguera plana enrollable de PVC para descarga de agua de servicio liviano.', 'Rollable flat PVC hose for light-service water discharge.'),
  P('pvc-layflat-pesada', 'mangueras-pvc', 'prod/pvc-phi.webp', 'ficha/f-phi.webp',
    'Manguera Chata Layflat Trabajo Pesado (PHI)', 'Heavy-Duty Layflat Hose (PHI)',
    'Layflat roja de alto caudal, resistente para obra, minería y bombeo.', 'High-flow red layflat, tough for construction, mining and pumping.', true),
  P('pvc-succion-descarga-pesada', 'mangueras-pvc', 'prod/pvc-pni.webp', 'ficha/f-pni.webp',
    'Manguera de Succión y Descarga de Agua Pesada (PNI)', 'Heavy Water Suction & Discharge Hose (PNI)',
    'PVC espiralado de servicio pesado, especial para minería y construcción.', 'Heavy-duty spiral PVC, designed for mining and construction.'),
  P('pvc-no-toxica-acero', 'mangueras-pvc', 'prod/pvc-psi.webp', 'ficha/f-psi.webp',
    'Manguera No Tóxica con Refuerzo de Acero (PSI)', 'Non-Toxic Steel-Reinforced Hose (PSI)',
    'Transparente grado alimenticio con refuerzo helicoidal de acero.', 'Clear food-grade hose with helical steel reinforcement.', true),
  P('pvc-succion-reforzada-pgi', 'mangueras-pvc', 'prod/pvc-pgi.webp', null,
    'Manguera de Succión y Descarga Reforzada (PGI)', 'Reinforced Suction & Discharge Hose (PGI)',
    'Manguera espiralada de servicio pesado para succión y descarga.', 'Heavy-duty spiral hose for suction and discharge.'),
  P('pvc-succion-polvo', 'mangueras-pvc', 'prod/pvc-succion-de-polvo.webp', null,
    'Manguera de Succión de Polvo', 'Dust Suction Hose',
    'Manguera transparente con alambre de cobre para succión de polvo y viruta.', 'Clear hose with copper wire for dust and chip suction.'),

  // ---------- Mangueras de Goma ----------
  P('goma-servicios-generales', 'mangueras-goma', 'prod/goma-ati.webp', 'ficha/f-ati.webp',
    'Manguera de Goma Servicios Generales — Aire y Agua (ATI)', 'General Service Rubber Hose — Air & Water (ATI)',
    'Goma resistente a la intemperie para aire y agua, no conductiva.', 'Weather-resistant rubber for air and water, electrically non-conductive.', true),
  P('goma-gasolina-estacion', 'mangueras-goma', 'prod/goma-gei.webp', 'ficha/f-gei.webp',
    'Manguera Gasolina Estación de Servicio (GEI)', 'Fuel Dispensing Hose (GEI)',
    'Con malla de acero para surtidores de gasolina; evita la estática.', 'Steel-mesh hose for fuel pumps; prevents static build-up.'),
  P('goma-aceite-gasolina-nitrilo', 'mangueras-goma', 'prod/goma-gni.webp', 'ficha/f-gni.webp',
    'Manguera Aceite y Gasolina — Nitrilo (GNI)', 'Oil & Gasoline Hose — Nitrile (GNI)',
    'Tubo y cubierta de nitrilo para aceite, gasolina y derivados.', 'Nitrile tube and cover for oil, gasoline and derivatives.'),
  P('goma-succion-agua', 'mangueras-goma', 'prod/goma-sai.webp', 'ficha/f-sai.webp',
    'Manguera Succión de Agua Cubierta Envuelta (SAI)', 'Wrapped-Cover Water Suction Hose (SAI)',
    'Alambre helicoidal anticolapso para succión de agua exigente.', 'Anti-collapse helical wire for demanding water suction.'),
  P('goma-succion-gasolina', 'mangueras-goma', 'prod/goma-sgi.webp', 'ficha/f-sgi.webp',
    'Manguera Succión de Gasolina "Vacuum Truck" (SGI)', 'Gasoline Suction Hose "Vacuum Truck" (SGI)',
    'Diseñada para camiones vacuum y succión de gasolina y derivados.', 'Designed for vacuum trucks and gasoline suction.'),
  P('goma-succion-quimicos', 'mangueras-goma', 'prod/goma-sqi.webp', 'ficha/f-sqi.webp',
    'Manguera Succión de Químicos — XLPE (SQI)', 'Chemical Suction Hose — XLPE (SQI)',
    'Tubo XLPE resistente al 92% de los químicos, para plantas y cisternas.', 'XLPE tube resistant to 92% of chemicals, for plants and tankers.'),
  P('goma-soldar', 'mangueras-goma', 'prod/goma-sui.webp', 'ficha/f-sui.webp',
    'Manguera para Soldar Morocha (SUI)', 'Twin Welding Hose (SUI)',
    'Manguera doble para oxígeno y acetileno en equipos de soldadura.', 'Twin-line hose for oxygen and acetylene welding equipment.'),
  P('goma-multiuso', 'mangueras-goma', 'prod/goma-umi.webp', 'ficha/f-umi.webp',
    'Manguera Multiuso Trabajo Pesado — Aceite y Gasolina (UMI)', 'Heavy-Duty Multipurpose Hose — Oil & Gasoline (UMI)',
    'Usos múltiples de servicio pesado para aceite, gasolina y kerosene.', 'Heavy-duty multipurpose for oil, gasoline and kerosene.', true),

  // ---------- Mangueras Hidráulicas ----------
  P('hid-sae-100-r1', 'mangueras-hidraulicas', 'prod/hid-r1.webp', 'ficha/f-sae-r1.webp',
    'Manguera Hidráulica SAE 100 R1', 'SAE 100 R1 Hydraulic Hose',
    'Una trenza de acero para presión media-alta.', 'Single steel braid for medium-high pressure.', true),
  P('hid-sae-100-r2', 'mangueras-hidraulicas', 'prod/hid-r2.webp', 'ficha/f-sae-r2.webp',
    'Manguera Hidráulica SAE 100 R2', 'SAE 100 R2 Hydraulic Hose',
    'Doble trenza de acero para alta presión.', 'Dual steel braid for high pressure.', true),
  P('hid-sae-100-r4', 'mangueras-hidraulicas', 'prod/hid-r4.webp', 'ficha/f-sae-r4.webp',
    'Manguera Hidráulica SAE 100 R4', 'SAE 100 R4 Hydraulic Hose',
    'Succión y retorno de baja presión con refuerzo espiralado.', 'Low-pressure suction and return with spiral reinforcement.'),
  P('hid-sae-100-r7', 'mangueras-hidraulicas', 'prod/hid-r7.webp', 'ficha/f-sae-r7.webp',
    'Manguera Hidráulica SAE 100 R7', 'SAE 100 R7 Hydraulic Hose',
    'Termoplástica de alta presión para líneas hidráulicas.', 'High-pressure thermoplastic for hydraulic lines.'),
  P('hid-sae-100-r8', 'mangueras-hidraulicas', 'prod/hid-r8.webp', 'ficha/f-r8.webp',
    'Manguera Hidráulica SAE 100 R8', 'SAE 100 R8 Hydraulic Hose',
    'Termoplástica de alta presión, alto rendimiento.', 'High-pressure thermoplastic, high performance.'),
  P('hid-sae-100-r13', 'mangueras-hidraulicas', 'prod/hid-r13.webp', 'ficha/f-sae-r13.webp',
    'Manguera Hidráulica SAE 100 R13', 'SAE 100 R13 Hydraulic Hose',
    'Refuerzo multiespiral para muy alta presión.', 'Multi-spiral reinforcement for very high pressure.'),
  P('hid-sae-100-r15', 'mangueras-hidraulicas', 'prod/hid-r15.webp', 'ficha/f-sae-r15.webp',
    'Manguera Hidráulica SAE 100 R15', 'SAE 100 R15 Hydraulic Hose',
    'Multiespiral para las presiones más exigentes.', 'Multi-spiral for the most demanding pressures.'),
  P('hid-4sp', 'mangueras-hidraulicas', 'prod/hid-4sp.webp', 'ficha/f-4sp.webp',
    'Manguera Hidráulica 4SP', '4SP Hydraulic Hose',
    'Cuatro espirales de acero para alta presión (norma EN 856).', 'Four steel spirals for high pressure (EN 856).'),
  P('hid-4sh', 'mangueras-hidraulicas', 'prod/hid-4sh.webp', 'ficha/f-4sh.webp',
    'Manguera Hidráulica 4SH', '4SH Hydraulic Hose',
    'Cuatro espirales de acero de gran diámetro y alta presión.', 'Four steel spirals, large diameter, high pressure.'),
  P('hid-sae-14', 'mangueras-hidraulicas', 'prod/hid-sae14.webp', 'ficha/f-sae-14.webp',
    'Manguera Hidráulica SAE 14', 'SAE 14 Hydraulic Hose',
    'Manguera hidráulica de alto desempeño para equipos móviles.', 'High-performance hydraulic hose for mobile equipment.'),

  // ---------- Conexiones Hidráulicas ----------
  P('chid-acople-aha', 'conexiones-hidraulicas', 'prod/chid-acople-hidraulico-aha.webp', null,
    'Acople Hidráulico AHA', 'Hydraulic Fitting AHA',
    'Acople hidráulico para ensamblaje de mangueras de alta presión.', 'Hydraulic fitting for high-pressure hose assembly.'),
  P('chid-acople-ahb', 'conexiones-hidraulicas', 'prod/chid-ahb.webp', null,
    'Acople Hidráulico AHB', 'Hydraulic Fitting AHB',
    'Acople hidráulico para líneas y mangueras prensadas.', 'Hydraulic fitting for crimped lines and hoses.'),
  P('chid-ferrule-f12', 'conexiones-hidraulicas', 'prod/chid-ferrul-f12.webp', null,
    'Casquillo Ferrule F12', 'Ferrule F12',
    'Casquillo de prensado para manguera hidráulica multiespiral.', 'Crimp ferrule for multi-spiral hydraulic hose.'),
  P('chid-ferrule-f2', 'conexiones-hidraulicas', 'prod/chid-ferrul-f2.webp', null,
    'Casquillo Ferrule F2', 'Ferrule F2',
    'Casquillo de prensado para manguera hidráulica trenzada.', 'Crimp ferrule for braided hydraulic hose.'),
  P('chid-hembra-bsp', 'conexiones-hidraulicas', 'prod/chid-hembra-bsp.webp', null,
    'Conexión Hembra BSP', 'BSP Female Fitting',
    'Terminal hembra con rosca BSP para ensamblaje hidráulico.', 'BSP female threaded end for hydraulic assembly.'),
  P('chid-jic', 'conexiones-hidraulicas', 'prod/chid-jic-08-608.webp', null,
    'Conexión JIC 37°', 'JIC 37° Fitting',
    'Terminal JIC 37° de sellado cónico para alta presión.', 'JIC 37° cone-seat end for high pressure.', true),
  P('chid-m22', 'conexiones-hidraulicas', 'prod/chid-m22.webp', 'ficha/f-m22.webp',
    'Conexión M22', 'M22 Fitting',
    'Terminal métrico M22 para hidrolavadoras y equipos.', 'Metric M22 end for pressure washers and equipment.'),
  P('chid-macho-jic', 'conexiones-hidraulicas', 'prod/chid-macho-jic-06-506.webp', null,
    'Conexión Macho JIC', 'JIC Male Fitting',
    'Terminal macho JIC 37° para líneas hidráulicas.', 'JIC 37° male end for hydraulic lines.'),
  P('chid-npt', 'conexiones-hidraulicas', 'prod/chid-npt-08-108.webp', null,
    'Conexión NPT', 'NPT Fitting',
    'Terminal con rosca NPT para adaptación hidráulica.', 'NPT threaded end for hydraulic adaptation.', true),

  // ---------- Conexiones Industriales ----------
  P('camlock-tipo-a', 'conexiones-industriales', 'prod/cind-qaai.webp', 'ficha/f-camlock-a.webp',
    'Acople Camlock Tipo A', 'Camlock Coupling Type A',
    'Cam-and-groove tipo A: adaptador macho con rosca hembra.', 'Cam-and-groove type A: male adapter with female thread.'),
  P('camlock-tipo-b', 'conexiones-industriales', 'prod/cind-qabi.webp', 'ficha/f-camlock-b.webp',
    'Acople Camlock Tipo B', 'Camlock Coupling Type B',
    'Cam-and-groove tipo B: acople hembra con rosca macho.', 'Cam-and-groove type B: female coupler with male thread.'),
  P('camlock-tipo-c', 'conexiones-industriales', 'prod/cind-qaci.webp', 'ficha/f-camlock-c.webp',
    'Acople Camlock Tipo C', 'Camlock Coupling Type C',
    'Cam-and-groove tipo C: acople hembra con espiga.', 'Cam-and-groove type C: female coupler with hose shank.', true),
  P('camlock-tipo-d', 'conexiones-industriales', 'prod/cind-qadi.webp', 'ficha/f-camlock-d.webp',
    'Acople Camlock Tipo D', 'Camlock Coupling Type D',
    'Cam-and-groove tipo D: acople hembra con rosca hembra.', 'Cam-and-groove type D: female coupler with female thread.'),
  P('camlock-tipo-dc', 'conexiones-industriales', 'prod/cind-qadci.webp', 'ficha/f-camlock-dc.webp',
    'Acople Camlock Tipo DC', 'Camlock Coupling Type DC',
    'Cam-and-groove tipo DC: tapa hembra con cadena.', 'Cam-and-groove type DC: dust cap with chain.'),
  P('camlock-tipo-dp', 'conexiones-industriales', 'prod/cind-qadpi.webp', 'ficha/f-camlock-dp.webp',
    'Acople Camlock Tipo DP', 'Camlock Coupling Type DP',
    'Cam-and-groove tipo DP: tapón macho con cadena.', 'Cam-and-groove type DP: dust plug with chain.'),
  P('camlock-tipo-e', 'conexiones-industriales', 'prod/cind-qaei.webp', 'ficha/f-camlock-e.webp',
    'Acople Camlock Tipo E', 'Camlock Coupling Type E',
    'Cam-and-groove tipo E: adaptador macho con espiga.', 'Cam-and-groove type E: male adapter with hose shank.'),
  P('camlock-tipo-f', 'conexiones-industriales', 'prod/cind-qafi.webp', 'ficha/f-camlock-f.webp',
    'Acople Camlock Tipo F', 'Camlock Coupling Type F',
    'Cam-and-groove tipo F: adaptador macho con rosca macho.', 'Cam-and-groove type F: male adapter with male thread.'),
  P('chicago-macho', 'conexiones-industriales', 'prod/cind-mri.webp', 'ficha/f-mri.webp',
    'Acople Chicago Macho (MRI)', 'Chicago Coupling Male (MRI)',
    'Acople rápido tipo Chicago macho en hierro galvanizado para aire.', 'Male Chicago quick coupling in galvanized iron for air.', true),
  P('chicago-hembra', 'conexiones-industriales', 'prod/cind-hri.webp', 'ficha/f-hri.webp',
    'Acople Chicago Hembra (HRI)', 'Chicago Coupling Female (HRI)',
    'Acople rápido tipo Chicago hembra en hierro galvanizado.', 'Female Chicago quick coupling in galvanized iron.'),
  P('chicago-manguera', 'conexiones-industriales', 'prod/cind-tri.webp', 'ficha/f-tri.webp',
    'Acople Chicago para Manguera (TRI)', 'Chicago Hose Coupling (TRI)',
    'Acople Chicago con espiga para conectar a manguera.', 'Chicago coupling with shank to connect to hose.'),
  P('niple-combinado', 'conexiones-industriales', 'prod/cind-niple-combinado-nci.webp', null,
    'Niple Combinado (NCI)', 'Combined Nipple (NCI)',
    'Niple combinado para unir y terminar líneas industriales.', 'Combined nipple to join and terminate industrial lines.'),
  P('sello-camlock', 'conexiones-industriales', 'prod/cind-qgi.webp', 'ficha/f-camlock-qgi.webp',
    'Sello / Empaque para Camlock (QGI)', 'Camlock Gasket / Seal (QGI)',
    'Empaque de caucho NBR para sellado hermético de acoples Camlock.', 'NBR rubber gasket for tight Camlock coupling sealing.'),
  P('filtro-succion', 'conexiones-industriales', 'prod/cind-svi.webp', null,
    'Filtro / Canastilla de Succión (SVI)', 'Suction Strainer (SVI)',
    'Canastilla filtro que protege bombas y equipos del paso de sólidos.', 'Strainer basket that protects pumps and equipment from solids.'),

  // ---------- Válvulas y Equipos ----------
  P('valvula-bola-inox', 'valvulas-equipos', 'prod/val-valvula-acero-inox-vx.webp', 'ficha/f-valvulas-de-bola-acero-inox.webp',
    'Válvula de Bola Acero Inoxidable 304 (VX)', 'Stainless Steel 304 Ball Valve (VX)',
    'Válvula de bola inoxidable 304, 1000 WOG, cierre hermético.', 'Stainless 304 ball valve, 1000 WOG, tight shut-off.', true),
  P('valvula-mariposa-wafer', 'valvulas-equipos', 'prod/val-valvula-mariposa-tipo-wafer.webp', null,
    'Válvula Mariposa Tipo Wafer', 'Wafer Butterfly Valve',
    'Válvula mariposa tipo wafer para control de flujo en tubería.', 'Wafer butterfly valve for pipeline flow control.'),
  P('antilatigo', 'valvulas-equipos', 'prod/val-antilatigo.webp', 'ficha/f-antilatigo.webp',
    'Cable de Seguridad Antilátigo (Whip Check)', 'Whip Check Safety Cable',
    'Cable de acero inoxidable que evita el latigazo por desconexión.', 'Stainless steel cable that prevents hose whip on disconnection.', true),
  P('fleje-inox', 'valvulas-equipos', 'prod/val-bai-fleje-acero-inox.webp', 'ficha/f-bai.webp',
    'Fleje de Acero Inoxidable 304 (BAI)', 'Stainless Steel 304 Banding (BAI)',
    'Fleje inoxidable 304 para sujeción firme y resistente a la corrosión.', 'Stainless 304 banding for firm, corrosion-resistant fastening.'),
  P('flejadora', 'valvulas-equipos', 'prod/val-smi-00-flejadora.webp', 'ficha/f-smi-00.webp',
    'Flejadora Manual (SMI-00)', 'Manual Banding Tool (SMI-00)',
    'Herramienta profesional para ajustar flejes en mangueras y tuberías.', 'Professional tool to tighten banding on hoses and pipes.'),

  // ---------- Bandas Transportadoras ----------
  P('banda-transportadora', 'bandas-transportadoras', 'prod/banda-bandas-transportadora-profix.webp', null,
    'Banda Transportadora PROFIX', 'PROFIX Conveyor Belt',
    'Banda de caucho de servicio pesado para minería, canteras e industria.', 'Heavy-duty rubber belt for mining, quarries and industry.', true),
];

// ---------------------------------------------------------------------------
//  Marcas y Proyectos
// ---------------------------------------------------------------------------
const BRANDS = [
  { name: 'PROFIX', img: 'marca/marca-profix.webp' },
  { name: 'SOUDAL', img: 'marca/marca-soudal.webp' },
  { name: 'TOTAL', img: 'marca/marca-total.webp' },
  { name: 'WADFOW', img: 'marca/marca-wadfow.webp' },
  { name: 'SURTEK', img: 'marca/marca-surtek.webp' },
  { name: 'Carbone', img: 'marca/marca-carbone.webp' },
];

const PROJECTS = [];
for (let i = 1; i <= 8; i++) PROJECTS.push({ img: 'proyecto/proj-' + i + '.webp' });

module.exports = { SITE, LANGS, DEFAULT_LANG, PATHS, T, CATEGORIES, PRODUCTS, BRANDS, PROJECTS };
