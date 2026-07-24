# YRVIMAR Services & Supply — Sitio Web (Catálogo)

Sitio web catálogo bilingüe (español / inglés) para **YRVIMAR Services & Supply, INC**, proveedor de suministros industriales en Panamá: mangueras industriales e hidráulicas, conexiones, acoples, válvulas y accesorios de seguridad.

Modo **catálogo** (sin precios): cada producto incluye botón de WhatsApp para consultar.

## Características

- 🌐 **Bilingüe ES/EN** con `hreflang` y URLs localizadas.
- 🎨 Diseño dark industrial premium (negro + dorado de marca), hero animado con GSAP.
- 🛒 Catálogo con 5 categorías y 14 productos, filtros por categoría.
- 💬 Botón de WhatsApp flotante (abajo derecha) + WhatsApp por producto. Back-to-top (abajo izquierda).
- 📝 Blog técnico con 10 artículos SEO bilingües.
- 🔎 SEO completo: meta tags, Open Graph, JSON-LD (Organization, Product, BlogPosting, Store, BreadcrumbList), `sitemap.xml`, `robots.txt`, favicons y manifest.
- 📱 100% responsive.

## Estructura

```
build/        Generador estático (Node, sin dependencias)
  site.js       Config, i18n, categorías y productos
  articles.js   10 artículos del blog (ES/EN)
  templates.js  Componentes HTML (head, header, footer, tarjetas, iconos)
  build.js      Orquestador -> genera /dist
static/       Fuentes de assets (css, js, img, logo)
dist/         Sitio estático generado (desplegable)
```

## Build

```bash
node build/build.js      # genera /dist
```

El contenido de `dist/` es el sitio estático listo para desplegar en cualquier hosting.

## Contacto

- WhatsApp: +507 6855-0933
- Tel: +507 308-8843
- ventas@yrvimar.com · admin@yrvimar.com
- Parque Lefevre, Av. 1B Sur, Edificio Joritza, Local 1, Ciudad de Panamá
- Instagram: [@yrvimar_inc](https://www.instagram.com/yrvimar_inc/)

---
🤖 Generated with [Claude Code](https://claude.com/claude-code)
