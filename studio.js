/* SoCoupleCase studio — deterministic on-device pair drafts.
   Same input => same design. Production drafts run on Claude API. */
function hash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function rng(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const VIBES={
 "Half-Heart Minimal":{bg:["#FFF7F5","#FFF1EE"],fg:"#E11D48",acc:"#1c1518",title:["Two Halves, Whole Us","Half Yours, Half Mine"]},
 "Retro Sunset":{bg:["#2B1055","#7597DE"],fg:"#FF9E5E",acc:"#FFE3B3",title:["Sunset, Two Ways","Golden Hour, Twice"]},
 "Starry Night":{bg:["#0B1026","#1B2451"],fg:"#FDE68A",acc:"#A5B4FC",title:["Same Sky, Two Cities","Written in Stars"]},
 "Modern Batik":{bg:["#7C2D12","#B45309"],fg:"#FDE68A",acc:"#FFF7ED",title:["Heritage, Matching","Batik for Two"]},
 "Blossom":{bg:["#FDF2F8","#FCE7F3"],fg:"#DB2777",acc:"#6D28D9",title:["In Bloom, Together","Petal & Stem"]},
 "Y2K Chrome":{bg:["#E0E7FF","#F5F3FF"],fg:"#7C3AED",acc:"#06B6D4",title:["Chrome Hearts Club","Glitch in Love"]}
};
const OCC={ "Anniversary":"made for #N years of us","Valentine":"for the most romantic day of the year","Just because":"because love needs no reason","LDR — miles apart":"miles apart, halves together"};
function esc(s){return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function caseSVG(seedVibe,seedStr,side,initial,pal){
 const R=rng(hash(seedStr+side)),W=200,H=400;
 let deco="";
 const v=seedVibe;
 if(v==="Half-Heart Minimal"){
  const half=side==="A"?"M100,150 C100,110 60,110 60,145 C60,180 100,205 100,225 C100,205 140,180 140,145 C140,110 100,110 100,150":"";
  const halfB=side==="B"?"M100,150 C100,110 140,110 140,145 C140,180 100,205 100,225 C100,205 60,180 60,145 C60,110 100,110 100,150":"";
  deco=`<path d="${side==="A"?half:halfB}" fill="${pal.fg}"/><circle cx="100" cy="290" r="4" fill="${pal.acc}"/><text x="100" y="310" text-anchor="middle" font-size="13" fill="${pal.acc}" font-family="Inter,sans-serif">${side==="A"?"半":"complete"}</text>`;
 }else if(v==="Retro Sunset"){
  let bands="";for(let i=0;i<6;i++){bands+=`<rect x="20" y="${150+i*26}" width="160" height="26" fill="${["#2B1055","#7597DE","#F472B6","#FB923C","#FDE68A"][i%5]}" opacity=".9"/>`}
  const sx=side==="A"?70:130;
  deco=`${bands}<circle cx="${sx}" cy="220" r="34" fill="#FFE3B3"/><rect x="20" y="150" width="160" height="160" fill="none"/>`;
 }else if(v==="Starry Night"){
  let stars="";for(let i=0;i<40;i++){stars+=`<circle cx="${20+R()*160}" cy="${90+R()*240}" r="${(R()*1.6+.4).toFixed(1)}" fill="#fff" opacity="${(R()*.8+.2).toFixed(2)}"/>`}
  const mx=side==="A"?60:140;
  deco=`${stars}<circle cx="${mx}" cy="150" r="26" fill="#FDE68A"/><circle cx="${mx+10}" cy="142" r="22" fill="${pal.bg[1]}"/><path d="M40,280 L90,240 L130,265 L170,230" stroke="${pal.acc}" stroke-width="2" fill="none"/>`;
 }else if(v==="Modern Batik"){
  let pat="";for(let y=0;y<5;y++)for(let x=0;x<4;x++){const cx=40+x*40+(y%2?20:0),cy=120+y*42;pat+=`<circle cx="${cx}" cy="${cy}" r="13" fill="none" stroke="${pal.fg}" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="4" fill="${pal.acc}"/>`}
  deco=pat;
 }else if(v==="Blossom"){
  let fl="";for(let i=0;i<9;i++){const cx=30+R()*140,cy=110+R()*200,r=8+R()*10;fl+=`<g opacity=".85">${[0,72,144,216,288].map(a=>`<ellipse cx="${cx}" cy="${cy}" rx="${r.toFixed(0)}" ry="${(r*.45).toFixed(0)}" fill="${pal.fg}" transform="rotate(${a} ${cx} ${cy})"/>`).join("")}<circle cx="${cx}" cy="${cy}" r="4" fill="${pal.acc}"/></g>`}
  deco=fl;
 }else{
  let bl="";for(let i=0;i<5;i++){bl+=`<ellipse cx="${40+R()*120}" cy="${120+R()*200}" rx="${(20+R()*26).toFixed(0)}" ry="${(12+R()*16).toFixed(0)}" fill="${i%2?pal.fg:pal.acc}" opacity=".55" transform="rotate(${(R()*60-30).toFixed(0)} 100 200)"/>`}
  let sp="";for(let i=0;i<6;i++){const x=30+R()*140,y=110+R()*210;sp+=`<path d="M${x},${y-9} L${x+2},${y-2} L${x+9},${y} L${x+2},${y+2} L${x},${y+9} L${x-2},${y+2} L${x-9},${y} L${x-2},${y-2} Z" fill="#fff"/>`}
  deco=bl+sp;
 }
 return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="case ${side}">
 <defs><linearGradient id="g${side}${hash(seedStr)%997}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${pal.bg[0]}"/><stop offset="1" stop-color="${pal.bg[1]}"/></linearGradient>
 <clipPath id="c${side}${hash(seedStr)%997}"><rect x="14" y="8" width="172" height="384" rx="38"/></clipPath></defs>
 <rect x="14" y="8" width="172" height="384" rx="38" fill="url(#g${side}${hash(seedStr)%997})" stroke="#1c1518" stroke-width="3"/>
 <g clip-path="url(#c${side}${hash(seedStr)%997})">${deco}</g>
 <rect x="30" y="24" width="64" height="64" rx="20" fill="#1c1518" opacity=".92"/>
 <circle cx="48" cy="44" r="11" fill="#334155"/><circle cx="76" cy="44" r="11" fill="#334155"/><circle cx="48" cy="70" r="11" fill="#334155"/><circle cx="62" cy="57" r="4" fill="#FDE68A"/>
 <text x="100" y="362" text-anchor="middle" font-size="26" font-weight="800" fill="${pal.fg==="#E11D48"?"#1c1518":"#fff"}" font-family="Georgia,serif">${esc(initial||"♥")}</text>
 </svg>`;
}
const $=id=>document.getElementById(id);
const cart=[];
function draft(){
 const a=($("nameA").value||"A").trim().slice(0,12),b=($("nameB").value||"B").trim().slice(0,12);
 const vibe=$("vibe").value,occ=$("occasion").value,model=$("model").value;
 const pal=VIBES[vibe],key=`${a}|${b}|${vibe}`;
 const R=rng(hash(key)),title=pal.title[Math.floor(R()*pal.title.length)];
 $("pairOut").innerHTML=caseSVG(vibe,key+"A","A",a[0].toUpperCase(),pal)+caseSVG(vibe,key+"B","B",b[0].toUpperCase(),pal);
 $("designTitle").textContent=`“${title}” — ${a} ♥ ${b}`;
 $("designStory").textContent=`${occ} · ${model}. ${OCC[occ].replace("#N",2+Math.floor(R()*8))}. Draft ${("#"+(hash(key)%9000+1000))} — regenerate anytime, same input same pair.`;
 $("price").textContent="Rp149rb";
 $("addBtn").disabled=false;
 $("addBtn").dataset.key=key; $("addBtn").dataset.title=title;
}
function renderCart(){
 const box=$("cartItems");
 if(!cart.length){box.innerHTML=`<p class="fine">Empty — design a pair above ♥</p>`}
 else box.innerHTML=cart.map((c,i)=>`<p><b>${esc(c.title)}</b><br><span class="fine">${esc(c.key)} · Rp149rb</span></p>`).join("");
 $("cartCount").textContent=cart.length;
 const co=$("checkoutBtn");
 co.href=`mailto:order@socouplecase.com?subject=${encodeURIComponent("Order: "+cart.length+" pair(s)")}&body=${encodeURIComponent(cart.map(c=>c.title+" ["+c.key+"]").join("\n")||"")}`;
}
const CATALOG=[["Half-Heart Minimal","Two Halves, Whole Us","The signature pair."],["Retro Sunset","Sunset, Two Ways","Golden hour, twice."],["Starry Night","Same Sky, Two Cities","For LDR hearts."],["Modern Batik","Heritage, Matching","Indonesian roots."],["Blossom","In Bloom, Together","Soft and sweet."],["Y2K Chrome","Chrome Hearts Club","Bold and playful."]];
document.addEventListener("DOMContentLoaded",()=>{
 $("nameA").value="Aya";$("nameB").value="Bimo";$("vibe").value="Retro Sunset";
 $("heroPair").innerHTML=caseSVG("Retro Sunset","Aya|Bimo|Retro SunsetA","A","A",VIBES["Retro Sunset"])+caseSVG("Retro Sunset","Aya|Bimo|Retro SunsetB","B","B",VIBES["Retro Sunset"]);
 draft();
 $("genBtn").addEventListener("click",draft);
 ["nameA","nameB","vibe","occasion","model"].forEach(id=>$(id).addEventListener("change",draft));
 $("surpriseBtn").addEventListener("click",()=>{const vs=Object.keys(VIBES);$("vibe").value=vs[Math.floor(Math.random()*vs.length)];draft()});
 $("addBtn").addEventListener("click",()=>{cart.push({key:$("addBtn").dataset.key,title:$("designTitle").textContent});renderCart();$("cartDlg").showModal()});
 $("cartBtn").addEventListener("click",()=>$("cartDlg").showModal());
 $("closeCart").addEventListener("click",()=>$("cartDlg").close());
 $("catalogGrid").innerHTML=CATALOG.map(([v,t,d])=>{const p=VIBES[v];return `<article class="news"><div class="mini-pair">${caseSVG(v,t+"A","A","♥",p)}${caseSVG(v,t+"B","B","♥",p)}</div><span class="tag">Best seller</span><h3>${t}</h3><p>${d} Personalize with your names.</p><div class="nmeta"><span class="price">Rp149rb / pair</span></div></article>`}).join("");
 const f=$("news-form");if(f)f.addEventListener("submit",e=>{e.preventDefault();$("news-msg").textContent="Welcome! Your 15% code: SOULMATE15 (demo — connect email tool at launch).";f.reset()});
});
