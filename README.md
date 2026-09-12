# DevOps Notes

A bilingual Slovak/English learning hub built with Astro and Starlight. The first course covers Python fundamentals, exercises, and expandable reference solutions. The structure is ready for additional Git, Terraform, Kubernetes, and other DevOps courses.

## Local development

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

The project uses `/devops-notes` as its base path to match the GitHub Pages project URL. The local address is shown by Astro after startup.

## Production build

```bash
npm run build
npm run preview
```

Every push to `main` deploys the static site to GitHub Pages using the workflow in `.github/workflows/deploy.yml`.

## Content

Pages live in `src/content/docs/`. Slovak is the default language and English translations live in `src/content/docs/en/`.
