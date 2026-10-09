// Contact forms (ContactPanel.vue, ServicePage.vue) → POST /api/contact (server/api/contact.post.ts).
// idle → sending → sent | error. On error the form offers the prepared email (mailto) instead; never a false success.
export type EnquiryStatus = 'idle' | 'sending' | 'sent' | 'error'
export function useEnquiry() {
 const status = ref<EnquiryStatus>('idle')
 async function submit(body: Record<string, string>) {
  if (status.value === 'sending') return false
  status.value = 'sending'
  try { await $fetch('/api/contact', { method: 'POST', body }); status.value = 'sent'; return true }
  catch { status.value = 'error'; return false }
 }
 return { status, submit }
}
