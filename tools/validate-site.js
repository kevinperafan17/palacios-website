const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const ignoredDirectories = new Set(['.git', 'tools', 'tmp']);
const errors = [];
const warnings = [];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) return [];
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function localTarget(sourceFile, rawUrl) {
  const [urlWithoutHash] = rawUrl.split('#');
  const cleanUrl = urlWithoutHash.split('?')[0];
  if (!cleanUrl) return sourceFile;
  const decoded = decodeURIComponent(cleanUrl);
  let target = decoded.startsWith('/')
    ? path.join(root, decoded.replace(/^\/+/, ''))
    : path.resolve(path.dirname(sourceFile), decoded);
  if (decoded.endsWith('/')) target = path.join(target, 'index.html');
  return target;
}

function hasId(filePath, id) {
  if (!id || !fs.existsSync(filePath) || path.extname(filePath) !== '.html') return true;
  const content = fs.readFileSync(filePath, 'utf8');
  const escaped = id.replace(/[.*+?^$()|[\]\\{}]/g, '\\$&');
  return new RegExp(`\\bid=["']${escaped}["']`).test(content);
}

const files = walk(root);
const htmlFiles = files.filter((filePath) => filePath.endsWith('.html'));

for (const filePath of htmlFiles) {
  const relative = path.relative(root, filePath);
  const normalizedRelative = relative.replaceAll('\\', '/');
  const isDomo = normalizedRelative === 'domo/index.html';
  const html = fs.readFileSync(filePath, 'utf8');
  const redirect = /http-equiv=["']refresh["']/i.test(html);
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  if (!redirect && h1Count !== 1) errors.push(`${relative}: contiene ${h1Count} H1.`);

  if (!/^<!doctype html>/i.test(html.trimStart())) errors.push(`${relative}: falta DOCTYPE HTML.`);
  if (!/<html\s+lang=["']es-CO["']/i.test(html)) errors.push(`${relative}: el idioma debe declararse como es-CO.`);
  if (!/<meta\s+name=["']viewport["']/i.test(html)) errors.push(`${relative}: falta viewport responsive.`);
  if (!/<title>[^<]{10,}<\/title>/i.test(html)) errors.push(`${relative}: título ausente o demasiado corto.`);
  if (!redirect && !/<meta\s+name=["']description["']\s+content=["'][^"']{50,}["']/i.test(html)) {
    errors.push(`${relative}: meta description ausente o demasiado corta.`);
  }
  if (!/<link\s+rel=["']canonical["']\s+href=["']https:\/\/www\.grupopalaciosasesores\.com/i.test(html)) {
    errors.push(`${relative}: canonical no coincide con el host público www.`);
  }

  if (!redirect) {
    if (!/<main\b/i.test(html)) errors.push(`${relative}: falta landmark main.`);
    if (!/class=["'][^"']*skip-link/i.test(html)) errors.push(`${relative}: falta enlace para saltar al contenido.`);
    if (!/palacios-(?:2026|experience)(?:\.min)?\.css/i.test(html)) errors.push(`${relative}: no utiliza el sistema visual compartido.`);
    if (!/palacios-(?:2026|experience)(?:\.min)?\.js/i.test(html)) errors.push(`${relative}: no utiliza las interacciones compartidas.`);
    if (isDomo && !/domo\.min\.css/i.test(html)) errors.push(`${relative}: faltan los componentes visuales específicos de DOMO.`);
    if (isDomo && !/domo\.min\.js/i.test(html)) errors.push(`${relative}: faltan las interacciones específicas de DOMO.`);
    if (/bootstrap(?:-icons)?(?:\.min)?\.css|main\.css|aos\.css|font-awesome/i.test(html)) {
      errors.push(`${relative}: conserva dependencias visuales obsoletas.`);
    }
  }

  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length) errors.push(`${relative}: IDs duplicados: ${[...new Set(duplicateIds)].join(', ')}.`);

  for (const match of html.matchAll(/<(?:a|link|script|img|source)\b[^>]*\b(?:href|src)=["']([^"'<>]+)["']/gi)) {
    const rawUrl = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(rawUrl) || rawUrl === '#') continue;
    const target = localTarget(filePath, rawUrl);
    if (!fs.existsSync(target)) {
      errors.push(`${relative}: recurso inexistente "${rawUrl}" → ${path.relative(root, target)}.`);
      continue;
    }
    const hash = rawUrl.includes('#') ? rawUrl.slice(rawUrl.indexOf('#') + 1) : '';
    if (hash && !hasId(target, hash)) errors.push(`${relative}: ancla inexistente "${rawUrl}".`);
  }

  for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
    if (!/\balt=["'][^"']*["']/i.test(match[1])) errors.push(`${relative}: imagen sin atributo alt.`);
    if (!redirect && (!/\bwidth=["']\d+["']/i.test(match[1]) || !/\bheight=["']\d+["']/i.test(match[1]))) {
      errors.push(`${relative}: imagen sin dimensiones explícitas.`);
    }
  }

  for (const match of html.matchAll(/<a\b([^>]*)target=["']_blank["']([^>]*)>/gi)) {
    const attributes = `${match[1]} ${match[2]}`;
    if (!/\brel=["'][^"']*noopener/i.test(attributes)) errors.push(`${relative}: enlace externo sin rel=noopener.`);
  }

  for (const match of html.matchAll(/<button\b([^>]*)>/gi)) {
    if (!/\btype=["'](?:button|submit|reset)["']/i.test(match[1])) errors.push(`${relative}: botón sin tipo explícito.`);
  }

  for (const match of html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      errors.push(`${relative}: JSON-LD inválido: ${error.message}.`);
    }
  }

  const gaLoads = (html.match(/googletagmanager\.com\/gtag\/js/gi) || []).length;
  if (gaLoads > 1) errors.push(`${relative}: Google Analytics duplicado (${gaLoads}).`);
  if (html.includes('AuditorÃ') || html.includes('Propiedad HorizontalÃ') || html.includes('\uFFFD')) {
    errors.push(`${relative}: posible error de codificación.`);
  }
}

for (const cssPath of files.filter((filePath) => filePath.endsWith('.css') && !filePath.endsWith('.min.css'))) {
  const relative = path.relative(root, cssPath);
  const css = fs.readFileSync(cssPath, 'utf8');
  for (const match of css.matchAll(/url\((['"]?)([^)'"]+)\1\)/gi)) {
    const rawUrl = match[2];
    if (/^(?:https?:|data:|#)/i.test(rawUrl)) continue;
    const target = path.resolve(path.dirname(cssPath), rawUrl.split('?')[0]);
    if (!fs.existsSync(target)) errors.push(`${relative}: recurso CSS inexistente "${rawUrl}".`);
  }
}

const requiredPages = ['index.html', 'auditoria/index.html', 'propiedad-horizontal/index.html', 'innovacion/index.html'];
for (const relative of requiredPages) {
  const html = fs.readFileSync(path.join(root, relative), 'utf8');
  if (!html.includes('data-lead-form')) errors.push(`${relative}: falta formulario de conversión.`);
  if (!html.includes('data-event="whatsapp_click"')) errors.push(`${relative}: falta seguimiento de WhatsApp.`);
  if (!html.includes('rel="canonical"')) errors.push(`${relative}: falta canonical.`);
  if (!html.includes('property="og:title"')) errors.push(`${relative}: falta Open Graph.`);
}

const domoHtml = fs.readFileSync(path.join(root, 'domo/index.html'), 'utf8');
if (!domoHtml.includes('data-event="whatsapp_click"')) errors.push('domo/index.html: falta seguimiento de WhatsApp.');
if (!domoHtml.includes('"@type":"FAQPage"')) errors.push('domo/index.html: falta FAQ Schema.');
if (!domoHtml.includes('"SoftwareApplication"')) errors.push('domo/index.html: falta SoftwareApplication Schema.');

const report = {
  htmlFiles: htmlFiles.length,
  filesChecked: files.length,
  errors: errors.length,
  warnings: warnings.length,
  details: [...errors, ...warnings],
};
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
