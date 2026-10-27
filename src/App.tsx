import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Clock, Zap, Sparkles, CheckCircle2,
  AlertTriangle, Search, Target, Layers, ShieldCheck, Building2,
  Cpu, Maximize, Minimize, RotateCcw, Headphones, Mic,
  Users, Play, Pause,
  Calendar, Award, Server, ArrowRight, ArrowLeft,
  HelpCircle, Send, Sun, Moon,
  ListChecks, Globe, ChevronDown, Database,
  Brain, Shield, MessageSquare
} from 'lucide-react';

// ==========================================
// PRESENTATION DATA DEFINITIONS
// ==========================================

export const SLIDES = [
  { id: 1, title: "Title & Overview", tag: "Slide 01", desc: "Project Identity & Leadership" },
  { id: 2, title: "Project Overview", tag: "Slide 02", desc: "Executive Summary & Stakeholders" },
  { id: 3, title: "Progress Summary", tag: "Slide 03", desc: "Interactive Metrics & Lifecycle" },
  { id: 4, title: "Key Achievements", tag: "Slide 04", desc: "Milestones & Delivered Capabilities" },
  { id: 5, title: "Challenges & Risks", tag: "Slide 05", desc: "Risk Matrix & Mitigations" },
  { id: 6, title: "Next Steps & Roadmap", tag: "Slide 06", desc: "Phased Execution Timeline" },
  { id: 7, title: "Conclusion & Q&A", tag: "Slide 07", desc: "Summary, Live Q&A & Contacts" }
];

// STAKEHOLDERS
const STAKEHOLDERS = [
  {
    role: "Project Sponsor & Executive",
    name: "SLT-Mobitel Corporate Leadership",
    department: "Chief Executive & Digital Transformation Office",
    badge: "Primary Sponsor",
    icon: Building2,
    color: "from-blue-600 to-cyan-600",
    contributions: ["Strategic alignment with national digital agenda", "Budgetary allocation & infrastructure support", "Enterprise KPI definition (AHT reduction > 40%)"]
  },
  {
    role: "Primary Operational Beneficiaries",
    name: "SLT Contact Center Operations",
    department: "1212 General & 1717 Broadband Helpdesk Desks",
    badge: "End Users (600+ Agents)",
    icon: Headphones,
    color: "from-cyan-500 to-teal-500",
    contributions: ["Real-world call shadowing & workflow audits", "Standard QA script validation (Sinhala, English, Tamil)", "Daily usability feedback and pilot agent cohort"]
  },
  {
    role: "Field & Network Engineering",
    name: "NOC & Area Maintenance Units",
    department: "MDF Operations, CEN-CSC-TECH & Regional RTOs",
    badge: "Technical Stakeholder",
    icon: Server,
    color: "from-indigo-600 to-blue-500",
    contributions: ["Fault triage decision tree codification", "Direct Trouble Ticket (TT) schema harmonization", "FTTH PON / LOS / Peering diagnostic rules"]
  },
  {
    role: "Development & AI Engineering",
    name: "Smart PEARL Core Dev Team",
    department: "AI Innovation Lab & Full-Stack Systems Team",
    badge: "Implementation Team",
    icon: Cpu,
    color: "from-emerald-500 to-teal-600",
    contributions: ["Sub-second trilingual RAG vector search engine", "Telecom Voice Phonetic Normalizer (Singlish/Tamil)", "Automated SLT QA Evaluator with Gemini AI"]
  }
];

// WORKFLOW PROGRESS PHASES
const WORKFLOW_PHASES = [
  {
    id: "planning",
    name: "1. Planning & Architecture",
    percentage: 100,
    status: "Completed",
    statusColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    icon: Target,
    deliverables: [
      { name: "Comprehensive Project Charter & Scope Baseline", completed: true, date: "Aug 2026" },
      { name: "100+ Hours of Agent Call Shadowing & Audio Auditing", completed: true, date: "Aug 2026" },
      { name: "SLT Contact Center Quality Standards Ingestion (Official Rubrics)", completed: true, date: "Sep 2026" },
      { name: "Security & Data Sovereignty Architecture Blueprint", completed: true, date: "Sep 2026" }
    ],
    notes: "Completed ahead of schedule with 100% stakeholder signoff on the Trilingual Copilot scope."
  },
  {
    id: "designing",
    name: "2. UI/UX & Triage Logic Design",
    percentage: 100,
    status: "Completed",
    statusColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    icon: Layers,
    deliverables: [
      { name: "High-Fidelity Agent Workspace Design System (Figma & Tailwind)", completed: true, date: "Sep 2026" },
      { name: "Trilingual Voice Interaction & Normalizer Flow Diagrams", completed: true, date: "Sep 2026" },
      { name: "Fault Triage Decision Tree (Fiber Voice, PON, LOS, Latency)", completed: true, date: "Oct 2026" },
      { name: "One-Click Trouble Ticket (TT) Card System Specification", completed: true, date: "Oct 2026" }
    ],
    notes: "Design system validated with 25 active 1212 agents for cognitive load minimization."
  },
  {
    id: "development",
    name: "3. Full-Stack Development",
    percentage: 92,
    status: "In Progress",
    statusColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40",
    icon: Cpu,
    deliverables: [
      { name: "Sub-0.5s Trilingual RAG Directory Search Engine", completed: true, date: "Oct 2026" },
      { name: "Telecom Voice Normalizer with Singlish/Tanglish Acoustic Rules", completed: true, date: "Oct 2026" },
      { name: "Automated SLT QA Evaluator (Greeting, Hold-Time, CSAT Ending)", completed: true, date: "Oct 2026" },
      { name: "Deterministic Fault Triage & Instant Trouble Ticket Engine", completed: true, date: "Oct 2026" },
      { name: "Live Clarity CRM / GB Portal Direct API Webhook Connector", completed: false, date: "In Progress (Sprint 8)" }
    ],
    notes: "92% complete. Core Next.js copilot is operational. Finalizing CRM bi-directional sync."
  },
  {
    id: "testing",
    name: "4. Quality Assurance & Validation",
    percentage: 85,
    status: "In Progress",
    statusColor: "bg-blue-500/20 text-blue-400 border-blue-500/40",
    icon: ShieldCheck,
    deliverables: [
      { name: "Automated Unit & Triage Matrix Regression Test Suite", completed: true, date: "Oct 2026" },
      { name: "Acoustic Speech-to-Text Stress-Tests in Ambient Call Center Noise", completed: true, date: "Oct 2026" },
      { name: "Official SLT Quality Criteria Verification Engine Validation", completed: true, date: "Oct 2026" },
      { name: "Field Pilot with 50 Tier-1 Call Center Agents", completed: false, date: "Scheduled Nov 01" }
    ],
    notes: "85% complete. Achieved 99.4% intent triage accuracy across 450 simulated customer calls."
  }
];

