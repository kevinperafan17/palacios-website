# Informe de rediseño web — Palacios Asesores & Revisores

Fecha de implementación: 4 de agosto de 2026.

## Resumen

### Estado inicial

El proyecto era un sitio estático basado en una plantilla BootstrapMade/Arsha. Aunque ya tenía contenido empresarial útil, presentaba una arquitectura fragmentada, servicios con igual jerarquía, formularios sin backend, CTAs genéricos, rutas comerciales inconsistentes y dependencias visuales cargadas sin uso.

La inspección encontró:

- 35 páginas HTML al inicio de esta intervención.
- 25 referencias locales rotas, principalmente un validador de formularios inexistente y enlaces incorrectos al blog.
- Imágenes con extensión WebP que internamente contenían PNG y alcanzaban 2,2 MB por archivo.
- Seis dependencias visuales cargadas en artículos que no se utilizaban.
- Páginas históricas y rutas canónicas que competían entre sí.
- Formularios `mailto:` o sin destino confiable.
- Navegación y composición todavía cercanas a una plantilla corporativa tradicional.
- Porcentajes y cifras visuales sin evidencia verificable, que no debían mantenerse.

### Estrategia aplicada

Se creó una estrategia híbrida con:

- Una home institucional que posiciona la firma y prioriza tres líneas de negocio.
- Tres landings independientes orientadas a intención comercial.
- Capacidades complementarias conservadas para cobertura SEO.
- Un blog rediseñado como biblioteca de conocimiento con búsqueda y filtros.
- Enlazado interno desde artículos hacia la solución comercial relacionada.
- Conversión mediante WhatsApp, llamada, correo y formularios que preparan el mensaje sin simular un backend.

### Resultado final

El sitio conserva el logo, los colores corporativos y la terminología real, pero adopta una dirección visual más sobria, tecnológica y editorial. La nueva interfaz no carga Bootstrap ni librerías de animación en la home o en las tres landings.

La idea visual central es un **sistema de decisión**: riesgo visible, control trazable, procesos conectados y decisiones informadas. Este recurso diferencia la firma sin presentarlo como software real.

## Archivos creados

- `auditoria/index.html`: landing canónica de auditoría y revisoría fiscal.
- `innovacion/index.html`: landing canónica de innovación y tecnología.
- `assets/css/palacios-2026.css`: sistema visual reutilizable.
- `assets/js/palacios-2026.js`: navegación, movimiento, analítica, formularios y filtros.
- `assets/img/services/auditoria-hero.webp`: hero optimizado de auditoría.
- `assets/img/services/propiedad-horizontal-hero.webp`: hero optimizado de propiedad horizontal.
- `assets/img/services/innovacion-hero.webp`: hero optimizado de innovación.
- `tools/build-redesign.js`: generador de la home, landings, blog, 404, redirecciones y sitemap.
- `tools/upgrade-blog-articles.js`: SEO, CTAs y limpieza técnica de artículos.
- `tools/optimize-images.js`: optimización verificable de imágenes pesadas.
- `tools/validate-site.js`: validación de rutas, anclas, schema, imágenes, Analytics y páginas requeridas.
- `README.md`: documentación funcional y técnica del proyecto.
- `INFORME_REDISENO_WEB_PALACIOS_CODEX.md`: este informe.

## Archivos modificados

- `index.html`: reconstrucción completa de la página principal.
- `propiedad-horizontal/index.html`: reconstrucción completa de la landing comercial.
- `blog/blog.html`: nuevo índice de contenidos con filtros y búsqueda.
- `blog/blog-details-*.html`: canonical, Open Graph, `Article` schema, CTA relacionado, búsqueda funcional y dependencias depuradas.
- `404.html`: nueva página útil con navegación de recuperación.
- `revisoria-fiscal/index.html`: redirección compatible hacia `/auditoria/`.
- `automatizacion-ia/index.html`: redirección compatible hacia `/innovacion/`.
- `service-details-auditoria.html`: redirección hacia la landing canónica.
- `service-details-propiedad-horizontal.html`: redirección hacia la landing canónica.
- `service-details-innovacion.html`: redirección hacia la landing canónica.
- `service-details-complementarios.html`: redirección hacia la página vigente.
- `analitica-datos/index.html`, `avaluos/index.html`, `gestion-documental/index.html`, `sagrilaft/index.html` y `servicios-complementarios/index.html`: enlaces normalizados hacia la nueva arquitectura.
- `sitemap.xml`: URLs prioritarias, capacidades y veinte artículos.
- `robots.txt`: acceso público y exclusión de herramientas internas.
- 27 imágenes WebP: recompresión conservando rutas y contenido visual.
- `tools/fix-links.js`: normalización segura de rutas y `rel="noopener"` en enlaces externos.

