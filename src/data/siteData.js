// ---------------------------------------------------------------------------
// Centralized content for the New Tech Softs redesign.
// Keeping copy/data separate from components keeps the UI layer "dumb" and
// makes it trivial to later swap this file for a CMS or API response
// (see README → "Wiring up a real API with Axios").
// ---------------------------------------------------------------------------

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Product', path: '/products' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
]

export const COMPANY = {
  name: 'New Tech Softs',
  tagline: 'Software House in Islamabad',
  description:
    'We design and engineer modern websites, mobile apps, and AI-powered products for businesses that refuse to look ordinary.',
  email: 'hello@newtechsofts.com',
  phone: '+92 300 0000000',
  address: 'Islamabad, Pakistan',
  social: {
    linkedin: 'https://linkedin.com',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
  },
}

export const TECHNOLOGIES = [
  'React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS',
  'Python', 'Django', 'MongoDB', 'PostgreSQL', 'AWS',
  'Docker', 'Flutter', 'React Native', 'OpenAI API', 'Firebase',
]

export const STATS = [
  { label: 'Projects Delivered', value: 120, suffix: '+' },
  { label: 'Happy Clients', value: 85, suffix: '+' },
  { label: 'Team Experts', value: 24, suffix: '' },
  { label: 'Years of Experience', value: 6, suffix: '+' },
]

export const WHY_CHOOSE_US = [
  {
    icon: 'Rocket',
    title: 'Fast Delivery',
    description: 'Agile sprints and clear milestones mean your product ships without the usual agency drag.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Reliable Engineering',
    description: 'Typed codebases, code review, and automated checks — built to stay stable as you scale.',
  },
  {
    icon: 'Sparkles',
    title: 'Design-Led Process',
    description: 'Every build starts from user experience, not templates — so your product feels intentional.',
  },
  {
    icon: 'Headset',
    title: 'Real Support',
    description: 'A dedicated engineer stays reachable post-launch. No ticket queues, no vanishing acts.',
  },
]

export const SERVICES = [
  {
    icon: 'Globe',
    slug: 'web-development',
    title: 'Web Development',
    short: 'Fast, responsive, SEO-ready websites and web apps built on modern frameworks.',
    description:
      'We build marketing sites, dashboards, and full-stack web applications using React, Next.js, and Node.js — engineered for performance, accessibility, and long-term maintainability.',
    features: ['Custom Web Applications', 'E-commerce Platforms', 'CMS & Headless CMS', 'API Development & Integration'],
  },
  {
    icon: 'Smartphone',
    slug: 'app-development',
    title: 'App Development',
    short: 'Native-quality iOS & Android apps from a single React Native / Flutter codebase.',
    description:
      'From MVP to production, we design and ship cross-platform mobile apps that feel native, backed by scalable APIs and clean release pipelines.',
    features: ['iOS & Android Apps', 'Cross-Platform (React Native / Flutter)', 'App Store Deployment', 'Push Notifications & Analytics'],
  },
  {
    icon: 'BrainCircuit',
    slug: 'ai-solutions',
    title: 'AI Solutions',
    short: 'Practical AI features — chatbots, automation, and ML-driven insights.',
    description:
      'We integrate LLMs and machine learning into real workflows: support chatbots, document intelligence, recommendation engines, and internal automation tools.',
    features: ['AI Chatbots & Assistants', 'Process Automation', 'Predictive Analytics', 'LLM Integration (OpenAI, etc.)'],
  },
  {
    icon: 'PenTool',
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    short: 'Interfaces that are researched, tested, and genuinely pleasant to use.',
    description:
      'Wireframes to high-fidelity prototypes — our design process is grounded in usability testing and modern visual systems like glassmorphism and motion design.',
    features: ['User Research & Wireframing', 'Design Systems', 'Interactive Prototypes', 'Motion & Micro-interactions'],
  },
  {
    icon: 'Cloud',
    slug: 'cloud-devops',
    title: 'Cloud & DevOps',
    short: 'Reliable infrastructure, CI/CD pipelines, and cloud cost optimization.',
    description:
      'We architect infrastructure on AWS and containerized deployments with Docker, set up CI/CD, and keep your systems observable and secure.',
    features: ['AWS / Cloud Architecture', 'CI/CD Pipelines', 'Containerization (Docker)', 'Monitoring & Security'],
  },
  {
    icon: 'LineChart',
    slug: 'digital-strategy',
    title: 'Digital Strategy',
    short: 'Product strategy and technical consulting for founders and growing teams.',
    description:
      'Not sure where to start? We help scope MVPs, audit existing systems, and build a realistic technical roadmap.',
    features: ['MVP Scoping', 'Technical Audits', 'Product Roadmapping', 'Ongoing Consulting'],
  },
]

