const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1516868901424726257/KbE6GMYT7LEPVKlxTmmhpdpU2H8MB-fImLF50V10hnTWYWKR5jDk0n6o21vBQvp4JBlh";

// SYSTEM STATES (UPDATED WITH USED GIFT CODES)
let currentTokens = parseInt(localStorage.getItem('pyaarTokens')) || 5; 
let currentStreak = parseInt(localStorage.getItem('loveStreak')) || 0;
let lastLoginDate = localStorage.getItem('lastLoginDate') || "";
let missYouCount = parseInt(localStorage.getItem('missYouCount')) || 0;
let lastMissYouDate = localStorage.getItem('lastMissYouDate') || "";
let calendarMemory = JSON.parse(localStorage.getItem('calendarMemory')) || {};
let usedGiftCodes = JSON.parse(localStorage.getItem('usedGiftCodes')) || [];

// UI Variables
let activeDateOpen = null;
let wheelSpinningState = false;
let rotationAngle = 0;
let correctLockIndex = Math.floor(Math.random() * 5);
let itemsTappedScore = 0;
const canvas = document.getElementById('scrapbookCanvas');
const ctx = canvas.getContext('2d');
let trailHearts = [];

// ==========================================
// INFINITE CONTENT REPOSITORY
// ==========================================
const CYCLES = {
    A: [
        { dare: "Chupke se unke paas jao aur bolo 'Mujhe aapse ek pyaari kiss chahiye!' 💋", alt: "Watch 'Barfi' tonight." },
        { dare: "Aaj 2-3 PM ke beech unhe dheere se unke right cheek par ek sweet kiss do! 😘", alt: "Listen to 'Kesariya' on call." },
        { dare: "Ek cute voice note bhejo aur bolo ki woh aapke liye kitni special hain! 🧸", alt: "Send 3 cute selfies right now!" },
        { dare: "Unhe call karke unki sabse kaatilana adaa ki tareef karo! 👑", alt: "Sing 4 lines of a romantic song!" },
        { dare: "Unhe bolo apni aankhein band karein aur unke forehead par kiss karo. 💖", alt: "Watch 'Jab We Met' today." }
    ],
    B: [
        { dare: "Unka haath zor se pakdo aur bolo 'Main hamesha aapke saath hoon' 🥺", alt: "Text 'You are mine' 5 times!" },
        { dare: "2-3 PM ke beech unhe ek pyaari si jhapki do aur kiss maango! 🤗", alt: "Order dessert & share pic." },
        { dare: "Unhe unki pasandida chocolate gift karo aur smile dekho. 🍫", alt: "Tell him when you fell in love." },
        { dare: "Dono aankhon mein dekh kar bolo 'I love you infinity times Abhi'! ♾️", alt: "Pinky promise to hold hands." },
        { dare: "Video call par ek lambi flying kiss do aur smile karo! 📞", alt: "Watch 'Tamasha' virtual sync." }
    ]
};

const LETTERS = [
    "Meri Pyaari Shweta,\n\nYeh hafta aapke naam. Mujhe aaj bhi yaad hai jab maine aapko pehli baar dekha tha—woh lamha mere dil me bas gaya hai. Jab aap paas hoti ho toh waqt tham sa jata hai. Koi hai jo aapse infinity times pyaar karta hai.\n\nHamesha Aapka,\nAbhi ❤️",
    "Shweta, Meri Jaan,\n\nYeh naya hafta hamari dosti aur is gehre rishte ke naam. Mujhe aapke nakhre aur gussa hona sabse pyaara lagta hai! Aapka gussa bhi itna masoom hai ki mera dil fida ho jata hai.\n\nHamesha Aapka,\nAbhi ❤️",
    "My Beautiful Princess,\n\nLife can get chaotic, but knowing I have you makes everything worth it. You are my safe space, my comfort zone, and my favorite thought.\n\nForever Yours,\nAbhi ❤️"
];

const QUIZZES = [
    { q: "Hum jab pehli baar mile the, maine kaunse color ki shirt pehni thi?", a: ["Black 🖤", "White 🤍", "Blue 💙"], correct: 0 },
    { q: "Aapka kaunsa nakhra mujhe sabse zyada cute lagta hai?", a: ["Baat na karne ki acting", "Smile chupana", "Gusse me muh phulana 😤"], correct: 2 },
    { q: "What is the one thing that instantly fixes Abhi's bad mood?", a: ["Voice note from you 🎙️", "Spicy food", "Sleeping"], correct: 0 }
];

