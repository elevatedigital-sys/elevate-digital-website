"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  ArrowRight,
  Camera,
  Check,
  ClipboardList,
  Globe,
  Layers3,
  Mail,
  Orbit,
  Phone,
  Rocket,
  Send,
  Sparkles,
  Zap,
} from "lucide-react";

const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

const websitePackages = [
  {
    title: "Starter",
    price: "$450 – $800",
    features: ["1 custom designed page", "Mobile responsive", "Contact form", "Basic SEO setup", "Unlimited revisions with upkeep plan"],
  },
  {
    title: "Business",
    price: "$900 – $1,500",
    popular: true,
    features: ["3–5 custom pages", "Modern layout", "Booking/contact forms", "Google Maps setup", "Unlimited revisions with upkeep plan"],
  },
  {
    title: "Premium",
    price: "$1,600 – $2,400",
    features: ["Fully custom website", "Premium animations", "Lead generation setup", "Speed optimized", "Unlimited revisions with upkeep plan"],
  },
];

const upkeepPackages = [
  {
    title: "Basic Upkeep",
    price: "$60/mo",
    features: ["Monthly website updates", "Small text or image changes", "Basic site checks", "Unlimited revision requests queued monthly"],
  },
  {
    title: "Standard Upkeep",
    price: "$120/mo",
    popular: true,
    features: ["Weekly website updates", "Content and section edits", "Priority fixes", "Unlimited revisions with faster turnaround"],
  },
  {
    title: "Premium Upkeep",
    price: "$250 – $300/mo",
    features: ["2–3 updates per week", "Priority website management", "New graphics or content swaps", "Fastest unlimited revision support"],
  },
];

const socialPackages = [
  {
    title: "Starter Social",
    price: "$150 – $300/mo",
    features: ["1–2 posts per week", "Basic promotional graphics", "Simple branded posts", "Account updates"],
  },
  {
    title: "Business Social",
    price: "$350 – $700/mo",
    popular: true,
    features: ["3–5 posts per week", "Custom branded graphics", "Story posts + updates", "Brand consistency"],
  },
  {
    title: "Premium Social",
    price: "$800 – $1,500+/mo",
    features: ["Daily or near-daily posting", "Advanced custom graphics", "Campaign + launch support", "Priority updates + management"],
  },
];

const strategyItems = [
  "Brand positioning",
  "Competitor analysis",
  "Marketplace placement",
  "Branding guidelines",
  "Differentiation",
  "Unfair advantages",
  "Website goals",
  "Design direction",
];

const navItems = [
  ["Pricing", "#pricing"],
  ["Social Media", "#social"],
  ["Project Brief", "#brief"],
  ["Creator", "#creator"],
];

function Field({ as = "input", name, value, onChange, placeholder, className = "" }) {
  const base =
    "w-full rounded-2xl border border-black/10 bg-slate-50/90 px-4 py-4 font-medium outline-none transition-all duration-300 hover:scale-[1.01] hover:border-violet-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.14)] focus:border-violet-500 focus:bg-white focus:shadow-lg focus:shadow-violet-100";

  if (as === "textarea") {
    return <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} className={`${base} min-h-28 ${className}`} />;
  }

  return <input name={name} value={value} onChange={onChange} placeholder={placeholder} className={`${base} ${className}`} />;
}

function SectionLabel({ children, dark = false }) {
  return (
    <p className={`cursor-default text-sm font-black tracking-[0.3em] transition-all duration-300 hover:tracking-[0.45em] ${dark ? "text-violet-300 hover:text-white" : "text-violet-700 hover:text-violet-500"}`}>
      {children}
    </p>
  );
}

function SectionDivider() {
  return <div className="h-0" />;
}

