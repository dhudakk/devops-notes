import { getCollection, type CollectionEntry } from 'astro:content';
import { courses, type Course } from '../courses';

export type Lang = 'sk' | 'en';

/** Site base path without a trailing slash, e.g. `/devops-notes`. */
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

const strings = {
  sk: {
    chapter: 'Kapitola',
    of: 'z',
    overview: 'Prehľad kurzu',
    cheatsheet: 'Ťahák',
    sources: 'Zdroje',
    notebook: 'Študijný zápisník',
    markStudied: 'Označiť ako preštudované',
    studied: 'Preštudované',
    keyPoints: 'Kľúčové body',
    question: 'Otázka',
    solution: 'Riešenie',
    hint: 'Nápoveda',
    showAnswer: 'Ukáž odpoveď',
    planned: 'Pripravuje sa',
    start: 'Začať',
    continue: 'Pokračovať',
    review: 'Všetko preštudované — zopakuj si ťahák',
    progress: 'preštudovaných',
  },
  en: {
    chapter: 'Chapter',
    of: 'of',
    overview: 'Course overview',
    cheatsheet: 'Cheat sheet',
    sources: 'Sources',
    notebook: 'Study notebook',
    markStudied: 'Mark as studied',
    studied: 'Studied',
    keyPoints: 'Key points',
    question: 'Question',
    solution: 'Solution',
    hint: 'Hint',
    showAnswer: 'Show answer',
    planned: 'Coming later',
    start: 'Start',
    continue: 'Continue',
    review: 'All studied — review the cheat sheet',
    progress: 'studied',
  },
} as const;

export function t(lang: Lang) {
  return strings[lang];
}

export function toLang(lang: string | undefined): Lang {
  return lang?.startsWith('en') ? 'en' : 'sk';
}

/** Slovak needs three plural forms: 1 kapitola, 2–4 kapitoly, 5+ kapitol. */
export function chapterCount(n: number, lang: Lang) {
  if (lang === 'en') return `${n} ${n === 1 ? 'chapter' : 'chapters'}`;
  if (n === 1) return '1 kapitola';
  if (n >= 2 && n <= 4) return `${n} kapitoly`;
  return `${n} kapitol`;
}

/** Strips the locale prefix: `en/python/cykly` → `python/cykly`. */
export function slugOf(id: string) {
  return id.replace(/^en(\/|$)/, '');
}

export function courseOf(id: string): Course | undefined {
  const [first] = slugOf(id).split('/');
  return courses.find((course) => course.id === first);
}

export function hrefOf(slug: string, lang: Lang) {
  const prefix = lang === 'en' ? '/en' : '';
  return `${BASE}${prefix}/${slug ? `${slug}/` : ''}`;
}

export interface ChapterInfo {
  slug: string;
  href: string;
  number: number;
  title: string;
  label: string;
  description: string | undefined;
}

type DocsEntry = CollectionEntry<'docs'>;

/**
 * Pages of one course in sidebar order. Slovak is the source of truth; an English
 * page is used when it exists, otherwise the Slovak page fills in (Starlight shows
 * the same fallback when you open it).
 */
async function coursePages(courseId: string, lang: Lang) {
  const all = await getCollection('docs');
  const byId = new Map(all.map((entry) => [entry.id, entry]));
  return all
    .filter((entry) => !entry.id.startsWith('en/') && entry.id.startsWith(`${courseId}/`))
    .map((entry) => (lang === 'en' ? byId.get(`en/${entry.id}`) ?? entry : entry))
    .sort((a, b) => (a.data.sidebar.order ?? 0) - (b.data.sidebar.order ?? 0));
}

export async function getChapters(courseId: string, lang: Lang): Promise<ChapterInfo[]> {
  const pages = await coursePages(courseId, lang);
  return pages
    .filter((entry: DocsEntry) => entry.data.kind === 'chapter')
    .map((entry, index) => {
      const slug = slugOf(entry.id);
      return {
        slug,
        href: hrefOf(slug, lang),
        number: index + 1,
        title: entry.data.title,
        label: entry.data.sidebar.label ?? entry.data.title,
        description: entry.data.description,
      };
    });
}

export async function getCoursePage(courseId: string, kind: 'cheatsheet' | 'sources', lang: Lang) {
  const pages = await coursePages(courseId, lang);
  const page = pages.find((entry) => entry.data.kind === kind);
  return page && { href: hrefOf(slugOf(page.id), lang), title: page.data.title };
}

/** Escapes text and turns `backticks` into <code> — for short strings passed as props. */
export function inlineCode(text: string) {
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return escaped.replace(/`([^`]+)`/g, '<code>$1</code>');
}
