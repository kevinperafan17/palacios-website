const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const domain = 'https://www.grupopalaciosasesores.com';
const phone = '573151816494';
const displayPhone = '+57 315 181 6494';
const displayPhoneHtml = '+57&nbsp;315&nbsp;181&nbsp;6494';
const email = 'contacto@grupopalaciosasesores.com';
const socials = {
  tiktok: 'https://www.tiktok.com/@palacios.asesores2',
  instagram: 'https://www.instagram.com/palaciosasesores?igsh=NjF5YjIzOW1ncmQ3',
  facebook: 'https://www.facebook.com/share/1GogRVpA3k/',
};

function localizeRootUrls(relativePath, content) {
  const directory = path.dirname(relativePath);
  const depth = directory === '.' ? 0 : directory.split(/[\\/]/).filter(Boolean).length;
  const prefix = '../'.repeat(depth);

  return content.replace(/\b(href|src|action)="\/(?!\/)([^"]*)"/g, (_match, attribute, target) => {
    if (!target) return `${attribute}="${prefix}index.html"`;
    if (target.startsWith('#')) return `${attribute}="${prefix}index.html${target}"`;

    return `${attribute}="${prefix}${target}${target.endsWith('/') ? 'index.html' : ''}"`;
  });
}

function write(relativePath, content) {
  const destination = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  const localizedContent = relativePath.endsWith('.html')
    ? localizeRootUrls(relativePath, content)
    : content;
  fs.writeFileSync(destination, localizedContent.replace(/[ \t]+$/gm, '').trimStart(), 'utf8');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function whatsapp(message) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function icon(name) {
  return `<i class="bi bi-${name}" aria-hidden="true"></i>`;
}

function responsiveImageAttributes(image, sizes) {
  if (!image.endsWith('.webp')) return '';
  const stem = image.slice(0, -5);
  return ` srcset="${stem}-640.webp 640w, ${stem}-1280.webp 1280w" sizes="${sizes}"`;
}

function responsiveCardImageAttributes(image, sizes) {
  if (!image.endsWith('.webp')) return '';
  const stem = image.slice(0, -5);
  return ` srcset="${stem}-card-640.webp 640w, ${stem}-card-1024.webp 1024w" sizes="${sizes}"`;
}

function analytics() {
  return `
  <script>
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){dataLayer.push(arguments);};
    gtag('js', new Date());
    gtag('config', 'G-7978WT0ESL');
    (function(){
      var loaded = false;
      function loadAnalytics(){
        if (loaded) return;
        loaded = true;
        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-7978WT0ESL';
        document.head.appendChild(script);
      }
      ['pointerdown', 'keydown'].forEach(function(eventName){
        window.addEventListener(eventName, loadAnalytics, { once: true, passive: true });
      });
      window.addEventListener('load', function(){ setTimeout(loadAnalytics, 12000); }, { once: true });
    })();
  </script>`;
}

function head({ title, description, canonical, image = '/assets/img/logo.webp', type = 'website', schema = [] }) {
  const schemas = schema.map((item) => `  <script type="application/ld+json">${JSON.stringify(item)}</script>`).join('\n');
  return `
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${domain}${canonical}">
  <meta property="og:locale" content="es_CO">
  <meta property="og:type" content="${type}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${domain}${canonical}">
  <meta property="og:image" content="${domain}${image}">
  <meta property="og:site_name" content="Palacios Asesores &amp; Revisores">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${domain}${image}">
  <meta name="theme-color" content="#111d39">
  <link rel="icon" href="/assets/img/favicon.png">
  <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
  <link rel="preload" href="/assets/fonts/sora-latin-variable.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/dm-serif-display-italic-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link href="/assets/css/palacios-icons.css" rel="stylesheet">
  <link href="/assets/css/palacios-2026.min.css" rel="stylesheet">
${analytics()}
${schemas}
</head>`;
}

function header(active = 'home', solid = false) {
  const links = [
    ['about', '/#firma', 'Nosotros'],
    ['services', '/#soluciones', 'Servicios'],
    ['audit', '/auditoria/', 'Auditoría'],
    ['ph', '/propiedad-horizontal/', 'Propiedad Horizontal'],
    ['innovation', '/innovacion/', 'Innovación'],
    ['domo', '/domo/', 'DOMO'],
    ['blog', '/blog/blog.html', 'Ideas'],
  ];
  const nav = links.map(([key, href, label]) =>
    `<li><a href="${href}"${active === key ? ' aria-current="page"' : ''}>${label}</a></li>`
  ).join('');
  return `
<a class="skip-link" href="#contenido">Saltar al contenido</a>
<header class="site-header${solid ? ' site-header--solid' : ''}" data-header>
  <div class="container site-header__inner">
    <a class="brand" href="/" aria-label="Palacios Asesores &amp; Revisores, inicio">
      <img src="/assets/img/logo.webp" srcset="/assets/img/logo-64.webp 64w, /assets/img/logo-128.webp 128w" sizes="43px" width="86" height="111" alt="" decoding="async">
      <span class="brand__name"><strong>Palacios</strong><span>Asesores &amp; Revisores</span></span>
    </a>
    <nav class="site-nav" id="site-navigation" data-nav aria-label="Navegación principal"><ul>${nav}</ul></nav>
    <a class="button button--gold header-cta" href="${whatsapp('Hola, quiero solicitar una asesoría con Palacios Asesores & Revisores.')}" target="_blank" rel="noopener" data-event="whatsapp_click" data-service="general">Hablemos ${icon('arrow-right')}</a>
    <button class="nav-toggle" type="button" aria-label="Abrir menú" aria-controls="site-navigation" aria-expanded="false" data-nav-toggle><i class="bi bi-list" aria-hidden="true"></i></button>
  </div>
</header>`;
}

function footer() {
  return `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <a class="brand" href="/" aria-label="Palacios Asesores &amp; Revisores, inicio">
          <img src="/assets/img/logo.webp" srcset="/assets/img/logo-64.webp 64w, /assets/img/logo-128.webp 128w" sizes="43px" width="86" height="111" alt="" loading="lazy" decoding="async">
          <span class="brand__name"><strong>Palacios</strong><span>Asesores &amp; Revisores</span></span>
        </a>
        <p class="site-footer__intro">Auditoría, gestión especializada y tecnología para organizaciones que necesitan decidir con control y confianza.</p>
      </div>
      <div>
        <h2>Soluciones principales</h2>
        <ul class="footer-links">
          <li><a href="/auditoria/">Auditoría</a></li>
          <li><a href="/propiedad-horizontal/">Propiedad Horizontal</a></li>
          <li><a href="/innovacion/">Innovación y Tecnología</a></li>
          <li><a href="/domo/">DOMO</a></li>
          <li><a href="/#capacidades">Otras capacidades</a></li>
        </ul>
      </div>
      <div>
        <h2>Explorar</h2>
        <ul class="footer-links">
          <li><a href="/#firma">Nosotros</a></li>
          <li><a href="/#metodo">Cómo trabajamos</a></li>
          <li><a href="/blog/blog.html">Blog</a></li>
          <li><a href="/#contacto">Contacto</a></li>
        </ul>
      </div>
      <div>
        <h2>Contacto</h2>
        <ul class="footer-links">
          <li><a href="tel:+${phone}" data-event="phone_click" data-service="general">${displayPhoneHtml}</a></li>
          <li><a href="mailto:${email}" data-event="email_click" data-service="general">${email}</a></li>
        </ul>
        <div class="social-links" role="group" aria-label="Redes sociales">
          <a href="${whatsapp('Hola, quiero solicitar una asesoría con Palacios Asesores & Revisores.')}" target="_blank" rel="noopener" aria-label="WhatsApp" data-event="whatsapp_click" data-service="general">${icon('whatsapp')}</a>
          <a href="${socials.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon('instagram')}</a>
          <a href="${socials.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icon('facebook')}</a>
          <a href="${socials.tiktok}" target="_blank" rel="noopener" aria-label="TikTok">${icon('tiktok')}</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span data-current-year>2026</span> Palacios Asesores &amp; Revisores. Todos los derechos reservados.</span>
      <span>Colombia · Atención según alcance del servicio</span>
    </div>
  </div>
</footer>
<script>
  (function(){
    function loadRuntime(){
      window.setTimeout(function(){
        var script = document.createElement('script');
        script.src = '/assets/js/palacios-2026.min.js';
        document.body.appendChild(script);
      }, 30);
    }
    if (document.readyState === 'complete') loadRuntime();
    else window.addEventListener('load', loadRuntime, { once: true });
  })();
</script>`;
}

function dock(service, message) {
  return `
<aside class="conversion-dock is-suppressed" aria-label="Contacto rápido" aria-hidden="true" inert>
  <span class="conversion-dock__label">¿Revisamos su caso?</span>
  <a href="${whatsapp(message)}" target="_blank" rel="noopener" aria-label="Contactar por WhatsApp" data-event="whatsapp_click" data-service="${service}">${icon('whatsapp')} <span class="conversion-dock__desktop-label">WhatsApp</span><span class="conversion-dock__mobile-label">Chat</span></a>
</aside>`;
}

function leadForm(service, serviceLabel, message) {
  return `
<form class="lead-form" data-lead-form data-service="${service}" data-service-label="${serviceLabel}" data-phone="${phone}" novalidate>
  <div class="lead-form__heading">
    <h3>Preparemos la conversación</h3>
    <p>Complete los datos y continuará en WhatsApp para revisar y enviar el mensaje. El sitio no almacena esta información.</p>
  </div>
  <div class="form-grid">
    <div class="field">
      <label for="nombre-${service}">Nombre *</label>
      <input id="nombre-${service}" name="nombre" type="text" autocomplete="name" required>
    </div>
    <div class="field">
      <label for="organizacion-${service}">Empresa o copropiedad *</label>
      <input id="organizacion-${service}" name="organizacion" type="text" autocomplete="organization" required>
    </div>
    <div class="field">
      <label for="contacto-${service}">Correo o teléfono *</label>
      <input id="contacto-${service}" name="contacto" type="text" autocomplete="email" required>
    </div>
    <div class="field">
      <label for="servicio-${service}">Servicio de interés *</label>
      <select id="servicio-${service}" name="servicio" required>
        <option value="">Seleccione una opción</option>
        <option>${serviceLabel}</option>
        <option>Auditoría</option>
        <option>Propiedad Horizontal</option>
        <option>Innovación y Tecnología</option>
        <option>Otro servicio</option>
      </select>
    </div>
    <div class="field field--full">
      <label for="mensaje-${service}">¿Qué necesita resolver? *</label>
      <textarea id="mensaje-${service}" name="mensaje" required placeholder="Describa brevemente el reto, alcance o urgencia.">${message}</textarea>
    </div>
    <div class="hp-field" aria-hidden="true">
      <label for="website-${service}">Sitio web</label>
      <input id="website-${service}" name="website" type="text" tabindex="-1" autocomplete="off">
    </div>
    <label class="form-consent">
      <input type="checkbox" name="consentimiento" required>
      <span>Autorizo el uso de estos datos únicamente para atender mi solicitud. Para consultar el tratamiento de datos, escriba a <a href="mailto:${email}">${email}</a>.</span>
    </label>
    <p class="form-status" data-form-status role="status" aria-live="polite"></p>
    <button class="button button--navy" type="submit">${icon('whatsapp')} Continuar en WhatsApp</button>
  </div>
</form>`;
}

function contactSection(service, serviceLabel, title, message) {
  return `
<section class="section section--ink" id="contacto">
  <div class="container">
    <div class="contact-shell reveal">
      <div class="contact-copy">
        <div>
          <span class="eyebrow">Siguiente paso</span>
          <h2>${title}</h2>
          <p>Una conversación inicial permite entender el contexto, precisar el alcance y definir si podemos aportar valor.</p>
        </div>
        <div class="contact-options">
          <a class="contact-option" href="${whatsapp(`Hola, quiero solicitar una asesoría sobre ${serviceLabel}.`)}" target="_blank" rel="noopener" data-event="whatsapp_click" data-service="${service}">${icon('whatsapp')} Conversar por WhatsApp</a>
          <a class="contact-option" href="tel:+${phone}" data-event="phone_click" data-service="${service}">${icon('telephone')} Llamar&nbsp;al&nbsp;${displayPhoneHtml}</a>
          <a class="contact-option" href="mailto:${email}" data-event="email_click" data-service="${service}">${icon('envelope')} Escribir por correo</a>
        </div>
      </div>
      ${leadForm(service, serviceLabel, message)}
    </div>
  </div>
</section>`;
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${domain}/#organization`,
      name: 'Palacios Asesores & Revisores',
      url: domain,
      logo: `${domain}/assets/img/logo.webp`,
      email,
      telephone: displayPhone,
      sameAs: [socials.instagram, socials.facebook, socials.tiktok],
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${domain}/#professional-service`,
      name: 'Palacios Asesores & Revisores',
      url: domain,
      email,
      telephone: displayPhone,
      areaServed: { '@type': 'Country', name: 'Colombia' },
      provider: { '@id': `${domain}/#organization` },
    },
  ],
};

