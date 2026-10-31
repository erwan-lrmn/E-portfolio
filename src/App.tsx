import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import {
  Sun,
  Moon,
  Globe,
  Home,
  Briefcase,
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
  Download,
  Eye,
  Leaf,
} from 'lucide-react';

import { createPortal } from 'react-dom';
import TechMarquee from './components/TechMarquee';

// Assets
import profilePicture from './assets/Profile Picture.jpeg';
import n7Consulting from './assets/N7Consulting.png';
import firstProject from './assets/First Project.png';
import minecraftModding from './assets/minecraft-modding.webp';
import mobilite1 from './assets/mobilité 1.webp';
import mobilite2 from './assets/mobilité 2.webp';
import mobilite3 from './assets/mobilité 3.jpg';
import karate from './assets/karate.webp';
import musculation from './assets/musculation.webp';
import cuisine from './assets/cooking-chopping.webp';
import toulouseContact from './assets/Toulouse_Contact.webp';
import roleModelKao from './assets/role-model-kao.jpg';
import roleModelBengio from './assets/role-model-bengio.jpg';
import roleModelLee from './assets/role-model-lee.jpg';
import cvFr from './assets/cv-fr.pdf';
import cvEn from './assets/cv-en.pdf';

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
type WindowId = 
  | 'home' 
  | 'engineering' 
  | 'mobility' 
  | 'sustainability' 
  | 'sport' 
  | 'career' 
  | 'contact';





// ==========================================
// 2. DICTIONNAIRE DE TRADUCTION (FR / EN)
// ==========================================

