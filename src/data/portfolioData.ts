export type ProjectImageKey =
  | 'loopym'
  | 'mycocolife'
  | 'floodwatch'
  | 'eyrie'
  | 'edutrack'
  | 'certicode'
  | 'spensyd'
  | 'letemcook'
  | 'craftmysite'
  | 'orbit'

export type PortfolioProject = {
  category: string
  title: string
  shortDescription: string
  description?: string
  technologies?: string[]
  imageKey?: ProjectImageKey
  imageAlt?: string
  imageFit?: 'cover' | 'contain'
  type?: 'Professional Work'
  engagement?: 'Internship'
  contributions?: string[]
  fullTechnologies?: string[]
  projectUrl?: string
  liveUrl?: string
  githubUrl?: string
  assistantOnly?: {
    technologies?: string[]
    liveUrl?: string
    githubUrl?: string
  }
}

export const projects: PortfolioProject[] = [
  {
    category: 'Production Mobile Application',
    title: 'Loopym Mobile App',
    imageKey: 'loopym',
    imageAlt: 'Loopym mobile application pool dashboard',
    imageFit: 'contain',
    type: 'Professional Work',
    engagement: 'Internship',
    shortDescription: 'A production React Native mobile application where I contributed to modernizing the interface, improving native mobile interactions, and shipping features across core application modules.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'TanStack Query', 'Zustand'],
    contributions: [
      'Rebuilt 20+ screens to modern design specifications.',
      'Integrated native iOS UI and haptic interactions to improve responsiveness and user experience.',
      'Shipped 40+ reviewed pull requests across 4 core application modules.',
      'Helped standardize reusable UI patterns across the mobile application.',
    ],
    fullTechnologies: ['React Native', 'Expo', 'TypeScript', 'Expo Router', 'TanStack Query', 'Zustand', 'React Hook Form', 'Zod', 'Firebase', 'Maestro', 'EAS', 'GitHub Actions'],
  },
  {
    category: 'Enterprise Administration Platform',
    title: 'MyCocolife Admin',
    imageKey: 'mycocolife',
    imageAlt: 'MyCocolife Admin payment processing interface',
    imageFit: 'contain',
    type: 'Professional Work',
    engagement: 'Internship',
    shortDescription: 'An enterprise administration platform where I contributed to payment processing, automated document generation, notification workflows, and administrative tools.',
    technologies: ['React', 'TypeScript', 'Material UI', 'Redux Toolkit', 'React Query'],
    contributions: [
      'Engineered an automated agent payment and client-side PDF export module using MUI X DataGrid.',
      'Reduced manual administrative processing involved in invoice generation.',
      'Implemented recurring notification scheduling.',
      'Developed role-based approval flows for administrative workflows.',
      'Contributed to maintaining structured and reusable frontend functionality across the platform.',
    ],
    fullTechnologies: ['React', 'TypeScript', 'Vite', 'Material UI', 'MUI X DataGrid', 'Redux Toolkit', 'React Query', 'Formik', 'Yup', 'SASS', 'Vitest', 'GitHub Actions', 'AWS EC2'],
  },
  {
    category: 'Web Application / Community Platform',
    title: 'FloodWatch PH',
    imageKey: 'floodwatch',
    imageAlt: 'FloodWatch PH flood monitoring platform interface',
    shortDescription: 'Community-powered flood monitoring and reporting platform.',
    description: 'FloodWatch PH is a public web platform that helps communities monitor flood conditions across the Philippines. Users can view community-submitted flood reports on an interactive map, report new incidents with photos and location data, verify existing reports, check nearby evacuation centers, monitor weather conditions, and access flood-related information through a mobile-friendly interface designed for fast and reliable public use.',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'Supabase', 'AI-Assisted'],
    githubUrl: 'https://github.com/Syddevv/Flood-Watch-PH',
    liveUrl: 'https://flood-watch-ph.vercel.app/',
  },
  {
    category: 'Mobile Application / Personal Finance',
    title: 'Eyrie',
    imageKey: 'eyrie',
    imageAlt: 'Eyrie personal finance mobile application interface',
    shortDescription: 'AI-assisted, offline-first personal finance mobile app.',
    description: 'Eyrie is an offline-first personal finance mobile application for tracking expenses, budgets, savings, and financial activity. It was developed using an AI-assisted workflow with Codex for development and v0 by Vercel for prototyping, while focusing on local storage, secure syncing, and a smooth mobile experience.',
    technologies: ['React Native', 'TypeScript', 'SQLite', 'Supabase', 'AI-Assisted'],
    liveUrl: 'https://apkpure.com/p/com.sydu.eyrie',
    githubUrl: 'https://github.com/Syddevv/eyrie',
  },
  {
    category: 'Web Application / Academic Management',
    title: 'EduTrack',
    imageKey: 'edutrack',
    imageAlt: 'EduTrack academic management system interface',
    shortDescription: 'Academic management system for attendance, classes, and reports.',
    description: 'EduTrack is a web-based academic management system that helps teachers and administrators record attendance, manage classes, and generate real-time reports. It provides clear dashboards for monitoring student performance and identifying at-risk students.',
    technologies: ['React', 'TypeScript', 'PHP', 'MySQL'],
    assistantOnly: { githubUrl: 'https://github.com/Syddevv/edutrack-frontend' },
  },
  {
    category: 'E-commerce / Full-Stack Web Application',
    title: 'Certicode E-commerce',
    imageKey: 'certicode',
    imageAlt: 'Certicode e-commerce web application interface',
    shortDescription: 'Full-stack e-commerce web application.',
    description: 'A full-stack e-commerce web application I contributed to during my internship. It features product listings, a shopping cart system, and a responsive interface for online shopping.',
    technologies: ['React', 'Laravel', 'MySQL'],
    assistantOnly: { githubUrl: 'https://github.com/Syddevv/Certicode.git' },
  },
  {
    category: 'Web Application / Personal Finance',
    title: 'SpenSyd',
    imageKey: 'spensyd',
    imageAlt: 'SpenSyd personal finance tracker interface',
    shortDescription: 'Personal finance tracker with AI integration.',
    description: 'SpenSyd is a modern web application built to help users track their spending and income efficiently, powered by a smart AI assistant.',
    technologies: ['MERN Stack', 'Gemini API', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Syddevv/SpenSyd',
    liveUrl: 'https://spen-syd.vercel.app/',
  },
  {
    category: 'Web Application / Community Platform',
    title: "Let'em Cook",
    imageKey: 'letemcook',
    imageAlt: "Let'em Cook community recipe platform interface",
    shortDescription: 'Community recipe sharing platform.',
    description: "Let'em Cook is an online community platform designed for passionate home cooks to share their culinary creations and discover recipes from other users.",
    technologies: ['MERN Stack'],
    githubUrl: 'https://github.com/Syddevv/LetemCook',
    liveUrl: 'https://letem-cook.vercel.app/',
  },
  {
    category: 'Web Platform / Marketplace',
    title: 'CraftMySite',
    imageKey: 'craftmysite',
    imageAlt: 'CraftMySite template marketplace interface',
    shortDescription: 'Template marketplace and custom web services platform.',
    description: 'CraftMySite is a web platform that combines a digital template marketplace with custom web development services, allowing users to explore ready-made website solutions and web services.',
    githubUrl: 'https://github.com/Syddevv/CraftMySite',
    assistantOnly: { technologies: ['PHP', 'MySQL', 'Gemini API'] },
  },
  {
    category: 'Web Application / Communication',
    title: 'Orbit',
    imageKey: 'orbit',
    imageAlt: 'Orbit anonymous chat application interface',
    shortDescription: 'Modern anonymous chat application.',
    description: 'Orbit is a modern anonymous chat application designed for spontaneous and anonymous conversations, allowing users to connect and communicate through a simple, focused interface.',
    githubUrl: 'https://github.com/Syddevv/Orbit',
    liveUrl: 'https://orbit-chat-web.vercel.app/',
    assistantOnly: { technologies: ['React', 'Tailwind CSS', 'Node.js', 'Socket.io', 'Mongoose'] },
  },
]

