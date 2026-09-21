# Sistema de Motion Design de Palacios

## Propósito

Esta capa de experiencia convierte la metodología de Palacios en un lenguaje visual común:

**SEÑAL → RIESGO → CONTROL → PROCESO → DATO → DECISIÓN**

El movimiento se usa para explicar relaciones, estados y transformación. El contenido, los CTA y la navegación siguen funcionando sin JavaScript; la interacción es una mejora progresiva y no una dependencia.

## Arquitectura

El sitio continúa siendo HTML estático generado con Node.js, CSS y JavaScript nativos. No se agregó framework ni dependencia de ejecución.

| Recurso | Responsabilidad |
| --- | --- |
| `assets/css/palacios-2026.css` | Sistema visual base compartido por todo el sitio |
| `assets/js/palacios-2026.js` | Navegación, formularios, analítica y comportamiento base |
| `assets/css/palacios-motion.css` | Layout, estados y animaciones de las cuatro experiencias principales |
| `assets/js/palacios-motion.js` | Narrativas, controles, observadores y visualizaciones conceptuales |
| `assets/css/palacios-experience.min.css` | Bundle de producción: CSS base + motion |
| `assets/js/palacios-experience.min.js` | Bundle de producción: runtime base + motion |
| `tools/build-experience-bundles.js` | Une los recursos minificados sin duplicar solicitudes en el navegador |

Solo la portada, Auditoría, Propiedad Horizontal e Innovación cargan los bundles de experiencia. DOMO, blog y páginas de capacidades conservan los recursos base, por lo que no reciben peso de motion que no utilizan.

## Sistema De Movimiento

Se limitaron las interacciones a tres familias:

1. **Content Reveal:** entrada de contenido con opacidad, desplazamiento corto y secuencias discretas.
2. **System/Data Motion:** trazado de conexiones, activación de nodos, barras, líneas y estados conceptuales.
3. **Interactive Feedback:** hover, focus, selección, presión y confirmación de controles.

Tokens compartidos:

```css
--motion-fast: 180ms;
--motion-normal: 440ms;
--motion-slow: 780ms;
--ease-standard: cubic-bezier(0.2, 0, 0, 1);
--ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
--ease-exit: cubic-bezier(0.4, 0, 1, 1);
```

Las animaciones continuas se limitan a elementos ambientales y se pausan cuando quedan fuera del viewport o la pestaña pierde visibilidad.

## Componentes

### Hero Vivo

El dashboard de la portada representa una secuencia conceptual de aproximadamente 7,6 segundos:

1. Señal detectada.
2. Riesgo priorizado.
3. Control vinculado.
4. Proceso conectado.
5. Dato interpretado.
6. Decisión informada.

El visitante puede elegir Riesgo, Control, Proceso o Decisión. En escritorio también responde al hover; en touch responde al tap. El control permite pausar y reanudar. Una selección manual suspende temporalmente el autoplay para no disputar el control al usuario.

No se muestran datos, porcentajes ni resultados empresariales inventados.

### Tres Recorridos Comerciales

Auditoría, Propiedad Horizontal e Innovación se organizan como capítulos de un mismo sistema. En escritorio existe una guía sticky compacta; el capítulo visible actualiza la relación conceptual y la navegación lateral. En tablet y móvil se elimina el comportamiento sticky largo y se conserva la lectura natural.

### Matriz De Auditoría

La landing de Auditoría contiene una matriz conceptual R1–R5 con:

- Probabilidad e impacto.
- Responsable.
- Riesgo, control, evidencia y resultado esperado.
- Comparación visual de riesgo inherente y residual.
- Navegación por clic, tap, flechas, `Home` y `End`.

Las etiquetas indican de forma explícita que la visualización es demostrativa.

### Ecosistema De Propiedad Horizontal

La landing presenta un plano SVG abstracto conectado con ocho capas:

- Administración.
- Finanzas.
- Cartera.
- Contabilidad.
- Documentos.
- Operación.
- Consejo.
- Control.

Cada selección explica señal, intervención y resultado esperado. En móvil, los controles se reorganizan en una matriz táctil de dos columnas para conservar densidad y legibilidad.

### Comparador De Innovación

El comparador muestra dos arquitecturas conceptuales:

- Manual: Excel → Correo → Persona → Archivo → Validación manual → Informe.
- Automatizada: Fuente de datos → Automatización → Validación → IA/Reglas → Analítica → Dashboard → Decisión.

Se implementó como `tablist` accesible. Funciona con clic, touch, flechas, `Home` y `End`; mantiene `aria-selected`, `tabindex` y paneles asociados. La transición automática sucede una sola vez y se cancela al recibir una elección del usuario.

