import { StatItem, ServiceItem, BenefitItem, ProjectItem, TestimonialItem } from './types';

export const STATS_DATA: StatItem[] = [
  {
    id: 'members',
    value: '500+',
    label: 'Elite Members',
    description: 'Active engineers, visual designers, and system architects.',
    iconName: 'Users'
  },
  {
    id: 'projects',
    value: '50+',
    label: 'Projects Shipped',
    description: 'Live decentralized protocols, web apps, and system kernels.',
    iconName: 'Cpu'
  },
  {
    id: 'mentors',
    value: '20+',
    label: 'Expert Mentors',
    description: 'Tech leads guiding development squads inside our labs.',
    iconName: 'Brain'
  },
  {
    id: 'challenges',
    value: '100+',
    label: 'Paid Challenges',
    description: 'Completed bounty cycles and competitive hackathons.',
    iconName: 'ShieldAlert'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Ultrafast responsive products utilizing the latest React/Vite, Next.js, and Solid systems, engineered for maximum throughput.',
    iconName: 'Layout',
    color: '#3B82F6', // Blue
    tag: 'Next-Gen Frontend'
  },
  {
    id: 'app-dev',
    title: 'App Development',
    description: 'Native and hybrid mobile constructs deployed smoothly via React Native, Kotlin, and swift architectures with offline-first local cores.',
    iconName: 'Smartphone',
    color: '#8B5CF6', // Purple
    tag: 'React Native'
  },
  {
    id: 'seo',
    title: 'SEO',
    description: 'Deterministic crawler optimization, core web vitals acceleration, structural sitemapping, and deep semantic indexing structures.',
    iconName: 'TrendingUp',
    color: '#06B6D4', // Cyan
    tag: 'SEO Nexus'
  },
  {
    id: 'video-editing',
    title: 'Video Editing & Visuals',
    description: 'Futuristic product walk-throughs, high-end 3D visual mockups, promotional design trailers, and fluid motion graphics.',
    iconName: 'Film',
    color: '#EC4899', // Pink
    tag: '3D & Motion'
  },
  {
    id: 'tech-support',
    title: 'Technical Support',
    description: 'Instance orchestration, dockerized microservice deployments, secure Nginx routing, SSL, and fully managed server operations.',
    iconName: 'Terminal',
    color: '#EF4444', // Red
    tag: 'DevOps & Sec'
  },
  {
    id: 'learning',
    title: 'Learning Resources',
    description: 'Uncensored access to advanced programming guides, server architecture guidelines, WebAssembly templates, and smart contracts vaults.',
    iconName: 'BookOpen',
    color: '#10B981', // Green
    tag: 'Vault Access'
  },
  {
    id: 'robotics',
    title: 'Robotics Resources',
    description: 'Edge-node firmware configurations, ESP32 and raspberry-pi communication schemas, IoT integrations, and mechanical telemetry specs.',
    iconName: 'Cpu',
    color: '#F59E0B', // Orange
    tag: 'LAB-9 Edge'
  },
  {
    id: 'mentorship',
    title: 'Mentorship',
    description: 'Direct 1-on-1 guidance from architects who have shipped corporate systems, helping you build a robust career hierarchy.',
    iconName: 'Compass',
    color: '#6366F1', // Indigo
    tag: '1-on-1 Guidance'
  }
];

