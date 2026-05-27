# Elevate Digital Website

Deploy-ready Next.js + Tailwind project.

## Upload to GitHub

Replace:
- app/page.jsx
- app/layout.jsx
- app/globals.css
- package.json
- tailwind.config.js
- postcss.config.js

Keep:
- LICENSE
- public/james-rizzo.png

Delete old duplicates if present:
- app/page.js
- app/page.tsx
- app/layout.js if it does not import globals.css
- pages/ folder

## Vercel settings

Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build

## If the site looks like plain text

That means Tailwind CSS is not loading. Make sure app/layout.jsx contains:
import "./globals.css";

and app/globals.css contains:
@tailwind base;
@tailwind components;
@tailwind utilities;
