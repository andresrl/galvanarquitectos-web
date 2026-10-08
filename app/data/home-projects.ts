// Home: four full-screen project scenes after the hero, each a cross-fading slideshow of four images.
// Order and picks chosen by Andrés (8 Oct 2026); files refer to scripts/media/projects.json originals.
import { projectById } from './projects/projects'
import type { ProjectImage } from './projects/types'

const picks: [string, string[]][] = [
  ['the-house', ['the_house_06.jpg', 'the_house_01.jpg', 'the_house_04.jpg', 'the_house_05.jpg']],
  ['villa-silver', ['silver 1.jpg', 'VillaSilver_04-scaled.jpg', 'silver 2.jpg', 'VillaSilver_03-scaled.jpg']],
  ['villa-feliz', ['villa_feliz_05.jpg', 'villa_feliz_03.jpg', 'villa_feliz_07.jpg', 'villa_feliz_01.jpg']],
  ['villa-paris', ['villa_paris_02.jpg', 'villa_paris_06.jpg', 'villa_paris_04.jpg', 'villa_paris_01.jpg']],
]

export const homeProjects = picks.map(([id, files]) => {
  const project = projectById(id)
  const all: ProjectImage[] = [project.media.hero, project.media.pause, ...project.media.gallery]
  const images = files.map(file => {
    const image = all.find(i => i.file === file)
    if (!image) throw new Error(`Home slideshow: ${file} is not in the media of ${id}`)
    return image
  })
  return { id, project, images }
})
