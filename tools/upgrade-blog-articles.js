const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const blogDir = path.join(root, 'blog');
const domain = 'https://grupopalaciosasesores.com';
const gaSnippet = `
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-7978WT0ESL"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-7978WT0ESL');
  </script>
`;

function text(value) {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function attr(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function landingFor(fileName) {
  if (fileName.includes('propiedad-horizontal')) return ['../propiedad-horizontal/index.html', 'Propiedad Horizontal', 'propiedad-horizontal'];
  if (fileName.includes('innovacion')) return ['../innovacion/index.html', 'Innovación y Tecnología', 'innovacion'];
  if (fileName.includes('auditoria')) return ['../auditoria/index.html', 'Auditoría', 'auditoria'];
  return ['../servicios-complementarios/index.html', 'Servicios Complementarios', 'complementarios'];
}

const files = fs.readdirSync(blogDir)
  .filter((fileName) => /^blog-details-.+\.html$/.test(fileName))
  .sort();

for (const fileName of files) {
  const filePath = path.join(blogDir, fileName);
  let html = fs.readFileSync(filePath, 'utf8');
  const [landing, landingLabel, service] = landingFor(fileName);

  html = html
    .replace(/\s*(?:<!--\s*Google tag \(gtag\.js\)\s*-->)?\s*<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-7978WT0ESL"><\/script>\s*<script>[\s\S]*?gtag\('config',\s*'G-7978WT0ESL'\);\s*<\/script>\s*/g, '\n')
    .replace(/\s*<link[^>]+glightbox[^>]+>\s*/g, '\n')
    .replace(/\s*<link[^>]+swiper[^>]+>\s*/g, '\n')
    .replace(/\s*<script[^>]+(?:php-email-form|glightbox|swiper|waypoints|imagesloaded|isotope-layout)[^>]*><\/script>\s*/g, '\n')
    .replaceAll('../index.html#about', '../index.html#firma')
    .replaceAll('../index.html#work-process', '../index.html#metodo')
    .replaceAll('../index.html#skills', '../index.html#firma')
    .replaceAll('../index.html#services', '../index.html#soluciones')
    .replaceAll('../index.html#team', '../index.html#equipo')
    .replaceAll('../service-details-auditoria.html', '../auditoria/index.html')
    .replaceAll('../service-details-propiedad-horizontal.html', '../propiedad-horizontal/index.html')
    .replaceAll('../service-details-innovacion.html', '../innovacion/index.html')
    .replaceAll('../service-details-complementarios.html', '../servicios-complementarios/index.html')
    .replace(
      /<a href="\.\.\/index\.html#call-to-action" class="btn-get-started">[\s\S]*?<\/a>/,
      `<a href="${landing}" class="btn-get-started" data-ga-event="blog_service_click" data-ga-service="${service}">Conocer ${landingLabel}</a>`
    )
    .replaceAll('../index.html#call-to-action', '../index.html#contacto')
    .replaceAll('href="../index.html#hero"', 'href="../index.html"')
    .replace(/\b(href|src|action)="\/(?!\/)([^"]*)"/g, (_match, attribute, target) => {
      if (!target) return `${attribute}="../index.html"`;
      if (target.startsWith('#')) return `${attribute}="../index.html${target}"`;
      return `${attribute}="../${target}${target.endsWith('/') ? 'index.html' : ''}"`;
    });

  html = html.replace(
    /(<div class="search-widget widget-item">[\s\S]*?)<form[^>]*>/,
    '$1<form action="blog.html" method="get">'
  ).replace('name="search"', 'name="q"');

  const title = text((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || (html.match(/<title>(.*?)<\/title>/) || [])[1] || '');
  const description = (html.match(/<meta name="description" content="([^"]+)"/) || [])[1] || `Análisis de Palacios Asesores & Revisores sobre ${title}.`;
  const imagePath = (html.match(/<div class="post-img">[\s\S]*?<img[^>]+src="\.\.\/([^"]+)"/) || [])[1] || 'assets/img/logo.webp';
  const date = (html.match(/<time[^>]+datetime="([^"]+)"/) || [])[1];
  const canonical = `${domain}/blog/${fileName}`;
  const image = `${domain}/${imagePath.replaceAll('\\', '/')}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    datePublished: date,
    dateModified: date,
    mainEntityOfPage: canonical,
    author: { '@type': 'Organization', name: 'Palacios Asesores & Revisores', url: domain },
    publisher: {
      '@type': 'Organization',
      name: 'Palacios Asesores & Revisores',
      logo: { '@type': 'ImageObject', url: `${domain}/assets/img/logo.webp` },
    },
  };

  const seo = `
  <link rel="canonical" href="${canonical}">
  <meta property="og:locale" content="es_CO">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${attr(title)}">
  <meta property="og:description" content="${attr(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${image}">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
`;

  if (!html.includes('rel="canonical"')) html = html.replace('</head>', `${seo}</head>`);
  html = html.replace('</head>', `${gaSnippet}</head>`);
  fs.writeFileSync(filePath, html.replace(/[ \t]+$/gm, ''), 'utf8');
}

console.log(`Artículos actualizados: ${files.length}.`);
