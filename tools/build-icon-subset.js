const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const sourceCssPath = path.join(root, 'assets', 'vendor', 'bootstrap-icons', 'bootstrap-icons.css');
const sourceFontPath = path.join(root, 'assets', 'vendor', 'bootstrap-icons', 'fonts', 'bootstrap-icons.woff');
const outputCssPath = path.join(root, 'assets', 'css', 'palacios-icons.css');
const outputFontPath = path.join(root, 'assets', 'fonts', 'palacios-icons.woff');

function walkHtml(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith('.') || entry.name === 'tools') return [];
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walkHtml(fullPath);
    return entry.name.endsWith('.html') ? [fullPath] : [];
  });
}

const scanFiles = [
  ...walkHtml(root),
  path.join(root, 'assets', 'js', 'palacios-2026.js'),
  path.join(root, 'assets', 'js', 'palacios-motion.js'),
  path.join(root, 'tools', 'build-redesign.js'),
  path.join(root, 'tools', 'generate-premium-landings.js'),
];
const iconNames = new Set();
scanFiles.forEach((filePath) => {
  const source = fs.readFileSync(filePath, 'utf8');
  for (const match of source.matchAll(/\bbi-([a-z0-9-]+)/g)) iconNames.add(match[1]);
});

const sourceCss = fs.readFileSync(sourceCssPath, 'utf8');
const rules = [];
const unicodes = [];
for (const name of [...iconNames].sort()) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = sourceCss.match(new RegExp(`\\.bi-${escapedName}::before\\s*\\{\\s*content:\\s*"\\\\([a-f0-9]+)";?\\s*\\}`, 'i'));
  if (!match) throw new Error(`No se encontró el icono bi-${name}.`);
  rules.push(`.bi-${name}::before{content:"\\${match[1]}"}`);
  unicodes.push(`U+${match[1].toUpperCase()}`);
}

const subset = childProcess.spawnSync('python', [
  '-m',
  'fontTools.subset',
  sourceFontPath,
  `--output-file=${outputFontPath}`,
  `--unicodes=${unicodes.join(',')}`,
  '--flavor=woff',
  '--layout-features=*',
], { encoding: 'utf8' });
if (subset.status !== 0) throw new Error(subset.stderr || 'No fue posible generar la fuente de iconos.');

const css = `@font-face{font-display:swap;font-family:"palacios-icons";src:url("../fonts/palacios-icons.woff") format("woff")}.bi::before,[class^="bi-"]::before,[class*=" bi-"]::before{display:inline-block;font-family:"palacios-icons"!important;font-style:normal;font-weight:400!important;font-variant:normal;line-height:1;text-transform:none;vertical-align:-.125em;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}${rules.join('')}`;
fs.writeFileSync(outputCssPath, `${css}\n`, 'utf8');
console.log(`Subset de iconos generado: ${rules.length} glifos.`);