const services = [
  {
    slug: 'auditoria',
    active: 'audit',
    name: 'Auditoría',
    navName: 'Auditoría y Revisoría Fiscal',
    title: 'Auditoría y Revisoría Fiscal para empresas | Palacios',
    description: 'Revisoría fiscal, auditoría externa e interna, control y riesgos con criterio profesional, analítica y recomendaciones accionables.',
    image: '/assets/img/services/auditoria-hero.webp',
    heroTitle: 'Auditoría que va <em>más allá</em> del cumplimiento.',
    heroLead: 'Identificamos riesgos, fortalecemos controles y convertimos la información en decisiones que protegen y mejoran su organización.',
    heroTag: 'Criterio profesional · Riesgo · Evidencia',
    primary: 'Solicitar evaluación inicial',
    secondary: 'Hablar con un especialista',
    introTitle: 'Cuando la auditoría llega tarde, el riesgo ya tomó decisiones por usted.',
    introText: 'Hallazgos repetitivos, controles débiles e información poco confiable no son asuntos aislados: afectan la capacidad de dirigir, cumplir y responder.',
    pains: [
      ['arrow-repeat', 'Hallazgos que se repiten', 'Las recomendaciones pierden valor cuando no existe seguimiento ni responsables claros.'],
      ['shield-exclamation', 'Controles insuficientes', 'Procesos críticos pueden operar sin evidencia, segregación o validaciones consistentes.'],
      ['file-earmark-x', 'Información poco confiable', 'Reportes tardíos o inconsistentes limitan la lectura financiera y operativa.'],
      ['exclamation-diamond', 'Exposición normativa', 'El cumplimiento reactivo aumenta fricción, reprocesos y vulnerabilidad.'],
      ['diagram-3', 'Procesos sin trazabilidad', 'Sin rastro verificable es difícil explicar decisiones, cambios y responsabilidades.'],
      ['eye-slash', 'Riesgos sin visibilidad', 'Lo que no se identifica, evalúa y monitorea suele aparecer cuando ya genera impacto.'],
    ],
    solutions: [
      ['Revisoría fiscal', 'Para organizaciones obligadas o que buscan una mirada independiente sobre información, control y cumplimiento.', ['Planeación basada en riesgos', 'Revisión y evidencia', 'Informes y seguimiento']],
      ['Auditoría externa', 'Evaluación independiente con alcance definido para fortalecer la confianza en procesos e información.', ['Definición de alcance', 'Pruebas y análisis', 'Conclusiones documentadas']],
      ['Auditoría interna y control', 'Evaluación de procesos y controles para detectar brechas y priorizar acciones de mejora.', ['Mapeo de procesos', 'Diseño y efectividad de controles', 'Plan de mejoramiento']],
      ['Gestión de riesgos', 'Identificación, valoración y tratamiento de riesgos financieros, operativos y de cumplimiento.', ['Matriz de riesgos', 'Controles asociados', 'Monitoreo y responsables']],
      ['Auditoría de sistemas', 'Revisión del entorno tecnológico, acceso, trazabilidad y controles que soportan la operación.', ['Accesos y cambios', 'Continuidad y respaldo', 'Evidencia tecnológica']],
      ['Analítica para auditoría', 'Uso de datos para orientar pruebas, reconocer patrones y ampliar la visibilidad sobre excepciones.', ['Preparación de datos', 'Pruebas analíticas', 'Hallazgos visuales']],
    ],
    method: ['Entendimiento', 'Evaluación de riesgos', 'Planeación', 'Ejecución', 'Análisis', 'Informe', 'Seguimiento'],
    outcomes: [
      ['eye', 'Mayor visibilidad', 'Una lectura estructurada de riesgos, controles y prioridades.'],
      ['shield-check', 'Mejor control', 'Recomendaciones vinculadas con responsables, evidencia y seguimiento.'],
      ['graph-down-arrow', 'Menor exposición', 'Acciones enfocadas en reducir vulnerabilidades identificadas.'],
      ['file-earmark-check', 'Información confiable', 'Mejor soporte para reportes y decisiones organizacionales.'],
      ['check2-square', 'Acciones concretas', 'Hallazgos traducidos en pasos priorizados y comprensibles.'],
      ['activity', 'Seguimiento estructurado', 'Continuidad sobre planes de mejora y asuntos relevantes.'],
    ],
    audiences: [
      ['briefcase', 'Gerencias', 'Visibilidad para priorizar decisiones y responsabilidades.'],
      ['people', 'Juntas directivas', 'Información independiente para ejercer dirección y supervisión.'],
      ['cash-stack', 'Áreas financieras', 'Control, evidencia y confianza sobre procesos e información.'],
      ['shield', 'Responsables de control', 'Metodología para evaluar, documentar y hacer seguimiento.'],
    ],
    faq: [
      ['¿Cuál es la diferencia entre revisoría fiscal y auditoría externa?', 'La revisoría fiscal es una función de fiscalización con responsabilidades definidas por la normativa aplicable. La auditoría externa se contrata con un objetivo y alcance específicos. La conversación inicial permite determinar qué servicio corresponde.'],
      ['¿Qué diferencia existe entre auditoría interna y externa?', 'La auditoría interna apoya de forma continua la mejora del gobierno, los riesgos y los controles. La externa aporta una evaluación independiente sobre un alcance acordado.'],
      ['¿Cómo se define el alcance de una auditoría?', 'Se define según objetivos, riesgos, procesos, sedes, periodos, información disponible y entregables esperados. El alcance queda documentado antes de iniciar.'],
      ['¿Cuánto puede tardar el servicio?', 'Depende del alcance, la complejidad, el volumen de información y la disponibilidad del equipo de la organización. La propuesta incluye fases y cronograma estimado.'],
      ['¿Qué información se necesita para comenzar?', 'Normalmente se solicitan documentos corporativos, financieros, contables, tributarios, matrices, procedimientos y accesos acordes con el alcance. La lista definitiva se entrega después del entendimiento inicial.'],
      ['¿Qué entregables recibe la organización?', 'Según el servicio, puede incluir informes, hallazgos, recomendaciones, matrices, presentaciones ejecutivas y planes de seguimiento. Todo se precisa en la propuesta.'],
      ['¿Cómo protegen la confidencialidad?', 'El acceso se limita al alcance acordado y la información se maneja bajo compromisos de confidencialidad y controles definidos con el cliente.'],
      ['¿La auditoría puede realizarse de forma remota?', 'Parte del trabajo puede desarrollarse de forma remota cuando la información, evidencia y seguridad lo permiten. Algunas pruebas pueden requerir presencia o validación directa.'],
      ['¿Pueden hacer seguimiento a los hallazgos?', 'Sí. El seguimiento puede incorporarse para revisar responsables, fechas, evidencia y estado de las acciones acordadas.'],
      ['¿La evaluación inicial tiene un alcance técnico completo?', 'No. La conversación inicial permite entender la necesidad y preparar una propuesta; no sustituye una auditoría ni constituye un dictamen.'],
    ],
    formMessage: 'Quiero conversar sobre las necesidades de auditoría o revisoría fiscal de mi organización.',
  },
  {
    slug: 'propiedad-horizontal',
    active: 'ph',
    name: 'Propiedad Horizontal',
    navName: 'Propiedad Horizontal',
    title: 'Servicios para Propiedad Horizontal en Colombia | Palacios',
    description: 'Administración, outsourcing contable, revisoría fiscal, control y gestión documental para copropiedades residenciales, comerciales y mixtas.',
    image: '/assets/img/services/propiedad-horizontal-hero.webp',
    heroTitle: 'Gestión integral para copropiedades <em>mejor administradas.</em>',
    heroLead: 'Fortalecemos el control financiero, administrativo, documental y operativo de propiedades horizontales residenciales, comerciales y mixtas.',
    heroTag: 'Administración · Control · Transparencia',
    primary: 'Solicitar diagnóstico',
    secondary: 'Cotizar un servicio',
    introTitle: 'Una copropiedad no debería depender de información dispersa ni de una sola persona.',
    introText: 'La cartera, el presupuesto, los archivos y la operación necesitan continuidad, claridad y controles que puedan entender el consejo y la asamblea.',
    pains: [
      ['wallet2', 'Cartera sin seguimiento', 'La falta de segmentación y trazabilidad dificulta actuar a tiempo sobre obligaciones pendientes.'],
      ['calculator', 'Contabilidad desactualizada', 'Informes tardíos reducen la capacidad del consejo para leer y controlar la gestión.'],
      ['pie-chart', 'Presupuesto sin control', 'Desviaciones sin explicación afectan prioridades, mantenimientos y confianza.'],
      ['files', 'Debilidad documental', 'Actas, contratos y soportes dispersos ponen en riesgo la continuidad administrativa.'],
      ['person-lock', 'Dependencia operativa', 'Cuando el conocimiento vive en una persona, los cambios generan pérdida de contexto.'],
      ['chat-square-text', 'Informes poco claros', 'La información técnica sin narrativa ejecutiva dificulta decidir y comunicar.'],
    ],
    solutions: [
      ['Gestión administrativa', 'Organización de la operación, proveedores, compromisos y atención a los órganos de administración.', ['Planeación operativa', 'Seguimiento de compromisos', 'Información para consejo']],
      ['Outsourcing contable', 'Contabilidad organizada y reportes periódicos para administración, consejo y asamblea.', ['Registros y conciliaciones', 'Informes financieros', 'Soportes trazables']],
      ['Control y auditoría', 'Revisión de procesos, presupuesto, contratación y controles relevantes para la copropiedad.', ['Evaluación independiente', 'Hallazgos priorizados', 'Planes de mejora']],
      ['Revisoría fiscal', 'Fiscalización y acompañamiento profesional según las necesidades y obligaciones de la copropiedad.', ['Planeación', 'Pruebas y evidencia', 'Informes aplicables']],
      ['Gestión documental', 'Organización, clasificación y acceso controlado a la memoria documental de la copropiedad.', ['Inventario documental', 'Estructura de archivo', 'Trazabilidad y acceso']],
      ['Tecnología aplicada', 'Herramientas y automatizaciones para reducir tareas manuales y mejorar el seguimiento.', ['Flujos de información', 'Tableros de control', 'Alertas y automatización']],
    ],
    method: ['Reunión inicial', 'Diagnóstico', 'Propuesta', 'Organización', 'Implementación', 'Seguimiento'],
    outcomes: [
      ['eye', 'Información más clara', 'Reportes orientados a los asuntos que requieren atención y decisión.'],
      ['bank', 'Control financiero', 'Mayor trazabilidad sobre presupuesto, cartera y soportes.'],
      ['folder-check', 'Continuidad documental', 'Información organizada para cambios de administración y revisiones.'],
      ['people', 'Mejor gobierno', 'Consejo y administración con responsabilidades y seguimiento visibles.'],
      ['gear', 'Operación ordenada', 'Procesos definidos para reducir improvisación y reprocesos.'],
      ['shield-check', 'Gestión preventiva', 'Identificación oportuna de brechas administrativas, contables y operativas.'],
    ],
    audiences: [
      ['person-workspace', 'Administradores', 'Apoyo para organizar la operación y presentar información clara.'],
      ['people', 'Consejos de administración', 'Visibilidad independiente para supervisar y decidir.'],
      ['buildings', 'Copropiedades', 'Servicios adaptados a entornos residenciales, comerciales y mixtos.'],
      ['person-check', 'Propietarios y asambleas', 'Información comprensible sobre gestión, recursos y prioridades.'],
    ],
    faq: [
      ['¿Cómo se cotiza un servicio para propiedad horizontal?', 'Se revisan el tipo y tamaño de la copropiedad, el alcance requerido, el estado de la información, la periodicidad y las responsabilidades esperadas. Con ese entendimiento se prepara una propuesta.'],
      ['¿Atienden copropiedades residenciales y comerciales?', 'Sí. El enfoque se adapta a copropiedades residenciales, comerciales o mixtas, considerando su operación y órganos de administración.'],
      ['¿Puedo contratar solo contabilidad o revisoría fiscal?', 'Sí. Los servicios pueden definirse por línea o integrarse cuando la necesidad requiere coordinación entre varias especialidades.'],
      ['¿Qué información necesitan para el diagnóstico?', 'Generalmente se revisan estados financieros, presupuesto, cartera, actas, contratos, informes y procedimientos. La lista se ajusta al servicio solicitado.'],
      ['¿Pueden acompañar un cambio de administración o contador?', 'Sí. Podemos apoyar el inventario, la recepción de información, la identificación de pendientes y la organización de la transición dentro del alcance acordado.'],
      ['¿Qué recibe el consejo de administración?', 'Según el servicio, recibe informes ejecutivos, asuntos priorizados, soportes, recomendaciones y seguimiento a compromisos.'],
      ['¿La revisoría fiscal es independiente de la administración?', 'Sí. La independencia es esencial para ejercer la revisión y comunicar conclusiones a los órganos correspondientes.'],
      ['¿El servicio puede ser presencial y remoto?', 'Puede combinar trabajo remoto y presencial según el alcance, la disponibilidad documental y las necesidades de la copropiedad.'],
      ['¿Cómo manejan la confidencialidad de propietarios y proveedores?', 'La información se limita al equipo y alcance autorizados, con criterios de acceso, custodia y confidencialidad acordados con la copropiedad.'],
      ['¿Cuánto tarda la implementación?', 'Depende del estado inicial, la calidad de la información y el alcance. La propuesta define fases, responsables y un cronograma estimado.'],
    ],
    formMessage: 'Quiero contarles qué necesita mi copropiedad y recibir una propuesta.',
  },
  {
    slug: 'innovacion',
    active: 'innovation',
    name: 'Innovación y Tecnología',
    navName: 'Innovación y Tecnología',
    title: 'Automatización, IA y Analítica de Datos | Palacios',
    description: 'Automatización de procesos, inteligencia artificial, analítica, dashboards, integraciones y software a medida para organizaciones.',
    image: '/assets/img/services/innovacion-hero.webp',
    heroTitle: 'Convertimos procesos manuales en <em>soluciones inteligentes.</em>',
    heroLead: 'Diseñamos automatizaciones, sistemas, analítica e inteligencia artificial para mejorar la productividad, el control y la trazabilidad.',
    heroTag: 'Procesos · Datos · Automatización',
    primary: 'Identificar procesos automatizables',
    secondary: 'Conocer soluciones',
    introTitle: 'Si el equipo vive consolidando archivos, la tecnología todavía no está trabajando para la organización.',
    introText: 'Las tareas repetitivas, los reportes tardíos y la información fragmentada consumen capacidad que debería dedicarse a analizar y decidir.',
    pains: [
      ['arrow-repeat', 'Trabajo repetitivo', 'Tareas predecibles absorben tiempo y aumentan el riesgo de inconsistencias.'],
      ['file-spreadsheet', 'Dependencia de Excel', 'Archivos aislados y versiones múltiples dificultan la trazabilidad.'],
      ['clock-history', 'Reportes tardíos', 'La información llega después del momento en que debía orientar una decisión.'],
      ['link-45deg', 'Herramientas desconectadas', 'La doble digitación aparece cuando los sistemas no intercambian información.'],
      ['envelope-paper', 'Seguimiento por correo', 'Solicitudes, aprobaciones y evidencias se pierden entre conversaciones.'],
      ['bar-chart', 'Baja capacidad de análisis', 'Los equipos operan datos sin convertirlos en indicadores y alertas útiles.'],
    ],
    solutions: [
      ['Automatización de procesos', 'Flujos para tareas repetitivas, validaciones, consolidaciones, alertas y seguimientos.', ['Mapeo del proceso', 'Reglas y excepciones', 'Automatización controlada']],
      ['Analítica y dashboards', 'Tableros e indicadores para leer la operación y tomar decisiones con información organizada.', ['Modelo de datos', 'Indicadores relevantes', 'Visualización y alertas']],
      ['Software a medida', 'Soluciones diseñadas alrededor del proceso real cuando una herramienta estándar no resuelve el problema.', ['Descubrimiento', 'Prototipo', 'Construcción iterativa']],
      ['Inteligencia Artificial aplicada', 'Uso práctico de IA para clasificar, extraer, asistir o analizar información con controles humanos.', ['Caso de uso concreto', 'Prueba controlada', 'Gobierno y supervisión']],
      ['Integraciones', 'Conexión entre herramientas para reducir doble digitación y mejorar el flujo de información.', ['Fuentes y destinos', 'Reglas de intercambio', 'Monitoreo de errores']],
      ['Digitalización y trazabilidad', 'Procesos con estados, responsables, evidencia y consulta centralizada.', ['Flujo definido', 'Registro de actividad', 'Control de acceso']],
    ],
    method: ['Identificamos', 'Analizamos', 'Diseñamos', 'Prototipamos', 'Implementamos', 'Medimos y mejoramos'],
    outcomes: [
      ['hourglass-split', 'Tiempo mejor utilizado', 'Menos esfuerzo en tareas repetitivas y más espacio para análisis.'],
      ['check2-circle', 'Menos errores manuales', 'Validaciones y reglas consistentes en puntos críticos del proceso.'],
      ['signpost-split', 'Trazabilidad', 'Estados, responsables y evidencia visibles durante el flujo.'],
      ['speedometer2', 'Información oportuna', 'Indicadores y alertas alineados con momentos de decisión.'],
      ['boxes', 'Operación integrada', 'Menos pasos desconectados y menor duplicación de información.'],
      ['sliders', 'Solución adaptable', 'Diseño construido alrededor del contexto y las restricciones reales.'],
    ],
    audiences: [
      ['briefcase', 'Gerencias', 'Visibilidad sobre procesos, indicadores y prioridades.'],
      ['gear-wide-connected', 'Equipos operativos', 'Menos carga repetitiva y flujos más claros.'],
      ['calculator', 'Áreas financieras', 'Consolidaciones, validaciones y reportes con mayor trazabilidad.'],
      ['building-gear', 'Pymes y empresas', 'Adopción tecnológica gradual y conectada con un problema concreto.'],
    ],
    useCases: [
      ['layers', 'Consolidación automática', 'Caso de uso: reunir información periódica de varias fuentes bajo reglas definidas.'],
      ['bell', 'Alertas y seguimientos', 'Caso de uso: notificar vencimientos, excepciones o tareas pendientes.'],
      ['bar-chart-line', 'Dashboards gerenciales', 'Caso de uso: visualizar indicadores y asuntos que requieren atención.'],
      ['file-earmark-text', 'Lectura documental', 'Caso de uso: extraer y clasificar información con revisión humana.'],
      ['diagram-2', 'Flujos de aprobación', 'Caso de uso: organizar solicitudes, responsables, estados y evidencia.'],
      ['clipboard-data', 'Informes automatizados', 'Caso de uso: preparar reportes recurrentes a partir de datos estructurados.'],
    ],
    faq: [
      ['¿Qué procesos se pueden automatizar?', 'Los mejores candidatos suelen ser repetitivos, basados en reglas, frecuentes y con información estructurada. Antes de proponer tecnología se revisan excepciones, riesgos y volumen.'],
      ['¿Pueden integrarse con las herramientas que ya usamos?', 'Depende de las capacidades de cada herramienta, sus APIs, permisos y formatos. El diagnóstico técnico valida qué integración es viable y segura.'],
      ['¿Cómo aplican inteligencia artificial?', 'Partimos de un caso de uso concreto y definimos datos, supervisión humana, riesgos y criterios de calidad. La IA no se incorpora solo por tendencia.'],
      ['¿Cómo protegen la información?', 'El diseño considera accesos, minimización de datos, trazabilidad y controles acordes con la solución. Los requisitos se definen antes de implementar.'],
      ['¿Desarrollan software a medida?', 'Sí. Cuando el problema no encaja bien en una herramienta estándar, se puede diseñar y construir una solución ajustada al proceso.'],
      ['¿Cuánto cuesta una automatización?', 'El costo depende del número de pasos, integraciones, reglas, excepciones, usuarios y soporte. Se estima después de entender el proceso y priorizar el alcance.'],
      ['¿Cuánto tarda una implementación?', 'Una prueba acotada puede avanzar por fases. Los tiempos dependen de la complejidad, la calidad de los datos, los accesos y la participación del equipo responsable.'],
      ['¿Incluyen soporte después de implementar?', 'El alcance puede incluir estabilización, documentación, capacitación, monitoreo y mejora continua según la solución.'],
      ['¿Quién conserva la propiedad de los datos?', 'Los datos de la organización siguen siendo suyos. La propuesta debe precisar accesos, almacenamiento, responsabilidades y propiedad de los entregables.'],
      ['¿Trabajan de forma remota?', 'Gran parte del análisis y desarrollo puede realizarse remotamente. Algunas actividades de descubrimiento, validación o puesta en marcha pueden combinarse con sesiones presenciales.'],
    ],
    formMessage: 'Quiero identificar qué procesos de mi organización pueden trabajar de forma más inteligente.',
  },
];

function serviceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${domain}/${service.slug}/#service`,
        name: service.navName,
        description: service.description,
        serviceType: service.navName,
        url: `${domain}/${service.slug}/`,
        image: `${domain}${service.image}`,
        provider: { '@id': `${domain}/#professional-service` },
        areaServed: { '@type': 'Country', name: 'Colombia' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${domain}/` },
          { '@type': 'ListItem', position: 2, name: service.name, item: `${domain}/${service.slug}/` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: service.faq.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  };
}

function cards(items, className) {
  return items.map(([iconName, title, text], index) => `
<article class="${className} reveal" data-delay="${index % 3}">
  ${icon(iconName)}
  <h3>${title}</h3>
  <p>${text}</p>
</article>`).join('');
}

function domoProductBanner() {
  return `
<section class="section product-callout-section">
  <div class="container">
    <a class="product-callout reveal" href="/domo/" data-event="product_landing_click" data-service="domo">
      <span class="product-callout__brand"><img src="/domo/domo-logo-240.webp" width="240" height="158" alt="DOMO" loading="lazy" decoding="async"></span>
      <span class="product-callout__copy"><small>Producto de Innovación y Tecnología</small><strong>Conozca DOMO</strong><span>Una plataforma modular diseñada alrededor de la operación de cada organización.</span></span>
      <span class="product-callout__action">Explorar la plataforma ${icon('arrow-right')}</span>
    </a>
  </div>
</section>`;
}

function buildLanding(service) {
  const waMessage = `Hola, quiero solicitar una asesoría sobre ${service.navName}.`;
  const solutionCards = service.solutions.map(([title, text, includes], index) => `
<article class="solution-card reveal" data-delay="${index % 3}">
  <span class="solution-card__label">Solución ${String(index + 1).padStart(2, '0')}</span>
  <h3>${title}</h3>
  <p>${text}</p>
  <ul>${includes.map((item) => `<li>${item}</li>`).join('')}</ul>
</article>`).join('');
  const method = service.method.map((step) => `<article class="method-card reveal"><h3>${step}</h3></article>`).join('');
  const faq = service.faq.map(([question, answer], index) => `
<details${index === 0 ? ' open' : ''}>
  <summary>${question}</summary>
  <p>${answer}</p>
</details>`).join('');
  const useCases = service.useCases ? `
<section class="section section--light">
  <div class="container">
    <div class="section-heading">
      <div><span class="eyebrow">Ejemplos, no casos de éxito</span><h2>Casos de uso que ayudan a visualizar la oportunidad.</h2></div>
      <p>Son escenarios genéricos. La viabilidad y el alcance se validan sobre el proceso real de cada organización.</p>
    </div>
    <div class="use-case-grid">${cards(service.useCases, 'use-case-card')}</div>
  </div>
</section>` : '';

  return `<!DOCTYPE html>
<html lang="es-CO">
${head({
    title: service.title,
    description: service.description,
    canonical: `/${service.slug}/`,
    image: service.image,
    schema: [organizationSchema, serviceSchema(service)],
  })}
<body data-page="${service.slug}">
${header(service.active)}
<div class="page-progress" aria-hidden="true"><span data-scroll-progress></span></div>
<main id="contenido">
  <section class="hero inner-hero hero--${service.slug}" data-spotlight>
    <div class="hero__aurora" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="container hero__grid">
      <div class="hero__copy reveal is-visible">
        <nav aria-label="Migas de pan"><ol class="breadcrumb"><li><a href="/">Inicio</a></li><li aria-current="page">${service.name}</li></ol></nav>
        <span class="eyebrow">${service.heroTag}</span>
        <h1>${service.heroTitle}</h1>
        <p class="hero__lead">${service.heroLead}</p>
        <div class="hero__actions">
          <a class="button button--gold" href="#contacto" data-event="cta_primary" data-service="${service.slug}">${icon('arrow-right')} ${service.primary}</a>
          <a class="button button--ghost" href="${whatsapp(waMessage)}" target="_blank" rel="noopener" data-event="whatsapp_click" data-service="${service.slug}">${icon('whatsapp')} ${service.secondary}</a>
        </div>
        <ul class="trust-strip">
          <li>${icon('check2-circle')} Alcance definido</li>
          <li>${icon('check2-circle')} Acompañamiento profesional</li>
          <li>${icon('check2-circle')} Información confidencial</li>
        </ul>
      </div>
      <div class="service-visual reveal is-visible" data-tilt-surface>
        <img src="${service.image}"${responsiveCardImageAttributes(service.image, '(max-width: 900px) calc(100vw - 32px), 46vw')} width="1280" height="732" alt="${service.navName} con enfoque profesional y tecnológico" fetchpriority="high" decoding="async">
        <span class="service-visual__signal" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
        <div class="service-visual__caption"><strong>${service.navName}</strong><span>Solución especializada</span></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-heading">
        <div><span class="eyebrow">El problema</span><h2>${service.introTitle}</h2></div>
        <p>${service.introText}</p>
      </div>
      <div class="pain-grid">${cards(service.pains, 'pain-card')}</div>
    </div>
  </section>

  <section class="section section--light" id="soluciones">
    <div class="container">
      <div class="section-heading">
        <div><span class="eyebrow">Nuestra respuesta</span><h2>Servicios organizados alrededor de la necesidad, no del catálogo.</h2></div>
        <p>Cada alcance se define después de entender el contexto. Estos frentes pueden contratarse de forma independiente o coordinada.</p>
      </div>
      <div class="solution-grid">${solutionCards}</div>
      <div class="cta-actions cta-actions--spaced">
        <a class="button button--navy" href="#contacto" data-event="cta_after_solutions" data-service="${service.slug}">Solicitar una conversación inicial</a>
      </div>
    </div>
  </section>

  <section class="section" id="metodologia">
    <div class="container">
      <div class="section-heading">
        <div><span class="eyebrow">Metodología</span><h2>Un proceso visible desde el entendimiento hasta el seguimiento.</h2></div>
        <p>Las fases se ajustan al alcance; la lógica se mantiene: comprender, priorizar, ejecutar con evidencia y cerrar con próximos pasos claros.</p>
      </div>
      <div class="method-grid">${method}</div>
    </div>
  </section>

  <section class="section section--ink">
    <div class="container">
      <div class="section-heading">
        <div><span class="eyebrow">Resultados esperados</span><h2>Beneficios concretos, sin promesas absolutas.</h2></div>
        <p>El valor depende del punto de partida, el alcance y la participación de la organización. El objetivo es mejorar control, visibilidad y capacidad de acción.</p>
      </div>
      <div class="outcome-grid">${cards(service.outcomes, 'outcome-card')}</div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-heading">
        <div><span class="eyebrow">Para quién es</span><h2>Una experiencia pensada para quienes responden por decisiones y resultados.</h2></div>
        <p>Adaptamos el lenguaje y los entregables para que la información sea útil tanto en la operación como en los espacios de dirección.</p>
      </div>
      <div class="audience-grid">${cards(service.audiences, 'audience-card')}</div>
    </div>
  </section>

  ${useCases}

  ${service.slug === 'innovacion' ? domoProductBanner() : ''}

  <section class="section section--light" data-service="${service.slug}">
    <div class="container faq-layout">
      <div class="faq-layout__intro">
        <span class="eyebrow">Preguntas frecuentes</span>
        <h2>Antes de iniciar, conviene tener esto claro.</h2>
        <p>Si su caso requiere una respuesta específica, conversemos sobre el contexto.</p>
      </div>
      <div class="faq-list">${faq}</div>
    </div>
  </section>

  ${contactSection(service.slug, service.navName, service.formMessage, service.formMessage)}
</main>
${footer()}
${dock(service.slug, waMessage)}
</body>
</html>`;
}

function buildHome() {
  const serviceFeatures = services.map((service, index) => `
<article class="service-feature service-feature--${service.slug}">
  <div class="service-feature__copy reveal">
    <span class="service-feature__index">0${index + 1} · Línea prioritaria</span>
    <h3>${service.name}</h3>
    <p>${service.heroLead}</p>
    <p class="service-feature__problem">${service.introTitle}</p>
    <a class="text-link" href="/${service.slug}/" data-event="service_landing_click" data-service="${service.slug}">Explorar esta solución ${icon('arrow-right')}</a>
  </div>
  <a class="service-feature__visual reveal" href="/${service.slug}/" aria-label="Conocer ${service.navName}" data-tilt-surface>
    <img src="${service.image}"${responsiveCardImageAttributes(service.image, '(max-width: 900px) calc(100vw - 32px), 48vw')} width="1280" height="732" alt="" loading="lazy" decoding="async">
    <span class="service-feature__tag">${icon(index === 0 ? 'shield-check' : index === 1 ? 'buildings' : 'cpu')} ${service.heroTag}</span>
  </a>
</article>`).join('');

  const blogCards = [
    ['Auditoría', '2026-01-22', '22 Ene 2026', '/assets/img/blog/blog-details-auditoria-4.webp', 'Auditoría interna continua: preparación y enfoque práctico', '/blog/blog-details-auditoria-4.html'],
    ['Propiedad Horizontal', '2026-01-22', '22 Ene 2026', '/assets/img/blog/blog-details-propiedad-horizontal-4.webp', 'Presupuesto y fondo de imprevistos: planificación sin sobresaltos', '/blog/blog-details-propiedad-horizontal-4.html'],
    ['Innovación', '2026-01-22', '22 Ene 2026', '/assets/img/blog/blog-details-innovacion-4.webp', 'Automatización de procesos con RPA: eficiencia real para su empresa', '/blog/blog-details-innovacion-4.html'],
  ].map(([category, date, dateLabel, image, title, href]) => `
<article class="insight-card reveal">
  <a class="insight-card__media" href="${href}" aria-label="Leer: ${title}"><img src="${image}"${responsiveImageAttributes(image, '(max-width: 680px) calc(100vw - 32px), (max-width: 1100px) 48vw, 32vw')} width="640" height="366" alt="" loading="lazy" decoding="async"></a>
  <div class="insight-card__body">
    <div class="insight-card__meta"><span>${category}</span><time datetime="${date}">${dateLabel}</time></div>
    <h3><a href="${href}">${title}</a></h3>
    <a class="text-link" href="${href}">Leer análisis ${icon('arrow-right')}</a>
  </div>
</article>`).join('');

  const homeDescription = 'Palacios Asesores & Revisores integra auditoría, propiedad horizontal, automatización, inteligencia artificial y analítica para mejorar control y decisiones.';
  return `<!DOCTYPE html>
<html lang="es-CO">
${head({
    title: 'Palacios Asesores & Revisores | Auditoría, Gestión y Tecnología',
    description: homeDescription,
    canonical: '/',
    image: '/assets/img/services/innovacion-hero.webp',
    schema: [organizationSchema],
  })}
<body data-page="home">
${header('home')}
<div class="page-progress" aria-hidden="true"><span data-scroll-progress></span></div>
<main id="contenido">
  <section class="hero" id="inicio" data-spotlight>
    <div class="hero__aurora" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="container hero__grid">
      <div class="hero__copy reveal is-visible">
        <span class="eyebrow">Auditoría · Gestión · Inteligencia digital</span>
        <h1>Controlamos la complejidad. <em>Aceleramos el futuro.</em></h1>
        <p class="hero__lead">Integramos auditoría, propiedad horizontal, automatización e inteligencia de datos para convertir operaciones complejas en decisiones claras, trazables y más rápidas.</p>
        <div class="hero__actions">
          <a class="button button--gold" href="#contacto" data-event="cta_primary" data-service="home">${icon('arrow-right')} Solicitar asesoría</a>
          <a class="button button--ghost" href="#soluciones" data-event="services_intent" data-service="home">Conocer nuestros servicios</a>
        </div>
        <ul class="trust-strip">
          <li>${icon('check2-circle')} Equipo multidisciplinario</li>
          <li>${icon('check2-circle')} Enfoque basado en riesgos</li>
          <li>${icon('check2-circle')} Tecnología aplicada</li>
        </ul>
      </div>
      <div class="decision-canvas reveal is-visible" role="img" aria-label="Representación conceptual del flujo de trabajo de Palacios" data-tilt-surface>
        <div class="decision-canvas__top"><span>Palacios Intelligence System</span><span class="status-dot">Sistema activo</span></div>
        <div class="decision-flow">
          <div class="flow-node" data-signal="risk"><span class="flow-node__icon">${icon('radar')}</span><span><strong>Riesgo visible</strong><small>Diagnóstico y priorización</small></span><span class="flow-node__state">Evaluar</span></div>
          <div class="flow-node" data-signal="control"><span class="flow-node__icon">${icon('shield-check')}</span><span><strong>Control trazable</strong><small>Evidencia y responsables</small></span><span class="flow-node__state">Proteger</span></div>
          <div class="flow-node" data-signal="process"><span class="flow-node__icon">${icon('diagram-3')}</span><span><strong>Proceso conectado</strong><small>Gestión y automatización</small></span><span class="flow-node__state">Optimizar</span></div>
          <div class="flow-node" data-signal="decision"><span class="flow-node__icon">${icon('bar-chart-line')}</span><span><strong>Decisión informada</strong><small>Datos e indicadores útiles</small></span><span class="flow-node__state">Decidir</span></div>
        </div>
        <div class="decision-canvas__telemetry" aria-hidden="true"><span><i></i>Diagnóstico</span><span><i></i>Evidencia</span><span><i></i>Acción</span><b><i></i><i></i><i></i><i></i><i></i><i></i><i></i></b></div>
        <div class="canvas-note">${icon('info-circle')} Un sistema de trabajo que conecta criterio profesional, gestión y tecnología.</div>
      </div>
    </div>
  </section>

  <div class="signal-rail" aria-label="Capacidades de Palacios">
    <div class="signal-rail__track">
      ${['Auditoría estratégica', 'Control en tiempo real', 'Propiedad horizontal', 'Automatización', 'Inteligencia artificial', 'Analítica de datos', 'Cumplimiento', 'DOMO'].concat(['Auditoría estratégica', 'Control en tiempo real', 'Propiedad horizontal', 'Automatización', 'Inteligencia artificial', 'Analítica de datos', 'Cumplimiento', 'DOMO']).map((label) => `<span>${label}<i aria-hidden="true"></i></span>`).join('')}
    </div>
  </div>

  <section class="section" id="firma">
    <div class="container">
      <div class="section-heading">
        <div><span class="eyebrow">Una sola firma</span><h2>Rigor profesional. Mentalidad de producto.</h2></div>
        <p>Palacios Asesores &amp; Revisores se involucra como aliado estratégico para comprender la necesidad, organizar la respuesta y acompañar su implementación.</p>
      </div>
      <div class="positioning-grid">
        <article class="positioning-card reveal">
          <span class="positioning-card__number">01</span>
          <h3>Control y confianza para decisiones que no pueden depender de suposiciones.</h3>
          <p>Auditoría, revisoría fiscal, control interno y gestión de riesgos con evidencia, claridad y criterio profesional.</p>
          <span class="positioning-card__mark" aria-hidden="true"></span>
        </article>
        <article class="positioning-card reveal" data-delay="1">
          <span class="positioning-card__number">02</span>
          <h3>Gestión especializada.</h3>
          <p>Propiedad horizontal, contabilidad, avalúos, gestión documental y cumplimiento conectados con la operación real.</p>
        </article>
        <article class="positioning-card reveal" data-delay="2">
          <span class="positioning-card__number">03</span>
          <h3>Tecnología útil.</h3>
          <p>Automatización, analítica, inteligencia artificial y desarrollo a medida enfocados en problemas concretos.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section section--light" id="soluciones">
    <div class="container">
      <div class="section-heading">
        <div><span class="eyebrow">Líneas prioritarias</span><h2>Tres recorridos comerciales. Una misma promesa de claridad.</h2></div>
        <p>No todos los servicios tienen el mismo peso. Estas tres líneas concentran los retos donde la firma integra mejor conocimiento, gestión y tecnología.</p>
      </div>
      ${serviceFeatures}
    </div>
  </section>

  <section class="section section--ink">
    <div class="container">
      <div class="section-heading">
        <div><span class="eyebrow">Problemas que resolvemos</span><h2>La fricción casi siempre deja señales antes de convertirse en crisis.</h2></div>
        <p>Ayudamos a convertir señales dispersas en asuntos priorizados, decisiones y acciones con seguimiento.</p>
      </div>
      <div class="problem-cloud">
        ${[
          ['shield-exclamation', 'Riesgos no identificados'],
          ['arrow-repeat', 'Procesos manuales'],
          ['eye-slash', 'Falta de control'],
          ['files', 'Información dispersa'],
          ['exclamation-diamond', 'Incumplimiento normativo'],
          ['graph-down', 'Debilidades financieras'],
          ['question-diamond', 'Decisiones sin datos'],
          ['gear', 'Gestión ineficiente'],
        ].map(([iconName, label]) => `<div class="problem-chip reveal">${icon(iconName)}<span>${label}</span></div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section" id="metodo">
    <div class="container">
      <div class="section-heading">
        <div><span class="eyebrow">Cómo trabajamos</span><h2>Del contexto a una solución que puede ejecutarse y medirse.</h2></div>
        <p>El proceso se adapta al servicio, manteniendo conversaciones claras, responsables visibles y entregables definidos.</p>
      </div>
      <div class="process-line">
        ${[
          ['Escuchamos', 'Entendemos el reto y a quién afecta.'],
          ['Diagnosticamos', 'Revisamos información, riesgos y restricciones.'],
          ['Diseñamos', 'Definimos alcance, prioridades y entregables.'],
          ['Implementamos', 'Ejecutamos con evidencia y coordinación.'],
          ['Acompañamos', 'Aclaramos, transferimos y hacemos seguimiento.'],
          ['Medimos', 'Revisamos avances y oportunidades de mejora.'],
        ].map(([title, text]) => `<article class="process-step reveal"><h3>${title}</h3><p>${text}</p></article>`).join('')}
      </div>
    </div>
  </section>

  <section class="section section--ink" id="equipo">
    <div class="container credibility-grid">
      <div class="credibility-intro reveal">
        <span class="eyebrow">Credibilidad</span>
        <h2>Especialidades que conversan entre sí.</h2>
        <p>La firma reúne conocimiento de auditoría, procesos administrativos, propiedad horizontal, tecnología, datos, avalúos, riesgos LA/FT y gestión documental.</p>
        <p>No publicamos cifras, certificaciones ni testimonios que no estén respaldados. La confianza comienza por comunicar con precisión.</p>
      </div>
      <div class="role-grid">
        <article class="role-card reveal">${icon('briefcase')}<h3>Dirección General</h3><p>Auditoría, control financiero, revisoría fiscal y visión ética de la firma.</p></article>
        <article class="role-card reveal" data-delay="1">${icon('diagram-3')}<h3>Dirección de Operaciones</h3><p>Procesos administrativos, propiedad horizontal, calidad y acompañamiento.</p></article>
        <article class="role-card reveal" data-delay="2">${icon('cpu')}<h3>Innovación y Tecnología</h3><p>Automatización, software a medida, analítica y transformación digital.</p></article>
        <article class="role-card reveal" data-delay="3">${icon('people')}<h3>Equipo Multidisciplinario</h3><p>Avalúos, riesgos LA/FT, gestión documental y capacidades complementarias.</p></article>
      </div>
    </div>
  </section>

  <section class="section client-logos" id="experiencia">
    <div class="container">
      <div class="section-heading section-heading--compact">
        <div><span class="eyebrow">Experiencia compartida</span><h2>Organizaciones con las que hemos trabajado.</h2></div>
        <p>La relación y el alcance han variado según las necesidades de cada organización.</p>
      </div>
      <div class="client-logo-grid" aria-label="Organizaciones con las que Palacios ha trabajado">
        ${[
          ['bosques-verdehorizonte.webp', 'Bosques de Verdehorizonte'],
          ['oskr-barber.webp', 'OSKR Barber'],
          ['el-rustico.webp', 'El Rústico Parrilla-Bar'],
          ['hospital-santa-margarita.webp', 'Hospital Santa Margarita La Cumbre'],
          ['luis-enrique-roldan-cs.webp', 'Luis Enrique Roldán CS'],
          ['proyectos-ingenieria-colombiana.webp', 'Proyectos de Ingeniería Colombiana S.A.S.'],
          ['yilop-colombia.webp', 'Yilop de Colombia'],
          ['monos.webp', 'Monos'],
        ].map(([file, name], index) => `<div class="client-logo-card reveal" data-delay="${index % 4}"><img src="/assets/img/clientes/${file}" width="600" height="300" alt="${name}" loading="lazy" decoding="async"></div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section section--light" id="capacidades">
    <div class="container innovation-stage">
      <div class="reveal">
        <span class="eyebrow">Innovación visible</span>
        <h2>La tecnología no es un discurso. Es una forma de diseñar el trabajo.</h2>
        <p>Conectamos procesos, datos, controles y herramientas digitales para que la operación sea más trazable y la información llegue a tiempo.</p>
        <div class="capability-links">
          <a href="/analitica-datos/">Analítica de datos</a>
          <a href="/gestion-documental/">Gestión documental</a>
          <a href="/avaluos/">Avalúos</a>
          <a href="/sagrilaft/">SAGRILAFT</a>
          <a href="/servicios-complementarios/">Servicios complementarios</a>
        </div>
        <a class="domo-entry" href="/domo/" data-event="product_landing_click" data-service="domo">
          <img src="/domo/domo-logo-240.webp" width="240" height="158" alt="DOMO" loading="lazy" decoding="async">
          <span><small>Producto de Palacios</small><strong>Conocer DOMO</strong><span>Plataforma modular para proyectos, datos, tareas y procesos a medida.</span></span>
          ${icon('arrow-right')}
        </a>
      </div>
      <div class="tech-map reveal">
        <div class="tech-map__bar"><span>Arquitectura conceptual</span><span>Proceso → decisión</span></div>
        <div class="tech-map__grid">
          <div class="tech-module">${icon('arrow-repeat')}<strong>Automatización</strong></div>
          <div class="tech-module">${icon('stars')}<strong>IA aplicada</strong></div>
          <div class="tech-module">${icon('bar-chart-line')}<strong>Analítica</strong></div>
          <div class="tech-module">${icon('window-stack')}<strong>Soluciones a medida</strong></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="insights">
    <div class="container">
      <div class="section-heading">
        <div><span class="eyebrow">Conocimiento</span><h2>Ideas prácticas para dirigir con más contexto.</h2></div>
        <p>Contenido sobre auditoría, propiedad horizontal, riesgos, automatización y datos conectado con las soluciones de la firma.</p>
      </div>
      <div class="insight-grid">${blogCards}</div>
      <div class="cta-actions cta-actions--spaced"><a class="button button--outline" href="/blog/blog.html">Ver todos los análisis</a></div>
    </div>
  </section>

  ${contactSection('home', 'Asesoría general', 'Conversemos sobre los retos de su organización.', 'Quiero contarles el reto de mi organización y explorar una posible solución.')}
</main>
${footer()}
${dock('home', 'Hola, quiero solicitar una asesoría con Palacios Asesores & Revisores.')}
</body>
</html>`;
}

const blogPosts = [
  ['auditoria', 'Auditoría', '2026-01-22', '22 Ene 2026', 'blog-details-auditoria-4.html', 'blog-details-auditoria-4.webp', 'Auditoría interna continua: preparación y enfoque práctico'],
  ['auditoria', 'Auditoría', '2026-01-22', '22 Ene 2026', 'blog-details-auditoria-5.html', 'blog-details-auditoria-5.webp', 'Indicadores clave para detectar fraude y mejorar el control'],
  ['propiedad-horizontal', 'Propiedad Horizontal', '2026-01-22', '22 Ene 2026', 'blog-details-propiedad-horizontal-4.html', 'blog-details-propiedad-horizontal-4.webp', 'Presupuesto y fondo de imprevistos: planificación sin sobresaltos'],
  ['propiedad-horizontal', 'Propiedad Horizontal', '2026-01-22', '22 Ene 2026', 'blog-details-propiedad-horizontal-5.html', 'blog-details-propiedad-horizontal-5.webp', 'Mantenimiento preventivo en copropiedades: ahorro y seguridad'],
  ['innovacion', 'Innovación', '2026-01-22', '22 Ene 2026', 'blog-details-innovacion-4.html', 'blog-details-innovacion-4.webp', 'Automatización de procesos con RPA: eficiencia real para su empresa'],
  ['innovacion', 'Innovación', '2026-01-22', '22 Ene 2026', 'blog-details-innovacion-5.html', 'blog-details-innovacion-5.webp', 'Analítica predictiva: anticipe riesgos y oportunidades'],
  ['complementarios', 'Complementarios', '2026-01-22', '22 Ene 2026', 'blog-details-complementarios-4.html', 'blog-details-complementarios-4.webp', 'Debida diligencia de proveedores: buenas prácticas para contratar con confianza'],
  ['complementarios', 'Complementarios', '2026-01-22', '22 Ene 2026', 'blog-details-complementarios-5.html', 'blog-details-complementarios-5.webp', 'Gestión de actas y archivos: orden y trazabilidad para su organización'],
  ['auditoria', 'Auditoría', '2025-11-02', '2 Nov 2025', 'blog-details-auditoria.html', 'blog-details-auditoria.webp', 'Importancia del Control Interno en las Empresas'],
  ['auditoria', 'Auditoría', '2025-11-02', '2 Nov 2025', 'blog-details-auditoria-2.html', 'blog-details-auditoria-2.webp', 'Auditoría Externa: más allá del cumplimiento'],
  ['auditoria', 'Auditoría', '2025-11-02', '2 Nov 2025', 'blog-details-auditoria-3.html', 'blog-details-auditoria-3.webp', 'Gestión de Riesgos en Auditoría'],
  ['propiedad-horizontal', 'Propiedad Horizontal', '2025-11-02', '2 Nov 2025', 'blog-details-propiedad-horizontal.html', 'blog-details-propiedad-horizontal.webp', 'Funciones del Consejo de Administración'],
  ['propiedad-horizontal', 'Propiedad Horizontal', '2025-11-02', '2 Nov 2025', 'blog-details-propiedad-horizontal-2.html', 'blog-details-propiedad-horizontal-2.webp', 'Administración eficiente en propiedad horizontal'],
  ['propiedad-horizontal', 'Propiedad Horizontal', '2025-11-02', '2 Nov 2025', 'blog-details-propiedad-horizontal-3.html', 'blog-details-propiedad-horizontal-3.webp', 'Aspectos legales clave en la propiedad horizontal'],
  ['innovacion', 'Innovación', '2025-11-02', '2 Nov 2025', 'blog-details-innovacion.html', 'blog-details-innovacion.webp', 'Beneficios del análisis de datos para Pymes'],
  ['innovacion', 'Innovación', '2025-11-02', '2 Nov 2025', 'blog-details-innovacion-2.html', 'blog-details-innovacion-2.webp', 'Inteligencia Artificial para Pymes'],
  ['innovacion', 'Innovación', '2025-11-02', '2 Nov 2025', 'blog-details-innovacion-3.html', 'blog-details-innovacion-3.webp', 'Ciberseguridad para empresas'],
  ['complementarios', 'Complementarios', '2025-11-02', '2 Nov 2025', 'blog-details-complementarios.html', 'blog-details-complementarios.webp', 'Prevención de lavado de activos y financiación del terrorismo'],
  ['complementarios', 'Complementarios', '2025-11-02', '2 Nov 2025', 'blog-details-complementarios-2.html', 'blog-details-complementarios-2.webp', 'Avalúos inmobiliarios: determinando el valor real'],
  ['complementarios', 'Complementarios', '2025-11-02', '2 Nov 2025', 'blog-details-complementarios-3.html', 'blog-details-complementarios-3.webp', 'Gestión documental: organice y proteja la información'],
];

function buildBlog() {
  const cardsHtml = blogPosts.map(([category, categoryLabel, date, dateLabel, href, image, title]) => `
<article class="insight-card reveal" data-blog-card data-category="${category}">
  <a class="insight-card__media" href="/blog/${href}" aria-label="Leer: ${title}"><img src="/assets/img/blog/${image}"${responsiveImageAttributes(`/assets/img/blog/${image}`, '(max-width: 680px) calc(100vw - 32px), (max-width: 1100px) 48vw, 32vw')} width="640" height="366" alt="" loading="lazy" decoding="async"></a>
  <div class="insight-card__body">
    <div class="insight-card__meta"><span>${categoryLabel}</span><time datetime="${date}">${dateLabel}</time></div>
    <h2><a href="/blog/${href}">${title}</a></h2>
    <a class="text-link" href="/blog/${href}">Leer análisis ${icon('arrow-right')}</a>
  </div>
</article>`).join('');

  return `<!DOCTYPE html>
<html lang="es-CO">
${head({
    title: 'Blog sobre Auditoría, Propiedad Horizontal e Innovación | Palacios',
    description: 'Análisis prácticos sobre auditoría, control interno, propiedad horizontal, riesgos, automatización, inteligencia artificial y datos.',
    canonical: '/blog/blog.html',
    image: '/assets/img/blog/blog-hero-2.webp',
  })}
<body data-page="blog">
${header('blog', true)}
<div class="page-progress" aria-hidden="true"><span data-scroll-progress></span></div>
<main id="contenido">
  <section class="page-hero">
    <div class="container">
      <span class="eyebrow">Ideas para decidir mejor</span>
      <h1>Conocimiento aplicable, sin ruido innecesario.</h1>
      <p>Análisis sobre control, gestión y tecnología para entender riesgos, reconocer oportunidades y preparar mejores conversaciones.</p>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="filter-bar">
        <div class="filter-group" role="group" aria-label="Filtrar artículos">
          <button class="filter-button is-active" type="button" data-blog-filter="all" aria-pressed="true">Todos</button>
          <button class="filter-button" type="button" data-blog-filter="auditoria" aria-pressed="false">Auditoría</button>
          <button class="filter-button" type="button" data-blog-filter="propiedad-horizontal" aria-pressed="false">Propiedad Horizontal</button>
          <button class="filter-button" type="button" data-blog-filter="innovacion" aria-pressed="false">Innovación</button>
          <button class="filter-button" type="button" data-blog-filter="complementarios" aria-pressed="false">Complementarios</button>
        </div>
        <label class="search-field"><span class="sr-only">Buscar artículos</span>${icon('search')}<input type="search" placeholder="Buscar por tema..." data-blog-search></label>
      </div>
      <div class="blog-grid" data-blog-grid>${cardsHtml}</div>
      <div class="blog-empty" data-blog-empty><h2>No encontramos artículos</h2><p>Pruebe con otra palabra o cambie la categoría.</p></div>
    </div>
  </section>
  <section class="section section--ink">
    <div class="container section-heading section-heading--flush">
      <div><span class="eyebrow">Del contenido a la acción</span><h2>¿Quiere revisar un reto de su organización?</h2></div>
      <div class="cta-actions"><a class="button button--gold" href="/#contacto">Solicitar asesoría</a></div>
    </div>
  </section>
</main>
${footer()}
${dock('blog', 'Hola, leí un artículo del blog y quiero solicitar una asesoría.')}
</body>
</html>`;
}

function decodeHtml(value) {
  return String(value)
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function articleService(category) {
  const servicesByCategory = {
    auditoria: ['/auditoria/', 'Auditoría'],
    'propiedad-horizontal': ['/propiedad-horizontal/', 'Propiedad Horizontal'],
    innovacion: ['/innovacion/', 'Innovación y Tecnología'],
    complementarios: ['/#capacidades', 'Capacidades complementarias'],
  };
  return servicesByCategory[category] || ['/#soluciones', 'Servicios'];
}

function extractArticle(post) {
  const [category, categoryLabel, date, dateLabel, filename, image, title] = post;
  const source = fs.readFileSync(path.join(root, 'blog', filename), 'utf8');
  const legacyBody = source.match(/<div class="content">([\s\S]*?)<\/div>\s*<!-- End post content -->/i);
  const premiumBody = source.match(/<div class="article-prose">([\s\S]*?)<\/div>\s*<\/article>/i);
  const bodyMatch = premiumBody || legacyBody;
  if (!bodyMatch) throw new Error(`No fue posible extraer el contenido de blog/${filename}.`);

  let body = bodyMatch[1]
    .replace(/<!--([\s\S]*?)-->/g, '')
    .replace(/\sclass="[^"]*"/g, '')
    .replace(/<h3\b/g, '<h2')
    .replace(/<\/h3>/g, '</h2>')
    .trim();
  const legacyLead = source.match(/<h2 class="title">([\s\S]*?)<\/h2>/i);
  if (legacyBody && legacyLead) body = `<h2>${legacyLead[1].trim()}</h2>\n${body}`;

  const descriptionMatch = source.match(/<meta name="description" content="([^"]+)"/i);
  const altMatch = source.match(/<div class="post-img">[\s\S]*?<img[^>]+alt="([^"]*)"/i)
    || source.match(/<figure class="article-cover">[\s\S]*?<img[^>]+alt="([^"]*)"/i);
  const wordCount = body.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;

  return {
    body,
    category,
    categoryLabel,
    date,
    dateLabel,
    description: decodeHtml(descriptionMatch?.[1] || `Análisis de Palacios Asesores & Revisores sobre ${title}.`),
    filename,
    image,
    imageAlt: decodeHtml(altMatch?.[1] || `Imagen relacionada con ${title}`),
    readingMinutes: Math.max(3, Math.ceil(wordCount / 200)),
    title,
  };
}

function buildArticle(post) {
  const article = extractArticle(post);
  const [serviceUrl, serviceLabel] = articleService(article.category);
  const related = blogPosts
    .filter((candidate) => candidate[0] === article.category && candidate[4] !== article.filename)
    .slice(0, 2)
    .map((candidate) => `
<article class="insight-card reveal">
  <a class="insight-card__media" href="/blog/${candidate[4]}" aria-label="Leer: ${candidate[6]}"><img src="/assets/img/blog/${candidate[5]}"${responsiveImageAttributes(`/assets/img/blog/${candidate[5]}`, '(max-width: 680px) calc(100vw - 32px), 34vw')} width="1280" height="732" alt="" loading="lazy" decoding="async"></a>
  <div class="insight-card__body">
    <div class="insight-card__meta"><span>${candidate[1]}</span><time datetime="${candidate[2]}">${candidate[3]}</time></div>
    <h3><a href="/blog/${candidate[4]}">${candidate[6]}</a></h3>
    <a class="text-link" href="/blog/${candidate[4]}">Leer análisis ${icon('arrow-right')}</a>
  </div>
</article>`).join('');
  const canonical = `/blog/${article.filename}`;
  const image = `/assets/img/blog/${article.image}`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: `${domain}${image}`,
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: `${domain}${canonical}`,
    author: { '@type': 'Organization', name: 'Palacios Asesores & Revisores', url: domain },
    publisher: { '@id': `${domain}/#organization` },
  };

  return `<!DOCTYPE html>
<html lang="es-CO">
${head({
    title: `${article.title} | Palacios Asesores`,
    description: article.description,
    canonical,
    image,
    type: 'article',
    schema: [organizationSchema, articleSchema],
  })}
<body data-page="article">
${header('blog', true)}
<div class="page-progress" aria-hidden="true"><span data-scroll-progress></span></div>
<main id="contenido">
  <section class="page-hero article-hero">
    <div class="container">
      <nav aria-label="Migas de pan"><ol class="breadcrumb"><li><a href="/">Inicio</a></li><li><a href="/blog/blog.html">Blog</a></li><li aria-current="page">${article.categoryLabel}</li></ol></nav>
      <div class="article-hero__meta"><span>${article.categoryLabel}</span><time datetime="${article.date}">${article.dateLabel}</time><span>${article.readingMinutes} min de lectura</span></div>
      <h1>${article.title}</h1>
      <p>${article.description}</p>
    </div>
  </section>

  <section class="section article-section">
    <div class="container">
      <figure class="article-cover reveal is-visible"><img src="${image}"${responsiveImageAttributes(image, '(max-width: 900px) calc(100vw - 32px), 1180px')} width="1280" height="732" alt="${escapeHtml(article.imageAlt)}" fetchpriority="high" decoding="async"></figure>
      <div class="article-layout">
        <article class="article-content">
          <div class="article-prose">${article.body}</div>
        </article>
        <aside class="article-aside" aria-label="Información del artículo">
          <div class="article-aside__card">
            <span class="eyebrow">Aplicación práctica</span>
            <h2>Conecte este análisis con una necesidad concreta.</h2>
            <p>Podemos revisar el contexto, alcance y prioridad de su organización.</p>
            <a class="button button--navy" href="${serviceUrl}" data-event="blog_service_click" data-service="${article.category}">Conocer ${serviceLabel}</a>
          </div>
          <a class="text-link" href="/blog/blog.html">${icon('arrow-left')} Volver a todos los análisis</a>
        </aside>
      </div>
    </div>
  </section>

  ${related ? `<section class="section section--light"><div class="container"><div class="section-heading section-heading--single"><div><span class="eyebrow">Seguir explorando</span><h2>Otros análisis relacionados.</h2></div></div><div class="related-grid">${related}</div></div></section>` : ''}

  <section class="section section--ink">
    <div class="container section-heading section-heading--flush">
      <div><span class="eyebrow">Del análisis a la acción</span><h2>¿Quiere revisar este tema en su organización?</h2></div>
      <div class="cta-actions"><a class="button button--gold" href="${whatsapp(`Hola, leí el artículo “${article.title}” y quiero solicitar una asesoría.`)}" target="_blank" rel="noopener" data-event="whatsapp_click" data-service="${article.category}">${icon('whatsapp')} Conversar con el equipo</a></div>
    </div>
  </section>
</main>
${footer()}
${dock(article.category, `Hola, leí el artículo “${article.title}” y quiero solicitar una asesoría.`)}
</body>
</html>`;
}

function buildArticles() {
  blogPosts.forEach((post) => write(`blog/${post[4]}`, buildArticle(post)));
}

function build404() {
  return `<!DOCTYPE html>
<html lang="es-CO">
${head({
    title: 'Página no encontrada | Palacios Asesores & Revisores',
    description: 'La página solicitada no existe. Regrese al inicio o explore nuestras soluciones.',
    canonical: '/404.html',
  }).replace('<meta name="robots" content="index, follow, max-image-preview:large">', '<meta name="robots" content="noindex, follow">')}
<body data-page="404">
${header('home')}
<div class="page-progress" aria-hidden="true"><span data-scroll-progress></span></div>
<main id="contenido" class="error-page">
  <div class="container">
    <div class="error-page__code" aria-hidden="true">404</div>
    <h1>Esta ruta ya no está disponible.</h1>
    <p>Puede volver al inicio, explorar nuestras tres líneas principales o conversar directamente con el equipo.</p>
    <div class="hero__actions hero__actions--center">
      <a class="button button--gold" href="/">Volver al inicio</a>
      <a class="button button--ghost" href="/#soluciones">Explorar soluciones</a>
    </div>
  </div>
</main>
<script>
  (function(){
    function loadRuntime(){
      window.setTimeout(function(){
        var script = document.createElement('script');
        script.src = '/assets/js/palacios-2026.min.js';
        document.body.appendChild(script);
      }, 30);
    }
    if (document.readyState === 'complete') loadRuntime();
    else window.addEventListener('load', loadRuntime, { once: true });
  })();
</script>
</body>
</html>`;
}

function redirectPage(localTarget, canonicalTarget, label) {
  return `<!DOCTYPE html>
<html lang="es-CO">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Redireccionando a ${label} | Palacios</title>
  <meta name="robots" content="noindex, follow">
  <link rel="canonical" href="${domain}${canonicalTarget}">
  <meta http-equiv="refresh" content="0; url=${localTarget}">
  <script>window.location.replace('${localTarget}' + window.location.hash);</script>
</head>
<body><p>Esta página cambió. <a href="${localTarget}">Ir a ${label}</a>.</p></body>
</html>`;
}

function buildSitemap() {
  const urls = [
    ['/', '1.0'],
    ['/auditoria/', '0.9'],
    ['/propiedad-horizontal/', '0.9'],
    ['/innovacion/', '0.9'],
    ['/domo/', '0.9'],
    ['/analitica-datos/', '0.7'],
    ['/avaluos/', '0.7'],
    ['/gestion-documental/', '0.7'],
    ['/sagrilaft/', '0.7'],
    ['/servicios-complementarios/', '0.6'],
    ['/blog/blog.html', '0.8'],
    ...blogPosts.map((post) => [`/blog/${post[4]}`, '0.6']),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([url, priority]) => `  <url><loc>${domain}${url}</loc><lastmod>2026-09-09</lastmod><changefreq>monthly</changefreq><priority>${priority}</priority></url>`).join('\n')}
</urlset>`;
}

function buildCoreSite() {
  write('index.html', buildHome());
  services.forEach((service) => write(`${service.slug}/index.html`, buildLanding(service)));
  write('blog/blog.html', buildBlog());
  buildArticles();
  write('404.html', build404());
  write('revisoria-fiscal/index.html', redirectPage('../auditoria/index.html', '/auditoria/', 'Auditoría'));
  write('automatizacion-ia/index.html', redirectPage('../innovacion/index.html', '/innovacion/', 'Innovación y Tecnología'));
  write('service-details-auditoria.html', redirectPage('auditoria/index.html', '/auditoria/', 'Auditoría'));
  write('service-details-propiedad-horizontal.html', redirectPage('propiedad-horizontal/index.html', '/propiedad-horizontal/', 'Propiedad Horizontal'));
  write('service-details-innovacion.html', redirectPage('innovacion/index.html', '/innovacion/', 'Innovación y Tecnología'));
  write('service-details-complementarios.html', redirectPage('servicios-complementarios/index.html', '/servicios-complementarios/', 'Servicios Complementarios'));
  write('sitemap.xml', buildSitemap());
  console.log('Sitio generado: home, landings, blog, artículos, 404, redirecciones y sitemap.');
}

if (require.main === module) buildCoreSite();

module.exports = {
  contactSection,
  dock,
  domain,
  footer,
  head,
  header,
  icon,
  organizationSchema,
  responsiveCardImageAttributes,
  responsiveImageAttributes,
  whatsapp,
  write,
};
