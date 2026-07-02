# Glow Beauty Salon — Luxury Website

A complete, production-ready website for **Glow Beauty Salon**, a luxury beauty destination offering hair, skin, makeup, nail, bridal, and spa services. Built with pure **HTML5, CSS3, and vanilla JavaScript** — no frameworks, no build tools, no dependencies beyond Google Fonts.

## ✨ Features

- 9 fully responsive pages (Home, About, Services, Pricing, Gallery, Appointment, Testimonials, FAQ, Contact)
- Luxury design system: warm ivory, champagne gold, soft rose, and espresso color palette
- Glassmorphism sticky navbar, scroll-reveal animations, and hover micro-interactions
- Multi-step appointment booking form with client-side validation and live summary
- Filterable gallery with lightbox viewer and before/after comparison sliders
- Searchable FAQ accordion (20 questions across 5 categories)
- Testimonial carousel and review grid
- WhatsApp floating button, scroll progress bar, and back-to-top button
- SEO-ready: unique meta titles/descriptions, Open Graph tags, JSON-LD schema (BeautySalon, FAQPage), semantic heading hierarchy, sitemap, and robots.txt
- Accessible: semantic HTML, ARIA labels, visible focus states, skip link, reduced-motion support

## 📁 Project Structure

```
Glow-Beauty-Salon/
├── index.html                 Home page
├── about.html                 About / Our Story / Team
├── services.html              Full service catalogue (17 services)
├── pricing.html                Packages, membership plans, price list
├── gallery.html                Filterable gallery, lightbox, before/after
├── appointment.html            Multi-step booking form
├── testimonials.html           Reviews and client stories
├── faq.html                    Searchable FAQ (20 questions)
├── contact.html                Contact form, hours, map
│
├── assets/
│   ├── css/
│   │   ├── variables.css       Design tokens (colors, type, spacing, shadows)
│   │   ├── style.css           Base styles + all components
│   │   ├── animations.css      Keyframes and motion utilities
│   │   └── responsive.css      Mobile-first breakpoint rules
│   │
│   ├── js/
│   │   ├── main.js             Navbar, mobile menu, scroll progress, FAQ accordion, testimonial slider
│   │   ├── animations.js       Scroll-reveal engine, animated counters, hero parallax
│   │   ├── gallery.js          Gallery filtering, lightbox, before/after slider
│   │   ├── booking.js          Multi-step appointment form logic
│   │   └── faq.js              FAQ search/filter
│   │
│   └── images/                 All image assets (see naming convention below)
│
├── README.md
├── robots.txt
└── sitemap.xml
```

## 🖼️ Image Assets

The `assets/images/` folder expects the following files (WebP recommended). Replace the placeholders with real or AI-generated photography per the approved Visual Direction & Photography Guide:

`hero-banner.webp`, `salon-interior.webp`, `founder-portrait.webp`, `beauty-team.webp`, `hair-styling.webp`, `hair-coloring.webp`, `bridal-makeup.webp`, `facial-treatment.webp`, `luxury-nails.webp`, `spa-massage.webp`, `hydrafacial.webp`, `eyelash-extensions.webp`, `eyebrow-shaping.webp`, `waxing-service.webp`, `threading-service.webp`, `massage-therapy.webp`, `moroccan-bath.webp`, `beauty-products.webp`, `happy-client.webp`, `waiting-lounge.webp`, `before-after-hair.webp`, `before-after-skin.webp`, `bridal-portrait.webp`, `reception-area.webp`, `beauty-consultation.webp`, `instagram-beauty.webp`, `special-offer.webp`, `salon-exterior.webp`, `booking-cta-banner.webp`, `footer-background.webp`

All `<img>` tags already reference these exact filenames with descriptive `alt` text.

## 🚀 Deployment (GitHub Pages)

1. Push this folder to a GitHub repository.
2. In the repository, go to **Settings → Pages**.
3. Under **Source**, select the branch (e.g. `main`) and root folder (`/`).
4. Save — your site will be live at `https://<username>.github.io/<repository-name>/`.
5. Update `sitemap.xml`, `robots.txt`, and the `og:url` / `canonical` meta tags in every page to match your final domain.

No build step is required — this is a fully static site.

## 🎨 Design System

All design tokens (colors, typography, spacing, shadows, radii, motion timing) live in `assets/css/variables.css` as CSS custom properties. Update values there to restyle the entire site consistently.

- **Display font:** Playfair Display (headings)
- **Body font:** Jost (body copy, navigation, buttons)
- **Primary color:** Champagne Gold `#C6A15B`
- **Background:** Warm Ivory `#FAF6F1`

## ♿ Accessibility

- Skip-to-content link on every page
- Visible keyboard focus states (gold outline)
- `prefers-reduced-motion` respected across all animations
- Descriptive alt text on every image
- ARIA attributes on accordions, menus, and interactive controls

## 📌 Notes

- The booking form and contact form are client-side only (validation + UI feedback). Connect them to a real backend or form service (e.g. Formspree, Netlify Forms, or a custom API) before going live.
- The Google Maps embed uses a placeholder query — replace the `src` in the `<iframe>` with your actual salon address embed URL.
- WhatsApp links use a placeholder number (`+15550100`) — update to your real business WhatsApp number across all files.

---

© 2026 Glow Beauty Salon. All Rights Reserved.
