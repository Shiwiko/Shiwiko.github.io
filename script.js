let score = 0, clickPower = 1, autoClickers = 0, totalClicks = 0;
let clickPrice = 10, autoPrice = 50;
let title = "Novice";

// PROFIL
const scoreEl = document.getElementById("score");
const cookie = document.getElementById("cookie");
const pScore = document.getElementById("pScore");
const pClicks = document.getElementById("pClicks");
const pPower = document.getElementById("pPower");
const pAuto = document.getElementById("pAuto");
const pTitle = document.getElementById("pTitle");

// COOKIE CLICK
cookie.onclick = e => {
score += clickPower;
totalClicks++;
vibrate();
floatText(`+${clickPower}`, e.clientX, e.clientY);
update();
save();
};

// FLOAT TEXT
function floatText(txt,x,y){
const s=document.createElement("span");
s.className="float";
s.textContent=txt;
s.style.left=x+"px";
s.style.top=y+"px";
document.body.appendChild(s);
setTimeout(()=>s.remove(),1000);
}

// SHOP
upgradeClick.onclick=()=>{
if(score>=clickPrice){
score-=clickPrice;
clickPower++;
clickPrice=Math.floor(clickPrice*1.5);
update();save();
}};
buyAuto.onclick=()=>{
if(score>=autoPrice){
score-=autoPrice;
autoClickers++;
autoPrice=Math.floor(autoPrice*1.6);
update();save();
}};

// AUTO
setInterval(()=>{
score+=autoClickers;
update();save();
},1000);

// TITRES
document.querySelectorAll(".titleBtn").forEach(b=>{
b.onclick=()=>{
let p=+b.dataset.price;
if(score>=p){
score-=p;
title=b.dataset.title;
update();save();
}}});

// QUÊTE JOURNALIÈRE
let questClicks = Math.floor(Math.random()*100)+50;
let questReward = questClicks*2;
let done = false;
questText.textContent=`Clique ${questClicks} fois (${questReward} cookies)`;

claimQuest.onclick=()=>{
if(!done && totalClicks>=questClicks){
score+=questReward;
done=true;
claimQuest.disabled=true;
claimQuest.textContent="✔ Complétée";
save();
}};

// UPDATE
function update(){
scoreEl.textContent=score;
pScore.textContent=score;
pClicks.textContent=totalClicks;
pPower.textContent=clickPower;
pAuto.textContent=autoClickers;
pTitle.textContent=title;
}

// SAVE
function save(){
localStorage.setItem("galaxySave",JSON.stringify({
score,clickPower,autoClickers,totalClicks,clickPrice,autoPrice,title,done
}));
}

// LOAD
const s=JSON.parse(localStorage.getItem("galaxySave"));
if(s){
Object.assign({score,clickPower,autoClickers,totalClicks,clickPrice,autoPrice,title,done},s);
update();
}

// VIBRATION
function vibrate(){
if(navigator.vibrate) navigator.vibrate(20);
}
