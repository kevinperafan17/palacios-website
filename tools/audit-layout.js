const childProcess = require('child_process');
const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outputRoot = path.resolve(process.argv[2] || path.join(os.tmpdir(), 'palacios-layout-audit'));
const sitePort = 4174;
const debugPort = 9224;

const pages = [
  ['home', '/'],
  ['auditoria', '/auditoria/'],
  ['propiedad-horizontal', '/propiedad-horizontal/'],
  ['innovacion', '/innovacion/'],
];

const viewports = [
  ['1920x1080', 1920, 1080, false],
  ['1600x900', 1600, 900, false],
  ['1440x900', 1440, 900, false],
  ['1366x768', 1366, 768, false],
  ['tablet', 768, 1024, true],
  ['mobile', 390, 844, true],
];

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

function findChrome() {
  const candidates = [
    path.join(process.env.ProgramFiles || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(process.env['ProgramFiles(x86)'] || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(process.env.ProgramFiles || '', 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
    path.join(process.env['ProgramFiles(x86)'] || '', 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
  ];
  const executable = candidates.find((candidate) => candidate && fs.existsSync(candidate));
  if (!executable) throw new Error('No se encontró Chrome o Edge.');
  return executable;
}

function startServer() {
  const server = http.createServer((request, response) => {
    const requestUrl = new URL(request.url, `http://127.0.0.1:${sitePort}`);
    const decodedPath = decodeURIComponent(requestUrl.pathname);
    const relativePath = decodedPath.endsWith('/') ? `${decodedPath}index.html` : decodedPath;
    const filePath = path.resolve(root, `.${relativePath}`);

    if (!filePath.startsWith(root) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      response.writeHead(404).end('Not found');
      return;
    }

    response.writeHead(200, {
      'Content-Type': mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    fs.createReadStream(filePath).pipe(response);
  });

  return new Promise((resolve) => server.listen(sitePort, '127.0.0.1', () => resolve(server)));
}

async function waitForDebugger() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${debugPort}/json`);
      if (response.ok) return response.json();
    } catch (_error) {
      // Chrome still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error('Chrome no abrió el puerto de depuración.');
}

class CdpClient {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.sequence = 0;
    this.pending = new Map();
    this.listeners = new Map();
  }

  async open() {
    await new Promise((resolve, reject) => {
      this.socket.addEventListener('open', resolve, { once: true });
      this.socket.addEventListener('error', reject, { once: true });
    });
    this.socket.addEventListener('message', (event) => this.handleMessage(JSON.parse(event.data)));
  }

  handleMessage(message) {
    if (message.id && this.pending.has(message.id)) {
      const { resolve, reject } = this.pending.get(message.id);
      this.pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
      return;
    }

    const listeners = this.listeners.get(message.method) || [];
    listeners.forEach((listener) => listener(message.params));
  }

  send(method, params = {}) {
    const id = ++this.sequence;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  waitFor(method) {
    return new Promise((resolve) => {
      const listener = (params) => {
        this.listeners.set(method, (this.listeners.get(method) || []).filter((item) => item !== listener));
        resolve(params);
      };
      this.listeners.set(method, [...(this.listeners.get(method) || []), listener]);
    });
  }

  close() {
    this.socket.close();
  }
}

const metricExpression = `JSON.stringify((() => {
  const rect = (element) => {
    if (!element) return null;
    const box = element.getBoundingClientRect();
    return {
      top: Math.round(box.top),
      left: Math.round(box.left),
      width: Math.round(box.width),
      height: Math.round(box.height),
      bottom: Math.round(box.bottom),
      lines: Math.round(box.height / parseFloat(getComputedStyle(element).lineHeight || box.height)),
    };
  };
  const sections = [...document.querySelectorAll('main > section')].map((section, index) => ({
    index,
    id: section.id || null,
    className: section.className,
    height: Math.round(section.getBoundingClientRect().height),
    top: Math.round(section.offsetTop),
  }));
  const cards = [...document.querySelectorAll('.positioning-card, .pain-card, .solution-card, .outcome-card, .audience-card, .method-card, .service-feature')];
  return {
    viewport: { width: innerWidth, height: innerHeight },
    document: { width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight },
    header: rect(document.querySelector('.site-header')),
    hero: rect(document.querySelector('.hero, .inner-hero')),
    heroTitle: rect(document.querySelector('.hero h1, .inner-hero h1')),
    heroLead: rect(document.querySelector('.hero__lead')),
    heroActions: rect(document.querySelector('.hero__actions')),
    heroTrust: rect(document.querySelector('.trust-strip')),
    heroVisual: rect(document.querySelector('.decision-canvas, .service-visual')),
    dock: rect(document.querySelector('.conversion-dock')),
    sectionCount: sections.length,
    sections,
    cards: {
      count: cards.length,
      minHeight: cards.length ? Math.min(...cards.map((card) => Math.round(card.getBoundingClientRect().height))) : 0,
      maxHeight: cards.length ? Math.max(...cards.map((card) => Math.round(card.getBoundingClientRect().height))) : 0,
      averageHeight: cards.length ? Math.round(cards.reduce((sum, card) => sum + card.getBoundingClientRect().height, 0) / cards.length) : 0,
    },
  };
})())`;

async function main() {
  fs.mkdirSync(outputRoot, { recursive: true });
  const server = await startServer();
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'palacios-layout-'));
  const chrome = childProcess.spawn(findChrome(), [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${profile}`,
    'about:blank',
  ], { stdio: 'ignore', windowsHide: true });

  try {
    const targets = await waitForDebugger();
    const target = targets.find((item) => item.type === 'page');
    const client = new CdpClient(target.webSocketDebuggerUrl);
    await client.open();
    await client.send('Page.enable');
    await client.send('Runtime.enable');

    const audit = {};
    for (const [pageName, route] of pages) {
      audit[pageName] = {};
      for (const [viewportName, width, height, mobile] of viewports) {
        await client.send('Emulation.setDeviceMetricsOverride', {
          width,
          height,
          deviceScaleFactor: 1,
          mobile,
          screenWidth: width,
          screenHeight: height,
        });
        const loaded = client.waitFor('Page.loadEventFired');
        await client.send('Page.navigate', { url: `http://127.0.0.1:${sitePort}${route}` });
        await loaded;
        await client.send('Runtime.evaluate', {
          expression: 'document.fonts.ready',
          awaitPromise: true,
          returnByValue: true,
        });
        await new Promise((resolve) => setTimeout(resolve, 250));
        await client.send('Runtime.evaluate', {
          expression: `document.documentElement.classList.add('layout-audit'); document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));`,
        });

        const result = await client.send('Runtime.evaluate', { expression: metricExpression, returnByValue: true });
        audit[pageName][viewportName] = JSON.parse(result.result.value);

        const screenshot = await client.send('Page.captureScreenshot', {
          format: 'png',
          fromSurface: true,
          captureBeyondViewport: false,
        });
        fs.writeFileSync(path.join(outputRoot, `${pageName}-${viewportName}.png`), screenshot.data, 'base64');

        if (viewportName === '1440x900') {
          await client.send('Runtime.evaluate', {
            expression: `(async () => {
              const step = Math.max(500, Math.round(innerHeight * 0.8));
              for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
                scrollTo(0, y);
                await new Promise((resolve) => setTimeout(resolve, 60));
              }
              scrollTo(0, 0);
              await new Promise((resolve) => setTimeout(resolve, 180));
            })()`,
            awaitPromise: true,
          });
          const layout = await client.send('Page.getLayoutMetrics');
          const fullScreenshot = await client.send('Page.captureScreenshot', {
            format: 'png',
            fromSurface: true,
            captureBeyondViewport: true,
            clip: {
              x: 0,
              y: 0,
              width: layout.cssContentSize.width,
              height: layout.cssContentSize.height,
              scale: 1,
            },
          });
          fs.writeFileSync(path.join(outputRoot, `${pageName}-full.png`), fullScreenshot.data, 'base64');
        }
      }
    }

    fs.writeFileSync(path.join(outputRoot, 'metrics.json'), `${JSON.stringify(audit, null, 2)}\n`, 'utf8');
    client.close();
    console.log(`Auditoría visual guardada en ${outputRoot}`);
  } finally {
    chrome.kill();
    server.close();
    await new Promise((resolve) => chrome.once('exit', resolve));
    try {
      fs.rmSync(profile, { recursive: true, force: true });
    } catch (_error) {
      // Chrome Crashpad can retain its metrics file briefly on Windows.
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