let dailyTaskObj = {};
let dailyQuiz = {};
let dailyLetter = "";

// ==========================================
// CORE TOKEN ECONOMY LOGIC
// ==========================================
function checkTokenBalance(cost) {
    if (currentTokens - cost < 5) {
        alert(`Action Denied! Cost is ${cost} tokens, but you must maintain a minimum of 5 Love Tokens. Abhi se bolo Token ke liye! 🥺`);
        return false;
    }
    return true;
}

function deductTokens(cost, reasonText) {
    currentTokens -= cost;
    localStorage.setItem('pyaarTokens', currentTokens);
    document.getElementById('token-count').innerText = currentTokens;
    logDiscord(`🪙 Token Spent: -${cost}`, reasonText);
}

function addTokens(amount, reasonText) {
    currentTokens += amount;
    localStorage.setItem('pyaarTokens', currentTokens);
    document.getElementById('token-count').innerText = currentTokens;
    logDiscord(`✨ Tokens Gained: +${amount}`, reasonText);
}

// SECRET ADMIN OVERRIDE
function triggerSecretAdminRefill() {
    const overrideInput = prompt("System Sync: Override Node:");
    if (!overrideInput) return;
    const match = overrideInput.trim().toUpperCase().match(/^T(\d+)S$/);
    if (match) {
        const val = parseInt(match[1]);
        addTokens(val, `Admin manually injected ${val} Love Tokens.`);
        alert(`System Synced! Credited ${val} Tokens.`);
    }
}

// ==========================================
// FIX: ENCRYPTED REMOTE HASH SYSTEM
// ==========================================
function redeemGiftCode() {
    const codeInput = prompt("System Sync: Paste the authorization hash provided by Abhi 🔐");
    if (!codeInput) return;

    // Convert to uppercase to avoid case-sensitivity issues if she copies it weirdly
    const code = codeInput.trim().toUpperCase();
    
    // 1. Anti-Cheat: Check if she already used this specific hash
    if (usedGiftCodes.includes(code)) {
        alert("Arey! Yeh hash toh aap pehle hi use kar chuki ho. Smart banne ki koshish nahi! 😉");
        return;
    }

    // 2. The Decryption Logic
    // This strictly looks for "SA03HB09WH0402EITSAHT" + any numbers + "SEK"
    const match = code.match(/^SA03HB09WH0402EITSAHT(\d+)SEK$/);
    
    if (match) {
        // match[1] extracts exactly whatever numbers are between the prefix and suffix
        const amount = parseInt(match[1]);
        
        // Add tokens, save the code as used, and notify Discord
        currentTokens += amount;
        localStorage.setItem('pyaarTokens', currentTokens);
        document.getElementById('token-count').innerText = currentTokens;
        
        usedGiftCodes.push(code);
        localStorage.setItem('usedGiftCodes', JSON.stringify(usedGiftCodes));
        
        logDiscord("🔐 Secret Hash Redeemed!", `Shweta successfully used a hashed code and extracted **${amount} Love Tokens**!`);
        alert(`Access Granted! 🎉 ${amount} Love Tokens instantly added to your wallet!`);
    } else {
        alert("Invalid Hash! 🥺 Dhyan se copy-paste karo ya Abhi se naya code maango.");
    }
}

// ==========================================
// WEBHOOK & TELEMETRY
// ==========================================
async function logDiscord(title, desc) {
    const payload = {
        username: "Scrapbook Bot 👑",
        embeds: [{
            title: title, description: desc, color: 14897365,
            fields: [
                { name: "Wallet Balance", value: `${currentTokens} Love Tokens 🪙`, inline: true },
                { name: "Streak", value: `${currentStreak} Days 🔥`, inline: true }
            ]
        }]
    };
    try { await fetch(DISCORD_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); } catch(e) {}
}

