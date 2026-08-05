# Informe de refinamiento de diseño

Proyecto: Palacios Asesores & Revisores  
Fecha: 5 de agosto de 2026

## Resumen ejecutivo

Se refinó el diseño aprobado sin cambiar identidad visual, paleta, familias tipográficas, estructura, contenido ni concepto del hero. La intervención redujo la altura y densidad innecesarias, mejoró la jerarquía tipográfica, equilibró columnas y tarjetas, adelantó la navegación adaptable y redujo el peso visual del contacto flotante.

La página principal y las landings de Auditoría, Propiedad Horizontal e Innovación fueron verificadas en 1920 × 1080, 1600 × 900, 1440 × 900, 1366 × 768, tablet 768 × 1024 y móvil 390 × 844.

## Problemas detectados

- Hero principal superior a una pantalla en escritorio y móvil.
- H1 principal de hasta seis líneas en escritorio.
- Dashboard conceptual con altura suficiente para condicionar el hero.
- Márgenes amplios entre eyebrow, título, subtítulo, CTA y beneficios.
- Secciones individuales de hasta 2.517 px.
- Tarjetas con alturas promedio de hasta 566 px en la página principal.
- Escala extrema entre H1, H2, H3 y texto regular.
- Navegación horizontal demasiado cercana a su límite entre 901 y 1100 px.
- Botón flotante de WhatsApp dominante en portátiles, tablet y móvil.
- Ausencia de una escala formal de espaciado basada en múltiplos de 8 px.
- Falta de una prueba automatizada conjunta para interacciones, consola y recursos.

## Ajustes realizados

### Hero

- Se mantuvo el fondo azul, la frase dorada cursiva, el dashboard, los CTA y los beneficios.
- El H1 utiliza `clamp(3rem, 4.3vw, 5.2rem)` y un ancho máximo controlado.
- El H1 interno utiliza `clamp(2.75rem, 4vw, 4.75rem)`.
- Se redujeron `line-height`, espacios internos y márgenes entre los elementos comerciales.
- La columna textual ganó proporción y el dashboard quedó en una columna más contenida.
- El hero principal mide 771 px en 1920 × 1080 y 709 px en 1366 × 768.
- El inicio de la sección siguiente queda visible en los cuatro viewports de escritorio.
- El dashboard se compactó mediante nodos, iconos, gaps, nota informativa y padding más pequeños.

### Tipografía

- Se consolidaron las variables `--font-hero`, `--font-hero-inner`, `--font-h2`, `--font-h3-display`, `--font-h3`, `--font-body-lg` y `--font-body`.
- La home pasó de seis líneas de H1 a cuatro en 1920 y 1600 px, y a tres en 1440 y 1366 px.
- Las landings muestran entre dos y tres líneas de H1 en la mayoría de escritorios.
- En móvil ningún H1 supera cinco líneas.
- Los H2 y H3 mantienen una diferencia clara sin perder presencia editorial.
- Se conservaron Sora, Manrope y DM Serif Display.

### Espaciado

- Se creó una escala con tokens de 8, 16, 24, 32, 40, 48, 56, 64, 80 y 96 px.
- El padding de sección utiliza `clamp(64px, 6.5vw, 96px)`.
- Se redujeron separaciones entre encabezados, contenidos, recorridos, tarjetas, CTA y formularios.
- Los espacios continúan siendo amplios, pero ya no generan altura sin función.

### Tarjetas

- Se unificaron padding, radios, bordes, sombras, hover y jerarquía interna por familia de componente.
- Las tarjetas de posicionamiento redujeron alturas mínimas y vacíos internos.
- La tarjeta azul principal mantiene mayor jerarquía sin duplicar la altura necesaria.
- Las tarjetas 02 y 03 comparten padding y alineación.
- Las tarjetas de landings redujeron su altura promedio de aproximadamente 247 a 219 px.
- Las tarjetas de la home redujeron su promedio de 566 a 431 px.
- Los `min-height` se conservaron únicamente donde alinean filas o procesos.

### Dashboard

