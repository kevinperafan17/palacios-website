const childProcess = require('child_process');
const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');

const root = path.resolve(__dirname, '..');
const cliArguments = process.argv.slice(2);
const baseUrlArgument = cliArguments.find((argument) => argument.startsWith('--base-url='));
const outputArgument = cliArguments.find((argument) => !argument.startsWith('--'));
const auditAllPages = cliArguments.includes('--all-pages');
const smokeOnly = cliArguments.includes('--smoke-only');
const screenshotsEnabled = !cliArguments.includes('--no-screenshots');
const outputRoot = path.resolve(outputArgument || path.join(os.tmpdir(), 'palacios-layout-audit'));
const sitePort = 4174;
const debugPort = 9224;
const siteBaseUrl = (baseUrlArgument
  ? baseUrlArgument.slice('--base-url='.length)
  : `http://127.0.0.1:${sitePort}`).replace(/\/$/, '');
const usesLocalServer = !baseUrlArgument;
const siteOrigin = new URL(siteBaseUrl).origin;

const representativePages = [
  ['home', '/'],
  ['auditoria', '/auditoria/'],
  ['propiedad-horizontal', '/propiedad-horizontal/'],
  ['innovacion', '/innovacion/'],
  ['domo', '/domo/'],
  ['analitica-datos', '/analitica-datos/'],
  ['blog', '/blog/blog.html'],
  ['articulo', '/blog/blog-details-auditoria.html'],
  ['404', '/404.html'],
];

function discoverPages(directory = root) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith('.') || ['tools', 'tmp', 'Logos'].includes(entry.name)) return [];
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return discoverPages(fullPath);
    if (!entry.name.endsWith('.html')) return [];
    const relative = path.relative(root, fullPath).replaceAll('\\', '/');
    const route = relative === 'index.html'
      ? '/'
      : `/${relative.replace(/index\.html$/, '')}`;
    return [[relative.replace(/\.html$/, '').replaceAll('/', '--'), route]];
  });
}

const pages = auditAllPages ? discoverPages() : representativePages;

const interactionRoutes = new Set(['/', '/auditoria/', '/propiedad-horizontal/', '/innovacion/', '/analitica-datos/']);
const interactionPages = pages.filter(([, route]) => interactionRoutes.has(route));

const completeViewports = [
  ['2560x1440', 2560, 1440, false],
  ['1920x1080', 1920, 1080, false],
  ['1600x900', 1600, 900, false],
  ['1440x900', 1440, 900, false],
  ['1366x768', 1366, 768, false],
  ['tablet', 768, 1024, true],
  ['mobile', 390, 844, true],
  ['small-mobile', 320, 568, true],
];
const viewports = smokeOnly
  ? completeViewports.filter(([name]) => ['1440x900', 'mobile'].includes(name))
  : completeViewports;

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
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

  on(method, listener) {
    this.listeners.set(method, [...(this.listeners.get(method) || []), listener]);
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

async function evaluateValue(client, expression) {
  const result = await client.send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text || 'Error al evaluar el navegador.');
  }
  return result.result.value;
}

async function navigate(client, route) {
  const loaded = client.waitFor('Page.loadEventFired');
  await client.send('Page.navigate', { url: `${siteBaseUrl}${route}` });
  await loaded;
  await evaluateValue(client, 'document.fonts.ready.then(() => true)');
  await new Promise((resolve) => setTimeout(resolve, 180));
}

