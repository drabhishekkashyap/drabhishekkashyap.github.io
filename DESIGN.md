---
name: Clinical Intelligence
colors:
  surface: '#101415'
  surface-dim: '#101415'
  surface-bright: '#363a3b'
  surface-container-lowest: '#0b0f10'
  surface-container-low: '#191c1e'
  surface-container: '#1d2022'
  surface-container-high: '#272a2c'
  surface-container-highest: '#323537'
  on-surface: '#e0e3e5'
  on-surface-variant: '#bbc9cf'
  inverse-surface: '#e0e3e5'
  inverse-on-surface: '#2d3133'
  outline: '#859399'
  outline-variant: '#3c494e'
  surface-tint: '#4cd6ff'
  primary: '#a4e6ff'
  on-primary: '#003543'
  primary-container: '#00d1ff'
  on-primary-container: '#00566a'
  inverse-primary: '#00677f'
  secondary: '#b9c7e4'
  on-secondary: '#233148'
  secondary-container: '#3c4962'
  on-secondary-container: '#abb9d6'
  tertiary: '#cee0df'
  on-tertiary: '#233333'
  tertiary-container: '#b2c4c3'
  on-tertiary-container: '#415151'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#b7eaff'
  primary-fixed-dim: '#4cd6ff'
  on-primary-fixed: '#001f28'
  on-primary-fixed-variant: '#004e60'
  secondary-fixed: '#d6e3ff'
  secondary-fixed-dim: '#b9c7e4'
  on-secondary-fixed: '#0d1c32'
  on-secondary-fixed-variant: '#39475f'
  tertiary-fixed: '#d4e6e5'
  tertiary-fixed-dim: '#b8cac9'
  on-tertiary-fixed: '#0e1e1e'
  on-tertiary-fixed-variant: '#3a4a49'
  background: '#101415'
  on-background: '#e0e3e5'
  surface-variant: '#323537'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 80px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  code-label:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 20px
  container-max: 1440px
---

## Brand & Style

The design system follows a **Med-Tech Surrealist** aesthetic, merging the sterile precision of high-end medical equipment with the technical depth of advanced artificial intelligence. The interface should feel like a high-performance surgical dashboard: visionary, calm, and intellectually rigorous.

The visual narrative avoids literal medical iconography (stethoscopes, crosses) in favor of **Biological Data Visualization**. Elements use organic, generative patterns—such as neural network strands resembling vascular systems—rendered with digital precision. The style utilizes **Glassmorphism** and **Minimalism** to create a sense of light, air, and depth, punctuated by sharp, high-contrast technical data overlays.

**Key Visual Principles:**
- **Clinical Transparency:** Use frosted surfaces to suggest cleanliness and clarity.
- **Neural Depth:** Implement deep, dark layers to represent the "black box" of AI and the depths of biological complexity.
- **Hyper-Performance:** Every interaction should be instantaneous and precise, with micro-animations that mimic diagnostic scans.

## Colors

The palette is anchored by **Deep Space Navy (#0A192F)**, providing a sophisticated, "Tech-Noir" canvas that emphasizes the luminance of the primary colors. 

- **Primary (Cyan/Tech):** #00D1FF is used for interactive elements, data highlights, and "vital sign" indicators. It represents the energy of AI.
- **Secondary (Deep Space Navy):** #0A192F serves as the primary background color, creating a high-contrast environment for technical content.
- **Accent (Clinical Mint):** #E0F2F1 is used for secondary surfaces and subtle borders, providing a soft, clinical "glow" that bridges the gap between deep blue and white.
- **Neutral (Slate White):** #F8FAFC is reserved for critical reading text and high-level headers to ensure clinical readability.

Color application should prioritize high contrast ratios to maintain a professional, accessible, and high-performance feel.

## Typography

This design system utilizes a dual-font strategy to balance professional clinical authority with technical engineering depth.

1.  **Hanken Grotesk (Humanist Sans):** Used for all primary communications. Its sharp, contemporary geometry provides a clean, modern look that feels both established and forward-thinking.
2.  **JetBrains Mono (Technical Mono):** Used for "Metadata," "Code Accents," and "Diagnostic Labels." It signifies the engineering precision behind the medical expertise.

**Formatting Rules:**
- Use **Display-LG** for primary value propositions with tight letter-spacing.
- Use **Code-Label** in all-caps for categories, timestamps, and data-points to evoke a "system terminal" feel.
- Maintain generous line-heights for body text to ensure readability of complex medical or technical descriptions.

## Layout & Spacing

The layout philosophy is based on a **Precision Grid** system, mimicking the organized structure of medical charts and technical blueprints.

- **Desktop:** A 12-column fluid grid with wide 80px margins to create an expansive, premium feel. 
- **Tablet:** 8-column grid with 40px margins.
- **Mobile:** 4-column grid with 20px margins.

Spacing follows an 8px base unit. Use generous "Negative Space" (white space) to emphasize clinical cleanliness. Components should be grouped into logical "Modules" or "Cells," separated by consistent 24px gutters. Sections of the portfolio should be demarcated by horizontal "Data Rules" (thin 1px lines) rather than heavy blocks of color.

## Elevation & Depth

This design system uses **Tonal Layering** and **Glassmorphism** rather than traditional drop shadows to communicate hierarchy. Depth is represented through light and transparency, simulating a high-tech glass interface.

- **Level 0 (Background):** Deep Space Navy (#0A192F). 
- **Level 1 (Surface):** Semi-transparent Navy (10% opacity) with a 20px backdrop blur and a 1px border of Clinical Mint (#E0F2F1) at 10% opacity.
- **Level 2 (Active/Hover):** Increased transparency (20% opacity) with a subtle Cyan (#00D1FF) outer glow (bloom effect).
- **Overlays:** Use "Scanlines" or very subtle 5% opacity noise textures on top-level cards to add a tactile, technical feel.

## Shapes

The shape language is **Soft (0.25rem)**, moving away from the aggressive sharpness of pure brutalism to reflect the organic nature of healthcare. 

- **Primary UI Elements:** Use a 4px (0.25rem) corner radius. This provides enough structure to feel "engineered" while remaining approachable.
- **Data Containers:** Use sharp 0px corners for inner nested technical data to differentiate "Content" from "Interface."
- **Interactive Triggers:** Buttons and chips use the 4px radius. Avoid pill shapes; they are too "consumer-grade" for this professional clinical context.

## Components

### Buttons
- **Primary:** Solid Cyan (#00D1FF) with Navy text. No shadows. On hover, apply a "Pulse" bloom effect.
- **Secondary:** Ghost style. 1px border of Clinical Mint (#E0F2F1) with Mint text. 
- **Technical:** Mono-spaced text with a small square prefix icon (e.g., `[+] VIEW DATA`).

### Cards & Modules
- Use the Glassmorphism style (backdrop blur). 
- Headers within cards should be separated by a 1px horizontal rule.
- Include a "Serial Number" or "Coordinate" in JetBrains Mono at the top-right of every card to reinforce the AI/Technical aesthetic.

### Inputs & Form Fields
- Underline-only style or very subtle 1px bordered boxes. 
- Focus state: The border or underline glows Cyan (#00D1FF).
- Labels must be in JetBrains Mono, All-Caps.

### Progress Indicators / Vital Signs
- Use thin, linear bars for skills or data points. 
- Avoid circular "donuts." 
- Use "Sparklines" (miniature line charts) to represent biological or technical trends instead of standard bullet points.

### List Items
- Separated by thin, low-opacity lines. 
- Hovering over a list item should trigger a "Highlight Scan" effect—a thin horizontal bar of Cyan light that sweeps across the row.