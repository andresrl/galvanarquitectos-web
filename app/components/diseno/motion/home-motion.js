import {createSpaceGraphics} from './space-graphic'
import {scrollPage} from '~/utils/smooth-scroll'
// after: promise of a running page transition (utils/page-transition.ts); the hero intro waits for it.
export function createHomeMotion({root,gsap,ScrollTrigger,SplitText,onChapter,after}){
 let motionMedia=null,chapterObserver=null
 const slides=[...root.querySelectorAll('.slide')]
 function activateChapter(slide,index){onChapter(index,slide.dataset.tone)}
 function syncChapter(){let index=0;slides.forEach((slide,i)=>{const pin=ScrollTrigger.getById('pin-'+slide.id);if(pin&&window.scrollY>=pin.start-2)index=i});activateChapter(slides[index],index)}
 function observeChapters(items){chapterObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)activateChapter(entry.target,items.indexOf(entry.target))})},{rootMargin:'-35% 0px -35% 0px'});items.forEach(slide=>chapterObserver.observe(slide))}
 function destroy(){motionMedia?.revert();motionMedia=null;chapterObserver?.disconnect();chapterObserver=null}
 function goToScene(id,smooth){const section=root.querySelector('#'+CSS.escape(id));if(!section?.classList.contains('slide'))return;const pin=ScrollTrigger.getById('pin-'+id);const y=pin?pin.start+1:section.getBoundingClientRect().top+window.scrollY;scrollPage(y,smooth&&!matchMedia('(prefers-reduced-motion: reduce)').matches);section.setAttribute('tabindex','-1');section.focus({preventScroll:true})}
