# Auditoría final premium

Fecha de cierre: 5 de agosto de 2026  
Proyecto: Palacios Asesores & Revisores  
Alcance: página principal, tres landings prioritarias, cinco páginas de capacidades, blog, 20 artículos, 404 y seis redirecciones históricas.

## Resultado ejecutivo

El sitio quedó consolidado como un ecosistema visual único, sin cambiar la identidad, la arquitectura comercial ni la dirección creativa aprobada. Las 31 páginas activas utilizan el mismo sistema premium; las seis rutas históricas son redirecciones ligeras. Se preservó el contenido útil y se modernizaron presentación, conversión, SEO técnico, accesibilidad, responsive y rendimiento.

La revisión pública inicial confirmó que la versión publicada coincidía con el despliegue local existente al comenzar esta fase. Los cambios de este documento corresponden al proyecto local y requieren el flujo normal de publicación para aparecer en el dominio público.

## Métricas de cierre

| Vista representativa | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| Inicio | 96 | 100 | 100 | 100 |
| Auditoría | 97 | 100 | 100 | 100 |
| Propiedad Horizontal | 97 | 100 | 100 | 100 |
| Innovación | 97 | 100 | 100 | 100 |
| Analítica de Datos | 96 | 100 | 100 | 100 |
| Blog | 99 | 100 | 100 | 100 |
| Artículo | 97 | 100 | 100 | 100 |

Medición Lighthouse móvil 12.8.2 sobre servidor local con compresión Brotli/Gzip y caché equivalente a producción. Los valores pueden variar ligeramente según red, equipo, CDN y terceros.

Validaciones complementarias:

- 37 documentos HTML y 293 archivos comprobados por el validador interno.
- 0 errores y 0 advertencias estructurales.
- 74 combinaciones página/viewport en la auditoría global anterior y nueva comprobación final de todas las rutas activas.
- 46 de 46 pruebas de interacción correctas.
- 0 errores JavaScript, consola o recursos 404 detectados.
- 0 desbordamientos horizontales detectados.

## 120 observaciones y resoluciones

