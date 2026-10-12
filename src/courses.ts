/**
 * The list of courses in the notebook — the single place to register a new topic.
 *
 * `id` is the folder name in `src/content/docs/` (and `src/content/docs/en/`).
 * Active courses get a sidebar group and a card on the home page; planned courses
 * only get a greyed-out card. See README.md → "Adding a new course".
 */
export interface Course {
  id: string;
  /** Short monogram shown on the course card. */
  abbr: string;
  status: 'active' | 'planned';
  label: { sk: string; en: string };
  summary: { sk: string; en: string };
}

export const courses: Course[] = [
  {
    id: 'python',
    abbr: 'Py',
    status: 'active',
    label: { sk: 'Python', en: 'Python' },
    summary: {
      sk: 'Premenné, podmienky, cykly, funkcie, kolekcie, reťazce, súbory a výnimky.',
      en: 'Variables, conditions, loops, functions, collections, strings, files, and exceptions.',
    },
  },
  {
    id: 'docker',
    abbr: 'Dk',
    status: 'planned',
    label: { sk: 'Docker', en: 'Docker' },
    summary: {
      sk: 'Obrazy, kontajnery, Dockerfile, volumes, siete a Docker Compose.',
      en: 'Images, containers, Dockerfiles, volumes, networks, and Docker Compose.',
    },
  },
  {
    id: 'kubernetes',
    abbr: 'K8s',
    status: 'planned',
    label: { sk: 'Kubernetes', en: 'Kubernetes' },
    summary: {
      sk: 'Pody, deploymenty, služby, konfigurácia a prevádzka kontajnerových aplikácií.',
      en: 'Pods, deployments, services, configuration, and running containerised apps.',
    },
  },
  {
    id: 'git',
    abbr: 'Git',
    status: 'planned',
    label: { sk: 'Git', en: 'Git' },
    summary: {
      sk: 'Commity, vetvy, merge a rebase, konflikty a spolupráca cez remote.',
      en: 'Commits, branches, merge and rebase, conflicts, and working with remotes.',
    },
  },
  {
    id: 'terraform',
    abbr: 'Tf',
    status: 'planned',
    label: { sk: 'Terraform', en: 'Terraform' },
    summary: {
      sk: 'Infrastructure as Code, providery, state, moduly a plan/apply workflow.',
      en: 'Infrastructure as Code, providers, state, modules, and the plan/apply workflow.',
    },
  },
];