export const PROCESS = [
  { step: '01', title: 'Discover', description: 'We dig into your goals, users, and constraints before writing a single line of code.' },
  { step: '02', title: 'Design', description: 'Wireframes and glass-morphism UI concepts, refined with your feedback in tight loops.' },
  { step: '03', title: 'Develop', description: 'Agile sprints with visible progress — staging links, not status meetings.' },
  { step: '04', title: 'Deliver', description: 'QA, performance passes, and a smooth handover, then we stick around for support.' },
]

export const TEAM = [
  { name: 'Hamza Ahmed', role: 'Founder & Lead Engineer', avatarSeed: 'hamza' },
  { name: 'Ayesha Khan', role: 'Product Designer', avatarSeed: 'ayesha' },
  { name: 'Bilal Raza', role: 'Full-Stack Developer', avatarSeed: 'bilal' },
  { name: 'Sana Malik', role: 'AI/ML Engineer', avatarSeed: 'sana' },
]

export const TESTIMONIALS = [
  {
    name: 'Usman Tariq',
    role: 'CEO, Finlytics',
    quote:
      'New Tech Softs rebuilt our dashboard from the ground up. Load times dropped, and our team actually enjoys using it now.',
  },
  {
    name: 'Emily Carter',
    role: 'Founder, Lumen Retail',
    quote:
      'They scoped our MVP realistically and shipped on time. Communication throughout was clear and honest.',
  },
  {
    name: 'Farhan Siddiqui',
    role: 'COO, MedConnect',
    quote:
      'The AI intake assistant they built now handles most first-line patient queries. It paid for itself in two months.',
  },
  {
    name: 'Zara Sheikh',
    role: 'Marketing Lead, Bloom Cosmetics',
    quote:
      'Our new storefront feels premium and converts noticeably better. The glassmorphism design gets compliments constantly.',
  },
]

export const FAQS = [
  {
    question: 'How long does a typical project take?',
    answer:
      'A marketing website usually takes 2–4 weeks. Full web or mobile applications range from 6–14 weeks depending on scope. We give a firm estimate after the discovery call.',
  },
  {
    question: 'Do you work with startups or only established businesses?',
    answer:
      'Both. We have a dedicated MVP process for early-stage founders, and a separate track for teams scaling an existing product.',
  },
  {
    question: 'What does the payment structure look like?',
    answer:
      'Projects are split into milestones (typically 3–4), each tied to a concrete deliverable. Retainer options are available for ongoing work.',
  },
  {
    question: 'Can you work with our existing codebase?',
    answer:
      'Yes — we regularly audit and extend existing React, Node, and mobile codebases rather than rebuilding from scratch.',
  },
  {
    question: 'Do you provide support after launch?',
    answer:
      'Every project includes a post-launch support window, and ongoing maintenance retainers are available after that.',
  },
]