- Se mantuvo el mismo concepto de riesgo, control, proceso y decisión.
- Se redujeron iconos, padding, separación entre nodos y altura de la nota inferior.
- Se conservaron el indicador de estado, la conexión vertical y los estados Evaluar, Proteger, Optimizar y Decidir.
- En móvil se oculta la nota secundaria para priorizar la visualización conceptual.
- El dashboard no excede la altura del bloque izquierdo en escritorio.

### Header y navegación

- La altura principal quedó en 80 px y pasa a 72 px en resoluciones intermedias y pequeñas.
- Se redujo la separación interna del header y el peso del CTA en anchos limitados.
- El CTA del header se oculta por debajo de 1400 px, donde los CTA del hero ya permanecen visibles.
- El menú colapsable se activa desde 1100 px para evitar compresión, saltos o superposición.
- El menú mantiene cierre por enlace y por tecla `Escape`.
- El estado sticky y su fondo translúcido se mantienen activos después de 24 px de scroll.

### WhatsApp flotante

- En escritorio grande conserva “¿Revisamos su caso? + WhatsApp”.
- Por debajo de 1400 px elimina la frase secundaria y conserva un CTA compacto.
- En móvil muestra icono y la etiqueta corta “Chat”.
- El control móvil mide menos de 110 × 64 px y conserva un área táctil superior a 44 px.
- Se incorporaron `safe-area-inset-right` y `safe-area-inset-bottom`.
- El enlace incluye nombre accesible independiente de la etiqueta visual.

### Responsive

- 1920 × 1080: hero completo y comienzo visible de la siguiente sección.
- 1600 × 900: hero de 714 px, CTA y dashboard visibles.
- 1440 × 900: H1 principal de tres líneas y navegación completa.
- 1366 × 768: hero de 709 px, CTA de header retirado y menú sin compresión.
- 1024 × 768: navegación colapsada antes de alcanzar un ancho crítico.
- Tablet: columnas reorganizadas y visual debajo del contenido cuando corresponde.
- Móvil: botones apilados, H1 máximo de cinco líneas, dashboard reducido y WhatsApp compacto.
- No existe scroll horizontal en ninguno de los 24 escenarios visuales.

## Resultados cuantitativos

| Página | Altura anterior en 1920 | Altura final en 1920 | Reducción |
| --- | ---: | ---: | ---: |
| Inicio | 11.917 px | 8.667 px | 27 % |
| Auditoría | 10.100 px | 7.536 px | 25 % |
| Propiedad Horizontal | 10.310 px | 7.512 px | 27 % |
| Innovación | 11.694 px | 8.558 px | 27 % |

La reducción máxima medida en viewports de escritorio fue de 31 %.

## Archivos modificados

- `assets/css/palacios-2026.css`.
- `tools/build-redesign.js`.
- `tools/audit-layout.js`.
- `index.html`.
- `auditoria/index.html`.
- `propiedad-horizontal/index.html`.
- `innovacion/index.html`.
- `blog/blog.html`.
- `README.md`.

## Archivo creado

- `INFORME_REFINAMIENTO_DISENO.md`.

## Resultados de pruebas

- 24 combinaciones visuales auditadas.
- Cuatro capturas completas de página.
- 37 de 37 pruebas de interacción correctas.
- Menú móvil abre y cierra correctamente en las cuatro páginas.
- Cierre mediante `Escape` correcto.
- Header sticky correcto en las cuatro páginas.
- CTA del hero visible en 1366 × 768.
- Destinos de CTA y WhatsApp válidos.
- FAQ interactivo correcto.
- Navegación colapsada correctamente en 1024 × 768.
- WhatsApp móvil compacto, dentro del viewport y con etiqueta “Chat”.
- Cero errores JavaScript detectados por Chrome DevTools Protocol.
- Cero recursos locales con respuesta 4xx o 5xx.
- Cero desbordamientos horizontales.
- HTML, referencias locales y scripts validados sin errores.

## Pendientes

No quedan bloqueos para los criterios de aceptación definidos.

Antes de una publicación definitiva se recomienda ejecutar Lighthouse en el dominio productivo, confirmar el mecanismo legal de consentimiento de Analytics y conectar los formularios a un CRM si se requiere trazabilidad posterior al salto hacia WhatsApp. Estas tareas no afectan el diseño ni el funcionamiento actual.
