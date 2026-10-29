import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Clock, Zap, Sparkles, CheckCircle2,
  AlertTriangle, Search, Target, Layers, ShieldCheck,
  Cpu, Maximize, Minimize, RotateCcw, Headphones, Mic,
  Users, Play, Pause,
  Calendar, Award, Server, ArrowRight, ArrowLeft,
  Sun, Moon,
  ListChecks, Globe, ChevronDown,
  Brain, Shield, MessageSquare, FileText
} from 'lucide-react';

// ==========================================
// PRESENTATION DATA DEFINITIONS
// ==========================================

export const SLIDES = [
  { id: 1, title: "Title & Overview", tag: "Slide 01", desc: "Project Identity & Leadership" },
  { id: 2, title: "Project Overview", tag: "Slide 02", desc: "Problem Analysis & Architecture" },
  { id: 3, title: "Progress Summary", tag: "Slide 03", desc: "Interactive Metrics & Lifecycle" },
  { id: 4, title: "Key Achievements", tag: "Slide 04", desc: "Milestones & Delivered Capabilities" },
  { id: 5, title: "Challenges & Risks", tag: "Slide 05", desc: "Risk Matrix & Mitigations" },
  { id: 6, title: "Next Steps & Roadmap", tag: "Slide 06", desc: "Phased Execution Timeline" },
  { id: 7, title: "Conclusion & Summary", tag: "Slide 07", desc: "Key Highlights from All Slides" },
  { id: 8, title: "Thank You & Q&A", tag: "Slide 08", desc: "Open Floor Discussion & Questions" }
];

// WORKFLOW PROGRESS PHASES
const WORKFLOW_PHASES = [
  {
    id: "planning",
    name: "1. Planning & Setup",
    percentage: 100,
    status: "Completed",
    statusColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    icon: Target,
    deliverables: [
      { name: "Project Plan & Scope Baseline", completed: true, date: "Aug 2026" },
      { name: "100+ Hours of Call Shadowing & Audio Listening", completed: true, date: "Aug 2026" },
      { name: "SLT Call Quality Standards & Rule Ingestion", completed: true, date: "Sep 2026" },
      { name: "Security & Data Privacy Architecture Plan", completed: true, date: "Sep 2026" }
    ],
    notes: "Planning completed on schedule with full approval for the trilingual AI assistant."
  },
  {
    id: "designing",
    name: "2. Screen Design & Logic",
    percentage: 100,
    status: "Completed",
    statusColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    icon: Layers,
    deliverables: [
      { name: "Clean Agent Workspace Design (Figma & Tailwind)", completed: true, date: "Sep 2026" },
      { name: "Voice Flow Diagrams for Sinhala, Tamil, and English", completed: true, date: "Sep 2026" },
      { name: "Step-by-Step Fault Finding Steps (Voice, Broadband, Fiber)", completed: true, date: "Oct 2026" },
      { name: "1-Click Trouble Ticket Template Design", completed: true, date: "Oct 2026" }
    ],
    notes: "Designs were tested with 25 active agents to make sure they are easy to use."
  },
  {
    id: "development",
    name: "3. Full-Stack Development",
    percentage: 50,
    status: "In Progress",
    statusColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40",
    icon: Cpu,
    deliverables: [
      { name: "Fast Trilingual Directory Search Engine", completed: true, date: "Oct 2026" },
      { name: "Speech Tool for Singlish & Local Accents", completed: true, date: "Oct 2026" },
      { name: "Automated SLT Call Quality Scorer", completed: false, date: "In Progress" },
      { name: "Step-by-Step Fault Triage & Ticket Creator", completed: false, date: "In Progress" },
      { name: "Direct Connection to Clarity CRM & GB Portal", completed: false, date: "Scheduled Sprint 8" }
    ],
    notes: "50% complete. Search engine and speech tools are ready; fault triage and CRM sync are under active development."
  },
  {
    id: "testing",
    name: "4. Quality Assurance & Testing",
    percentage: 0,
    status: "Not Started",
    statusColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    icon: ShieldCheck,
    deliverables: [
      { name: "Automated Tests for Search & Fault Troubleshooting", completed: false, date: "Pending Dev" },
      { name: "Speech Testing in Noisy Call Center Floors", completed: false, date: "Scheduled" },
      { name: "SLT Call Quality Standards Verification", completed: false, date: "Scheduled" },
      { name: "Live Field Pilot with 50 Call Center Agents", completed: false, date: "Scheduled Nov 2026" }
    ],
    notes: "Testing has not started yet. Structured QA and agent pilot trials will begin once development stabilizes."
  }
];

// KEY ACHIEVEMENTS & DELIVERED MODULES
const ACHIEVEMENTS = [
  {
    id: 1,
    title: "Trilingual Speech Normalizer",
    category: "Speech AI & Language",
    scope: "Core Module • In Dev",
    badge: "Trilingual Voice",
    moduleType: "Speech Normalizer",
    icon: Mic,
    color: "from-cyan-500 to-blue-600",
    desc: "A smart voice tool that understands Singlish, Tamil, and English spoken by customers in noisy call centers, converting spoken words into standard telecom terms.",
    highlights: [
      "Understands Sinhala, Tamil, and English accents clearly",
      "Converts Singlish phrases (e.g. 'PON light off' becomes Optical LOS)",
      "Filters out background room noise from the call center floor",
      "Processes speech in real time with zero delay during calls"
    ],
    specs: [
      { value: "3 Languages", label: "Sinhala • Tamil • English" },
      { value: "4,200+ Words", label: "Telecom Words Mapped" },
      { value: "Real-Time", label: "Instant Speech Processing" }
    ]
  },
  {
    id: 2,
    title: "Fast Intelligent Directory Search",
    category: "Search & Knowledge Base",
    scope: "Core Module • In Dev",
    badge: "Smart Search",
    moduleType: "Directory Search",
    icon: Search,
    color: "from-blue-600 to-indigo-600",
    desc: "Replaced static PDF manuals and scattered spreadsheets with an automated database that lets agents search contacts in less than a second.",
    highlights: [
      "Over 28,500 internal staff and department contacts indexed",
      "Converts static PDF documents into fast searchable data",
      "Finds contacts using natural questions in Sinhala, Tamil, or English",
      "In-memory cache keeps search fast even during peak call hours"
    ],
    specs: [
      { value: "28,500+", label: "Directory Records" },
      { value: "Vector DB", label: "Fast Database Search" },
      { value: "< 0.5s", label: "Instant Search Speed" }
    ]
  },
  {
    id: 3,
    title: "Fault Troubleshooting & Quick Tickets",
    category: "Troubleshooting & CRM",
    scope: "Core Module • In Dev",
    badge: "Fault Triage",
    moduleType: "Decision Helper",
    icon: Zap,
    color: "from-emerald-500 to-teal-600",
    desc: "Guides agents step-by-step through Fiber Voice, Broadband, and IPTV faults, finding the exact issue and creating a ready-to-dispatch Trouble Ticket.",
    highlights: [
      "Step-by-step guidance for 36 common fiber and broadband faults",
      "Automatically identifies if fault is at MDF or Area Maintenance",
      "Creates ready-to-copy Trouble Tickets for the CRM in 1 click",
      "Prevents typing mistakes and wrong technician dispatches"
    ],
    specs: [
      { value: "36 Guides", label: "Fault Troubleshooting Flows" },
      { value: "MDF vs MTCE", label: "Automatic Fault Location" },
      { value: "1-Click TT", label: "Ready for CRM Entry" }
    ]
  },
  {
    id: 4,
    title: "Real-Time SLT Call Quality Scoring",
    category: "Quality Assurance",
    scope: "Core Module • In Dev",
    badge: "Call Quality",
    moduleType: "Quality Checker",
    icon: Award,
    color: "from-amber-500 to-orange-600",
    desc: "Listens to live calls and checks them against official SLT quality standards, giving agents helpful reminders on screen and summary reports for supervisors.",
    highlights: [
      "Checks opening greetings in Sinhala, Tamil, and English",
      "Warns agents if customer hold time passes 30s or 45s",
      "Checks for polite phrases, apologies, and closing surveys",
      "Coaching view helps supervisors track agent performance"
    ],
    specs: [
      { value: "5 Standards", label: "Official SLT Rules" },
      { value: "Trilingual", label: "Greeting Verification" },
      { value: "45s Alert", label: "Hold-Time Reminder" }
    ]
  }
];