| # | Área | Observación | Acción aplicada | Beneficio |
|---:|---|---|---|---|
| 1 | Arquitectura | Parte del sitio usaba un sistema visual antiguo. | Se migraron todas las páginas activas a `palacios-2026`. | Experiencia coherente de extremo a extremo. |
| 2 | Arquitectura | Veinte artículos conservaban plantilla Bootstrap. | Se regeneraron como artículos premium semánticos. | El blog ya no parece un sitio distinto. |
| 3 | Arquitectura | Cinco capacidades secundarias tenían apariencia heredada. | Se reconstruyeron con componentes compartidos. | Portafolio consistente y comercial. |
| 4 | Arquitectura | Las rutas históricas podían competir con URLs nuevas. | Se conservaron como redirecciones con `noindex`. | Menos duplicidad SEO. |
| 5 | Arquitectura | Había lógica repetida entre páginas. | Se centralizaron `head`, header, footer, dock y formularios. | Menor riesgo de divergencia. |
| 6 | Arquitectura | El dominio canónico no coincidía con el host público. | Se normalizó a `www.grupopalaciosasesores.com`. | Señales SEO consistentes. |
| 7 | Arquitectura | El sitemap mezclaba variantes de host. | Se regeneró con host canónico único. | Rastreo más claro. |
| 8 | Arquitectura | `robots.txt` apuntaba a otra variante. | Se corrigió la URL del sitemap. | Descubrimiento técnico correcto. |
| 9 | Arquitectura | La generación podía alterar artículos sucesivamente. | Se hizo idempotente la extracción del contenido. | Builds repetibles. |
| 10 | Arquitectura | No existía una construcción integral de producción. | Se añadió `tools/build-production.ps1`. | Flujo reproducible de publicación. |
| 11 | Marca | La identidad ya era sólida y no requería reemplazo. | Se conservaron logo, azul, dorado y tono corporativo. | Continuidad de marca. |
| 12 | Marca | Las páginas antiguas reducían la percepción internacional. | Se extendió el lenguaje premium a todo el sitio. | Mayor autoridad percibida. |
| 13 | Marca | Los estilos podían parecer creados en momentos distintos. | Se unificaron tokens, componentes y estados. | Sistema reconocible. |
| 14 | Marca | La firma debía equilibrar tecnología y seriedad. | Se mantuvo el contraste editorial entre Sora, Manrope y DM Serif. | Innovación sin perder credibilidad. |
| 15 | Marca | El dashboard podía interpretarse como producto real. | Se conservó la aclaración de visual conceptual. | Comunicación honesta. |
| 16 | Tipografía | La escala original tenía contrastes excesivos. | Se recalibraron H1, H2, H3, cuerpo y microtexto con `clamp()`. | Jerarquía más elegante. |
| 17 | Tipografía | El H1 principal ocupaba demasiadas líneas. | Se redujeron tamaño, tracking y ancho efectivo. | Mensaje visible antes. |
| 18 | Tipografía | Los H1 internos competían con el principal. | Se creó una escala específica para landings. | Jerarquía entre niveles. |
| 19 | Tipografía | Las capacidades necesitaban títulos más compactos. | Se añadió ajuste dedicado `capability-hero`. | Menos saltos de línea. |
| 20 | Tipografía | En 320 px algunos títulos superaban seis líneas. | Se añadió una escala específica para móvil pequeño. | Lectura y densidad mejores. |
| 21 | Tipografía | Los H2 podían dominar secciones breves. | Se redujo su escala fluida. | Mejor proporción contenido/título. |
| 22 | Tipografía | Los H3 de tarjetas no seguían una regla común. | Se normalizaron tamaño y tracking. | Tarjetas visualmente relacionadas. |
| 23 | Tipografía | Los párrafos podían quedar muy anchos. | Se limitaron anchos de lectura según contexto. | Mayor legibilidad. |
| 24 | Tipografía | El texto regular parecía pequeño frente a titulares. | Se equilibró `font-body` y `body-lg`. | Contraste menos extremo. |
| 25 | Tipografía | Eyebrows variaban entre páginas. | Se consolidaron peso, mayúsculas y espaciado. | Señal editorial consistente. |
| 26 | Tipografía | Labels de formularios no tenían token propio. | Se añadieron tokens de label y microtexto. | Escala controlada. |
| 27 | Tipografía | Los botones podían variar perceptualmente. | Se normalizaron peso y altura óptica. | Acciones más consistentes. |
| 28 | Tipografía | Las fuentes dependían de Google Fonts. | Se alojaron cuatro WOFF2 localmente. | Menos terceros y mejor privacidad. |
| 29 | Tipografía | Podía aparecer reflujo por fuentes remotas. | Se precargaron Sora y Manrope críticas. | Primer render más estable. |
| 30 | Tipografía | El estilo cursivo dorado debía conservar protagonismo sin crecer. | Se mantuvo DM Serif italic con escala contenida. | Distinción de marca equilibrada. |
| 31 | Espaciado | Existían paddings verticales demasiado altos. | Se consolidó `--section-space` y ajustes responsive. | Menos scroll improductivo. |
| 32 | Espaciado | Había valores sin relación clara. | Se amplió la escala basada en múltiplos de 8 px. | Ritmo más sistemático. |
| 33 | Espaciado | El hero ocupaba más de una pantalla. | Se redujeron altura mínima y paddings. | Hero casi completo en 1080 px. |
| 34 | Espaciado | Eyebrow y H1 estaban demasiado separados. | Se redujo el margen intermedio. | Mensaje más cohesivo. |
| 35 | Espaciado | H1, subtítulo y CTA tenían demasiado aire. | Se ajustaron gaps progresivos. | Conversión visible antes. |
| 36 | Espaciado | Los beneficios inferiores quedaban muy abajo. | Se acercó el trust strip a los CTA. | Prueba de valor inmediata. |
| 37 | Espaciado | Algunas cabeceras de sección dejaban vacío lateral. | Se ajustaron columnas y max-width. | Mejor aprovechamiento del lienzo. |
| 38 | Espaciado | Las tarjetas tenían padding desigual. | Se unificó padding por familia. | Densidad coherente. |
| 39 | Espaciado | El footer era más alto de lo necesario. | Se compactaron separación y bloque inferior. | Cierre más refinado. |
| 40 | Espaciado | En móvil se heredaban espacios de escritorio. | Se definieron paddings específicos a 640 px. | Recorrido más ágil. |
| 41 | Header | La altura del header pesaba sobre el hero. | Se estabilizó en 80 px y 72 px móvil. | Más área útil. |
| 42 | Header | La navegación podía comprimirse antes de tiempo. | El menú móvil entra a 1100 px. | Sin enlaces apretados. |
| 43 | Header | El espaciado entre enlaces era excesivo en portátil. | Se ajustaron gaps y tamaño. | Navegación equilibrada. |
| 44 | Header | El CTA del header podía salir del viewport. | Se refinó su ancho y breakpoint. | Acción siempre disponible. |
| 45 | Header | El estado sticky no tenía transición suficientemente sutil. | Se normalizaron fondo, borde y sombra. | Scroll más premium. |
| 46 | Header | El menú móvil no atrapaba el foco. | Se implementó focus trap. | Navegación accesible. |
| 47 | Header | Escape no restauraba el foco. | Se añadió cierre con retorno al toggle. | Mejor uso con teclado. |
| 48 | Header | El menú podía quedar abierto al cambiar de breakpoint. | Se cierra al volver a escritorio. | Estado responsive limpio. |
| 49 | Header | El toggle no exponía relación con el menú. | Se añadió `aria-controls`. | Semántica asistiva correcta. |
| 50 | Header | El bloqueo del body podía persistir. | Se centralizó `closeNav()`. | Menos estados inconsistentes. |
| 51 | Hero | El dashboard lateral dominaba la composición. | Se redujo su altura y peso. | Mejor equilibrio entre columnas. |
| 52 | Hero | El dashboard obligaba a ampliar el hero. | Se eliminaron dependencias de altura rígida. | Menos scroll inicial. |
| 53 | Hero | La alineación vertical podía sentirse baja. | Se centró respecto al contenido principal. | Composición más estable. |
| 54 | Hero | Los nodos tenían demasiado aire interno. | Se compactaron padding y gaps. | Mayor densidad SaaS. |
| 55 | Hero | Los estados necesitaban más legibilidad. | Se refinaron labels, puntos y jerarquía. | Flujo conceptual más claro. |
| 56 | Hero | El fondo podía sentirse plano. | Se mantuvo el mesh corporativo con spotlight sutil. | Profundidad sin ruido. |
| 57 | Hero | La retícula podía dominar el contenido. | Se redujo su contraste. | Textos con mayor prioridad. |
| 58 | Hero | El anillo decorativo podía generar desbordamiento. | Se mantuvo dentro del contenedor aislado. | Sin scroll horizontal. |
| 59 | Hero | En móvil el dashboard quedaba demasiado alto. | Se limita a 320 px. | Más contenido visible. |
| 60 | Hero | El contenido conceptual podía confundirse con software funcional. | Se mantuvo microcopy explicativo. | Expectativas correctas. |
| 61 | Tarjetas | Radios diferentes fragmentaban el sistema. | Se consolidaron tokens de radio. | Lenguaje formal único. |
| 62 | Tarjetas | Sombras arbitrarias reducían sofisticación. | Se normalizaron niveles de sombra. | Profundidad coherente. |
| 63 | Tarjetas | Algunas tenían alturas fijas innecesarias. | Se sustituyeron por contenido y mínimos controlados. | Menos zonas vacías. |
| 64 | Tarjetas | Las filas podían desalinearse. | Se mantuvieron mínimos solo donde aportan alineación. | Retícula ordenada. |
| 65 | Tarjetas | Los números y títulos no compartían eje. | Se alinearon jerarquías internas. | Lectura más rápida. |
| 66 | Tarjetas | Los hover eran dispares. | Se unificaron elevación, borde y transición. | Interacción consistente. |
| 67 | Tarjetas | El contraste de tarjetas oscuras podía variar. | Se normalizaron fondos y textos secundarios. | Mayor legibilidad. |
| 68 | Tarjetas | Las cuadrículas de cuatro elementos no tenían modificador. | Se añadieron variantes `--four`. | Capacidades mejor distribuidas. |
| 69 | Tarjetas | El blog saltaba de H1 a H3. | Los títulos de cards del índice ahora son H2. | Orden semántico correcto. |
| 70 | Tarjetas | Las relacionadas de artículos necesitaban conservar H3. | Se mantuvieron dentro de una sección H2. | Jerarquía válida. |
| 71 | Botones | Las alturas variaban por contexto. | Se añadieron tokens de controles. | Consistencia táctil. |
| 72 | Botones | Los radios no seguían una regla común. | Se consolidó radio tipo pill. | Identidad de acción clara. |
| 73 | Botones | El foco no era uniforme. | Se añadió `focus-visible` común. | Accesibilidad y refinamiento. |
| 74 | Botones | Estados disabled no eran explícitos. | Se incorporaron estilos deshabilitados. | Feedback correcto. |
| 75 | Botones | En móvil podían quedar demasiado estrechos. | CTA principales ocupan ancho completo. | Mejor zona táctil. |
| 76 | Iconos | Se descargaba la fuente completa de Bootstrap Icons. | Se generó un subset de 71 glifos. | Fuente reducida de 134 KB a 8.8 KB. |
| 77 | Iconos | La hoja original incluía miles de reglas. | Se generó CSS de iconos de 3.2 KB. | Menos CSS no utilizado. |
| 78 | Iconos | Los tamaños podían variar por componente. | Se normalizaron desde los componentes. | Peso visual consistente. |
| 79 | Iconos | Algunos iconos decorativos podían ser anunciados. | Se usa `aria-hidden="true"`. | Menos ruido para lectores de pantalla. |
| 80 | Iconos | Los enlaces sociales requerían nombre accesible. | Se mantuvieron `aria-label`. | Acciones identificables. |
| 81 | Imágenes | Los hero enviaban originales anchos a móvil. | Se crearon variantes 640/1280. | Menor transferencia. |
| 82 | Imágenes | El formato panorámico se recortaba en tarjetas altas. | Se crearon variantes `card` 1.22:1. | Encuadre y eficiencia mejores. |
| 83 | Imágenes | El logo era sobredimensionado para el header. | Se añadieron variantes 64/128. | Menos bytes críticos. |
| 84 | Imágenes | Faltaban instrucciones de selección responsive. | Se añadieron `srcset` y `sizes`. | El navegador elige mejor recurso. |
| 85 | Imágenes | Algunas imágenes no declaraban estrategia de decodificación. | Se normalizó `decoding="async"`. | Menos bloqueo visual. |
| 86 | Imágenes | Imágenes inferiores podían competir con el LCP. | Se aplicó `loading="lazy"`. | Prioridad de red correcta. |
| 87 | Imágenes | Los hero debían conservar prioridad. | Se usa `fetchpriority="high"`. | LCP más predecible. |
| 88 | Imágenes | Podía ocurrir layout shift por falta de dimensiones. | Todas declaran `width` y `height`. | Reserva de espacio estable. |
| 89 | Imágenes | Algunas imágenes decorativas repetían texto. | Se usa alt vacío cuando el enlace ya tiene nombre. | Accesibilidad sin redundancia. |
| 90 | Imágenes | Los artículos necesitaban alt contextual. | Se preservó o reconstruyó el texto alternativo. | Mejor semántica editorial. |
| 91 | CRO | WhatsApp dominaba demasiado en móvil. | Se oculta en la primera pantalla y aparece tras intención de scroll. | Menos competencia con el hero. |
| 92 | CRO | El dock podía cubrir contenido. | Se ajustaron posición, safe area y tamaño. | Contenido siempre utilizable. |
| 93 | CRO | El label largo no era viable en móvil. | Se usa versión compacta “Chat”. | Menor ocupación. |
| 94 | CRO | La versión desktop necesitaba contexto. | Se mantiene “¿Revisamos su caso?”. | CTA más humano. |
| 95 | CRO | Los formularios podían prometer envío inexistente. | Se explica que preparan el mensaje para WhatsApp. | Confianza y transparencia. |
| 96 | CRO | Los formularios eran extensos. | Se mantienen cuatro campos esenciales y necesidad. | Menor fricción. |
| 97 | CRO | Los errores no se exponían de forma consistente. | Se usa `aria-invalid` y estado textual. | Recuperación más clara. |
| 98 | CRO | El atributo inválido podía persistir. | Se elimina al volver válido el campo. | Feedback correcto. |
| 99 | CRO | Los CTAs no compartían taxonomía analítica. | Se normalizaron `data-event` y `data-service`. | Medición comparable. |
| 100 | CRO | No había seguimiento explícito de llamadas. | Se etiquetaron clics `tel:`. | Visibilidad de leads telefónicos. |
| 101 | CRO | No había seguimiento explícito de correo. | Se etiquetaron clics `mailto:`. | Visibilidad de contacto alternativo. |
| 102 | CRO | Los FAQ podían aportar señal de intención. | Se rastrea apertura de preguntas. | Insights comerciales. |
| 103 | CRO | GA podía bloquear el hilo principal. | Se difirió hasta interacción o espera controlada. | Menos TBT. |
| 104 | CRO | La interacción general cargaba antes del primer render. | El runtime se inyecta después del primer pintado. | TBT de 0 ms en varias vistas. |
| 105 | CRO | Las tres landings debían compartir recorrido. | Se unificaron hero, problema, solución, proceso, FAQ y CTA. | Comparabilidad comercial. |
| 106 | SEO | Algunos artículos carecían del sistema SEO actual. | Se añadieron title, description, canonical y Open Graph. | Mejor presentación orgánica. |
| 107 | SEO | Los artículos necesitaban datos estructurados. | Se añadió `Article` con autor y publisher. | Mejor comprensión por buscadores. |
| 108 | SEO | Las landings requerían descripción de servicio. | Se conserva `Service`/`ProfessionalService`. | Entidad comercial explícita. |
| 109 | SEO | Los FAQ debían estar listos para máquinas. | Se genera `FAQPage` válido. | Contenido estructurado. |
| 110 | SEO | La organización debía ser una entidad común. | Se reutiliza `Organization` con `@id`. | Grafo semántico consistente. |
| 111 | SEO | El idioma estaba mezclado entre plantillas. | Los 37 HTML declaran `es-CO`. | Segmentación regional correcta. |
| 112 | SEO | Los artículos podían perder contenido al migrar. | Se preservó el cuerpo editorial existente. | No se sacrifica indexación. |
| 113 | SEO | El blog necesitaba exploración por tema. | Se mantienen filtros, búsqueda y parámetros. | Descubrimiento interno. |
| 114 | SEO | El 404 no seguía el sistema de marca. | Se creó una experiencia 404 premium con rutas útiles. | Menos abandono. |
| 115 | Rendimiento | CSS y JS fuente se servían sin minificar. | Se generaron versiones minificadas. | Menor transferencia y parseo. |
| 116 | Rendimiento | Se calculaba layout para todo el documento al inicio. | Se aplicó `content-visibility` a secciones. | Menos trabajo inicial. |
| 117 | Rendimiento | El reveal con IntersectionObserver generaba trabajo. | Se cambió a animación CSS progresiva con View Timeline. | Menos JavaScript y mejor fluidez. |
| 118 | Rendimiento | Las animaciones podían afectar usuarios sensibles. | Se respeta `prefers-reduced-motion`. | Accesibilidad vestibular. |
| 119 | QA | El validador aceptaba dependencias heredadas. | Ahora rechaza Bootstrap, AOS, main.css y Font Awesome en páginas activas. | Prevención de regresiones. |
| 120 | QA | No había una matriz reproducible de viewports y acciones. | Se amplió `audit-layout.js` con 8 tamaños, rutas representativas y modo global. | Control de calidad repetible. |

