# DevOps Notes

My notebook for the DevOps exam, published at <https://dhudakk.github.io/devops-notes/>. Built with Astro and Starlight, in Slovak (default) and English. The exam is open-book, so the site is laid out for fast lookup: full-text search (`Ctrl+K` / `⌘K`), a key-points box on every chapter, and a one-page cheat sheet per course.

Each topic is a **course** made of **chapters**. Every chapter has the same shape, so revising is predictable:

1. **Key points** box at the top — what to remember.
2. The explanation, with runnable examples.
3. **Test yourself** — questions with hidden answers.
4. **Exercises** — with an optional hint and a hidden solution.

Each course also has an overview (chapter list), a one-page **cheat sheet**, and a sources page.

## Local development

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev      # local server, address printed by Astro
npm run build    # type check + static build into dist/
npm run preview  # serve the built site
```

Every push to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.

## Project layout

```text
src/
  courses.ts               ← list of courses (the one place to register a new one)
  content/docs/
    index.mdx              ← home page
    python-basics/         ← one folder per course (Slovak)
      index.mdx            ← course overview
      zaklady.mdx …        ← chapters
      tahak.mdx            ← cheat sheet
      zdroje.mdx           ← sources
    en/python-basics/      ← English versions, same file names
  components/              ← KeyPoints, Question, Solution, course grid, chapter list…
  styles/custom.css        ← theme
```

## Adding a new course (e.g. Python Advanced)

1. In `src/courses.ts`, change the course's `status` from `'planned'` to `'active'` (or add a new entry). Its `id` is the folder name — here `python-advanced`.
2. Create `src/content/docs/python-advanced/index.mdx`:

   ```mdx
   ---
   title: Python – pokročilé
   description: One or two sentences about what the course covers.
   kind: overview
   sidebar:
     order: 0
     label: Prehľad kurzu
   ---

   import ChapterList from '../../../components/ChapterList.astro';

   ## Kapitoly

   <ChapterList course="python-advanced" />
   ```

3. Add chapters (see the template below), and optionally `tahak.mdx` (`kind: cheatsheet`, `sidebar.order: 90`) and `zdroje.mdx` (`kind: sources`, `sidebar.order: 99`).
4. Add English versions under `src/content/docs/en/python-advanced/` with the **same file names** (one more `../` in import paths). Missing English pages fall back to Slovak automatically.

The sidebar group, the home-page card, and chapter numbering (“Chapter 3 of 8”) appear automatically. Course order in the sidebar and on the home page follows the order in `courses.ts`.

## Chapter template

```mdx
---
title: Názov kapitoly
description: One line shown under the title and in the chapter list.
kind: chapter
sidebar:
  order: 3              # position in the course
  label: 03 · Krátky názov
---

import KeyPoints from '../../../components/KeyPoints.astro';
import Question from '../../../components/Question.astro';
import Solution from '../../../components/Solution.astro';

<KeyPoints>
- The 3–5 things to remember.
</KeyPoints>

## Section

Explanation and examples.

## Otestuj sa

<Question q="Question text, `code` in backticks?">
Answer (Markdown allowed).
</Question>

## Cvičenia

### 3.1 · Exercise name

What to build.

<p class="practises">Precvičíš: `topic`, `topic`.</p>

<Solution variant="hint">
Optional hint.
</Solution>

<Solution>
Solution code and a short explanation.
</Solution>
```

Use single quotes for a `q` that contains double quotes: `<Question q='What does `print("a")` do?'>`.