function initMotion(){
 const slides=[...root.querySelectorAll('.slide')];
 gsap.registerPlugin(ScrollTrigger,SplitText);
 motionMedia=gsap.matchMedia();
 motionMedia.add({motion:'(prefers-reduced-motion: no-preference)',reduced:'(prefers-reduced-motion: reduce)',mobile:'(max-width: 700px)',touch:'(pointer: coarse)'},context=>{
  const {motion,mobile,touch}=context.conditions;
  // The process block after the studio is not a scene: no pin, the same editorial reveal as the service pages.
  const process=root.querySelector('.home-process');
  const graphic=createSpaceGraphics({sections:process?[...slides,process]:slides,gsap,ScrollTrigger,mobile,reduced:!motion});
  if(!motion){observeChapters(slides);return ()=>{graphic.destroy();chapterObserver?.disconnect();};}
  const splits=[];
  slides.forEach((slide,index)=>{
   const heading=slide.querySelector('.display-title');
   heading.removeAttribute('aria-label');
   const spokenHeading=heading.innerText.replace(/\s+/g,' ').trim();
   const split=SplitText.create(heading,{type:'words',wordsClass:'word',mask:'words',aria:'auto'});
   heading.setAttribute('aria-label',spokenHeading);
   splits.push({split,heading});
   gsap.set(split.words,{transformPerspective:900,transformOrigin:'50% 100%',filter:'blur(0px)'});
   const visual=slide.querySelector('.visual');
   // Project scenes zoom their whole slideshow, so every cross-faded image keeps the same framing.
   const image=visual?.querySelector('.project-slides')||visual?.querySelector('img');
   const copyItems=slide.querySelectorAll('.eyebrow,.body-copy,.hero-summary,.intro-bottom,.text-link,.contact-email,.contact-phone,.contact-address,.small');
   // A native scroll interval holds each full-screen scene while its composition evolves.
   // anticipatePin only for native touch scrolling: with the wheel, Lenis keeps scroll and pins in the same frame
   // and pinning early makes the scene jump as it locks to the screen.
   const hold=gsap.timeline({scrollTrigger:{id:'pin-'+slide.id,trigger:slide,start:'top top',end:()=>'+='+innerHeight*(mobile ? .38 : .68),pin:index<slides.length-1,pinSpacing:true,scrub:.5,anticipatePin:touch ? 1:0,invalidateOnRefresh:true,onEnter:()=>activateChapter(slide,index),onEnterBack:()=>activateChapter(slide,index)}});
   if(image)hold.fromTo(image,{scale:index===0?1:(mobile ? 1.15:1.2),yPercent:index===0?0:-2},{scale:index===0?1.28:(mobile ? 1.06:1.08),yPercent:index===0?-5:(mobile ? 2:3),ease:'none'},0);
   let reveal=null;
   if(index===0){
    const intro=[gsap.from(split.words,{yPercent:125,x:mobile ? 8:18,rotationX:-82,filter:mobile ? 'blur(1.5px)':'blur(3px)',opacity:0,stagger:.075,duration:1.4,ease:'power4.out',delay:.1,paused:!!after})];
    if(copyItems.length)intro.push(gsap.from(copyItems,{y:32,opacity:0,stagger:.08,duration:1,ease:'power3.out',delay:.6,paused:!!after}));
    if(image)intro.push(gsap.from(image,{scale:1.18,duration:2.2,ease:'power3.out',paused:!!after}));
    after?.then(()=>{if(root.isConnected)intro.forEach(t=>t.delay(t.delay()+.25).restart(true))});
    hold.to(slide.querySelector('.hero-content'),{yPercent:-16,ease:'none'},0).to(slide.querySelector('.hero-frame'),{opacity:.8,inset:mobile ? '8% 4% 8%':'8% 4% 8%',ease:'none'},0).to(slide.querySelector('.hero-shade'),{opacity:.65,ease:'none'},0);
   }else{
    reveal=gsap.timeline({scrollTrigger:{trigger:slide,start:'top 88%',end:'top 8%',scrub:.4,invalidateOnRefresh:true}});
    reveal.from(split.words,{yPercent:125,x:mobile ? 8:18,rotationX:mobile ? -18:-78,filter:mobile ? 'blur(1.5px)':'blur(3px)',opacity:0,stagger:.07,duration:1,ease:'power3.out'},.08);
    reveal.from(copyItems,{y:mobile ? 26:50,opacity:0,stagger:.08,duration:.8,ease:'power2.out'},.3);
    if(visual)reveal.from(visual,{clipPath:'inset(22% 10% 22% 10%)',duration:1.2,ease:'power3.inOut'},0);
    hold.to(heading,{yPercent:mobile ? -6:-14,ease:'none'},0);
   }
   const paths=slide.querySelectorAll('.draw-line');
   paths.forEach(path=>{
    const length=path.getTotalLength();
    gsap.set(path,{strokeDasharray:length,strokeDashoffset:length});
    hold.to(path,{strokeDashoffset:0,duration:1,ease:'power1.inOut'},0);
   });
   graphic.attachScroll(slide,hold);
   if(slide.classList.contains('contact'))hold.fromTo(slide.querySelector('.contact-ring'),{scale:.75},{scale:1.2,ease:'none'},0);
  });
  if(process){
   process.querySelectorAll('[data-reveal]').forEach(element=>gsap.from(element,{y:mobile ? 20:40,opacity:0,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:element,start:'top 92%',toggleActions:'play none none none'}}));
   const hold=gsap.timeline({scrollTrigger:{trigger:process,start:'top bottom',end:'bottom top',scrub:.65}});
   graphic.attachScroll(process,hold);
  }
  gsap.to(root.querySelector('.scroll-progress span'),{scaleX:1,ease:'none',scrollTrigger:{trigger:root.querySelector('#home-slides'),start:'top top',end:'bottom bottom',scrub:.2}});
  syncChapter();
  // Revert SplitText as well as timelines before translation, re-entry or a preference change.
  return ()=>{graphic.destroy();splits.forEach(({split,heading})=>{split.revert();heading.removeAttribute('aria-label');});};
 },root);
 ScrollTrigger.refresh();syncChapter();
}

initMotion();return {destroy,goToScene,sync:syncChapter}
}
