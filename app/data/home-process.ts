// Home: the service process (isometric line art + four stages) after the studio scene (Andrés, 8 Oct 2026).
// Same copy as the service pages; the eyebrow avoids repeating «From the idea to the site» from the studio title.
import type { Locale } from './pages/types'

type Step = { title: string; text: string }

export const homeProcess: Record<Locale, { eyebrow: string; title: string; italic: string; text: string; steps: Step[]; illustration: string }> = {
 en: {
  eyebrow: 'THE PROCESS', title: 'A clear path.', italic: 'A personal approach.',
  text: 'Design, planning permissions, architectural site supervision and contractor coordination can be commissioned according to your project. Responsibilities and deliverables are agreed at the outset.',
  steps: [
   { title: 'Listen & understand', text: 'Discuss your priorities, the property and how you want to use it.' },
   { title: 'Develop the design', text: 'Study the site or the existing villa, the layout and the relationship between house and exterior.' },
   { title: 'Define the project', text: 'Agree the project documentation, permissions and coordination required.' },
   { title: 'Follow the work', text: 'Site supervision and coordination of the companies involved, within the agreed commission.' }
  ],
  illustration: 'Concept illustration · not a project drawing'
 },
 es: {
  eyebrow: 'EL PROCESO', title: 'Un camino claro.', italic: 'Un trato cercano.',
  text: 'Diseño, licencias, dirección de obra y coordinación de empresas se pueden contratar según las necesidades del proyecto. Las responsabilidades y los entregables se acuerdan al definir el encargo.',
  steps: [
   { title: 'Escuchar y comprender', text: 'Conversar sobre tus prioridades, la propiedad y cómo quieres utilizarla.' },
   { title: 'Desarrollar el diseño', text: 'Estudiar la parcela o la villa existente, la distribución y la relación entre la casa y el exterior.' },
   { title: 'Definir el proyecto', text: 'Acordar la documentación, las licencias y la coordinación necesarias.' },
   { title: 'Acompañar la obra', text: 'Dirección de obra y coordinación de las empresas participantes, dentro del encargo acordado.' }
  ],
  illustration: 'Ilustración conceptual · no es un plano de proyecto'
 }
}