export const PORTFOLIO = [
  { title: 'Finlytics Dashboard', category: 'Web App', tags: ['React', 'Node.js', 'PostgreSQL'], summary: 'A real-time financial analytics dashboard with role-based access and custom reporting.' },
  { title: 'Lumen Retail Storefront', category: 'E-commerce', tags: ['Next.js', 'Stripe', 'Tailwind'], summary: 'Headless e-commerce storefront with sub-second page loads and a custom checkout flow.' },
  { title: 'MedConnect AI Assistant', category: 'AI Solution', tags: ['OpenAI API', 'Python', 'FastAPI'], summary: 'An AI intake assistant that triages patient queries before reaching staff.' },
  { title: 'Bloom Cosmetics App', category: 'Mobile App', tags: ['React Native', 'Firebase'], summary: 'Cross-platform shopping app with AR try-on preview and loyalty rewards.' },
  { title: 'RouteWise Logistics', category: 'Web App', tags: ['React', 'Node.js', 'AWS'], summary: 'Fleet management platform with live GPS tracking and route optimization.' },
  { title: 'Nimbus Cloud Ops', category: 'DevOps', tags: ['Docker', 'AWS', 'CI/CD'], summary: 'Migrated a monolith to containerized microservices, cutting deploy time by 70%.' },
]

export const PRODUCTS = [
  {
    name: 'ClientSync CRM',
    tagline: 'Lightweight CRM for service businesses',
    description: 'Track leads, proposals, and invoices in one glass-clean dashboard, built for small teams that outgrew spreadsheets.',
    features: ['Pipeline & deal tracking', 'Automated follow-up emails', 'Invoice generation', 'Team activity feed'],
  },
  {
    name: 'HelpDesk AI',
    tagline: 'AI-first customer support inbox',
    description: 'An AI-assisted shared inbox that drafts replies, tags tickets, and surfaces the right knowledge-base article automatically.',
    features: ['AI-drafted replies', 'Smart ticket routing', 'Knowledge base search', 'CSAT reporting'],
  },
  {
    name: 'MetricBoard',
    tagline: 'Embeddable analytics widgets',
    description: 'Drop real-time, on-brand analytics charts into any product without building a dashboard from scratch.',
    features: ['Drag-and-drop widgets', 'White-label theming', 'REST & GraphQL sources', 'Role-based sharing'],
  },
]

export const BLOG_POSTS = [
  {
    slug: 'why-glassmorphism-still-works-in-2026',
    title: 'Why Glassmorphism Still Works in 2026',
    excerpt: 'Frosted panels and soft depth cues went from trend to toolkit staple. Here is why it still earns its place in modern interfaces.',
    category: 'Design',
    date: 'Jul 12, 2026',
    readTime: '6 min read',
  },
  {
    slug: 'choosing-between-react-native-and-flutter',
    title: 'Choosing Between React Native and Flutter in 2026',
    excerpt: 'Both frameworks matured a lot. We break down where each one actually wins for real client projects.',
    category: 'Mobile',
    date: 'Jun 28, 2026',
    readTime: '8 min read',
  },
  {
    slug: 'shipping-ai-features-without-the-hype',
    title: 'Shipping AI Features Without the Hype',
    excerpt: 'A practical framework for deciding when an AI feature actually helps users, and when it is just noise.',
    category: 'AI',
    date: 'Jun 09, 2026',
    readTime: '5 min read',
  },
  {
    slug: 'performance-budget-for-marketing-sites',
    title: 'Setting a Performance Budget for Marketing Sites',
    excerpt: 'How we keep Lighthouse scores above 95 on animation-heavy client sites, and the trade-offs involved.',
    category: 'Engineering',
    date: 'May 22, 2026',
    readTime: '7 min read',
  },
  {
    slug: 'anatomy-of-a-design-system',
    title: 'The Anatomy of a Reusable Design System',
    excerpt: 'Tokens, primitives, and composition patterns — how we structure design systems so they survive real projects.',
    category: 'Design',
    date: 'May 03, 2026',
    readTime: '9 min read',
  },
  {
    slug: 'client-onboarding-that-doesnt-suck',
    title: 'Client Onboarding That Doesn\u2019t Suck',
    excerpt: 'The discovery-call structure and documents we use to scope projects accurately before a single estimate is sent.',
    category: 'Process',
    date: 'Apr 18, 2026',
    readTime: '4 min read',
  },
]