## Archivos modificados

Principales fuentes y herramientas:

- `assets/css/palacios-2026.css`
- `assets/css/palacios-2026.min.css`
- `assets/css/palacios-icons.css`
- `assets/js/palacios-2026.js`
- `assets/js/palacios-2026.min.js`
- `tools/build-redesign.js`
- `tools/generate-premium-landings.js`
- `tools/build-icon-subset.js`
- `tools/build-responsive-images.py`
- `tools/build-production.ps1`
- `tools/serve-production.js`
- `tools/audit-layout.js`
- `tools/validate-site.js`
- `README.md`
- `robots.txt`
- `sitemap.xml`

Páginas regeneradas:

- `index.html`
- `auditoria/index.html`
- `propiedad-horizontal/index.html`
- `innovacion/index.html`
- `analitica-datos/index.html`
- `avaluos/index.html`
- `gestion-documental/index.html`
- `sagrilaft/index.html`
- `servicios-complementarios/index.html`
- `blog/blog.html`
- Los 20 documentos `blog/blog-details-*.html`
- `404.html`
- Seis páginas de redirección histórica.

Activos creados:

- Cuatro fuentes WOFF2 corporativas en `assets/fonts/`.
- Fuente WOFF de iconos reducida en `assets/fonts/palacios-icons.woff`.
- Variantes 640/1280 de imágenes editoriales.
- Variantes recortadas 640/1024 para tarjetas y hero visuales.
- Variantes 64/128 del logo.

