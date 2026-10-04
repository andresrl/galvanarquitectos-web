# Galván Arquitectos — Nuxt 4

Proyecto Nuxt creado en `/Users/andres/Proyectos/vhosts/GalvanArquitectos/app` a partir de una copia del starter de LanzaderaWeb. El starter original en `/Users/andres/Proyectos/vhosts/webix.es/lanzaderaWeb/starter` se conserva intacto: sus 30 archivos se verificaron por SHA-256 antes y después de la migración. El registro está en `../ref/starter-original-sha256.json`.

La demo aceptada se ha migrado a componentes Vue, datos compartidos y módulos GSAP. La Home vive directamente en `/`; la antigua `app/demo` se ha retirado. Su copia de recuperación es `../ref/archive/demo-static-2026-10-04.tar.gz`, fuera de los recursos públicos. `/app/demo` y `/demo` redirigen a `/` y no sirven una segunda web.

## Arranque

```bash
cd /Users/andres/Proyectos/vhosts/GalvanArquitectos/app
npm ci
npm run dev
```

Vista local: [http://localhost:3048/](http://localhost:3048/). El servidor de desarrollo escucha solo en `127.0.0.1`.

```bash
npm run build
NITRO_HOST=127.0.0.1 NITRO_PORT=3048 npm run preview
npm run verify:migration -- http://127.0.0.1:3048
```

El servidor de desarrollo debe estar parado antes de arrancar la vista de producción en el mismo puerto.

## Contenido y diseño

- Home: ocho escenas de `100svh`, Hero con vídeo 1080p (`public/video/viseni.mp4`, con WebM alternativo), fotografías del archivo, gráficos lineart isométricos y animación GSAP con ScrollTrigger y SplitText. El vídeo se reproduce sin sonido, en bucle y dentro de la página en móvil; se pausa cuando el Hero queda fuera de pantalla o la pestaña se oculta. Con movimiento reducido se muestra la fotografía de respaldo. Se conserva el desplazamiento nativo.
- Ejemplos interiores: `/villa-renovation`, `/interior-design` y `/landscape-design`. Son casos demostrativos, con imágenes de referencia y FAQs, tal como en la demo aprobada.
- Inglés en todas las entradas y recargas. El selector permite español durante la visita y conserva la selección al navegar entre páginas. No se guarda el idioma ni se detecta el del navegador. Esta migración mantiene ese comportamiento de la demo; no crea rutas de idioma indexables.
- `app/data/demo.ts`: textos EN/ES y relatos de los tres ejemplos. `app/data/`: los registros que utiliza la infraestructura del starter.
- `app/components/diseno/Home.vue`, `LineArt.vue`, `PaginaInterior.vue`, `Cabecera.vue` y `Pie.vue`: componentes del diseño.
- `app/components/diseno/motion/`: GSAP, importado cuando se monta la Home, con limpieza antes de traducir y al salir. Respeta `prefers-reduced-motion`. El contenido se renderiza en servidor y queda visible sin JavaScript.
- `app/assets/css/diseno.css`: estilos. Fuentes autoalojadas en `public/diseno/fonts`; fotografías en `public/photos`; SVG editables en `public/diseno`.

Se mantienen Nuxt Content, las utilidades de consentimiento/analítica y las rutas de robots y sitemap del starter. La analítica está desactivada y la propuesta conserva `noindex`. El SEO, las FAQs y las etiquetas accesibles se actualizan con el selector. Los ejemplos no se presentan como encargos ejecutados.

## Verificación

- Compilación de producción Nuxt completada.
- Verificación HTTP sobre la compilación: Home y tres interiores con SSR en inglés, un único H1, canonical, JSON-LD válido y `noindex`; recursos locales; redirecciones de las rutas antiguas; ausencia de una demo estática paralela.
- Navegador: EN/ES, traducción del H1 con SplitText, navegación entre interiores, FAQ, desmontaje de los siete pins al salir y reconstrucción al volver.
- Revisión visual en escritorio y móvil a 390 px, sin desbordamiento horizontal.
- Starter original verificado sin cambios.

La estructura sigue las [vistas de Nuxt 4](https://nuxt.com/docs/4.x/getting-started/views) y la limpieza de animación de [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/).


## Primera interior de servicios y zonas

Piloto de reformas de villas en Marbella en `/villa-renovation/marbella` y `/es/reformas-villas/marbella`. Contenido bilingüe modular en `app/data/services/renovation.ts`, plantilla `components/diseno/ServicePage.vue` y animación GSAP sin pins. URLs con canonical y hreflang; estado borrador/noindex. Enlazada desde la Home. El formulario prepara la consulta en la aplicación de correo; conectar el envío antes de producción. `npm run verify:migration -- http://127.0.0.1:3051` incluye la validación SSR de ambos idiomas.
