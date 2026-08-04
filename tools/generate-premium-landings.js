const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const phone = '573151816494';
const displayPhone = '+57 315 181 6494';
const email = 'contacto@grupopalaciosasesores.com';
const brand = 'Palacios Asesores & Revisores';
const baseUrl = 'https://grupopalaciosasesores.com';

const services = [
  {
    slug: 'revisoria-fiscal',
    nav: 'Revisoría Fiscal',
    title: 'Revisoría Fiscal y Auditoría',
    metaTitle: 'Revisoría Fiscal y Auditoría | Palacios Asesores',
    metaDescription: 'Revisoría fiscal, auditoría externa y control interno para empresas que necesitan cumplimiento, confianza financiera y decisiones seguras.',
    h1: 'Control financiero que anticipa riesgos antes de que se conviertan en sanciones',
    subtitle: 'Revisoría fiscal y auditoría moderna para empresas que necesitan evidencia, trazabilidad y criterio técnico para decidir con confianza.',
    image: '../assets/img/services/Auditoria.webp',
    icon: 'bi-journal-check',
    accent: 'Cumplimiento inteligente',
    metrics: ['Riesgos priorizados', 'Informes ejecutivos', 'Control interno'],
    problems: ['Estados financieros sin validación independiente.', 'Controles débiles que abren espacio a errores o fraude.', 'Sanciones por incumplimientos contables, tributarios o societarios.', 'Gerencia y socios sin información clara para decidir.'],
    solution: 'Combinamos revisión técnica, lectura de riesgos y recomendaciones ejecutables. No entregamos solo informes: convertimos hallazgos en decisiones accionables para gerencia, socios y órganos de control.',
    benefits: ['Más confianza sobre la información financiera.', 'Alertas tempranas sobre procesos críticos.', 'Evidencia documental para auditorías y asambleas.', 'Mejor control del cumplimiento normativo.'],
    useCases: ['Empresas obligadas a tener revisor fiscal.', 'Pymes en crecimiento.', 'Juntas directivas y socios.', 'Gerencias financieras y administrativas.'],
    faqs: [
      ['¿Qué hace un revisor fiscal?', 'Evalúa información financiera, cumplimiento legal, control interno y operaciones relevantes para emitir informes independientes y alertar sobre riesgos.'],
      ['¿La auditoría reemplaza la revisoría fiscal?', 'No siempre. La auditoría puede ser puntual; la revisoría fiscal suele implicar acompañamiento permanente y responsabilidades legales.'],
      ['¿Qué entregables recibe la empresa?', 'Informes, hallazgos documentados, recomendaciones, revisión de controles y acompañamiento para decisiones.'],
      ['¿También revisan inventarios y sistemas?', 'Sí. El alcance puede incluir auditoría financiera, inventarios, sistemas de información y controles internos.'],
      ['¿Trabajan con pymes?', 'Sí. El alcance se ajusta al tamaño, nivel de riesgo y etapa de madurez de cada empresa.'],
      ['¿Pueden apoyar antes de una asamblea?', 'Sí. Revisamos información clave y preparamos recomendaciones para presentar cifras con mayor claridad.'],
      ['¿Cómo inicia el servicio?', 'Con diagnóstico, revisión documental, definición de alcance y plan de trabajo.'],
      ['¿Qué diferencia aporta Palacios?', 'Unimos criterio técnico, comunicación clara, tecnología y enfoque práctico para que el cliente pueda actuar.']
    ]
  },
  {
    slug: 'propiedad-horizontal',
    nav: 'Propiedad Horizontal',
    title: 'Propiedad Horizontal',
    metaTitle: 'Propiedad Horizontal | Administración, Contabilidad y Cumplimiento',
    metaDescription: 'Administración, outsourcing contable y asesoría normativa para propiedad horizontal con información clara para consejos y asambleas.',
    h1: 'Copropiedades con control financiero, convivencia y decisiones sin improvisación',
    subtitle: 'Acompañamos administradores, consejos y copropietarios con gestión contable, normativa y operativa para proteger patrimonio y reducir conflictos.',
    image: '../assets/img/services/Propiedad Horizontal.webp',
    icon: 'bi-building',
    accent: 'Gobierno de copropiedades',
    metrics: ['Presupuesto claro', 'Consejo informado', 'Ley 675'],
    problems: ['Presupuestos difíciles de explicar ante la asamblea.', 'Informes contables poco claros o tardíos.', 'Contratos y proveedores sin seguimiento suficiente.', 'Conflictos por falta de trazabilidad en decisiones.'],
    solution: 'Integramos administración, contabilidad, soporte normativo y seguimiento operativo para que la copropiedad funcione con información clara y decisiones documentadas.',
    benefits: ['Mayor transparencia ante consejo y asamblea.', 'Control de cuotas, cartera y presupuesto.', 'Cumplimiento de la Ley 675 de 2001.', 'Menos conflictos por falta de información.'],
    useCases: ['Conjuntos residenciales.', 'Edificios comerciales.', 'Consejos de administración.', 'Administradores que requieren soporte técnico.'],
    faqs: [
      ['¿Qué servicios ofrecen para propiedad horizontal?', 'Administración integral, outsourcing contable, asesoría normativa, apoyo a consejos, presupuesto y control documental.'],
      ['¿Trabajan bajo la Ley 675 de 2001?', 'Sí. El acompañamiento considera la normatividad aplicable y las necesidades de cada copropiedad.'],
      ['¿Pueden apoyar al consejo de administración?', 'Sí. Ayudamos a revisar información, preparar decisiones y mejorar seguimiento de compromisos.'],
      ['¿Incluye informes contables?', 'Sí. El alcance puede incluir informes periódicos claros para administración, consejo y asamblea.'],
      ['¿Ayudan con presupuesto y fondo de imprevistos?', 'Sí. Revisamos planeación, ejecución, riesgos de sobrecostos y necesidades de mantenimiento.'],
      ['¿Pueden revisar proveedores?', 'Podemos apoyar con debida diligencia documental y controles de seguimiento.'],
      ['¿Atienden copropiedades pequeñas?', 'Sí. El alcance se ajusta al tamaño y complejidad.'],
      ['¿Cómo inicia el acompañamiento?', 'Con diagnóstico documental, revisión de presupuesto, necesidades del consejo y plan de trabajo.']
    ]
  },
  {
    slug: 'automatizacion-ia',
    nav: 'Automatización e IA',
    title: 'Automatización e IA',
    metaTitle: 'Automatización e Inteligencia Artificial para Empresas',
    metaDescription: 'Automatización de procesos, RPA e inteligencia artificial aplicada para reducir tareas repetitivas, errores y tiempos operativos.',
    h1: 'Automatiza lo repetitivo y convierte la operación en una ventaja competitiva',
    subtitle: 'Diseñamos flujos, bots, integraciones y soluciones de IA para que tu equipo deje de operar en manual y empiece a escalar con control.',
    image: '../assets/img/services/Innovacion.webp',
    icon: 'bi-cpu',
    accent: 'Operación aumentada',
    metrics: ['Menos reprocesos', 'IA aplicada', 'RPA a medida'],
    problems: ['Horas perdidas copiando datos entre sistemas.', 'Errores humanos en tareas repetitivas.', 'Reportes manuales que llegan tarde.', 'Procesos que no escalan cuando crece la operación.'],
    solution: 'Mapeamos procesos, priorizamos automatizaciones de alto retorno y desarrollamos soluciones con RPA, integraciones, analítica e IA aplicada según la realidad del negocio.',
    benefits: ['Ahorro de tiempo operativo.', 'Reducción de errores manuales.', 'Mayor trazabilidad de tareas.', 'Equipo enfocado en trabajo estratégico.'],
    useCases: ['Áreas contables y financieras.', 'Equipos administrativos.', 'Pymes con procesos repetitivos.', 'Gerentes que necesitan eficiencia sin aumentar nómina.'],
    faqs: [
      ['¿Qué procesos se pueden automatizar?', 'Reportes, conciliaciones, alertas, carga de datos, respuestas frecuentes, generación de documentos y seguimiento de tareas.'],
      ['¿Necesito comprar software costoso?', 'No siempre. Primero evaluamos herramientas existentes y luego definimos si conviene integrar, automatizar o desarrollar a medida.'],
      ['¿La IA reemplaza al equipo?', 'El objetivo es liberar tiempo y reducir tareas repetitivas, manteniendo el criterio profesional.'],
      ['¿Cómo calculan el retorno?', 'Estimamos horas ahorradas, errores reducidos, frecuencia del proceso y costo operativo actual.'],
      ['¿Pueden integrar Excel, correos o sistemas existentes?', 'Sí, según viabilidad técnica, permisos y estructura de datos.'],
      ['¿Qué tan rápido se implementa?', 'Automatizaciones simples pueden iniciar en semanas; proyectos complejos requieren fases.'],
      ['¿Incluye capacitación?', 'Sí. Entregamos documentación y transferencia al equipo.'],
      ['¿Es seguro usar IA con datos sensibles?', 'Se define arquitectura responsable, permisos, anonimización cuando aplique y control de acceso.']
    ]
  },
  {
    slug: 'analitica-datos',
    nav: 'Analítica de Datos',
    title: 'Analítica de Datos',
    metaTitle: 'Analítica de Datos y Tableros para Decisiones',
    metaDescription: 'Analítica de datos, tableros e indicadores para anticipar riesgos, controlar gestión y tomar decisiones con información confiable.',
    h1: 'Transforma datos dispersos en decisiones visibles, medibles y accionables',
    subtitle: 'Creamos tableros, indicadores y modelos de análisis para que gerencia vea lo importante sin depender de reportes manuales.',
    image: '../assets/img/blog/blog-details-innovacion-5.webp',
    icon: 'bi-bar-chart-line',
    accent: 'Decisiones con evidencia',
    metrics: ['KPIs vivos', 'Alertas tempranas', 'BI práctico'],
    problems: ['Reportes manuales que consumen horas.', 'Datos inconsistentes entre áreas.', 'Decisiones basadas en intuición.', 'Falta de alertas sobre cartera, gastos, ventas o riesgos.'],
    solution: 'Unificamos fuentes, definimos KPIs y construimos tableros ejecutivos para convertir datos operativos en información clara para decidir.',
    benefits: ['Indicadores confiables.', 'Menos tiempo preparando reportes.', 'Alertas tempranas sobre desviaciones.', 'Mejor seguimiento financiero y operativo.'],
    useCases: ['Gerentes generales.', 'Áreas financieras.', 'Administradores de copropiedades.', 'Equipos comerciales y operativos.'],
    faqs: [
      ['¿Qué es analítica de datos para empresas?', 'Es el uso estructurado de datos para medir desempeño, detectar patrones, anticipar riesgos y tomar mejores decisiones.'],
      ['¿Qué herramientas utilizan?', 'Depende del caso: hojas de cálculo, bases de datos, tableros BI o desarrollos a medida.'],
      ['¿Necesito tener datos perfectos?', 'No. Parte del proceso es diagnosticar calidad de datos y mejorar captura.'],
      ['¿Qué indicadores se pueden construir?', 'Financieros, cartera, presupuesto, ventas, cumplimiento, operación, proveedores, mantenimiento y riesgos.'],
      ['¿Sirve para propiedad horizontal?', 'Sí. Es útil para presupuesto, cartera, gastos, mantenimiento, proveedores y seguimiento de decisiones.'],
      ['¿Incluye automatización de reportes?', 'Sí. Podemos automatizar actualización y distribución según fuentes disponibles.'],
      ['¿Pueden capacitar al equipo?', 'Sí. Entregamos formación básica para lectura e interpretación.'],
      ['¿Cómo se inicia?', 'Con objetivos, fuentes de datos, KPIs prioritarios y prototipo de tablero.']
    ]
  },
  {
    slug: 'avaluos',
    nav: 'Avalúos',
    title: 'Avalúos',
    metaTitle: 'Avalúos de Activos e Inmuebles | Palacios Asesores',
    metaDescription: 'Avalúos de bienes muebles e inmuebles para decisiones patrimoniales, contables, comerciales y administrativas con soporte técnico.',
    h1: 'Decide sobre tus activos con valor técnico, no con suposiciones',
    subtitle: 'Avalúos con criterio profesional para comprar, vender, asegurar, registrar o analizar activos con mayor claridad patrimonial.',
    image: '../assets/img/services/Complementarios.webp',
    icon: 'bi-house-check',
    accent: 'Valor patrimonial',
    metrics: ['Soporte técnico', 'Activos claros', 'Decisión segura'],
    problems: ['Compra o venta sin valor técnico.', 'Activos registrados sin actualización razonable.', 'Diferencias entre valor contable, comercial y patrimonial.', 'Falta de soporte para negociaciones o seguros.'],
    solution: 'Determinamos valor de bienes muebles e inmuebles con análisis técnico, documentación, contexto del activo y objetivo del avalúo.',
    benefits: ['Mejor soporte para decisiones patrimoniales.', 'Información útil para negociar.', 'Control actualizado de activos.', 'Mayor claridad para procesos contables.'],
    useCases: ['Empresas con activos fijos.', 'Copropiedades con bienes comunes.', 'Propietarios que van a vender o asegurar.', 'Gerentes que requieren soporte patrimonial.'],
    faqs: [
      ['¿Qué tipos de avalúos realizan?', 'Avalúos de bienes inmuebles, muebles y activos fijos según alcance y documentación disponible.'],
      ['¿Para qué sirve un avalúo?', 'Sirve para compra, venta, seguros, registros, negociaciones o análisis patrimonial.'],
      ['¿Qué información se necesita?', 'Identificación del activo, ubicación, documentos, características, estado y objetivo.'],
      ['¿Un avalúo es igual al valor comercial?', 'El valor comercial puede ser uno de los enfoques; depende de objetivo, metodología y mercado.'],
      ['¿Atienden copropiedades?', 'Sí. Podemos apoyar valoración de bienes comunes o activos relevantes.'],
      ['¿El informe incluye soporte?', 'Sí. Contiene criterios, evidencias y conclusiones claras.'],
      ['¿Cuánto tarda un avalúo?', 'Depende del tipo de activo, ubicación, documentación y complejidad.'],
      ['¿Puedo solicitar cotización previa?', 'Sí. Recomendamos enviar tipo de activo y objetivo para estimar alcance.']
    ]
  },
  {
    slug: 'gestion-documental',
    nav: 'Gestión Documental',
    title: 'Gestión Documental',
    metaTitle: 'Gestión Documental Empresarial | Organización y Digitalización',
    metaDescription: 'Organización, digitalización y control documental para empresas y copropiedades que necesitan trazabilidad, seguridad y acceso eficiente.',
    h1: 'Convierte archivos dispersos en una arquitectura documental lista para auditoría',
    subtitle: 'Organizamos, digitalizamos y estructuramos información crítica para que responder a una auditoría, asamblea o decisión no dependa de la memoria de alguien.',
    image: '../assets/img/blog/blog-details-complementarios-3.webp',
    icon: 'bi-folder2-open',
    accent: 'Trazabilidad documental',
    metrics: ['Archivos vivos', 'Acceso rápido', 'Evidencia segura'],
    problems: ['Documentos dispersos o difíciles de encontrar.', 'Riesgo de pérdida de contratos, actas o soportes.', 'Auditorías lentas por falta de trazabilidad.', 'Dependencia de personas para ubicar información crítica.'],
    solution: 'Clasificamos, organizamos y digitalizamos información con criterios de acceso, seguridad y utilidad para auditoría, administración y operación.',
    benefits: ['Acceso rápido a información clave.', 'Mejor soporte ante auditorías o asambleas.', 'Menos riesgo de pérdida documental.', 'Procesos administrativos más ordenados.'],
    useCases: ['Empresas con archivos contractuales o contables.', 'Copropiedades con actas y soportes históricos.', 'Áreas administrativas.', 'Equipos que necesitan trazabilidad.'],
    faqs: [
      ['¿Qué es gestión documental?', 'Es organización, clasificación, conservación y control de documentos físicos o digitales.'],
      ['¿Incluye digitalización?', 'Sí, puede incluir digitalización, indexación y estructura de carpetas o repositorios.'],
      ['¿Qué documentos se priorizan?', 'Contratos, actas, soportes contables, documentos legales, proveedores y archivos críticos.'],
      ['¿Sirve para auditorías?', 'Sí. Reduce tiempos y mejora evidencia disponible.'],
      ['¿Pueden trabajar con archivos físicos?', 'Sí. Se puede diagnosticar, clasificar y definir digitalización.'],
      ['¿Cómo protegen la información?', 'Se definen permisos, criterios de acceso y buenas prácticas de seguridad.'],
      ['¿Entregan una estructura final?', 'Sí. Entregamos organización, criterios de clasificación y recomendaciones.'],
      ['¿Atienden propiedad horizontal?', 'Sí. Es útil para actas, contratos, presupuestos, proveedores y comunicaciones.']
    ]
  },
  {
    slug: 'sagrilaft',
    nav: 'SAGRILAFT',
    title: 'SAGRILAFT',
    metaTitle: 'SAGRILAFT, LAFT/SAR y Cumplimiento | Palacios Asesores',
    metaDescription: 'Prevención LAFT/SAR, debida diligencia, matrices de riesgo y acompañamiento en cumplimiento para proteger reputación y operación.',
    h1: 'Cumplimiento que protege la reputación antes de que el riesgo toque la puerta',
    subtitle: 'Diseñamos controles, matrices y procesos de debida diligencia para reducir exposición LAFT/SAR y fortalecer decisiones con terceros.',
    image: '../assets/img/blog/blog-details-complementarios.webp',
    icon: 'bi-shield-lock',
    accent: 'Riesgo reputacional',
    metrics: ['Debida diligencia', 'Matriz de riesgo', 'Evidencia auditada'],
    problems: ['Proveedores o clientes sin debida diligencia.', 'Controles LAFT/SAR informales o no documentados.', 'Riesgo reputacional por terceros.', 'Falta de evidencia ante requerimientos.'],
    solution: 'Implementamos o fortalecemos procesos de prevención, matrices, segmentación, señales de alerta y evidencia documental para cumplimiento.',
    benefits: ['Menor exposición a terceros riesgosos.', 'Evidencia ordenada de cumplimiento.', 'Mejor gestión reputacional.', 'Procesos claros para proveedores y clientes.'],
    useCases: ['Empresas obligadas o expuestas a cumplimiento.', 'Áreas administrativas y financieras.', 'Gerentes que contratan proveedores críticos.', 'Equipos que requieren debida diligencia.'],
    faqs: [
      ['¿Qué es SAGRILAFT?', 'Es un sistema de autocontrol y gestión del riesgo de lavado de activos, financiación del terrorismo y riesgos asociados.'],
      ['¿Qué es LAFT/SAR?', 'Se refiere a riesgos de lavado de activos, financiación del terrorismo y administración de riesgos asociados.'],
      ['¿Todas las empresas están obligadas?', 'No todas, pero muchas tienen exposición por clientes, proveedores o sector. Conviene evaluar obligación y riesgo.'],
      ['¿Qué es debida diligencia?', 'Es conocer y evaluar terceros antes y durante la relación comercial para reducir riesgos.'],
      ['¿Qué entregables incluye?', 'Matriz de riesgos, procedimientos, listas de chequeo, criterios de debida diligencia y recomendaciones.'],
      ['¿Pueden revisar proveedores?', 'Sí. Apoyamos evaluación documental, señales de alerta y trazabilidad.'],
      ['¿Sirve para auditorías?', 'Sí. La documentación organizada facilita evidencia ante revisiones.'],
      ['¿Cómo inicia el proceso?', 'Con diagnóstico de exposición, normativa aplicable, terceros relevantes y controles existentes.']
    ]
  },
  {
    slug: 'servicios-complementarios',
    nav: 'Complementarios',
    title: 'Servicios Complementarios',
    metaTitle: 'Servicios Complementarios Empresariales | Palacios Asesores',
    metaDescription: 'Servicios complementarios en avalúos, gestión documental, riesgos, tecnología y soporte profesional para empresas y copropiedades.',
    h1: 'Servicios especializados para cerrar brechas críticas sin perder foco estratégico',
    subtitle: 'Integramos capacidades de auditoría, gestión, tecnología y cumplimiento para resolver necesidades puntuales de empresas y copropiedades.',
    image: '../assets/img/cta/cta-1.webp',
    icon: 'bi-grid-1x2',
    accent: 'Soluciones integradas',
    metrics: ['Diagnóstico ágil', 'Soporte experto', 'Entrega clara'],
    problems: ['Necesidades puntuales fuera del servicio principal.', 'Falta de coordinación entre proveedores.', 'Procesos de soporte sin dueño claro.', 'Riesgos documentales, patrimoniales o tecnológicos sin atención.'],
    solution: 'Conectamos capacidades multidisciplinarias para resolver requerimientos específicos con alcance claro, evidencia y entregables útiles.',
    benefits: ['Un solo aliado para necesidades relacionadas.', 'Menos fricción de coordinación.', 'Soluciones ajustadas al contexto.', 'Acompañamiento profesional y trazable.'],
    useCases: ['Empresas que necesitan apoyo puntual.', 'Copropiedades con proyectos especiales.', 'Gerentes que requieren diagnóstico rápido.', 'Consejos que necesitan soporte técnico externo.'],
    faqs: [
      ['¿Qué incluyen los servicios complementarios?', 'Avalúos, gestión documental, riesgos LAFT/SAR, apoyo tecnológico, diagnósticos y acompañamientos especiales.'],
      ['¿Puedo contratar un servicio puntual?', 'Sí. Se puede definir alcance por proyecto, urgencia o necesidad específica.'],
      ['¿Sirven para empresas y copropiedades?', 'Sí. Adaptamos el enfoque al tipo de organización y objetivo.'],
      ['¿Cómo se define el alcance?', 'Con reunión inicial, revisión de necesidad y propuesta de entregables.'],
      ['¿Pueden trabajar junto con otro proveedor?', 'Sí, siempre que alcance y responsabilidades estén claros.'],
      ['¿Incluye informes?', 'Sí. Los servicios se documentan con entregables, recomendaciones o evidencia.'],
      ['¿Cuánto tarda un proyecto?', 'Depende de complejidad y disponibilidad de información.'],
      ['¿Cuál es el primer paso?', 'Solicitar una asesoría para entender necesidad, prioridad y riesgo.']
    ]
  }
];

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function message(service) {
  return encodeURIComponent(`Hola, quiero una asesoría sobre ${service.title}.`);
}

