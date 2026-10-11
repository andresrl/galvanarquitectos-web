// Contact forms (ContactPanel.vue, ServicePage.vue) → POST /api/contact (server/api/contact.post.ts).
// idle → sending → sent | error. On error the form offers the prepared email (mailto) instead; never a false success.
// Only a confirmed send records the analytics event contact_form_success (utils/track.ts).
export type EnquiryStatus = 'idle' | 'sending' | 'sent' | 'error'
export function useEnquiry() {
 const status = ref<EnquiryStatus>('idle')
 async function submit(body: Record<string, string>) {
  if (status.value === 'sending') return false
  status.value = 'sending'
  try { await $fetch('/api/contact', { method: 'POST', body }); status.value = 'sent'; trackEvent('contact_form_success'); return true }
  catch { status.value = 'error'; return false }
 }
 return { status, submit }
}
