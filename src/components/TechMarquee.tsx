import React from 'react';
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiTailwindcss,
  SiHtml5,
  SiGit,
  SiGithub,
  SiDocker,
  SiLinux,
  SiFigma,
  SiVite,
  SiJest,
  SiCplusplus,
  SiGnubash,
} from 'react-icons/si';

type Lang = 'fr' | 'en';

type TechIcon = React.ComponentType<{
  className?: string;
  style?: React.CSSProperties;
  'aria-hidden'?: boolean;
}>;

interface Tech {
  name: string;
  /** Couleur officielle de la marque, utilisée au survol. */
  color: string;
  Icon: TechIcon;
}

/**
 * Outils de prédilection, alignés sur mon CV d'élève-ingénieur.
 * Facilement modifiable : ajoutez / retirez simplement une entrée.
 */
const TECH_STACK: Tech[] = [
  { name: 'React', color: '#61DAFB', Icon: SiReact as TechIcon },
  { name: 'TypeScript', color: '#3178C6', Icon: SiTypescript as TechIcon },
  { name: 'JavaScript', color: '#F7DF1E', Icon: SiJavascript as TechIcon },
  { name: 'Node.js', color: '#5FA04E', Icon: SiNodedotjs as TechIcon },
  { name: 'Express', color: '#000000', Icon: SiExpress as TechIcon },
  { name: 'Python', color: '#3776AB', Icon: SiPython as TechIcon },
  { name: 'PostgreSQL', color: '#4169E1', Icon: SiPostgresql as TechIcon },
  { name: 'MongoDB', color: '#47A248', Icon: SiMongodb as TechIcon },
  { name: 'MySQL', color: '#4479A1', Icon: SiMysql as TechIcon },
  { name: 'Tailwind CSS', color: '#06B6D4', Icon: SiTailwindcss as TechIcon },
  { name: 'HTML5', color: '#E34F26', Icon: SiHtml5 as TechIcon },
  { name: 'Git', color: '#F05032', Icon: SiGit as TechIcon },
  { name: 'GitHub', color: '#181717', Icon: SiGithub as TechIcon },
  { name: 'Docker', color: '#2496ED', Icon: SiDocker as TechIcon },
  { name: 'Linux', color: '#FCC624', Icon: SiLinux as TechIcon },
  { name: 'Figma', color: '#F24E1E', Icon: SiFigma as TechIcon },
  { name: 'Vite', color: '#646CFF', Icon: SiVite as TechIcon },
  { name: 'Jest', color: '#C21325', Icon: SiJest as TechIcon },
  { name: 'C++', color: '#00599C', Icon: SiCplusplus as TechIcon },
  { name: 'Bash', color: '#4EAA25', Icon: SiGnubash as TechIcon },
];

const copy = {
  fr: {
    eyebrow: 'Ma stack',
    title: 'Les outils que j’utilise au quotidien',
    hint: 'Survolez pour mettre en pause',
  },
  en: {
    eyebrow: 'My stack',
    title: 'The tools I use every day',
    hint: 'Hover to pause',
  },
} as const;

const TechMarquee: React.FC<{ lang: Lang }> = ({ lang }) => {
  const text = copy[lang];

  return (
    <section
      aria-label={text.title}
      className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-r from-slate-50 via-white to-slate-50 shadow-sm dark:border-slate-700/70 dark:from-slate-900 dark:via-slate-900/70 dark:to-slate-900"
    >
      <div className="flex flex-col items-center gap-1 px-6 pt-7 pb-1 text-center">
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
          {text.eyebrow}
        </span>
        <h3 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-white">
          {text.title}
        </h3>
      </div>

      {/* Bannière défilante */}
      <div className="marquee group relative py-6">
        {/* Dégradés latéraux pour un fondu propre */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-900 sm:w-24"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-50 to-transparent dark:from-slate-900 sm:w-24"
        />

        <div className="marquee-track flex w-max">
          {[0, 1].map((group) => (
            <div
              key={group}
              aria-hidden={group === 1}
              className="flex shrink-0 items-center gap-4 pr-4"
            >
              {TECH_STACK.map(({ name, color, Icon }) => (
                <div
                  key={`${group}-${name}`}
                  className="group/item flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-slate-700/70 dark:bg-slate-800/70 dark:hover:border-indigo-500/60"
                >
                  <Icon
                    aria-hidden
                    className="h-7 w-7 shrink-0 opacity-70 grayscale transition-all duration-300 group-hover/item:opacity-100 group-hover/item:grayscale-0 group-hover/item:scale-110"
                    style={{ color }}
                  />
                  <span className="whitespace-nowrap text-sm font-semibold text-slate-600 transition-colors duration-300 group-hover/item:text-indigo-600 dark:text-slate-300 dark:group-hover/item:text-indigo-400">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="pb-5 text-center text-[11px] font-medium text-slate-400 dark:text-slate-500">
        {text.hint}
      </p>
    </section>
  );
};

export default TechMarquee;
