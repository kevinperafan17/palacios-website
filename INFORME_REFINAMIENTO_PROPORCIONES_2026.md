# Informe de refinamiento de proporciones y ritmo visual

Fecha: 5 de agosto de 2026

## Alcance

Se refinó el sistema visual existente sin cambiar identidad, colores, contenido, arquitectura ni concepto. La intervención se concentró en escala tipográfica, altura de secciones, equilibrio de columnas, densidad de tarjetas, proporción de los héroes y comportamiento responsive.

Páginas auditadas:

- Página principal.
- Auditoría.
- Propiedad Horizontal.
- Innovación y Tecnología.

Viewports auditados:

- 1920 × 1080.
- 1600 × 900.
- 1440 × 900.
- 1366 × 768.
- Tablet: 768 × 1024.
- Móvil: 390 × 844.

## Resultados medidos

### Altura total en escritorio

| Página | Antes 1920 × 1080 | Después 1920 × 1080 | Reducción | Reducción máxima en escritorio |
| --- | ---: | ---: | ---: | ---: |
| Inicio | 11.917 px | 8.666 px | 27 % | 31 % |
| Auditoría | 10.100 px | 7.536 px | 25 % | 29 % |
| Propiedad Horizontal | 10.310 px | 7.512 px | 27 % | 31 % |
| Innovación | 11.694 px | 8.558 px | 27 % | 31 % |

### Hero principal

| Viewport | Altura anterior | Altura final | Líneas H1 anteriores | Líneas H1 finales |
| --- | ---: | ---: | ---: | ---: |
| 1920 × 1080 | 1.246 px | 771 px | 6 | 4 |
| 1600 × 900 | 1.225 px | 714 px | 6 | 4 |
| 1440 × 900 | 1.160 px | 709 px | 6 | 3 |
| 1366 × 768 | 1.130 px | 709 px | 6 | 3 |
| Tablet | 1.294 px | 1.117 px | 2 | 3 |
| Móvil | 1.523 px | 1.151 px | 5 | 5 |

En los cuatro viewports de escritorio el hero queda completo dentro de la primera pantalla y permite percibir el inicio de la sección siguiente.

### Tarjetas

| Página | Altura promedio anterior | Altura promedio final |
| --- | ---: | ---: |
| Inicio | 566 px | 431 px |
| Auditoría | 246 px | 218 px |
| Propiedad Horizontal | 248 px | 219 px |
| Innovación | 245 px | 219 px |

No se detectó desbordamiento horizontal en ninguno de los 24 escenarios auditados.

## Ajustes implementados

### Jerarquía tipográfica

- Se centralizó la escala fluida mediante variables `--font-hero`, `--font-hero-inner`, `--font-h2`, `--font-h3-display`, `--font-h3`, `--font-body-lg` y `--font-body`.
- El H1 principal se redujo aproximadamente 17 % en su tamaño máximo.
- El H1 de las landings se redujo aproximadamente 14 % en su tamaño máximo.
- Se ajustaron `line-height`, `letter-spacing`, anchos máximos y comportamiento de salto de línea.
- Los H2 y H3 ahora mantienen una diferencia más clara frente al H1.

### Ritmo vertical

- El espacio estándar de sección pasó a una escala fluida de 64 a 96 px.
- Se redujeron márgenes entre eyebrow, título, descripción, acciones y diferenciadores.
- Se compactaron encabezados de sección y separaciones entre columnas.
- Se redujeron formularios, FAQ y bloques de contacto sin afectar áreas táctiles.

### Hero y columnas

- El contenedor máximo aumentó de 1.180 a 1.280 px para aprovechar mejor pantallas amplias.
- La columna textual ganó ancho y el visual quedó contenido en una proporción menor.
- El dashboard conceptual redujo nodos, espacios internos y altura total.
- Las imágenes de las landings pasaron de 470 a 410 px en escritorio, 360 px en tablet y 320 px en móvil.

### Tarjetas y componentes

- Se redujeron alturas mínimas, padding e intervalos internos en tarjetas de posicionamiento, servicios, beneficios, roles, metodología y tecnología.
- Se preservó la igualdad visual entre tarjetas de una misma fila.
- La sección de servicios de la página principal bajó de 2.517 a 1.903 px en 1920 × 1080.
- La primera sección institucional bajó de 1.522 a 996 px.

### Responsive y conversión

- Se optimizó el grid para tablet y móvil sin ocultar contenido comercial.
- El CTA flotante se compacta en pantallas intermedias.
- En móvil se convierte en un control circular de 60 × 60 px para reducir obstrucción.
- Se añadió nombre accesible al enlace flotante de WhatsApp.
- Se mantuvieron botones principales con áreas táctiles adecuadas.

## Archivos

### Modificados

- `assets/css/palacios-2026.css`.
- `tools/build-redesign.js`.
- `index.html`.
- `auditoria/index.html`.
- `propiedad-horizontal/index.html`.
- `innovacion/index.html`.
- `blog/blog.html`.

### Creados

- `tools/audit-layout.js`.
- `INFORME_REFINAMIENTO_PROPORCIONES_2026.md`.

## Verificación

- 24 combinaciones de página y viewport capturadas antes y después.
- Cuatro capturas completas de página a 1440 × 900.
- `node tools/validate-site.js`: 204 archivos, 37 HTML, cero errores y cero advertencias.
- `html-validate`: inicio, tres landings, blog y 404 sin errores.
- Scripts JavaScript verificados mediante `node --check`.
- Rutas principales, CSS y JavaScript respondieron con estado HTTP 200.
- `git diff --check` sin errores de espacios en blanco.

Las métricas y capturas de comprobación se guardaron fuera del código publicado, dentro de la carpeta de visualizaciones de esta sesión.