// ==========================================
// FEATURE: I MISS YOU BUTTON
// ==========================================
function triggerMissYou() {
    const todayStr = new Date().toDateString();
    if (lastMissYouDate !== todayStr) { missYouCount = 0; lastMissYouDate = todayStr; }
    
    missYouCount++;
    localStorage.setItem('missYouCount', missYouCount);
    localStorage.setItem('lastMissYouDate', todayStr);

    logDiscord("🥺 I Miss You Pressed!", `Shweta just pressed the 'I Miss You' button! (Daily Count: ${missYouCount})`);

    if (missYouCount > 10) { alert("Abhi ab apni baby ko video call karenge! 📹💕"); }
    else if (missYouCount > 5) { alert("Abhi ab apni baby ko call karenge! 📞💕"); }
    else { alert("Message sent to Abhi! He misses you too! 🥺"); }
}

// ==========================================
// INITIALIZATION & STREAK LOGIC
// ==========================================
function initCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
function renderCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trailHearts.forEach((h, idx) => {
        h.y -= 0.8; h.scale -= 0.015;
        if (h.scale <= 0) trailHearts.splice(idx, 1);
        ctx.font = `${20 * h.scale}px serif`; ctx.fillStyle = "rgba(217, 70, 239, " + h.scale + ")"; ctx.fillText("✨", h.x, h.y);
    });
    requestAnimationFrame(renderCanvas);
}
window.addEventListener('mousemove', (e) => { if(Math.random() < 0.05) trailHearts.push({ x: e.clientX, y: e.clientY, scale: 1 }); });

function resolveDailyContent() {
    const d = new Date();
    const cycleRef = (d.getMonth() % 2 === 0) ? CYCLES.A : CYCLES.B; 
    dailyTaskObj = cycleRef[d.getDate() % cycleRef.length];
    dailyQuiz = QUIZZES[d.getDate() % QUIZZES.length];
    dailyLetter = LETTERS[Math.floor(d.getDate() / 7) % LETTERS.length];
}

window.onload = () => {
    resolveDailyContent(); initCanvas(); renderCanvas();
    setupTargetGrid();
    document.getElementById('wallet-badge').addEventListener('click', triggerSecretAdminRefill);
};

// ==========================================
// SCREENS & GATES
// ==========================================
function setupTargetGrid() {
    const space = document.getElementById('collage-game-container'); space.innerHTML = "";
    const items = ["🌸", "🎈", "🧸", "💌", "⭐"];
    for(let i=0; i<5; i++) {
        const leaf = document.createElement('div'); leaf.classList.add('scrapbook-target-emoji'); leaf.innerText = items[i];
        leaf.style.left = `${Math.random() * 75 + 10}%`; leaf.style.top = `${Math.random() * 70 + 15}%`;
        gsap.to(leaf, { x: "random(-40, 40)", y: "random(-40, 40)", duration: "random(2.5, 4)", repeat: -1, yoyo: true });
        leaf.addEventListener('click', () => {
            if(leaf.style.opacity === '0.3') return;
            itemsTappedScore++;
            if (i === correctLockIndex || itemsTappedScore >= 5) {
                document.getElementById('lock-hunt-screen').classList.remove('active');
                document.getElementById('riddle-gate-screen').classList.add('active');
            } else { leaf.innerText = "❌"; leaf.style.opacity = '0.3'; }
        });
        space.appendChild(leaf);
    }
}

function verifyGateKey() {
    const input = document.getElementById('riddle-input').value.toLowerCase().trim();
    if(['shweta', 'vaishali', 'shalu'].includes(input)) {
        document.getElementById('riddle-gate-screen').classList.remove('active');
        document.getElementById('fairy-welcome-screen').classList.add('active');
    } else { document.getElementById('gate-error').innerText = "Galat jawab! Aapka hi naam toh mere dil ki chabi hai... 🌹"; }
}

function launchScrapbookDashboard() {
    if (!checkTokenBalance(1)) return;
    deductTokens(1, "Logged into the scrapbook.");

    // Streak Calculation
    const todayStr = new Date().toDateString();
    if (lastLoginDate !== todayStr) {
        const yesterdayStr = new Date(Date.now() - 86400000).toDateString();
        if (lastLoginDate === yesterdayStr) { currentStreak++; }
        else if (lastLoginDate !== "") { currentStreak = 1; }
        else { currentStreak = 1; }
        localStorage.setItem('loveStreak', currentStreak);
        localStorage.setItem('lastLoginDate', todayStr);
    }

    document.getElementById('streak-count').innerText = `${currentStreak} Day(s)`;
    document.getElementById('token-count').innerText = currentTokens;
    document.getElementById('fairy-welcome-screen').classList.remove('active');
    document.getElementById('zine-dashboard-screen').classList.add('active');

    buildCalendarGrid();
    setupQuiz();
}

