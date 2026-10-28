import React, { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  Globe,
  Home,
  User,
  Briefcase,
  Code2,
  GraduationCap,
  Mail,
  ExternalLink,
  Send,
  Sparkles,
  Image as ImageIcon,
  CheckCircle2,
  Layers,
  LayoutGrid,
  ChevronRight,
  MapPin,
  Download,
  Terminal,
  Cpu,
  Palette
} from 'lucide-react';

const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ==========================================
// 1. TYPES & INTERFACES
// ==========================================

type Language = 'fr' | 'en';
type WindowId = 'home' | 'about' | 'projects' | 'skills' | 'experience' | 'contact';

interface Project {
  id: number;
  title: string;
  category: 'web' | 'mobile' | 'design';
  description: { fr: string; en: string };
  placeholderLabel: { fr: string; en: string };
  aspectRatio: string;
  tags: string[];
  liveUrl: string;
  repoUrl: string;
  featured?: boolean;
}

interface SkillItem {
  name: string;
  level: number;
}

interface SkillCategory {
  id: string;
  title: { fr: string; en: string };
  icon: 'code' | 'server' | 'design';
  skills: SkillItem[];
}

interface ExperienceItem {
  id: number;
  period: string;
  role: { fr: string; en: string };
  company: string;
  location: string;
  description: { fr: string; en: string };
  type: 'work' | 'education';
}

// ==========================================
// 2. DICTIONNAIRE DE TRADUCTION (FR / EN)
// ==========================================

