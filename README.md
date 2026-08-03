
# Dr. Abhishek Kashyap - Professional Portfolio

> Clinical Excellence & Intelligent Automation | General Physician (MBBS), AI Integration Specialist, WordPress Architect, and Medical Content Writer.

## Overview
This repository contains the personal portfolio website of **Dr. Abhishek Kashyap (MBBS)**. Built at the intersection of clinical medicine, software engineering, and artificial intelligence, the portfolio showcases Dr. Abhishek's multidisciplinary achievements, strategic projects, specialized clinical and technical services, and gated executive CV downloads.

---

## Features

- **Modern Glassmorphic UI**: High-contrast, dark mode default aesthetic with ambient backglow, subtle micro-animations, and smooth scrolling.
- **Dynamic Role Typewriter**: Interactive headline animation showcasing clinical, engineering, AI, and medical writing specialties.
- **Dark / Light Theme Toggle**: Seamless theme switcher with user preference persistence via `localStorage`.
- **Responsive Mobile Navigation**: Touch-friendly slide-out drawer menu with smooth backdrop blur.
- **Interactive About Tabs**: Tabbed interface switching between Skills Matrix, Professional Experience, and Academic Milestones.
- **Verification-Gated CV Downloads**: Secure popup modal requiring user email and purpose before initiating direct PDF download (`images/my-cv.pdf`).
- **Interactive Contact Transmission**: Client-side form handling with immediate feedback status.

---

## Tech Stack & Architecture

- **Core Structure**: HTML5 (Semantic elements, accessibility attributes)
- **Styling**: Vanilla CSS3 (Custom CSS variables, Glassmorphism, Responsive CSS Grid & Flexbox, Keyframe Animations)
- **Interactivity Engine**: Vanilla JavaScript (`script.js` - Typewriter, DOM event listeners, LocalStorage API, Modal management)
- **Typography & Icons**: Google Fonts (`Poppins`), FontAwesome 6 (Free Solid, Brands)

---

## Structure

```
d:/Portfolio/
├── index.html              # Main HTML structure
├── style.css               # Design system & stylesheet
├── script.js               # Interactivity engine
├── README.md               # Project documentation
└── images/
    ├── hero-portrait.jpg   # High-resolution professional portrait
    ├── user.png            # Technical bio photo
    ├── work-1.png          # Portfolio project 1 preview
    ├── work-2.png          # Portfolio project 2 preview
    ├── work-3.png          # Portfolio project 3 preview
    └── my-cv.pdf           # Executive CV document
```

---

## Usage

Simply open `index.html` in any modern web browser or serve via a local server (e.g. VS Code Live Server or python `http.server`).

