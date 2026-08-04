const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const targets = [
  ['service-details-auditoria.html', 'https://grupopalaciosasesores.com/revisoria-fiscal/'],
  ['service-details-propiedad-horizontal.html', 'https://grupopalaciosasesores.com/propiedad-horizontal/'],
  ['service-details-innovacion.html', 'https://grupopalaciosasesores.com/automatizacion-ia/'],
  ['service-details-complementarios.html', 'https://grupopalaciosasesores.com/servicios-complementarios/']
];

for (const [filename, canonical] of targets) {
  const file = path.join(root, filename);
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('name="robots" content="noindex, follow"')) {
    html = html.replace('<meta name="keywords"', `<meta name="robots" content="noindex, follow">\n  <link rel="canonical" href="${canonical}">\n  <meta name="keywords"`);
  }
  fs.writeFileSync(file, html, 'utf8');
}

console.log('Legacy service pages marked noindex.');
