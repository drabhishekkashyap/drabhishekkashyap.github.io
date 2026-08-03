# Dr. Abhishek Kashyap - Cyber-Medical & HealthTech Portfolio

> **Clinical Excellence • Generative AI & Agentic AI Systems**  
> *MD Physician & HealthTech AI Systems Architect*

---

## Overview

This repository contains the official portfolio website of **Dr. Abhishek Kashyap (MD Physician / MBBS)**. Operating at the convergence of clinical medicine, software engineering, and artificial intelligence, the portfolio showcases Dr. Abhishek's multidisciplinary work across autonomous multi-agent healthcare systems, clinical decision support tools, healthtech web applications, and medical content automation.

---

## Key Features & Visual Architecture

- **Cyber-Medical Dark HUD Design System**: High-contrast, sleek cyber-navy (`#040a16`) aesthetic featuring electric cyan glowing borders (`#00f0ff`), glassmorphic panels, and tracked technical typography (`Space Grotesk` & `Plus Jakarta Sans`).
- **WebGL Interactive Fragment Shader**: Real-time canvas animation generating circuit patterns and glowing pulses reacting to cursor movements.
- **Three.js 3D DNA Helix Animation**: Interactive 3D double helix node structure built with Three.js rendering centered in the hero section background.
- **Dynamic Matrix Typewriter Engine**: Interactive headline animation showcasing clinical, engineering, AI, and WordPress architectural roles.
- **Gated Executive CV Download**: Verification modal requiring visitor Email, Mobile Number, and Purpose before authorizing direct PDF download.
- **Automated Google Sheet Lead Sync**: Asynchronous POST transmission logging leads directly to a private Google Sheet.
- **Ultra-Responsive Mobile Navigation**: Touch-friendly slide-out drawer menu with glassmorphic overlay for smartphones and tablets.
- **Persistent Theme Toggle**: Seamless dark and light mode switcher with user preference persistence via `localStorage`.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Markup & Semantics** | HTML5 (SEO meta tags, ARIA accessibility, GFM standards) |
| **Styles & Theme** | Custom Vanilla CSS3 (CSS Variables, Glassmorphism, CSS Grid & Flexbox, Keyframes) |
| **Graphics & 3D** | WebGL (GLSL Fragment Shaders), Three.js r125 (3D Scene, Perspective Camera, Ambient & Point Lights) |
| **Interactivity Engine** | Vanilla JavaScript (ES6+ async fetch, WebGL render loop, DOM listeners, LocalStorage API) |
| **Typography & Icons** | Google Fonts (`Space Grotesk`, `Plus Jakarta Sans`), FontAwesome 6 |

---

## Directory Structure

```
Portfolio/
├── index.html              # Primary HTML5 structure & semantic sections
├── style.css               # Core Cyber-Medical HUD design system & responsive matrix
├── script.js               # WebGL, Three.js 3D engine, typewriter, & lead capture handler
├── GOOGLE_SHEET_SETUP.md   # Step-by-step Google Sheet lead capture setup guide
├── README.md               # Repository documentation
└── images/
    ├── logo.png            # Electric cyan header brand logo
    ├── user.png            # Enhanced doctor cyber-medical portrait
    ├── neural-brain-hud.png# Holographic medical AI interface image
    ├── work-1.png          # Project 1: Interactive CMS Learning App
    ├── work-2.png          # Project 2: ADHD Focus & Cognitive Health App
    ├── work-3.png          # Project 3: AI Medical Content Automation Agent
    └── CV of Abhishek Kashyap.pdf # Executive CV PDF document
```

---

## Setup & Deployment

1. **Local Preview**: Open `index.html` directly in any modern browser or run via local HTTP server:
   ```bash
   # Using Python
   python -m http.server 8000
   ```
2. **Google Sheet Lead Capture Configuration**:
   - Follow instructions in [GOOGLE_SHEET_SETUP.md](GOOGLE_SHEET_SETUP.md) to deploy your Google Apps Script Web App.
   - Replace the `GOOGLE_SHEET_WEBAPP_URL` variable in `script.js` with your deployed endpoint.

---

## License & Copyright

Copyright &copy; 2026 Dr. Abhishek Kashyap. All Rights Reserved.  
*Engineered for Clinical & Technological Innovation.*
