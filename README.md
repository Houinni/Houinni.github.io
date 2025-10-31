# Kira Hou · Personal Site

React single-page application built with Vite, Tailwind CSS, shadcn-inspired UI primitives, and `react-router-dom`. The site is designed for static hosting (e.g., GitHub Pages) using a `HashRouter` so no server rewrites are necessary.

## Getting started

1. Install dependencies

   ```bash
   npm install
   ```

2. Run the development server

   ```bash
   npm run dev
   ```

   Vite prints a local URL you can open in your browser. The hash-based router ensures page refreshes work without additional configuration.

3. Build for production

   ```bash
   npm run build
   ```

   The static assets will be emitted to `dist/`. Deploy them to GitHub Pages or any static host.

## Customisation notes

- **Content:** Update the constants (`SOCIAL_LINKS`, `PROJECTS`, etc.) at the top of `src/App.jsx`.
- **UI tokens:** Modify Tailwind CSS variables inside `src/index.css` to tweak colours, typography, and radii.
- **Components:** Primitive components live in `src/components/ui/`. Extend or replace them as needed.
- **Routing:** Add new pages by extending the `NAV` array and adding `<Route>` entries in `AppInner`.
- **Résumé:** Replace `public/resume.pdf` with your actual résumé file (or adjust the link).

## Notes for static hosting

Because the app uses `HashRouter`, GitHub Pages and other static hosts require no special configuration to handle client-side routing. If you deploy to a host that supports rewrite rules (e.g., Vercel, Netlify), you can switch to `BrowserRouter` in `src/App.jsx` and add the necessary rewrites.
