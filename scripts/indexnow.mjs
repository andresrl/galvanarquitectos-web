import { site } from '../app/data/site.ts'
import { indexnow } from '../app/data/indexnow.ts'
import { routes } from '../app/data/routes.ts'
if(process.env.NUXT_PUBLIC_INDEXABLE!=='true')throw new Error('Activa indexación tras aprobar el contenido y publicar la web')
const u=new URL(site.url)
if(u.protocol!=='https:'||u.hostname==='localhost'||u.hostname.endsWith('.invalid'))throw new Error('Necesita un dominio público HTTPS')
const urls=routes.filter(r=>r.status==='publicada'&&!['legal','interna'].includes(r.kind)).map(r=>new URL(r.path,u).href)
if(!urls.length)throw new Error('No hay rutas aprobadas para enviar')
if(!process.argv.includes('--enviar'))console.log('Preparado:',urls.length,'URLs. npm run indexnow -- --enviar notifica después de publicar.')
else {const key=await fetch(new URL('/'+indexnow.key+'.txt',u)).then(r=>r.text());if(key.trim()!==indexnow.key)throw new Error('La clave de verificación no está publicada');const r=await fetch('https://api.indexnow.org/indexnow',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({host:u.hostname,key:indexnow.key,keyLocation:new URL('/'+indexnow.key+'.txt',u).href,urlList:urls})});if(![200,202].includes(r.status))throw new Error('IndexNow HTTP '+r.status);console.log('IndexNow recibió',urls.length,'URLs')}
