const pages = {
  overview: ["Overview", "Conveyor Health Overview"],
  conveyor: ["Conveyor Health", "Conveyor Health"],
  zones: ["Zone Monitoring", "Zone Monitoring"],
  inspection: ["AI Inspection", "AI Inspection"],
  alerts: ["Alerts", "Alerts & Predictions"],
  maintenance: ["Maintenance", "Maintenance Planner"]
};

const navItems = document.querySelectorAll(".nav-item");
const pageEls = document.querySelectorAll(".page");
const pageName = document.getElementById("pageName");
const pageTitle = document.getElementById("pageTitle");

function goTo(page){
  if(!pages[page]) return;
  pageEls.forEach(p => p.classList.toggle("active-page", p.id === page));
  navItems.forEach(n => n.classList.toggle("active", n.dataset.page === page));
  pageName.textContent = pages[page][0];
  pageTitle.textContent = pages[page][1];
  window.scrollTo({top:0, behavior:"smooth"});
}
navItems.forEach(n => n.addEventListener("click", () => goTo(n.dataset.page)));
document.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => goTo(b.dataset.go)));

function updateClock(){
  const d = new Date();
  document.getElementById("clock").textContent =
    d.toLocaleTimeString("en-IN",{hour12:false});
}
updateClock(); setInterval(updateClock,1000);

// Lightweight SVG telemetry chart: no external libraries required.
function drawChart(){
  const svg = document.getElementById("telemetryChart");
  if(!svg) return;
  const w=900,h=260,p=18;
  const load=[63,65,64,66,67,68,69,71,70,73,72,74,73,76,78,77,80,79,82,81,83,84,82,84,85,84,85,86,85,85];
  const rpm=[1482,1480,1485,1479,1481,1483,1480,1478,1482,1481,1479,1480,1477,1481,1479,1483,1480,1478,1481,1479,1482,1479,1480,1478,1479,1480,1481,1480,1479,1480];
  const sx=i=>p+i*(w-2*p)/(load.length-1);
  const sy=v=>h-p-(v-50)*(h-2*p)/50;
  const sy2=v=>h-p-(v-1460)*(h-2*p)/40;
  let out="";
  [20,70,120,170,220].forEach(y=>out+=`<line x1="${p}" y1="${y}" x2="${w-p}" y2="${y}" stroke="#e9eef4" stroke-width="1"/>`);
  const loadPath=load.map((v,i)=>(i?"L":"M")+`${sx(i)},${sy(v)}`).join(" ");
  const area=loadPath+` L ${sx(load.length-1)},${h-p} L ${sx(0)},${h-p} Z`;
  const rpmPath=rpm.map((v,i)=>(i?"L":"M")+`${sx(i)},${sy2(v)}`).join(" ");
  out+=`<path d="${area}" fill="#dce9fc" opacity=".7"/>`;
  out+=`<path d="${loadPath}" fill="none" stroke="#4b8bf5" stroke-width="3" stroke-linecap="round"/>`;
  out+=`<path d="${rpmPath}" fill="none" stroke="#22ad86" stroke-width="2.5" stroke-linecap="round"/>`;
  out+=`<line x1="${sx(load.length-1)}" y1="${p}" x2="${sx(load.length-1)}" y2="${h-p}" stroke="#e3a536" stroke-dasharray="4 5"/>`;
  out+=`<circle cx="${sx(load.length-1)}" cy="${sy(load.at(-1))}" r="5" fill="#fff" stroke="#4b8bf5" stroke-width="3"/>`;
  svg.innerHTML=out;
}
drawChart();

function toast(message){
  const t=document.getElementById("toast");
  document.getElementById("toastText").textContent=message;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),2600);
}

document.getElementById("simulateBtn").addEventListener("click",()=>{
  const rpm=1480+Math.floor(Math.random()*25-10);
  const power=83+Math.floor(Math.random()*7);
  const risk=Math.max(7,Math.min(25,12+Math.floor(Math.random()*9-4)));
  document.getElementById("rpmValue").textContent=rpm.toLocaleString();
  document.getElementById("powerValue").textContent=power+"%";
  document.getElementById("riskValue").textContent=risk+"%";
  document.getElementById("healthScore").textContent=Math.max(88,97-risk);
  toast("Live sensor telemetry refreshed.");
});

document.getElementById("runScan")?.addEventListener("click",()=>{
  toast("New THz inspection started. Results will appear in the inspection panel.");
  const btn=document.getElementById("runScan");
  btn.textContent="Inspection running…";
  btn.disabled=true;
  setTimeout(()=>{btn.textContent="Inspection complete ✓";btn.disabled=false;},2200);
});

document.querySelectorAll(".schedule").forEach(btn=>{
  btn.addEventListener("click",()=>{
    btn.textContent="Scheduled ✓";
    btn.classList.add("done");
    toast("Maintenance task added to the schedule.");
  });
});

document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    toast("Alert filter applied.");
  });
});

document.querySelectorAll(".secondary-btn").forEach(btn=>{
  if(btn.textContent.trim()==="Acknowledge"){
    btn.addEventListener("click",()=>{
      btn.textContent="Acknowledged ✓";
      toast("Alert acknowledged by operator.");
    });
  }
});