async function runInteractionAudit(client) {
  const checks = [];
  const record = (pageName, viewport, name, pass, details) => {
    checks.push({ page: pageName, viewport, name, pass: Boolean(pass), details });
  };

  for (const [pageName, route] of interactionPages) {
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1366,
      height: 768,
      deviceScaleFactor: 1,
      mobile: false,
      screenWidth: 1366,
      screenHeight: 768,
    });
    await navigate(client, route);

    const desktop = JSON.parse(await evaluateValue(client, `JSON.stringify((() => {
      const actions = document.querySelector('.hero__actions')?.getBoundingClientRect();
      const ctas = [...document.querySelectorAll('a[data-event]')];
      const whatsapp = [...document.querySelectorAll('a[href^="https://wa.me/"]')];
      return {
        overflow: document.documentElement.scrollWidth - innerWidth,
        actionsVisible: Boolean(actions && actions.top >= 0 && actions.bottom <= innerHeight),
        emptyCtas: ctas.filter((link) => !link.getAttribute('href')).length,
        whatsappCount: whatsapp.length,
        invalidWhatsapp: whatsapp.filter((link) => !link.href.startsWith('https://wa.me/')).length,
      };
    })())`));
    record(pageName, '1366x768', 'Sin scroll horizontal', desktop.overflow <= 0, desktop);
    record(pageName, '1366x768', 'CTA del hero visible', desktop.actionsVisible, desktop);
    record(pageName, '1366x768', 'CTA con destino válido', desktop.emptyCtas === 0, desktop);
    record(pageName, '1366x768', 'Enlaces WhatsApp válidos', desktop.whatsappCount > 0 && desktop.invalidWhatsapp === 0, desktop);

    await evaluateValue(client, 'scrollTo(0, 360); true');
    await new Promise((resolve) => setTimeout(resolve, 120));
    const sticky = await evaluateValue(client, `document.querySelector('[data-header]')?.classList.contains('is-scrolled') === true`);
    record(pageName, '1366x768', 'Header sticky activo', sticky, { scrollY: 360 });
    await evaluateValue(client, 'scrollTo(0, 0); true');

    const faq = JSON.parse(await evaluateValue(client, `JSON.stringify((() => {
      const detail = document.querySelector('.faq-list details');
      if (!detail) return { available: false, opens: true };
      detail.open = true;
      return { available: true, opens: detail.open };
    })())`));
    record(pageName, '1366x768', 'FAQ interactivo', faq.opens, faq);

    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 1,
      mobile: true,
      screenWidth: 390,
      screenHeight: 844,
    });
    await navigate(client, route);
    const opened = JSON.parse(await evaluateValue(client, `JSON.stringify((() => {
      const toggle = document.querySelector('[data-nav-toggle]');
      toggle?.click();
      return {
        open: document.querySelector('[data-nav]')?.classList.contains('is-open') === true,
        expanded: toggle?.getAttribute('aria-expanded') === 'true',
      };
    })())`));
    record(pageName, 'mobile', 'Menú móvil abre', opened.open && opened.expanded, opened);
    const closed = JSON.parse(await evaluateValue(client, `JSON.stringify((() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      const toggle = document.querySelector('[data-nav-toggle]');
      return {
        closed: document.querySelector('[data-nav]')?.classList.contains('is-open') === false,
        collapsed: toggle?.getAttribute('aria-expanded') === 'false',
      };
    })())`));
    record(pageName, 'mobile', 'Menú móvil cierra con Escape', closed.closed && closed.collapsed, closed);

    await evaluateValue(client, 'scrollTo(0, 420); true');
    await new Promise((resolve) => setTimeout(resolve, 320));
    const dock = JSON.parse(await evaluateValue(client, `JSON.stringify((() => {
      const element = document.querySelector('.conversion-dock');
      const box = element?.getBoundingClientRect();
      return {
        width: Math.round(box?.width || 0),
        height: Math.round(box?.height || 0),
        top: Math.round(box?.top || 0),
        right: Math.round(box?.right || 0),
        bottom: Math.round(box?.bottom || 0),
        left: Math.round(box?.left || 0),
        viewportWidth: innerWidth,
        viewportHeight: innerHeight,
        insideViewport: Boolean(box && box.right <= innerWidth + 1 && box.bottom <= innerHeight + 1 && box.left >= -1),
        visible: element?.classList.contains('is-suppressed') === false,
        shortLabel: element?.innerText.includes('Chat') === true,
      };
    })())`));
    record(pageName, 'mobile', 'WhatsApp compacto y visible', dock.width <= 110 && dock.height <= 64 && dock.insideViewport && dock.visible && dock.shortLabel, dock);
  }

  await client.send('Emulation.setDeviceMetricsOverride', {
    width: 1024,
    height: 768,
    deviceScaleFactor: 1,
    mobile: false,
    screenWidth: 1024,
    screenHeight: 768,
  });
  await navigate(client, '/');
  const intermediateNav = JSON.parse(await evaluateValue(client, `JSON.stringify((() => ({
    toggleVisible: getComputedStyle(document.querySelector('[data-nav-toggle]')).display !== 'none',
    menuCollapsed: getComputedStyle(document.querySelector('[data-nav]')).visibility === 'hidden',
  }))())`));
  record('home', '1024x768', 'Navegación colapsa antes de comprimirse', intermediateNav.toggleVisible && intermediateNav.menuCollapsed, intermediateNav);

  return checks;
}

