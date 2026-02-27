let score = 0;
let clickPower = 1;
let autoClickers = 0;
let totalClicks = 0;

let clickPrice = 10;
let autoPrice = 50;

const scoreEl = document.getElementById("score");
const cookie = document.getElementById("cookie");

// Profil
const pScore = document.getElementById("pScore");
const pClicks = document.getElementById("pClicks");
const pPower = document.getElementById("pPower");
const pAuto = document.getElementById("pAuto");

// Cookie click
cookie.addEventListener("click", (e) => {
    score += clickPower;
    totalClicks++;

    showFloat(`+${clickPower}`, e.clientX, e.clientY);
    update();
    save();
});

// Effet visuel
function showFloat(text, x, y) {
    const span = document.createElement("span");
    span.className = "floatText";
    span.textContent = text;
    span.style.left = x + "px";
    span.style.top = y + "px";
    document.body.appendChild(span);

    setTimeout(() => span.remove(), 1000);
}

// Upgrades
document.getElementById("upgradeClick").onclick = () => {
    if (score >= clickPrice) {
        score -= clickPrice;
        clickPower++;
        clickPrice = Math.floor(clickPrice * 1.5);
        update();
        save();
    }
};

document.getElementById("buyAuto").onclick = () => {
    if (score >= autoPrice) {
        score -= autoPrice;
        autoClickers++;
        autoPrice = Math.floor(autoPrice * 1.6);
        update();
        save();
    }
};

// Auto click
setInterval(() => {
    score += autoClickers;
    update();
    save();
}, 1000);

// Update UI
function update() {
    scoreEl.textContent = score;

    pScore.textContent = score;
    pClicks.textContent = totalClicks;
    pPower.textContent = clickPower;
    pAuto.textContent = autoClickers;
}

// Save / Load
function save() {
    localStorage.setItem("galaxyCookieSave", JSON.stringify({
        score, clickPower, autoClickers, totalClicks, clickPrice, autoPrice
    }));
}

function load() {
    const save = JSON.parse(localStorage.getItem("galaxyCookieSave"));
    if (!save) return;

    score = save.score;
    clickPower = save.clickPower;
    autoClickers = save.autoClickers;
    totalClicks = save.totalClicks;
    clickPrice = save.clickPrice;
    autoPrice = save.autoPrice;
    update();
}

load();
