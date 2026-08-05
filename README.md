# Palacios Asesores & Revisores

Sitio corporativo y comercial de una firma colombiana que integra auditoría, gestión especializada y tecnología para apoyar decisiones con mayor control, trazabilidad y confianza.

## Qué hace la empresa

Palacios Asesores & Revisores ofrece tres líneas principales:

- **Auditoría:** revisoría fiscal, auditoría externa e interna, control interno, gestión de riesgos, auditoría de sistemas y analítica aplicada.
- **Propiedad Horizontal:** gestión administrativa, outsourcing contable, revisoría fiscal, auditoría, gestión documental y tecnología para copropiedades.
- **Innovación y Tecnología:** automatización, inteligencia artificial aplicada, analítica, dashboards, integraciones y software a medida.

El portafolio se complementa con avalúos, gestión documental, SAGRILAFT/LAFT-SAR, analítica de datos y otros servicios profesionales.

## Arquitectura web

- `/`: sitio corporativo y centro de posicionamiento.
- `/auditoria/`: landing comercial de auditoría y revisoría fiscal.
- `/propiedad-horizontal/`: landing comercial para copropiedades.
- `/innovacion/`: landing comercial de automatización, IA y datos.
- `/blog/blog.html`: biblioteca de contenidos con búsqueda y filtros.
- `/analitica-datos/`, `/avaluos/`, `/gestion-documental/`, `/sagrilaft/` y `/servicios-complementarios/`: páginas de capacidades adicionales.

Las rutas antiguas permanecen como redirecciones compatibles hacia las URLs canónicas.

## Tecnología

El proyecto es un sitio estático:

- HTML5 semántico.
- CSS fuente en `assets/css/palacios-2026.css` y versión minificada para producción.
- JavaScript sin framework en `assets/js/palacios-2026.js` y versión minificada.
- Tipografías corporativas alojadas localmente.
- Subconjunto local de Bootstrap Icons con solo los glifos utilizados.
- Google Analytics 4 con carga diferida y seguimiento de conversiones.
- JSON-LD para `Organization`, `ProfessionalService`, `Service`, `FAQPage`, `BreadcrumbList` y `Article` cuando corresponde.

Las 31 páginas activas comparten el mismo sistema visual y no dependen de Bootstrap, AOS, Swiper, Font Awesome ni librerías de animación. Seis rutas históricas permanecen como redirecciones ligeras.

## Formularios

No existe un backend de formularios. Para evitar confirmaciones falsas, los formularios:

1. Validan los campos en el navegador.
2. Preparan un mensaje con la información ingresada.
3. Abren WhatsApp para que la persona revise y envíe la solicitud.

También están disponibles teléfono y correo como canales alternativos.

## Desarrollo local

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Abrir `http://127.0.0.1:4173/`.

## Producción

La construcción completa regenera páginas, crea variantes responsive de imágenes, construye el subconjunto de iconos, minifica CSS/JS y valida el resultado:

```powershell
powershell -ExecutionPolicy Bypass -File tools/build-production.ps1
```

Para simular compresión y caché de producción durante Lighthouse:

```powershell
node tools/serve-production.js 4175
```

## Validación

```powershell
node tools/validate-site.js
node tools/audit-layout.js C:\ruta\capturas
```

La matriz completa puede ejecutarse con `--all-pages`; `--smoke-only` reduce viewports y `--no-screenshots` realiza una validación funcional sin generar capturas.

## Publicación

El repositorio incluye `CNAME`, `robots.txt` y `sitemap.xml` para despliegue estático. Antes de producción deben confirmarse la política formal de tratamiento de datos, el consentimiento aplicable para Analytics y una prueba Lighthouse sobre el dominio publicado.

El informe final se encuentra en `AUDITORIA_FINAL_PREMIUM.md`.