## Mejoras por disciplina

### UX y UI

Se redujo densidad vertical innecesaria, se estabilizó la escala tipográfica, se equilibraron hero y visual lateral, se unificaron tarjetas, controles e iconografía y se diseñaron estados específicos para móvil, tablet, portátil, 2K y ultrawide.

### CRO

Se mantuvieron CTA visibles en hero, beneficios y cierre; se redujo el peso del dock en móvil; se conservaron formularios cortos; se añadieron eventos para WhatsApp, llamadas, correo, formulario, FAQ y navegación hacia servicios.

### SEO

Se normalizaron canonical, host, sitemap, metadatos sociales, jerarquías, idioma y esquemas `Organization`, `Service`, `FAQPage` y `Article`. Todo el contenido editorial útil fue preservado.

### Accesibilidad

Se validaron landmarks, H1 único, skip link, foco visible, navegación de teclado, focus trap, atributos ARIA, nombres accesibles, dimensiones de imágenes, reducción de movimiento y jerarquía de headings.

### Rendimiento

Se autoalojaron fuentes, se redujo iconografía, se minificaron CSS/JS, se difirió Analytics y runtime, se añadieron imágenes responsive, se aplicó lazy loading y se evitó calcular inicialmente secciones fuera de pantalla.

## Pruebas ejecutadas

- `node tools/validate-site.js`
- `node tools/audit-layout.js ...`
- `node tools/audit-layout.js ... --all-pages --smoke-only --no-screenshots`
- Lighthouse 12.8.2 móvil sobre rutas representativas.
- Pruebas de menú, focus trap, Escape, header sticky, CTA, WhatsApp, formulario, llamadas, filtros del blog y FAQ.
- Revisión visual en 2560×1440, 1920×1080, 1600×900, 1440×900, 1366×768, 768×1024, 390×844 y 320×568.

## Pendientes externos

- Publicar el estado actual del repositorio para que los cambios aparezcan en el dominio público.
- Validar Lighthouse nuevamente sobre el CDN/hosting real después del despliegue.
- Implementar una política formal de tratamiento de datos y consentimiento de Analytics validada jurídicamente.
- Conectar formularios a CRM si el volumen comercial requiere trazabilidad más allá de WhatsApp.
- Sustituir casos genéricos por casos de éxito reales, métricas verificables y testimonios autorizados cuando la empresa los proporcione.
- Retirar en una limpieza posterior los assets vendor heredados que ya no se referencian; actualmente no afectan la carga de las páginas activas.