const translations = {
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À propos',
      projects: 'Projets',
      skills: 'Compétences',
      experience: 'Parcours',
      contact: 'Contact',
      viewModeSingle: 'Vue Fenêtre',
      viewModeAll: 'Vue Complète',
    },
    home: {
      badge: 'Disponible pour de nouvelles opportunités',
      greeting: 'Bonjour, je suis',
      name: 'Alexandre Martin',
      role: 'Développeur Full-Stack & Architecte UI',
      description:
        "Je conçois des applications web performantes, accessibles et esthétiques avec React, TypeScript et des architectures modernes.",
      ctaPrimary: 'Explorer mes projets',
      ctaSecondary: 'Me contacter',
      portraitPlaceholder: 'Photo de profil (Portrait studio 800x1000)',
      stats: {
        exp: "Années d'exp.",
        projects: 'Projets livrés',
        clients: 'Clients satisfaits',
      },
    },
    about: {
      title: 'À propos de moi',
      subtitle: 'Allier rigueur technique et sensibilité design',
      bio1:
        "Passionné par l'écosystème web moderne depuis plus de 5 ans, je transforme des problématiques complexes en interfaces intuitives et rapides.",
      bio2:
        "Mon approche repose sur un code propre, maintenable et orienté composant, avec une attention particulière portée aux micro-interactions et à l'accessibilité.",
      workspacePlaceholder: 'Photo de mon espace de travail / Setup (1200x800)',
      confPlaceholder: 'Photo en conférence / Hackathon (800x600)',
      downloadCv: 'Télécharger mon CV',
      highlights: [
        { label: 'Localisation', value: 'Toulouse / Télétravail' },
        { label: 'Spécialité', value: 'React, TypeScript, Node.js' },
        { label: 'Langues', value: 'Français (Natif), Anglais (C1)' },
      ],
    },
    projects: {
      title: 'Projets Récents',
      subtitle: 'Sélection de réalisations techniques et créatives',
      filters: {
        all: 'Tous',
        web: 'Applications Web',
        mobile: 'Mobile',
        design: 'Design System',
      },
      viewLive: 'Démo Live',
      viewCode: 'Code Source',
    },
    skills: {
      title: 'Compétences Techniques',
      subtitle: 'Technologies et outils que j’utilise au quotidien',
      architecturePlaceholder: 'Schéma d’architecture Cloud / CI-CD (1000x450)',
    },
    experience: {
      title: 'Parcours & Formation',
      subtitle: 'Mon évolution professionnelle et académique',
      workBadge: 'Expérience Pro',
      eduBadge: 'Formation',
    },
    contact: {
      title: 'Travaillons Ensemble',
      subtitle: 'Un projet en tête ou une opportunité ? Écrivez-moi.',
      nameLabel: 'Votre nom',
      namePlaceholder: 'Jean Dupont',
      emailLabel: 'Votre email',
      emailPlaceholder: 'jean@exemple.fr',
      messageLabel: 'Votre message',
      messagePlaceholder: 'Décrivez votre projet, vos besoins et vos délais...',
      submitBtn: 'Envoyer le message',
      sendingBtn: 'Envoi en cours...',
      successMsg: 'Message envoyé avec succès ! Je vous répondrai sous 24h.',
      mapPlaceholder: 'Carte interactive ou photo de la ville (Toulouse - 800x500)',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      experience: 'Journey',
      contact: 'Contact',
      viewModeSingle: 'Window View',
      viewModeAll: 'Full Scroll',
    },
    home: {
      badge: 'Available for new opportunities',
      greeting: "Hi, I'm",
      name: 'Alexandre Martin',
      role: 'Full-Stack Developer & UI Architect',
      description:
        'I build fast, accessible, and visually polished web applications using React, TypeScript, and modern cloud architectures.',
      ctaPrimary: 'Explore Projects',
      ctaSecondary: 'Get in Touch',
      portraitPlaceholder: 'Profile Picture (Studio Portrait 800x1000)',
      stats: {
        exp: 'Years Exp.',
        projects: 'Projects Shipped',
        clients: 'Happy Clients',
      },
    },
    about: {
      title: 'About Me',
      subtitle: 'Bridging engineering precision with design sensibility',
      bio1:
        'Passionate about the modern web ecosystem for over 5 years, I turn complex problems into intuitive, lightning-fast user interfaces.',
      bio2:
        'My workflow focuses on clean, maintainable, component-driven code with strong attention to micro-interactions and accessibility.',
      workspacePlaceholder: 'Workspace / Desk Setup Photo (1200x800)',
      confPlaceholder: 'Speaking at Conference / Hackathon Photo (800x600)',
      downloadCv: 'Download Resume',
      highlights: [
        { label: 'Location', value: 'Toulouse, France / Remote' },
        { label: 'Core Stack', value: 'React, TypeScript, Node.js' },
        { label: 'Languages', value: 'French (Native), English (Fluent)' },
      ],
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'A curated selection of technical and creative works',
      filters: {
        all: 'All',
        web: 'Web Apps',
        mobile: 'Mobile',
        design: 'Design Systems',
      },
      viewLive: 'Live Demo',
      viewCode: 'Source Code',
    },
    skills: {
      title: 'Technical Skills',
      subtitle: 'Technologies and tools I work with daily',
      architecturePlaceholder: 'Cloud Architecture / CI-CD Diagram Placeholder (1000x450)',
    },
    experience: {
      title: 'Experience & Education',
      subtitle: 'My professional and academic timeline',
      workBadge: 'Work Experience',
      eduBadge: 'Education',
    },
    contact: {
      title: "Let's Work Together",
      subtitle: 'Have a project in mind or an opportunity? Drop a message.',
      nameLabel: 'Your Name',
      namePlaceholder: 'John Doe',
      emailLabel: 'Your Email',
      emailPlaceholder: 'john@example.com',
      messageLabel: 'Your Message',
      messagePlaceholder: 'Tell me about your project, goals, and timeline...',
      submitBtn: 'Send Message',
      sendingBtn: 'Sending...',
      successMsg: 'Message sent successfully! I will get back to you within 24h.',
      mapPlaceholder: 'Interactive Map or City Photo Placeholder (800x500)',
    },
  },
};

// ==========================================
// 3. DONNÉES DU PORTFOLIO
// ==========================================

