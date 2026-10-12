const IMG={
 "m1": "images/motorcycle-ninja-h2.webp",
 "m2": "images/motorcycle-bmw-s1000.webp",
 "c1": "images/cars-ferrari.webp",
 "c2": "images/cars-bmw.webp",
 "c3": "images/cars-nissan-gtr.webp",
 "c4": "images/cars-lamborghini.webp",
 "v1": "images/vloggo-hero.webp",
 "v2": "images/vloggo-about.webp",
 "v3": "images/vloggo-explore-1.webp",
 "v4": "images/vloggo-explore-2.webp",
 "v5": "images/vloggo-contact.webp",
 "t1": "images/treks-malasimbo-hero.webp",
 "t2": "images/treks-malasimbo-title.webp",
 "t3": "images/treks-about.webp",
 "t4": "images/treks-mount-samat.webp",
 "t5": "images/treks-mariveles-tarak.webp",
 "t6": "images/treks-natib.webp",
 "t7": "images/treks-book-now.webp",
 "p1": "images/animation-landing.webp",
 "hero": "images/graduation-portrait.webp",
 "bg": "images/los-santos-skyline.webp"
};
const EMAIL="joshuavillanueva060530@gmail.com";
const FORM_ENDPOINT=""; // Set to a form API URL (JSON POST) to send from the page. Empty = opens the visitor's email app.
const $=s=>document.querySelector(s),reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
document.querySelectorAll("[data-img]").forEach(i=>i.src=IMG[i.dataset.img]);

/* skylines */
function sky(id,seed,fill,lights,lo,hi){const el=$(id);let s=seed;const r=()=>(s=s*16807%2147483647)/2147483647;let x=-10,o="";
 while(x<1610){const w=28+r()*62,h=lo+r()*(hi-lo);o+=`<rect x="${x.toFixed(0)}" y="${(300-h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${fill}"/>`;
  if(r()>.8)o+=`<rect x="${(x+w/2-1).toFixed(0)}" y="${(300-h-26).toFixed(0)}" width="2" height="26" fill="${fill}"/>`;
  if(lights)for(let k=0;k<h/20;k++)if(r()>.6)o+=`<rect x="${(x+5+r()*(w-12)).toFixed(0)}" y="${(300-h+8+r()*(h-16)).toFixed(0)}" width="3" height="4" fill="#f2b24c" opacity="${(.35+r()*.55).toFixed(2)}"/>`;
  x+=w+r()*5}
 el.setAttribute("viewBox","0 0 1600 300");el.setAttribute("preserveAspectRatio","xMidYMax slice");el.innerHTML=o}
sky("#s4",5,"#1a2236",1,50,170);

/* menu */
const burger=$("#burger"),menu=$("#menu");
const setMenu=o=>{menu.classList.toggle("open",o);burger.setAttribute("aria-expanded",o);burger.setAttribute("aria-label",o?"Close menu":"Open menu")};
burger.onclick=()=>setMenu(!menu.classList.contains("open"));
menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>setMenu(false)));
addEventListener("keydown",e=>{if(e.key==="Escape"&&menu.classList.contains("open")){setMenu(false);burger.focus()}});
document.addEventListener("click",e=>{if(menu.classList.contains("open")&&!e.target.closest(".bar"))setMenu(false)});
addEventListener("resize",()=>{if(innerWidth>900)setMenu(false)});
const links=[...menu.querySelectorAll("a")];
const nio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle("on",l.getAttribute("href")==="#"+e.target.id))}),{rootMargin:"-45% 0px -50% 0px"});
["home","about","skills","projects","experience","contact"].forEach(i=>nio.observe(document.getElementById(i)));
$("#up").onclick=()=>scrollTo({top:0,behavior:reduce?"auto":"smooth"});