function RevealSection({ children, className = "", dark = false }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.18 }}
      variants={{
        hidden: { opacity: 0, y: 70, scale: 0.985, filter: "blur(14px)" },
        visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
      }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${className}`}
    >
      <motion.div
        variants={{
          hidden: { opacity: 1 },
          visible: { opacity: 0 },
        }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 z-40 overflow-hidden"
      >
        {[...Array(110)].map((_, i) => (
          <motion.div
            key={`section-pixel-${i}`}
            className={`absolute rounded-[1px] ${dark ? "bg-cyan-300/50" : "bg-violet-500/45"}`}
            style={{
              width: `${3 + (i % 4)}px`,
              height: `${3 + (i % 4)}px`,
              left: `${(i * 7) % 100}%`,
              top: `${(i * 11) % 100}%`,
              boxShadow: dark
                ? "0 0 16px rgba(34,211,238,0.7)"
                : "0 0 16px rgba(139,92,246,0.6)",
            }}
            variants={{
              hidden: { opacity: [0, 1, 0.4], scale: [0.4, 1.8, 1], y: [20, -10, 0], x: [-8, 8, 0] },
              visible: { opacity: 0, scale: 0.2, y: -25 },
            }}
            transition={{ duration: 0.75 + (i % 5) * 0.04, delay: i * 0.002, ease: "easeOut" }}
          />
        ))}
      </motion.div>

      {children}
    </motion.div>
  );
}

function SectionTag({ number, title, dark = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -25 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.18 }}
      transition={{ duration: 0.6 }}
      className={`mb-8 inline-flex items-center gap-3 rounded-full border px-4 py-2 text-xs font-black tracking-[0.22em] backdrop-blur-xl ${
        dark
          ? "border-white/10 bg-white/5 text-white/70"
          : "border-black/10 bg-white/70 text-slate-500 shadow-sm"
      }`}
    >
      <span className={dark ? "text-violet-300" : "text-violet-700"}>{number}</span>
      <span>{title}</span>
    </motion.div>
  );
}

function SlidingGrid({ dark = false, diagonal = false }) {
  return (
    <>
      <motion.div
        animate={{ backgroundPosition: ["0px 0px", diagonal ? "160px -160px" : "140px 140px"] }}
        transition={{ duration: dark ? 6 : 8, repeat: Infinity, ease: "linear" }}
        className={`pointer-events-none absolute inset-0 ${dark ? "opacity-[0.09]" : "opacity-[0.055]"}`}
        style={{
          backgroundImage: dark
            ? "linear-gradient(to right, rgba(255,255,255,0.42) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.42) 1px, transparent 1px)"
            : diagonal
              ? "linear-gradient(135deg, rgba(139,92,246,0.25) 1px, transparent 1px), linear-gradient(45deg, rgba(34,211,238,0.16) 1px, transparent 1px)"
              : "linear-gradient(to right, rgba(139,92,246,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,92,246,0.25) 1px, transparent 1px)",
          backgroundSize: dark ? "80px 80px" : "70px 70px",
        }}
      />
      <motion.div
        animate={{ backgroundPosition: ["0px 0px", diagonal ? "-120px 120px" : "-180px -180px"] }}
        transition={{ duration: dark ? 10 : 12, repeat: Infinity, ease: "linear" }}
        className={`pointer-events-none absolute inset-0 ${dark ? "opacity-[0.04]" : "opacity-[0.03]"}`}
        style={{
          backgroundImage: dark
            ? "linear-gradient(to right, rgba(167,139,250,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.25) 1px, transparent 1px)"
            : "linear-gradient(to right, rgba(34,211,238,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.22) 1px, transparent 1px)",
          backgroundSize: dark ? "120px 120px" : "90px 90px",
        }}
      />
    </>
  );
}

function DataHighways({ mousePosition }) {
  const lines = [
    { top: "12%", left: "-18%", width: "85%", delay: 0, color: "violet" },
    { top: "22%", left: "5%", width: "70%", delay: 0.4, color: "cyan" },
    { top: "34%", left: "-10%", width: "95%", delay: 0.8, color: "violet" },
    { top: "48%", left: "18%", width: "72%", delay: 1.2, color: "cyan" },
    { top: "62%", left: "-15%", width: "92%", delay: 1.6, color: "violet" },
    { top: "76%", left: "10%", width: "80%", delay: 2.0, color: "cyan" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      
      <motion.div
        animate={{ x: mousePosition.x / 35, y: mousePosition.y / 45 }}
        transition={{ type: "spring", stiffness: 35, damping: 18 }}
        className="absolute inset-0"
      >
        {lines.map((line, index) => (
          <motion.div
            key={line.top}
            className="absolute h-[2px] origin-left rotate-[-18deg] overflow-hidden rounded-full"
            style={{ top: line.top, left: line.left, width: line.width }}
            animate={{
              x: [0, 80, 0],
              opacity: [0.25, 0.85, 0.25],
            }}
            transition={{
              duration: 4.5 + index * 0.35,
              delay: line.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{ x: ["-120%", "120%"] }}
              transition={{ duration: 2.2, delay: line.delay, repeat: Infinity, ease: "linear" }}
              style={{
                background:
                  line.color === "violet"
                    ? "linear-gradient(90deg, transparent, rgba(139,92,246,0.95), rgba(255,255,255,0.8), transparent)"
                    : "linear-gradient(90deg, transparent, rgba(34,211,238,0.9), rgba(255,255,255,0.7), transparent)",
                boxShadow:
                  line.color === "violet"
                    ? "0 0 28px rgba(139,92,246,0.9)"
                    : "0 0 28px rgba(34,211,238,0.8)",
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {[...Array(18)].map((_, i) => (
        <motion.div
          key={`packet-${i}`}
          className="absolute h-2 w-2 rounded-full bg-white shadow-[0_0_18px_rgba(139,92,246,0.9)]"
          style={{ top: `${10 + (i % 6) * 13}%`, left: `${-10 + (i % 5) * 24}%` }}
          animate={{
            x: [0, 760],
            y: [0, -250],
            opacity: [0, 1, 0],
            scale: [0.7, 1.25, 0.7],
          }}
          transition={{ duration: 5 + (i % 4), repeat: Infinity, delay: i * 0.22, ease: "linear" }}
        />
      ))}
    </div>
  );
}

function PackageCard({ pack, dark = false, icon, variant = "default" }) {
  const premiumGlow = variant === "website" || dark || variant === "social";
  const socialBoost = variant === "social";

  return (
    <motion.div
      whileHover={premiumGlow ? { y: -24, scale: 1.08, rotateX: 8, rotateY: -8 } : { y: -16, scale: 1.04 }}
      transition={{ duration: 0.25 }}
      className={`group relative overflow-hidden rounded-[2rem] border p-8 shadow-sm transition-all duration-500 before:absolute before:inset-0 before:translate-x-[-120%] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-transform before:duration-700 hover:border-violet-400 hover:before:translate-x-[120%] ${premiumGlow ? "hover:ring-2 hover:ring-violet-300/70 hover:shadow-[0_0_110px_rgba(167,139,250,0.55)]" : "hover:shadow-[0_0_60px_rgba(139,92,246,0.24)]"} ${dark ? "border-white/10 bg-white/10 text-white backdrop-blur" : "border-black/10 bg-white text-[#090b13]"}`}
    >
      {premiumGlow && (
        <>
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{
              background:
                "linear-gradient(115deg, transparent 10%, rgba(255,255,255,0.16) 30%, rgba(167,139,250,0.22) 45%, rgba(255,255,255,0.12) 60%, transparent 80%)",
              backgroundSize: "220% 220%",
            }}
          />
          <motion.div
            className="pointer-events-none absolute -left-20 top-0 h-full w-24 rotate-12 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
            animate={{ x: [-120, 520] }}
            transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-violet-300/35 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </>
      )}

      {pack.popular && (
        <div className="absolute right-5 top-5 z-10 rounded-full bg-violet-700 px-4 py-2 text-xs font-black tracking-widest text-white shadow-lg shadow-violet-500/30">
          MOST POPULAR
        </div>
      )}

      <div className={`relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(167,139,250,0.45)] ${dark ? "bg-white/10 text-violet-300 group-hover:bg-violet-400/20" : "bg-violet-50 text-violet-700 group-hover:bg-violet-100"}`}>
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
          {icon}
        </motion.div>
      </div>

      <h3 className={`relative cursor-default text-2xl font-black transition-all duration-300 group-hover:translate-x-1 group-hover:tracking-wide ${dark || socialBoost ? "group-hover:text-violet-300" : "group-hover:text-violet-600"}`}>
        {pack.title}
      </h3>

      <p className={`relative mt-5 text-4xl font-black transition-all duration-300 group-hover:scale-[1.03] ${dark ? "text-violet-300" : "text-[#090b13]"}`}>{pack.price}</p>

      <div className="relative mt-8 space-y-4">
        {pack.features.map((feature) => (
          <div key={feature} className="flex gap-3 transition-all duration-300 hover:translate-x-1">
            <Check className={`mt-0.5 shrink-0 ${dark ? "text-violet-300" : "text-violet-700"}`} size={18} />
            <p className={dark ? "text-white/75 group-hover:text-white" : "text-slate-700 group-hover:text-slate-950"}>{feature}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Home() {
  const cursorRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    website: "",
    package: "Business Website",
    goals: "",
    branding: "",
    positioning: "",
    competitors: "",
    competitorAnalysis: "",
    differentiation: "",
    advantage: "",
    style: "",
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const moveCursor = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${event.clientX - 12}px, ${event.clientY - 12}px)`;
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  const plainFormBody = useMemo(() => {
    return `Name: ${form.name}\nBusiness: ${form.business}\nEmail: ${form.email}\nPhone: ${form.phone}\nCurrent Website: ${form.website}\nPackage Interest: ${form.package}\n\nWebsite Goals:\n${form.goals}\n\nBranding Guidelines / Style Guide:\n${form.branding}\n\nBrand Positioning:\n${form.positioning}\n\nMain Competitors:\n${form.competitors}\n\nHave you done competitor analysis?:\n${form.competitorAnalysis}\n\nDifferentiation:\n${form.differentiation}\n\nUnfair Advantage / Strengths:\n${form.advantage}\n\nPreferred Style:\n${form.style}`;
  }, [form]);

  const emailTemplateParams = useMemo(() => {
    return {
      to_email: "elevate.digital.rizzo@gmail.com",
      from_name: form.name,
      business_name: form.business,
      from_email: form.email,
      phone: form.phone,
      current_website: form.website,
      package_interest: form.package,
      goals: form.goals,
      branding: form.branding,
      positioning: form.positioning,
      competitors: form.competitors,
      competitor_analysis: form.competitorAnalysis,
      differentiation: form.differentiation,
      advantage: form.advantage,
      style: form.style,
      message: plainFormBody,
    };
  }, [form, plainFormBody]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(plainFormBody);
      setMessage("Project brief copied. You can paste it into an email if needed.");
    } catch {
      setMessage("Use the email button below or email elevate.digital.rizzo@gmail.com directly.");
    }
  };

  const submitBrief = async (event) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.business) {
      setMessage("Please add your name, business name, and email before submitting.");
      return;
    }

    if (EMAILJS_SERVICE_ID.includes("YOUR_") || EMAILJS_TEMPLATE_ID.includes("YOUR_") || EMAILJS_PUBLIC_KEY.includes("YOUR_")) {
      setMessage("EmailJS is ready in the code. Add your EmailJS keys in Vercel environment variables to turn on automatic sending.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailTemplateParams, EMAILJS_PUBLIC_KEY);
      setMessage("Project brief sent. I’ll reach out soon.");
      setForm({ name: "", business: "", email: "", phone: "", website: "", package: "Business Website", goals: "", branding: "", positioning: "", competitors: "", competitorAnalysis: "", differentiation: "", advantage: "", style: "" });
    } catch {
      setMessage("Something went wrong sending the form. Copy the brief or email elevate.digital.rizzo@gmail.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.div ref={cursorRef} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="pointer-events-none fixed left-0 top-0 z-[999] hidden h-6 w-6 rounded-full border border-violet-400 bg-violet-500/20 backdrop-blur-xl md:block" />

      <main className="relative min-h-screen overflow-x-hidden bg-[#f8f8fb] text-[#090b13] selection:bg-violet-200/60 [&_a]:transition-all [&_a]:duration-300 [&_button]:transition-all [&_button]:duration-300 [&_h1]:transition-all [&_h1]:duration-300 [&_h1:hover]:scale-[1.01] [&_h1:hover]:text-violet-700 [&_h2]:transition-all [&_h2]:duration-300 [&_h2:hover]:translate-x-1 [&_h2:hover]:text-violet-600 [&_h3]:transition-all [&_h3]:duration-300 [&_h3:hover]:translate-x-1 [&_h3:hover]:text-violet-500 [&_p]:transition-all [&_p]:duration-300 [&_span]:transition-all [&_span]:duration-300 [&_span:hover]:text-violet-600">
        <motion.div animate={{ x: mousePosition.x / 18, y: mousePosition.y / 18 }} transition={{ type: "spring", stiffness: 40, damping: 20 }} className="pointer-events-none fixed left-0 top-0 z-0 h-[32rem] w-[32rem] rounded-full bg-violet-500/10 blur-[120px]" />
        <motion.div animate={{ x: -mousePosition.x / 24, y: -mousePosition.y / 24 }} transition={{ type: "spring", stiffness: 35, damping: 18 }} className="pointer-events-none fixed right-0 top-0 z-0 h-[26rem] w-[26rem] rounded-full bg-cyan-400/10 blur-[120px]" />

        <section className="relative overflow-hidden border-b border-black/5 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.18),transparent_25%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_30%),linear-gradient(135deg,#f7f7ff_0%,#eef2ff_35%,#edf7ff_70%,#f8f8ff_100%)]">
          <DataHighways mousePosition={mousePosition} />

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[...Array(18)].map((_, i) => (
              <motion.div
                key={`hero-star-${i}`}
                className="absolute h-[2px] rounded-full"
                style={{
                  top: `${6 + (i * 5) % 80}%`,
                  left: `${-20 + (i * 8)}%`,
                  width: `${80 + (i % 4) * 40}px`,
                  background:
                    i % 2 === 0
                      ? "linear-gradient(90deg,transparent,rgba(139,92,246,0.95),transparent)"
                      : "linear-gradient(90deg,transparent,rgba(34,211,238,0.9),transparent)",
                  rotate: `${-18 + (i % 3) * 8}deg`,
                  opacity: 0.65,
                  filter: "blur(0.5px)",
                }}
                animate={{
                  x: [0, 1200],
                  opacity: [0, 1, 0],
                  scaleX: [0.6, 1.2, 0.6],
                }}
                transition={{
                  duration: 4 + (i % 5),
                  delay: i * 0.4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            {[...Array(24)].map((_, i) => (
              <motion.div
                key={`hero-pixel-${i}`}
                className="absolute rounded-[2px] bg-white"
                style={{
                  width: `${3 + (i % 3)}px`,
                  height: `${3 + (i % 3)}px`,
                  left: `${(i * 9) % 100}%`,
                  top: `${(i * 7) % 100}%`,
                  boxShadow:
                    i % 2 === 0
                      ? "0 0 20px rgba(139,92,246,0.9)"
                      : "0 0 20px rgba(34,211,238,0.9)",
                }}
                animate={{
                  y: [0, -35, 0],
                  opacity: [0.15, 1, 0.15],
                  scale: [0.7, 1.4, 0.7],
                }}
                transition={{
                  duration: 3 + (i % 4),
                  repeat: Infinity,
                  delay: i * 0.16,
                  ease: "easeInOut",
                }}
              />
            ))}

            <motion.div
              animate={{ opacity: [0.2, 0.45, 0.2], scale: [1, 1.08, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[8%] top-[18%] h-[28rem] w-[28rem] rounded-full bg-violet-500/20 blur-[140px]"
            />

            <motion.div
              animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-[5%] top-[8%] h-[32rem] w-[32rem] rounded-full bg-cyan-400/15 blur-[150px]"
            />
          </div>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute left-10 top-10 z-20 hidden md:block">
            <div className="relative flex items-center justify-center">
              <Sparkles className="h-10 w-10 text-violet-500 drop-shadow-[0_0_25px_rgba(139,92,246,0.9)]" />
              <Sparkles className="absolute -left-4 -top-4 h-4 w-4 text-violet-300 opacity-80" />
              <Sparkles className="absolute -bottom-3 right-0 h-3 w-3 text-cyan-300 opacity-70" />
              <Sparkles className="absolute -right-5 top-2 h-5 w-5 text-white opacity-90" />
            </div>
          </motion.div>

          <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
            <div>
              <p className="text-lg font-black tracking-[0.18em]">ELEVATE DIGITAL™</p>
              <p className="text-xs font-semibold tracking-[0.28em] text-violet-700">WEB DESIGN • SOCIAL MEDIA • BRAND STRATEGY</p>
            </div>
            <div className="hidden items-center gap-6 text-sm font-bold text-slate-600 md:flex">
              {navItems.map(([label, href]) => (
                <motion.a key={href} whileHover={{ y: -2, scale: 1.08 }} href={href} className="hover:text-violet-700 hover:drop-shadow-[0_0_18px_rgba(139,92,246,0.55)]">
                  {label}
                </motion.a>
              ))}
              <a href="#contact" className="rounded-full bg-[#0b1020] px-5 py-3 text-white hover:scale-105 hover:shadow-xl hover:shadow-violet-300/30">Contact</a>
            </div>
          </div>

          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-800 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-violet-200/70">
                <Sparkles size={16} /> elevatedigitalx.com
              </div>
              <motion.h1 whileHover={{ scale: 1.015, x: 6 }} transition={{ duration: 0.3 }} className="max-w-4xl cursor-default text-5xl font-black leading-[0.95] tracking-tight transition-all duration-300 hover:drop-shadow-[0_0_28px_rgba(139,92,246,0.25)] md:text-7xl">
                Websites built around what makes your brand different.
              </motion.h1>
              <motion.p whileHover={{ x: 4, scale: 1.01 }} className="mt-6 max-w-2xl cursor-default text-lg leading-8 text-slate-600 hover:text-slate-900">
                Clean web design, social media posting, branded graphics, and digital strategy for businesses that want to look more professional online.
              </motion.p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#brief" className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0b1020] px-6 py-4 font-bold text-white shadow-xl shadow-violet-500/20 transition hover:scale-[1.04]">
                  Start Website Brief <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </a>
                <a href="#pricing" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-black/10 bg-white px-6 py-4 font-bold shadow-sm transition hover:scale-[1.04] hover:shadow-xl hover:shadow-violet-200/60">
                  <motion.span animate={{ y: [0, -8, 0], rotate: [-6, 6, -6] }} transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }} className="inline-flex">
                    <Rocket size={22} className="text-violet-600" />
                  </motion.span>
                  View Packages
                </a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative min-h-[36rem] overflow-visible rounded-[2rem] border border-black/10 bg-white/70 p-5 shadow-2xl shadow-violet-100/70 backdrop-blur-xl">
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-violet-500/20 blur-[120px]"
              />

              <motion.div
                animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.06, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-cyan-400/15 blur-[120px]"
              />

              {[...Array(14)].map((_, i) => (
                <motion.div
                  key={`signal-${i}`}
                  className="absolute h-[2px] rounded-full"
                  style={{
                    top: `${8 + i * 6}%`,
                    left: `${-10 + (i % 4) * 8}%`,
                    width: `${40 + (i % 4) * 12}%`,
                    background:
                      i % 2 === 0
                        ? "linear-gradient(90deg, transparent, rgba(139,92,246,0.85), transparent)"
                        : "linear-gradient(90deg, transparent, rgba(34,211,238,0.8), transparent)",
                    rotate: `${-10 + (i % 3) * 8}deg`,
                    opacity: 0.5,
                    filter: "blur(1px)",
                  }}
                  animate={{ x: [0, 140, 0], opacity: [0.15, 0.75, 0.15] }}
                  transition={{ duration: 4 + i * 0.25, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}

              {[...Array(18)].map((_, i) => (
                <motion.div
                  key={`dashboard-particle-${i}`}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: `${3 + (i % 4)}px`,
                    height: `${3 + (i % 4)}px`,
                    left: `${6 + (i * 5) % 90}%`,
                    top: `${10 + (i * 4) % 75}%`,
                    boxShadow:
                      i % 2 === 0
                        ? "0 0 18px rgba(139,92,246,0.9)"
                        : "0 0 18px rgba(34,211,238,0.85)",
                  }}
                  animate={{ y: [0, -35, 0], opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.15 }}
                />
              ))}

              <div className="relative grid min-h-[34rem] gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                {[...Array(22)].map((_, i) => (
                  <motion.div
                    key={`visitor-pulse-${i}`}
                    className="pointer-events-none absolute z-20 h-2.5 w-2.5 rounded-full bg-white"
                    style={{
                      left: `${8 + (i * 4) % 84}%`,
                      top: `${10 + (i * 7) % 78}%`,
                      boxShadow:
                        i % 2 === 0
                          ? "0 0 18px rgba(139,92,246,0.95), 0 0 35px rgba(139,92,246,0.6)"
                          : "0 0 18px rgba(34,211,238,0.9), 0 0 35px rgba(34,211,238,0.55)",
                    }}
                    animate={{
                      x: [0, 35, -18, 22, 0],
                      y: [0, -20, 15, -12, 0],
                      opacity: [0.15, 1, 0.35, 1, 0.15],
                      scale: [0.7, 1.4, 0.9, 1.25, 0.7],
                    }}
                    transition={{
                      duration: 5 + (i % 5),
                      delay: i * 0.18,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}

                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={`visitor-trail-${i}`}
                    className="pointer-events-none absolute z-10 h-[2px] rounded-full"
                    style={{
                      left: `${4 + i * 9}%`,
                      top: `${15 + (i % 5) * 13}%`,
                      width: `${60 + (i % 4) * 30}px`,
                      background:
                        i % 2 === 0
                          ? "linear-gradient(90deg, transparent, rgba(139,92,246,0.8), transparent)"
                          : "linear-gradient(90deg, transparent, rgba(34,211,238,0.8), transparent)",
                      filter: "blur(1px)",
                      opacity: 0.5,
                    }}
                    animate={{
                      x: [0, 120, 0],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 4 + i * 0.3,
                      delay: i * 0.22,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
                <div className="flex min-h-[34rem] flex-col justify-between rounded-[1.7rem] border border-white/20 bg-[#0b1020]/92 p-6 text-white backdrop-blur-xl">
                  <div>
                    <div className="mb-6 flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(74,222,128,0.9)]" />
                      <p className="text-sm font-black tracking-[0.25em] text-emerald-300">LIVE SYSTEM</p>
                    </div>

                    <h2 className="max-w-md text-3xl font-black leading-tight xl:text-4xl">
                      Your website should sell before you speak.
                    </h2>

                    <p className="mt-4 max-w-lg text-sm leading-7 text-white/65 hover:text-white xl:text-base">
                      Most websites only look good. The best ones create trust, explain positioning, and move customers toward action immediately.
                    </p>
                  </div>

                  <div className="mt-6 grid gap-3">
                    {[
                      ["Positioning Strength", "94%"],
                      ["Conversion Structure", "Optimized"],
                      ["Brand Trust Signals", "Active"],
                    ].map(([label, value]) => (
                      <motion.div
                        whileHover={{ scale: 1.02, x: 4 }}
                        key={label}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl"
                      >
                        <span className="font-semibold text-white/75">{label}</span>
                        <span className="font-black text-violet-300">{value}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="relative flex flex-col gap-4 self-start">
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="rounded-[1.7rem] border border-black/10 bg-white/80 p-5 shadow-xl backdrop-blur-xl"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <p className="font-black text-slate-900">Audience Activity</p>
                      <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">LIVE</div>
                    </div>

                    <div className="flex h-24 items-end gap-2">
                      {[45, 65, 52, 88, 74, 96, 68, 105].map((height, i) => (
                        <motion.div
                          key={height}
                          animate={{ height: [height - 18, height, height - 10] }}
                          transition={{ duration: 2 + i * 0.15, repeat: Infinity, ease: "easeInOut" }}
                          className="flex-1 rounded-t-2xl bg-gradient-to-t from-violet-600 to-cyan-400 shadow-[0_0_25px_rgba(139,92,246,0.35)]"
                          style={{ height }}
                        />
                      ))}
                    </div>
                  </motion.div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <motion.div
                      whileHover={{ scale: 1.03, rotate: -1 }}
                      className="rounded-[1.5rem] border border-black/10 bg-white/80 p-5 shadow-lg backdrop-blur-xl"
                    >
                      <p className="text-sm font-black tracking-[0.2em] text-violet-700">HEATMAP</p>
                      <div className="relative mt-4 h-28 overflow-hidden rounded-2xl bg-[#0b1020]">
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={`heat-${i}`}
                            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                            transition={{ duration: 2 + i * 0.2, repeat: Infinity }}
                            className="absolute rounded-full bg-violet-500/50 blur-xl"
                            style={{
                              width: `${50 + (i % 3) * 20}px`,
                              height: `${50 + (i % 3) * 20}px`,
                              left: `${(i * 11) % 80}%`,
                              top: `${(i * 9) % 70}%`,
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.03, rotate: 1 }}
                      className="rounded-[1.5rem] border border-black/10 bg-white/80 p-5 shadow-lg backdrop-blur-xl"
                    >
                      <p className="text-sm font-black tracking-[0.2em] text-cyan-700">DATA FLOW</p>
                      <div className="relative mt-4 h-28 overflow-hidden rounded-2xl bg-[#0b1020]">
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={`flow-${i}`}
                            className="absolute h-[2px] rounded-full"
                            style={{
                              top: `${15 + i * 15}%`,
                              width: `${60 + i * 10}px`,
                              background: "linear-gradient(90deg, transparent, rgba(34,211,238,1), transparent)",
                            }}
                            animate={{ x: [-120, 260], opacity: [0, 1, 0] }}
                            transition={{ duration: 2.4 + i * 0.3, repeat: Infinity, ease: "linear" }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <SectionDivider />

        <RevealSection>
        <section id="pricing" className="relative overflow-hidden px-6 py-28 bg-[#eef2ff]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.95),rgba(238,242,255,0.94),rgba(219,234,254,0.9))]" />

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ x: [-80, 80, -80], y: [-30, 30, -30], rotate: [0, 8, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[-12%] top-[8%] h-[34rem] w-[34rem] rounded-full bg-violet-500/20 blur-[150px]"
            />

            <motion.div
              animate={{ x: [70, -70, 70], y: [40, -40, 40], rotate: [0, -10, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-[-10%] bottom-[0%] h-[38rem] w-[38rem] rounded-full bg-cyan-400/18 blur-[160px]"
            />

            <motion.div
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 opacity-[0.18]"
              style={{
                background:
                  "linear-gradient(115deg, transparent 5%, rgba(139,92,246,0.16) 30%, rgba(34,211,238,0.12) 50%, rgba(255,255,255,0.35) 62%, transparent 85%)",
                backgroundSize: "260% 260%",
              }}
            />

            {[...Array(46)].map((_, i) => (
              <motion.div
                key={`pricing-particle-${i}`}
                className="absolute rounded-full bg-white mix-blend-screen"
                style={{
                  left: `${4 + (i * 7) % 92}%`,
                  bottom: `${-8 - (i % 6) * 3}%`,
                  width: `${3 + (i % 4)}px`,
                  height: `${3 + (i % 4)}px`,
                  boxShadow:
                    i % 2 === 0
                      ? "0 0 22px rgba(139,92,246,0.95), 0 0 55px rgba(139,92,246,0.6)"
                      : "0 0 22px rgba(34,211,238,0.9), 0 0 55px rgba(34,211,238,0.55)",
                }}
                animate={{
                  y: [-20, -760],
                  x: [0, i % 2 === 0 ? 70 : -70],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.35, 0.5],
                }}
                transition={{
                  duration: 4 + (i % 5) * 0.35,
                  delay: i * 0.09,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}

            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`pricing-streak-${i}`}
                className="absolute h-[2px] w-40 rounded-full opacity-50"
                style={{
                  left: `${-15 + i * 10}%`,
                  top: `${18 + (i % 5) * 14}%`,
                  rotate: "-22deg",
                  background:
                    i % 2 === 0
                      ? "linear-gradient(90deg, transparent, rgba(139,92,246,0.9), transparent)"
                      : "linear-gradient(90deg, transparent, rgba(34,211,238,0.85), transparent)",
                  filter: "blur(1px)",
                }}
                animate={{ x: [0, 420], opacity: [0, 0.75, 0] }}
                transition={{ duration: 5 + (i % 4), delay: i * 0.35, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </div>

          <div className="relative mx-auto max-w-7xl">
            <SectionTag number="01" title="WEBSITE DESIGN" />
            <div className="text-center">
              <SectionLabel>WEBSITE PACKAGES</SectionLabel>
              <h2 className="mt-3 text-4xl font-black md:text-5xl">Simple pricing. Clean results.</h2>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {websitePackages.map((pack) => <PackageCard key={pack.title} pack={pack} variant="website" icon={<Rocket />} />)}
            </div>
          </div>
        </section>
        </RevealSection>

        <SectionDivider dark />

        <RevealSection dark>
        <section id="upkeep" className="relative overflow-hidden px-6 py-24">
          <div className="pointer-events-none absolute inset-0 bg-[#0b1020]" />
          <SlidingGrid dark />
          <motion.div animate={{ x: [0, 60, 0], y: [0, -30, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute left-[5%] top-[10%] h-80 w-80 rounded-full bg-cyan-400/10 blur-[120px]" />
          <motion.div animate={{ x: [0, -50, 0], y: [0, 40, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute right-[5%] bottom-[5%] h-96 w-96 rounded-full bg-violet-500/10 blur-[140px]" />
          <motion.div animate={{ x: [0, 40, 0], y: [0, -25, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-violet-500/20 blur-[90px]" />
          <motion.div animate={{ x: [0, -45, 0], y: [0, 30, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute right-[10%] bottom-[10%] h-80 w-80 rounded-full bg-cyan-400/15 blur-[100px]" />
          <div className="relative mx-auto max-w-7xl">
            <SectionTag number="02" title="MONTHLY SUPPORT" dark />
            <div className="mb-10 text-center">
              <SectionLabel dark>MONTHLY UPKEEP</SectionLabel>
              <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">Keep your website fresh after launch.</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/70 hover:text-white">Upkeep plans give you ongoing support, updates, and revision flexibility based on how often you need changes made.</p>
            </div>
            <div className="relative grid gap-6 lg:grid-cols-3">
              {upkeepPackages.map((pack) => <PackageCard key={pack.title} pack={pack} dark icon={<Zap />} />)}
            </div>
          </div>
        </section>
        </RevealSection>

        <SectionDivider dark />

        <RevealSection dark>
        <section id="social" className="relative overflow-hidden bg-[#07111f] py-24 text-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.2),transparent_34%),linear-gradient(135deg,#07111f,#0b1020_50%,#081827)]" />

          {[...Array(16)].map((_, i) => (
            <motion.div
              key={`social-orbit-${i}`}
              className="pointer-events-none absolute rounded-full border border-white/10"
              style={{
                width: `${120 + i * 26}px`,
                height: `${120 + i * 26}px`,
                left: `${-8 + (i % 4) * 28}%`,
                top: `${-12 + (i % 5) * 24}%`,
              }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360, opacity: [0.06, 0.16, 0.06] }}
              transition={{ duration: 18 + i, repeat: Infinity, ease: "linear" }}
            />
          ))}

          {[...Array(22)].map((_, i) => (
            <motion.div
              key={`social-post-${i}`}
              className="pointer-events-none absolute rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-md"
              style={{
                width: `${70 + (i % 4) * 24}px`,
                height: `${44 + (i % 3) * 18}px`,
                left: `${-5 + (i * 9) % 105}%`,
                top: `${8 + (i * 13) % 78}%`,
              }}
              animate={{
                y: [0, -28, 0],
                x: [0, i % 2 === 0 ? 18 : -18, 0],
                opacity: [0.08, 0.22, 0.08],
              }}
              transition={{ duration: 7 + (i % 5), repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
            />
          ))}

          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`social-signal-${i}`}
              className="pointer-events-none absolute h-[2px] rounded-full"
              style={{
                left: `${-15 + i * 10}%`,
                top: `${14 + (i % 6) * 13}%`,
                width: `${180 + (i % 3) * 80}px`,
                background:
                  i % 2 === 0
                    ? "linear-gradient(90deg,transparent,rgba(34,211,238,0.75),transparent)"
                    : "linear-gradient(90deg,transparent,rgba(139,92,246,0.75),transparent)",
                rotate: i % 2 === 0 ? "12deg" : "-12deg",
                filter: "blur(1px)",
              }}
              animate={{ x: [0, 300], opacity: [0, 0.7, 0] }}
              transition={{ duration: 5 + (i % 4), delay: i * 0.3, repeat: Infinity, ease: "linear" }}
            />
          ))}
          <div className="relative mx-auto max-w-7xl px-6">
            <SectionTag number="03" title="SOCIAL MEDIA" dark />
            <div className="mb-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <SectionLabel dark>SOCIAL MEDIA MANAGEMENT</SectionLabel>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-200 backdrop-blur-xl">
                  <Orbit size={16} /> Content • Graphics • Strategy • Growth
                </div>
                <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">Consistent content that actually looks premium.</h2>
              </div>
              <motion.p whileHover={{ scale: 1.01, y: -2 }} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-xl font-medium leading-9 text-white/70 backdrop-blur-xl hover:border-violet-400/30 hover:bg-white/[0.07] hover:text-white">
                We can run your social media posting, graphics, and updates for you. Depending on the package, your business gets more weekly posts, better custom graphics, account management, promotional content, branded posts, and more consistent updates across your platforms.
              </motion.p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {socialPackages.map((pack, index) => <PackageCard key={pack.title} pack={pack} dark variant="social" icon={index === 0 ? <Send /> : <Camera />} />)}
            </div>
          </div>
        </section>
        </RevealSection>

        <SectionDivider />

        <RevealSection className="relative">
        <section id="brief" className="relative mx-auto max-w-7xl px-6 py-24">
          <SectionTag number="04" title="PROJECT STRATEGY" />
          <div className="mb-12 text-center">
            <SectionLabel>PROJECT BRIEF</SectionLabel>
            <h2 className="mt-3 text-5xl font-black">Build your website around real strategy.</h2>
            <motion.p whileHover={{ scale: 1.01 }} className="mx-auto mt-5 max-w-3xl cursor-default text-xl leading-9 text-slate-600 hover:text-slate-900">
              Tell us about your business, competitors, branding, positioning, goals, and what makes you different so your website is actually built around your brand instead of looking generic.
            </motion.p>
          </div>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative overflow-hidden rounded-[2rem] bg-[#0b1020] p-8 text-white shadow-2xl shadow-violet-200/20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.3),transparent_42%)]" />
              <div className="relative">
                <ClipboardList className="mb-8 text-violet-300" size={40} />
                <h3 className="text-3xl font-black">What we look for</h3>
                <div className="mt-8 grid gap-4">
                  {strategyItems.map((item) => <div key={item} className="rounded-2xl bg-white/8 p-4 font-semibold text-white/85 transition-all duration-300 hover:scale-[1.03] hover:bg-white/15 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]">{item}</div>)}
                </div>
              </div>
            </div>
            <form onSubmit={submitBrief} className="group rounded-[2rem] border border-black/10 bg-white p-8 shadow-2xl shadow-violet-100/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_70px_rgba(139,92,246,0.18)]">
              <div className="grid gap-4 md:grid-cols-2">
                <Field name="name" value={form.name} onChange={handleChange} placeholder="Your Name" />
                <Field name="business" value={form.business} onChange={handleChange} placeholder="Business Name" />
                <Field name="email" value={form.email} onChange={handleChange} placeholder="Email Address" />
                <Field name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" />
                <Field name="website" value={form.website} onChange={handleChange} placeholder="Current Website" className="md:col-span-2" />
                <select name="package" value={form.package} onChange={handleChange} className="w-full rounded-2xl border border-black/10 bg-slate-50/80 px-4 py-4 font-medium outline-none transition-all duration-300 hover:scale-[1.01] hover:border-violet-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.12)] focus:border-violet-500 focus:bg-white focus:shadow-lg focus:shadow-violet-100 md:col-span-2">
                  <option>Starter Website</option>
                  <option>Business Website</option>
                  <option>Premium Website</option>
                  <option>Website + Monthly Upkeep</option>
                  <option>Social Media Management</option>
                  <option>Website + Social Media</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div className="mt-4 grid gap-4">
                <Field as="textarea" name="goals" value={form.goals} onChange={handleChange} placeholder="What are your website goals?" />
                <Field as="textarea" name="branding" value={form.branding} onChange={handleChange} placeholder="Do you have branding guidelines or a style guide?" />
                <Field as="textarea" name="positioning" value={form.positioning} onChange={handleChange} placeholder="What is your positioning in the marketplace?" />
                <Field as="textarea" name="competitors" value={form.competitors} onChange={handleChange} placeholder="Who are your competitors?" />
                <Field as="textarea" name="competitorAnalysis" value={form.competitorAnalysis} onChange={handleChange} placeholder="Have you done competitor analysis before?" />
                <Field as="textarea" name="differentiation" value={form.differentiation} onChange={handleChange} placeholder="What makes your business different?" />
                <Field as="textarea" name="advantage" value={form.advantage} onChange={handleChange} placeholder="Do you have any unfair advantage we should highlight?" />
                <Field as="textarea" name="style" value={form.style} onChange={handleChange} placeholder="What style/design direction do you want?" />
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={copyBrief} className="rounded-2xl border border-black/10 bg-white px-6 py-4 font-black text-[#0b1020] transition hover:scale-[1.01] hover:shadow-xl">Copy Brief</button>
                <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0b1020] px-6 py-4 font-black text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60">
                  {isSubmitting ? "Sending..." : "Submit Brief"} <ArrowRight size={18} />
                </button>
              </div>
              {message && <p className="mt-4 rounded-2xl bg-violet-50 p-4 text-center text-sm font-semibold text-violet-900">{message}</p>}
            </form>
          </div>
        </section>
        </RevealSection>

        <SectionDivider />

        <RevealSection>
        <section id="creator" className="relative mx-auto max-w-7xl px-6 py-20">
          <SectionTag number="05" title="MEET THE CREATOR" />
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white p-5 shadow-2xl shadow-violet-100/60">
              <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} src="/james-rizzo.png" alt="James Rizzo" className="aspect-[4/5] w-full rounded-[1.5rem] object-cover object-top" />
            </div>
            <div className="group rounded-[2rem] bg-[#0b1020] p-8 text-white shadow-2xl shadow-violet-300/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_80px_rgba(139,92,246,0.3)]">
              <p className="text-sm font-black tracking-[0.3em] text-violet-300">MEET THE CREATOR</p>
              <h2 className="mt-3 text-4xl font-black">Built by James Rizzo.</h2>
              <motion.p whileHover={{ x: 3 }} className="mt-5 cursor-default leading-8 text-white/70 hover:text-white">James Rizzo is a Computer Science student at Monmouth University, football player, and AI-focused builder with hands-on experience in web design, AI, marketing, and brand strategy.</motion.p>
              <motion.p whileHover={{ x: 3 }} className="mt-4 cursor-default leading-8 text-white/70 hover:text-white">He has helped make AI for Pixie Dust Labs, Emissaries AI, and Veritas AI, while also supporting marketing, design, LinkedIn campaigns, branding, and website development.</motion.p>
            </div>
          </div>
        </section>
        </RevealSection>

        <SectionDivider dark />

        <RevealSection dark>
        <section className="relative mx-auto max-w-7xl px-6 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 80, filter: "blur(18px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative overflow-hidden rounded-[2.5rem] border border-black/10 bg-gradient-to-br from-violet-600 via-[#0b1020] to-cyan-500 p-[1px] shadow-[0_0_90px_rgba(139,92,246,0.25)]">
            <div className="relative rounded-[2.5rem] bg-[#0b1020] px-8 py-16 text-center text-white md:px-16">
              <SlidingGrid dark />
              <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl">
                <Rocket className="h-12 w-12 text-violet-300" />
              </motion.div>
              <div className="relative">
                <p className="text-sm font-black tracking-[0.35em] text-violet-300">ELEVATE YOUR DIGITAL PRESENCE</p>
                <h2 className="mx-auto mt-4 max-w-4xl text-5xl font-black leading-[1.05] md:text-7xl">Make your business impossible to ignore.</h2>
                <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-white/70 hover:text-white">Premium websites, social media campaigns, branding strategy, animations, and modern design systems built to make your business stand out instantly.</p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <a href="#brief" className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-5 text-lg font-black text-[#0b1020] transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_45px_rgba(255,255,255,0.35)]">Start Your Project <ArrowRight size={20} /></a>
                  <a href="mailto:elevate.digital.rizzo@gmail.com" className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-8 py-5 text-lg font-black text-white backdrop-blur transition-all duration-300 hover:scale-[1.05] hover:bg-white/10">Contact Elevate Digital</a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
        </RevealSection>

        <footer id="contact" className="border-t border-black/10 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-10 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xl font-black">ELEVATE DIGITAL™</p>
              <p className="mt-2 text-slate-500 hover:text-slate-900">Web design • Social media • Branding</p>
            </div>
            <div className="space-y-3 text-sm font-semibold">
              <a href="mailto:elevate.digital.rizzo@gmail.com?subject=Website%20Inquiry%20-%20Elevate%20Digital" className="flex items-center gap-3 hover:translate-x-1 hover:text-violet-700"><Mail size={18} /> elevate.digital.rizzo@gmail.com</a>
              <a href="tel:9739795642" className="flex items-center gap-3 hover:translate-x-1 hover:text-violet-700"><Phone size={18} /> 973-979-5642</a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
