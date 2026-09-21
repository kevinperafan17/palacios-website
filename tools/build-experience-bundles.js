const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8').trim();
}

function write(relativePath, content) {
  fs.writeFileSync(path.join(root, relativePath), `${content}\n`, 'utf8');
}

write(
  'assets/css/palacios-experience.min.css',
  [read('assets/css/palacios-2026.min.css'), read('assets/css/palacios-motion.min.css')].join('\n'),
);

write(
  'assets/js/palacios-experience.min.js',
  [read('assets/js/palacios-2026.min.js'), read('assets/js/palacios-motion.min.js')].join(';\n'),
);

console.log('Bundles de experiencia generados: CSS y JavaScript.');
