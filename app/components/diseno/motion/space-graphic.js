/* Original isometric line art: design, transformation and Mediterranean living. */
function createSpaceGraphic({section,gsap,ScrollTrigger,mobile,reduced}){
 const figure=section.querySelector('.lineart-graphic');
 const svg=figure.querySelector('.lineart-svg');
 let context=null,ambient=null,visibility=null;
 if(gsap&&!reduced){
  context=gsap.context(()=>{
   ambient=gsap.timeline({paused:true});
   ambient.fromTo(figure.querySelector('.la-signal'),{scale:.85,opacity:.12},{scale:1.12,opacity:.55,transformOrigin:'50% 50%',duration:3.8,repeat:-1,yoyo:true,ease:'sine.inOut'},0);
   ambient.to(figure.querySelectorAll('.la-water'),{opacity:.45,y:1.5,duration:4.6,repeat:-1,yoyo:true,ease:'sine.inOut'},0);
   visibility=ScrollTrigger.create({trigger:section,start:'top bottom',end:'bottom top',onToggle:self=>self.isActive?ambient.play():ambient.pause()});
   if(section.getBoundingClientRect().top<innerHeight&&section.getBoundingClientRect().bottom>0)ambient.play();
  },figure);
 }
 return {
  attachScroll(hold,reveal){
   if(reduced||!gsap)return;
   reveal?.from(figure,{opacity:.25,y:mobile?12:28,duration:1.15,ease:'power2.out'},0);
   const phases={design:.02,transform:.18,live:.36};
   figure.querySelectorAll('.la-trace').forEach((line,index)=>{
    const length=line.getTotalLength();
    gsap.set(line,{strokeDasharray:length,strokeDashoffset:0});
    // The complete drawing resolves on entry; the coordination thread continues during the hold.
    const thread=line.classList.contains('la-thread');
    const timeline=thread?hold:reveal;
    const start=thread?.04:phases[line.dataset.phase]+(index%6)*.018;
    timeline?.fromTo(line,{strokeDashoffset:length},{strokeDashoffset:0,duration:thread?.86:.65,ease:'power2.inOut'},start);
   });
   hold.fromTo(svg,{y:mobile?4:10},{y:mobile?-4:-12,ease:'none'},0);
   hold.fromTo(figure.querySelectorAll('.la-label'),{opacity:.35},{opacity:1,duration:.75,stagger:.055,ease:'power2.out'},.1);
  },
  destroy(){visibility?.kill();context?.revert();}
 };
}
export function createSpaceGraphics({sections,gsap,ScrollTrigger,mobile,reduced}){
 const graphics=new Map(sections.filter(section=>section.querySelector('.lineart-graphic')).map(section=>[section,createSpaceGraphic({section,gsap,ScrollTrigger,mobile,reduced})]));
 return {attachScroll(section,hold,reveal){graphics.get(section)?.attachScroll(hold,reveal);},destroy(){graphics.forEach(graphic=>graphic.destroy());}};
}