## Archivos eliminados

No se eliminó contenido empresarial durante esta intervención. Las páginas históricas relevantes se convirtieron en redirecciones para conservar compatibilidad.

El repositorio ya registraba como eliminadas páginas de demostración de plantilla (`starter-page.html`, `service-details.html`, `portfolio-details.html` y `blog/blog-details.html`) antes de ejecutar este prompt. No se restauraron porque no aportaban contenido real y sus referencias quedaron corregidas.

## Nueva arquitectura

```text
/
├── #firma
├── #soluciones
├── #metodo
├── #equipo
├── #capacidades
├── #insights
├── #contacto
├── auditoria/
├── propiedad-horizontal/
├── innovacion/
├── analitica-datos/
├── avaluos/
├── gestion-documental/
├── sagrilaft/
├── servicios-complementarios/
├── blog/
│   ├── blog.html
│   └── 20 artículos
└── 404.html
```

## Página principal

La home ahora sigue esta secuencia:

1. Hero con propuesta de valor y doble CTA.
2. Posicionamiento de la firma en tres pilares.
3. Tres líneas prioritarias con problema, beneficio y enlace propio.
4. Matriz de problemas expresada desde la perspectiva del cliente.
5. Proceso de seis etapas.
6. Credibilidad basada en las especialidades reales del equipo.
7. Innovación representada mediante módulos de automatización, IA, analítica y software.
8. Artículos recientes vinculados con cada línea.
9. CTA final multicanal y formulario hacia WhatsApp.

No se publicaron testimonios, certificaciones, clientes, porcentajes ni resultados no respaldados.

## Landing de Auditoría

### Objetivo

Captar conversaciones con gerentes, juntas, áreas financieras y responsables de control que necesitan revisoría fiscal, auditoría o fortalecimiento de controles.

### Secciones

- Hero orientado al valor más allá del cumplimiento.
- Seis problemas frecuentes.
- Revisoría fiscal, auditoría externa, auditoría interna, riesgos, sistemas y analítica.
- Metodología de siete etapas.
- Resultados esperados sin garantías absolutas.
- Audiencias.
- Diez preguntas frecuentes visibles y en schema.
- CTA final y formulario.

### SEO

- URL: `/auditoria/`.
- H1 único.
- Canonical, Open Graph y Twitter Card.
- `Service`, `FAQPage` y `BreadcrumbList`.
- Enlaces desde home, menú, footer y artículos de auditoría.

## Landing de Propiedad Horizontal

### Objetivo

Captar solicitudes de administradores, consejos, copropiedades y propietarios para servicios administrativos, contables, de control, revisoría fiscal, documentos y tecnología.

### Secciones

- Hero orientado a una copropiedad mejor administrada.
- Problemas de cartera, contabilidad, presupuesto, documentos e información.
- Soluciones agrupadas por necesidad.
- Proceso de seis etapas.
- Beneficios, audiencias y diez FAQ.
- CTA final y formulario con mensaje específico.

### SEO

- URL canónica: `/propiedad-horizontal/`.
- Metadata social y jerarquía H1/H2/H3.
- `Service`, `FAQPage` y `BreadcrumbList`.
- Enlaces contextuales desde contenidos de propiedad horizontal.

## Landing de Innovación

### Objetivo

Captar empresas con tareas repetitivas, información fragmentada, reportes tardíos, dependencia de Excel o necesidad de herramientas a medida.

### Secciones

- Hero tecnológico alineado con la marca.
- Problemas operativos y de información.
- Automatización, analítica, software, IA aplicada, integraciones y trazabilidad.
- Metodología desde descubrimiento hasta mejora.
- Resultados esperados.
- Casos de uso identificados expresamente como ejemplos genéricos.
- Diez FAQ y CTA final.

### SEO

- URL: `/innovacion/`.
- Metadata completa y datos estructurados.
- Enlazado desde home, menú, footer y artículos de tecnología.

## Decisiones de diseño

- **Azul profundo:** conserva la credibilidad institucional y crea contraste para el dorado de marca.
- **Dorado controlado:** se reserva para acciones, estados y líneas de atención; no se usa como decoración indiscriminada.
- **Tipografías Sora, Manrope y DM Serif Display:** combinan precisión tecnológica, legibilidad y un acento editorial premium.
- **Composición asimétrica:** evita la cuadrícula genérica de tarjetas iguales y jerarquiza las tres líneas comerciales.
- **Panel conceptual de decisiones:** demuestra visualmente la integración entre auditoría, datos y tecnología sin fingir un producto real.
- **Movimiento moderado:** los reveals orientan la lectura y los hovers confirman interacción. Todo respeta `prefers-reduced-motion` y evita animar propiedades de layout.
- **Formularios claros:** el botón dice “Continuar en WhatsApp”, de modo que el visitante entiende el destino y no recibe una confirmación falsa.
- **Mobile-first real:** menú accesible, zonas táctiles mínimas, dock de conversión adaptado y grillas que reducen columnas sin desbordar.

