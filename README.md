# Navabharth Technologies - IVR Solutions Webpage

A premium, highly interactive, and responsive landing page for Navabharth Technologies' IVR Solutions, built entirely with **pure HTML5, CSS3, and JavaScript**.

---

## 🚀 Key Features

* **High-Performance Canvas Particle System**: Organic floating particle grid networks and swirling globe rings running on GPU-accelerated standard canvas loops (`requestAnimationFrame`).
* **SVG Network Orbit Lines**: Dynamic dashed SVG orbit paths rendering glowing moving dots via CSS keyframe styling.
* **Ambient Cursor Follow Glows**: Micro-interaction mouse hover glows using smooth interpolation coordinate transitions.
* **Interactive Components**:
  * **Draggable Feature Carousel**: Custom click/drag & touch slider built with pure JS (supports auto-scrolling with pause on hover).
  * **Navigation Scrollspy**: Smooth, automatic active link updates matching page scroll position.
  * **Auto-Height Accordion**: Smooth FAQ drawers powered by modern CSS grid transition layouts.
  * **Click Ripples**: Real-time cursor ripple generation on dashboard previews and button clicks.
* **Fully Responsive Design**: Tailored CSS flexbox and grid layouts optimized for mobile, tablet, and ultra-wide displays.
* **Production Build Setup**: Synced static hosting assets stored in the `/docs` directory to serve seamlessly on GitHub Pages.

---

## 📁 Directory Structure

```text
├── .github/workflows/   # CI/CD deployment pipelines to GitHub Pages
├── css/
│   ├── style.css        # Base design tokens, layout variables, and component styles
│   └── animations.css   # Keyframe definitions, transitions, and hover effects
├── js/
│   ├── main.js          # Core application logic, carousel, ripples, scrollspy
│   └── animations.js    # Canvas renders, spring cursor particles, hover light loops
├── images/              # Optimised image assets, logos, and page backgrounds
├── docs/                # Production-ready synced builds (used for GitHub Pages hosting)
├── index.html           # Main semantic entry point
├── README.md            # Documentation file
└── .gitignore           # File exclusion configurations
```

---

## 🛠️ How to Run Locally

Since this project consists of pure static web assets, no compilers or dependencies (like Node.js, npm, or Vite) are required to build or execute the project.

### Option 1: Live Server (Recommended)
1. Open the project folder in VS Code.
2. Install the **Live Server** extension.
3. Click **Go Live** in the status bar to run the project locally with auto-reload capabilities.

### Option 2: Direct Execution
Simply double-click the `index.html` file in your system file explorer to open and run the landing page directly in your browser.

---

## 🌐 Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions upon any changes pushed to the `main` branch.
* Deployment configuration: [.github/workflows/deploy.yml](file:///.github/workflows/deploy.yml)
* Hosting Source: Synced `/docs` folder