const translations = {
  fr: {
    nav: {
      home: 'Accueil',
      engineering: 'Ingénierie',
      mobility: 'Mobilité',
      sustainability: 'Engagement',
      sport: 'Sport',
      career: 'Carrière',
      contact: 'Contact',
      viewModeSingle: 'Vue Fenêtre',
      viewModeAll: 'Vue Complète',
    },
    home: {
      badge: 'Disponible pour de nouvelles opportunités',
      greeting: 'Bonjour, je suis',
      name: 'Erwan Leremon',
      role: 'Etudiant à l\'ecole d\'ingenieur ENSEEIHT',
      description:
        "Je conçois des applications web performantes, accessibles et esthétiques avec React, TypeScript et des architectures modernes.",
      ctaPrimary: 'Explorer mes projets',
      ctaSecondary: 'Me contacter',
      portraitPlaceholder: 'Photo de profil (Portrait studio 800x1000)',
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
      home: 'Welcome',
      engineering: 'Engineering',
      mobility: 'Mobility',
      sustainability: 'Sustainability',
      sport: 'Sport',
      career: 'Career',
      contact: 'Contact',
      viewModeSingle: 'Window View',
      viewModeAll: 'Full Scroll',
    },
    home: {
      badge: 'Available for new opportunities',
      greeting: "Hi, I'm",
      name: 'Erwan Leremon',
      role: 'Engineering student at ENSEEIHT (N7)',
      description:
        'I build fast, accessible, and visually polished web applications using React, TypeScript, and modern cloud architectures.',
      ctaPrimary: 'Explore Projects',
      ctaSecondary: 'Get in Touch',
      portraitPlaceholder: 'Profile Picture (Studio Portrait 800x1000)',
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
// 4. COMPOSANT DE PLACEHOLDER PHOTO STYLISÉ
// ==========================================

interface ImagePlaceholderProps {
  label: string;
  dimensions?: string;
  className?: string;
  accent?: 'indigo' | 'emerald' | 'purple';
  src?: string;
  alt?: string;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  label,
  dimensions = '16:9',
  className = 'h-64',
  accent = 'indigo',
  src,
  alt,
}) => {
  const gradientMap = {
    indigo: 'from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/15 dark:to-pink-500/20',
    emerald: 'from-emerald-500/10 via-teal-500/10 to-cyan-500/10 dark:from-emerald-500/20 dark:via-teal-500/15 dark:to-cyan-500/20',
    purple: 'from-purple-500/10 via-fuchsia-500/10 to-indigo-500/10 dark:from-purple-500/20 dark:via-fuchsia-500/15 dark:to-indigo-500/20',
  };

  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-700/70 ${className}`}>
        <img
          src={src}
          alt={alt || label}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

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

interface EngineeringProject {
  title: string;
  description: string;
  /** Texte complet affiché quand la carte est agrandie (sinon : description). */
  fullDescription?: string;
  tags?: string[];
  imageLabel: string;
  imageSrc: string;
  /** Cadrage de l'image dans la vignette. */
  imageFit?: 'cover' | 'contain';
  /** Position de l'image (object-position), ex. « 50% 25% ». */
  imagePosition?: string;
  /** Crédit / légende affiché discrètement sur l'image. */
  imageCredit?: string;
  /** Lien externe vers le projet (optionnel). */
  link?: string;
  /** Libellé du lien externe. */
  linkLabel?: string;
}

/**
 * Grille de projets d'ingénierie avec agrandissement "in place".
 * La carte cliquée reste ancrée en haut à gauche et grandit (pleine largeur,
 * 1,5x la hauteur d'une petite carte) pendant que les autres cartes sont
 * poussées en douceur. Les dimensions réelles (left/top/width/height) sont
 * animées via des transitions CSS, ce qui évite toute déformation du contenu.
 */
const EngineeringProjects: React.FC<{ projects: EngineeringProject[]; lang: 'fr' | 'en' }> = ({ projects, lang }) => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [width, setWidth] = useState(0);
  const [heights, setHeights] = useState<number[]>([]);
  const [ready, setReady] = useState(false);
  const gap = 16;
  const expandedRef = useRef<number | null>(null);
  expandedRef.current = expanded;

  // Largeur du conteneur (responsive)
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Hauteur naturelle des cartes au repos (mesurée quand la largeur est connue)
  useLayoutEffect(() => {
    if (width === 0) return;
    // On ne mesure pas pendant qu'une carte est ouverte (les hauteurs sont animées)
    if (expandedRef.current !== null) return;
    const hs = projects.map((_, i) => cardRefs.current[i]?.offsetHeight || 0);
    if (hs.length !== projects.length || hs.some((h) => h === 0)) return;
    setHeights((prev) =>
      prev.length === hs.length && prev.every((h, i) => Math.abs(h - hs[i]) < 1)
        ? prev
        : hs,
    );
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, projects.length]);

  const cols = Math.min(projects.length, 2);
  const colW = width > 0 ? (width - gap * (cols - 1)) / cols : 0;
  const maxH = heights.length ? Math.max(...heights) : 0;
  // Carte agrandie : pleine largeur (2 colonnes + gouttière) et 1,5x plus haute.
  const expandedH = maxH > 0 ? Math.round(maxH * 1.5) : 0;
  const otherH =
    expanded === null
      ? maxH
      : Math.max(...heights.filter((_, i) => i !== expanded), 0);
  const lastTop = expandedH + gap;
  const containerHeight =
    expanded === null ? maxH : expandedH + (otherH > 0 ? gap + otherH : 0);

  const rects = projects.map((_, i) => {
    if (expanded === null) {
      return { left: i * (colW + gap), top: 0, width: colW, height: maxH || undefined };
    }
    if (i === expanded) {
      return { left: 0, top: 0, width, height: expandedH || undefined };
    }
    return { left: 0, top: lastTop, width: colW, height: maxH || undefined };
  });

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: containerHeight || undefined }}
    >
      {projects.map((project, i) => {
        const isExpanded = expanded === i;
        const rect = rects[i];
        return (
          <div
            key={project.title}
            ref={(node) => {
              cardRefs.current[i] = node;
            }}
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            onClick={() => setExpanded(isExpanded ? null : i)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setExpanded(isExpanded ? null : i);
              }
            }}
            className="engineering-card absolute flex cursor-pointer flex-col overflow-hidden"
            style={{
              left: rect.left,
              top: rect.top,
              width: rect.width,
              height: rect.height,
              zIndex: isExpanded ? 2 : 1,
              transition: ready
                ? 'left 520ms cubic-bezier(0.22, 1, 0.36, 1), top 520ms cubic-bezier(0.22, 1, 0.36, 1), width 520ms cubic-bezier(0.22, 1, 0.36, 1), height 520ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 520ms ease, transform 300ms ease'
                : 'none',
              boxShadow: isExpanded ? '0 24px 60px -20px rgba(79, 70, 229, 0.35)' : undefined,
            }}
          >
            <div
              className="relative w-full shrink-0 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100 dark:border-slate-700/60 dark:bg-slate-900/60"
              style={{
                height: isExpanded ? 192 : 128,
                transition: 'height 520ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <img
                src={project.imageSrc}
                alt={project.title}
                className={`h-full w-full ${project.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                style={{ objectPosition: project.imagePosition }}
                loading="lazy"
              />
              {project.imageCredit && (
                <span className="absolute bottom-1.5 right-1.5 max-w-[calc(100%-0.75rem)] truncate rounded bg-black/50 px-1.5 py-0.5 text-[9px] font-medium text-white/85 backdrop-blur-sm">
                  {project.imageCredit}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col justify-center pt-3">
              <h4 className="engineering-card-title">{project.title}</h4>
              <p className="engineering-card-text mt-1">
                {isExpanded && project.fullDescription ? project.fullDescription : project.description}
              </p>
              {project.tags && project.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="engineering-card-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  {isExpanded
                    ? (lang === 'fr' ? 'Cliquer pour réduire' : 'Click to collapse')
                    : (lang === 'fr' ? 'Cliquer pour agrandir' : 'Click to expand')}
                </span>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 underline-offset-2 hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {project.linkLabel}
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};


interface ExpandableCardProps {
  title: string;
  shortDesc: string;
  extendedDesc: string;
  imageSrc: string;
  lang: 'fr' | 'en';
  /** Petit libellé affiché au-dessus du titre dans la carte étendue. */
  tag?: string;
  /** Position de l'image (object-position), ex. « 50% 25% » pour un portrait. */
  imagePosition?: string;
  /** Conteneur dans lequel la modal doit être centrée (sinon : viewport). */
  containerRef?: React.RefObject<HTMLElement | null>;
  /** Masque le liseré supérieur et la barre « Vue détaillée » de la modal. */
  hideTopChrome?: boolean;
}

type ExpandStatus = 'closed' | 'opening' | 'open' | 'closing';

interface OriginRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

const ExpandableCard: React.FC<ExpandableCardProps> = ({
  title,
  shortDesc,
  extendedDesc,
  imageSrc,
  lang,
  tag,
  imagePosition,
  containerRef,
  hideTopChrome = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<ExpandStatus>('closed');
  const [origin, setOrigin] = useState<OriginRect | null>(null);
  const [viewport, setViewport] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 1280,
    h: typeof window !== 'undefined' ? window.innerHeight : 800,
  }));

  const isMounted = status !== 'closed';
  const smallCardVisible = status === 'closed' || status === 'closing';

  // Suit les changements de taille de fenêtre pendant l'ouverture
  useEffect(() => {
    if (!isMounted) return;
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isMounted]);

  // Verrouille le défilement du fond pendant l'ouverture
  useEffect(() => {
    if (!isMounted) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMounted]);

  // Déclenche la transition après le premier rendu (pour animer depuis la carte)
  useEffect(() => {
    if (status !== 'opening') return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setStatus('open'));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [status]);

  // Démontage une fois l'animation de fermeture terminée
  useEffect(() => {
    if (status !== 'closing') return;
    const timer = window.setTimeout(() => setStatus('closed'), 430);
    return () => window.clearTimeout(timer);
  }, [status]);

  // Fermeture au clavier
  useEffect(() => {
    if (!isMounted) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setStatus((s) => (s === 'open' || s === 'opening' ? 'closing' : s));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMounted]);

  const open = () => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setOrigin({ x: rect.left, y: rect.top, w: rect.width, h: rect.height });
    setStatus('opening');
  };

  const close = () => {
    setStatus((s) => (s === 'open' || s === 'opening' ? 'closing' : s));
  };

  // Géométrie : la modal naît au centre de la petite carte et se centre dans
  // le conteneur fourni (la fenêtre Mobilité / Carrière) ou dans le viewport.
  const containerEl = containerRef?.current ?? null;
  const containerRect = containerEl?.getBoundingClientRect();
  const baseLeft = containerRect?.left ?? 0;
  const baseTop = containerRect?.top ?? 0;
  const baseW = containerRect?.width ?? viewport.w;
  const baseH = containerRect?.height ?? viewport.h;
  const cx = baseW / 2;
  const cy = baseH / 2;
  const modalW = Math.min(768, baseW - 32);
  const scale0 = origin ? Math.min(1, Math.max(0.15, origin.w / modalW)) : 0.35;
  const ox = origin ? origin.x - baseLeft + origin.w / 2 : cx;
  const oy = origin ? origin.y - baseTop + origin.h / 2 : cy;

  const isFullyOpen = status === 'open';
  const transform = isFullyOpen
    ? 'translate3d(0, 0, 0) scale(1)'
    : `translate3d(${ox - cx}px, ${oy - cy}px, 0) scale(${scale0})`;

  const modal = (
    <div
      className={`${containerEl ? 'absolute' : 'fixed'} inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-md`}
      style={{
        opacity: isFullyOpen ? 1 : 0,
        transition: 'opacity 280ms ease',
      }}
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white/95 ring-1 ring-slate-900/10 shadow-[0_40px_120px_-30px_rgba(79,70,229,0.55)] dark:bg-slate-900/95 dark:ring-white/10"
        style={{
          maxHeight: containerEl ? 'calc(100% - 2rem)' : '90vh',
          transform,
          opacity: isFullyOpen ? 1 : 0.85,
          transition:
            'transform 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease',
          willChange: 'transform, opacity',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {!hideTopChrome && (
          <>
            {/* Liseré dégradé signature du site */}
            <div className="absolute inset-x-0 top-0 z-30 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

            {/* Barre supérieure façon fenêtre */}
            <div className="flex shrink-0 items-center gap-4 border-b border-slate-200/70 bg-white/80 px-5 py-3 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 sm:px-7">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  {lang === 'fr' ? 'Vue détaillée' : 'Expanded view'}
                </span>
              </div>
            </div>
          </>
        )}

        <div className="modal-scroll min-h-0 flex-1 overflow-y-auto">
          {/* Visuel principal avec titre incrusté */}
          <div className="relative">
            <img
              src={imageSrc}
              alt={title}
              className="h-60 w-full object-cover sm:h-72"
              style={{ objectPosition: imagePosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 space-y-3 p-6 sm:p-8">
              {tag && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  {tag}
                </span>
              )}
              <h3 className="max-w-2xl text-2xl font-extrabold tracking-tight text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.5)] sm:text-3xl">
                {title}
              </h3>
            </div>
          </div>

          <div className="space-y-5 px-6 py-7 sm:px-8 sm:py-8">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-400">
                {lang === 'fr' ? 'Détails' : 'Details'}
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-indigo-500/50 via-purple-500/30 to-transparent" />
            </div>

            <p className="whitespace-pre-line text-[15px] leading-7 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-8">
              {extendedDesc}
            </p>
          </div>
        </div>

        {/* Pied de carte toujours visible */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-slate-200/70 bg-white/70 px-6 py-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70 sm:px-8">
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {lang === 'fr'
              ? 'Cliquez à l’extérieur ou appuyez sur Échap pour fermer.'
              : 'Click outside or press Esc to close.'}
          </span>
          <button
            type="button"
            onClick={close}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:bg-indigo-500"
          >
            {lang === 'fr' ? 'Fermer' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="relative h-full">
        <div
          ref={cardRef}
          role="button"
          tabIndex={0}
          onClick={open}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              open();
            }
          }}
          className="engineering-card flex h-full cursor-pointer flex-col space-y-3 shake-hover"
          style={{
            opacity: smallCardVisible ? 1 : 0,
            visibility: smallCardVisible ? 'visible' : 'hidden',
            transition: 'opacity 180ms ease',
          }}
        >
          <div className="relative h-40 w-full overflow-hidden rounded-xl">
            <img
              src={imageSrc}
              alt={title}
              className="h-full w-full object-cover"
              style={{ objectPosition: imagePosition }}
              loading="lazy"
            />
          </div>
          <h4 className="engineering-card-title">{title}</h4>
          <p className="engineering-card-text">{shortDesc}</p>
          <span className="mt-auto pt-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
            {lang === 'fr' ? 'Cliquer pour agrandir' : 'Click to expand'}
          </span>
        </div>

        {/* Le « trou » laissé par la carte : zone légèrement assombrie */}
        {!smallCardVisible && (
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-black/10 backdrop-blur-[1px] dark:bg-black/25" />
        )}
      </div>

      {isMounted && typeof document !== 'undefined'
        ? createPortal(modal, containerEl ?? document.body)
        : null}
    </>
  );
};

/* ------------------------------------------------------------------ */
/* Carte d'activité (sport, cuisine, engagement)                       */
/* ------------------------------------------------------------------ */

type ActivityAccent = 'rose' | 'indigo' | 'amber' | 'emerald';

const activityAccentClasses: Record<ActivityAccent, string> = {
  rose: 'bg-rose-500/10 text-rose-600 ring-rose-500/20 dark:text-rose-300',
  indigo: 'bg-indigo-500/10 text-indigo-600 ring-indigo-500/20 dark:text-indigo-300',
  amber: 'bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-300',
  emerald: 'bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300',
};

const activityDotClasses: Record<ActivityAccent, string> = {
  rose: 'bg-rose-500',
  indigo: 'bg-indigo-500',
  amber: 'bg-amber-500',
  emerald: 'bg-emerald-500',
};

interface ActivityCardProps {
  title: string;
  period: string;
  reflection: string;
  skills: string[];
  accent: ActivityAccent;
  lang: 'fr' | 'en';
  imageSrc?: string;
  imageAlt?: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  period,
  reflection,
  skills,
  accent,
  lang,
  imageSrc,
  imageAlt,
}) => (
  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700/70 dark:bg-slate-800/50">
    <div className="relative h-44 w-full overflow-hidden">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={imageAlt ?? title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-cyan-500/20 dark:from-emerald-500/30 dark:via-teal-500/20 dark:to-cyan-500/30">
          <Leaf className="h-12 w-12 text-emerald-600/70 dark:text-emerald-300/80" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
      <h3 className="absolute inset-x-5 bottom-4 text-xl font-bold tracking-tight text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.45)]">
        {title}
      </h3>
    </div>

    <div className="flex flex-1 flex-col gap-4 p-5">
      <span className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${activityAccentClasses[accent]}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${activityDotClasses[accent]}`} />
        {period}
      </span>

      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {reflection}
      </p>

      <div className="mt-auto space-y-2 pt-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
          {lang === 'fr' ? 'Compétences développées' : 'Skills developed'}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-lg bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </article>
);

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [activeWindow, setActiveWindow] = useState<WindowId>('home');
  const [viewAllWindows, setViewAllWindows] = useState<boolean>(false);
  const [showCv, setShowCv] = useState<boolean>(false);
  const mobilitySectionRef = useRef<HTMLElement | null>(null);

  // États du formulaire de contact
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

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
    { id: 'engineering', label: 'Engineering', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'mobility', label: 'Mobility', icon: <Globe className="w-4 h-4" /> },
    { id: 'sustainability', label: 'Sustainability', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'sport', label: 'Sport', icon: <Layers className="w-4 h-4" /> },
    { id: 'career', label: 'Career', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'contact', label: t.nav.contact, icon: <Mail className="w-4 h-4" /> },
  ];


  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setIsSubmitted(false);
    setIsError(false);

    try {
      const res = await fetch('https://formsubmit.co/ajax/_erwan@tuta.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Contact portfolio - ${formData.name}`,
          _replyto: formData.email,
          _template: 'table',
          _captcha: 'false',
          _honey: '',
        }),
      });

      if (!res.ok) throw new Error(`FormSubmit: ${res.status}`);

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 6000);
    } catch {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
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
                EL
              </div>
              <div className="hidden sm:block">
                <span className="font-bold tracking-tight text-slate-900 dark:text-white block leading-none">
                  Erwan.dev
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Portfolio • 7 Windows
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
                  {t.nav.home} (1/7)
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
                      onClick={() => setActiveWindow('engineering')}
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
                </div>

                {/* Colonne Placeholder Photo de Profil */}
                <div className="lg:col-span-5">
                  <ImagePlaceholder
                    label={t.home.portraitPlaceholder}
                    dimensions="4:5 • Portrait"
                    className="h-80 sm:h-96 shadow-inner"
                    accent="indigo"
                    src={profilePicture}
                  />
                </div>
              </div>

              {/* Introduction & but du portfolio + vidéo d'introduction */}
              <div className="px-6 sm:px-10 lg:px-14 pb-10 space-y-6 border-t border-slate-200/70 dark:border-slate-700/60 pt-8">
                <div className="max-w-3xl space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {lang === 'fr' ? 'Bienvenue' : 'Welcome'}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {lang === 'fr'
                      ? "Ce portfolio présente mon parcours d'ingénieur, mes projets, mes engagements et mes objectifs professionnels. Il a pour but de mettre en valeur mes compétences et ma trajectoire vers ENSEEIHT (N7)."
                      : 'This portfolio presents my engineering journey, projects, commitments, and professional goals. Its purpose is to showcase my skills and my path toward ENSEEIHT (N7).'}
                  </p>
                </div>
                <TechMarquee lang={lang} />
              </div>
            </section>
          )}

          {/* ==========================================
              FENÊTRE 2 : ENGINEERING COURSE
          ========================================== */}
          {shouldShowWindow('engineering') && (
            <section className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-500">
              <div className="px-5 py-3 bg-slate-100/80 dark:bg-slate-800/60 border-b border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    02_engineering.tsx
                  </span>
                </div>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {t.nav.engineering} (2/7)
                </span>
              </div>
              <div className="p-6 sm:p-10 lg:p-14 space-y-8">
                <div className="max-w-3xl space-y-2">
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {lang === 'fr' ? "Cours d'ingénierie" : 'Engineering Course'}
                  </h2>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                    {lang === 'fr' ? 'Projets scientifiques et techniques avec réflexion' : 'Scientific & technical projects with reflection'}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5">
                    <ImagePlaceholder
                      label={lang === 'fr' ? 'Projet d’ingénierie (photo / schéma)' : 'Engineering project (photo / diagram)'}
                      dimensions="16:9"
                      className="h-64"
                      accent="indigo"
                      src={n7Consulting}
                    />
                  </div>
                  <div className="lg:col-span-7 space-y-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {lang === 'fr' ? 'Projet en cours : Recréation & optimisation GEO/SEO de n7consulting.fr' : 'Ongoing project: Recreation & GEO/SEO optimization of n7consulting.fr'}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {lang === 'fr'
                        ? "Objectif : améliorer la visibilité, les performances et le référencement local/international."
                        : 'Goal: improve visibility, performance, and local/international SEO and GEO.'}
                    </p>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70">
                      <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                        {lang === 'fr' ? 'Ce que j’apprends' : 'What I am learning'}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {lang === 'fr'
                          ? "J'apprends à rendre un site plus visible, de façon concrète : je travaille l'architecture, les métadonnées et les performances, mais aussi la manière dont les contenus sont compris et cités par les moteurs de recherche comme par les moteurs génératifs. Je découvre comment construire une stratégie de contenu cohérente pour le référencement local et international, puis comment mesurer les résultats pour ajuster mes choix. C'est un projet itératif, où je teste, j'analyse et je corrige au fur et à mesure."
                          : "I'm learning how to make a website more visible in practice: I work on structure, metadata and performance, but also on how content is understood and cited by search engines and generative engines. I'm discovering how to build a coherent content strategy for local and international SEO, then measure the results to adjust my choices. It's an iterative project where I test, analyse and refine as I go."}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['SEO', 'GEO', 'Performance'].map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-300">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Petites cartes : projets d'ingénierie réalisés */}
                    <div className="pt-4 space-y-3">
                      <h4 className="font-bold text-slate-900 dark:text-white">
                        {lang === 'fr' ? 'Projets réalisés' : 'Completed projects'}
                      </h4>
                      <EngineeringProjects
                        lang={lang}
                        projects={[
                          {
                            title:
                              lang === 'fr'
                                ? 'Mon premier projet web'
                                : 'My first web project',
                            description:
                              lang === 'fr'
                                ? 'Ma première boutique en ligne, il y a 5 ans : backend et paiements Stripe.'
                                : 'My first online store, 5 years ago: backend and Stripe payments.',
                            fullDescription:
                              lang === 'fr'
                                ? "C'est le tout premier projet de développement web de ma vie, réalisé il y a 5 ans. L'esthétique est clairement à revoir, mais il m'a permis d'appréhender pour la première fois le backend d'un site, la gestion des paiements avec Stripe (aujourd'hui désactivée) et la création d'un site fonctionnel de A à Z."
                                : "This is the very first web development project of my life, built 5 years ago. The design clearly needs work, but it gave me my first hands-on experience with a website's backend, payment handling with Stripe (now disabled), and building a fully functional site from start to finish.",
                            tags: ['E-commerce', 'Stripe', 'Backend'],
                            imageLabel: lang === 'fr' ? 'Capture du site' : 'Website screenshot',
                            imageSrc: firstProject,
                            imageFit: 'cover',
                            imagePosition: '50% 30%',
                            link: 'https://erwan-l-ecom-training.vercel.app/',
                            linkLabel: lang === 'fr' ? 'Voir le site' : 'Visit the site',
                          },
                          {
                            title: lang === 'fr' ? 'Modding Minecraft' : 'Minecraft modding',
                            description:
                              lang === 'fr'
                                ? 'Plusieurs mods réalisés en équipe il y a 8 ans.'
                                : 'Several mods built as a team 8 years ago.',
                            fullDescription:
                              lang === 'fr'
                                ? "Il y a 8 ans, j'ai participé à plusieurs projets de modding Minecraft en équipe. Nous concevions des mécaniques, écrivions le code, testions les versions et corrigions les bugs ensemble. Cette expérience m'a appris à structurer un projet, à lire une documentation technique, à itérer et à collaborer autour d'une même base de code — des réflexes que je réutilise aujourd'hui sur le projet n7consulting, même si ce dernier est mené seul."
                                : "Eight years ago, I took part in several team-based Minecraft modding projects. We designed mechanics, wrote code, tested builds and fixed bugs together. That experience taught me how to structure a project, read technical documentation, iterate and collaborate around a shared codebase — habits I now reuse on the n7consulting project, even though I'm working on it on my own.",
                            tags: ['Java', 'Modding', 'Teamwork'],
                            imageLabel: lang === 'fr' ? 'Monde moddé' : 'Modded world',
                            imageSrc: minecraftModding,
                            imageFit: 'cover',
                            imagePosition: '50% 50%',
                            imageCredit:
                              lang === 'fr'
                                ? 'Illustration : The Undergarden (MIT) — quek'
                                : 'Illustration: The Undergarden (MIT) — quek',
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ==========================================
              FENÊTRE 3 : INTERNATIONAL MOBILITY
          ========================================== */}
          {shouldShowWindow('mobility') && (
            <section ref={mobilitySectionRef} className="relative rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-500">
              <div className="px-5 py-3 bg-slate-100/80 dark:bg-slate-800/60 border-b border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    03_mobility.tsx
                  </span>
                </div>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {t.nav.mobility} (3/7)
                </span>
              </div>
              <div className="p-6 sm:p-10 lg:p-14 space-y-8">
                <div className="max-w-3xl space-y-2">
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {lang === 'fr' ? 'Mobilité internationale' : 'International Mobility'}
                  </h2>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                    {lang === 'fr' ? 'Réflexion ou destinations & motivations' : 'Reflection or destinations & motivations'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { fr: 'University of Hong Kong', en: 'University of Hong Kong', descFr: "Étudier un semestre en informatique dans un environnement anglophone exigeant et découvrir l'écosystème tech de Hong Kong.", descEn: "Spend a semester studying computer science in a demanding English-speaking environment and discover Hong Kong's tech ecosystem.", extFr: "Hong Kong occupe une place unique entre l'Europe et l'Asie : c'est un hub financier et technologique où l'anglais est la langue d'enseignement. Mon objectif serait d'y suivre un semestre en génie informatique (systèmes distribués, IA, cybersécurité) et de participer à un projet mené avec une entreprise locale, par exemple autour de la ville intelligente ou de la fintech. Cette mobilité me permettrait de gagner en autonomie, de travailler en équipe multiculturelle et de confronter mes méthodes de développement à une culture académique très exigeante, avec l'ambition de construire ensuite une carrière d'ingénieur produit à l'international.", extEn: "Hong Kong sits at a unique crossroads between Europe and Asia: a financial and technology hub where English is the language of instruction. My goal would be to follow a semester in computer engineering (distributed systems, AI, cybersecurity) and take part in a project with a local company, for instance around smart city or fintech. This mobility would help me build autonomy, work in multicultural teams and test my development methods against a highly demanding academic culture, with the ambition of later building an international product engineering career.", src: mobilite1 },
                    { fr: 'Polytechnique Montréal', en: 'Polytechnique Montréal', descFr: "Approfondir le génie logiciel dans une école francophone reconnue et me confronter à l'écosystème technologique nord-américain.", descEn: "Deepen my software engineering skills at a renowned French-speaking school and experience North America's technology ecosystem.", extFr: "Polytechnique Montréal est une référence francophone en génie et se situe au cœur d'un pôle mondial de l'intelligence artificielle. Je souhaite y renforcer ma formation en génie logiciel à travers des cours de conception d'architectures, de qualité logicielle et d'apprentissage automatique, puis mettre ces acquis en pratique lors d'un projet encadré par une entreprise montréalaise. Au-delà des compétences techniques, cette mobilité serait l'occasion de découvrir une autre façon de travailler — plus proche du monde industriel — et de tisser un réseau entre la France et le Québec pour mon futur parcours d'ingénieur.", extEn: "Polytechnique Montréal is a French-speaking reference in engineering, located at the heart of a global artificial intelligence hub. I would like to strengthen my software engineering training through courses in architecture design, software quality and machine learning, then put these skills into practice in a project supervised by a Montreal company. Beyond technical skills, this mobility would be an opportunity to discover another way of working — closer to industry — and to build a network between France and Quebec for my future engineering career.", src: mobilite2 },
                    { fr: 'Huazhong University of Science and Technology', en: 'Huazhong University of Science and Technology', descFr: "Découvrir l'excellence académique chinoise en sciences et technologies et développer une véritable compétence interculturelle.", descEn: "Discover China's academic excellence in science and technology and build genuine cross-cultural skills.", extFr: "L'Université des sciences et technologies de Huazhong (HUST) est l'une des meilleures universités chinoises en ingénierie et en informatique. Mon projet serait d'y suivre des cours de génie informatique ou électronique, de participer à un projet de laboratoire — par exemple sur les systèmes embarqués ou l'IA — et d'apprendre les bases du mandarin. Vivre à Wuhan, au cœur d'un important pôle technologique chinois, me permettrait de développer mon adaptabilité, d'approfondir mes compétences techniques dans un contexte différent et de construire un réseau international reliant l'Europe et l'Asie.", extEn: "Huazhong University of Science and Technology (HUST) is one of China's leading universities in engineering and computer science. My plan would be to take courses in computer or electronic engineering, join a laboratory project — for example on embedded systems or AI — and learn the basics of Mandarin. Living in Wuhan, at the heart of a major Chinese technology hub, would help me develop adaptability, deepen my technical skills in a different context and build an international network bridging Europe and Asia.", src: mobilite3 },
                  ].map((d, idx) => (
                    <ExpandableCard
                      key={idx}
                      title={lang === 'fr' ? d.fr : d.en}
                      shortDesc={lang === 'fr' ? d.descFr : d.descEn}
                      extendedDesc={lang === 'fr' ? d.extFr : d.extEn}
                      imageSrc={d.src}
                      lang={lang}
                      tag={lang === 'fr' ? 'Mobilité internationale' : 'International mobility'}
                      containerRef={mobilitySectionRef}
                      hideTopChrome
                    />
                  ))}
                </div>
              </div>
            </section>
          )}
          
          {/* ==========================================
              FENÊTRE 4 : SUSTAINABILITY & CIVIC ENGAGEMENT
          ========================================== */}
          {shouldShowWindow('sustainability') && (
            <section className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-500">
              <div className="px-5 py-3 bg-slate-100/80 dark:bg-slate-800/60 border-b border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    04_sustainability.tsx
                  </span>
                </div>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {t.nav.sustainability} (4/7)
                </span>
              </div>
              <div className="p-6 sm:p-10 lg:p-14 space-y-8">
                <div className="max-w-3xl space-y-2">
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {lang === 'fr' ? 'Développement durable & engagement civique' : 'Sustainability & Civic Engagement'}
                  </h2>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                    {lang === 'fr' ? 'Engagements réalisés, projets et heures à réaliser' : 'Completed engagements, projects and hours to complete'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/70 space-y-3">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                      {lang === 'fr' ? 'Heures d’engagement civique' : 'Civic engagement hours'}
                    </h3>
                    <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">40h</p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {lang === 'fr' ? 'à réaliser' : 'to complete'}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/70 space-y-3">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                      {lang === 'fr' ? 'Engagements réalisés' : 'Completed engagements'}
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <li className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                        <div>
                          <p className="font-semibold text-slate-800 dark:text-slate-100">
                            {lang === 'fr' ? 'Théâtre — Le Procès de King Kong (2h)' : 'Theatre — Le Procès de King Kong (2h)'}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {lang === 'fr'
                              ? "Assisté à une pièce de sensibilisation aux dérives des bizutages/intégrations et aux VHSS."
                              : 'Attended an awareness play on hazing/integration abuses and gender-based and sexual violence (GBSV).'}
                          </p>
                        </div>
                      </li>
                    </ul>
                    <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      {lang === 'fr'
                        ? "Cette pièce m’a fait prendre conscience des dérives possibles des bizutages et des intégrations, et de la réalité des violences sexistes et sexuelles. Elle rappelle l’importance de réagir, d’en parler et de soutenir les victimes."
                        : 'The play made me aware of the potential abuses of hazing and integration rituals, and of the reality of gender-based and sexual violence. It highlights the importance of reacting, speaking up and supporting victims.'}
                    </p>
                  </div>

                  <div className="md:col-span-2 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/70 space-y-3">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                      {lang === 'fr' ? 'Projets / idées d’engagement' : 'Engagement projects / ideas'}
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {[
                        {
                          title: lang === 'fr' ? "M’investir dans l’association Women7" : 'Get involved in the Women7 association',
                          desc: lang === 'fr'
                            ? "Promouvoir la place des femmes dans l'ingénierie et participer aux actions de l'association."
                            : "Promote women in engineering and take part in the association's initiatives.",
                        },
                        {
                          title: lang === 'fr' ? 'Maraudes solidaires' : 'Homeless outreach',
                          desc: lang === 'fr'
                            ? "Participer à des maraudes pour distribuer repas, vêtements et produits d'hygiène aux personnes en situation de précarité."
                            : 'Take part in outreach rounds to distribute meals, clothes and hygiene kits to people in precarious situations.',
                        },
                        {
                          title: lang === 'fr' ? 'Ateliers de cuisine anti-gaspillage' : 'Anti-food-waste cooking workshops',
                          desc: lang === 'fr'
                            ? 'Organiser des ateliers pour cuisiner les invendus et sensibiliser au gaspillage alimentaire.'
                            : 'Run workshops to cook surplus food and raise awareness about food waste.',
                        },
                      ].map((project) => (
                        <li key={project.title} className="p-4 rounded-xl bg-white/60 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-700/60">
                          <p className="font-semibold text-slate-800 dark:text-slate-100">{project.title}</p>
                          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{project.desc}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ==========================================
              FENÊTRE 5 : SPORT & OTHER ACTIVITIES
          ========================================== */}
          {shouldShowWindow('sport') && (
            <section className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-500">
              <div className="px-5 py-3 bg-slate-100/80 dark:bg-slate-800/60 border-b border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    05_sport.tsx
                  </span>
                </div>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {t.nav.sport} (5/7)
                </span>
              </div>
              <div className="p-6 sm:p-10 lg:p-14 space-y-8">
                <div className="max-w-3xl space-y-2">
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {lang === 'fr' ? 'Sport & autres activités' : 'Sport & Other Activities'}
                  </h2>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                    {lang === 'fr' ? 'Activités extra-scolaires avec réflexions' : 'Extra-curricular activities with reflections'}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <ActivityCard
                    accent="rose"
                    lang={lang}
                    title={lang === 'fr' ? 'Karaté' : 'Karate'}
                    period={lang === 'fr' ? '10 ans de pratique' : '10 years of practice'}
                    imageSrc={karate}
                    imageAlt="Karate"
                    reflection={
                      lang === 'fr'
                        ? "Dix ans de pratique m'ont appris la patience du geste répété, le calme sous pression et le respect du cadre comme du partenaire. Les passages de grades et les compétitions m'ont aussi entraîné à gérer l'effort, l'échec et la remise en question."
                        : 'Ten years of practice taught me the patience of repetition, calm under pressure and respect for both the rules and my partner. Gradings and competitions also trained me to handle effort, failure and self-questioning.'
                    }
                    skills={
                      lang === 'fr'
                        ? ['Discipline', 'Persévérance', 'Maîtrise de soi', 'Respect', 'Gestion du stress']
                        : ['Discipline', 'Perseverance', 'Self-control', 'Respect', 'Stress management']
                    }
                  />

                  <ActivityCard
                    accent="indigo"
                    lang={lang}
                    title={lang === 'fr' ? 'Musculation' : 'Weight training'}
                    period={lang === 'fr' ? 'Pratique actuelle' : 'Current practice'}
                    imageSrc={musculation}
                    imageAlt="Musculation"
                    reflection={
                      lang === 'fr'
                        ? "La musculation m'impose une régularité et une planification sur le long terme : fixer des objectifs mesurables, suivre mes progrès et ajuster mon programme. C'est aussi un espace où j'apprends à écouter mon corps, à respecter la récupération et à maintenir un effort constant sans résultat immédiat."
                        : 'Weight training demands regularity and long-term planning: setting measurable goals, tracking progress and adjusting my programme. It is also a space where I learn to listen to my body, respect recovery and sustain consistent effort without immediate results.'
                    }
                    skills={
                      lang === 'fr'
                        ? ['Régularité', 'Autonomie', 'Planification', 'Endurance', 'Hygiène de vie']
                        : ['Consistency', 'Autonomy', 'Planning', 'Endurance', 'Healthy habits']
                    }
                  />

                  <ActivityCard
                    accent="amber"
                    lang={lang}
                    title={lang === 'fr' ? 'Cuisine' : 'Cooking'}
                    period={lang === 'fr' ? 'Pratique régulière' : 'Regular practice'}
                    imageSrc={cuisine}
                    imageAlt="Cuisine"
                    reflection={
                      lang === 'fr'
                        ? "Cuisiner régulièrement, c'est jongler entre organisation, timing et créativité : préparer plusieurs plats en parallèle, respecter des proportions et adapter une recette aux produits disponibles. C'est aussi un moment de partage qui m'apprend à recevoir, à m'adapter et à gérer un budget."
                        : 'Cooking regularly means juggling organisation, timing and creativity: preparing several dishes in parallel, respecting proportions and adapting a recipe to the ingredients available. It is also a moment of sharing that teaches me hospitality, adaptability and budget management.'
                    }
                    skills={
                      lang === 'fr'
                        ? ['Créativité', 'Organisation', 'Précision', 'Gestion du temps', 'Partage']
                        : ['Creativity', 'Organisation', 'Precision', 'Time management', 'Sharing']
                    }
                  />

                  <ActivityCard
                    accent="emerald"
                    lang={lang}
                    title={lang === 'fr' ? 'Clean walks' : 'Clean walks'}
                    period={lang === 'fr' ? 'Engagement régulier' : 'Regular commitment'}
                    reflection={
                      lang === 'fr'
                        ? "Participer à des clean walks m'a fait prendre conscience de l'impact direct de gestes simples. Ramasser des déchets en groupe, c'est aussi une manière concrète de s'engager pour l'environnement, de sensibiliser autour de soi et de créer du lien avec d'autres bénévoles."
                        : 'Taking part in clean walks made me aware of the direct impact of simple actions. Collecting waste as a group is also a concrete way to commit to the environment, raise awareness around me and build ties with other volunteers.'
                    }
                    skills={
                      lang === 'fr'
                        ? ['Engagement citoyen', 'Écologie', 'Esprit d’équipe', 'Régularité', 'Sensibilisation']
                        : ['Civic engagement', 'Environmental awareness', 'Teamwork', 'Consistency', 'Advocacy']
                    }
                  />
                </div>
              </div>
            </section>
          )}

          {/* ==========================================
              FENÊTRE 6 : CAREER DEVAMOPMENT
          ========================================== */}
          {shouldShowWindow('career') && (
            <section className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-500">
              <div className="px-5 py-3 bg-slate-100/80 dark:bg-slate-800/60 border-b border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    06_career.tsx
                  </span>
                </div>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {t.nav.career} (6/7)
                </span>
              </div>
              <div className="p-6 sm:p-10 lg:p-14 space-y-10">
                <div className="max-w-3xl space-y-2">
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {lang === 'fr' ? 'Développement professionnel' : 'Career Development'}
                  </h2>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                    {lang === 'fr' ? 'CV, LinkedIn, modèles de rôle, projets de mobilité, pitch' : 'CV, LinkedIn, role models, mobility projects, pitch'}
                  </p>
                </div>

                {/* CV + LinkedIn */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/70 space-y-3">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                      {lang === 'fr' ? 'CV' : 'Resume / CV'}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {lang === 'fr'
                        ? 'Formation, expériences, projets et compétences — une version française et une version anglaise.'
                        : 'Education, experience, projects and skills — available in French and English.'}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a href={cvFr} download="Erwan_Leremon_CV_FR.pdf" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all">
                        <Download className="w-4 h-4" />
                        {lang === 'fr' ? 'CV (Français)' : 'CV (French)'}
                      </a>
                      <a href={cvEn} download="Erwan_Leremon_CV_EN.pdf" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all">
                        <Download className="w-4 h-4" />
                        {lang === 'fr' ? 'CV (Anglais)' : 'CV (English)'}
                      </a>
                      <button onClick={() => setShowCv(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all">
                        <Eye className="w-4 h-4" />
                        {lang === 'fr' ? 'Voir' : 'View'}
                      </button>
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/70 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                        LinkedIn
                      </h3>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {lang === 'fr' ? 'Profil actif' : 'Active profile'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {lang === 'fr'
                        ? "Mon parcours d'ingénieur en informatique et mathématiques appliquées, mes projets web et mes projets de mobilité internationale — en français comme en anglais."
                        : 'My engineering path in computer science and applied mathematics, my web projects and my international mobility plans — in both French and English.'}
                    </p>
                    <a href="https://www.linkedin.com/in/erwan-leremon-700b70439/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                      <ExternalLink className="w-4 h-4" />
                      {lang === 'fr' ? 'Se connecter sur LinkedIn' : 'Connect on LinkedIn'}
                    </a>
                  </div>
                </div>

                {/* Pitch video */}
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/70 space-y-4">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    {lang === 'fr' ? 'Vidéo de pitch' : 'Pitch video'}
                  </h3>
                  <video
                    src="/pitch.mp4"
                    controls
                    className="w-full rounded-2xl border border-slate-200/80 dark:border-slate-700/70"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        title: lang === 'fr' ? 'Aujourd’hui' : 'Today',
                        fr: "Je suis étudiant ingénieur à l'ENSEEIHT (N7), où je me forme en informatique et mathématiques appliquées. J'aime concevoir des applications web et transformer des idées en outils concrets.",
                        en: "I'm an engineering student at ENSEEIHT (N7), specializing in computer science and applied mathematics. I enjoy building web applications and turning ideas into concrete tools.",
                      },
                      {
                        title: lang === 'fr' ? 'Mon parcours' : 'My path',
                        fr: "Après deux années de CPGE, j'ai rejoint N7. Mes projets — du modding Minecraft en équipe à l'optimisation SEO/GEO de n7consulting.fr — m'ont appris à collaborer et à résoudre des problèmes concrets.",
                        en: 'After two years of intensive preparatory classes (CPGE), I joined N7. My projects — from team Minecraft modding to the SEO/GEO optimization of n7consulting.fr — taught me collaboration and concrete problem solving.',
                      },
                      {
                        title: lang === 'fr' ? 'Mes ambitions' : 'My ambitions',
                        fr: "Je souhaite construire ma carrière à l'international, à la croisée de l'ingénierie logicielle et de l'intelligence artificielle. Mes modèles et mes projets de mobilité à Hong Kong, Montréal et en Chine m'aident à préciser ce cap.",
                        en: 'I aim to build my career internationally, at the crossroads of software engineering and artificial intelligence. My role models and my mobility projects in Hong Kong, Montréal and China help me shape that direction.',
                      },
                    ].map((p) => (
                      <div key={p.title} className="p-4 rounded-xl bg-white/60 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-700/60">
                        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">{p.title}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {lang === 'fr' ? p.fr : p.en}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Role models */}
                <div className="space-y-4">
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white">
                    {lang === 'fr' ? 'Trois modèles de rôle analysés' : 'Three analyzed role models'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        key: 'kao',
                        src: roleModelKao,
                        title: 'Charles K. Kao',
                        tag: 'Hong Kong · HKU',
                        shortDesc: lang === 'fr'
                          ? 'Père de la fibre optique et prix Nobel de physique, il incarne la recherche patiente qui relie science fondamentale et impact mondial.'
                          : 'Father of fiber optics and Nobel laureate in physics, he embodies patient research connecting fundamental science with global impact.',
                        extendedDesc: lang === 'fr'
                          ? `Profil — Né à Shanghai et formé à Hong Kong puis à l'Université de Londres, Charles K. Kao mène ses recherches chez Standard Telecommunication Laboratories. Dès 1966, il démontre que des fibres de verre très pures peuvent transmettre la lumière sur de longues distances : ses travaux fondent les réseaux de communication modernes. Il reçoit le prix Nobel de physique en 2009 et dirige ensuite l'Université chinoise de Hong Kong.

Analyse — Ce qui m'inspire, c'est la combinaison de rigueur scientifique et de vision à long terme. Il a poursuivi une idée longtemps jugée irréaliste, en acceptant des années de doute et d'itérations avant que l'industrie ne mesure son potentiel. Son parcours entre Hong Kong, l'Europe et l'Asie montre aussi qu'une carrière d'ingénieur se construit à la croisée des cultures.

Ce que j'en retiens — approfondir les fondamentaux, documenter et transmettre ses résultats, et choisir des problèmes dont l'impact dépasse l'immédiateté technique.`
                          : `Profile — Born in Shanghai, educated in Hong Kong and then at the University of London, Charles K. Kao conducted his research at Standard Telecommunication Laboratories. As early as 1966, he demonstrated that highly pure glass fibres could carry light over long distances: his work laid the foundation of modern communication networks. He received the Nobel Prize in Physics in 2009 and later led the Chinese University of Hong Kong.

Analysis — What inspires me is the combination of scientific rigour and long-term vision. He pursued an idea long considered unrealistic, accepting years of doubt and iteration before industry recognised its potential. His path between Hong Kong, Europe and Asia also shows that an engineering career can be built at the crossroads of cultures.

What I take away — deepen the fundamentals, document and share results, and choose problems whose impact goes beyond immediate technical novelty.`,
                      },
                      {
                        key: 'bengio',
                        src: roleModelBengio,
                        title: 'Yoshua Bengio',
                        tag: 'Montréal · Polytechnique',
                        shortDesc: lang === 'fr'
                          ? 'Pionnier de l’apprentissage profond et fondateur de Mila à Montréal, il allie exigence scientifique, transmission et réflexion éthique sur l’IA.'
                          : 'A pioneer of deep learning and founder of Mila in Montreal, he combines scientific rigour, teaching and ethical reflection on AI.',
                        extendedDesc: lang === 'fr'
                          ? `Profil — Professeur à l'Université de Montréal, Yoshua Bengio est l'un des pères de l'apprentissage profond. Ses travaux sur les réseaux de neurones, les modèles de langage et l'attention ont ouvert la voie aux systèmes d'IA actuels. Il fonde Mila, l'institut québécois d'intelligence artificielle, et reçoit le prix Turing en 2018 avec Geoffrey Hinton et Yann LeCun.

Analyse — Il a maintenu une direction de recherche longtemps marginale avant qu'elle ne devienne centrale, ce qui suppose une grande confiance dans les fondamentaux et la capacité de travailler sans reconnaissance immédiate. J'admire aussi son engagement pour une IA responsable et sa volonté de former une communauté plutôt que de garder le savoir.

Ce que j'en retiens — la patience scientifique, l'importance des mathématiques et la responsabilité de l'ingénieur : construire des systèmes puissants ne dispense pas de réfléchir à leurs usages.`
                          : `Profile — A professor at the University of Montreal, Yoshua Bengio is one of the fathers of deep learning. His work on neural networks, language models and attention paved the way for today's AI systems. He founded Mila, Quebec's artificial intelligence institute, and received the Turing Award in 2018 with Geoffrey Hinton and Yann LeCun.

Analysis — He sustained a research direction that was long marginal before it became central, which requires deep confidence in fundamentals and the ability to work without immediate recognition. I also admire his commitment to responsible AI and his desire to build a community rather than keep knowledge to himself.

What I take away — scientific patience, the importance of mathematics and the engineer's responsibility: building powerful systems does not remove the need to think about their uses.`,
                      },
                      {
                        key: 'lee',
                        src: roleModelLee,
                        title: 'Kai-Fu Lee',
                        tag: lang === 'fr' ? 'Chine · HUST' : 'China · HUST',
                        shortDesc: lang === 'fr'
                          ? 'Chercheur en IA devenu dirigeant, il relie la recherche, l’entrepreneuriat et les cultures américaine et chinoise.'
                          : 'An AI researcher turned executive, he bridges research, entrepreneurship and American and Chinese cultures.',
                        extendedDesc: lang === 'fr'
                          ? `Profil — Formé à Columbia et à Carnegie Mellon, Kai-Fu Lee a mené des recherches en intelligence artificielle avant de diriger des équipes chez Apple, Microsoft et Google, où il a fondé Google China. Il crée ensuite Sinovation Ventures, un fonds dédié aux start-up technologiques chinoises, et publie AI Superpowers, essai traduit dans le monde entier.

Analyse — Son parcours montre qu'une compétence technique solide peut se prolonger dans le leadership et l'investissement. Il a su changer d'échelle et de culture sans perdre le lien avec la recherche, tout en expliquant les transformations de l'IA à un large public.

Ce que j'en retiens — savoir présenter des idées complexes, construire des ponts entre les écosystèmes et garder une curiosité technique même en position de direction.`
                          : `Profile — Trained at Columbia and Carnegie Mellon, Kai-Fu Lee conducted research in artificial intelligence before leading teams at Apple, Microsoft and Google, where he founded Google China. He then created Sinovation Ventures, a fund dedicated to Chinese technology start-ups, and published AI Superpowers, an essay translated worldwide.

Analysis — His career shows that strong technical skills can extend into leadership and investment. He has changed scale and culture without losing his connection to research, while explaining AI transformations to a broad audience.

What I take away — learn to present complex ideas, build bridges between ecosystems and keep technical curiosity even in a leadership position.`,
                      },
                    ].map((m) => (
                      <ExpandableCard
                        key={m.key}
                        title={m.title}
                        shortDesc={m.shortDesc}
                        extendedDesc={m.extendedDesc}
                        imageSrc={m.src}
                        lang={lang}
                        tag={m.tag}
                        imagePosition="50% 20%"
                      />
                    ))}
                  </div>
                  <p className="text-xs leading-relaxed text-slate-400 dark:text-slate-500">
                    {lang === 'fr'
                      ? 'Portraits : Wikimedia Commons — David Dobkin (CC BY-SA 3.0), Xuthoria (CC BY-SA 4.0), service de presse de la présidence de l’Azerbaïdjan (CC BY 4.0).'
                      : 'Portraits: Wikimedia Commons — David Dobkin (CC BY-SA 3.0), Xuthoria (CC BY-SA 4.0), Press Service of the President of Azerbaijan (CC BY 4.0).'}
                  </p>
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
                  {t.nav.contact} (7/7)
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
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

                    {isError && (
                      <div className="flex items-start gap-2 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-sm font-medium">
                        <Mail className="w-5 h-5 shrink-0 mt-0.5" />
                        <span>
                          {lang === 'fr'
                            ? "L'envoi a échoué. Écrivez-moi directement à "
                            : 'Sending failed. Please email me directly at '}
                          <a href="mailto:_erwan@tuta.com" className="underline font-bold">
                            _erwan@tuta.com
                          </a>
                          .
                        </span>
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
                    src={toulouseContact}
                  />

                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 space-y-4">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      _erwan@tuta.com
                    </p>
                    <div className="flex items-center gap-3">
                      <a
                        href="https://github.com/erwan-lrmn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-colors"
                        aria-label="GitHub"
                      >
                        <GithubIcon className="w-5 h-5" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/erwan-leremon-700b70439/"
                        target="_blank"
                        rel="noopener noreferrer"
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

        {/* Modal de visualisation du CV */}
        {showCv && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-backdrop backdrop-blur-xl bg-black/10 dark:bg-black/20" onClick={() => setShowCv(false)}>
            <div className="relative w-full max-w-4xl h-[85vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-900 dark:text-white">
                  {lang === 'fr' ? 'CV (Français)' : 'CV (English)'}
                </span>
                <button
                  onClick={() => setShowCv(false)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  ✕
                </button>
              </div>
              <iframe
                src={lang === 'fr' ? cvFr : cvEn}
                title={lang === 'fr' ? 'CV français' : 'English CV'}
                className="w-full h-full border-0"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}