function switchZineTab(panelId) {
    document.querySelectorAll('.zine-tab-panel').forEach(p => p.classList.add('hidden'));
    document.querySelectorAll('.zine-tab-link').forEach(l => l.classList.remove('active'));
    document.getElementById(panelId).classList.remove('hidden');
    event.currentTarget.classList.add('active');
}

// ==========================================
// WIDGET FEATURES
// ==========================================
function submitMoodLog(mood) {
    if (!checkTokenBalance(1)) return;
    deductTokens(1, `Logged mood: ${mood}`);
    alert(`Mood saved: ${mood} ✨`);
}

function sendDirectMessage() {
    const msg = document.getElementById('direct-msg-input').value.trim();
    if (!msg) return alert("Write a message first!");
    if (!checkTokenBalance(1)) return;
    deductTokens(1, `Sent direct message to Abhi: "${msg}"`);
    alert("Message sent to Abhi! 💌");
    document.getElementById('direct-msg-input').value = "";
}

function openEnvelopeSeal() {
    if (!checkTokenBalance(2)) return;
    deductTokens(2, "Broke the seal on the Love Letter.");
    document.getElementById('envelope-seal-btn').style.display = 'none';
    const content = document.getElementById('letter-content-render');
    content.innerText = dailyLetter;
    content.classList.remove('hidden-text');
}

