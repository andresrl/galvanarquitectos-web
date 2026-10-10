// npm run deploy:dist — compila y sube .output (public + server) al repo de producción.
// Funciona igual en Mac y Windows. Clona el repo de producción en ../dist la primera vez.
import { execSync } from 'node:child_process'
import { cpSync, existsSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const dist = resolve(root, '..', 'dist')
const remote = 'git@github.com:andresrl/galvanarquitectos-web-dist.git'
const run = (cmd, cwd = root) => execSync(cmd, { cwd, stdio: 'inherit' })
const out = (cmd, cwd = root) => execSync(cmd, { cwd, encoding: 'utf8' }).trim()
const stop = msg => { console.error(`\n✖ ${msg}\n`); process.exit(1) }

// 1. El código tiene que estar al día con GitHub, para no desplegar sin los cambios del otro
run('git fetch -q origin main')
if (out('git rev-list --count HEAD..origin/main') !== '0') stop('Hay cambios nuevos en GitHub. Ejecuta primero: git pull')
if (out('git status --porcelain')) console.warn('⚠ Hay cambios sin commit: se desplegarán, pero no estarán en GitHub. Haz commit y push.')

// 2. Build
run('npm run build')

// 3. Repo de producción al día
if (!existsSync(join(dist, '.git'))) run(`git clone ${remote} "${dist}"`, resolve(root, '..'))
run('git fetch -q origin main', dist)
run('git reset -q --hard origin/main', dist)

// 4. Sustituir su contenido por la build nueva
for (const name of readdirSync(dist)) if (name !== '.git') rmSync(join(dist, name), { recursive: true, force: true })
cpSync(join(root, '.output'), dist, {
  recursive: true,
  dereference: true, // enlaces de server/node_modules como archivos reales (si no, apuntan a este equipo)
  filter: src => !src.endsWith('.map') && !/[\\/](videos-reel|maquetas)([\\/]|$)/.test(src)
})
writeFileSync(join(dist, 'app.cjs'), "import('./server/index.mjs')\n") // arranque para Plesk

// 5. Commit y push
run('git add -A', dist)
if (!out('git status --porcelain', dist)) { console.log('\nSin cambios: producción ya tiene esta versión.'); process.exit(0) }
const who = out('git config user.name') || 'desconocido'
run(`git commit -qm "deploy ${out('git rev-parse --short HEAD')} por ${who}"`, dist)
run('git push -q origin main', dist)
console.log('\n✔ Subido a producción. Plesk lo descargará y reiniciará la app.')
