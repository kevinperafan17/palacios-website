const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const ignoredDirectories = new Set(['.git', 'tools']);
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
  const html = fs.readFileSync(filePath, 'utf8');
  const redirect = /http-equiv=["']refresh["']/i.test(html);
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  if (!redirect && h1Count !== 1) errors.push(`${relative}: contiene ${h1Count} H1.`);

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

const report = {
  htmlFiles: htmlFiles.length,
  filesChecked: files.length,
  errors: errors.length,
  warnings: warnings.length,
  details: [...errors, ...warnings],
};
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