async function main() {
  fs.mkdirSync(outputRoot, { recursive: true });
  const server = usesLocalServer ? await startServer() : null;
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
    await client.send('Network.enable');

    const browserIssues = [];
    let activeContext = 'inicio';
    client.on('Runtime.exceptionThrown', (params) => {
      browserIssues.push({
        context: activeContext,
        type: 'javascript',
        message: params.exceptionDetails?.exception?.description || params.exceptionDetails?.text || 'Error JavaScript',
      });
    });
    client.on('Network.responseReceived', (params) => {
      const { response } = params;
      if (response.url.startsWith(siteOrigin) && response.status >= 400) {
        browserIssues.push({ context: activeContext, type: 'resource', status: response.status, url: response.url });
      }
    });

    const audit = {};
    for (const [pageName, route] of pages) {
      audit[pageName] = {};
      for (const [viewportName, width, height, mobile] of viewports) {
        activeContext = `${pageName}:${viewportName}`;
        await client.send('Emulation.setDeviceMetricsOverride', {
          width,
          height,
          deviceScaleFactor: 1,
          mobile,
          screenWidth: width,
          screenHeight: height,
        });
        const loaded = client.waitFor('Page.loadEventFired');
        await client.send('Page.navigate', { url: `${siteBaseUrl}${route}` });
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

        if (screenshotsEnabled) {
          const screenshot = await client.send('Page.captureScreenshot', {
            format: 'png',
            fromSurface: true,
            captureBeyondViewport: false,
          });
          fs.writeFileSync(path.join(outputRoot, `${pageName}-${viewportName}.png`), screenshot.data, 'base64');
        }

        if (screenshotsEnabled && viewportName === '1440x900') {
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

    activeContext = 'interaction-audit';
    const interactionChecks = await runInteractionAudit(client);
    const failedChecks = interactionChecks.filter((check) => !check.pass);

    fs.writeFileSync(path.join(outputRoot, 'metrics.json'), `${JSON.stringify(audit, null, 2)}\n`, 'utf8');
    fs.writeFileSync(path.join(outputRoot, 'interaction-tests.json'), `${JSON.stringify(interactionChecks, null, 2)}\n`, 'utf8');
    fs.writeFileSync(path.join(outputRoot, 'browser-issues.json'), `${JSON.stringify(browserIssues, null, 2)}\n`, 'utf8');
    client.close();
    console.log(`Auditoría visual guardada en ${outputRoot}`);
    console.log(`Interacciones: ${interactionChecks.length - failedChecks.length}/${interactionChecks.length} correctas. Incidencias de navegador: ${browserIssues.length}.`);
    if (failedChecks.length || browserIssues.length) {
      throw new Error(`La auditoría detectó ${failedChecks.length} pruebas fallidas y ${browserIssues.length} incidencias de navegador.`);
    }
  } finally {
    chrome.kill();
    server?.close();
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
