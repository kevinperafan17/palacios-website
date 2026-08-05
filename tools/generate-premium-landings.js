const fs = require('fs');
const path = require('path');
const shared = require('./build-redesign');

const root = path.resolve(__dirname, '..');
const phone = '573151816494';
const displayPhone = '+57 315 181 6494';
const email = 'contacto@grupopalaciosasesores.com';
const brand = 'Palacios Asesores & Revisores';
const baseUrl = 'https://www.grupopalaciosasesores.com';

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

function normalizeImage(image) {
  return `/${image.replace(/^\.\.\//, '')}`;
}

function serviceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${baseUrl}/${service.slug}/#service`,
        name: service.title,
        description: service.metaDescription,
        serviceType: service.title,
        url: `${baseUrl}/${service.slug}/`,
        image: `${baseUrl}${normalizeImage(service.image)}`,
        provider: { '@id': `${baseUrl}/#professional-service` },
        areaServed: { '@type': 'Country', name: 'Colombia' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${baseUrl}/` },
          { '@type': 'ListItem', position: 2, name: service.title, item: `${baseUrl}/${service.slug}/` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: service.faqs.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  };
}

function card(iconName, title, text, className = 'pain-card') {
  return `<article class="${className} reveal">${shared.icon(iconName)}<h3>${esc(title)}</h3><p>${esc(text)}</p></article>`;
}

function page(service) {
  const image = normalizeImage(service.image);
  const whatsappUrl = shared.whatsapp(`Hola, quiero una asesoría sobre ${service.title}.`);
  const process = ['Entender', 'Priorizar', 'Ejecutar', 'Acompañar'];
  const faqs = service.faqs.map(([question, answer], index) => `
<details${index === 0 ? ' open' : ''}>
  <summary>${esc(question)}</summary>
  <p>${esc(answer)}</p>
</details>`).join('');

  return `<!DOCTYPE html>
<html lang="es-CO">
${shared.head({
    title: service.metaTitle,
    description: service.metaDescription,
    canonical: `/${service.slug}/`,
    image,
    schema: [shared.organizationSchema, serviceSchema(service)],
  })}
<body>
${shared.header('services')}
<main id="contenido">
  <section class="hero inner-hero capability-hero" data-spotlight>
    <div class="container hero__grid">
      <div class="reveal is-visible">
        <nav aria-label="Migas de pan"><ol class="breadcrumb"><li><a href="/">Inicio</a></li><li aria-current="page">${esc(service.title)}</li></ol></nav>
        <span class="eyebrow">${esc(service.accent)}</span>
        <h1>${esc(service.h1)}</h1>
        <p class="hero__lead">${esc(service.subtitle)}</p>
        <div class="hero__actions">
          <a class="button button--gold" href="#contacto" data-event="cta_primary" data-service="${service.slug}">${shared.icon('arrow-right')} Solicitar asesoría</a>
          <a class="button button--ghost" href="${whatsappUrl}" target="_blank" rel="noopener" data-event="whatsapp_click" data-service="${service.slug}">${shared.icon('whatsapp')} Hablar con un especialista</a>
        </div>
        <ul class="trust-strip">${service.metrics.map((metric) => `<li>${shared.icon('check2-circle')} ${esc(metric)}</li>`).join('')}</ul>
      </div>
      <div class="service-visual reveal is-visible">
        <img src="${image}"${shared.responsiveCardImageAttributes(image, '(max-width: 900px) calc(100vw - 32px), 46vw')} width="1280" height="732" alt="${esc(service.title)} con enfoque profesional" fetchpriority="high" decoding="async">
        <div class="service-visual__caption"><strong>${esc(service.title)}</strong><span>Capacidad especializada</span></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-heading"><div><span class="eyebrow">El reto</span><h2>Brechas que reducen control y capacidad de respuesta.</h2></div><p>Identificamos el problema antes de proponer herramientas, entregables o metodologías.</p></div>
      <div class="pain-grid pain-grid--four">${service.problems.map((problem) => card('exclamation-diamond', problem, 'La falta de atención oportuna aumenta fricción, reprocesos y exposición.')).join('')}</div>
    </div>
  </section>

  <section class="section section--light">
    <div class="container">
      <div class="section-heading"><div><span class="eyebrow">Nuestra respuesta</span><h2>Una solución definida alrededor del contexto.</h2></div><p>${esc(service.solution)}</p></div>
      <div class="solution-grid solution-grid--four">${service.benefits.map((benefit, index) => `<article class="solution-card reveal"><span class="solution-card__label">Beneficio ${String(index + 1).padStart(2, '0')}</span><h3>${esc(benefit)}</h3><p>El alcance, las evidencias y los responsables se precisan antes de iniciar.</p></article>`).join('')}</div>
      <div class="cta-actions cta-actions--spaced"><a class="button button--navy" href="#contacto" data-event="cta_after_solutions" data-service="${service.slug}">Revisar esta necesidad</a></div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-heading"><div><span class="eyebrow">Proceso</span><h2>Cuatro momentos para avanzar con claridad.</h2></div><p>La profundidad cambia según el servicio; la lógica de trabajo se mantiene visible y documentada.</p></div>
      <div class="method-grid method-grid--four">${process.map((step) => `<article class="method-card reveal"><h3>${step}</h3></article>`).join('')}</div>
    </div>
  </section>

  <section class="section section--ink">
    <div class="container">
      <div class="section-heading"><div><span class="eyebrow">Aplicación</span><h2>Una capacidad útil para decisiones y responsables concretos.</h2></div><p>Adaptamos lenguaje, alcance y entregables al entorno donde se utilizará la información.</p></div>
      <div class="outcome-grid outcome-grid--four">${service.useCases.map((useCase) => card('person-check', useCase, 'El acompañamiento se ajusta al rol, necesidad y nivel de decisión.', 'outcome-card')).join('')}</div>
    </div>
  </section>

  <section class="section section--light" data-service="${service.slug}">
    <div class="container faq-layout">
      <div class="faq-layout__intro"><span class="eyebrow">Preguntas frecuentes</span><h2>Información útil antes de definir el alcance.</h2><p>Si su caso necesita una respuesta específica, conversemos sobre el contexto.</p></div>
      <div class="faq-list">${faqs}</div>
    </div>
  </section>

  ${shared.contactSection(service.slug, service.title, `Conversemos sobre ${service.title.toLowerCase()}.`, `Quiero información sobre ${service.title}.`)}
</main>
${shared.footer()}
${shared.dock(service.slug, `Hola, quiero una asesoría sobre ${service.title}.`)}
</body>
</html>`;
}

const secondarySlugs = new Set(['analitica-datos', 'avaluos', 'gestion-documental', 'sagrilaft', 'servicios-complementarios']);
const secondaryServices = services.filter((service) => secondarySlugs.has(service.slug));
secondaryServices.forEach((service) => shared.write(`${service.slug}/index.html`, page(service)));
fs.writeFileSync(path.join(root, 'tools', 'premium-services.json'), JSON.stringify(services.map(({ slug, nav, title }) => ({ slug, nav, title })), null, 2), 'utf8');
console.log(`Generadas ${secondaryServices.length} páginas de capacidades con el sistema visual actual.`);
