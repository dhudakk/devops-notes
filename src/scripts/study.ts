/**
 * "Studied" progress, kept in this browser only (localStorage).
 *
 * Elements opt in with data attributes:
 * - [data-study-toggle="python/cykly"]   button that flips the chapter's state
 * - [data-study-item="python/cykly"]     gets .is-studied
 * - [data-study-progress="a,b,c"]        gets --progress and fills [data-study-count]
 * - [data-continue]                      link pointed at the first unstudied chapter
 * Sidebar links to studied chapters get .is-studied automatically.
 */
const KEY = 'devops-notes:studied';
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

function read(): Set<string> {
  try {
    const value = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    return new Set(Array.isArray(value) ? value : []);
  } catch {
    return new Set();
  }
}

function write(studied: Set<string>) {
  try {
    localStorage.setItem(KEY, JSON.stringify([...studied]));
  } catch {
    // Storage blocked (private mode, disabled site data) — state lasts until reload.
  }
}

function slugFromHref(href: string) {
  let path = new URL(href, location.href).pathname;
  if (BASE && path.startsWith(BASE)) path = path.slice(BASE.length);
  return path.replace(/^\/+|\/+$/g, '').replace(/^en(\/|$)/, '');
}

let current = read();

function render() {
  document.querySelectorAll<HTMLElement>('[data-study-toggle]').forEach((button) => {
    button.setAttribute('aria-pressed', String(current.has(button.dataset.studyToggle!)));
  });

  document.querySelectorAll<HTMLElement>('[data-study-item]').forEach((item) => {
    item.classList.toggle('is-studied', current.has(item.dataset.studyItem!));
  });

  document.querySelectorAll<HTMLAnchorElement>('nav.sidebar a[href]').forEach((link) => {
    link.classList.toggle('is-studied', current.has(slugFromHref(link.href)));
  });

  document.querySelectorAll<HTMLElement>('[data-study-progress]').forEach((meter) => {
    const ids = meter.dataset.studyProgress!.split(',').filter(Boolean);
    const done = ids.filter((id) => current.has(id)).length;
    meter.style.setProperty('--progress', String(ids.length ? done / ids.length : 0));
    const count = meter.querySelector('[data-study-count]');
    if (count) count.textContent = String(done);
  });

  document.querySelectorAll<HTMLAnchorElement>('a[data-continue]').forEach((link) => {
    const chapters: { slug: string; href: string; label: string }[] = JSON.parse(link.dataset.continue!);
    const next = chapters.find((chapter) => !current.has(chapter.slug));
    const label = link.querySelector('[data-continue-label]');
    const verb = link.querySelector('[data-continue-verb]');
    const anyStudied = chapters.some((chapter) => current.has(chapter.slug));
    if (next) {
      link.href = next.href;
      if (label) label.textContent = next.label;
      if (verb) verb.textContent = anyStudied ? link.dataset.continueText! : link.dataset.startText!;
    } else {
      link.href = link.dataset.doneHref ?? link.href;
      if (label) label.textContent = '';
      if (verb) verb.textContent = link.dataset.doneText!;
    }
  });
}

document.addEventListener('click', (event) => {
  const button = (event.target as Element).closest<HTMLElement>('[data-study-toggle]');
  if (!button) return;
  const id = button.dataset.studyToggle!;
  current = read();
  if (current.has(id)) current.delete(id);
  else current.add(id);
  write(current);
  render();
});

window.addEventListener('storage', (event) => {
  if (event.key === KEY) {
    current = read();
    render();
  }
});

render();