const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: 'NovaFin Analytics',
    category: 'web',
    description: {
      fr: 'Tableau de bord financier en temps réel avec visualisation de données complexes et alertes prédictives.',
      en: 'Real-time financial dashboard featuring complex data visualizations and predictive alerts.',
    },
    placeholderLabel: {
      fr: 'Capture Dashboard NovaFin (16:9 - Mockup MacBook)',
      en: 'NovaFin Dashboard Screenshot (16:9 - MacBook Mockup)',
    },
    aspectRatio: '16:9',
    tags: ['React', 'TypeScript', 'Tailwind', 'D3.js'],
    liveUrl: '#',
    repoUrl: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'Pulse Design System',
    category: 'design',
    description: {
      fr: "Bibliothèque de 45+ composants UI accessibles (WAI-ARIA) avec support natif du mode sombre et tokens Figma.",
      en: 'Library of 45+ accessible UI components (WAI-ARIA) with native dark mode and Figma tokens.',
    },
    placeholderLabel: {
      fr: 'Aperçu des composants Pulse UI (16:9)',
      en: 'Pulse UI Components Preview (16:9)',
    },
    aspectRatio: '16:9',
    tags: ['TypeScript', 'Storybook', 'Radix UI', 'Tailwind'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 3,
    title: 'EcoTrack Mobile',
    category: 'mobile',
    description: {
      fr: "Application mobile permettant de suivre et réduire son empreinte carbone quotidienne avec gamification.",
      en: 'Mobile app helping users track and reduce their daily carbon footprint through gamification.',
    },
    placeholderLabel: {
      fr: 'Mockup 3 écrans iPhone EcoTrack (16:9)',
      en: '3 iPhone Screens Mockup EcoTrack (16:9)',
    },
    aspectRatio: '16:9',
    tags: ['React Native', 'Expo', 'Node.js', 'PostgreSQL'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 4,
    title: 'Kinetix AI Studio',
    category: 'web',
    description: {
      fr: 'Éditeur collaboratif de génération de workflows automatisés avec interface nodale glisser-déposer.',
      en: 'Collaborative automated workflow editor featuring a drag-and-drop node interface.',
    },
    placeholderLabel: {
      fr: 'Interface éditeur nodal Kinetix (16:9)',
      en: 'Kinetix Node Editor Interface (16:9)',
    },
    aspectRatio: '16:9',
    tags: ['Next.js', 'TypeScript', 'WebSockets', 'Prisma'],
    liveUrl: '#',
    repoUrl: '#',
  },
];

const SKILLS_DATA: SkillCategory[] = [
  {
    id: 'frontend',
    title: { fr: 'Développement Front-End', en: 'Front-End Development' },
    icon: 'code',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 92 },
      { name: 'Tailwind CSS / CSS Moderne', level: 96 },
      { name: 'State Management (Zustand / Redux)', level: 88 },
    ],
  },
  {
    id: 'backend',
    title: { fr: 'Back-End & Cloud', en: 'Back-End & Cloud' },
    icon: 'server',
    skills: [
      { name: 'Node.js / Express / Fastify', level: 88 },
      { name: 'PostgreSQL / Prisma ORM', level: 85 },
      { name: 'GraphQL / REST API', level: 90 },
      { name: 'Docker & CI/CD (GitHub Actions)', level: 80 },
    ],
  },
  {
    id: 'design',
    title: { fr: 'UI/UX & Qualité', en: 'UI/UX & Quality' },
    icon: 'design',
    skills: [
      { name: 'Figma & Design Systems', level: 90 },
      { name: 'Accessibilité Web (RGAA / WCAG)', level: 86 },
      { name: 'Tests (Vitest / Playwright)', level: 84 },
      { name: 'Web Performance & SEO', level: 92 },
    ],
  },
];

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 1,
    period: '2024 - Présent',
    role: { fr: 'Lead Développeur Front-End', en: 'Lead Front-End Developer' },
    company: 'Aether Tech',
    location: 'Toulouse, France',
    description: {
      fr: "Pilotage de l'architecture React/TypeScript, création du Design System interne et amélioration de 40% du score Lighthouse.",
      en: 'Spearheaded the React/TypeScript architecture, built the internal Design System, and improved Lighthouse performance by 40%.',
    },
    type: 'work',
  },
  {
    id: 2,
    period: '2022 - 2024',
    role: { fr: 'Développeur Full-Stack', en: 'Full-Stack Developer' },
    company: 'Studio Nebula',
    location: 'Paris / Remote',
    description: {
      fr: "Développement d'applications SaaS sur mesure pour des startups fintech et e-commerce avec Next.js et Node.js.",
      en: 'Developed custom SaaS applications for fintech and e-commerce startups using Next.js and Node.js.',
    },
    type: 'work',
  },
  {
    id: 3,
    period: '2020 - 2022',
    role: { fr: 'Master Ingénierie du Web & UX', en: 'M.Sc. in Web Engineering & UX' },
    company: 'Institut Supérieur du Numérique',
    location: 'Toulouse, France',
    description: {
      fr: 'Spécialisation en architectures distribuées, interfaces riches et ergonomie cognitive. Mention Bien.',
      en: 'Specialized in distributed architectures, rich client interfaces, and cognitive ergonomics. Graduated with Honors.',
    },
    type: 'education',
  },
];

