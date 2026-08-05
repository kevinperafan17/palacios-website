const fs = require('fs');
const http = require('http');
const path = require('path');
const zlib = require('zlib');

const root = path.resolve(__dirname, '..');
const port = Number(process.env.PORT || process.argv[2] || 4175);
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
};
const compressible = new Set(['.css', '.html', '.js', '.json', '.xml']);

function resolveRequest(requestUrl) {
  const parsed = new URL(requestUrl, `http://127.0.0.1:${port}`);
  const decoded = decodeURIComponent(parsed.pathname);
  const relative = decoded.endsWith('/') ? `${decoded}index.html` : decoded;
  const candidate = path.resolve(root, `.${relative}`);
  return candidate.startsWith(root) ? candidate : null;
}

http.createServer((request, response) => {
  let filePath = resolveRequest(request.url);
  let status = 200;
  if (!filePath || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    filePath = path.join(root, '404.html');
    status = 404;
  }

  const extension = path.extname(filePath).toLowerCase();
  const headers = {
    'Content-Type': mimeTypes[extension] || 'application/octet-stream',
    'Cache-Control': extension === '.html'
      ? 'no-cache'
      : 'public, max-age=31536000, immutable',
    'Vary': 'Accept-Encoding',
  };
  const source = fs.createReadStream(filePath);
  const acceptedEncoding = request.headers['accept-encoding'] || '';
  const encoding = compressible.has(extension)
    ? (acceptedEncoding.includes('br') ? 'br' : acceptedEncoding.includes('gzip') ? 'gzip' : '')
    : '';
  if (encoding) headers['Content-Encoding'] = encoding;

  response.writeHead(status, headers);
  if (!compressible.has(extension)) {
    source.pipe(response);
  } else if (encoding === 'br') {
    source.pipe(zlib.createBrotliCompress()).pipe(response);
  } else if (encoding === 'gzip') {
    source.pipe(zlib.createGzip()).pipe(response);
  } else {
    source.pipe(response);
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`Production-like server: http://127.0.0.1:${port}`);
});