function nav(current) {
  return services.map((service) => `<li><a href="../${service.slug}/" class="${service.slug === current ? 'active' : ''}">${service.nav}</a></li>`).join('\n              ');
}

function schema(service) {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.metaDescription,
    provider: {
      '@type': 'ProfessionalService',
      name: brand,
      telephone: displayPhone,
      email,
      url: baseUrl
    },
    areaServed: 'Colombia',
    serviceType: service.title,
    url: `${baseUrl}/${service.slug}/`
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer }
    }))
  };
  return `<script type="application/ld+json">${JSON.stringify(serviceSchema)}</script>\n  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`;
}

function page(service) {
  const whatsapp = `https://wa.me/${phone}?text=${message(service)}`;
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <title>${esc(service.metaTitle)}</title>
  <meta name="description" content="${esc(service.metaDescription)}">
  <meta name="keywords" content="${esc([service.title, ...service.metrics].join(', '))}">
  <link rel="canonical" href="${baseUrl}/${service.slug}/">
  <meta property="og:title" content="${esc(service.metaTitle)}">
  <meta property="og:description" content="${esc(service.metaDescription)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${baseUrl}/${service.slug}/">
  <meta property="og:image" content="${baseUrl}/${service.image.replace('../', '')}">
  <meta name="twitter:card" content="summary_large_image">
  <link href="../assets/img/favicon.png" rel="icon">
  <link href="../assets/img/apple-touch-icon.png" rel="apple-touch-icon">
  <link href="https://fonts.googleapis.com" rel="preconnect">
  <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&family=Jost:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="../assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="../assets/vendor/bootstrap-icons/bootstrap-icons.min.css" rel="stylesheet">
  <link href="../assets/vendor/aos/aos.css" rel="stylesheet">
  <link href="../assets/css/main.css" rel="stylesheet">
  ${schema(service)}
</head>
<body class="landing-page future-page">
  <header id="header" class="header d-flex align-items-center sticky-top">
    <div class="container-fluid container-xl position-relative d-flex align-items-center">
      <a href="../index.html" class="logo d-flex align-items-center me-auto"><img src="../assets/img/logo.webp" alt="${brand}"></a>
      <nav id="navmenu" class="navmenu">
        <ul>
          <li><a href="../index.html#hero">Inicio</a></li>
          <li><a href="../index.html#about">Nosotros</a></li>
          <li class="dropdown"><a href="../index.html#services"><span>Servicios</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
            <ul>
              ${nav(service.slug)}
            </ul>
          </li>
          <li><a href="../blog/blog.html">Blog</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>
      <a class="btn-getstarted d-none d-xl-inline-flex" href="${whatsapp}" target="_blank" data-ga-event="whatsapp_click" data-ga-service="${service.slug}">WhatsApp</a>
    </div>
  </header>

  <main class="main">
    <section class="future-hero">
      <div class="hero-mesh" aria-hidden="true"></div>
      <div class="container">
        <div class="row align-items-center gy-5">
          <div class="col-lg-7" data-aos="fade-up">
            <div class="future-eyebrow"><i class="bi ${service.icon}"></i>${esc(service.accent)}</div>
            <h1>${esc(service.h1)}</h1>
            <p>${esc(service.subtitle)}</p>
            <div class="future-actions">
              <a href="${whatsapp}" target="_blank" class="future-btn primary" data-ga-event="whatsapp_click" data-ga-service="${service.slug}"><i class="fab fa-whatsapp"></i> Solicitar asesoría</a>
              <a href="#lead-form" class="future-btn secondary" data-ga-event="form_intent" data-ga-service="${service.slug}"><i class="bi bi-arrow-right"></i> Ver diagnóstico</a>
            </div>
            <div class="future-proof">
              ${service.metrics.map((metric) => `<span>${esc(metric)}</span>`).join('\n              ')}
            </div>
          </div>
          <div class="col-lg-5" data-aos="zoom-in" data-aos-delay="120">
            <div class="intelligence-panel">
              <div class="panel-top">
                <span>${esc(service.title)}</span>
                <i class="bi bi-stars"></i>
              </div>
              <img src="${service.image}" alt="${esc(service.title)}" loading="eager" fetchpriority="high">
              <div class="signal-card signal-one"><strong>01</strong><span>Diagnóstico</span></div>
              <div class="signal-card signal-two"><strong>AI</strong><span>Control aumentado</span></div>
              <div class="panel-bottom">
                <div><span>Riesgo</span><strong>Reducido</strong></div>
                <div><span>Proceso</span><strong>Trazable</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="future-section">
      <div class="container">
        <div class="future-section-head" data-aos="fade-up">
          <span>Problemas que resolvemos</span>
          <h2>Lo que cuesta operar sin control, datos ni evidencia</h2>
        </div>
        <div class="problem-grid">
          ${service.problems.map((item, index) => `<article class="future-card problem-card" data-aos="fade-up" data-aos-delay="${index * 70}"><div class="card-index">0${index + 1}</div><h3>${esc(item)}</h3><p>La consecuencia suele aparecer tarde: más costos, más fricción y menos capacidad de decisión.</p></article>`).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="future-section solution-stage">
      <div class="container">
        <div class="row gy-5 align-items-center">
          <div class="col-lg-5" data-aos="fade-right">
            <span class="future-label">Solución Palacios</span>
            <h2>Una intervención diseñada para convertir complejidad en decisiones claras</h2>
            <p>${esc(service.solution)}</p>
            <a href="${whatsapp}" target="_blank" class="future-btn primary compact" data-ga-event="whatsapp_click" data-ga-service="${service.slug}">Hablar con un asesor</a>
          </div>
          <div class="col-lg-7" data-aos="fade-left">
            <div class="solution-orchestrator">
              ${service.benefits.map((item, index) => `<div class="orchestrator-row"><span>0${index + 1}</span><strong>${esc(item)}</strong><i class="bi bi-arrow-up-right"></i></div>`).join('\n              ')}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="future-section metrics-stage">
      <div class="container">
        <div class="future-section-head" data-aos="fade-up">
          <span>Beneficios medibles</span>
          <h2>Indicadores que una firma tradicional no suele mostrar con claridad</h2>
        </div>
        <div class="metric-grid">
          <div class="metric-tile" data-aos="fade-up"><strong data-count="40">40%</strong><span>menos reprocesos potenciales</span></div>
          <div class="metric-tile" data-aos="fade-up" data-aos-delay="80"><strong data-count="4">4x</strong><span>más visibilidad sobre riesgos</span></div>
          <div class="metric-tile" data-aos="fade-up" data-aos-delay="160"><strong data-count="24">24h</strong><span>respuesta comercial prioritaria</span></div>
          <div class="metric-tile" data-aos="fade-up" data-aos-delay="240"><strong data-count="100">100%</strong><span>enfoque documentado y trazable</span></div>
        </div>
      </div>
    </section>

    <section class="future-section process-stage">
      <div class="container">
        <div class="future-section-head" data-aos="fade-up">
          <span>Proceso</span>
          <h2>Un flujo visual, simple y diseñado para avanzar sin fricción</h2>
        </div>
        <div class="process-flow">
          <div data-aos="fade-up"><i class="bi bi-search"></i><h3>Mapear</h3><p>Levantamos contexto, información y puntos críticos.</p></div>
          <div data-aos="fade-up" data-aos-delay="80"><i class="bi bi-diagram-3"></i><h3>Diseñar</h3><p>Definimos alcance, riesgos, responsables y entregables.</p></div>
          <div data-aos="fade-up" data-aos-delay="160"><i class="bi bi-lightning-charge"></i><h3>Ejecutar</h3><p>Intervenimos con metodología, evidencia y comunicación clara.</p></div>
          <div data-aos="fade-up" data-aos-delay="240"><i class="bi bi-graph-up-arrow"></i><h3>Escalar</h3><p>Entregamos recomendaciones, seguimiento y próximos pasos.</p></div>
        </div>
      </div>
    </section>

    <section class="future-section credibility-stage">
      <div class="container">
        <div class="row gy-4">
          <div class="col-lg-5" data-aos="fade-up">
            <span class="future-label">Credibilidad + tecnología</span>
            <h2>Consultoría con mentalidad de producto digital</h2>
            <p>Unimos experiencia profesional, análisis, automatización y acompañamiento cercano para que cada entrega sea entendible, accionable y defendible.</p>
          </div>
          <div class="col-lg-7">
            <div class="cred-grid">
              <div data-aos="fade-up"><i class="bi bi-people"></i><h3>Equipo multidisciplinario</h3><p>Auditoría, tecnología, riesgos, gestión y documentación.</p></div>
              <div data-aos="fade-up" data-aos-delay="80"><i class="bi bi-shield-check"></i><h3>Criterio profesional</h3><p>Enfoque ético, normativo y orientado a evidencia.</p></div>
              <div data-aos="fade-up" data-aos-delay="160"><i class="bi bi-cpu"></i><h3>Tecnología aplicada</h3><p>Automatización, tableros y datos donde generen retorno.</p></div>
              <div data-aos="fade-up" data-aos-delay="240"><i class="bi bi-chat-square-text"></i><h3>Acompañamiento</h3><p>Comunicación clara para gerencias, consejos y equipos.</p></div>
            </div>
          </div>
        </div>
        <div class="usecase-ribbon" data-aos="fade-up">
          ${service.useCases.map((item) => `<span>${esc(item)}</span>`).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="future-section faq-stage">
      <div class="container">
        <div class="row gy-5">
          <div class="col-lg-4" data-aos="fade-up">
            <span class="future-label">FAQ SEO + IA</span>
            <h2>Preguntas que ayudan a decidir y a posicionar</h2>
            <p>Respuestas claras, estructuradas y listas para buscadores modernos.</p>
          </div>
          <div class="col-lg-8">
            <div class="faq-container future-faq">
              ${service.faqs.map(([q, a]) => `<div class="faq-item"><h3>${esc(q)}</h3><div class="faq-content"><p>${esc(a)}</p></div><i class="faq-toggle bi bi-chevron-right"></i></div>`).join('\n              ')}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contacto" class="future-final-cta">
      <div class="container">
        <div class="cta-shell" data-aos="zoom-in">
          <div>
            <span class="future-label">Siguiente paso</span>
            <h2>Convierte esta necesidad en un plan de acción</h2>
            <p>Agenda una conversación corta. Identificamos prioridad, alcance y el mejor camino para avanzar.</p>
            <div class="future-actions">
              <a href="${whatsapp}" target="_blank" class="future-btn primary" data-ga-event="whatsapp_click" data-ga-service="${service.slug}"><i class="fab fa-whatsapp"></i> WhatsApp</a>
              <a href="mailto:${email}" class="future-btn secondary" data-ga-event="email_click" data-ga-service="${service.slug}"><i class="bi bi-envelope"></i> Correo</a>
            </div>
          </div>
          <form id="lead-form" class="future-form" action="mailto:${email}" method="post" enctype="text/plain" data-service="${service.slug}">
            <label>Nombre<input type="text" name="nombre" autocomplete="name" required></label>
            <label>Correo<input type="email" name="correo" autocomplete="email" required></label>
            <label>Teléfono<input type="tel" name="telefono" autocomplete="tel" required></label>
            <label>Necesidad<textarea name="mensaje" rows="4" required>Quiero información sobre ${esc(service.title)}.</textarea></label>
            <button type="submit" data-ga-event="lead_form_submit" data-ga-service="${service.slug}"><i class="bi bi-send"></i> Enviar solicitud</button>
          </form>
        </div>
      </div>
    </section>
  </main>

  <footer id="footer" class="footer">
    <div class="container footer-top">
      <div class="row gy-4">
        <div class="col-lg-4 col-md-6 footer-about">
          <a href="../index.html" class="d-flex align-items-center"><span class="sitename">${brand}</span></a>
          <div class="footer-contact pt-3">
            <p><strong>Teléfono:</strong> <a href="tel:+573151816494" data-ga-event="phone_click" data-ga-service="${service.slug}">${displayPhone}</a></p>
            <p><strong>Email:</strong> <a href="mailto:${email}" data-ga-event="email_click" data-ga-service="${service.slug}">${email}</a></p>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 footer-links">
          <h4>Servicios</h4>
          <ul>
            ${services.map((item) => `<li><i class="bi bi-chevron-right"></i> <a href="../${item.slug}/">${item.nav}</a></li>`).join('\n            ')}
          </ul>
        </div>
        <div class="col-lg-4 col-md-12">
          <h4>Síguenos</h4>
          <p>Contenido, novedades y formas de contacto directo.</p>
          <div class="social-links d-flex">
            <a href="${whatsapp}" target="_blank" data-ga-event="whatsapp_click" data-ga-service="${service.slug}"><i class="fab fa-whatsapp"></i></a>
            <a href="https://www.tiktok.com/@palacios.asesores2" target="_blank"><i class="fab fa-tiktok"></i></a>
            <a href="https://www.instagram.com/palaciosasesores?igsh=NjF5YjIzOW1ncmQ3" target="_blank"><i class="fab fa-instagram"></i></a>
            <a href="https://www.facebook.com/share/1GogRVpA3k/" target="_blank"><i class="fab fa-facebook-f"></i></a>
          </div>
        </div>
      </div>
    </div>
    <div class="container copyright text-center mt-4">
      <p>© <span>Copyright</span> <strong class="px-1 sitename">${brand}</strong> <span>Todos los derechos reservados</span></p>
    </div>
  </footer>

  <div class="sticky-conversion-bar">
    <span>${esc(service.title)}</span>
    <a href="${whatsapp}" target="_blank" data-ga-event="whatsapp_click" data-ga-service="${service.slug}">Agendar</a>
  </div>
  <a href="${whatsapp}" target="_blank" class="floating-whatsapp premium" aria-label="Solicitar asesoría por WhatsApp" data-ga-event="whatsapp_click" data-ga-service="${service.slug}"><i class="fab fa-whatsapp"></i><span>Asesoría</span></a>
  <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
  <script src="../assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="../assets/vendor/aos/aos.js"></script>
  <script src="../assets/js/main.js"></script>
</body>
</html>
`;
}

for (const service of services) {
  const dir = path.join(root, service.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(service), 'utf8');
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/</loc></url>
  <url><loc>${baseUrl}/blog/blog.html</loc></url>
${services.map((service) => `  <url><loc>${baseUrl}/${service.slug}/</loc></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap, 'utf8');

const robots = `User-agent: *
Allow: /
Disallow: /tools/
Sitemap: ${baseUrl}/sitemap.xml
`;
fs.writeFileSync(path.join(root, 'robots.txt'), robots, 'utf8');

fs.writeFileSync(path.join(root, 'tools', 'premium-services.json'), JSON.stringify(services.map(({ slug, nav, title }) => ({ slug, nav, title })), null, 2), 'utf8');

console.log(`Generated ${services.length} premium landing pages.`);