/* hero parallax (mouse + scroll) */
const hero=$("#home");let mx=0,my=0,cx=0,cy=0,sy=0,pend=0;
function frame(){cx+=(mx-cx)*.08;cy+=(my-cy)*.08;hero.style.setProperty("--mx",cx.toFixed(2));hero.style.setProperty("--my",cy.toFixed(2));hero.style.setProperty("--sy",sy);pend=(Math.abs(mx-cx)>.02||Math.abs(my-cy)>.02)?requestAnimationFrame(frame):0}
const kick=()=>{if(!pend)pend=requestAnimationFrame(frame)};
if(!reduce){
 if(matchMedia("(hover:hover)").matches)hero.addEventListener("pointermove",e=>{const r=hero.getBoundingClientRect();mx=(e.clientX-r.left)/r.width-.5;my=(e.clientY-r.top)/r.height-.5;kick()});
 hero.addEventListener("pointerleave",()=>{mx=my=0;kick()});
 addEventListener("scroll",()=>{if(scrollY<innerHeight*1.2){sy=scrollY;kick()}},{passive:true});
}

/* counters + reveals */
const cnt=(el)=>{const to=+el.dataset.to;if(reduce){el.textContent=to;return}const t0=performance.now();(function f(t){const p=Math.min((t-t0)/1200,1);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)};
const rio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("on");e.target.querySelectorAll("[data-to]").forEach(cnt);rio.unobserve(e.target)}}),{threshold:.15});

/* projects */
const P=[
{t:"Oblak Motorcycles",d:"A landing page for sport bikes. Each bike gets its own color theme, with an oversized model name behind the front view, a short description, the price and a Buy now button.",g:["Figma","UI design","Landing page"],c:"m1",s:[["m1","Ninja H2 page with a green theme"],["m2","BMW S 1000 page with a blue theme"]]},
{t:"Oblak Cars",d:"A car brand showcase. The background photo changes with the selected brand, and a card strip on the right switches between Ferrari, BMW, Nissan GT-R and Lamborghini.",g:["Figma","UI design","Hero carousel"],c:"c1",s:[["c1","Ferrari slide"],["c2","BMW slide"],["c3","Nissan GT-R slide"],["c4","Lamborghini slide"]]},
{t:"Vloggo",d:"A travel vlog site with a hero, an About page with an image collage, an Explore grid of photo cards and a Contact page with a form.",g:["Figma","Web design","Travel"],c:"v1",s:[["v1","Vloggo hero: Capture it. Live it. Share it."],["v2","About page with map collage"],["v3","Explore page, first set of cards"],["v4","Explore page, second set of cards"],["v5","Contact page with form and details"]]},
{t:"Oblak Mountain Treks",d:"A hiking site for Mount Malasimbo and nearby Bataan mountains, with a sunset hero, an image-filled title, trail facts and a destination gallery that ends in a Book now button.",g:["Figma","Web design","Photography-led"],c:"t1",s:[["t1","Mount Malasimbo hero"],["t2","Malasimbo title with image fill"],["t3","About page with trail facts"],["t4","Mount Samat card"],["t5","Mount Mariveles and Tarak Ridge cards"],["t6","Mount Natib card"],["t7","Plan your journey and Book now"]]},
{t:"Oblak Animation Landing Page",d:"A dark purple landing page for a UI and UX designer, with a perspective grid background, a headline with italic highlights, two calls to action and a portrait in a circular frame.",g:["Figma","UI design","Dark theme"],c:"p1",s:[["p1","Purple landing page with portrait"]]}];
$("#pg").innerHTML=P.map((p,i)=>`<article class="pc rv"><div class="th"><span class="mis">MISSION ${String(i+1).padStart(2,"0")}</span><img src="${IMG[p.c]}" alt="${p.t} preview" width="900" height="580" loading="lazy"></div><div class="pb"><h3>${p.t}</h3><p>${p.d}</p><ul class="tg">${p.g.map(x=>`<li>${x}</li>`).join("")}</ul><button class="btn" type="button" data-i="${i}">View project</button></div></article>`).join("");
document.querySelectorAll(".rv").forEach(e=>rio.observe(e));
if(matchMedia("(hover:hover) and (pointer:fine)").matches&&!reduce)document.querySelectorAll(".sc").forEach(c=>{
 c.addEventListener("pointermove",e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.setProperty("--ry",(x*10).toFixed(1)+"deg");c.style.setProperty("--rx",(-y*8).toFixed(1)+"deg")});
 c.addEventListener("pointerleave",()=>{c.style.setProperty("--rx","0deg");c.style.setProperty("--ry","0deg")})});