## Mejoras técnicas

### Rendimiento

- 27 imágenes reducidas de 38,19 MB a 1,69 MB: ahorro de 95,6%.
- Tres heroes WebP entre 46 KB y 56 KB.
- Eliminación de Glightbox, Swiper, Waypoints, ImagesLoaded, Isotope y el validador PHP inexistente en artículos.
- Las páginas nuevas cargan una hoja CSS, un JavaScript diferido y Bootstrap Icons.
- Imágenes secundarias con `loading="lazy"`; imagen LCP con `fetchpriority="high"` y dimensiones declaradas.

### Responsive y accesibilidad

- Skip link, foco visible, navegación por teclado y cierre del menú con Escape.
- `details/summary` nativo para FAQ.
- Labels, campos requeridos, estados `aria-live` y errores comprensibles.
- Áreas táctiles de 44 px o más.
- Soporte para `prefers-reduced-motion` y adaptación para equipos de baja capacidad.
- Validación HTML estricta sin errores en las seis páginas principales revisadas.

### SEO

- Un H1 por página.
- Titles y descripciones específicas.
- Canonicals y metadatos sociales.
- Schema acorde con contenido visible.
- Sitemap ampliado y rutas antiguas con redirección/canonical.
- Blog con veinte artículos enlazados desde el índice.

### Analítica y conversión

- Se conserva el identificador GA4 existente `G-7978WT0ESL` sin duplicarlo.
- Eventos preparados para WhatsApp, llamadas, correo, CTA principal, entrada a landings, apertura de FAQ, validación y continuación del formulario.
- WhatsApp utiliza mensajes diferenciados por servicio.
- CTAs en hero, después de soluciones, antes del footer y en dock fijo.

## Pruebas realizadas

- `node --check` sobre todos los scripts nuevos y modificados.
- `node tools/validate-site.js`: 203 archivos, 37 HTML, cero errores.
- `html-validate`: home, tres landings, blog y 404 sin errores.
- Prueba HTTP local: 33 rutas del sitemap y compatibilidad, todas con estado 200 y contenido HTML.
- Prueba de apertura directa `file://`: estilos, scripts, imágenes y navegación resuelven mediante rutas relativas.
- Render visual de `index.html` desde disco con Chrome Headless en escritorio: diseño y recursos cargados correctamente.
- Verificación de 63 iconos contra el catálogo local: cero iconos faltantes.
- Búsquedas globales: sin recursos PHP inexistentes, Analytics duplicado, enlaces antiguos de contacto ni `target="_blank"` sin `rel="noopener"`.

No se ejecutó Lighthouse en un entorno publicado; no se atribuyen puntuaciones no medidas.

## Pendientes antes de producción

- Suministrar y publicar la política formal de tratamiento de datos.
- Definir un backend o CRM si se desea almacenar formularios dentro del sitio en vez de usar WhatsApp.
- Confirmar el mecanismo de consentimiento para Analytics según la política aplicable.
- Incorporar testimonios, clientes, casos de éxito y credenciales solo cuando exista autorización y evidencia.
- Definir ciudad, dirección, horario y cobertura únicamente si la empresa decide publicarlos y puede respaldarlos.
- Ejecutar Lighthouse y una revisión visual en dispositivos reales o navegador disponible.
- Configurar redirecciones HTTP 301 en el servidor/CDN; las rutas heredadas usan una redirección HTML compatible mientras no exista control del servidor.
- Validar la recepción real de llamadas, correo y WhatsApp con el propietario antes de publicar.

## Instrucciones de despliegue

1. Ejecutar `node tools/validate-site.js`.
2. Iniciar `python -m http.server 4173 --bind 127.0.0.1` y revisar `/`, `/auditoria/`, `/propiedad-horizontal/`, `/innovacion/`, `/blog/blog.html` y `/404.html`.
3. Probar menú, FAQ, formulario, WhatsApp, llamada y correo en escritorio y móvil.
4. Ejecutar Lighthouse en el entorno de publicación.
5. Publicar el contenido estático conservando `CNAME`, `robots.txt` y `sitemap.xml` en la raíz.
6. Configurar redirecciones 301 de `/revisoria-fiscal/` a `/auditoria/` y de `/automatizacion-ia/` a `/innovacion/` cuando el hosting lo permita.
