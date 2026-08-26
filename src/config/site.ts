/**
 * Single source of truth for everything about the person and the site.
 * Nothing personal should be hard-coded into a page or component - change it
 * here and it updates everywhere, including meta tags and structured data.
 */

export const site = {
  name: 'Larry Otieno',
  role: 'Frontend Engineer • Security & Forensics',
  tagline: 'Secure, polished interfaces built with a defensible engineering mindset.',
  description:
    'Fourth-year Computer Security and Forensics student at Kabarak University, finishing my degree with hands-on full-stack and frontend architecture experience in Next.js, React and TypeScript.',
  university: 'Kabarak University',
  location: 'Nairobi, Kenya',
  timezone: 'EAT (UTC+3)',
  url: 'https://larry-otieno.github.io/My-Porfolio',
} as const;

export const contact = {
  email: 'otienolarry7@gmail.com',
  /** Displayed with non-breaking spaces; `tel` is the dial-able form. */
  phone: { display: '+254 790 247 511', tel: '+254790247511' },
  /**
   * Paste a form endpoint here to make the contact form deliver mail
   * (https://formspree.io or https://web3forms.com - both have free tiers).
   * While this is empty the form falls back to opening the visitor's mail
   * client, so a message is never silently discarded.
   */
  formEndpoint: '',
} as const;

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
  icon: 'github' | 'linkedin' | 'mail';
};

/**
 * Only links that actually resolve belong here. A profile with no URL should
 * stay commented out rather than ship as a dead link.
 */
export const socials: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/larry-otieno',
    handle: 'github.com/larry-otieno',
    icon: 'github',
  },
  // TODO: add LinkedIn once the profile URL is known, e.g.
  // {
  //   label: 'LinkedIn',
  //   href: 'https://www.linkedin.com/in/YOUR-HANDLE/',
  //   handle: 'linkedin.com/in/YOUR-HANDLE',
  //   icon: 'linkedin',
  // },
  {
    label: 'Email',
    href: `mailto:${contact.email}`,
    handle: contact.email,
    icon: 'mail',
  },
];

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Writeups', href: '/writeups' },
  { label: 'Contact', href: '/contact' },
] as const;

/**
 * Skills are grouped by domain and deliberately carry no percentage score.
 * Self-assigned numbers ("Ethical Hacking 85%") read as invented to anyone
 * hiring; the tools themselves are the credible signal.
 */
export const skillGroups = [
  {
    title: 'Frontend & UI/UX',
    description: 'Designing and shipping polished, responsive interfaces with a security-first product mindset.',
    items: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'Next.js (App Router)',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Radix UI / shadcn',
      'TanStack Query',
      'Zustand',
      'React Hook Form + Zod',
      'Recharts',
      'Responsive UI design',
      'REST API integration (Axios)',
    ],
  },
  {
    title: 'Backend & APIs',
    description: 'Building the application logic, auth flows and data access layers behind the UI.',
    items: [
      'PHP 8 (OOP, PDO)',
      'RESTful API design',
      'Python (FastAPI)',
      'Node.js',
      'MySQL',
      'PostgreSQL',
      'Schema design',
      'Migrations',
      'Query optimisation',
    ],
  },
  {
    title: 'Security & Forensics',
    description: 'Engineering controls and investigating systems with a security and evidence mindset.',
    items: [
      'Authentication & MFA',
      'JWT / RS256',
      'Argon2id',
      'AES-256-GCM',
      'Audit logging',
      'Threat modeling',
      'Incident response',
      'OWASP ZAP',
      'Burp Suite',
      'Autopsy',
      'FTK',
    ],
  },
  {
    title: 'Systems & Tooling',
    description: 'Shipping secure, maintainable systems with the expected DevSecOps workflow.',
    items: [
      'Git',
      'GitHub Actions',
      'Docker',
      'PHPStan',
      'ESLint',
      'cPanel',
      'Windows/Linux admin',
      'CI/CD',
    ],
  },
] as const;

export const certifications = [
  {
    title: 'Diploma in Cyber Security (NIST CSF 2.0) & Cloud Security (CSA v5)',
    issuer: 'Professional development',
    note: 'Security governance, cloud security, and structured cyber risk management fundamentals.',
  },
  {
    title: 'IBM SkillsBuild Cybersecurity Certificate',
    issuer: 'IBM SkillsBuild',
    note: 'In progress with focus on cybersecurity foundations and practical digital safety skills.',
  },
  {
    title: 'B.Sc. Computer Security and Forensics',
    issuer: 'Kabarak University',
    note: 'Expected completion in 2026 with strong emphasis on secure systems, digital forensics, and network security.',
  },
] as const;

export const timeline = [
  {
    period: '2023',
    title: 'Foundation in security and computing',
    detail:
      'Started the Computer Security and Forensics degree at Kabarak University, building a base in programming, networks, operating systems and systems thinking.',
  },
  {
    period: '2024',
    title: 'Specialisation in forensics and security engineering',
    detail:
      'Moved further into digital forensics, network security, secure systems design, and applied project work with a focus on practical engineering and evidence handling.',
  },
  {
    period: '2025',
    title: 'Industrial attachment and operations support',
    detail:
      'Worked as an ICT Intern with the National Gender and Equality Commission, handling helpdesk support, backups, device inventory, and troubleshooting across desktop and network systems.',
  },
  {
    period: '2025–2026',
    title: 'Full-stack product and security work',
    detail:
      'Built full-stack platforms and security-focused web apps with a strong frontend emphasis, including RBAC, MFA, payment integrations, and secure API work across multiple projects.',
  },
] as const;

export const availability = [
  {
    title: 'Frontend engineering',
    status: 'open' as const,
    detail: 'Open to frontend and full-stack product roles where strong UX and security are both valued.',
  },
  {
    title: 'Security project collaboration',
    status: 'open' as const,
    detail: 'Available for product security, secure app development, and digital forensics collaborations.',
  },
  {
    title: 'Referee details',
    status: 'on-request' as const,
    detail: 'Academic references from Kabarak University available on request.',
  },
] as const;
