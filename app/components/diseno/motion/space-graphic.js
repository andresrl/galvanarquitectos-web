/* Original isometric line art: design, transformation and Mediterranean living. */
// Each phase builds inside its own stretch of the scrubbed drawing (0 → 1): the site and the plan,
// then the villa level by level, then water, planting and furniture.
const phases={design:[0,.24],transform:[.14,.76],live:[.62,.96]};
// How far each kind of line moves the construction forward and how long it takes to draw.
const steps={wall:.9,slab:1.1,fascia:0,guide:.5,connection:.6,secondary:.7,detail:.12,interior:.35,water:.3,land:.5,trace:.3};
const spans={wall:.075,slab:.07,fascia:.07,guide:.09,connection:.1,secondary:.07,detail:.035,interior:.05,water:.06,land:.08,trace:.05};
// Largest stretch a matrix gives a length. The lines use vector-effect:non-scaling-stroke,
// so browsers dash them in screen pixels, not in viewBox units.
function stretch(m){
 if(!m)return 1;
 const sum=m.a*m.a+m.b*m.b+m.c*m.c+m.d*m.d,det=m.a*m.d-m.b*m.c;
 return Math.sqrt((sum+Math.sqrt(Math.max(0,sum*sum-4*det*det)))/2);
}
function role(line){
 const list=line.classList;
 // A slab is its thin edge followed by the top plate; both land together.
 if(list.contains('la-surface'))return list.contains('la-ink')?'slab':line.nextElementSibling?.classList.contains('la-ink')?'fascia':'wall';
 return ['guide','connection','interior','water','land','detail','secondary'].find(name=>list.contains('la-'+name))||'trace';
}
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
  attachScroll(hold){
   if(reduced||!gsap)return;
   // The drawing is complete by the time it reaches the middle of the screen; scrolling back undoes it.
   // Created inside the caller's gsap.matchMedia(), which reverts it with the rest of the page motion.
   const build=gsap.timeline({defaults:{ease:'power1.inOut'},scrollTrigger:{trigger:figure,start:'top 88%',end:mobile?'center 45%':'center 40%',scrub:.6,invalidateOnRefresh:true}});
   const traces=[...figure.querySelectorAll('.la-trace')];
   const draw=(line,at,span,ease)=>{
    const local=line.parentNode===svg?1:stretch(line.parentNode.transform?.baseVal.consolidate()?.matrix);
    const dash=()=>line.getTotalLength()*local*stretch(svg.getScreenCTM())+2;
    const pattern=()=>{const length=dash();return length+' '+length;};
    build.fromTo(line,{strokeDasharray:pattern,strokeDashoffset:dash},{strokeDasharray:pattern,strokeDashoffset:0,duration:span,ease},at);
   };
   const groups={design:[],transform:[],live:[]};
   traces.forEach(line=>{
    const phase=line.classList.contains('la-interior')?'live':line.dataset.phase;
    if(line.classList.contains('la-thread')||line.tagName==='circle'||!groups[phase])return;
    // The small plan and facade drawings beside the labels open their phase.
    if(line.parentNode!==svg){draw(line,phases[phase][0]+.01,.12);return;}
    groups[phase].push(line);
   });
   Object.entries(groups).forEach(([phase,lines])=>{
    const [from,to]=phases[phase];
    const roles=lines.map(role);
    const total=roles.reduce((sum,name)=>sum+steps[name],0)||1;
    let cursor=0;
    lines.forEach((line,index)=>{
     const name=roles[index],span=spans[name],at=from+(to-from-span)*cursor/total;
     cursor+=steps[name];
     draw(line,at,span);
     // Transform origins go in both states: a change of origin mid-tween leaves the element offset.
     if(name==='wall')build.fromTo(line,{scaleY:.04,transformOrigin:'50% 100%'},{scaleY:1,transformOrigin:'50% 100%',duration:span,ease:'power2.out'},at);
     if(name==='slab'||name==='fascia')build.fromTo(line,{y:-36,opacity:0},{y:0,opacity:1,duration:span,ease:'power2.out'},at);
     if(name==='wall'||name==='slab'||name==='fascia')build.fromTo(line,{fillOpacity:0},{fillOpacity:1,duration:span*.8},at+span*.5);
     if(name==='land')build.fromTo(line,{scale:.2,transformOrigin:'50% 100%'},{scale:1,transformOrigin:'50% 100%',duration:span,ease:'back.out(1.6)'},at);
     if(name==='interior')build.fromTo(line,{y:-14,opacity:0},{y:0,opacity:1,duration:span,ease:'power2.out'},at);
    });
   });
   // The coordination thread runs from the first idea to the finished villa.
   figure.querySelectorAll('.la-thread').forEach(line=>draw(line,.03,.94,'none'));
   figure.querySelectorAll('circle.la-trace').forEach(node=>build.fromTo(node,{scale:0,transformOrigin:'50% 50%'},{scale:1,transformOrigin:'50% 50%',duration:.04,ease:'back.out(2)'},node.dataset.phase==='live'?.94:.01));
   figure.querySelectorAll('.la-label').forEach((label,index)=>build.fromTo(label,{opacity:0,y:8},{opacity:1,y:0,duration:.08,ease:'power2.out'},(phases[label.dataset.phase]?.[0]??index*.1)+.02));
   // Solid lines once complete, whatever space a browser dashes them in.
   build.set(traces,{strokeDasharray:'none'},1);
   hold.fromTo(svg,{y:mobile?4:10},{y:mobile?-4:-12,ease:'none'},0);
  },
  destroy(){visibility?.kill();context?.revert();}
 };
}
export function createSpaceGraphics({sections,gsap,ScrollTrigger,mobile,reduced}){
 const graphics=new Map(sections.filter(section=>section.querySelector('.lineart-graphic')).map(section=>[section,createSpaceGraphic({section,gsap,ScrollTrigger,mobile,reduced})]));
 return {attachScroll(section,hold){graphics.get(section)?.attachScroll(hold);},destroy(){graphics.forEach(graphic=>graphic.destroy());}};
}
