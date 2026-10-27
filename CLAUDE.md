# DevOps Notes

Personal study notes site (Astro + Starlight). See README.md for layout and the chapter template.

## Workflow overrides

This repo is a personal notes page, so two rules from the global CLAUDE.md are relaxed here:

- **Merging to `main` needs no approval.** When a branch is done and `npm run build` passes, merge it into `main` yourself and delete the branch.
- **Pushing needs no explicit request.** Push `main` (and feature branches) whenever work is merged; a push to `main` deploys the site via GitHub Pages.

Everything else from the global CLAUDE.md still applies: short-lived `feat/`, `fix/`, `style/`, `docs/`, `chore/` branches, conventional commit subjects under 50 characters, no AI attribution, and a passing build before merging.
