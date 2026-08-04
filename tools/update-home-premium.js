const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '..', 'index.html');
let html = fs.readFileSync(file, 'utf8');

const services = [
  ['revisoria-fiscal/', 'Revisoría Fiscal y Auditoría', 'bi-journal-check', 'Control financiero, cumplimiento y evidencia para decidir.'],
  ['propiedad-horizontal/', 'Propiedad Horizontal', 'bi-building', 'Gestión contable, normativa y operativa para copropiedades.'],
  ['automatizacion-ia/', 'Automatización e IA', 'bi-cpu', 'Procesos automatizados, IA aplicada y menos trabajo manual.'],
  ['analitica-datos/', 'Analítica de Datos', 'bi-bar-chart-line', 'KPIs, tableros y alertas para decisiones con evidencia.'],
  ['avaluos/', 'Avalúos', 'bi-house-check', 'Valor técnico para activos, inmuebles y decisiones patrimoniales.'],
  ['gestion-documental/', 'Gestión Documental', 'bi-folder2-open', 'Archivos trazables, seguros y listos para auditoría.'],
  ['sagrilaft/', 'SAGRILAFT', 'bi-shield-lock', 'Debida diligencia, matrices de riesgo y cumplimiento LAFT/SAR.'],
  ['servicios-complementarios/', 'Servicios Complementarios', 'bi-grid-1x2', 'Soluciones integradas para necesidades puntuales.']
];

const navBlock = `        <ul>
          <li><a href="#hero" class="active">Inicio</a></li>
          <li><a href="#about">Nosotros</a></li>
          <li class="dropdown"><a href="#services"><span>Servicios</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
            <ul>
              ${services.map(([href, name]) => `<li><a href="${href}">${name}</a></li>`).join('\n              ')}
            </ul>
          </li>
          <li><a href="#team">Equipo</a></li>
          <li><a href="blog/blog.html">Blog</a></li>
          <li><a href="#call-to-action">Contacto</a></li>
        </ul>`;

html = html.replace(/        <ul>\s*<li><a href="#hero" class="active">Inicio<\/a><\/li>[\s\S]*?<\/ul>\s*<i class="mobile-nav-toggle/, `${navBlock}\n        <i class="mobile-nav-toggle`);

html = html.replace(
  /<section id="hero" class="hero section dark-background">[\s\S]*?<\/section><!-- \/Hero Section -->/,
  `<section id="hero" class="future-hero home-future-hero">
      <div class="hero-mesh" aria-hidden="true"></div>
      <div class="container">
        <div class="row align-items-center gy-5">
          <div class="col-lg-7" data-aos="fade-up">
            <div class="future-eyebrow"><i class="bi bi-stars"></i> Consultoría, auditoría e innovación</div>
            <h1>Una firma moderna para controlar riesgos, automatizar procesos y decidir con datos</h1>
            <p>Palacios Asesores & Revisores integra auditoría, propiedad horizontal, tecnología, analítica y cumplimiento en una experiencia profesional diseñada para empresas que quieren operar con más claridad.</p>
            <div class="future-actions">
              <a href="https://wa.me/573151816494?text=Hola%2C%20quiero%20una%20asesor%C3%ADa%20con%20Palacios%20Asesores%20%26%20Revisores." target="_blank" class="future-btn primary" data-ga-event="whatsapp_click" data-ga-service="home"><i class="fab fa-whatsapp"></i> Agendar asesoría</a>
              <a href="#services" class="future-btn secondary" data-ga-event="services_intent" data-ga-service="home"><i class="bi bi-arrow-right"></i> Explorar servicios</a>
            </div>
            <div class="future-proof">
              <span>Auditoría + datos</span>
              <span>Cumplimiento trazable</span>
              <span>Automatización aplicada</span>
            </div>
          </div>
          <div class="col-lg-5" data-aos="zoom-in" data-aos-delay="120">
            <div class="intelligence-panel">
              <div class="panel-top"><span>Palacios Operating System</span><i class="bi bi-stars"></i></div>
              <img src="assets/img/hero-img.png" alt="Palacios Asesores & Revisores" loading="eager" fetchpriority="high">
              <div class="signal-card signal-one"><strong>360°</strong><span>Consultoría integral</span></div>
              <div class="signal-card signal-two"><strong>AI</strong><span>Innovación aplicada</span></div>
              <div class="panel-bottom">
                <div><span>Riesgo</span><strong>Visible</strong></div>
                <div><span>Gestión</span><strong>Medible</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section><!-- /Hero Section -->`
);

const servicesSection = `    <section id="services" class="future-section services-future light-background">

      <div class="container">
        <div class="future-section-head" data-aos="fade-up">
          <span>Landing pages por línea de negocio</span>
          <h2>Servicios diseñados para diagnosticar, convertir y resolver</h2>
        </div>
        <div class="problem-grid">
          ${services.map(([href, name, icon, text], index) => `<article class="future-card problem-card" data-aos="fade-up" data-aos-delay="${index * 50}"><div class="card-index"><i class="bi ${icon}"></i></div><h3><a href="${href}">${name}</a></h3><p>${text}</p></article>`).join('\n          ')}
        </div>
      </div>

    </section>`;

html = html.replace(/    <section id="services" class="services section light-background">[\s\S]*?<\/section>/, servicesSection);

html = html.replace(/auditoria-interna\/?/g, 'revisoria-fiscal/');

fs.writeFileSync(file, html, 'utf8');
