/* SoCoupleCase Originality Check — anti-AI-slop scorer for design briefs.
   Flags generic briefs ("something cute aesthetic viral!!") and rewards
   personal detail (names, dates, coordinates, places). On-device demo. */
const CLICHE=["aesthetic","beautiful","breathtaking","stunning","amazing","awesome","gorgeous","couple goals","love is","trending","viral","fyp","aura","vibe check","core","era","slay","yang bagus","yang lucu","yang keren","bagus banget","cantik banget","yang viral","bikin pangling","gemoy","estetik"];
const FILLER=["something","anything","whatever","somehow","kind of","sort of","sesuatu","apa aja","terserah","gitu","kayak gitu","yang itu","pokoknya"];
const cnt=(re,t)=>{const m=t.match(re);return m?m.length:0};
function analyzeBrief(raw){
 const text=(raw||"").trim(),sigs=[];
 if(!text)return{score:0,verdict:"EMPTY",sigs,tokens:0};
 const words=text.toLowerCase().split(/\s+/).filter(Boolean),tokens=words.length,low=text.toLowerCase();
 const push=(id,label,value,detail)=>sigs.push({id,label,value:Math.max(0,Math.min(100,Math.round(value))),detail});
 const cl=CLICHE.filter(p=>low.includes(p));
 push("cliche","Generic clichés",Math.min(100,cl.length*30+(tokens?cl.length/tokens*160:0)),cl.slice(0,4).join(", ")||"no clichés — good");
 const fl=FILLER.filter(p=>low.includes(p));
 push("vague","Vague filler",Math.min(100,fl.length*35),fl.slice(0,4).join(", ")||"specific wording");
 const letters=(text.match(/[A-Za-z]/g)||[]).length,upper=(text.match(/[A-Z]/g)||[]).length;
 const caps=letters?upper/letters:0;
 const emoji=cnt(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu,text);
 push("spam","Caps & emoji spam",Math.min(100,caps*140+emoji*12),`${Math.round(caps*100)}% caps · ${emoji} emoji`);
 push("short","Too short to be personal",tokens===0?0:tokens<6?80:tokens<12?40:5,`${tokens} words — aim for 12+ with details`);
 // personal-detail detectors (lower the score)
 const dates=cnt(/\d{1,2}[\/-]\d{1,2}([\/-]\d{2,4})?|\b(19|20)\d{2}\b|jan|feb|mar|apr|mei|jun|jul|agu|sep|okt|nov|des/gi,text);
 const coords=cnt(/-?\d+\.\d+/g,text);
 const quoted=cnt(/"[^"]+"|'[^']+'/g,text);
 const names=cnt(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\b/g,text);
 const personal=Math.min(4,dates+coords+quoted+Math.min(2,names>2?2:0));
 push("personal","Personal details (lowers score)",Math.max(0,70-personal*25),`${dates} dates · ${coords} coordinates · ${quoted} quoted details · names present`);
 const w={cliche:30,vague:22,spam:14,short:18,personal:16};
 let t=0,s=0;for(const g of sigs){t+=g.value*(w[g.id]||0);s+=w[g.id]||0}
 let score=Math.round(t/(s||1));
 if(cl.length>=4||(cl.length>=2&&emoji>=4))score=Math.max(score,65);
 if(tokens>0&&tokens<6&&personal===0)score=Math.max(score,62);
 score=Math.min(100,score);
 return{score,verdict:score<=30?"ORIGINAL":score<=60?"GENERIC":"SLOP",sigs,tokens};
}
const BSAMPLES={
 original:"Half-heart line art split across two cases, our initials A & B, coordinates -6.2, 110.4 where we first met, date \"14 Feb 2023\", thin maroon border with small kawung pattern",
 generic:"something cute aesthetic for couple, yang bagus and trending",
 slop:"BEAUTIFUL STUNNING BREATHTAKING AESTHETIC COUPLE GOALS 🔥🔥🔥🔥 #viral #fyp love is amazing!!!"
};
function bcolor(v){return v==="ORIGINAL"?"#15803d":v==="GENERIC"?"#b45309":v==="SLOP"?"#E11D48":"#888"}
function renderBrief(r){
 const s=document.getElementById("briefScore");if(!s)return;
 s.textContent=r.tokens?r.score+"/100":"--";
 const v=document.getElementById("briefVerdict");
 v.textContent=r.tokens?(r.verdict==="ORIGINAL"?"ORIGINAL ♥":r.verdict==="GENERIC"?"GENERIC ⚠":"SLOP ⛔"):"WAITING";
 v.style.color=bcolor(r.verdict);
 document.getElementById("briefMeta").textContent=r.tokens?r.tokens+" words · studio standard: ORIGINAL only": "paste your design brief…";
 document.getElementById("briefSigs").innerHTML=r.sigs.map(g=>`<div class="sig"><div class="sig-top"><span>${g.label}</span><span>${g.value}</span></div><div class="bar"><i style="width:${g.value}%;background:${g.value>60?"#E11D48":g.value>30?"#d97706":"#15803d"}"></i></div><small>${g.detail}</small></div>`).join("");
 const tip=document.getElementById("briefTip");
 if(!r.tokens)tip.textContent="Tip: names, a date, a place, or coordinates turn any brief from generic to yours.";
 else if(r.verdict==="ORIGINAL")tip.textContent="♥ This brief is personal enough — send it to the studio above.";
 else if(r.verdict==="GENERIC")tip.textContent="Add one personal detail (a date, place, or inside joke in quotes) to make it yours.";
 else tip.textContent="⛔ Too generic to print — our designers would reject this. Rewrite with real details.";
}
document.addEventListener("DOMContentLoaded",()=>{
 const inp=document.getElementById("briefInput");if(!inp)return;
 const upd=()=>renderBrief(analyzeBrief(inp.value));
 inp.addEventListener("input",upd);
 document.querySelectorAll(".bchip").forEach(b=>b.addEventListener("click",()=>{inp.value=BSAMPLES[b.dataset.sample]||"";upd();inp.focus()}));
 renderBrief(analyzeBrief(""));
});
