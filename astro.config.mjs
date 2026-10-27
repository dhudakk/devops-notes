import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { courses } from './src/courses.ts';

const base = '/devops-notes';

// Each active course becomes one collapsible sidebar group, filled from its folder
// in sidebar.order. The group of the page you are on opens automatically.
const courseGroups = courses
  .filter((course) => course.status === 'active')
  .map((course) => ({
    label: course.label.sk,
    translations: { en: course.label.en },
    collapsed: true,
    items: [{ autogenerate: { directory: course.id } }],
  }));

// The Python pages used to live at the site root, then under /python/;
// keep old links and bookmarks working.
const movedPythonPages = [
  'zaklady',
  'podmienky',
  'cykly',
  'funkcie-a-moduly',
  'zoznamy-a-ntice',
  'retazce',
  'slovniky-a-mnoziny',
  'subory-a-chyby',
  'zdroje',
];
const redirects = {};
for (const prefix of ['', '/en']) {
  for (const page of movedPythonPages) {
    redirects[`${prefix}/${page}`] = `${base}${prefix}/python-basics/${page}/`;
    redirects[`${prefix}/python/${page}`] = `${base}${prefix}/python-basics/${page}/`;
  }
  redirects[`${prefix}/python/tahak`] = `${base}${prefix}/python-basics/tahak/`;
  redirects[`${prefix}/python`] = `${base}${prefix}/python-basics/`;
  redirects[`${prefix}/cvicenia`] = `${base}${prefix}/python-basics/`;
  // Day 3 split the old chapter 12 into chapters 12–17
  redirects[`${prefix}/python-advanced/validacia-a-healthcheck`] = `${base}${prefix}/python-advanced/validacia-dat/`;
}

export default defineConfig({
  site: 'https://dhudakk.github.io',
  base,
  redirects,
  integrations: [
    starlight({
      title: 'DevOps Notes',
      description: 'Osobné študijné poznámky k DevOps skúške: Git, Python, Docker, Kubernetes a ďalšie.',
      defaultLocale: 'root',
      locales: {
        root: { label: 'Slovenčina', lang: 'sk' },
        en: { label: 'English', lang: 'en' },
      },
      customCss: [
        '@fontsource-variable/inter',
        '@fontsource-variable/jetbrains-mono',
        './src/styles/custom.css',
      ],
      components: {
        PageTitle: './src/components/PageTitle.astro',
      },
      routeMiddleware: './src/routeData.ts',
      sidebar: [{ label: 'Domov', translations: { en: 'Home' }, link: '/' }, ...courseGroups],
      lastUpdated: false,
      expressiveCode: {
        themes: ['github-dark', 'github-light'],
        styleOverrides: {
          borderRadius: '0.6rem',
          borderColor: 'var(--nb-border)',
          codeFontSize: '0.85rem',
          frames: {
            frameBoxShadowCssValue: 'none',
            editorActiveTabIndicatorTopColor: 'var(--sl-color-accent)',
          },
        },
      },
    }),
  ],
});
