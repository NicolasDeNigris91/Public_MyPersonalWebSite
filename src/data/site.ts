import type { SiteConfig, Skill } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Nicolas Pilegi De Nigris',
  tagline: 'Software Developer',
  email: 'nicolas.denigris91@icloud.com',
  phone: '(11) 98383-2041',
  phoneLink: 'tel:+5511983832041',
  github: 'https://github.com/NicolasDeNigris91',
  linkedin: 'https://www.linkedin.com/in/nicolasdenigris/',
  location: 'São Paulo, SP',
};

export const skillsData: Skill[] = [
  {
    category: 'Linguagens',
    items: ['Python', 'Java', 'TypeScript', 'JavaScript', 'Go', 'C#', 'Rust'],
  },
  {
    category: 'Frameworks',
    items: [
      'React.js',
      'Next.js',
      'FastAPI',
      'Django',
      'ASP.NET',
      'Express.js',
    ],
  },
  {
    category: 'Infraestrutura',
    items: [
      'Docker',
      'Kubernetes',
      'Amazon S3',
      'Git & GitHub',
      'TCP/IP',
      'Microservices',
    ],
  },
  {
    category: 'Dados e ferramentas',
    items: ['MongoDB', 'Qlikview', 'Qlik Replicate', 'Agile Scrum'],
  },
];
