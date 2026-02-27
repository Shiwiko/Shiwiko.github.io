let score = 0;
let clickPower = 1;
let autoClickers = 0;

let clickPrice = 10;
let autoPrice = 50;

let currentTitle = "Novice Cookie";

// Quête
let questClicks = 50;
let questReward = 100;
let questDone = false;
let clicksToday = 0;

// HTML
const scoreEl = document.getElementById("score");
const cookie = document.getElementById("cookie");
const clickPriceEl = document.getElementById("clickPrice");
const autoPriceEl = document.getElementById("autoPrice");
const currentTitleEl = document.getElementById("currentTitle");
const questText = document.getElementById("questText");
const claimQuestBtn = document.getElementById("claimQuest");

// --- Cookie click ---
cookie.addEventListener("click", () => {
    score += clickPower;
    clicksToday++;
    update();
    saveGame();
});

// --- Upgrade click ---
document.getElementById("upgradeClick").addEventListener("click", () => {
    if (score >= clickPrice) {
        score -= clickPrice;
        clickPower++;
        clickPrice = Math.floor(clickPrice * 1.5);
        update();
        saveGame();
    }
});

// --- Auto clicker ---
document.getElementById("buyAuto").addEventListener("click", () => {
    if (score >= autoPrice) {
        score -= autoPrice;
        autoClickers++;
        autoPrice = Math.floor(autoPrice * 1.6);
        update();
        saveGame();
    }
});

// --- Titres ---
document.querySelectorAll(".buyTitle").forEach(btn => {
    btn.addEventListener("click", () => {
        let price = Number(btn.dataset.price);
        let title = btn.dataset.title;

        if (score >= price) {
            score -= price;
            currentTitle = title;
            update();
            saveGame();
        }
    });
});

// --- Auto clicks ---
setInterval(() => {
    score += autoClickers;
    update();
    saveGame();
}, 1000);

// --- Quête ---
claimQuestBtn.addEventListener("click", () => {
    if (!questDone && clicksToday >= questClicks) {
        score += questReward;
        questDone = true;
        claimQuestBtn.disabled = true;
        claimQuestBtn.textContent = "Quête complétée";
        saveGame();
    }
});

// --- Update UI ---
function update() {
    scoreEl.textContent = score;
    clickPriceEl.textContent = clickPrice;
    autoPriceEl.textContent = autoPrice;
    currentTitleEl.textContent = currentTitle;

    if (clicksToday >= questClicks && !questDone) {
        claimQuestBtn.style.background = "green";
        claimQuestBtn.style.color = "white";
    }
}

// --- Save / Load ---
function saveGame() {
    localStorage.setItem("cookieSave", JSON.stringify({
        score, clickPower, autoClickers,
        clickPrice, autoPrice,
        currentTitle,
        questDone, clicksToday
    }));
}

function loadGame() {
    let save = JSON.parse(localStorage.getItem("cookieSave"));
    if (!save) return;

    score = save.score;
    clickPower = save.clickPower;
    autoClickers = save.autoClickers;
    clickPrice = save.clickPrice;
    autoPrice = save.autoPrice;
    currentTitle = save.currentTitle;
    questDone = save.questDone;
    clicksToday = save.clicksToday;

    if (questDone) {
        claimQuestBtn.disabled = true;
        claimQuestBtn.textContent = "Quête complétée";
    }
    update();
}

loadGame();