### Metodología

Escuchamos, Diagnosticamos, Diseñamos, Implementamos, Acompañamos y Medimos forman una línea narrativa. Su progreso responde al scroll y también admite selección directa. En móvil se convierte en un recorrido vertical.

## Responsive

Los ajustes principales se concentran en estos puntos:

| Rango | Comportamiento |
| --- | --- |
| `> 1180 px` | Storytelling sticky, layouts de dos columnas y experiencias completas |
| `≤ 1180 px` | Hero y módulos más compactos; reducción de detalles ambientales |
| `≤ 1100 px` | Reorganización de recorridos y visualizaciones |
| `≤ 900 px` | Narrativa lineal, experiencias apiladas y eliminación del sticky largo |
| `≤ 700 px` | Controles táctiles, gráficas simplificadas y metodología vertical |
| `≤ 640 px` | Densidad móvil, reducción de efectos y tarjetas optimizadas |
| `≤ 430 px` | Ajustes para móviles pequeños y safe areas |

La matriz verificada incluye anchos `320`, `375`, `390`, `430`, `768`, `1024`, `1280`, `1366`, `1440`, `1600`, `1920` y `2560` px.

## Accesibilidad

- Todas las acciones se implementaron con controles HTML reales, no con `div` clicables.
- Los estados se reflejan mediante `aria-pressed`, `aria-selected`, `aria-current` y paneles asociados.
- Las visualizaciones mantienen texto equivalente; ninguna información esencial existe solo en el movimiento.
- Los controles dinámicos tienen focus visible y zonas táctiles mínimas.
- Las selecciones del hero disponen de anuncio no intrusivo para tecnología asistiva.
- `prefers-reduced-motion: reduce` detiene loops, elimina transiciones grandes, muestra estados finales y conserva toda la funcionalidad.
- Los equipos de recursos limitados reciben un nivel de movimiento reducido mediante `data-motion-tier="low"`.

## Rendimiento

- No se agregaron GSAP, ScrollTrigger, Lottie, Rive, Canvas ni Three.js.
- Se utilizan `IntersectionObserver`, `requestAnimationFrame`, `transform` y `opacity`.
- El runtime se carga después del evento `load` y se inicia por intención o durante tiempo ocioso.
- Los gráficos se activan una vez; no se reinician con cada scroll.
- El hero pausa su secuencia fuera del viewport y cuando la pestaña está oculta.
- El CSS y JavaScript de experiencia se entregan en un único request por tipo.
- Las páginas sin experiencias siguen cargando exclusivamente el bundle base.
- Las imágenes existentes conservan WebP, `srcset`, dimensiones y lazy loading; las imágenes LCP de las landings reciben preload responsive.

Peso de producción aproximado:

| Bundle | Crudo | Gzip | Brotli |
| --- | ---: | ---: | ---: |
| `palacios-experience.min.css` | 82,4 KB | 16,4 KB | 14,2 KB |
| `palacios-experience.min.js` | 20,1 KB | 5,6 KB | 4,9 KB |

El incremento comprimido frente al runtime base es cercano a 8,1 KB entre CSS y JavaScript.

## Analítica

Las nuevas interacciones emiten eventos mediante la integración GA4 existente:

- `concept_system_interaction`
- `risk_matrix_interaction`
- `ecosystem_layer_interaction`
- `process_comparator_interaction`
- `method_step_interaction`

Cada evento incluye el servicio y el estado seleccionado cuando corresponde. Los eventos existentes de WhatsApp, formulario, llamadas y CTA se conservaron.

## Compilación Y Mantenimiento

Ejecutar el pipeline completo:

```powershell
powershell -ExecutionPolicy Bypass -File tools\build-production.ps1
```

El orden relevante del build es:

1. Generar HTML.
2. Generar imágenes responsive e iconos.
3. Minificar CSS y JavaScript base y motion.
4. Crear los bundles `palacios-experience.min.*`.
5. Validar HTML, recursos, enlaces, anclas, metadata y JSON-LD.

Al agregar una clase de Bootstrap Icons desde JavaScript, el archivo que la contiene debe permanecer dentro del escaneo de `tools/build-icon-subset.js`. El runtime motion ya está incluido.

Para crear otra experiencia:

1. Mantener contenido semántico visible antes de JavaScript.
2. Incorporar el HTML desde el generador, no editar únicamente el archivo generado.
3. Agregar estilos al recurso motion y usar los tokens existentes.
4. Inicializar solo si el selector raíz existe.
5. Añadir teclado, touch y reduced motion desde el inicio.
6. Verificar overflow, consola, recursos y Lighthouse antes de publicar.
