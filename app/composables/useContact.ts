// Contact drawer state, shared by every link that opens it (header, menu, footer, CTAs).
// Links point to /contact (works without JavaScript); with JavaScript the click opens the drawer instead.
import { contactPaths } from '~/data/contact'
export function useContact() {
 const open = useState('galvan:contact', () => false)
 const { locale } = useGalvan()
 const path = computed(() => contactPaths[locale.value])
 function show(event?: Event) {
  // Modified clicks (new tab, etc.) keep the normal link behaviour.
  if (event instanceof MouseEvent && (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0)) return
  event?.preventDefault(); open.value = true
 }
 return { open, path, show, close: () => { open.value = false } }
}