// ==========================================
// 4. COMPOSANT DE PLACEHOLDER PHOTO STYLISÉ
// ==========================================

interface ImagePlaceholderProps {
  label: string;
  dimensions?: string;
  className?: string;
  accent?: 'indigo' | 'emerald' | 'purple';
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  label,
  dimensions = '16:9',
  className = 'h-64',
  accent = 'indigo',
}) => {
  const gradientMap = {
    indigo: 'from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/15 dark:to-pink-500/20',
    emerald: 'from-emerald-500/10 via-teal-500/10 to-cyan-500/10 dark:from-emerald-500/20 dark:via-teal-500/15 dark:to-cyan-500/20',
    purple: 'from-purple-500/10 via-fuchsia-500/10 to-indigo-500/10 dark:from-purple-500/20 dark:via-fuchsia-500/15 dark:to-indigo-500/20',
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-gradient-to-br ${gradientMap[accent]} flex flex-col items-center justify-center p-6 text-center group transition-all duration-300 hover:border-indigo-500 dark:hover:border-indigo-400 ${className}`}
    >
      {/* Grille décorative en arrière-plan */}
      <div className="absolute inset-0 opacity-25 dark:opacity-15 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Cercle lumineux animé au survol */}
      <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/80 dark:bg-slate-800/80 shadow-md flex items-center justify-center mb-3 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
        <ImageIcon className="w-7 h-7" />
      </div>

      <p className="relative z-10 text-sm font-semibold text-slate-700 dark:text-slate-200 max-w-xs">
        {label}
      </p>

      <span className="relative z-10 mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-200/80 dark:bg-slate-800/90 text-slate-600 dark:text-slate-400">
        Placeholder • {dimensions}
      </span>
    </div>
  );
};

// ==========================================
// 5. COMPOSANT PRINCIPAL (APP)
// ==========================================

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [activeWindow, setActiveWindow] = useState<WindowId>('home');
  const [viewAllWindows, setViewAllWindows] = useState<boolean>(false);
  const [projectFilter, setProjectFilter] = useState<'all' | 'web' | 'mobile' | 'design'>('all');

  // États du formulaire de contact
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const t = translations[lang];

  // Synchronisation de la classe 'dark' sur la balise <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Liste des 6 fenêtres de navigation
  const windowsList: { id: WindowId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t.nav.home, icon: <Home className="w-4 h-4" /> },
    { id: 'about', label: t.nav.about, icon: <User className="w-4 h-4" /> },
    { id: 'projects', label: t.nav.projects, icon: <Briefcase className="w-4 h-4" /> },
    { id: 'skills', label: t.nav.skills, icon: <Code2 className="w-4 h-4" /> },
    { id: 'experience', label: t.nav.experience, icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'contact', label: t.nav.contact, icon: <Mail className="w-4 h-4" /> },
  ];

  const filteredProjects =
    projectFilter === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === projectFilter);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 900);
  };

  // Fonction utilitaire pour afficher une fenêtre selon le mode choisi
  const shouldShowWindow = (id: WindowId) => viewAllWindows || activeWindow === id;

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
        
        {/* Halos lumineux décoratifs en arrière-plan */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/15 dark:bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-500/15 dark:bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl" />
        </div>

        {/* ==========================================
            BARRE DE NAVIGATION SUPÉRIEURE
        ========================================== */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/75 dark:bg-slate-900/75 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            
            {/* Logo */}
            <button
              onClick={() => {
                setActiveWindow('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                AM
              </div>
              <div className="hidden sm:block">
                <span className="font-bold tracking-tight text-slate-900 dark:text-white block leading-none">
                  Alex.dev
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Portfolio • 6 Windows
                </span>
              </div>
            </button>

            {/* Onglets des 6 Fenêtres (Desktop) */}
            <nav className="hidden lg:flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/60 dark:border-slate-700/60">
              {windowsList.map((win, index) => {
                const isActive = !viewAllWindows && activeWindow === win.id;
                return (
                  <button
                    key={win.id}
                    onClick={() => {
                      setViewAllWindows(false);
                      setActiveWindow(win.id);
                    }}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span className="opacity-60 text-[10px] font-mono">{index + 1}.</span>
                    {win.icon}
                    <span>{win.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Actions : Mode d'affichage, Langue FR/EN, Light/Dark Mode */}
            <div className="flex items-center gap-2">
              {/* Bascule Fenêtre unique vs Vue complète */}
              <button
                onClick={() => setViewAllWindows(!viewAllWindows)}
                title={viewAllWindows ? t.nav.viewModeSingle : t.nav.viewModeAll}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
              >
                {viewAllWindows ? (
                  <>
                    <Layers className="w-4 h-4 text-indigo-500" />
                    <span className="hidden md:inline">{t.nav.viewModeSingle}</span>
                  </>
                ) : (
                  <>
                    <LayoutGrid className="w-4 h-4 text-indigo-500" />
                    <span className="hidden md:inline">{t.nav.viewModeAll}</span>
                  </>
                )}
              </button>

              {/* Bouton Traduction FR / EN */}
              <button
                onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                aria-label="Toggle language"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
              >
                <Globe className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>{lang.toUpperCase()}</span>
              </button>

              {/* Bouton Light / Dark Mode */}
              <button
                onClick={() => setIsDark(!isDark)}
                aria-label="Toggle theme"
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-600" />
                )}
              </button>
            </div>
          </div>

          {/* Barre de navigation mobile pour les 6 fenêtres */}
          <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-slate-200/60 dark:border-slate-800/60 no-scrollbar">
            {windowsList.map((win, idx) => {
              const isActive = !viewAllWindows && activeWindow === win.id;
              return (
                <button
                  key={win.id}
                  onClick={() => {
                    setViewAllWindows(false);
                    setActiveWindow(win.id);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span>{idx + 1}.</span>
                  {win.icon}
                  <span>{win.label}</span>
                </button>
              );
            })}
          </div>
        </header>

        {/* ==========================================
            CONTENEUR PRINCIPAL DES 6 FENÊTRES
        ========================================== */}
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
          
          {/* ==========================================
              FENÊTRE 1 : ACCUEIL (HOME)
          ========================================== */}
          {shouldShowWindow('home') && (
            <section className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-500">
              {/* Barre de titre façon fenêtre OS */}
              <div className="px-5 py-3 bg-slate-100/80 dark:bg-slate-800/60 border-b border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    01_accueil.tsx
                  </span>
                </div>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {t.nav.home} (1/6)
                </span>
              </div>

              <div className="p-6 sm:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Colonne Texte */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <Sparkles className="w-3.5 h-3.5" />
                    {t.home.badge}
                  </div>

                  <div className="space-y-2">
                    <p className="text-lg font-medium text-indigo-600 dark:text-indigo-400">
                      {t.home.greeting}
                    </p>
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                      {t.home.name}
                    </h1>
                    <h2 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                      {t.home.role}
                    </h2>
                  </div>

                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                    {t.home.description}
                  </p>

                  {/* Boutons d'action */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      onClick={() => setActiveWindow('projects')}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5 transition-all"
                    >
                      <span>{t.home.ctaPrimary}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setActiveWindow('contact')}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{t.home.ctaSecondary}</span>
                    </button>
                  </div>

                  {/* Statistiques rapides */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                    <div>
                      <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                        5+
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        {t.home.stats.exp}
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400">
                        35+
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        {t.home.stats.projects}
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                        100%
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        {t.home.stats.clients}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Colonne Placeholder Photo de Profil */}
                <div className="lg:col-span-5">
                  <ImagePlaceholder
                    label={t.home.portraitPlaceholder}
                    dimensions="4:5 • Portrait"
                    className="h-80 sm:h-96 shadow-inner"
                    accent="indigo"
                  />
                </div>
              </div>
            </section>
          )}

          {/* ==========================================
              FENÊTRE 2 : À PROPOS (ABOUT)
          ========================================== */}
          {shouldShowWindow('about') && (
            <section className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-500">
              <div className="px-5 py-3 bg-slate-100/80 dark:bg-slate-800/60 border-b border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    02_a_propos.tsx
                  </span>
                </div>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {t.nav.about} (2/6)
                </span>
              </div>

              <div className="p-6 sm:p-10 lg:p-14 space-y-10">
                <div className="max-w-3xl space-y-2">
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {t.about.title}
                  </h2>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                    {t.about.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-6 space-y-6">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {t.about.bio1}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {t.about.bio2}
                    </p>

                    {/* Cartes d'informations clés */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      {t.about.highlights.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60"
                        >
                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                            {item.label}
                          </p>
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <a
                        href="#cv"
                        onClick={(e) => e.preventDefault()}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all"
                      >
                        <Download className="w-4 h-4" />
                        <span>{t.about.downloadCv}</span>
                      </a>
                    </div>
                  </div>

                  {/* Deux Placeholders Photos : Bureau & Conférence */}
                  <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ImagePlaceholder
                      label={t.about.workspacePlaceholder}
                      dimensions="3:2 • Setup"
                      className="h-56 sm:col-span-2"
                      accent="emerald"
                    />
                    <ImagePlaceholder
                      label={t.about.confPlaceholder}
                      dimensions="4:3 • Event"
                      className="h-44 sm:col-span-2"
                      accent="purple"
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ==========================================
              FENÊTRE 3 : PROJETS (PROJECTS)
          ========================================== */}
          {shouldShowWindow('projects') && (
            <section className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-500">
              <div className="px-5 py-3 bg-slate-100/80 dark:bg-slate-800/60 border-b border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    03_projets.tsx
                  </span>
                </div>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {t.nav.projects} (3/6)
                </span>
              </div>

              <div className="p-6 sm:p-10 lg:p-14 space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                      {t.projects.title}
                    </h2>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium mt-1">
                      {t.projects.subtitle}
                    </p>
                  </div>

                  {/* Filtres de catégories */}
                  <div className="flex flex-wrap gap-2">
                    {(['all', 'web', 'mobile', 'design'] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setProjectFilter(cat)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                          projectFilter === cat
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {t.projects.filters[cat]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grille de projets avec Placeholders */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredProjects.map((project) => (
                    <article
                      key={project.id}
                      className="group rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/70 p-5 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="space-y-4">
                        <ImagePlaceholder
                          label={project.placeholderLabel[lang]}
                          dimensions={project.aspectRatio}
                          className="h-52"
                          accent={project.id % 2 === 0 ? 'purple' : 'indigo'}
                        />

                        <div className="flex flex-wrap gap-2 pt-1">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {project.description[lang]}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 pt-6 mt-6 border-t border-slate-200/70 dark:border-slate-700/60">
                        <a
                          href={project.liveUrl}
                          onClick={(e) => e.preventDefault()}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>{t.projects.viewLive}</span>
                        </a>
                        <a
                          href={project.repoUrl}
                          onClick={(e) => e.preventDefault()}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        >
                          <GithubIcon className="w-4 h-4" />
                          <span>{t.projects.viewCode}</span>
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ==========================================
              FENÊTRE 4 : COMPÉTENCES (SKILLS)
          ========================================== */}
          {shouldShowWindow('skills') && (
            <section className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-500">
              <div className="px-5 py-3 bg-slate-100/80 dark:bg-slate-800/60 border-b border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    04_competences.tsx
                  </span>
                </div>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {t.nav.skills} (4/6)
                </span>
              </div>

              <div className="p-6 sm:p-10 lg:p-14 space-y-10">
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {t.skills.title}
                  </h2>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium mt-1">
                    {t.skills.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {SKILLS_DATA.map((category) => (
                    <div
                      key={category.id}
                      className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/70 space-y-6"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                          {category.icon === 'code' && <Terminal className="w-5 h-5" />}
                          {category.icon === 'server' && <Cpu className="w-5 h-5" />}
                          {category.icon === 'design' && <Palette className="w-5 h-5" />}
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                          {category.title[lang]}
                        </h3>
                      </div>

                      <div className="space-y-4">
                        {category.skills.map((skill) => (
                          <div key={skill.name} className="space-y-1.5">
                            <div className="flex justify-between text-xs font-semibold">
                              <span className="text-slate-700 dark:text-slate-200">
                                {skill.name}
                              </span>
                              <span className="text-indigo-600 dark:text-indigo-400">
                                {skill.level}%
                              </span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700"
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Placeholder pour diagramme d'architecture ou certifications */}
                <ImagePlaceholder
                  label={t.skills.architecturePlaceholder}
                  dimensions="21:9 • Diagram"
                  className="h-44"
                  accent="emerald"
                />
              </div>
            </section>
          )}

          {/* ==========================================
              FENÊTRE 5 : PARCOURS (EXPERIENCE)
          ========================================== */}
          {shouldShowWindow('experience') && (
            <section className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-500">
              <div className="px-5 py-3 bg-slate-100/80 dark:bg-slate-800/60 border-b border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    05_parcours.tsx
                  </span>
                </div>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {t.nav.experience} (5/6)
                </span>
              </div>

              <div className="p-6 sm:p-10 lg:p-14 space-y-10">
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {t.experience.title}
                  </h2>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium mt-1">
                    {t.experience.subtitle}
                  </p>
                </div>

                <div className="relative border-l-2 border-indigo-500/30 dark:border-indigo-400/30 ml-3 sm:ml-6 space-y-8 pl-6 sm:pl-8">
                  {EXPERIENCE_DATA.map((item) => (
                    <div
                      key={item.id}
                      className="relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/70 hover:border-indigo-500/50 transition-all"
                    >
                      {/* Point sur la timeline */}
                      <span className="absolute -left-[33px] sm:-left-[41px] top-6 w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-white dark:ring-slate-900" />

                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-300">
                          {item.period}
                        </span>
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {item.location}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {item.role[lang]}
                      </h3>
                      <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-3">
                        {item.company} •{' '}
                        {item.type === 'work' ? t.experience.workBadge : t.experience.eduBadge}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.description[lang]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ==========================================
              FENÊTRE 6 : CONTACT
          ========================================== */}
          {shouldShowWindow('contact') && (
            <section className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-500">
              <div className="px-5 py-3 bg-slate-100/80 dark:bg-slate-800/60 border-b border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    06_contact.tsx
                  </span>
                </div>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {t.nav.contact} (6/6)
                </span>
              </div>

              <div className="p-6 sm:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Formulaire */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                      {t.contact.title}
                    </h2>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium mt-1">
                      {t.contact.subtitle}
                    </p>
                  </div>

                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                        {t.contact.nameLabel}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t.contact.namePlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                        {t.contact.emailLabel}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.contact.emailPlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                        {t.contact.messageLabel}
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={t.contact.messagePlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white shadow-lg shadow-indigo-500/25 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {isSubmitting ? t.contact.sendingBtn : t.contact.submitBtn}
                      </span>
                    </button>

                    {isSubmitted && (
                      <div className="flex items-center gap-2 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <span>{t.contact.successMsg}</span>
                      </div>
                    )}
                  </form>
                </div>

                {/* Colonne Infos & Placeholder Carte/Photo */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <ImagePlaceholder
                    label={t.contact.mapPlaceholder}
                    dimensions="16:10 • Location"
                    className="h-64"
                    accent="indigo"
                  />

                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 space-y-4">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      alexandre.martin@exemple.dev
                    </p>
                    <div className="flex items-center gap-3">
                      <a
                        href="#github"
                        onClick={(e) => e.preventDefault()}
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-colors"
                        aria-label="GitHub"
                      >
                        <GithubIcon className="w-5 h-5" />
                      </a>
                      <a
                        href="#linkedin"
                        onClick={(e) => e.preventDefault()}
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <LinkedinIcon className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}