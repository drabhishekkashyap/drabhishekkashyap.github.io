/**
 * Portfolio Core Logic Engine
 * Dr. Abhishek Kashyap (2026 Deployment)
 */

// --- TELEGRAM PIPELINE CONFIGURATION ---
// Replace placeholders with real tokens on production deployment
const TELEGRAM_BOT_TOKEN = "7303036440:AAFxZ_Z7XkFWU3FRfO873j2E52JT8XlQa7s"; 
const TELEGRAM_CHAT_ID = "1871239513"; 

// --- STATE MANAGER ---
const AppState = {
    theme: localStorage.getItem('theme') || 'dark',
    typingRoles: [
        "General Physician (MBBS)",
        "AI Integration Specialist",
        "WordPress & Vibe Coding Engineer",
        "Medical Content Writer"
    ],
    roleIndex: 0,
    charIndex: 0,
    isDeleting: false
};

// --- DOM REGISTRY ---
const DOM = {
    navbar: document.getElementById('navbar'),
    themeBtn: document.getElementById('theme-btn'),
    themeIcon: document.getElementById('theme-btn').querySelector('i'),
    typingText: document.getElementById('typing-text'),
    sidemenu: document.getElementById('sidemenu'),
    menuOpen: document.getElementById('menu-open'),
    menuClose: document.getElementById('menu-close'),
    tabLinks: document.querySelectorAll('.tab-links'),
    tabContents: document.querySelectorAll('.tab-contents'),
    navLinks: document.querySelectorAll('.nav-link'),
    contactForm: document.getElementById('contact-form'),
    contactMsg: document.getElementById('msg'),
    cvTrigger: document.getElementById('cv-trigger'),
    cvModal: document.getElementById('cv-modal'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    cvGateForm: document.getElementById('cv-gate-form')
};

// --- INITIALIZER ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initScrollTracker();
    initMobileMenu();
    initTabs();
    initTypingEngine();
    initForms();
    initCVGate();
});

// --- THEME SWAPPER MECHANIC ---
function initTheme() {
    document.documentElement.setAttribute('data-theme', AppState.theme);
    updateThemeIcon();
    
    DOM.themeBtn.addEventListener('click', () => {
        AppState.theme = AppState.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', AppState.theme);
        localStorage.setItem('theme', AppState.theme);
        updateThemeIcon();
    });
}

function updateThemeIcon() {
    if (AppState.theme === 'light') {
        DOM.themeIcon.className = 'fas fa-sun';
    } else {
        DOM.themeIcon.className = 'fas fa-moon';
    }
}

// --- STICKY NAVIGATION LOGIC ---
function initScrollTracker() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            DOM.navbar.classList.add('scrolled');
        } else {
            DOM.navbar.classList.remove('scrolled');
        }
        trackActiveSection();
    });
}

function trackActiveSection() {
    let scrollPosition = window.scrollY + 120;
    document.querySelectorAll('section').forEach(section => {
        if (scrollPosition >= section.offsetTop && scrollPosition < (section.offsetTop + section.offsetHeight)) {
            let id = section.getAttribute('id');
            DOM.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// --- MOBILE MENU FLOW ---
function initMobileMenu() {
    DOM.menuOpen.addEventListener('click', () => DOM.sidemenu.classList.add('open-menu'));
    DOM.menuClose.addEventListener('click', () => DOM.sidemenu.classList.remove('open-menu'));
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', () => DOM.sidemenu.classList.remove('open-menu'));
    });
}

// --- MULTI-TAB MATRIX INTERACTIVITY ---
function initTabs() {
    DOM.tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetTab = e.currentTarget.getAttribute('data-tab');
            
            DOM.tabLinks.forEach(l => l.classList.remove('active-link'));
            DOM.tabContents.forEach(c => c.classList.remove('active-tab'));
            
            e.currentTarget.classList.add('active-link');
            document.getElementById(targetTab).classList.add('active-tab');
        });
    });
}