export const portfolioProfile = {
  name: 'Sydney Santos',
  pronouns: 'he/him',
  role: 'Full-stack web developer',
  location: 'Bulacan, Philippines',
  email: 'sydneysantos176@gmail.com',
  github: 'https://github.com/Syddevv',
  linkedin: 'https://www.linkedin.com/in/sydney-santos-471a0b301/',
  availability: 'Open to internships, freelance work, and other professional opportunities.',
  education: {
    program: 'BS Information Systems',
    school: 'Bulacan Polytechnic College',
    started: '2023',
    yearLevel: 'Not stated in the current portfolio.',
  },
  experiences: [
    {
      company: 'Sarappy',
      role: 'Software Developer Intern',
      date: 'July 2026 — October 2026',
      responsibilities: [
        'Shipped cross-platform features across 3 production web and mobile apps using React Native, React, and TypeScript.',
        'Built backend REST APIs and database queries using PHP, Laravel, and MySQL.',
      ],
    },
    {
      company: 'Certicode',
      role: 'Full Stack Developer Intern',
      date: 'February 2026 — May 2026',
      responsibilities: [
        'Built responsive web applications and reusable UI components using React, TypeScript, Node.js, and Express.',
        'Maintained REST API endpoints and database queries across PHP and MySQL.',
        'Contributed to an ecommerce application with product listings, a cart, and a responsive interface.',
      ],
    },
  ],
  achievements: [
    'Mini Hackathon — Third Place, Bulacan Polytechnic College, October 28, 2025.',
    'Object-Oriented Programming — Class Top 1, grade 97.06, June 3, 2025.',
    'Web Development — Rank 6, grade 93.73, October 24, 2025.',
  ],
  technologies: [
    'React', 'React Native', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3',
    'Tailwind CSS', 'TanStack Query', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB',
    'Git', 'GitHub', 'SQLite', 'Supabase', 'PHP', 'MySQL', 'Laravel', 'Socket.io',
  ],
} as const
