// cordcontent.tsx
import React from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Terminal,
  Database,
  Code2,
  Briefcase,
  GraduationCap,
  ArrowUpRight,
  Brain,
  Cpu,
  Sparkles,
  Layout,
  Server,
  FolderOpen,
  Layers
} from 'lucide-react';
import '../app/globals.css';

// ----- INTRO CONTENT -----
export const IntroContent: React.FC = () => {

  const renderBio = () => {
    // BIO TEXT:
    const bioText = "Full Stack Developer architecting <full-stack>scalable apps</full-stack> & <devops>production-ready</devops> cloud systems.";
    
    // Updated Regex to look for our new tags
    const parts = bioText.split(/(<full-stack>.*?<\/full-stack>|<devops>.*?<\/devops>)/g);

    return parts.map((part, index) => {
      if (part.startsWith('<full-stack>')) {
        const text = part.replace(/<\/?full-stack>/g, '');
        return (
          <span key={index} className="text-main font-semibold decoration-primary/20 decoration-2">
            {text}
          </span>
        );
      }
      if (part.startsWith('<devops>')) {
        const text = part.replace(/<\/?devops>/g, '');
        return (
          <span key={index} className="text-main font-semibold pb-0.5">
            {text}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="relative h-full flex flex-col justify-between">
      {/* Decorative Background Blobs */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-[80px] animate-blob mix-blend-overlay pointer-events-none"></div>
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/5 rounded-full blur-[80px] animate-blob mix-blend-overlay pointer-events-none" style={{ animationDelay: '2s' }}></div>

      {/* Status Badge */}
      <div className="relative z-10 flex justify-end">
        <div className="inline-flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-card border border-custom shadow-sm transition-all hover:border-emerald-500/30 hover:shadow-md cursor-default group">
          <div className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500"></span>
          </div>
          <span className="text-[8px] sm:text-[10px] font-semibold tracking-wider uppercase text-muted group-hover:text-main transition-colors duration-200">
            AVAILABLE FOR WORK
          </span>
        </div>
      </div>

      {/* Name + Bio */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-4 mt-auto">
        <div className="relative bottom-[-2px] sm:bottom-[-4px]">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[0.85] text-main animate-fade-in-up" style={{ animationDelay: '1.5s', animationFillMode: 'both' }}>
            Vighnesh
          </h1>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[0.85] text-muted/20 animate-fade-in-up" style={{ animationDelay: '1.8s', animationFillMode: 'both' }}>
            Gaddam.
          </h1>
        </div>

        {/* Bio Container */}
        <div className="block md:max-w-40 md:text-right pb-1">
          <p className="text-[10px] sm:text-xs text-muted font-medium leading-relaxed opacity-80 md:opacity-100">
            {renderBio()}
          </p>
        </div>
      </div>
    </div>
  );
};

// ----- SOCIALS CONTENT -----
export const SocialsContent: React.FC = () => {
  return (
    <div className="flex flex-col h-full gap-2 sm:gap-3 w-full">
      <div className="flex-1 flex gap-2 sm:gap-3 min-h-0">

        {/* GitHub */}
        <a
          href="https://github.com/Vighnesh-Gaddam"
          target="_blank"
          rel="noreferrer"
          className="group/github relative flex-1 flex items-center justify-center rounded-[16px] sm:rounded-[24px] bg-card-hover border border-custom transition-all duration-300 hover:bg-text-main">
          <Github
            className="w-6 h-6 sm:w-8 sm:h-8 text-main transition-all duration-300 group-hover/github:text-[var(--text-inverse)]"
          />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/vighnesh-gaddam/"
          target="_blank"
          rel="noreferrer"
          className="relative flex-1 flex items-center justify-center rounded-[16px] sm:rounded-[24px] bg-card-hover border border-custom overflow-hidden transition-all duration-300 hover:bg-[#0077b5]">
          <Linkedin
            className="w-6 h-6 sm:w-8 sm:h-8 text-main transition-all duration-30 hover:text-white"
          />
        </a>
      </div>

      {/* Let's Connect CTA */}
      <a
        href="https://www.linkedin.com/in/vighnesh-gaddam/"
        target="_blank"
        rel="noreferrer"
        className="group relative h-11 sm:h-14 w-full bg-text-main text-page rounded-[16px] sm:rounded-[24px] flex items-center justify-between px-4 sm:px-6 gap-2 font-bold shadow-md transition-all overflow-hidden hover:shadow-xl active:scale-[0.98]" >
        <span className="relative z-10 text-xs sm:text-sm tracking-wide">
          Let&apos;s Connect
        </span>
        <div
          className="relative z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--bg-page)] group-hover:text-[var(--text-main)]">
          <ArrowUpRight
            size={14}
            className="sm:w-4 sm:h-4"
          />
        </div>
      </a>
    </div>
  );
};


// ----- TECH ICON -----
const TechIcon: React.FC<{ icon: React.ReactNode; label: string; hoverColor: string }> = ({ icon, label, hoverColor }) => (
  <div className="group/tech flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-card-hover border border-custom/50 shrink-0 shadow-sm cursor-default transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-[var(--hover-color)]" style={{ ['--hover-color' as string]: hoverColor }}>
    <span className="text-muted transition-colors duration-300 group-hover/tech:text-[var(--hover-color)]">{icon}</span>
    <span className="text-[10px] sm:text-xs font-semibold text-main whitespace-nowrap transition-colors duration-300 group-hover/tech:text-[var(--hover-color)]">{label}</span>
  </div>
);

// ----- TECH STACK -----
export const TechStackContent: React.FC = () => {
  const row1 = [
    { icon: <Code2 size={14} />, label: "React", hoverColor: "#61DAFB" },
    { icon: <Cpu size={14} />, label: "Next.js", hoverColor: "#ffffff" },
    { icon: <Terminal size={14} />, label: "TypeScript", hoverColor: "#3178C6" },
    { icon: <Layout size={14} />, label: "Tailwind", hoverColor: "#06B6D4" },
    { icon: <Brain size={14} />, label: "Gemini API", hoverColor: "#8B5CF6" },
    { icon: <Database size={14} />, label: "PostgreSQL", hoverColor: "#336791" },
  ];

  const row2 = [
    { icon: <Server size={14} />, label: "Node.js", hoverColor: "#68A063" },
    { icon: <Code2 size={14} />, label: "Java", hoverColor: "#FFD43B" },
    { icon: <Database size={14} />, label: "MongoDB", hoverColor: "#00ED64" },
    { icon: <Layout size={14} />, label: "Framer Motion", hoverColor: "#FF0080" },
    { icon: <Terminal size={14} />, label: "Docker", hoverColor: "#2496ED" },
    { icon: <Database size={14} />, label: "Prisma", hoverColor: "#DC382D" },
  ];

  return (
    <div className="flex flex-col flex-1 justify-center w-full relative overflow-hidden mask-linear-fade py-4">
      <div className="flex gap-3 overflow-x-hidden overflow-y-visible w-full mb-3 py-1">
        <div className="flex shrink-0 animate-marquee items-center gap-3">{row1.map((item, i) => <TechIcon key={`r1-${i}`} {...item} />)}</div>
        <div className="flex shrink-0 animate-marquee items-center gap-3">{row1.map((item, i) => <TechIcon key={`r1-d-${i}`} {...item} />)}</div>
      </div>
      <div className="flex gap-3 overflow-x-hidden overflow-y-visible w-full py-1">
        <div className="flex shrink-0 animate-marquee-reverse items-center gap-3">{row2.map((item, i) => <TechIcon key={`r2-${i}`} {...item} />)}</div>
        <div className="flex shrink-0 animate-marquee-reverse items-center gap-3">{row2.map((item, i) => <TechIcon key={`r2-d-${i}`} {...item} />)}</div>
      </div>
    </div>
  );
};

// ----- ABOUT -----
export const AboutContent: React.FC = () => {
  const renderPhrase = () => {
    // About Text
    const phrase = "Dedicated to <precision>precision</precision> and <automation>automation</automation>.";
    const parts = phrase.split(/(<precision>.*?<\/precision>|<automation>.*?<\/automation>)/g);

    return parts.map((part, index) => {
      if (part.startsWith('<precision>')) {
        const text = part.replace(/<\/?precision>/g, '');
        return (
          <span key={index} className="text-muted decoration-1 underline decoration-custom underline-offset-4">
            {text}
          </span>
        );
      }
      if (part.startsWith('<automation>')) {
        const text = part.replace(/<\/?automation>/g, '');
        return (
          <span key={index} className="text-muted decoration-1 underline decoration-custom underline-offset-4">
            {text}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="h-full flex flex-col justify-end relative z-10">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>

      <div className="space-y-3 sm:space-y-4">
        {/* Icon Box */}
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-card flex items-center justify-center text-main border border-custom shadow-sm">
          <Sparkles size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
        </div>

        {/* Text Area */}
        <p className="text-base sm:text-xl md:text-2xl font-medium text-main leading-tight tracking-tight">
          {renderPhrase()}
        </p>
      </div>
    </div>
  );
};

// ----- EXPERIENCE -----
export const ExperienceContent: React.FC = () => {
  const experiences = [
    { company: 'Open for work', role: 'Full Stack Developer' },
    { company: 'Techiebears', role: 'Full Stack Developer' },
  ];

  return (
    <div className="mt-auto space-y-2 sm:space-y-4">
      {experiences.map((exp, i) => (
        <React.Fragment key={exp.company}>
          <div
            className={`flex items-center gap-2.5 sm:gap-4 transition-all duration-300
              ${i === 0
                ? "group"
                : "opacity-50 hover:opacity-100"
              }`}
          >
            {/* Icon Box */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-card border border-custom flex items-center justify-center text-main group-hover:border-primary/20 transition-colors shadow-sm shrink-0">
              <Briefcase size={16} className="sm:w-5 sm:h-5" strokeWidth={1.5} />
            </div>

            {/* Text Content */}
            <div>
              <p className="text-main font-bold text-sm sm:text-base md:text-lg leading-none mb-0.5 sm:mb-1">
                {exp.company}
              </p>
              <p className="text-muted text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-wide">
                {exp.role}
              </p>
            </div>
          </div>

          {/* Separator Line: Only shows after the first item */}
          {i === 0 && <div className="w-full h-px border border-custom"></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

// ----- EDUCATION -----
export const EducationContent: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-end py-4 relative">
      <div className="absolute top-0 right-0 p-24 bg-gradient-to-br from-primary/5 to-purple-500/5 blur-[60px] rounded-full pointer-events-none z-0"></div>
      <div className="mt-auto space-y-2 sm:space-y-3 relative z-10">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-card border border-custom flex items-center justify-center text-main shadow-sm">
          <GraduationCap size={16} className="sm:w-5 sm:h-5" strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-main leading-tight mb-0.5 sm:mb-1">
            Master of <br /> Computer Applications
          </h3>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-emerald-500"></span>
            <p className="text-muted text-[10px] sm:text-xs font-medium">Manipal University</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ----- PROJECTS -----
export const ProjectsTriggerContent: React.FC = () => {
  return (
    <div className="relative h-full flex flex-col justify-between group/projects overflow-hidden p-1">
      {/* Background Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover/projects:bg-primary/25 transition-colors duration-500"></div>

      <div className="relative z-10">
        {/* Icon Box */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-card border border-custom flex items-center justify-center text-main shadow-sm mb-4 sm:mb-6 group-hover/projects:border-primary/30 transition-all duration-500">
          <FolderOpen size={20} className="sm:w-6 sm:h-6" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-2xl font-bold text-main tracking-tight leading-tight">
          Featured Projects
        </h3>

        {/* Subtitle with Icon */}
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-muted mt-2 flex items-center gap-2">
          <Layers size={12} />
          View Portfolio
        </p>
      </div>

      {/* Avatar / Project Stack */}
      <div className="relative z-10 flex items-center justify-start mt-auto">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-custom bg-card-hover flex items-center justify-center text-[10px] font-bold text-muted shadow-sm transition-transform group-hover/projects:translate-y-[-2px]"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {i === 3 ? "+3" : ""}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ----- CONTACT -----

interface ContactProps {
  copyToClipboard: (text: string, label: string) => Promise<void>;
  copiedText: string | null;
}

export const ContactContent = ({ copyToClipboard, copiedText }: ContactProps) => {
  const email = "vgnshgdm@gmail.com";

  return (
    <div className="flex flex-col justify-between h-full relative z-10 p-4">
      <div className="max-w-[80%]">
        <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-card border border-custom flex items-center justify-center text-main shadow-sm mb-2 sm:mb-4">
          <Mail size={18} className="sm:w-6 sm:h-6" strokeWidth={1.5} />
        </div>
        <h3 className="text-lg sm:text-2xl md:text-3xl font-semibold text-main mb-1 sm:mb-2 tracking-tight">
          Contact Me
        </h3>
      </div>

      <div className="w-full space-y-2">
        {/* Email Copy Button */}
        <button
          onClick={() => copyToClipboard(email, "Email")}
          className="flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-5 py-2.5 sm:py-4 rounded-[14px] sm:rounded-[20px] bg-card hover:bg-card-hover border border-custom transition-all text-xs sm:text-sm group w-full shadow-sm hover:shadow-lg hover:border-primary/20 active:scale-[0.99]"
        >
          <span className="truncate font-medium text-muted group-hover:text-main transition-colors">
            {email}
          </span>
          <span className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md transition-all shrink-0 ${copiedText === "Email"
              ? "bg-green-500 text-white"
              : "bg-border/50 text-muted group-hover:bg-primary group-hover:text-primary-fg"
            }`}>
            {copiedText === "Email" ? "Copied" : "Copy"}
          </span>
        </button>

        {/* LinkedIn Link */}
        <a
          href="https://www.linkedin.com/in/vighnesh-gaddam/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-5 py-2.5 sm:py-4 rounded-[14px] sm:rounded-[20px] bg-card hover:bg-card-hover border border-custom transition-all text-xs sm:text-sm group w-full shadow-sm hover:shadow-lg hover:border-primary/20 active:scale-[0.99]"
        >
          <span className="truncate font-medium text-muted group-hover:text-main transition-colors">
            Connect on LinkedIn
          </span>
          <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md transition-all shrink-0 bg-border/50 text-muted group-hover:bg-primary group-hover:text-primary-fg">
            Open
          </span>
        </a>
      </div>
    </div>
  );
};