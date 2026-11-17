const PRICE={S:1000,A:800,B:550,C:300,D:100};
const SEED=[
 {id:1,title:"The Legend of Zelda: A Link to the Past",platform:"SNES",tier:"S",art:"ZELDA"},
 {id:2,title:"Chrono Trigger",platform:"SNES",tier:"S",art:"CHRONO"},
 {id:3,title:"Super Mario World",platform:"SNES",tier:"A",art:"MARIO"},
 {id:4,title:"Castlevania: Symphony of the Night",platform:"PS1",tier:"S",art:"CASTLE"},
 {id:5,title:"Sonic the Hedgehog 2",platform:"Mega Drive",tier:"A",art:"SONIC"},
 {id:6,title:"Pokémon Emerald",platform:"GBA",tier:"A",art:"POKÉMON"},
 {id:7,title:"Banjo-Kazooie",platform:"Nintendo 64",tier:"A",art:"BANJO"},
 {id:8,title:"Crazy Taxi",platform:"Dreamcast",tier:"B",art:"TAXI"},
 {id:9,title:"God of War",platform:"PS2",tier:"S",art:"GOD OF WAR"},
 {id:10,title:"Metroid Fusion",platform:"GBA",tier:"B",art:"METROID"},
 {id:11,title:"Tetris",platform:"Game Boy",tier:"C",art:"TETRIS"},
 {id:12,title:"Daxter",platform:"PSP",tier:"B",art:"DAXTER"}
];
const KEY="dcgamestore_v1";
let state=JSON.parse(localStorage.getItem(KEY)||"null")||{balance:2000,owned:[],active:[],transactions:[{id:1,description:"Saldo inicial",amount:2000,date:new Date().toISOString()}],edition:new Date().toISOString().slice(0,7)};
function save(){localStorage.setItem(KEY,JSON.stringify(state));render()}
function money(n){return Number(n).toLocaleString("pt-BR")}
function toast(msg){const el=document.getElementById("toast");el.textContent=msg;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2300)}
function gamePrice(g){return PRICE[g.tier]}
function buy(id){const g=SEED.find(x=>x.id===id);if(state.owned.includes(id))return toast("Você já possui este jogo.");if(state.balance<gamePrice(g))return toast("Saldo insuficiente.");state.balance-=gamePrice(g);state.owned.push(id);state.transactions.unshift({id:Date.now(),description:"Compra: "+g.title,amount:-gamePrice(g),date:new Date().toISOString()});save();toast("Compra realizada!")}
function activate(id){if(state.active.includes(id))return;if(state.active.length>=2)return toast("Você já tem 2 jogos ativos.");if(!state.owned.includes(id))return;state.active.push(id);save();toast("Jogo ativado!")}
function finish(id){state.active=state.active.filter(x=>x!==id);save();toast("Jogo removido dos ativos.")}
let currentFilter="Todos";
function renderStore(){const grid=document.getElementById("gameGrid");const list=SEED.filter(g=>currentFilter==="Todos"||g.tier===currentFilter);grid.innerHTML=list.map(g=>`<article class="game-card"><div class="game-art">${g.art}</div><div class="game-info"><span class="game-platform">${g.platform.toUpperCase()}</span><h3>${g.title}</h3><div class="game-meta"><span>Categoria ${g.tier}</span><strong class="price">${money(gamePrice(g))} D.C$</strong></div><button class="buy-btn" data-buy="${g.id}" ${state.owned.includes(g.id)?"disabled":""}>${state.owned.includes(g.id)?"ADQUIRIDO":"COMPRAR JOGO"}</button></div></article>`).join("")}
function renderLibrary(){const active=document.getElementById("activeGames"),owned=document.getElementById("ownedGames");const activeGames=SEED.filter(g=>state.active.includes(g.id));active.innerHTML=activeGames.length?activeGames.map(g=>`<div class="list-card"><div class="mini-art">${g.art.slice(0,5)}</div><div class="list-main"><strong>${g.title}</strong><small>${g.platform} · Em andamento</small></div><button class="small-btn" data-finish="${g.id}">Finalizar</button></div>`).join(""):'<div class="empty">Você ainda não tem jogos ativos.</div>';const ownedGames=SEED.filter(g=>state.owned.includes(g.id));owned.innerHTML=ownedGames.length?ownedGames.map(g=>`<div class="list-card"><div class="mini-art">${g.art.slice(0,5)}</div><div class="list-main"><strong>${g.title}</strong><small>${g.platform} · Categoria ${g.tier}</small></div>${state.active.includes(g.id)?'<span class="pill">ATIVO</span>':`<button class="small-btn" data-activate="${g.id}">Ativar</button>`}</div>`).join(""):'<div class="empty">Seus jogos comprados aparecerão aqui.</div>'}
function renderWallet(){document.getElementById("transactions").innerHTML=state.transactions.map(t=>`<div class="list-card"><div class="list-main"><strong>${t.description}</strong><small>${new Date(t.date).toLocaleDateString("pt-BR")}</small></div><b class="${t.amount>=0?'tx-positive':'tx-negative'}">${t.amount>=0?'+':''}${money(t.amount)} D.C$</b></div>`).join("")||'<div class="empty">Nenhuma movimentação.</div>'}
function render(){document.getElementById("balance").textContent=money(state.balance);document.getElementById("walletBalance").textContent=money(state.balance)+" D.C$";document.getElementById("activeCount").textContent=state.active.length+"/2";document.getElementById("seasonLabel").textContent=String(new Date().getMonth()+1).padStart(2,"0");document.getElementById("editionDate").textContent=new Date(state.edition+"-02").toLocaleDateString("pt-BR",{month:"short",year:"numeric"}).toUpperCase();renderStore();renderLibrary();renderWallet()}
function switchTab(tab){document.querySelectorAll(".view").forEach(v=>v.hidden=true);document.getElementById(tab+"View").hidden=false;document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active",b.dataset.tab===tab));document.querySelectorAll(".bottom-item").forEach(b=>b.classList.toggle("selected",b.dataset.tab===tab))}
document.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;if(b.dataset.tab)switchTab(b.dataset.tab);if(b.dataset.buy)buy(Number(b.dataset.buy));if(b.dataset.activate)activate(Number(b.dataset.activate));if(b.dataset.finish)finish(Number(b.dataset.finish));if(b.dataset.filter){currentFilter=b.dataset.filter;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderStore()}});
document.getElementById("addReward").addEventListener("click",()=>{const desc=document.getElementById("txDescription").value.trim();const amount=Number(document.getElementById("txAmount").value);if(!desc||!Number.isFinite(amount)||amount<=0)return toast("Preencha a descrição e um valor válido.");state.balance+=amount;state.transactions.unshift({id:Date.now(),description:desc,amount,date:new Date().toISOString()});document.getElementById("txDescription").value="";document.getElementById("txAmount").value="";save();toast("Recompensa adicionada!")});
let installPrompt;window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();installPrompt=e;const btn=document.getElementById("installBtn");btn.hidden=false;btn.onclick=async()=>{installPrompt.prompt();installPrompt=null;btn.hidden=true}});
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
render();