// --- PROGRAMMATIC TYPEWRITER CAROUSEL ---
function initTypingEngine() {
    const currentWord = AppState.typingRoles[AppState.roleIndex];
    
    if (AppState.isDeleting) {
        AppState.charIndex--;
    } else {
        AppState.charIndex++;
    }
    
    DOM.typingText.textContent = currentWord.substring(0, AppState.charIndex);
    
    let typingSpeed = AppState.isDeleting ? 40 : 100;
    
    if (!AppState.isDeleting && AppState.charIndex === currentWord.length) {
        typingSpeed = 2000; // Pause at end of text line
        AppState.isDeleting = true;
    } else if (AppState.isDeleting && AppState.charIndex === 0) {
        AppState.isDeleting = false;
        AppState.roleIndex = (AppState.roleIndex + 1) % AppState.typingRoles.length;
        typingSpeed = 400; // Delay before starting next line
    }
    
    setTimeout(initTypingEngine, typingSpeed);
}

// --- SECURE TELEGRAM DATA TRANSMITTER ---
async function transmitToTelegram(messageText) {
    const apiURL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: messageText,
                parse_mode: 'Markdown'
            })
        });
        return response.ok;
    } catch (err) {
        console.error("Communication API execution error: ", err);
        return false;
    }
}

// --- INQUIRY CONTACT FORM PIPELINE ---
function initForms() {
    DOM.contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        DOM.contactMsg.style.color = "var(--text-main)";
        DOM.contactMsg.textContent = "Processing packet validation...";
        
        const formData = new FormData(DOM.contactForm);
        const name = formData.get('Name');
        const email = formData.get('Email');
        const message = formData.get('Message');
        const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

        const telegramText = `📩 *New Portfolio Lead Alert*\n\n` +
                             `*Timestamp:* ${timestamp}\n` +
                             `*Sender Name:* ${name}\n` +
                             `*Email Address:* ${email}\n\n` +
                             `*Message Body:*\n${message}`;

        const isSuccess = await transmitToTelegram(telegramText);

        if (isSuccess) {
            DOM.contactMsg.style.color = "#61b752";
            DOM.contactMsg.textContent = "Data packet routed successfully via Telegram Bot API.";
            DOM.contactForm.reset();
            setTimeout(() => DOM.contactMsg.textContent = "", 6000);
        } else {
            DOM.contactMsg.style.color = "var(--accent)";
            DOM.contactMsg.textContent = "API structural error. Connection timed out.";
        }
    });
}

// --- VERIFICATION SECURITY CV MODAL GATE ---
function initCVGate() {
    DOM.cvTrigger.addEventListener('click', () => {
        DOM.cvModal.classList.add('open');
        DOM.cvModal.setAttribute('aria-hidden', 'false');
    });

    const closeModal = () => {
        DOM.cvModal.classList.remove('open');
        DOM.cvModal.setAttribute('aria-hidden', 'true');
        DOM.cvGateForm.reset();
    };

    DOM.modalCloseBtn.addEventListener('click', closeModal);
    DOM.cvModal.addEventListener('click', (e) => {
        if (e.target === DOM.cvModal) closeModal();
    });

    DOM.cvGateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = DOM.cvGateForm.querySelector('button');
        submitBtn.disabled = true;
        submitBtn.textContent = "Processing authorization...";

        const clientEmail = document.getElementById('cv-email').value;
        const clientPurpose = document.getElementById('cv-purpose').value;
        const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

        const telemetryText = `🔒 *Secure CV Download Stream Triggered*\n\n` +
                              `*Timestamp:* ${timestamp}\n` +
                              `*User Email:* ${clientEmail}\n` +
                              `*Stated Business Purpose:* ${clientPurpose}`;

        // Transmit validation diagnostics upstream to your app
        await transmitToTelegram(telemetryText);

        // Initiate File Access
        const downloadAnchor = document.createElement('a');
        downloadAnchor.href = 'images/cv.pdf';
        downloadAnchor.download = 'Dr_Abhishek_Kashyap_CV.pdf';
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        document.body.removeChild(downloadAnchor);

        setTimeout(() => {
            closeModal();
            submitBtn.disabled = false;
            submitBtn.textContent = "Authorize & Download";
        }, 1000);
    });
}
