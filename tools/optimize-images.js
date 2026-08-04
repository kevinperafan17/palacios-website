const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const imageRoot = fs.realpathSync(path.resolve(__dirname, '..', 'assets', 'img'));

function collect(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`No se optimizan enlaces: ${fullPath}`);
    if (entry.isDirectory()) return collect(fullPath);
    return entry.isFile() && entry.name.toLowerCase().endsWith('.webp') ? [fullPath] : [];
  });
}

function assertInside(filePath) {
  const relative = path.relative(imageRoot, filePath);
  if (!relative || relative.startsWith('..' + path.sep) || path.isAbsolute(relative)) {
    throw new Error(`Ruta fuera de assets/img: ${filePath}`);
  }
}

const targets = collect(imageRoot)
  .filter((filePath) => fs.statSync(filePath).size > 250000)
  .sort();

if (targets.length !== 27) {
  throw new Error(`Conteo inesperado de imágenes: ${targets.length}; se esperaban 27.`);
}

const before = targets.reduce((total, filePath) => total + fs.statSync(filePath).size, 0);
let replaced = 0;
let after = 0;

for (const filePath of targets) {
  assertInside(filePath);
  const stat = fs.lstatSync(filePath);
  if (!stat.isFile() || stat.isSymbolicLink()) throw new Error(`Objetivo inválido: ${filePath}`);

  const tempPath = filePath + '.optimized.webp';
  assertInside(tempPath);
  if (fs.existsSync(tempPath)) throw new Error(`Temporal preexistente: ${tempPath}`);

  const encode = spawnSync('ffmpeg', [
    '-hide_banner', '-loglevel', 'error', '-y', '-i', filePath,
    '-map_metadata', '-1', '-c:v', 'libwebp', '-quality', '76',
    '-compression_level', '6', '-preset', 'picture', '-an', tempPath,
  ], { stdio: 'inherit' });

  if (encode.status !== 0 || !fs.existsSync(tempPath)) {
    throw new Error(`Falló ffmpeg para ${filePath}`);
  }

  const probe = spawnSync('ffprobe', [
    '-v', 'error', '-select_streams', 'v:0', '-show_entries',
    'stream=codec_name,width,height', '-of', 'json', tempPath,
  ], { encoding: 'utf8' });
  if (probe.status !== 0) throw new Error(`Salida inválida para ${filePath}`);

  const outputSize = fs.statSync(tempPath).size;
  if (outputSize > 0 && outputSize < stat.size) {
    fs.copyFileSync(tempPath, filePath);
    fs.unlinkSync(tempPath);
    replaced += 1;
    after += outputSize;
  } else {
    fs.unlinkSync(tempPath);
    after += stat.size;
  }
}

console.log(JSON.stringify({
  processed: targets.length,
  replaced,
  beforeMB: Number((before / 1048576).toFixed(2)),
  afterMB: Number((after / 1048576).toFixed(2)),
  savedPercent: Number(((1 - after / before) * 100).toFixed(1)),
}, null, 2));