export const BENEFITS_DATA: BenefitItem[] = [
  {
    id: 'collab',
    title: 'Project Collaboration',
    description: 'Team up with developers, developers-turned-founders, and specialists in our active guild. Bring raw designs to production builds.',
    number: '01',
    badge: 'Co-Ship Guilds',
    iconName: 'GitBranch'
  },
  {
    id: 'networking',
    title: 'Elite Networking',
    description: 'Gain entry into close-door technical discussions, connect with investors in our direct pipeline, and access elite developer workspaces.',
    number: '02',
    badge: 'Private Circles',
    iconName: 'Zap'
  },
  {
    id: 'challenges',
    title: 'Paid Challenges & Bounties',
    description: 'Win high-yield challenges sponsored by our partner ecosystem, featuring absolute transparency and immediate smart contract disbursement.',
    number: '03',
    badge: 'Direct Monetization',
    iconName: 'Coins'
  },
  {
    id: 'mentorship',
    title: 'Mentorship Programs',
    description: 'Receive weekly progress reviews, technical mock interviews, and code-review walkthroughs with active tech-leads.',
    number: '04',
    badge: 'Accelerated Path',
    iconName: 'UserCheck'
  },
  {
    id: 'skills',
    title: 'Next-Level Skill Development',
    description: 'Progressive learning paths covering modern performance optimizations, advanced systems designs, database replication plans, and secure protocol creation.',
    number: '05',
    badge: 'T-Shaped Architect',
    iconName: 'Layers'
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'nexus-9',
    title: 'NEXUS-9 Gateway',
    tagline: 'Decentralized serverless orchestration agent featuring instant request proxying and live edge telemetry.',
    tags: ['Rust', 'WASM', 'Web3'],
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
    link: '#',
    author: 'Code9 Core',
    likes: 142
  },
  {
    id: 'cyber-shield',
    title: 'CyberShield Agent',
    tagline: 'Deep-learning anomalous firewall daemon mapping live network coordinates and blocking DDoS cycles.',
    tags: ['Python', 'Go', 'ML'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    link: '#',
    author: 'Ahn-0x',
    likes: 98
  },
  {
    id: 'orion-os',
    title: 'Orion Edge Kernel',
    tagline: 'Stripped-down micro-operating-system tailored for distributed high-speed robotic routing instances.',
    tags: ['C++', 'IoT', 'WASM'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    link: '#',
    author: 'Marcus.C',
    likes: 115
  },
  {
    id: 'hex-dapp',
    title: 'HEX Crypt Channel',
    tagline: 'Completely localized, decentralized messaging interface relying on peer-to-peer noise-protocol handshakes.',
    tags: ['React', 'TypeScript', 'Web3'],
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=800&q=80',
    link: '#',
    author: 'Satoshi94',
    likes: 84
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'member-1',
    name: 'Sarah Jenkins',
    role: 'Lead Architect @ DevGlow',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
    quote: 'Code9 refined my engineering scope. The collective squads pushed me to master WASM orchestration and high-throughput databases. It is not just a chatroom; it is a full-scale digital accelerator.',
    rating: 5
  },
  {
    id: 'member-2',
    name: 'Aleksei Volkov',
    role: 'Senior Rust Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    quote: 'The collaborative challenge payouts are immediate, and the mentorship reviews are extremely brutal yet highly rewarding. We engineered and launched an OS kernel that won 3 distinct open-source grants.',
    rating: 5
  },
  {
    id: 'member-3',
    name: 'Maya Lin',
    role: 'Security Engineer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120&q=80',
    quote: 'Connected with top-tier cybersecurity vectors in Code9. The technical excellence within this community eclipses any dev Discord or stack platform. My network expanded into elite territory.',
    rating: 5
  }
];

export const SECTION_METADATA: Record<string, { title: string; dsc: string }> = {
  home: {
    title: "Code9 Community | Vanguard Developer Cooperative",
    dsc: "Elite cooperative ecosystem for vanguard developers, digital architects, and systems engineers preparing the autonomous future."
  },
  manifesto: {
    title: "The Manifesto | Code9 Community",
    dsc: "Explore the Code9 Manifesto. Unleashing T-shaped technical talent through peer-to-peer co-shipping, rigorous mentorship circles, and paid sandbox challenges."
  },
  services: {
    title: "Services & Tech Labs | Code9 Community",
    dsc: "Discover our high-performing development labs focusing on highly-scalable Web Development (React/WASM), App Development, and curated Learning Resource Vaults."
  },
  nexus: {
    title: "Nexus Collective | Code9 Community",
    dsc: "Connect with Code9's expansive developer directory featuring over 500 vanguard members, interactive expert mentors, and elite shared projects."
  },
  projects: {
    title: "Active Sandboxes & Builds | Code9 Community",
    dsc: "View production prototypes, secure browser defense frameworks, and decentralization kernels shipped live by the Code9 cooperative."
  },
  benefits: {
    title: "Community Benefits & Growth | Code9 Community",
    dsc: "Accelerate your mastery. Master modern frontend capabilities, acquire paid workspace bounties, and access private expert layers."
  }
};