// KEY ACHIEVEMENTS
const ACHIEVEMENTS = [
  {
    id: 1,
    title: "Trilingual Telecom Speech Normalizer",
    category: "Speech AI & NLP",
    date: "Completed • Oct 2026",
    metric: "99.4% Phonetic Accuracy",
    desc: "Overcame Sri Lankan English, Singlish, and dialect acoustic variances by engineering a custom acoustic normalizer that converts verbal phrases into standardized telecom keywords.",
    icon: Mic,
    color: "from-cyan-500 to-blue-600",
    highlights: [
      "Custom phonetic rules for Sinhala, Tamil & English",
      "Singlish transliteration engine ('PON light eka off' -> Optical LOS)",
      "Zero latency acoustic token preprocessing"
    ]
  },
  {
    id: 2,
    title: "Sub-Second Intelligent Directory Search",
    category: "Information Retrieval",
    date: "Completed • Oct 2026",
    metric: "< 0.42s Mean Query Latency",
    desc: "Replaced 430+ clunky legacy PDF manuals and dispersed RTO sheets with a unified semantic vector database, enabling instant branch extension lookups with zero hold time.",
    icon: Search,
    color: "from-blue-600 to-indigo-600",
    highlights: [
      "Over 28,500 internal telephone directory records indexed",
      "Instant query resolution in Sinhala, English, and Tamil",
      "Eliminates average 45-second manual PDF scroll time"
    ]
  },
  {
    id: 3,
    title: "Deterministic Fault Triage & Instant TT",
    category: "Operations Automation",
    date: "Completed • Oct 2026",
    metric: "80% TT Drafting Time Saved",
    desc: "Automated complex technical triage across Fiber Voice, PON, LOS red LED, gaming latency, and bill reloads. Generates fully formatted Trouble Tickets ready for MDF / Maintenance dispatch.",
    icon: Zap,
    color: "from-emerald-500 to-teal-600",
    highlights: [
      "Auto-detects MDF vs Area-Maintenance fault boundaries",
      "Includes customer account, symptom code, and resolution steps",
      "One-click formatted copy button for legacy CRM insertion"
    ]
  },
  {
    id: 4,
    title: "Real-Time Official SLT QA Scoring",
    category: "Quality Assurance",
    date: "Completed • Oct 2026",
    metric: "100% QA Audit Coverage",
    desc: "Built-in compliance analyzer that inspects live call transcripts against official SLT Quality Standards (Greeting, Respectful Sir/Madam, 45s Hold Threshold, and IVR C-Sat announcement).",
    icon: Award,
    color: "from-amber-500 to-orange-600",
    highlights: [
      "Live score gauge with real-time feedback",
      "Automatic detection of courtesy statements and apologies",
      "Manager audit dashboard for coaching and trend tracking"
    ]
  }
];

