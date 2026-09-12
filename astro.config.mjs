import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://dhudakk.github.io',
  base: '/devops-notes',
  integrations: [
    starlight({
      title: {
        sk: 'DevOps Notes',
        en: 'DevOps Notes',
      },
      description: 'Prehľadné poznámky, príklady a cvičenia pre Python, Git, Terraform, Kubernetes a ďalšie DevOps témy.',
      defaultLocale: 'root',
      locales: {
        root: { label: 'Slovenčina', lang: 'sk' },
        en: { label: 'English', lang: 'en' },
      },
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        { label: 'Prehľad', translations: { en: 'Overview' }, link: '/' },
        { label: 'Python · Prehľad', translations: { en: 'Python · Overview' }, link: '/python/' },
        {
          label: 'Python · Deň 1',
          translations: { en: 'Python · Day 1' },
          items: [
            { label: '01 · Základy Pythonu', translations: { en: '01 · Python Basics' }, link: '/zaklady/' },
            { label: '02 · Podmienky', translations: { en: '02 · Conditions' }, link: '/podmienky/' },
            { label: '03 · Cykly', translations: { en: '03 · Loops' }, link: '/cykly/' },
            { label: '04 · Funkcie a moduly', translations: { en: '04 · Functions and modules' }, link: '/funkcie-a-moduly/' },
          ],
        },
        {
          label: 'Python · Deň 2',
          translations: { en: 'Python · Day 2' },
          items: [
            { label: '05 · Súbory a chyby', translations: { en: '05 · Files and errors' }, link: '/subory-a-chyby/' },
            { label: '06 · Zoznamy a n-tice', translations: { en: '06 · Lists and tuples' }, link: '/zoznamy-a-ntice/' },
            { label: '07 · Reťazce', translations: { en: '07 · Strings' }, link: '/retazce/' },
            { label: '08 · Slovníky a množiny', translations: { en: '08 · Dictionaries and sets' }, link: '/slovniky-a-mnoziny/' },
          ],
        },
        { label: 'Cvičenia', translations: { en: 'Exercises' }, link: '/cvicenia/' },
        { label: 'Prezentácie a zdroje', translations: { en: 'Presentations and sources' }, link: '/zdroje/' },
      ],
      expressiveCode: {
        themes: ['github-dark-high-contrast', 'github-light'],
        styleOverrides: {
          borderRadius: '0.9rem',
          frames: { frameBoxShadowCssValue: '0 20px 55px rgba(0, 0, 0, 0.32)' },
        },
      },
    }),
  ],
});
