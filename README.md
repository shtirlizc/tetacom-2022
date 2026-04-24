# Tetacom site

Static Astro site for `https://tetacom.pro/`.

## Environment

Copy `.env.example` to `.env` for local development and fill in:

```sh
PUBLIC_TETACOM_CONTACT_ENDPOINT=https://tetacom-feedback.vercel.app/api/contact
PUBLIC_TURNSTILE_SITE_KEY=your-cloudflare-turnstile-site-key
```

Both variables are public and are embedded into the client bundle during `npm run build`.
For GitHub Pages deploys, add them as repository variables in GitHub:

- `PUBLIC_TETACOM_CONTACT_ENDPOINT`
- `PUBLIC_TURNSTILE_SITE_KEY`

Then rerun the `Deploy to GitHub Pages` workflow.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