// CHALLENGES & RISKS
const RISKS = [
  {
    id: 1,
    title: "File-Based Knowledge Hub & Database Setup",
    category: "Knowledge Base",
    scope: "Primary Challenge • 1212 Call Center",
    badge: "Knowledge Base",
    moduleType: "Database Restructuring",
    severity: "High",
    severityClass: "bg-rose-500/20 text-rose-400 border-rose-500/40",
    impact: "Critical",
    probability: "High",
    status: "In Active Development",
    icon: FileText,
    color: "from-rose-500 to-amber-600",
    desc: "Our biggest challenge: the Knowledge Hub is currently stored in PDF files. Because the AI cannot read raw PDF files quickly during live calls, we must check every item and turn it into a fast database for the 1212 Contact Center.",
    highlights: [
      "Checking and structuring each Knowledge Hub document item-by-item",
      "Moving from static PDF files to a fast, searchable database",
      "Removing file-reading delays so the AI answers immediately",
      "Focused strictly on 1212 Contact Center operations (Knowledge Hub data source)"
    ],
    specs: [
      { value: "Item-by-Item", label: "Careful Data Verification" },
      { value: "Zero Files", label: "Fast Database System" },
      { value: "1212 Only", label: "Contact Center Scope" }
    ]
  },
  {
    id: 2,
    title: "Singlish & Sri Lankan Accent Recognition",
    category: "Voice Recognition",
    scope: "Speech AI • Core Focus",
    badge: "Local Accents",
    moduleType: "Voice Normalizer",
    severity: "High",
    severityClass: "bg-rose-500/20 text-rose-400 border-rose-500/40",
    impact: "High",
    probability: "High",
    status: "Model Tuning Active",
    icon: Mic,
    color: "from-amber-500 to-rose-600",
    desc: "Callers and agents speak in Singlish or English with a local accent. Standard speech tools misunderstand these phrases and SLT technical words (like PON, LOS, MDF), so we must train the AI specifically on our language.",
    highlights: [
      "Custom voice rules tuned for local Singlish and Sri Lankan English",
      "Maps local words directly to technical faults (e.g. 'PON light off' to Optical LOS)",
      "Trained on 4,200+ SLT telecom terms and abbreviations",
      "Cleans up speech text in real time to prevent misunderstandings"
    ],
    specs: [
      { value: "3 Languages", label: "Sinhala • Tamil • English" },
      { value: "4,200+ Words", label: "Telecom Words Trained" },
      { value: "Real-Time", label: "Instant Text Cleaning" }
    ]
  },
  {
    id: 3,
    title: "Need for Multiple Retraining Cycles in Testing",
    category: "Testing & Fine-Tuning",
    scope: "Testing Workflow",
    badge: "Retraining Cycles",
    moduleType: "Continuous Fine-Tuning",
    severity: "Medium",
    severityClass: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    impact: "High",
    probability: "High",
    status: "Framework In Place",
    icon: Brain,
    color: "from-purple-500 to-indigo-600",
    desc: "When testing with real calls, new customer phrases, uncommon accents, and unfamiliar words will appear. We need to retrain and fine-tune the AI model multiple times to improve its accuracy.",
    highlights: [
      "Logs customer phrases that the AI could not understand during test calls",
      "Fast retraining process to update AI language models regularly",
      "Automatic testing to make sure new training does not break existing features",
      "Sprint-based retraining planned before rolling out to 50 agents"
    ],
    specs: [
      { value: "Multi-Pass", label: "Regular Retraining Cycles" },
      { value: "Issue Log", label: "Tracks Unrecognized Words" },
      { value: "Safe Updates", label: "Protects Tested Features" }
    ]
  },
  {
    id: 4,
    title: "Room Noise & Missed Call Quality Points",
    category: "Quality Assurance",
    scope: "Call Scoring",
    badge: "Quality Evaluation",
    moduleType: "Noise & Quality Filter",
    severity: "High",
    severityClass: "bg-rose-500/20 text-rose-400 border-rose-500/40",
    impact: "High",
    probability: "Medium",
    status: "Filter Optimization",
    icon: Award,
    color: "from-cyan-500 to-blue-600",
    desc: "During live call evaluation, background noise from neighboring agents and speech variations can cause the AI to miss required greetings, polite words, or closing surveys.",
    highlights: [
      "Noise filtering removes background chatter from the call center floor",
      "Smart matching recognizes greetings even if the agent words it slightly differently",
      "Watchdog checks ensure polite words and hold-time apologies are counted",
      "Supervisor screen lets managers easily review and adjust scores if needed"
    ],
    specs: [
      { value: "5 Standards", label: "Official SLT Rules" },
      { value: "Noise Filter", label: "Cuts Floor Chatter" },
      { value: "Smart Match", label: "Catches Greeting Variations" }
    ]
  },
  {
    id: 5,
    title: "Fast Server Infrastructure with Zero Buffering",
    category: "Server Infrastructure",
    scope: "Contact Center Scale",
    badge: "Zero Buffering",
    moduleType: "High-Speed Server Setup",
    severity: "High",
    severityClass: "bg-rose-500/20 text-rose-400 border-rose-500/40",
    impact: "Critical",
    probability: "Medium",
    status: "Infrastructure Scaling",
    icon: Server,
    color: "from-emerald-500 to-teal-600",
    desc: "When hundreds of contact center agents use the copilot at the same time, normal servers lag and buffer. We need fast, reliable server infrastructure with memory caching so agents get answers without any delay.",
    highlights: [
      "Fast server setup designed to support many active agents at the same time",
      "In-memory cache gives instant answers to common questions without API lag",
      "Streaming display prevents agent screens from freezing or buffering",
      "Sized specifically to match 1212 Contact Center peak call volumes"
    ],
    specs: [
      { value: "Zero Buffer", label: "No Lagging on Screens" },
      { value: "Multi-Agent", label: "Supports High Concurrency" },
      { value: "< 0.5s", label: "Instant Answer Speed" }
    ]
  }
];

// NEXT STEPS & ROADMAP
const ROADMAP_STEPS = [
  {
    phase: "Phase 1: Real Call Listening & AI Training",
    timeline: "Immediate Next Step",
    status: "Priority Focus",
    statusBadge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    focus: "Live Officer Call Audio",
    deliverables: [
      "Listen to real calls handled by contact center officers to capture everyday conversation patterns",
      "Train and fine-tune the AI speech model on natural Sinhala, Tamil, and English accents",
      "Improve the AI's understanding of customer phrasing and SLT technical words",
      "Build a clean training dataset from real call center audio recordings"
    ],
    targetMetric: "Real Audio Training"
  },
  {
    phase: "Phase 2: Fault Analysis & Reporting Verification",
    timeline: "Following Model Training",
    status: "Planned",
    statusBadge: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    focus: "Accurate Issue Diagnosis",
    deliverables: [
      "Analyze customer problem descriptions to check if the AI correctly identifies the exact fault",
      "Verify whether the AI accurately determines the fault boundary (MDF vs Area Maintenance)",
      "Ensure the AI generates correct Trouble Ticket summaries without errors or missed details",
      "Review sample troubleshooting recommendations against senior officer judgment"
    ],
    targetMetric: "Accurate Fault Reporting"
  },
  {
    phase: "Phase 3: Limited Officer Pilot & Bug Fixing",
    timeline: "Post-Development Trial",
    status: "Controlled Testing",
    statusBadge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    focus: "Small-Scale Real Usage",
    deliverables: [
      "Deploy the working copilot to a small, limited group of contact center officers",
      "Test real-time performance, response speed, and usability during actual customer calls",
      "Gather direct daily feedback from officers on missing knowledge or incorrect suggestions",
      "Continuously fix bugs, improve database answers, and polish the assistant on the go"
    ],
    targetMetric: "Iterative Improvement"
  }
];