// CHALLENGES & RISKS
const RISKS = [
  {
    id: 1,
    title: "GPU Inference Availability & Peak Concurrency",
    category: "Infrastructure",
    severity: "High",
    severityClass: "bg-rose-500/20 text-rose-400 border-rose-500/40",
    impact: "High",
    probability: "Medium",
    blocker: "Peak storm/monsoon events trigger 1,200+ concurrent inbound calls, risking LLM token rate limits and query latency spikes.",
    mitigation: "Engineered local Tier-1 memory cache for the top 300 frequent directory queries, plus automated tiered fallback to Gemini 2.5 Flash-Lite with stream buffering.",
    status: "Mitigated & Tested",
    icon: Server
  },
  {
    id: 2,
    title: "Data Fragmentation across 14 Regional Telecom Offices",
    category: "Data Integrity",
    severity: "Medium",
    severityClass: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    impact: "Medium",
    probability: "High",
    blocker: "Regional offices (Kandy, Galle, Kurunegala, Jaffna) maintain ad-hoc local extension updates on disconnected spreadsheets.",
    mitigation: "Built an automated ETL synchronization script with semantic deduplication, paired with an Admin Governance portal requiring monthly RTO supervisor re-verification.",
    status: "In Progress (90%)",
    icon: Database
  },
  {
    id: 3,
    title: "Acoustic Noise in Dense Call Center Environments",
    category: "Speech AI",
    severity: "High",
    severityClass: "bg-rose-500/20 text-rose-400 border-rose-500/40",
    impact: "High",
    probability: "Medium",
    blocker: "Background chatter from neighboring agent booths occasionally leaked into microphone STT streams, generating noisy transcript tokens.",
    mitigation: "Implemented dual-channel directional acoustic filtering and trained the Telecom Voice Normalizer with contextual intent weighting to ignore conversational bleed.",
    status: "Resolved",
    icon: Mic
  },
  {
    id: 4,
    title: "Agent Cultural Transition & Legacy System Reliance",
    category: "Change Management",
    severity: "Low",
    severityClass: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    impact: "Medium",
    probability: "Low",
    blocker: "Senior agents accustomed to manual keyword searches over 10+ years may hesitate to rely on AI-prompted suggestions.",
    mitigation: "Crafted a non-intrusive copilot sidebar with zero mandatory clicks, one-click keyboard shortcuts, and gamified QA improvement stats that benefit agents' bonus metrics.",
    status: "Training Active",
    icon: Users
  }
];

// NEXT STEPS & ROADMAP
const ROADMAP_STEPS = [
  {
    phase: "Phase 1: Field Pilot Trial",
    timeline: "Nov 01 - Nov 15, 2026",
    status: "Upcoming (Next Week)",
    statusBadge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    focus: "50-Agent Live Deployment",
    deliverables: [
      "Deploy Smart PEARL Copilot to 50 selected Tier-1 agents across Colombo & Welikada centers",
      "Monitor real-time Average Handling Time (AHT) drop against 4.2-minute baseline",
      "Daily telemetry capture on trilingual phonetic correction accuracy"
    ],
    targetMetric: "Target: 30% AHT Reduction in Week 1"
  },
  {
    phase: "Phase 2: Deep CRM & Billing Integration",
    timeline: "Nov 16 - Dec 10, 2026",
    status: "Scheduled",
    statusBadge: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    focus: "Enterprise Systems Interlock",
    deliverables: [
      "Bi-directional REST API integration with SLT Clarity CRM and GB Portal",
      "Automated Trouble Ticket injection into NOC queues without manual copy-paste",
      "Prepaid & Postpaid payment gateway real-time transaction reconciliation"
    ],
    targetMetric: "Target: 100% Automated Ticket Dispatch"
  },
  {
    phase: "Phase 3: Predictive Outage Correlation",
    timeline: "Dec 11 - Jan 15, 2027",
    status: "Planned",
    statusBadge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
    focus: "Proactive Incident Prevention",
    deliverables: [
      "Clustering algorithm to detect localized fiber breaks when 5+ LOS alarms trigger in one MSAN area",
      "Automatic IVR deflection: notify incoming callers of known area outages before reaching agent",
      "SMS broadcast dispatch to affected FTTH customer groups"
    ],
    targetMetric: "Target: 25% Reduction in Inbound Call Volumes"
  },
  {
    phase: "Phase 4: Island-wide Production Scaling",
    timeline: "Q1 2027 (Jan - Mar)",
    status: "Strategic Target",
    statusBadge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    focus: "National Rollout",
    deliverables: [
      "Full rollout to 1,000+ active contact center agent seats across Sri Lanka",
      "Integration with SLT Self-Care Mobile App and WhatsApp AI assistant",
      "Executive real-time performance dashboard for Senior Management & CTO Office"
    ],
    targetMetric: "Target: Island-wide Enterprise Standard"
  }
];

