// Client-only, per history entry: repeated visits to the same URL can have different offsets.
type Position = { left: number; top: number }
const positions = new Map<number, { path: string; position: Position }>()
const pending = new Map<string, Promise<void>>()

export function rememberPageScroll(entry: number, path: string) {
  positions.set(entry, { path, position: { left: window.scrollX, top: window.scrollY } })
  if (positions.size > 100) positions.delete(positions.keys().next().value!)
}

export function savedPageScroll(path: string): Position | undefined {
  const saved = positions.get(window.history.state?.position)
  return saved?.path === path ? saved.position : undefined
}

export function registerPageScroll(path: string) {
  let resolve!: () => void
  const promise = new Promise<void>(done => { resolve = done })
  pending.set(path, promise)
  return () => {
    resolve()
    if (pending.get(path) === promise) pending.delete(path)
  }
}

export async function waitForPageScroll(path: string) {
  await pending.get(path)
}
