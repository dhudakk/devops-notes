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

/**
 * Sidebar labels for sub-folders inside a course folder, keyed by folder name.
 * Starlight would otherwise show the raw folder name (e.g. "mudrosti").
 */
export const sectionLabels: Record<string, { sk: string; en: string }> = {
  mudrosti: { sk: 'Mirekove múdrosti', en: "Mirek's wisdoms" },
};

export const courses: Course[] = [
  {
    id: 'git',
    abbr: 'Git',
    status: 'active',
    label: { sk: 'Git', en: 'Git' },
    summary: {
      sk: 'Commity, staging, .gitignore, vrátenie zmien, vetvy, merge a konflikty, GitHub/GitLab, SSH, push a pull, stash, tagy a rebase.',
      en: 'Commits, staging, .gitignore, undoing changes, branches, merge and conflicts, GitHub/GitLab, SSH, push and pull, stash, tags, and rebase.',
    },
  },
  {
    id: 'python-basics',
    abbr: 'Py',
    status: 'active',
    label: { sk: 'Python – základy', en: 'Python Basics' },
    summary: {
      sk: 'Premenné, podmienky, cykly, funkcie, kolekcie, reťazce, súbory a výnimky.',
      en: 'Variables, conditions, loops, functions, collections, strings, files, and exceptions.',
    },
  },
  {
    id: 'python-advanced',
    abbr: 'Py+',
    status: 'active',
    label: { sk: 'Python – pokročilé', en: 'Python Advanced' },
    summary: {
      sk: 'Python pre DevOps: workflowy a ETL, HTTP a JSON, venv, CLI, výnimky a orchestrácia v Apache Airflow.',
      en: 'Python for DevOps: workflows and ETL, HTTP and JSON, venv, CLIs, exceptions, and orchestration with Apache Airflow.',
    },
  },
  {
    id: 'docker',
    abbr: 'Dk',
    status: 'active',
    label: { sk: 'Docker', en: 'Docker' },
    summary: {
      sk: 'Kontajnery a obrazy, zväzky, siete, Docker Compose, vlastné obrazy cez Dockerfile, bezpečnosť, Portainer a vlastný register.',
      en: 'Containers and images, volumes, networks, Docker Compose, building images with a Dockerfile, security, Portainer, and a private registry.',
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