// CONCLUSION SUMMARY POINTS (SLIDES 01 TO 06 HIGHLIGHTS)
const CONCLUSION_POINTS = [
  {
    slideNum: "Slide 01",
    label: "Project Purpose",
    title: "1212 Contact Center Focus",
    desc: "Built exclusively to assist 1212 agents, eliminating customer hold times from 45s down to under 2 seconds.",
    icon: Target,
    borderHover: "hover:border-cyan-400/50",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    iconColor: "text-cyan-400"
  },
  {
    slideNum: "Slide 02",
    label: "Knowledge Base",
    title: "Vector DB from PDF Files",
    desc: "Transformed static PDF guides into a fast AI search database. Contact center only; RTO offices remain separate.",
    icon: FileText,
    borderHover: "hover:border-blue-400/50",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    iconColor: "text-blue-400"
  },
  {
    slideNum: "Slide 03",
    label: "Current Status",
    title: "50% Development Completed",
    desc: "Core user interface, speech processing, and search engines are built. Rigorous testing begins next.",
    icon: CheckCircle2,
    borderHover: "hover:border-emerald-400/50",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    iconColor: "text-emerald-400"
  },
  {
    slideNum: "Slide 04",
    label: "Capabilities",
    title: "Trilingual Voice & Fast Triage",
    desc: "Understands Sinhala, Tamil, and English accents, with live fault categorization and automated QA scoring.",
    icon: Zap,
    borderHover: "hover:border-amber-400/50",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    iconColor: "text-amber-400"
  },
  {
    slideNum: "Slide 05",
    label: "Key Challenges",
    title: "Accents, Retraining & Speed",
    desc: "Mastering Sri Lankan accents, recurring model retraining, and zero-buffer high-speed server performance.",
    icon: AlertTriangle,
    borderHover: "hover:border-rose-400/50",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    iconColor: "text-rose-400"
  },
  {
    slideNum: "Slide 06",
    label: "Next Roadmap",
    title: "Call Listening & Limited Pilot",
    desc: "Training with real officer calls, verifying fault reporting, and launching a pilot with a small officer group.",
    icon: Calendar,
    borderHover: "hover:border-purple-400/50",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    iconColor: "text-purple-400"
  }
];

