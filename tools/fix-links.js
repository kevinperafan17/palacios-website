const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const supportingPages = [
  'analitica-datos/index.html',
  'avaluos/index.html',
  'gestion-documental/index.html',
  'sagrilaft/index.html',
  'servicios-complementarios/index.html',
];

for (const relativePath of supportingPages) {
  const filePath = path.join(root, relativePath);
  let html = fs.readFileSync(filePath, 'utf8');
  html = html
    .replace(/(?:index\.html){2,}/g, 'index.html')
    .replaceAll('../index.html#hero', '../index.html')
    .replaceAll('../index.html#about', '../index.html#firma')
    .replaceAll('../index.html#services', '../index.html#soluciones')
    .replaceAll('../index.html#call-to-action', '../index.html#contacto')
    .replace(/\.\.\/revisoria-fiscal\/(?=[#?"])/g, '../auditoria/index.html')
    .replace(/\.\.\/automatizacion-ia\/(?=[#?"])/g, '../innovacion/index.html')
    .replace(/\.\.\/propiedad-horizontal\/(?=[#?"])/g, '../propiedad-horizontal/index.html')
    .replace(/\.\.\/analitica-datos\/(?=[#?"])/g, '../analitica-datos/index.html')
    .replace(/\.\.\/avaluos\/(?=[#?"])/g, '../avaluos/index.html')
    .replace(/\.\.\/gestion-documental\/(?=[#?"])/g, '../gestion-documental/index.html')
    .replace(/\.\.\/sagrilaft\/(?=[#?"])/g, '../sagrilaft/index.html')
    .replace(/\.\.\/servicios-complementarios\/(?=[#?"])/g, '../servicios-complementarios/index.html')
    .replace(/\b(href|src|action)="\/(?!\/)([^"]*)"/g, (_match, attribute, target) => {
      if (!target) return `${attribute}="../index.html"`;
      if (target.startsWith('#')) return `${attribute}="../index.html${target}"`;
      return `${attribute}="../${target}${target.endsWith('/') ? 'index.html' : ''}"`;
    });
  fs.writeFileSync(filePath, html, 'utf8');
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === '.git' || entry.name === 'tools') return [];
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : entry.isFile() && entry.name.endsWith('.html') ? [fullPath] : [];
  });
}

for (const filePath of walk(root)) {
  let html = fs.readFileSync(filePath, 'utf8');
  html = html.replace(/<a\b(?=[^>]*target="_blank")(?![^>]*\brel=)[^>]*>/gi, (tag) =>
    tag.replace(/>$/, ' rel="noopener">')
  );
  fs.writeFileSync(filePath, html, 'utf8');
}

console.log(`Enlaces normalizados: ${supportingPages.length} páginas complementarias y seguridad externa global.`);