/* detail view */
const dv=$("#dv");let cur,ix=0;
function show(){const[k,c]=cur.s[ix],im=$("#d-i");im.src=IMG[k];im.alt=c;$("#d-c").textContent="Screen "+(ix+1)+" of "+cur.s.length+": "+c;
 $("#d-s").innerHTML=cur.s.map((s,j)=>`<button type="button" data-j="${j}" aria-label="Screen ${j+1}: ${s[1]}" ${j===ix?'aria-current="true"':""}><img src="${IMG[s[0]]}" alt=""></button>`).join("");
 const m=cur.s.length>1;$("#d-p").hidden=$("#d-n").hidden=$("#d-s").hidden=!m}
const step=d=>{ix=(ix+d+cur.s.length)%cur.s.length;show()};
$("#pg").addEventListener("click",e=>{const b=e.target.closest("[data-i]");if(!b)return;cur=P[b.dataset.i];ix=0;$("#d-t").textContent=cur.t;$("#d-d").textContent=cur.d;$("#d-g").innerHTML=cur.g.map(x=>`<li>${x}</li>`).join("");show();dv.showModal();document.documentElement.classList.add("lock")});
$("#d-x").onclick=()=>dv.close();
dv.addEventListener("click",e=>{if(e.target===dv)dv.close()});
dv.addEventListener("close",()=>document.documentElement.classList.remove("lock"));
$("#d-p").onclick=()=>step(-1);$("#d-n").onclick=()=>step(1);
$("#d-s").addEventListener("click",e=>{const b=e.target.closest("[data-j]");if(b){ix=+b.dataset.j;show()}});
dv.addEventListener("keydown",e=>{if(cur&&cur.s.length>1){if(e.key==="ArrowRight")step(1);if(e.key==="ArrowLeft")step(-1)}});

/* form */
const form=$("#form"),ok=$("#ok");
const rules={name:v=>v.trim().length<2?"Enter your name (at least 2 characters).":"",
 email:v=>!v.trim()?"Enter your email address.":!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())?"Enter a valid email, like name@example.com.":"",
 subject:v=>v.trim().length<3?"Add a short subject (at least 3 characters).":"",
 message:v=>v.trim().length<10?"Write a message of at least 10 characters.":""};
function check(n){const el=form.elements[n],m=rules[n](el.value);$("#e-"+n).textContent=m;el.setAttribute("aria-invalid",m?"true":"false");return !m}
Object.keys(rules).forEach(n=>{const el=form.elements[n];el.addEventListener("blur",()=>check(n));el.addEventListener("input",()=>{if(el.getAttribute("aria-invalid")==="true")check(n)})});
form.addEventListener("submit",async e=>{e.preventDefault();
 const bad=Object.keys(rules).filter(n=>!check(n));if(bad.length){form.elements[bad[0]].focus();return}
 const d=Object.fromEntries(new FormData(form)),b=$("#send");b.disabled=true;b.textContent="Sending...";
 try{let t;
  if(FORM_ENDPOINT){const r=await fetch(FORM_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)});if(!r.ok)throw 0;t="Your message was sent. I'll reply to "+d.email+"."}
  else{const a=document.createElement("a");a.href="mailto:"+EMAIL+"?subject="+encodeURIComponent(d.subject)+"&body="+encodeURIComponent(d.message+"\n\n"+d.name+" ("+d.email+")");a.click();t="Your email app should open with this message ready. It is only sent when you press Send there. If nothing opened, write to "+EMAIL+" directly."}
  $("#ok-t").textContent=t;form.style.display="none";ok.classList.add("show");ok.focus();form.reset()}
 catch(_){$("#e-message").textContent="The message could not be sent. Try again, or email "+EMAIL+"."}
 finally{b.disabled=false;b.textContent="Send message"}});
$("#again").onclick=()=>{ok.classList.remove("show");form.style.display="";form.elements.name.focus()};