// ==========================================
// MAIN PRESENTATION COMPONENT
// ==========================================

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isDark, setIsDark] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [slide2Tab, setSlide2Tab] = useState<'problem' | 'solution'>('problem');
  const [activeWorkflowTab, setActiveWorkflowTab] = useState<'planning' | 'designing' | 'development' | 'testing'>('development');
  const [selectedAchievement, setSelectedAchievement] = useState<number>(1);
  const [activeRiskIdx, setActiveRiskIdx] = useState<number>(0);
  const [activeRoadmapIdx, setActiveRoadmapIdx] = useState<number>(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const totalSlides = SLIDES.length;

  // KEYBOARD NAVIGATION
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev < totalSlides ? prev + 1 : 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev > 1 ? prev - 1 : totalSlides));
  }, [totalSlides]);

  // TOUCH SWIPE NAVIGATION FOR MOBILE & TABLETS
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlide(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlide(totalSlides);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, totalSlides]);

  // AUTOPLAY TIMER
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev < totalSlides ? prev + 1 : 1));
    }, 12000);
    return () => clearInterval(timer);
  }, [isAutoPlay, totalSlides]);

  // FULLSCREEN TOGGLE
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  // ACTIVE IN-SLIDE CARD REFERENCES FOR PROJECTOR READABILITY
  const activeRisk = RISKS[activeRiskIdx] || RISKS[0];
  const activeRoadmap = ROADMAP_STEPS[activeRoadmapIdx] || ROADMAP_STEPS[0];

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`h-[100dvh] max-h-[100dvh] w-full select-none transition-colors duration-300 font-sans flex flex-col justify-between relative overflow-hidden touch-manipulation ${
        isDark ? 'bg-[#030712] text-slate-100' : 'bg-slate-100 text-slate-800 theme-light'
      }`}>
      {/* Background Ambience & Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {isDark ? (
          <>
            <div className="absolute top-[-15%] left-[-10%] w-[50rem] h-[50rem] bg-[#005696]/20 rounded-full blur-[140px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50rem] h-[50rem] bg-[#00F0FF]/15 rounded-full blur-[160px]" />
            <div className="absolute top-[40%] right-[25%] w-[35rem] h-[35rem] bg-indigo-900/15 rounded-full blur-[120px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="scanlines opacity-20" />
          </>
        ) : (
          <>
            <div className="absolute top-[-15%] left-[-10%] w-[50rem] h-[50rem] bg-blue-200/50 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50rem] h-[50rem] bg-cyan-200/40 rounded-full blur-[140px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,86,150,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />
          </>
        )}
      </div>

      {/* TOP HEADER CONTROLS (RESPONSIVE) */}
      <header className={`relative z-50 shrink-0 flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 border-b backdrop-blur-xl ${
        isDark ? 'bg-[#030712]/90 border-white/10' : 'bg-white/90 border-slate-200 shadow-sm'
      }`}>
        {/* Brand identity */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#005696] to-[#00A3E0] flex items-center justify-center text-white font-black text-xs sm:text-sm tracking-tight shadow-lg shadow-cyan-500/20 shrink-0">
            SLT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5">
                Smart PEARL
                <span className="hidden sm:inline text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/20 text-[#00F0FF] border border-cyan-500/30">
                  Review v2.4
                </span>
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-slate-400 font-medium">Enterprise Copilot • Sri Lanka Telecom PLC</p>
          </div>
        </div>

        {/* Current Slide Display / Drawer Trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
              isDark
                ? 'bg-white/5 border-white/10 text-cyan-300 hover:bg-white/10'
                : 'bg-slate-100 border-slate-300 text-blue-700 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="hidden md:inline">Slide {currentSlide} of {totalSlides}: {SLIDES[currentSlide - 1].title}</span>
            <span className="md:hidden font-mono font-bold">{currentSlide}/{totalSlides}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${drawerOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Autoplay Toggle */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            title={isAutoPlay ? "Pause Auto-play" : "Start Auto-play"}
            className={`p-1.5 sm:p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all ${
              isAutoPlay
                ? 'bg-cyan-500/20 border-cyan-500/50 text-[#00F0FF]'
                : isDark
                ? 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            {isAutoPlay ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            <span className="hidden lg:inline text-[11px]">{isAutoPlay ? "Playing" : "Auto"}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className={`p-1.5 sm:p-2 rounded-xl border transition-all ${
              isDark
                ? 'bg-white/5 border-white/10 text-amber-300 hover:bg-white/10'
                : 'bg-slate-100 border-slate-200 text-blue-600 hover:bg-slate-200'
            }`}
          >
            {isDark ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            className={`p-1.5 sm:p-2 rounded-xl border transition-all ${
              isDark
                ? 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            {isFullscreen ? <Minimize className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>

          {/* Reset to Slide 1 */}
          <button
            onClick={() => setCurrentSlide(1)}
            title="Return to Slide 1"
            className={`p-1.5 sm:p-2 rounded-xl border transition-all ${
              isDark
                ? 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </header>

      {/* TOP SLIDE PROGRESS BAR */}
      <div className="relative z-50 shrink-0 w-full h-1 bg-white/10 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#005696] via-[#00A3E0] to-[#00F0FF]"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentSlide / totalSlides) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* SLIDE SELECTION DRAWER */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-[52px] sm:top-[60px] left-0 right-0 z-50 p-4 sm:p-6 border-b backdrop-blur-2xl shadow-2xl ${
              isDark ? 'bg-[#0B1221]/95 border-white/10' : 'bg-white/95 border-slate-200'
            }`}
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <Layers className="w-4 h-4" /> Quick Slide Navigator
                </span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded"
                >
                  Close (Esc)
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3">
                {SLIDES.map(slide => (
                  <button
                    key={slide.id}
                    onClick={() => {
                      setCurrentSlide(slide.id);
                      setDrawerOpen(false);
                    }}
                    className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      currentSlide === slide.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-[#00F0FF] shadow-lg shadow-cyan-500/10'
                        : isDark
                        ? 'bg-white/5 border-white/10 hover:border-white/30 text-slate-300'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-400 text-slate-700'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-slate-400 mb-0.5">{slide.tag}</div>
                    <div className="font-bold text-xs truncate">{slide.title}</div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5 hidden sm:block">{slide.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT AREA (STRICT ZERO SCROLL - 100% VIEWPORT FIT) */}
      {/* MAIN CONTENT AREA (FULL-SCREEN FLUID VIEWPORT FIT - ZERO SCROLL) */}
      <main className="relative z-10 flex-1 min-h-0 w-full flex flex-col justify-between px-3 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-2 sm:py-3 lg:py-4 overflow-hidden max-w-none">
        <AnimatePresence mode="wait">
          {/* SLIDE 1: TITLE & INTRODUCTION (WITH EXPANDED ANIMATED ROBOT CORE) */}
          {currentSlide === 1 && (
            <motion.div
              key="slide-1"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full max-h-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 xl:gap-16 items-center justify-between overflow-hidden my-auto py-1"
            >
              {/* LEFT COLUMN: TITLE, PRESENTERS, AND HIGHLIGHTS */}
              <div className="lg:col-span-7 flex flex-col justify-center text-left order-2 lg:order-1 overflow-hidden w-full">
                {/* Glowing Shimmer Badge */}
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-[#00F0FF] text-[10px] sm:text-xs lg:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-4 shadow-[0_0_20px_rgba(0,240,255,0.15)] relative overflow-hidden group w-fit">
                  <motion.div 
                    animate={{ x: ["-100%", "200%"] }} 
                    transition={{ repeat: Infinity, duration: 2.2, ease: "linear", delay: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00F0FF]/25 to-transparent skew-x-12" 
                  />
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 animate-pulse shrink-0" />
                  <span className="relative z-10">SLT 1212 AI Contact Center • Phase 2</span>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
                </div>

                {/* Main Heading with Glowing Effect & Background Rings */}
                <div className="relative mb-2 sm:mb-4">
                  <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.08] relative z-10">
                    <span className="text-slate-400 text-xs sm:text-base lg:text-xl font-bold tracking-normal block mb-1">
                      Progress Review Presentation
                    </span>
                    SLT{" "}
                    <span className="relative inline-block">
                      <motion.span 
                        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur-[30px] sm:blur-[50px] mix-blend-screen"
                      />
                      <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-[#00F0FF] to-blue-400 drop-shadow-[0_0_25px_rgba(0,240,255,0.6)]">
                        Smart PEARL
                      </span>
                    </span>
                  </h1>

                  {/* Animated HUD Data Line */}
                  <motion.div 
                    initial={{ scaleX: 0, opacity: 0 }} 
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "circOut", delay: 0.3 }}
                    className="h-[2px] w-48 sm:w-72 lg:w-96 bg-gradient-to-r from-[#00F0FF] via-blue-500 to-transparent mt-2 sm:mt-3 origin-left relative flex items-center"
                  >
                    <div className="absolute right-0 w-6 h-[2px] bg-white animate-pulse shadow-[0_0_10px_#fff]" />
                    <span className="absolute left-0 -bottom-4 sm:-bottom-5 text-[9px] sm:text-xs text-cyan-400 font-mono tracking-widest uppercase truncate max-w-full">
                      AI Copilot • Fast Directory Search • 3 Languages Supported
                    </span>
                  </motion.div>
                </div>

                {/* Subtitle / Description */}
                <p className="text-xs sm:text-base lg:text-lg xl:text-xl text-slate-200 leading-relaxed my-2 sm:my-4 font-normal">
                  A smart AI assistant helping SLT 1212 contact center agents quickly find contacts, answer customer inquiries, and resolve complaints without long customer hold times.
                </p>

                {/* Presenter / Team Cards */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 my-2 sm:my-4 w-full">
                  <div className={`p-2.5 sm:p-4 rounded-xl border text-left backdrop-blur-md ${
                    isDark ? 'bg-[#0B1221]/80 border-white/10 hover:border-cyan-400/40' : 'bg-white/80 border-slate-200 shadow-sm'
                  }`}>
                    <div className="flex items-center gap-1.5 text-cyan-400 mb-1">
                      <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider truncate">Project Lead</span>
                    </div>
                    <div className="text-xs sm:text-base lg:text-lg font-bold text-white truncate">Gehan & Dev Squad</div>
                    <div className="text-[10px] sm:text-xs lg:text-sm text-slate-400 truncate">Core AI Team</div>
                  </div>

                  <div className={`p-2.5 sm:p-4 rounded-xl border text-left backdrop-blur-md ${
                    isDark ? 'bg-[#0B1221]/80 border-white/10 hover:border-blue-400/40' : 'bg-white/80 border-slate-200 shadow-sm'
                  }`}>
                    <div className="flex items-center gap-1.5 text-blue-400 mb-1">
                      <Headphones className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider truncate">Team</span>
                    </div>
                    <div className="text-xs sm:text-base lg:text-lg font-bold text-white truncate">Contact Center Colombo</div>
                    <div className="text-[10px] sm:text-xs lg:text-sm text-slate-400 truncate">1212 Operations Team</div>
                  </div>

                  <div className={`p-2.5 sm:p-4 rounded-xl border text-left backdrop-blur-md ${
                    isDark ? 'bg-[#0B1221]/80 border-white/10 hover:border-emerald-400/40' : 'bg-white/80 border-slate-200 shadow-sm'
                  }`}>
                    <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider truncate">Review Date</span>
                    </div>
                    <div className="text-xs sm:text-base lg:text-lg font-bold text-white truncate">29/10/2026</div>
                    <div className="text-[10px] sm:text-xs lg:text-sm text-slate-400 truncate">Phase 2 • 50% Developed</div>
                  </div>
                </div>

                {/* System Capabilities Pills */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-slate-200">
                    <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Fast Search (&lt;0.5s)</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-slate-200">
                    <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>3 Languages Supported</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-slate-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Live Call Quality Check</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-slate-200">
                    <Server className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>1-Click Trouble Ticket</span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: 3D GLOWING AI CORE & ROBOT WITH ORBITAL ANIMATIONS */}
              <div className="lg:col-span-5 flex justify-center items-center relative h-full min-h-[220px] sm:min-h-[300px] md:min-h-[380px] lg:min-h-[460px] xl:min-h-[540px] order-1 lg:order-2 overflow-hidden">
                <motion.div 
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  {/* Ambient Core Glow */}
                  <motion.div 
                    animate={{ scale: [1, 1.25, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-tr from-[#00F0FF]/35 via-blue-600/25 to-purple-600/35 rounded-full blur-[50px] sm:blur-[80px]"
                  />

                  {/* Rotating Orbital Rings */}
                  <div className="absolute inset-2 sm:inset-4 md:inset-6 rounded-full border border-cyan-400/50 border-dashed animate-[spin_20s_linear_infinite]" />
                  <div className="absolute inset-5 sm:inset-9 md:inset-12 rounded-full border-2 border-blue-400/40 border-dotted animate-[spin_15s_linear_infinite_reverse]" />
                  <div 
                    className="absolute inset-8 sm:inset-14 md:inset-18 rounded-full border border-purple-500/30 animate-[spin_25s_linear_infinite]" 
                    style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} 
                  />

                  {/* Full Robot Container with Bobbing Motion */}
                  <motion.div 
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full max-w-[180px] sm:max-w-[260px] md:max-w-[340px] lg:max-w-[420px] xl:max-w-[480px] aspect-square flex flex-col items-center justify-center z-10 drop-shadow-[0_0_40px_rgba(0,240,255,0.45)]"
                  >
                    {/* Rotating Orbiting Icons */}
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 z-0 pointer-events-none"
                    >
                      <motion.div 
                        animate={{ rotate: -360 }} 
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }} 
                        className="absolute top-[5%] left-[50%] -translate-x-1/2 -translate-y-1/2 p-1.5 sm:p-2.5 rounded-full bg-black/60 border border-cyan-400/50 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.7)] flex items-center justify-center"
                      >
                        <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
                      </motion.div>
                      <motion.div 
                        animate={{ rotate: -360 }} 
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }} 
                        className="absolute top-[50%] right-[5%] translate-x-1/2 -translate-y-1/2 p-1.5 sm:p-2.5 rounded-full bg-black/60 border border-blue-500/50 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.7)] flex items-center justify-center"
                      >
                        <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                      </motion.div>
                      <motion.div 
                        animate={{ rotate: -360 }} 
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }} 
                        className="absolute bottom-[5%] left-[50%] -translate-x-1/2 translate-y-1/2 p-1.5 sm:p-2.5 rounded-full bg-black/60 border border-purple-500/50 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.7)] flex items-center justify-center"
                      >
                        <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                      </motion.div>
                      <motion.div 
                        animate={{ rotate: -360 }} 
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }} 
                        className="absolute top-[50%] left-[5%] -translate-x-1/2 -translate-y-1/2 p-1.5 sm:p-2.5 rounded-full bg-black/60 border border-rose-500/50 backdrop-blur-md shadow-[0_0_15px_rgba(244,63,94,0.7)] flex items-center justify-center"
                      >
                        <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400" />
                      </motion.div>
                    </motion.div>

                    {/* Robot Image */}
                    <img 
                      src="/robot.png" 
                      alt="Smart PEARL Robot" 
                      className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]" 
                    />
                  </motion.div>
                  
                  {/* Floating Particles Around Core */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        y: [0, -40 - (i * 8)], 
                        x: [(i % 2 === 0 ? 1 : -1) * (10 + i * 8), (i % 2 === 0 ? -1 : 1) * (20 + i * 6)],
                        opacity: [0, 1, 0],
                        scale: [0, 1.25, 0]
                      }}
                      transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.6 }}
                      className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,240,255,1)] pointer-events-none"
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* SLIDE 2: PROJECT OVERVIEW (EXPANDED PROJECTOR CARD-WISE SWITCHER) */}
          {currentSlide === 2 && (
            <motion.div
              key="slide-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full h-full max-h-full flex flex-col justify-between overflow-hidden py-0.5"
            >
              {/* Header & Section Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shrink-0 mb-2">
                <div>
                  <div className="text-xs sm:text-sm lg:text-base font-bold uppercase tracking-wider text-cyan-400">
                    Slide 02 • Executive Summary & Scope
                  </div>
                  <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight">
                    Project Overview & Architecture
                  </h2>
                </div>

                {/* In-Slide Section Tabs */}
                <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/5 border border-white/10 shrink-0 self-start sm:self-auto overflow-x-auto scrollbar-none">
                  <button
                    onClick={() => setSlide2Tab('problem')}
                    className={`px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm lg:text-base font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      slide2Tab === 'problem'
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
                    <span>01. The Problem</span>
                  </button>
                  <button
                    onClick={() => setSlide2Tab('solution')}
                    className={`px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm lg:text-base font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      slide2Tab === 'solution'
                        ? 'bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Zap className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
                    <span>02. The Solution</span>
                  </button>
                </div>
              </div>

              {/* CARD 1: THE PROBLEM */}
              {slide2Tab === 'problem' && (
                <motion.div
                  key="tab-problem"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className={`flex-1 min-h-0 flex flex-col justify-between p-3 sm:p-5 lg:p-6 rounded-2xl border backdrop-blur-2xl relative overflow-hidden ${
                    isDark ? 'bg-rose-950/20 border-rose-500/30' : 'bg-rose-50 border-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between shrink-0 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 sm:p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
                        <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] sm:text-xs font-bold text-rose-400 uppercase tracking-widest">Pain Point Analysis</span>
                        <h3 className="text-sm sm:text-lg lg:text-xl font-black text-white">1212 Contact Center Bottlenecks (Knowledge Hub Scope)</h3>
                      </div>
                    </div>
                    <button
                      onClick={() => setSlide2Tab('solution')}
                      className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs sm:text-sm font-bold hover:bg-cyan-500/30 transition-all cursor-pointer shrink-0"
                    >
                      <span>View Solution</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5 flex-1 min-h-0 overflow-y-auto pr-1">
                    <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center hover:border-rose-500/40 transition-all shadow-md">
                      <div className="text-rose-400 font-black text-sm sm:text-base lg:text-lg mb-1 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shrink-0" />
                        File-Based Knowledge Hub (Primary Bottleneck)
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                        Knowledge Hub is currently stored as static, file-based multi-page PDFs and circulars. AI cannot read raw PDFs on the fly during active 1212 calls; each document must be verified item-by-item and structured into a queryable database without file overhead.
                      </p>
                    </div>

                    <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center hover:border-rose-500/40 transition-all shadow-md">
                      <div className="text-rose-400 font-black text-sm sm:text-base lg:text-lg mb-1 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shrink-0" />
                        Singlish & Sri Lankan Accent Disconnect
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                        Customers and agents speak in mixed Singlish or Sri Lankan-accented English with localized phrasing. Standard speech engines fail on local accents, requiring specialized phonetic rules to prevent conversational misinterpretation.
                      </p>
                    </div>

                    <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center hover:border-rose-500/40 transition-all shadow-md">
                      <div className="text-rose-400 font-black text-sm sm:text-base lg:text-lg mb-1 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shrink-0" />
                        Domain Telecom Vocabulary Gaps
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                        Telecom-specific technical terms (PON, Optical LOS, MDF, Peering, Area-MTCE) are not understood by standard AI models, requiring custom lexicon training so verbal complaints map directly to technical root causes.
                      </p>
                    </div>

                    <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center hover:border-rose-500/40 transition-all shadow-md">
                      <div className="text-rose-400 font-black text-sm sm:text-base lg:text-lg mb-1 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shrink-0" />
                        Iterative Retraining Cycles in Testing
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                        Testing with live call center scenarios reveals unforeseen dialect edge cases and localized phrasing, requiring the AI model to undergo multiple retraining and fine-tuning iterations to stabilize.
                      </p>
                    </div>

                    <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center hover:border-rose-500/40 transition-all shadow-md">
                      <div className="text-rose-400 font-black text-sm sm:text-base lg:text-lg mb-1 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shrink-0" />
                        Voice Bleed & Missed QA Scoring Points
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                        During live automated call evaluation, ambient call center noise and audio nuances sometimes prevent the AI from automatically detecting mandatory SLT greeting, hold-time courtesy, and CSAT closing points.
                      </p>
                    </div>

                    <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center hover:border-rose-500/40 transition-all shadow-md">
                      <div className="text-rose-400 font-black text-sm sm:text-base lg:text-lg mb-1 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shrink-0" />
                        High Concurrency Server Speed (Zero Buffer)
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                        Supporting a large volume of concurrent 1212 contact center agents requires high-throughput, low-latency GPU server infrastructure to ensure the AI responds instantly with zero buffering or lag.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* CARD 2: THE SOLUTION */}
              {slide2Tab === 'solution' && (
                <motion.div
                  key="tab-solution"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className={`flex-1 min-h-0 flex flex-col justify-between p-3 sm:p-5 lg:p-6 rounded-2xl border backdrop-blur-2xl relative overflow-hidden ${
                    isDark ? 'bg-cyan-950/20 border-cyan-500/30' : 'bg-cyan-50 border-cyan-200'
                  }`}
                >
                  <div className="flex items-center justify-between shrink-0 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 sm:p-2 rounded-xl bg-cyan-500/20 text-[#00F0FF] border border-cyan-500/30 shrink-0">
                        <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] sm:text-xs font-bold text-cyan-400 uppercase tracking-widest">Architectural Innovation</span>
                        <h3 className="text-sm sm:text-lg lg:text-xl font-black text-white">The Smart PEARL AI Solution (1212 Scope)</h3>
                      </div>
                    </div>
                    <button
                      onClick={() => setSlide2Tab('problem')}
                      className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs sm:text-sm font-bold hover:bg-rose-500/30 transition-all cursor-pointer shrink-0"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Problem</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5 flex-1 min-h-0 overflow-y-auto pr-1">
                    <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center hover:border-cyan-400/40 transition-all shadow-md">
                      <div className="text-[#00F0FF] font-black text-sm sm:text-base lg:text-lg mb-1 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0" />
                        Itemized Knowledge Hub Vector DB
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                        Pre-extracts and structures static Knowledge Hub PDF circulars item-by-item into a granular vector database, delivering instantaneous search responses without runtime PDF reading.
                      </p>
                    </div>

                    <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center hover:border-cyan-400/40 transition-all shadow-md">
                      <div className="text-[#00F0FF] font-black text-sm sm:text-base lg:text-lg mb-1 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0" />
                        Acoustic-Phonetic Speech Normalizer
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                        Proprietary phonetic rules and dialect mapping tailored to Sri Lankan accents and Singlish phrases, standardizing customer speech into clean technical tokens.
                      </p>
                    </div>

                    <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center hover:border-cyan-400/40 transition-all shadow-md">
                      <div className="text-[#00F0FF] font-black text-sm sm:text-base lg:text-lg mb-1 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0" />
                        Specialized SLT Telecom Lexicon Model
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                        Trained domain dictionary mapping 4,200+ telecom terms and fault abbreviations, ensuring instant recognition of issues like <em>"Router PON light off"</em> as Optical LOS.
                      </p>
                    </div>

                    <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center hover:border-cyan-400/40 transition-all shadow-md">
                      <div className="text-[#00F0FF] font-black text-sm sm:text-base lg:text-lg mb-1 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0" />
                        Iterative Model Fine-Tuning Pipeline
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                        Systematic feedback and retraining loop capturing test-phase dialect and vocabulary anomalies to rapidly fine-tune model weights across agile testing iterations.
                      </p>
                    </div>

                    <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center hover:border-cyan-400/40 transition-all shadow-md">
                      <div className="text-[#00F0FF] font-black text-sm sm:text-base lg:text-lg mb-1 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0" />
                        Multi-Channel Acoustic QA Evaluator
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                        Directional noise-filtering and contextual semantic matching designed to reliably score all official SLT rubrics (greetings, courtesies, 45s hold threshold) despite floor chatter.
                      </p>
                    </div>

                    <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center hover:border-cyan-400/40 transition-all shadow-md">
                      <div className="text-[#00F0FF] font-black text-sm sm:text-base lg:text-lg mb-1 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0" />
                        Low-Latency Scalable Server Infrastructure
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                        High-throughput GPU inference server paired with local in-memory caching to deliver zero-buffering, sub-second copilot assistance across all active 1212 agent desks.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* SLIDE 3: PROGRESS SUMMARY (EXPANDED PROJECTOR STAGE CYCLER) */}
          {currentSlide === 3 && (
            <motion.div
              key="slide-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full h-full max-h-full flex flex-col justify-between overflow-hidden py-0.5"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shrink-0 mb-2">
                <div>
                  <div className="text-xs sm:text-sm lg:text-base font-bold uppercase tracking-wider text-cyan-400">
                    Slide 03 • Project Progress & Status
                  </div>
                  <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight">
                    Progress Summary & Current Status
                  </h2>
                </div>

                {/* Stage Step Buttons */}
                <div className="flex items-center gap-1.5 shrink-0 self-start sm:self-auto">
                  <button
                    onClick={() => {
                      const idx = WORKFLOW_PHASES.findIndex(p => p.id === activeWorkflowTab);
                      const prevIdx = idx > 0 ? idx - 1 : WORKFLOW_PHASES.length - 1;
                      setActiveWorkflowTab(WORKFLOW_PHASES[prevIdx].id as 'planning' | 'designing' | 'development' | 'testing');
                    }}
                    className="p-1.5 sm:p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 transition-all cursor-pointer"
                    title="Previous Stage"
                  >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => {
                      const idx = WORKFLOW_PHASES.findIndex(p => p.id === activeWorkflowTab);
                      const nextIdx = idx < WORKFLOW_PHASES.length - 1 ? idx + 1 : 0;
                      setActiveWorkflowTab(WORKFLOW_PHASES[nextIdx].id as 'planning' | 'designing' | 'development' | 'testing');
                    }}
                    className="p-1.5 sm:p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 transition-all cursor-pointer"
                    title="Next Stage"
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* 4 Large Stage Selector Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 shrink-0 mb-2">
                {WORKFLOW_PHASES.map((phase) => {
                  const Icon = phase.icon;
                  const isSelected = activeWorkflowTab === phase.id;
                  return (
                    <button
                      key={phase.id}
                      onClick={() => setActiveWorkflowTab(phase.id as any)}
                      className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                        isSelected
                          ? 'bg-cyan-500/15 border-cyan-400 shadow-lg shadow-cyan-500/10'
                          : isDark
                          ? 'bg-white/5 border-white/10 hover:border-white/25'
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className={`p-1 sm:p-1.5 rounded-lg ${
                          isSelected ? 'bg-cyan-500 text-slate-900 font-bold' : 'bg-white/10 text-cyan-400'
                        }`}>
                          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        <span className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border ${phase.statusColor}`}>
                          {phase.status}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm lg:text-base font-bold text-white truncate">{phase.name}</div>
                      
                      {/* Progress Bar */}
                      <div className="mt-1.5">
                        <div className="flex justify-between text-[9px] sm:text-[11px] font-bold mb-0.5">
                          <span className="text-slate-400">Done</span>
                          <span className="text-cyan-400">{phase.percentage}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-700"
                            style={{ width: `${phase.percentage}%` }}
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Stage Focused Showcase */}
              {(() => {
                const currentPhase = WORKFLOW_PHASES.find(p => p.id === activeWorkflowTab)!;
                return (
                  <div className={`flex-1 min-h-0 flex flex-col justify-between p-3 sm:p-4 lg:p-6 rounded-2xl border backdrop-blur-2xl overflow-hidden ${
                    isDark ? 'bg-[#0B1221]/90 border-white/10' : 'bg-white border-slate-200 shadow-md'
                  }`}>
                    <div className="flex items-center justify-between gap-3 shrink-0 pb-2 border-b border-white/10">
                      <div>
                        <span className="text-[10px] sm:text-xs font-bold text-cyan-400 uppercase tracking-widest">Stage Inspection</span>
                        <h3 className="text-sm sm:text-xl lg:text-2xl font-black text-white">{currentPhase.name}</h3>
                      </div>
                      <span className={`text-xs sm:text-sm font-bold px-3 py-0.5 rounded-full border ${currentPhase.statusColor}`}>
                        {currentPhase.status} ({currentPhase.percentage}%)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 items-start flex-1 min-h-0 pt-2">
                      {/* Left: Deliverables with Large Readable Text */}
                      <div className="lg:col-span-7 space-y-1.5 sm:space-y-2 flex-1 min-h-0">
                        <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 mb-1">
                          <ListChecks className="w-4 h-4 text-cyan-400" />
                          Key Tasks & Completed Work
                        </h4>
                        {currentPhase.deliverables.map((item, i) => (
                          <div
                            key={i}
                            className={`p-2 sm:p-2.5 rounded-xl border flex items-center justify-between gap-2.5 transition-all ${
                              item.completed
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-200'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 truncate">
                              {item.completed ? (
                                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
                              ) : (
                                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
                              )}
                              <span className="text-xs sm:text-sm lg:text-base font-bold truncate">{item.name}</span>
                            </div>
                            <span className="text-[10px] sm:text-xs text-slate-400 font-mono font-bold shrink-0">{item.date}</span>
                          </div>
                        ))}
                      </div>

                      {/* Right: Notes & Big Stats */}
                      <div className="lg:col-span-5 flex flex-col justify-between gap-2.5 h-full">
                        <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
                          <span className="text-[10px] sm:text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-1">Stage Summary</span>
                          <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed font-normal">{currentPhase.notes}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                            <div className="text-lg sm:text-2xl lg:text-3xl font-black text-cyan-400">18</div>
                            <div className="text-[8px] sm:text-[10px] text-slate-400 uppercase font-bold mt-0.5">Features Built</div>
                          </div>
                          <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                            <div className="text-lg sm:text-2xl lg:text-3xl font-black text-emerald-400">3</div>
                            <div className="text-[8px] sm:text-[10px] text-slate-400 uppercase font-bold mt-0.5">Languages Supported</div>
                          </div>
                          <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                            <div className="text-lg sm:text-2xl lg:text-3xl font-black text-blue-400">28.5k+</div>
                            <div className="text-[8px] sm:text-[10px] text-slate-400 uppercase font-bold mt-0.5">Directory Records</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* SLIDE 4: KEY ACHIEVEMENTS (EXPANDED PROJECTOR SPOTLIGHT SHOWCASE) */}
          {currentSlide === 4 && (
            <motion.div
              key="slide-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full h-full max-h-full flex flex-col justify-between overflow-hidden py-0.5"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shrink-0 mb-2">
                <div>
                  <div className="text-xs sm:text-sm lg:text-base font-bold uppercase tracking-wider text-cyan-400">
                    Slide 04 • Key Features Built So Far
                  </div>
                  <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight">
                    Key Features & Working Modules
                  </h2>
                </div>

                {/* Card Step Buttons */}
                <div className="flex items-center gap-1.5 shrink-0 self-start sm:self-auto">
                  <button
                    onClick={() => setSelectedAchievement(prev => (prev > 1 ? prev - 1 : ACHIEVEMENTS.length))}
                    className="p-1.5 sm:p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 cursor-pointer"
                    title="Previous Achievement"
                  >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <span className="text-xs sm:text-sm font-mono font-bold text-cyan-400 px-1.5">
                    Card {selectedAchievement}/{ACHIEVEMENTS.length}
                  </span>
                  <button
                    onClick={() => setSelectedAchievement(prev => (prev < ACHIEVEMENTS.length ? prev + 1 : 1))}
                    className="p-1.5 sm:p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 cursor-pointer"
                    title="Next Achievement"
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* 4 Tab Switchers */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 shrink-0 mb-2">
                {ACHIEVEMENTS.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedAchievement === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedAchievement(item.id)}
                      className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-400 text-[#00F0FF] shadow-lg shadow-cyan-500/10'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="text-xs font-bold text-cyan-400">{item.badge}</span>
                      </div>
                      <div className="text-xs sm:text-sm lg:text-base font-bold text-white truncate">{item.title}</div>
                    </button>
                  );
                })}
              </div>

              {/* Massive Projector Spotlight Card */}
              {(() => {
                const active = ACHIEVEMENTS.find(a => a.id === selectedAchievement) || ACHIEVEMENTS[0];
                const Icon = active.icon;
                return (
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className={`flex-1 min-h-0 flex flex-col justify-between p-4 sm:p-6 lg:p-7 rounded-2xl border backdrop-blur-2xl overflow-hidden ${
                      isDark ? 'bg-[#0B1221]/90 border-white/10' : 'bg-white border-slate-200 shadow-xl'
                    }`}
                  >
                    {/* Top Header */}
                    <div className="flex items-center justify-between gap-3 shrink-0 pb-3 border-b border-white/10">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className={`p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r ${active.color} text-white shadow-xl shrink-0`}>
                          <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                        <div>
                          <div className="text-[10px] sm:text-xs text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-2">
                            <span>{active.category}</span>
                            <span className="w-1 h-1 rounded-full bg-cyan-400" />
                            <span>{active.scope}</span>
                          </div>
                          <h3 className="text-base sm:text-xl lg:text-2xl font-black text-white mt-0.5 leading-tight">{active.title}</h3>
                        </div>
                      </div>

                      {/* Module Specification Badge */}
                      <div className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-center shrink-0">
                        <div className="text-[9px] sm:text-[10px] uppercase font-bold text-cyan-400 tracking-wider">Feature Type</div>
                        <div className="text-sm sm:text-base lg:text-lg font-black text-white">{active.moduleType}</div>
                      </div>
                    </div>

                    {/* Description Paragraph */}
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed font-normal">
                        {active.desc}
                      </p>
                    </div>

                    {/* 4 Capabilities (2x2 Grid) */}
                    <div>
                      <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                        Key Capabilities Built
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                        {active.highlights.map((h, i) => (
                          <div key={i} className="p-3 sm:p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm lg:text-base text-slate-200 flex items-start gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                            <span className="font-medium leading-snug">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3 Architecture Specification Boxes */}
                    <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-1">
                      {active.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                          <div className="text-xl sm:text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                            {spec.value}
                          </div>
                          <div className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider mt-1">
                            {spec.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })()}
            </motion.div>
          )}

          {/* SLIDE 5: CHALLENGES & RISK ANALYSIS (EXPANDED PROJECTOR SPOTLIGHT SHOWCASE) */}
          {currentSlide === 5 && (
            <motion.div
              key="slide-5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full h-full max-h-full flex flex-col justify-between overflow-hidden py-0.5"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shrink-0 mb-2">
                <div>
                  <div className="text-xs sm:text-sm lg:text-base font-bold uppercase tracking-wider text-rose-400">
                    Slide 05 • Current Challenges & Solutions
                  </div>
                  <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight">
                    Current Challenges & How We Solve Them
                  </h2>
                </div>

                {/* Risk Card Step Buttons */}
                <div className="flex items-center gap-1.5 shrink-0 self-start sm:self-auto">
                  <button
                    onClick={() => setActiveRiskIdx(prev => (prev > 0 ? prev - 1 : RISKS.length - 1))}
                    className="p-1.5 sm:p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 cursor-pointer"
                    title="Previous Risk"
                  >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <span className="text-xs sm:text-sm font-mono font-bold text-rose-400 px-1.5">
                    Risk {activeRiskIdx + 1}/{RISKS.length}
                  </span>
                  <button
                    onClick={() => setActiveRiskIdx(prev => (prev < RISKS.length - 1 ? prev + 1 : 0))}
                    className="p-1.5 sm:p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 cursor-pointer"
                    title="Next Risk"
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* 5 Risk Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 shrink-0 mb-2">
                {RISKS.map((risk, idx) => {
                  const Icon = risk.icon;
                  const isSelected = activeRiskIdx === idx;
                  return (
                    <button
                      key={risk.id}
                      onClick={() => setActiveRiskIdx(idx)}
                      className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-rose-500/20 border-rose-400 text-rose-300 shadow-lg shadow-rose-500/10'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Icon className="w-4 h-4 text-rose-400 shrink-0" />
                        <span className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border ${risk.severityClass}`}>
                          {risk.severity}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm lg:text-base font-bold text-white truncate">{risk.title}</div>
                    </button>
                  );
                })}
              </div>

              {/* Massive Projector Spotlight Card */}
              {(() => {
                const active = activeRisk;
                const Icon = active.icon;
                return (
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className={`flex-1 min-h-0 flex flex-col justify-between p-4 sm:p-6 lg:p-7 rounded-2xl border backdrop-blur-2xl overflow-hidden ${
                      isDark ? 'bg-[#0B1221]/90 border-white/10' : 'bg-white border-slate-200 shadow-xl'
                    }`}
                  >
                    {/* Top Header */}
                    <div className="flex items-center justify-between gap-3 shrink-0 pb-3 border-b border-white/10">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className={`p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r ${active.color} text-white shadow-xl shrink-0`}>
                          <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                        <div>
                          <div className="text-[10px] sm:text-xs text-rose-400 font-bold uppercase tracking-widest flex items-center gap-2">
                            <span>{active.category}</span>
                            <span className="w-1 h-1 rounded-full bg-rose-400" />
                            <span>{active.scope}</span>
                          </div>
                          <h3 className="text-base sm:text-xl lg:text-2xl font-black text-white mt-0.5 leading-tight">{active.title}</h3>
                        </div>
                      </div>

                      {/* Mitigation Strategy Badge */}
                      <div className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-rose-500/15 text-rose-300 border border-rose-500/30 text-center shrink-0">
                        <div className="text-[9px] sm:text-[10px] uppercase font-bold text-rose-400 tracking-wider">Our Solution</div>
                        <div className="text-sm sm:text-base lg:text-lg font-black text-white">{active.moduleType}</div>
                      </div>
                    </div>

                    {/* Description Paragraph */}
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed font-normal">
                        {active.desc}
                      </p>
                    </div>

                    {/* 4 Safeguards (2x2 Grid) */}
                    <div>
                      <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-rose-400" />
                        Key Actions We Are Taking
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                        {active.highlights.map((h, i) => (
                          <div key={i} className="p-3 sm:p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm lg:text-base text-slate-200 flex items-start gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-rose-400 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                            <span className="font-medium leading-snug">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3 Architecture Safeguard Boxes */}
                    <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-1">
                      {active.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                          <div className="text-xl sm:text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">
                            {spec.value}
                          </div>
                          <div className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider mt-1">
                            {spec.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })()}
            </motion.div>
          )}

          {/* SLIDE 6: NEXT STEPS & ROADMAP (EXPANDED PROJECTOR PHASE CYCLER) */}
          {currentSlide === 6 && (
            <motion.div
              key="slide-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full h-full max-h-full flex flex-col justify-between overflow-hidden py-0.5"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shrink-0 mb-2">
                <div>
                  <div className="text-xs sm:text-sm lg:text-base font-bold uppercase tracking-wider text-cyan-400">
                    Slide 06 • Next Steps & Implementation Plan
                  </div>
                  <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight">
                    Next Steps & Project Roadmap
                  </h2>
                </div>

                {/* Phase Step Buttons */}
                <div className="flex items-center gap-1.5 shrink-0 self-start sm:self-auto">
                  <button
                    onClick={() => setActiveRoadmapIdx(prev => (prev > 0 ? prev - 1 : ROADMAP_STEPS.length - 1))}
                    className="p-1.5 sm:p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 cursor-pointer"
                    title="Previous Phase"
                  >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <span className="text-xs sm:text-sm font-mono font-bold text-cyan-400 px-1.5">
                    Phase {activeRoadmapIdx + 1}/{ROADMAP_STEPS.length}
                  </span>
                  <button
                    onClick={() => setActiveRoadmapIdx(prev => (prev < ROADMAP_STEPS.length - 1 ? prev + 1 : 0))}
                    className="p-1.5 sm:p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 cursor-pointer"
                    title="Next Phase"
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* 3 Phase Selector Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 shrink-0 mb-2">
                {ROADMAP_STEPS.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveRoadmapIdx(idx)}
                    className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      activeRoadmapIdx === idx
                        ? 'bg-cyan-500/20 border-cyan-400 text-[#00F0FF] shadow-lg shadow-cyan-500/10'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] sm:text-xs font-mono font-bold text-cyan-400">Phase 0{idx + 1}</span>
                      <span className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border ${step.statusBadge}`}>
                        {step.status}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base font-bold text-white truncate">{step.phase}</div>
                  </button>
                ))}
              </div>

              {/* Massive Active Phase Spotlight Card */}
              {(() => {
                const step = activeRoadmap;
                return (
                  <motion.div
                    key={step.phase}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className={`flex-1 min-h-0 flex flex-col justify-between p-3.5 sm:p-5 lg:p-6 rounded-2xl border backdrop-blur-2xl overflow-hidden ${
                      isDark ? 'bg-[#0B1221]/90 border-white/10' : 'bg-white border-slate-200 shadow-xl'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 shrink-0 pb-2.5 border-b border-white/10">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-xs">
                            0{activeRoadmapIdx + 1}
                          </span>
                          <span className="text-xs sm:text-sm lg:text-base font-bold text-cyan-400 font-mono flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {step.timeline}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-xl lg:text-2xl font-black text-white leading-tight">{step.phase}</h3>
                        <div className="text-xs sm:text-sm font-bold text-slate-300 mt-0.5 bg-white/5 px-2.5 py-0.5 rounded-lg border border-white/10 inline-block">
                          Core Focus: {step.focus}
                        </div>
                      </div>

                      {/* Target Metric Banner */}
                      <div className="px-3.5 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-center shrink-0">
                        <div className="text-[8px] sm:text-[10px] uppercase font-bold text-emerald-400 tracking-widest">Target Goal</div>
                        <div className="text-base sm:text-xl lg:text-2xl font-black">{step.targetMetric}</div>
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2 flex-1 min-h-0 my-1.5">
                      <span className="text-[10px] sm:text-xs font-bold text-cyan-400 uppercase tracking-widest block">Key Tasks & Goals</span>
                      {step.deliverables.map((d, dIdx) => (
                        <div key={dIdx} className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm lg:text-base text-slate-200 font-medium leading-relaxed">{d}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })()}
            </motion.div>
          )}

          {/* SLIDE 7: CONCLUSION & SUMMARY (HIGHLIGHTS FROM ALL SLIDES) */}
          {currentSlide === 7 && (
            <motion.div
              key="slide-7"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full h-full max-h-full flex flex-col justify-between overflow-hidden py-0.5"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0 mb-1.5 sm:mb-2">
                <div>
                  <div className="text-xs sm:text-sm lg:text-base font-bold uppercase tracking-wider text-cyan-400">
                    Slide 07 • Executive Review & Summary
                  </div>
                  <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight">
                    Conclusion & Key Presentation Highlights
                  </h2>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <div className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Project Takeaways (Slides 01 – 06)</span>
                  </div>
                </div>
              </div>

              {/* 6-Card Summary Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5 lg:gap-3 flex-1 min-h-0 mb-1.5 sm:mb-2">
                {CONCLUSION_POINTS.map((pt, idx) => {
                  const Icon = pt.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.04 }}
                      className={`p-2.5 sm:p-3.5 lg:p-4 rounded-xl sm:rounded-2xl border flex flex-col justify-between transition-all duration-300 shadow-md ${pt.borderHover} ${
                        isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-lg'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                          <span className={`px-2 py-0.5 rounded-md border text-[10px] sm:text-xs font-bold ${pt.badgeColor}`}>
                            {pt.slideNum} • {pt.label}
                          </span>
                          <div className={`p-1.5 rounded-lg bg-white/5 border border-white/10 ${pt.iconColor}`}>
                            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </div>
                        </div>

                        <h3 className="text-xs sm:text-sm lg:text-base font-black text-white mb-1">
                          {pt.title}
                        </h3>

                        <p className="text-[11px] sm:text-xs lg:text-sm text-slate-300 leading-relaxed font-normal">
                          {pt.desc}
                        </p>
                      </div>

                      <div className="pt-1.5 sm:pt-2 border-t border-white/10 mt-1.5 sm:mt-2 flex items-center justify-between text-[10px] sm:text-xs text-slate-400">
                        <span className="font-semibold text-slate-300">Target Area</span>
                        <span className="font-mono text-cyan-400">1212 Contact Center</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Executive Summary Takeaway Footer */}
              <div className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0 ${
                isDark ? 'bg-[#0B1221]/90 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="p-1.5 sm:p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shrink-0">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                      <span>Executive Project Takeaway</span>
                      <span className="hidden sm:inline text-xs text-cyan-400 font-normal">• Sri Lanka Telecom 1212 Center</span>
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-300 line-clamp-1">
                      Smart PEARL replaces manual PDF searches with an intelligent, trilingual copilot tailored for Sri Lanka Telecom 1212 operations.
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <span className="px-2.5 py-1 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-[10px] sm:text-xs font-bold text-cyan-300">
                    1212 Center Exclusive
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-[10px] sm:text-xs font-bold text-emerald-300">
                    50% Dev • Testing Next
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* SLIDE 8: THANK YOU & ANY QUESTIONS? */}
          {currentSlide === 8 && (
            <motion.div
              key="slide-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full max-h-full flex flex-col items-center justify-center overflow-hidden py-4"
            >
              <div className={`w-full max-w-4xl p-10 sm:p-16 lg:p-20 rounded-3xl border flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl backdrop-blur-2xl transition-all ${
                isDark
                  ? 'bg-gradient-to-b from-[#0B1221]/90 via-[#070D1A]/95 to-[#030712]/95 border-cyan-500/30'
                  : 'bg-white border-slate-200 shadow-2xl'
              }`}>
                {/* Ambient Glows */}
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#005696]/20 rounded-full blur-[120px] pointer-events-none" />

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="p-4 sm:p-5 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 mb-6 sm:mb-8 shadow-lg shadow-cyan-500/10"
                >
                  <Sparkles className="w-10 h-10 sm:w-14 sm:h-14 text-cyan-400" />
                </motion.div>

                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className={`text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-4 sm:mb-6 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Thank You!
                </motion.h1>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="flex items-center gap-3 sm:gap-5"
                >
                  <div className="h-0.5 w-10 sm:w-20 bg-gradient-to-r from-transparent to-cyan-400" />
                  <span className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-cyan-400 tracking-wide uppercase">
                    Any Questions?
                  </span>
                  <div className="h-0.5 w-10 sm:w-20 bg-gradient-to-l from-transparent to-cyan-400" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER NAVIGATION CONTROLS */}
      <footer className={`relative z-50 shrink-0 flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 border-t backdrop-blur-xl ${
        isDark ? 'bg-[#030712]/80 border-white/10' : 'bg-white/80 border-slate-200'
      }`}>
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 1}
          className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden">Prev</span>
          <span className="hidden md:inline text-[10px] text-slate-500 font-mono">[←]</span>
        </button>

        {/* Slide Dots / Indicators */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {SLIDES.map((slide) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(slide.id)}
              title={`${slide.tag}: ${slide.title}`}
              className={`h-1.5 sm:h-2 transition-all rounded-full cursor-pointer ${
                currentSlide === slide.id
                  ? 'w-5 sm:w-8 bg-cyan-400 shadow-md shadow-cyan-400/50'
                  : 'w-1.5 sm:w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides}
          className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#005696] to-cyan-500 text-xs font-bold text-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          <span className="hidden sm:inline">Next Slide</span>
          <span className="sm:hidden">Next</span>
          <span className="hidden md:inline text-[10px] text-cyan-200 font-mono">[→]</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
}
