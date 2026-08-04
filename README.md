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

Las rutas antiguas de auditoría e innovación permanecen como redirecciones compatibles hacia las nuevas URLs canónicas.

## Tecnología

El proyecto se mantiene como sitio estático:

- HTML5 semántico.
- CSS personalizado en `assets/css/palacios-2026.css`.
- JavaScript sin framework en `assets/js/palacios-2026.js`.
- Bootstrap Icons como biblioteca de iconografía.
- Google Analytics 4 con el identificador existente del proyecto.
- JSON-LD para `Organization`, `ProfessionalService`, `Service`, `FAQPage`, `BreadcrumbList` y `Article` cuando corresponde.

Las nuevas páginas no dependen de Bootstrap, AOS, Swiper ni librerías de animación. Las páginas históricas conservan solo las dependencias que necesitan.

## Formularios

No existe un backend de formularios. Para evitar confirmaciones falsas, los formularios:

1. Validan los campos en el navegador.
2. Preparan un mensaje con la información ingresada.
3. Abren WhatsApp para que la persona revise y envíe la solicitud.

También están disponibles teléfono y correo como canales alternativos.

## Desarrollo local

El sitio también puede revisarse abriendo `index.html` directamente con el navegador. Los recursos y enlaces internos usan rutas relativas compatibles con `file://` y con despliegue web.

Para probar el comportamiento de las rutas publicadas, desde la raíz del proyecto:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Abrir `http://127.0.0.1:4173/`.

## Regenerar páginas

```powershell
node tools/build-redesign.js
node tools/upgrade-blog-articles.js
node tools/fix-links.js
```

## Validación

```powershell
node tools/validate-site.js
npx --yes html-validate@9.7.1 index.html auditoria/index.html propiedad-horizontal/index.html innovacion/index.html blog/blog.html 404.html
```

## Publicación

El repositorio incluye `CNAME`, `robots.txt` y `sitemap.xml` para despliegue estático. Antes de producción deben confirmarse la política formal de tratamiento de datos, el funcionamiento de Analytics bajo el mecanismo de consentimiento aplicable y una prueba visual/Lighthouse en el entorno final.

El informe detallado de implementación está en `INFORME_REDISENO_WEB_PALACIOS_CODEX.md`.
