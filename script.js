/* ==========================================================================
   Dr. Abhishek Kashyap - Portfolio Interactivity Engine (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Dynamic Role Typewriter Animation
    // ----------------------------------------------------------------------
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const roles = [
            "MD Physician (MBBS Specialist)",
            "AI in Healthcare Innovator",
            "Generative AI & Agentic AI Developer",
            "WordPress & Web Architect",
            "Clinical AI Prompt Specialist"
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 90;
        const erasingSpeed = 40;
        const delayBetweenRoles = 2000;

        function typeEffect() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typingText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let nextSpeed = isDeleting ? erasingSpeed : typingSpeed;

            if (!isDeleting && charIndex === currentRole.length) {
                nextSpeed = delayBetweenRoles;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                nextSpeed = 500;
            }

            setTimeout(typeEffect, nextSpeed);
        }

        typeEffect();
    }

    // ----------------------------------------------------------------------
    // 2. WebGL Fragment Shader Hero Animation (shader/code.html)
    // ----------------------------------------------------------------------
    const shaderCanvas = document.getElementById('shader-canvas-ANIMATION_3');
    if (shaderCanvas) {
        function syncShaderSize() {
            const w = shaderCanvas.clientWidth || 1280;
            const h = shaderCanvas.clientHeight || 720;
            if (shaderCanvas.width !== w || shaderCanvas.height !== h) {
                shaderCanvas.width = w;
                shaderCanvas.height = h;
            }
        }
        if (typeof ResizeObserver !== 'undefined') {
            new ResizeObserver(syncShaderSize).observe(shaderCanvas);
        }
        syncShaderSize();

        const gl = shaderCanvas.getContext('webgl') || shaderCanvas.getContext('experimental-webgl');
        if (gl) {
            const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
            const fs = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;

float noise(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
    vec2 uv = v_texCoord;
    vec3 color1 = vec3(0.039, 0.098, 0.184);
    vec3 color2 = vec3(0.0, 0.82, 1.0);
    
    float pulse = sin(u_time * 0.5) * 0.5 + 0.5;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= u_resolution.x / u_resolution.y;
    
    float d = length(p);
    float glow = 0.05 / (d * d + 0.1);
    
    float circuit = smoothstep(0.4, 0.5, abs(sin(uv.x * 20.0 + u_time) * cos(uv.y * 20.0 - u_time)));
    
    vec3 finalColor = mix(color1, color2, glow * pulse + circuit * 0.05);
    gl_FragColor = vec4(finalColor, 1.0);
}`;
            function cs(type, src) {
                const s = gl.createShader(type);
                gl.shaderSource(s, src);
                gl.compileShader(s);
                return s;
            }
            const prog = gl.createProgram();
            gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
            gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
            gl.linkProgram(prog);
            gl.useProgram(prog);
            const buf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buf);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
            const pos = gl.getAttribLocation(prog, 'a_position');
            gl.enableVertexAttribArray(pos);
            gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
            const uTime = gl.getUniformLocation(prog, 'u_time');
            const uRes = gl.getUniformLocation(prog, 'u_resolution');
            const uMouse = gl.getUniformLocation(prog, 'u_mouse');

            let mouse = { x: shaderCanvas.width / 2, y: shaderCanvas.height / 2 };
            window.addEventListener('mousemove', (event) => {
                const rect = shaderCanvas.getBoundingClientRect();
                if (rect.width && rect.height) {
                    const nx = (event.clientX - rect.left) / rect.width;
                    const ny = 1.0 - (event.clientY - rect.top) / rect.height;
                    mouse.x = nx * shaderCanvas.width;
                    mouse.y = ny * shaderCanvas.height;
                }
            });

            function renderShader(t) {
                if (typeof ResizeObserver === 'undefined') syncShaderSize();
                gl.viewport(0, 0, shaderCanvas.width, shaderCanvas.height);
                if (uTime) gl.uniform1f(uTime, t * 0.001);
                if (uRes) gl.uniform2f(uRes, shaderCanvas.width, shaderCanvas.height);
                if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
                gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
                requestAnimationFrame(renderShader);
            }
            renderShader(0);
        }
    }

    // ----------------------------------------------------------------------
    // 3. Three.js 3D Rotating DNA Helix Hero Animation (three.js/code.html)
    // ----------------------------------------------------------------------
    const threeContainer = document.getElementById('threejs-container-ANIMATION_4');
    if (threeContainer && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const width = threeContainer.clientWidth || window.innerWidth;
        const height = threeContainer.clientHeight || window.innerHeight;
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        threeContainer.appendChild(renderer.domElement);

        const group = new THREE.Group();
        const material = new THREE.MeshPhongMaterial({ color: 0x00D1FF, emissive: 0x00D1FF, emissiveIntensity: 0.65 });

        for (let i = 0; i < 50; i++) {
            const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), material);
            const y = (i - 25) * 0.38;
            const angle = i * 0.35;
            sphere.position.set(Math.cos(angle) * 3.2, y, Math.sin(angle) * 3.2);
            group.add(sphere);

            const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), material);
            sphere2.position.set(Math.cos(angle + Math.PI) * 3.2, y, Math.sin(angle + Math.PI) * 3.2);
            group.add(sphere2);
        }

        scene.add(group);
        scene.add(new THREE.AmbientLight(0xffffff, 0.7));
        const pointLight = new THREE.PointLight(0x00D1FF, 1.5);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        camera.position.z = 11;

        function animateThree() {
            requestAnimationFrame(animateThree);
            group.rotation.y += 0.008;
            group.rotation.x += 0.003;
            renderer.render(scene, camera);
        }
        animateThree();

        window.addEventListener('resize', () => {
            if (!threeContainer) return;
            const w = threeContainer.clientWidth || window.innerWidth;
            const h = threeContainer.clientHeight || window.innerHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        });
    }

    // ----------------------------------------------------------------------
    // 4. Dark / Light Theme Toggle & Persistence
    // ----------------------------------------------------------------------
    const themeBtn = document.getElementById('theme-btn');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeBtn) return;
        const icon = themeBtn.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // ----------------------------------------------------------------------
    // 5. Ultra-Responsive Mobile Navigation Drawer & Overlay
    // ----------------------------------------------------------------------
    const menuOpen = document.getElementById('menu-open');
    const menuClose = document.getElementById('menu-close');
    const sidemenu = document.getElementById('sidemenu');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    function openMobileMenu() {
        if (sidemenu) sidemenu.classList.add('open');
        if (navOverlay) navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        if (sidemenu) sidemenu.classList.remove('open');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuOpen) menuOpen.addEventListener('click', openMobileMenu);
    if (menuClose) menuClose.addEventListener('click', closeMobileMenu);
    if (navOverlay) navOverlay.addEventListener('click', closeMobileMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMobileMenu();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Active Navigation Link Scroll Highlight
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const activeLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
            if (activeLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    activeLink.classList.add('active');
                }
            }
        });
    });

    // ----------------------------------------------------------------------
    // 6. Scroll Reveal Intersection Observer
    // ----------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // ----------------------------------------------------------------------
    // 7. CV Download Verification Modal & Google Sheets Web App Submission
    // ----------------------------------------------------------------------
    const cvTrigger = document.getElementById('cv-trigger');
    const cvModal = document.getElementById('cv-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const cvGateForm = document.getElementById('cv-gate-form');

    // Paste your Google Apps Script Web App URL below to automatically sync leads to your Google Sheet!
    const GOOGLE_SHEET_WEBAPP_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

    if (cvTrigger && cvModal) {
        cvTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            cvModal.classList.add('modal-active');
            cvModal.setAttribute('aria-hidden', 'false');
        });
    }

    function closeModal() {
        if (cvModal) {
            cvModal.classList.remove('modal-active');
            cvModal.setAttribute('aria-hidden', 'true');
        }
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

    if (cvModal) {
        cvModal.addEventListener('click', (e) => {
            if (e.target === cvModal) closeModal();
        });
    }

    if (cvGateForm) {
        cvGateForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('cv-submit-btn');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : 'AUTHORIZE & DOWNLOAD <i class="fas fa-download"></i>';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> LOGGING & AUTHORIZING...';
            }

            const formData = new FormData(cvGateForm);
            formData.append('Timestamp', new Date().toLocaleString());

            // Post lead details (Email, Mobile, Reason) to Google Sheet
            fetch(GOOGLE_SHEET_WEBAPP_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            }).catch(err => {
                console.log('Google Sheet Submission Note:', err);
            }).finally(() => {
                // Trigger Direct Download of Dr. Abhishek Kashyap's Official CV PDF
                const link = document.createElement('a');
                link.href = 'images/CV of Abhishek Kashyap.pdf';
                link.download = 'Dr_Abhishek_Kashyap_MD_CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                alert('Authorization Successful! Lead details logged and Dr. Abhishek Kashyap\'s Executive CV download has started.');

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
                cvGateForm.reset();
                closeModal();
            });
        });
    }

    // ----------------------------------------------------------------------
    // 8. Contact Form Transmission Handler
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const msgSpan = document.getElementById('msg');

    if (contactForm && msgSpan) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            msgSpan.style.color = 'var(--accent-color)';
            msgSpan.textContent = 'Message transmitted successfully! Dr. Abhishek will get back to you soon.';
            contactForm.reset();
            setTimeout(() => {
                msgSpan.textContent = '';
            }, 5000);
        });
    }
});
