(() => {
const cfg=window.NA_WEDDING||{},$=id=>document.getElementById(id);
const screens=[...document.querySelectorAll(".screen")];let active=0,startX=0,startY=0,wheelBusy=false;
const music=$("weddingMusic"),musicBtn=$("musicToggle"),apiReady=cfg.API_URL&&!cfg.API_URL.includes("PASTE_");
function toast(t){const el=$("toast");el.textContent=t;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2500)}
function show(i){active=Math.max(0,Math.min(screens.length-1,i));screens.forEach((s,n)=>s.classList.toggle("active",n===active));[...$("sectionDots").children].forEach((d,n)=>d.classList.toggle("active",n===active));$("sectionCount").textContent=String(active+1).padStart(2,"0")+" / "+String(screens.length).padStart(2,"0")}
screens.forEach((s,i)=>{const d=document.createElement("button");d.setAttribute("aria-label",s.dataset.title);d.onclick=()=>show(i);$("sectionDots").append(d)});
$("prevSection").onclick=()=>show(active-1);$("nextSection").onclick=()=>show(active+1);
$("openInvitation").onclick=async()=>{show(1);try{await music.play()}catch(e){}};
musicBtn.onclick=async()=>{try{if(music.paused)await music.play();else music.pause()}catch(e){toast("Tambahkan file assets/music/wedding.mp3 terlebih dahulu.")}};
music.onplay=()=>musicBtn.classList.add("playing");music.onpause=()=>musicBtn.classList.remove("playing");
const root=$("invitation");root.addEventListener("touchstart",e=>{startX=e.changedTouches[0].screenX;startY=e.changedTouches[0].screenY},{passive:true});
root.addEventListener("touchend",e=>{const dx=e.changedTouches[0].screenX-startX,dy=e.changedTouches[0].screenY-startY;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.1)show(active+(dx<0?1:-1))},{passive:true});
root.addEventListener("wheel",e=>{if(Math.abs(e.deltaY)<20||wheelBusy)return;wheelBusy=true;show(active+(e.deltaY>0?1:-1));setTimeout(()=>wheelBusy=false,650)},{passive:true});
document.addEventListener("keydown",e=>{if(e.key==="ArrowRight"||e.key==="PageDown")show(active+1);if(e.key==="ArrowLeft"||e.key==="PageUp")show(active-1)});
const target=new Date(cfg.weddingDate||"2027-04-02T08:00:00+07:00").getTime();
function tick(){let d=Math.max(0,target-Date.now()),days=Math.floor(d/86400000);d%=86400000;let h=Math.floor(d/3600000);d%=3600000;let m=Math.floor(d/60000);d%=60000;$("days").textContent=String(days).padStart(3,"0");$("hours").textContent=String(h).padStart(2,"0");$("minutes").textContent=String(m).padStart(2,"0");$("seconds").textContent=String(Math.floor(d/1000)).padStart(2,"0")}tick();setInterval(tick,1000);
if(cfg.venue){$("venueName").textContent=cfg.venue.name;$("venueAddress").textContent=cfg.venue.address;$("mapLink").href=cfg.venue.mapsUrl;$("mapButton").href=cfg.venue.mapsUrl}
if(cfg.gift){$("bankName").textContent=cfg.gift.bank;$("accountNumber").textContent=cfg.gift.accountNumber;$("accountHolder").textContent=cfg.gift.accountHolder}
const guest=new URLSearchParams(location.search).get("to");if(guest)$("guestName").textContent=guest;
async function api(action,data={}){if(!apiReady)throw Error("Hubungkan URL Apps Script di config.js terlebih dahulu.");let r=action==="getWishes"?await fetch(cfg.API_URL+"?action=getWishes"):await fetch(cfg.API_URL,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({action,...data})});return r.json()}
$("rsvpForm").onsubmit=async e=>{e.preventDefault();const s=$("rsvpStatus");s.textContent="Mengirim...";try{const r=await api("saveRsvp",Object.fromEntries(new FormData(e.target)));if(!r.success)throw Error(r.message);s.textContent="Terima kasih, konfirmasi berhasil dikirim.";e.target.reset()}catch(err){s.textContent=err.message}};
$("wishForm").onsubmit=async e=>{e.preventDefault();const s=$("wishStatus");s.textContent="Mengirim...";try{const r=await api("saveWish",Object.fromEntries(new FormData(e.target)));if(!r.success)throw Error(r.message);s.textContent="Ucapan berhasil dikirim.";e.target.reset();loadWishes()}catch(err){s.textContent=err.message}};
async function loadWishes(){if(!apiReady)return;try{const r=await api("getWishes");$("wishList").replaceChildren();(r.wishes||[]).slice(0,5).forEach(w=>{const a=document.createElement("article"),b=document.createElement("b"),p=document.createElement("p");b.textContent=w.name;p.textContent=w.message;a.append(b,p);$("wishList").append(a)})}catch(e){}}
$("copyAccount").onclick=async()=>{const n=cfg.gift?.accountNumber||"";if(!n||n.includes("ISI_"))return toast("Isi nomor rekening di config.js.");try{await navigator.clipboard.writeText(n);toast("Nomor rekening disalin.")}catch(e){toast("Tidak dapat menyalin nomor rekening.")}};
show(0);loadWishes();setTimeout(()=>$("preloader").classList.add("hide"),450);
})();