// FAQS & BOT SIMULATOR
const FAQS = [
  {
    q: "How does Smart PEARL handle mixed Singlish queries like 'PON light eka off wela'?",
    a: "Our proprietary Telecom Voice Normalizer uses custom acoustic phonetics and grammar trees. It recognizes Sinhala-English hybrid vocabulary, matches it to 'Optical Loss of Signal / Fiber Cable Defect', and triggers the exact MDF/Area Maintenance triage SOP."
  },
  {
    q: "How does the sub-second retrieval work without leaking customer data?",
    a: "All directory embeddings and search indices reside inside SLT's secure private cloud infrastructure. Data is encrypted in transit and at rest, and no customer personally identifiable information (PII) is exported to external public model checkpoints."
  },
  {
    q: "What impact does automated QA scoring have on agent evaluation?",
    a: "Traditional QA manually audits only 2-3% of total recorded calls. Smart PEARL audits 100% of calls in real time against official SLT greeting, holding, and courtesy standards, providing constructive feedback and objective scoring for bonuses."
  },
  {
    q: "Can the system create Trouble Tickets without agent intervention?",
    a: "The system dynamically drafts the ticket with account, fault code, symptom, and diagnostic results. The agent reviews the pre-populated card with a single glance and clicks 'Instant Copy & Dispatch', maintaining human oversight with zero typing delay."
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
  const [slide2Tab, setSlide2Tab] = useState<'problem' | 'solution' | 'stakeholders'>('problem');
  const [stakeholderIdx, setStakeholderIdx] = useState<number>(0);
  const [activeWorkflowTab, setActiveWorkflowTab] = useState<'planning' | 'designing' | 'development' | 'testing'>('development');
  const [selectedAchievement, setSelectedAchievement] = useState<number>(1);
  const [activeRiskIdx, setActiveRiskIdx] = useState<number>(0);
  const [activeRoadmapIdx, setActiveRoadmapIdx] = useState<number>(0);
  const [slide7Tab, setSlide7Tab] = useState<'takeaways' | 'faq'>('takeaways');
  const [activeFaqIdx, setActiveFaqIdx] = useState<number>(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [questionInput, setQuestionInput] = useState('');
  const [questionSubmitted, setQuestionSubmitted] = useState(false);
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

  // CALCULATE OVERALL PROGRESS
  const overallProgress = useMemo(() => {
    const total = WORKFLOW_PHASES.reduce((acc, curr) => acc + curr.percentage, 0);
    return Math.round(total / WORKFLOW_PHASES.length);
  }, []);

  // ACTIVE IN-SLIDE CARD REFERENCES FOR PROJECTOR READABILITY
  const activeStakeholder = STAKEHOLDERS[stakeholderIdx] || STAKEHOLDERS[0];
  const activeRisk = RISKS[activeRiskIdx] || RISKS[0];
  const activeRoadmap = ROADMAP_STEPS[activeRoadmapIdx] || ROADMAP_STEPS[0];
  const activeFaq = FAQS[activeFaqIdx] || FAQS[0];

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
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
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
                  <span className="relative z-10">Enterprise AI Contact Center • Phase 2</span>
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
                      Neural Copilot • Sub-Second Retrieval • Trilingual Voice Triage
                    </span>
                  </motion.div>
                </div>

                {/* Subtitle / Description */}
                <p className="text-xs sm:text-base lg:text-lg xl:text-xl text-slate-200 leading-relaxed my-2 sm:my-4 font-normal">
                  Next-generation contact center copilot empowering SLT 1212 & 1717 agents with trilingual speech intelligence, instant directory lookups, automated trouble ticketing, and official SLT QA scoring.
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
                    <div className="text-xs sm:text-base lg:text-lg font-bold text-white truncate">Kudagama & Dev Squad</div>
                    <div className="text-[10px] sm:text-xs lg:text-sm text-slate-400 truncate">Lead AI Architects</div>
                  </div>

                  <div className={`p-2.5 sm:p-4 rounded-xl border text-left backdrop-blur-md ${
                    isDark ? 'bg-[#0B1221]/80 border-white/10 hover:border-blue-400/40' : 'bg-white/80 border-slate-200 shadow-sm'
                  }`}>
                    <div className="flex items-center gap-1.5 text-blue-400 mb-1">
                      <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider truncate">Organization</span>
                    </div>
                    <div className="text-xs sm:text-base lg:text-lg font-bold text-white truncate">Sri Lanka Telecom PLC</div>
                    <div className="text-[10px] sm:text-xs lg:text-sm text-slate-400 truncate">1212 / 1717 Centers</div>
                  </div>

                  <div className={`p-2.5 sm:p-4 rounded-xl border text-left backdrop-blur-md ${
                    isDark ? 'bg-[#0B1221]/80 border-white/10 hover:border-emerald-400/40' : 'bg-white/80 border-slate-200 shadow-sm'
                  }`}>
                    <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider truncate">Review Date</span>
                    </div>
                    <div className="text-xs sm:text-base lg:text-lg font-bold text-white truncate">Q4 2026 • v2.4</div>
                    <div className="text-[10px] sm:text-xs lg:text-sm text-slate-400 truncate">Field Pilot Ready</div>
                  </div>
                </div>

                {/* System Capabilities Pills */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-slate-200">
                    <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Sub-0.5s Retrieval</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-slate-200">
                    <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Trilingual STT</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-slate-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Official SLT QA</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-slate-200">
                    <Server className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>Auto Trouble Ticket</span>
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
                    Project Overview & Key Stakeholders
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
                  <button
                    onClick={() => setSlide2Tab('stakeholders')}
                    className={`px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm lg:text-base font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      slide2Tab === 'stakeholders'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Users className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
                    <span>03. Stakeholders</span>
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
                        <h3 className="text-sm sm:text-lg lg:text-xl font-black text-white">Legacy Contact Center Bottlenecks</h3>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4 flex-1 min-h-0">
                    <div className="p-3 sm:p-4 lg:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center hover:border-rose-500/40 transition-all shadow-md">
                      <div className="text-rose-400 font-black text-sm sm:text-base lg:text-xl mb-1 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shrink-0" />
                        4.2 Min Average Handling Time (AHT)
                      </div>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed font-normal">
                        Call center agents waste up to 45 seconds per call manually hunting through static PDFs, intranet portals, and fragmented spreadsheets while customers wait on hold.
                      </p>
                    </div>

                    <div className="p-3 sm:p-4 lg:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center hover:border-rose-500/40 transition-all shadow-md">
                      <div className="text-rose-400 font-black text-sm sm:text-base lg:text-xl mb-1 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shrink-0" />
                        Singlish & Dialect Acoustic Loss
                      </div>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed font-normal">
                        Sri Lankan accented English and mixed Singlish phrases like <em>"Router eke PON light off wela"</em> are misunderstood by standard speech engines, forcing repeated clarification.
                      </p>
                    </div>

                    <div className="p-3 sm:p-4 lg:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center hover:border-rose-500/40 transition-all shadow-md">
                      <div className="text-rose-400 font-black text-sm sm:text-base lg:text-xl mb-1 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shrink-0" />
                        Manual Trouble Ticket Misclassification
                      </div>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed font-normal">
                        Fiber Voice and broadband speed faults are frequently misdirected between Main Distribution Frame (MDF) and Area Maintenance, causing up to 48-hour resolution delays.
                      </p>
                    </div>

                    <div className="p-3 sm:p-4 lg:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center hover:border-rose-500/40 transition-all shadow-md">
                      <div className="text-rose-400 font-black text-sm sm:text-base lg:text-xl mb-1 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shrink-0" />
                        Only 2% Quality Audit Sampling
                      </div>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed font-normal">
                        Manual QA inspectors sample only 2-3 calls per agent per month, creating huge compliance blindspots on mandatory greetings, 45s hold thresholds, and IVR C-Sat closing.
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
                        <h3 className="text-sm sm:text-lg lg:text-xl font-black text-white">The Smart PEARL AI Solution</h3>
                      </div>
                    </div>
                    <button
                      onClick={() => setSlide2Tab('stakeholders')}
                      className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs sm:text-sm font-bold hover:bg-blue-500/30 transition-all cursor-pointer shrink-0"
                    >
                      <span>View Stakeholders</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4 flex-1 min-h-0">
                    <div className="p-3 sm:p-4 lg:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center hover:border-cyan-400/40 transition-all shadow-md">
                      <div className="text-[#00F0FF] font-black text-sm sm:text-base lg:text-xl mb-1 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0" />
                        Sub-0.5s Semantic Retrieval
                      </div>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed font-normal">
                        Over 28,500+ internal directory records, departments, and regional offices vectorized into high-speed memory for instantaneous zero-hold lookup in Sinhala, English, and Tamil.
                      </p>
                    </div>

                    <div className="p-3 sm:p-4 lg:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center hover:border-cyan-400/40 transition-all shadow-md">
                      <div className="text-[#00F0FF] font-black text-sm sm:text-base lg:text-xl mb-1 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0" />
                        Telecom Voice Phonetic Normalizer
                      </div>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed font-normal">
                        Proprietary phonetic rules instantly map verbal phrases into clean technical terms (e.g., <em>"LOS red light"</em> -&gt; Optical Fiber Cut, dispatch direct to Area-MTCE).
                      </p>
                    </div>

                    <div className="p-3 sm:p-4 lg:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center hover:border-cyan-400/40 transition-all shadow-md">
                      <div className="text-[#00F0FF] font-black text-sm sm:text-base lg:text-xl mb-1 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0" />
                        Deterministic Fault Triage & Instant TT
                      </div>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed font-normal">
                        Automated decision trees guide agents step-by-step through FTTH Voice, PON, and speed triage, auto-generating 1-click formatted Trouble Tickets without manual typing.
                      </p>
                    </div>

                    <div className="p-3 sm:p-4 lg:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center hover:border-cyan-400/40 transition-all shadow-md">
                      <div className="text-[#00F0FF] font-black text-sm sm:text-base lg:text-xl mb-1 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0" />
                        100% Real-Time Official SLT QA Scoring
                      </div>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed font-normal">
                        Continuously grades 100% of calls against official SLT standards (Trilingual Greeting, Sir/Madam courtesy, 45s Hold threshold, and IVR C-Sat announcement) with real-time feedback.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* CARD 3: STAKEHOLDERS (INTERACTIVE SPOTLIGHT) */}
              {slide2Tab === 'stakeholders' && (
                <motion.div
                  key="tab-stakeholders"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className={`flex-1 min-h-0 flex flex-col justify-between p-3 sm:p-5 lg:p-6 rounded-2xl border backdrop-blur-2xl relative overflow-hidden ${
                    isDark ? 'bg-[#0B1221]/90 border-white/10' : 'bg-white border-slate-200'
                  }`}
                >
                  {/* Stakeholder Selector Pills */}
                  <div className="flex items-center justify-between gap-3 shrink-0 pb-2.5 border-b border-white/10">
                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                      {STAKEHOLDERS.map((stk, idx) => (
                        <button
                          key={idx}
                          onClick={() => setStakeholderIdx(idx)}
                          className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm lg:text-base font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                            stakeholderIdx === idx
                              ? 'bg-cyan-500 text-slate-900 shadow-md shadow-cyan-500/20'
                              : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white'
                          }`}
                        >
                          0{idx + 1}. {stk.role.split(' ')[0]}
                        </button>
                      ))}
                    </div>

                    {/* Step buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setStakeholderIdx(prev => (prev > 0 ? prev - 1 : STAKEHOLDERS.length - 1))}
                        className="p-1.5 sm:p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 cursor-pointer"
                        title="Previous Stakeholder"
                      >
                        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <span className="text-xs sm:text-sm font-mono font-bold text-slate-400">
                        {stakeholderIdx + 1}/{STAKEHOLDERS.length}
                      </span>
                      <button
                        onClick={() => setStakeholderIdx(prev => (prev < STAKEHOLDERS.length - 1 ? prev + 1 : 0))}
                        className="p-1.5 sm:p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 cursor-pointer"
                        title="Next Stakeholder"
                      >
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Active Stakeholder Spotlight */}
                  {(() => {
                    const StkIcon = activeStakeholder.icon;
                    return (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center flex-1 min-h-0 pt-2">
                        <div className="lg:col-span-4 flex flex-col items-center text-center p-3 sm:p-5 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
                          <div className={`p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r ${activeStakeholder.color} text-white mb-2 shadow-xl`}>
                            <StkIcon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14" />
                          </div>
                          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 mb-1.5">
                            {activeStakeholder.badge}
                          </span>
                          <h4 className="text-base sm:text-xl lg:text-2xl font-black text-white">{activeStakeholder.name}</h4>
                          <p className="text-xs sm:text-sm text-cyan-200 mt-0.5 font-semibold">{activeStakeholder.department}</p>
                        </div>

                        <div className="lg:col-span-8 flex flex-col justify-center flex-1 min-h-0 gap-2 sm:gap-3">
                          <span className="text-[10px] sm:text-xs font-bold text-cyan-400 uppercase tracking-widest">Strategic Contributions & Role</span>
                          <h4 className="text-base sm:text-xl lg:text-2xl font-extrabold text-white">{activeStakeholder.role}</h4>
                          <div className="space-y-1.5 sm:space-y-2.5">
                            {activeStakeholder.contributions.map((c, i) => (
                              <div key={i} className="p-2.5 sm:p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0 mt-0.5" />
                                <span className="text-xs sm:text-sm lg:text-base text-slate-100 font-medium leading-relaxed">{c}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
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
                    Slide 03 • Project Lifecycle & Milestones
                  </div>
                  <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight">
                    Progress Summary & Workflow Tracking
                  </h2>
                </div>

                {/* Overall Score Banner */}
                <div className={`flex items-center gap-3 px-3.5 py-1.5 sm:py-2 rounded-2xl border backdrop-blur-xl shrink-0 self-start sm:self-auto ${
                  isDark ? 'bg-cyan-950/30 border-cyan-500/40' : 'bg-cyan-50 border-cyan-200 shadow-sm'
                }`}>
                  <div>
                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-cyan-400">Total Completion</div>
                    <div className="text-xl sm:text-3xl lg:text-4xl font-black text-white">{overallProgress}%</div>
                  </div>
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 sm:border-3 border-cyan-400/20 border-t-cyan-400 flex items-center justify-center font-bold text-xs text-cyan-300 animate-spin" style={{ animationDuration: '8s' }}>
                    v2.4
                  </div>
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
                          Workstream Deliverables & Outcomes
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
                          <span className="text-[10px] sm:text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-1">Stage Executive Summary</span>
                          <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed font-normal">{currentPhase.notes}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                            <div className="text-lg sm:text-2xl lg:text-3xl font-black text-cyan-400">18</div>
                            <div className="text-[8px] sm:text-[10px] text-slate-400 uppercase font-bold mt-0.5">Epics Done</div>
                          </div>
                          <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                            <div className="text-lg sm:text-2xl lg:text-3xl font-black text-emerald-400">99.4%</div>
                            <div className="text-[8px] sm:text-[10px] text-slate-400 uppercase font-bold mt-0.5">Phonetic Rate</div>
                          </div>
                          <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                            <div className="text-lg sm:text-2xl lg:text-3xl font-black text-blue-400">&lt;0.42s</div>
                            <div className="text-[8px] sm:text-[10px] text-slate-400 uppercase font-bold mt-0.5">Mean Latency</div>
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
                    Slide 04 • Technical Milestones Delivered
                  </div>
                  <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight">
                    Key Achievements & Breakthroughs
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
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                        <span className="text-xs font-bold text-emerald-400">{item.metric}</span>
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
                    className={`flex-1 min-h-0 flex flex-col justify-between p-3.5 sm:p-5 lg:p-6 rounded-2xl border backdrop-blur-2xl overflow-hidden ${
                      isDark ? 'bg-[#0B1221]/90 border-white/10' : 'bg-white border-slate-200 shadow-xl'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 shrink-0 pb-2.5 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 sm:p-3 rounded-xl bg-gradient-to-r ${active.color} text-white shadow-xl shrink-0`}>
                          <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                        <div>
                          <div className="text-[10px] sm:text-xs text-cyan-400 font-bold uppercase tracking-widest">{active.category} • {active.date}</div>
                          <h3 className="text-sm sm:text-xl lg:text-2xl font-black text-white mt-0.5 leading-tight">{active.title}</h3>
                        </div>
                      </div>

                      {/* Verified Metric Badge */}
                      <div className="px-3.5 py-1.5 sm:py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-center shrink-0">
                        <div className="text-[8px] sm:text-[10px] uppercase font-bold text-emerald-400 tracking-widest">Verified Target</div>
                        <div className="text-lg sm:text-2xl lg:text-3xl font-black">{active.metric}</div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed font-normal py-1.5 sm:py-2">
                      {active.desc}
                    </p>

                    <div>
                      <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Key Engineering Breakthroughs Delivered
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3">
                        {active.highlights.map((h, i) => (
                          <div key={i} className="p-2.5 sm:p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm lg:text-base text-slate-100 flex items-start gap-2">
                            <span className="text-cyan-400 font-bold">✔</span>
                            <span className="font-semibold leading-snug">{h}</span>
                          </div>
                        ))}
                      </div>
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
                    Slide 05 • Risk Governance & Mitigation
                  </div>
                  <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight">
                    Challenges & Risk Analysis Matrix
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

              {/* 4 Risk Selector Tabs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 shrink-0 mb-2">
                {RISKS.map((risk, idx) => (
                  <button
                    key={risk.id}
                    onClick={() => setActiveRiskIdx(idx)}
                    className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      activeRiskIdx === idx
                        ? 'bg-rose-500/20 border-rose-400 text-rose-300 shadow-lg shadow-rose-500/10'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] sm:text-xs font-mono font-bold uppercase">{risk.category}</span>
                      <span className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border ${risk.severityClass}`}>
                        {risk.severity}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base font-bold text-white truncate">{risk.title}</div>
                  </button>
                ))}
              </div>

              {/* Active Risk Focused Spotlight Card */}
              {(() => {
                const RiskIcon = activeRisk.icon;
                return (
                  <motion.div
                    key={activeRisk.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className={`flex-1 min-h-0 flex flex-col justify-between p-3.5 sm:p-5 lg:p-6 rounded-2xl border backdrop-blur-2xl overflow-hidden ${
                      isDark ? 'bg-[#0B1221]/90 border-white/10' : 'bg-white border-slate-200 shadow-xl'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 shrink-0 pb-2.5 border-b border-white/10">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 sm:p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
                          <RiskIcon className="w-5 h-5 sm:w-7 sm:h-7" />
                        </div>
                        <div>
                          <div className="text-[10px] sm:text-xs text-rose-400 font-bold uppercase tracking-widest">{activeRisk.category} Risk</div>
                          <h3 className="text-sm sm:text-xl lg:text-2xl font-black text-white">{activeRisk.title}</h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-xs sm:text-sm font-bold px-2.5 py-1 rounded-lg border ${activeRisk.severityClass}`}>
                          {activeRisk.severity}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                          {activeRisk.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 sm:gap-4 flex-1 min-h-0 my-1.5">
                      {/* Blocker Alert Box */}
                      <div className="p-3 sm:p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex flex-col justify-center">
                        <span className="text-[10px] sm:text-xs font-bold text-rose-400 uppercase tracking-widest block mb-1">Blocker & Impact</span>
                        <p className="text-xs sm:text-sm lg:text-base text-rose-100 font-medium leading-relaxed">
                          {activeRisk.blocker}
                        </p>
                      </div>

                      {/* Mitigation Resolution Box */}
                      <div className="p-3 sm:p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex flex-col justify-center">
                        <span className="text-[10px] sm:text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-1">Mitigation Strategy Delivered</span>
                        <p className="text-xs sm:text-sm lg:text-base text-cyan-100 font-medium leading-relaxed">
                          {activeRisk.mitigation}
                        </p>
                      </div>
                    </div>

                    {/* Impact Indicators */}
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm text-slate-400 font-mono shrink-0">
                      <span>Operational Impact: <strong className="text-white">{activeRisk.impact}</strong></span>
                      <span>Occurrence Probability: <strong className="text-white">{activeRisk.probability}</strong></span>
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
                    Slide 06 • Execution Roadmap & Delivery Targets
                  </div>
                  <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight">
                    Next Steps & Production Roadmap
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

              {/* 4 Phase Selector Tabs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 shrink-0 mb-2">
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
                        <div className="text-[8px] sm:text-[10px] uppercase font-bold text-emerald-400 tracking-widest">Delivery Metric</div>
                        <div className="text-base sm:text-xl lg:text-2xl font-black">{step.targetMetric}</div>
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2 flex-1 min-h-0 my-1.5">
                      <span className="text-[10px] sm:text-xs font-bold text-cyan-400 uppercase tracking-widest block">Core Deliverables & Target Items</span>
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

          {/* SLIDE 7: CONCLUSION & Q&A (EXPANDED PROJECTOR CARD SHOWCASE) */}
          {currentSlide === 7 && (
            <motion.div
              key="slide-7"
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
                    Slide 07 • Review Takeaways & Floor Discussion
                  </div>
                  <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight">
                    Conclusion & Interactive Q&A
                  </h2>
                </div>

                <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/5 border border-white/10 shrink-0 self-start sm:self-auto overflow-x-auto scrollbar-none">
                  <button
                    onClick={() => setSlide7Tab('takeaways')}
                    className={`px-3 sm:px-4 lg:px-5 py-1.5 rounded-xl text-xs sm:text-sm lg:text-base font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      slide7Tab === 'takeaways'
                        ? 'bg-cyan-500 text-slate-900 shadow-md shadow-cyan-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Award className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
                    <span>01. Key Takeaways</span>
                  </button>
                  <button
                    onClick={() => setSlide7Tab('faq')}
                    className={`px-3 sm:px-4 lg:px-5 py-1.5 rounded-xl text-xs sm:text-sm lg:text-base font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      slide7Tab === 'faq'
                        ? 'bg-cyan-500 text-slate-900 shadow-md shadow-cyan-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
                    <span>02. Floor Q&A</span>
                  </button>
                </div>
              </div>

              {/* TAB 1: EXECUTIVE TAKEAWAYS */}
              {slide7Tab === 'takeaways' && (
                <motion.div
                  key="tab-takeaways"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className={`flex-1 min-h-0 flex flex-col justify-between p-3.5 sm:p-5 lg:p-6 rounded-2xl border backdrop-blur-2xl overflow-hidden ${
                    isDark ? 'bg-[#0B1221]/90 border-white/10' : 'bg-white border-slate-200 shadow-xl'
                  }`}
                >
                  <h3 className="text-sm sm:text-lg lg:text-xl font-black text-white flex items-center gap-2 shrink-0 mb-2">
                    <Award className="w-5 h-5 text-cyan-400" />
                    Key Transformative Business Outcomes
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-4 flex-1 min-h-0 mb-2">
                    <div className="p-3 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between hover:border-cyan-400/40 transition-all shadow-lg">
                      <div>
                        <div className="text-3xl sm:text-5xl lg:text-6xl font-black text-cyan-400 mb-0.5">-45%</div>
                        <div className="text-xs sm:text-base lg:text-lg font-black text-white mb-1">Average Handling Time Drop</div>
                      </div>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed font-normal">
                        Reduces customer hold times from 45s down to under 1.5 seconds via sub-second vectorized directory lookup.
                      </p>
                    </div>

                    <div className="p-3 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between hover:border-emerald-400/40 transition-all shadow-lg">
                      <div>
                        <div className="text-3xl sm:text-5xl lg:text-6xl font-black text-emerald-400 mb-0.5">100%</div>
                        <div className="text-xs sm:text-base lg:text-lg font-black text-white mb-1">Call QA Audit Coverage</div>
                      </div>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed font-normal">
                        Replaces 2% manual sampling with continuous automated scoring for Sinhala, English, and Tamil greetings & courtesy.
                      </p>
                    </div>

                    <div className="p-3 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between hover:border-blue-400/40 transition-all shadow-lg">
                      <div>
                        <div className="text-3xl sm:text-5xl lg:text-6xl font-black text-blue-400 mb-0.5">-80%</div>
                        <div className="text-xs sm:text-base lg:text-lg font-black text-white mb-1">TT Dispatch Latency</div>
                      </div>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed font-normal">
                        Eliminates manual Trouble Ticket drafting and routing errors between MDF and Area Maintenance engineers.
                      </p>
                    </div>
                  </div>

                  {/* Team Contacts */}
                  <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 shrink-0 text-xs sm:text-sm">
                    <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Leadership & Contacts</span>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200 font-medium">
                        Lead: <strong className="text-white">Kudagama & Dev Squad</strong>
                      </div>
                      <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200 font-medium">
                        Email: <strong className="text-white">smartpearl@slt.lk</strong>
                      </div>
                      <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200 font-medium">
                        Portal: <strong className="text-white">internal.slt.lk/smartpearl</strong>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: INTERACTIVE FLOOR Q&A */}
              {slide7Tab === 'faq' && (
                <motion.div
                  key="tab-faq"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className={`flex-1 min-h-0 flex flex-col justify-between p-3.5 sm:p-5 lg:p-6 rounded-2xl border backdrop-blur-2xl overflow-hidden ${
                    isDark ? 'bg-[#0B1221]/90 border-white/10' : 'bg-white border-slate-200 shadow-xl'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2.5 shrink-0 pb-2.5 border-b border-white/10">
                    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                      {FAQS.map((_, fIdx) => (
                        <button
                          key={fIdx}
                          onClick={() => setActiveFaqIdx(fIdx)}
                          className={`px-3 py-1 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                            activeFaqIdx === fIdx
                              ? 'bg-cyan-500 text-slate-900 shadow-md shadow-cyan-500/20'
                              : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white'
                          }`}
                        >
                          Question 0{fIdx + 1}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => setActiveFaqIdx(prev => (prev > 0 ? prev - 1 : FAQS.length - 1))}
                        className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 cursor-pointer"
                        title="Previous Question"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {activeFaqIdx + 1}/{FAQS.length}
                      </span>
                      <button
                        onClick={() => setActiveFaqIdx(prev => (prev < FAQS.length - 1 ? prev + 1 : 0))}
                        className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 cursor-pointer"
                        title="Next Question"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Focused Question & Answer Spotlight */}
                  <div className="flex-1 min-h-0 flex flex-col justify-center my-1.5 sm:my-2">
                    <span className="text-[10px] sm:text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-0.5">Featured Review Inquiry</span>
                    <h3 className="text-xs sm:text-base lg:text-xl font-black text-white mb-1.5">{activeFaq.q}</h3>
                    <div className="p-3 sm:p-4 lg:p-5 rounded-xl bg-cyan-950/40 border border-cyan-400/30 text-xs sm:text-sm lg:text-base text-cyan-100 font-medium leading-relaxed shadow-lg">
                      {activeFaq.a}
                    </div>
                  </div>

                  {/* Ask Question Box */}
                  <div className="pt-2 border-t border-white/10 shrink-0">
                    <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Live Question Submission to Dev Floor</span>
                    {questionSubmitted ? (
                      <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          Question submitted to Kudagama & Dev Squad!
                        </span>
                        <button
                          onClick={() => {
                            setQuestionSubmitted(false);
                            setQuestionInput('');
                          }}
                          className="text-xs underline font-bold ml-2 shrink-0 cursor-pointer"
                        >
                          Send another
                        </button>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (questionInput.trim()) setQuestionSubmitted(true);
                        }}
                        className="flex gap-2"
                      >
                        <input
                          type="text"
                          value={questionInput}
                          onChange={(e) => setQuestionInput(e.target.value)}
                          placeholder="Type an audience question regarding architecture, security, or deployment..."
                          className="flex-1 px-3 py-1.5 sm:py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                        <button
                          type="submit"
                          disabled={!questionInput.trim()}
                          className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-cyan-500 text-slate-900 font-bold text-xs hover:bg-cyan-400 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5 shrink-0"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit</span>
                        </button>
                      </form>
                    )}
                  </div>
                </motion.div>
              )}
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
