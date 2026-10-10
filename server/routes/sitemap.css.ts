// Stylesheet for /sitemap.xml (<?xml-stylesheet type="text/css"?>): browsers show a readable list in the site's style;
// crawlers ignore it and read the XML. CSS rather than XSLT, which browsers are removing.
// Served from a route with text/css (X-Content-Type-Options: nosniff); the count uses CSS counters.
const css = `@namespace s url(http://www.sitemaps.org/schemas/sitemap/0.9);
@namespace xhtml url(http://www.w3.org/1999/xhtml);
@namespace image url(http://www.google.com/schemas/sitemap-image/1.1);
@namespace video url(http://www.google.com/schemas/sitemap-video/1.1);
@font-face{font-family:Manrope;src:url(/diseno/fonts/manrope.woff2) format('woff2');font-weight:200 800}
@font-face{font-family:Inter;src:url(/diseno/fonts/inter.woff2) format('woff2');font-weight:100 900}
:root{background:#f6f4ef}
s|urlset{display:flex;flex-direction:column;counter-reset:url img vid;margin:0;padding:clamp(48px,8vw,110px) clamp(26px,5vw,100px) 80px;
 color:#1c211e;font:15px/1.5 Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
s|urlset::before{order:-3;content:'Martínez Galván Arquitecto  ·  XML sitemap';white-space:pre;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#ad8d61;margin-bottom:18px}
s|urlset::after{order:-2;content:counter(url) ' URLs  ·  ' counter(img) ' photographs  ·  ' counter(vid) ' videos';white-space:pre;
 font:300 clamp(30px,4.6vw,64px)/1.1 Manrope,sans-serif;letter-spacing:-.02em;padding-bottom:36px;margin-bottom:8px;border-bottom:1px solid #1c211e}
s|url{display:block;counter-increment:url;position:relative;padding:15px 120px 15px 3.4em;border-bottom:1px solid #dcd8ce}
s|url::before{content:counter(url);position:absolute;left:0;top:15px;color:#ad8d61;font-variant-numeric:tabular-nums}
s|loc{display:block;font-weight:500;word-break:break-word}
s|lastmod{position:absolute;right:0;top:15px;font-size:13px;color:#6c706b}
xhtml|link{display:block;font-size:13px;color:#6c706b}
xhtml|link::before{content:attr(hreflang) '  →  ' attr(href);white-space:pre}
xhtml|link[hreflang='x-default']{display:none}
image|image,video|video{display:block;height:0;overflow:hidden;font-size:0}
image|image{counter-increment:img}
video|video{counter-increment:vid}
`

export default defineEventHandler(event => {
  setResponseHeader(event, 'Content-Type', 'text/css; charset=utf-8')
  return css
})