// ==========================================
// CALENDAR & TASKS
// ==========================================
function buildCalendarGrid() {
    const grid = document.getElementById('zineCalendarGrid'); grid.innerHTML = "";
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const todayNum = new Date().getDate();

    for(let d=1; d<=daysInMonth; d++) {
        const stamp = document.createElement('div');
        stamp.classList.add('zine-stamp-box');
        stamp.innerText = `${d}`;

        const dateKey = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${d}`;
        const state = calendarMemory[dateKey];
        
        if (state === "accepted") { stamp.innerHTML += `<div class="stamp-status">✅</div>`; }
        else if (state === "rejected") { stamp.innerHTML += `<div class="stamp-status">❌</div>`; }

        if(d === todayNum) {
            stamp.style.borderColor = "var(--neon-blue)";
            stamp.addEventListener('click', () => openCalendarModal(d, dateKey));
        } else if (d < todayNum) {
            stamp.style.opacity = "0.7";
            stamp.addEventListener('click', () => alert("Past date locked."));
        } else {
            stamp.classList.add('locked-day');
        }
        grid.appendChild(stamp);
    }
}

function openCalendarModal(dayNum, dateKey) {
    activeDateOpen = dateKey;
    document.getElementById('modal-date-title').innerText = `Mission: Day ${dayNum}`;
    document.getElementById('modal-dare-para').innerText = dailyTaskObj.dare;
    document.getElementById('modal-alternative-para').innerText = "Alt: " + dailyTaskObj.alt;

    const actionBlock = document.getElementById('modal-action-block');
    if (calendarMemory[dateKey]) {
        actionBlock.innerHTML = `<p>Task Already ${calendarMemory[dateKey]}!</p>`;
    } else {
        document.getElementById('accept-dare-btn').innerText = `Accept (Cost: ${Math.floor(currentTokens * 0.20)} 🪙)`;
        document.getElementById('reject-dare-btn').innerText = `Reject (Cost: ${Math.floor(currentTokens * 0.80)} 🪙)`;
        actionBlock.style.display = 'block'; 
    }
    document.getElementById('zine-modal').classList.remove('hidden');
}

function commitTaskChoice(isAccepted) {
    if (!activeDateOpen) return;
    
    let cost = 0;
    if (isAccepted) {
        cost = Math.floor(currentTokens * 0.20);
        if (!checkTokenBalance(cost)) return;
        deductTokens(cost, `Accepted daily dare! Marked ✅.`);
        calendarMemory[activeDateOpen] = "accepted";
        alert(`Dare accepted! Cost ${cost} Tokens.`);
    } else {
        cost = Math.floor(currentTokens * 0.80);
        if (!checkTokenBalance(cost)) return;
        deductTokens(cost, `Rejected daily dare! Marked ❌.`);
        calendarMemory[activeDateOpen] = "rejected";
        alert(`Dare rejected! Penalty: ${cost} Tokens.`);
    }
    
    localStorage.setItem('calendarMemory', JSON.stringify(calendarMemory));
    closeZineModal();
    buildCalendarGrid(); 
}

function assignDareFromCalendar() {
    const input = document.getElementById('calendar-abhi-dare-input').value.trim();
    if (!input) return alert("Write a dare first!");
    if (!checkTokenBalance(5)) return;
    
    deductTokens(5, `Assigned Abhi a Dare: "${input}"`);
    alert("Dare sent to Abhi! Watch him squirm! 😉");
    document.getElementById('calendar-abhi-dare-input').value = "";
}

function closeZineModal() { document.getElementById('zine-modal').classList.add('hidden'); }

// ==========================================
// GAMES & STORE
// ==========================================
function setupQuiz() {
    document.getElementById('quiz-question-lbl').innerText = dailyQuiz.q;
    const box = document.getElementById('quiz-options-box'); box.innerHTML = "";
    dailyQuiz.a.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => {
            if (idx === dailyQuiz.correct) {
                btn.style.background = "#22c55e";
                addTokens(5, "Answered daily quiz correctly!");
                setTimeout(() => { box.innerHTML = "<h4>Done for today! 🎉</h4>"; }, 1000);
            } else { btn.style.background = "#ef4444"; }
        };
        box.appendChild(btn);
    });
}

function triggerDestinyWheelRotation() {
    if (wheelSpinningState) return;
    if (!checkTokenBalance(3)) return;
    deductTokens(3, "Spun the destiny wheel.");
    
    wheelSpinningState = true;
    let vel = Math.random() * 0.3 + 0.3;
    const wCanvas = document.getElementById('wheelCanvas');
    const wCtx = wCanvas.getContext('2d');
    const options = ["Sing 🎤", "Call 🌙", "Poem 📜", "Date 🍕", "Gift 🎁", "Kiss 😘"];
    
    function draw() {
        wCtx.clearRect(0,0,260,260); wCtx.save(); wCtx.translate(130, 130); wCtx.rotate(rotationAngle);
        const arc = (Math.PI * 2) / options.length;
        const colors = ["#4c1d95", "#8b5cf6", "#a78bfa", "#1e1b4b", "#2563eb", "#1d4ed8"];
        for(let i=0; i<options.length; i++) {
            wCtx.fillStyle = colors[i]; wCtx.beginPath(); wCtx.moveTo(0,0);
            wCtx.arc(0, 0, 120, i * arc, (i + 1) * arc); wCtx.closePath(); wCtx.fill();
        }
        wCtx.restore();
    }
    
    function frame() {
        vel *= 0.98; rotationAngle += vel; draw();
        if(vel < 0.005) {
            wheelSpinningState = false;
            const idx = Math.floor(Math.random() * options.length);
            document.getElementById('wheel-result-lbl').innerText = `Result: ${options[idx]}!`;
            logDiscord("🎡 Wheel Spun", `Landed on: ${options[idx]}`);
        } else { requestAnimationFrame(frame); }
    }
    frame();
}

function redeemShopCoupon(name, price) {
    if (!checkTokenBalance(price)) return;
    deductTokens(price, `Redeemed Love Store Voucher: ${name}`);
    alert(`🎉 Successfully claimed: ${name}! Abhi has been notified!`);
}

// ==========================================
// MASTER KEY BYPASS
// ==========================================
function useMasterKey() {
    const key = prompt("Enter Boyfriend Master Key:");
    
    // Set your secret key here (Change 'boyfriend' to whatever you want)
    if (key === "Boyfriend") {
        document.getElementById('fairy-welcome-screen').classList.remove('active');
        document.getElementById('zine-dashboard-screen').classList.add('active');
        
        // Load the dashboard without checking tokens
        buildCalendarGrid();
        setupQuiz();
        alert("Master Key Accepted! Access Granted. 👑");
        logDiscord("🔑 Master Key Used", "Abhi accessed the dashboard using the Master Key.");
    } else {
        alert("Invalid Key! 🚫");
    }
}
