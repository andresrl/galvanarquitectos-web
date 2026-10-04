# Contrato de diseño

Esta web sale del starter de LanzaderaWeb. **La infraestructura es común; el
diseño es original de cada cliente** y lo hace Claude Code con `/web-cliente`.
`npm run web:comprobar -- <slug>` (desde LanzaderaWeb) verifica este contrato.

## Lo que es del diseño (Claude Code lo escribe desde cero)

| Ruta | Qué |
|---|---|
| `app/components/diseno/` | `Cabecera`, `Pie`, `Home`, `PaginaInterior`, `BlogLista`, `BlogArticulo` y cualquier componente propio que necesite (se usan como `<DisenoX>`) |
| `app/assets/` | `css/diseno.css` (única entrada de estilos) y lo que importe: fuentes, SVG… |
| `public/diseno/` | Recursos decorativos creados para esta web (nunca se presentan como fotos del negocio) |
| `public/diseno/og.svg` | Imagen para redes, 1200×630, coherente con el diseño (`web:arrancar` genera `public/og.png`) |
| `.diseno.json` | Ficha del diseño: dirección elegida, paleta, tipografías y por qué |
| `package.json` | Solo se pueden **añadir** dependencias `@fontsource/*`, `@fontsource-variable/*` y `gsap` |

Todo lo demás es infraestructura y no se toca: páginas (`app/pages/`), `app.vue`,
composables, plugins, servidor, `nuxt.config.ts`, `CookieBanner.vue` (su aspecto
se ajusta con las variables `--cookies-fondo`, `--cookies-texto`,
`--cookies-boton-fondo`, `--cookies-boton-texto`, `--cookies-radio` y
`--cookies-fuente`) y `AvisoVistaPrevia.vue`.

## Datos

`useSitio()` da todo: `negocio`, `servicios`, `contenidos`, `routes`, `logo`,
`fotos`, `menu`, `hijas(path)`, `legales`, `etiqueta(path)`, `cta`, `resenas`,
`vistaPrevia`, `abrirCookies()` y `parrafos(texto)`, que convierte un texto
redactado en párrafos con sus enlaces internos (`[texto](/ruta)`): úsalo para la
intro y los bloques. Los textos salen de ahí: el diseño **no escribe
hechos** del negocio (servicios, precios, años, titulaciones, cifras, reseñas).
Solo microcopia neutra («Ver más», «Llamar»…).

Props que reciben los componentes de página:
- `Home` y `PaginaInterior`: `pagina` (ruta del mapa, con `enlaces` y `pending`) y `contenido` (`h1`, `intro`, `bloques[{titulo, texto}]`, `estado`).
- `BlogLista`: `posts`. `BlogArticulo`: `post` (con `ContentRenderer`, `service` y `serviceAnchor`).

## Obligatorio en cualquier diseño

- Cabecera: enlace a `/` con el logo (`alt` = nombre del negocio) o el nombre; menú; botón con `cta.url`.
- Pie: enlace a **todas** las páginas legales y un botón «Configurar cookies» que llama a `abrirCookies()`.
- Páginas: un único `<h1>` con `contenido.h1`; la intro y todos los bloques; un enlace a **cada** ruta de `pagina.enlaces`.
- **pSEO** (`PaginaInterior` pinta todas las plantillas: `hub`, `ficha`, `pagina`, `precios`, `contacto`, `zona_geografica`, `legal`; adapta bloques según `pagina.plantilla`):
  - Migas (`migas(path)`) en interiores: enlace a cada nivel superior.
  - `contenido.respuesta` (respuesta rápida) visible antes de los bloques.
  - Hubs: tarjeta con enlace a **cada** hija (`hijas(path)`) y su `contenidos[hija].resumen`.
  - Fichas: enlace a su hub y a sus hermanas (`hermanas(path)`).
  - `contenido.faqs`: **todas** las preguntas visibles en la página (el schema FAQPage las publica: lo que no se ve, no va en el schema).
  - `contenido.paraQuien` (sí / no) si viene.
- Borradores: si `contenido.estado !== 'confirmado'` (o `post.draft`), un elemento con `data-borrador` que lo diga.
- Reseñas, si se muestran: autor y enlace a la original.
- Imágenes con `alt`, sin desbordamiento horizontal en móvil (390 px), contraste AA.
- Fuentes autoalojadas con `@fontsource` (nada de Google Fonts por CDN: RGPD).
- Animación, si la dirección la pide: solo `gsap` (incluye ScrollTrigger y SplitText), importado desde `app/components/diseno/`, en `onMounted` y deshecho al desmontar (`gsap.context` → `revert`). Todo bajo `gsap.matchMedia` con `(prefers-reduced-motion: no-preference)`: con menos movimiento, la página sale quieta. El texto está en el HTML y visible sin JavaScript (nada de `opacity: 0` en el CSS de partida: el estado inicial lo pone GSAP). Sin secuestrar el scroll ni fijar secciones que tapen contenido.
- Ningún resto del esqueleto: ni `data-esqueleto` ni clases `esq-*`.
