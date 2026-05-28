"use client";

import { useMemo, useState } from "react";
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

const EMAILJS_SERVICE_ID = "service_0sdfe3l";
const EMAILJS_TEMPLATE_ID = "template_ax8yp79";
const EMAILJS_PUBLIC_KEY = "0AWApgZEG97uVMqJA";

const websitePackages = [
  {
    title: "Basic",
    price: "$450 – $800",
    popular: false,
    features: [
      "1 custom-designed landing page",
      "Mobile responsive layout",
      "Professional contact form",
      "Basic SEO + Google indexing",
      "Clean branded design",
      "Fast turnaround",
      "Unlimited revisions with upkeep plan",
    ],
  },
  {
    title: "Business",
    price: "$900 – $1,500",
    popular: true,
    features: [
      "3–5 fully custom pages",
      "Modern premium layout",
      "Booking/contact integrations",
      "Google Maps + business setup",
      "Branded graphics and visuals",
      "Basic animations + effects",
      "Mobile optimization",
      "Unlimited revisions with upkeep plan",
    ],
  },
  {
    title: "Premium",
    price: "$1,600 – $2,400",
    popular: false,
    features: [
      "Fully custom high-end website",
      "Advanced animations + interactions",
      "Custom branding direction",
      "Lead generation optimization",
      "Performance + speed optimization",
      "Priority support + updates",
      "Premium visual effects",
      "Custom sections and integrations",
      "Unlimited revisions with upkeep plan",
    ],
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

const navItems = [
  ["Work", "#work"],
  ["Pricing", "#pricing"],
  ["Social Media", "#social"],
  ["Project Brief", "#brief"],
];

function Field({ as = "input", name, value, onChange, placeholder, className = "" }) {
  const base =
    "w-full rounded-2xl border border-black/10 bg-slate-50/90 px-4 py-4 font-medium outline-none transition-all duration-300 hover:border-violet-300 focus:border-violet-500 focus:bg-white focus:shadow-lg focus:shadow-violet-100";

  if (as === "textarea") {
    return <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} className={`${base} min-h-28 ${className}`} />;
  }

  return <input name={name} value={value} onChange={onChange} placeholder={placeholder} className={`${base} ${className}`} />;
}

function SectionLabel({ children, dark = false }) {
  return <p className={`text-sm font-black tracking-[0.3em] ${dark ? "text-violet-300" : "text-violet-700"}`}>{children}</p>;
}

function SectionTag({ number, title, dark = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      className={`mb-8 inline-flex items-center gap-3 rounded-full border px-4 py-2 text-xs font-black tracking-[0.22em] backdrop-blur-xl ${
        dark ? "border-white/10 bg-white/5 text-white/70" : "border-black/10 bg-white/70 text-slate-500 shadow-sm"
      }`}
    >
      <span className={dark ? "text-violet-300" : "text-violet-700"}>{number}</span>
      <span>{title}</span>
    </motion.div>
  );
}

function RevealSection({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 55, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.18 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

function SlidingGrid({ dark = false }) {
  return (
    <motion.div
      animate={{ backgroundPosition: ["0px 0px", "140px 140px"] }}
      transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      className={`pointer-events-none absolute inset-0 ${dark ? "opacity-[0.16]" : "opacity-[0.09]"}`}
      style={{
        backgroundImage: dark
          ? "linear-gradient(to right, rgba(255,255,255,0.75) 2px, transparent 2px), linear-gradient(to bottom, rgba(255,255,255,0.75) 2px, transparent 2px)"
          : "linear-gradient(to right, rgba(139,92,246,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,92,246,0.25) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
      }}
    />
  );
}

function DataHighways() {
  const stars = [
    { top: "12%", left: "-8%", delay: 0, color: "violet" },
    { top: "24%", left: "8%", delay: 0.6, color: "cyan" },
    { top: "38%", left: "-4%", delay: 1.2, color: "violet" },
    { top: "56%", left: "18%", delay: 1.8, color: "cyan" },
    { top: "72%", left: "4%", delay: 2.4, color: "violet" },
    { top: "84%", left: "30%", delay: 3.0, color: "cyan" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute h-[2px] w-24 rounded-full"
          style={{
            top: star.top,
            left: star.left,
            rotate: "-18deg",
            background:
              star.color === "violet"
                ? "linear-gradient(90deg, transparent, rgba(139,92,246,0.95), rgba(255,255,255,0.95))"
                : "linear-gradient(90deg, transparent, rgba(34,211,238,0.9), rgba(255,255,255,0.9))",
            boxShadow:
              star.color === "violet"
                ? "0 0 20px rgba(139,92,246,0.8)"
                : "0 0 20px rgba(34,211,238,0.75)",
          }}
          animate={{ x: [0, 650], y: [0, -205], opacity: [0, 1, 0], scaleX: [0.35, 1, 0.2] }}
          transition={{ duration: 2.4, delay: star.delay, repeat: Infinity, repeatDelay: 2.2, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function PackageCard({ pack, dark = false, icon }) {
  const websiteCard = ["Basic", "Business", "Premium"].includes(pack.title);

  return (
    <motion.div
      whileHover={{ y: -14, scale: 1.03 }}
      className={`group relative overflow-hidden rounded-[2rem] border p-8 transition-all duration-300 before:absolute before:inset-0 before:-translate-x-[130%] before:bg-gradient-to-r before:from-transparent before:via-white/45 before:to-transparent before:transition-transform before:duration-1000 hover:before:translate-x-[130%] ${
        dark
          ? "border-white/10 bg-white/5 text-white shadow-xl shadow-violet-500/10 backdrop-blur-xl hover:bg-white/10 hover:shadow-[0_0_90px_rgba(167,139,250,0.25)]"
          : "border-black/10 bg-white text-[#090b13] shadow-xl shadow-violet-100/40 hover:shadow-[0_0_95px_rgba(139,92,246,0.28)]"
      }`}
    >
      {websiteCard && (
        <>
          <motion.div
            className="pointer-events-none absolute -left-24 top-0 h-full w-20 rotate-12 bg-gradient-to-r from-transparent via-violet-300/45 to-transparent blur-md"
            animate={{ x: [-120, 520] }}
            transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-300/25 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2.8, repeat: Infinity }}
          />
          <motion.div
            className="pointer-events-none absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-violet-400/25 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            animate={{ scale: [1.15, 1, 1.15] }}
            transition={{ duration: 3.2, repeat: Infinity }}
          />
        </>
      )}

      {pack.popular && <div className="absolute right-5 top-5 z-20 rounded-full bg-violet-700 px-4 py-2 text-xs font-black tracking-widest text-white">MOST POPULAR</div>}
      <motion.div
        whileHover={{ rotate: pack.title === "Basic" ? -8 : pack.title === "Business" ? 0 : 10, scale: 1.14 }}
        className={`relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${dark ? "bg-white/10 text-violet-300" : "bg-violet-100 text-violet-700"} shadow-lg shadow-violet-500/10`}
      >
        {icon}
      </motion.div>
      <h3 className="text-2xl font-black">{pack.title}</h3>
      <p className={`mt-4 text-4xl font-black ${dark ? "text-violet-300" : "text-violet-700"}`}>{pack.price}</p>
      <div className="mt-6 space-y-4">
        {pack.features.map((feature) => (
          <div key={feature} className="flex gap-3">
            <Check size={18} className={dark ? "text-violet-300" : "text-violet-700"} />
            <p className={dark ? "text-white/70" : "text-slate-700"}>{feature}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Home() {
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

  const plainFormBody = useMemo(() => {
    return `Name: ${form.name}
Business: ${form.business}
Email: ${form.email}
Phone: ${form.phone}
Current Website: ${form.website}
Package Interest: ${form.package}

Website Goals:
${form.goals}

Brand Style:
${form.branding}

Customer Impression:
${form.positioning}

Competitors / Inspiration:
${form.competitors}

Likes / Dislikes:
${form.competitorAnalysis}

Differentiation:
${form.differentiation}

Standout Advantage:
${form.advantage}

Preferred Style:
${form.style}`;
  }, [form]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(plainFormBody);
      setMessage("Project brief copied.");
    } catch {
      setMessage("Could not copy automatically. Please email elevate.digital.rizzo@gmail.com directly.");
    }
  };

  const copyPhone = () => {
    const phoneNumber = "973-979-5642";
    const fallbackCopy = () => {
      const textArea = document.createElement("textarea");
      textArea.value = phoneNumber;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setMessage("Phone number copied: 973-979-5642");
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(phoneNumber).then(() => setMessage("Phone number copied: 973-979-5642")).catch(fallbackCopy);
    } else {
      fallbackCopy();
    }
  };

  const submitBrief = async (event) => {
    event.preventDefault();

    if (!form.name || !form.business || !form.email) {
      setMessage("Please add your name, business name, and email before submitting.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: "elevate.digital.rizzo@gmail.com",
          from_name: form.name,
          business_name: form.business,
          from_email: form.email,
          phone: form.phone,
          current_website: form.website,
          package_interest: form.package,
          message: plainFormBody,
        },
        EMAILJS_PUBLIC_KEY
      );
      setMessage("Project brief sent. We’ll reach out soon.");
      setForm({ name: "", business: "", email: "", phone: "", website: "", package: "Business Website", goals: "", branding: "", positioning: "", competitors: "", competitorAnalysis: "", differentiation: "", advantage: "", style: "" });
    } catch {
      setMessage("Something went wrong sending the form. Please email elevate.digital.rizzo@gmail.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#f8f8fb] text-[#090b13] selection:bg-violet-200/60">
      <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 8, repeat: Infinity }} className="pointer-events-none fixed left-0 top-0 z-0 h-[32rem] w-[32rem] rounded-full bg-violet-500/10 blur-[120px]" />
      <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 10, repeat: Infinity }} className="pointer-events-none fixed right-0 top-0 z-0 h-[26rem] w-[26rem] rounded-full bg-cyan-400/10 blur-[120px]" />

      <section className="relative overflow-hidden border-b border-black/5 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.18),transparent_25%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_30%),linear-gradient(135deg,#f7f7ff_0%,#eef2ff_35%,#edf7ff_70%,#f8f8ff_100%)]">
        <DataHighways />
        <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div>
            <p className="text-lg font-black tracking-[0.18em]">ELEVATE DIGITAL™</p>
            <p className="text-xs font-semibold tracking-[0.28em] text-violet-700">WEB DESIGN • SOCIAL MEDIA • BRAND STRATEGY</p>
          </div>
          <div className="hidden items-center gap-6 text-sm font-bold text-slate-600 md:flex">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="hover:text-violet-700">{label}</a>
            ))}
            <a href="#contact" className="rounded-full bg-[#0b1020] px-5 py-3 text-white">Contact</a>
          </div>
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <motion.h1
              className="max-w-4xl cursor-default text-5xl font-black leading-[0.95] tracking-tight md:text-7xl"
              whileHover={{ scale: 1.015 }}
            >
              {"Websites built around what makes your brand different.".split(" ").map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  className="mr-3 inline-block"
                  whileHover={{ y: -8, scale: 1.08, color: "#6d28d9", textShadow: "0 0 24px rgba(139,92,246,0.35)" }}
                  transition={{ duration: 0.18 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Clean web design, social media posting, branded graphics, and digital strategy for businesses that want to look more professional online.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#brief" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0b1020] px-6 py-4 font-bold text-white shadow-xl shadow-violet-500/20 hover:scale-[1.04]">Start Website Brief <ArrowRight size={18} /></a>
              <a href="#work" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-black/10 bg-white px-6 py-4 font-bold shadow-sm hover:scale-[1.04]">See Our Work</a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative overflow-hidden rounded-[2rem] border border-violet-200/40 bg-gradient-to-br from-violet-50/90 via-white/85 to-cyan-50/90 p-5 shadow-2xl shadow-violet-200/50 backdrop-blur-xl">
            <div className="relative grid gap-5 lg:grid-cols-2">
              <div className="rounded-[1.7rem] border border-white/10 bg-[#0b1020] p-6 text-white shadow-xl shadow-violet-500/10">
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(74,222,128,0.9)]" />
                  <p className="text-sm font-black tracking-[0.25em] text-emerald-300">ONLINE PRESENCE</p>
                </div>
                <h2 className="text-3xl font-black leading-tight text-white xl:text-4xl">Your brand should look professional online.</h2>
                <p className="mt-5 text-base leading-8 text-white/70">Websites, social media, and branded visuals built to make your business look clean and trustworthy.</p>
                <div className="mt-6 grid gap-3">
                  {["Modern website", "Clean social media", "Professional brand"].map((item) => (
                    <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <span className="font-bold text-white/85">{item}</span>
                      <Check size={18} className="text-violet-300" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.7rem] border border-white/10 bg-gradient-to-br from-[#1b1640] via-[#111827] to-[#063142] p-6 text-white shadow-xl shadow-cyan-500/10">
                <p className="text-sm font-black tracking-[0.25em] text-violet-300">DIGITAL PRESENCE</p>
                <h3 className="mt-3 text-3xl font-black leading-tight">Social platforms covered.</h3>
                <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-[#0b1020]/80 p-6">
                  <p className="mx-auto mb-6 max-w-md text-center text-base font-semibold leading-7 text-white/70">Website, branding, and social media working together in one clean online presence.</p>
                  <div className="mx-auto flex flex-wrap items-center justify-center gap-4">
                    {[
                      ["IG", "bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400"],
                      ["f", "bg-blue-600"],
                      ["X", "bg-neutral-950"],
                      ["♪", "bg-gradient-to-br from-neutral-900 to-red-950"],
                      ["in", "bg-[#0077B5]"],
                    ].map(([label, gradient]) => (
                      <motion.div key={label} whileHover={{ y: -6, scale: 1.08 }} className={`flex h-16 w-16 items-center justify-center rounded-2xl ${gradient} text-2xl font-black text-white shadow-lg shadow-black/30`}>{label}</motion.div>
                    ))}
                  </div>
                  <p className="mt-6 text-center text-xs font-bold tracking-[0.14em] text-white/45">SOCIAL MEDIA + WEBSITE + BRANDING</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <RevealSection>
        <section id="services" className="relative overflow-hidden bg-[linear-gradient(135deg,#f8f8ff_0%,#eef2ff_40%,#edf7ff_100%)] px-6 py-28">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[...Array(14)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ x: [0, i % 2 === 0 ? 80 : -80, 0], y: [0, i % 2 === 0 ? -45 : 45, 0], rotate: [0, i % 2 === 0 ? 8 : -8, 0] }}
                transition={{ duration: 10 + i, repeat: Infinity, ease: "easeInOut" }}
                className="absolute border border-white/30 bg-white/15 opacity-90 backdrop-blur-3xl"
                style={{
                  width: `${260 + i * 70}px`,
                  height: `${180 + i * 45}px`,
                  left: `${-8 + (i * 12) % 100}%`,
                  top: `${6 + (i * 10) % 82}%`,
                  borderRadius: `${48 + i * 4}px`,
                  background: i % 2 === 0 ? "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(255,255,255,0.08))" : "linear-gradient(135deg, rgba(34,211,238,0.26), rgba(255,255,255,0.06))",
                  boxShadow: i % 2 === 0 ? "0 0 160px rgba(139,92,246,0.32)" : "0 0 160px rgba(34,211,238,0.28)",
                }}
              />
            ))}
          </div>

          <div className="relative mx-auto max-w-7xl">
            <SectionTag number="01" title="WHAT WE DO" />
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <SectionLabel>DIGITAL PRESENCE</SectionLabel>
                <h2 className="mt-4 text-5xl font-black leading-tight md:text-6xl">We do more than make a site look good.</h2>
                <p className="mt-6 text-xl leading-9 text-slate-600">Elevate Digital helps businesses build a stronger digital presence through modern websites, social media management, branded visuals, and professional online presentation.</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  ["Brand Presence", "Create a professional online presence that instantly builds trust with customers."],
                  ["Website Design", "Build clean, mobile-friendly websites that guide visitors toward action."],
                  ["Social Content", "Create branded posts and graphics so your business looks active and professional."],
                  ["Digital Branding", "Modern visuals, graphics, and content that make your business look established online."],
                ].map(([title, text], i) => (
                  <motion.div key={title} whileHover={{ y: -8, scale: 1.03 }} className="group relative overflow-hidden rounded-[1.9rem] border border-white/30 bg-white/35 p-6 shadow-[0_0_50px_rgba(139,92,246,0.08)] backdrop-blur-2xl transition-all duration-300 before:absolute before:inset-0 before:-translate-x-[130%] before:bg-gradient-to-r before:from-transparent before:via-white/45 before:to-transparent before:transition-transform before:duration-1000 hover:border-violet-300 hover:shadow-[0_0_85px_rgba(139,92,246,0.25)] hover:before:translate-x-[130%]">
                    <motion.div whileHover={{ rotate: 8, scale: 1.14 }} className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/60 text-violet-700 shadow-lg shadow-violet-500/10">
                      {i === 0 ? <Layers3 /> : i === 1 ? <Globe /> : i === 2 ? <Camera /> : <Rocket />}
                    </motion.div>
                    <motion.h3 whileHover={{ x: 4, color: "#6d28d9" }} className="relative z-10 text-2xl font-black">{title}</motion.h3>
                    <p className="relative z-10 mt-3 leading-7 text-slate-700 transition group-hover:text-slate-950">{text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      <RevealSection>
        <section id="work" className="relative overflow-hidden bg-[linear-gradient(180deg,#050816_0%,#091120_55%,#0c1426_100%)] px-6 py-28 text-white">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div animate={{ opacity: [0.45, 0.75, 0.45], scale: [1, 1.08, 1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-[140px]" />
            {[...Array(50)].map((_, i) => (
              <motion.div key={i} className="absolute rounded-full bg-white" style={{ width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`, left: `${(i * 9) % 100}%`, top: `${(i * 13) % 100}%`, boxShadow: i % 2 === 0 ? "0 0 20px rgba(139,92,246,0.9)" : "0 0 20px rgba(34,211,238,0.8)" }} animate={{ y: [0, -30, 0], opacity: [0.15, 0.9, 0.15], scale: [0.6, 1.3, 0.6] }} transition={{ duration: 4 + (i % 5), delay: i * 0.08, repeat: Infinity }} />
            ))}
          </div>
          <div className="relative mx-auto max-w-7xl">
            <SectionTag number="01" title="FEATURED WORK" dark />
            <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <motion.div whileHover={{ x: 6, scale: 1.01 }} transition={{ duration: 0.2 }}>
                  <SectionLabel dark>ELEVATE DIGITAL CASE STUDY</SectionLabel>
                </motion.div>
                <motion.h2
                  whileHover={{ x: 8, color: "#c4b5fd", textShadow: "0 0 30px rgba(167,139,250,0.35)" }}
                  transition={{ duration: 0.2 }}
                  className="mt-4 cursor-default text-5xl font-black leading-tight text-white md:text-6xl"
                >
                  Veritas AI Website
                </motion.h2>
                <motion.p
                  whileHover={{ x: 6, scale: 1.015, color: "#ffffff" }}
                  transition={{ duration: 0.2 }}
                  className="mt-6 max-w-2xl cursor-default text-2xl font-black leading-9 text-white"
                >
                  A LIVE CLIENT WEBSITE DESIGNED AND DEVELOPED BY ELEVATE DIGITAL.
                </motion.p>
                <motion.p
                  whileHover={{ x: 5, color: "rgba(255,255,255,0.9)" }}
                  transition={{ duration: 0.2 }}
                  className="mt-4 max-w-2xl cursor-default text-lg leading-8 text-white/65"
                >
                  This is real client work built to make Veritas AI look modern, credible, and enterprise-ready online.
                </motion.p>
                <motion.div whileHover={{ y: -6, scale: 1.02 }} className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/5 p-7 shadow-[0_0_60px_rgba(139,92,246,0.15)] backdrop-blur-2xl transition hover:border-violet-300/40 hover:shadow-[0_0_85px_rgba(139,92,246,0.28)]">
                  <p className="text-sm font-black tracking-[0.22em] text-violet-300">CLIENT TESTIMONIAL</p>
                  <h3 className="mt-3 text-3xl font-black text-white">Veritas AI</h3>
                  <p className="mt-4 text-lg leading-8 text-white/70">“Elevate Digital made our company look far more modern and professional online.”</p>
                  <div className="mt-5 flex items-center gap-4">
                    <div className="flex gap-1 text-violet-300">{[...Array(5)].map((_, i) => <Sparkles key={i} size={18} fill="currentColor" />)}</div>
                    <p className="font-black text-white">Website designed by Elevate Digital</p>
                  </div>
                </motion.div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="https://veritas.emissaries.ai/" target="_blank" rel="noopener noreferrer" className="group relative z-[999] inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-7 py-5 text-lg font-black text-white shadow-xl shadow-violet-500/25 transition hover:scale-[1.04] hover:shadow-[0_0_50px_rgba(139,92,246,0.38)]">View Live Veritas Website <ArrowRight size={20} /></a>
                  <a href="#brief" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-7 py-5 text-lg font-black text-white backdrop-blur-xl transition hover:scale-[1.04] hover:bg-white/15">Start a Similar Project</a>
                </div>
              </div>
              <motion.div whileHover={{ y: -10, rotateX: 4, rotateY: -4, scale: 1.02 }} className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#0b1020] p-4 shadow-[0_0_120px_rgba(139,92,246,0.18)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.35),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.22),transparent_34%)]" />
                <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                  <div className="mb-5 flex items-center justify-between"><div className="flex gap-2"><div className="h-3 w-3 rounded-full bg-red-400/80" /><div className="h-3 w-3 rounded-full bg-yellow-300/80" /><div className="h-3 w-3 rounded-full bg-emerald-400/80" /></div><p className="text-xs font-black tracking-[0.22em] text-white/50">VERITAS.EMISSARIES.AI</p></div>
                  <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="rounded-[1.5rem] bg-white p-5 text-[#0b1020]"><p className="text-xs font-black tracking-[0.25em] text-violet-700">WEBSITE CREATED BY ELEVATE DIGITAL</p><h3 className="mt-3 text-3xl font-black leading-tight">AI-powered claims validation for pharma marketing.</h3><p className="mt-4 leading-7 text-slate-600">Positioned for medical, legal, regulatory, and brand teams that need faster evidence-backed review.</p></div>
                    <div className="grid gap-4">{[["Modern Design", "Clean modern layout built for a real AI company."], ["Professional Feel", "Made to look trustworthy and high-end."], ["Custom Built", "Designed specifically for Veritas AI by Elevate Digital."]].map(([title, text], i) => <div key={title} className="rounded-[1.4rem] border border-white/10 bg-white/10 p-5 text-white backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/15 hover:shadow-[0_0_45px_rgba(34,211,238,0.18)]"><p className="text-sm font-black tracking-[0.22em] text-cyan-200">0{i + 1}</p><motion.p whileHover={{ x: 4, color: "#a5f3fc" }} className="mt-2 text-2xl font-black">{title}</motion.p><p className="mt-3 leading-7 text-white/70 transition hover:text-white">{text}</p></div>)}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </RevealSection>

      <RevealSection>
        <section id="pricing" className="relative overflow-hidden bg-[#eef2ff] px-6 py-32">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div key={i} animate={{ y: [0, i % 2 === 0 ? -40 : 40, 0], x: [0, i % 2 === 0 ? 25 : -25, 0] }} transition={{ duration: 10 + i, repeat: Infinity }} className="absolute rounded-[2.5rem] border border-white/30 backdrop-blur-3xl" style={{ width: `${260 + (i % 4) * 80}px`, height: `${160 + (i % 3) * 60}px`, left: `${-8 + (i * 11) % 100}%`, top: `${4 + (i * 9) % 88}%`, background: i % 2 === 0 ? "linear-gradient(135deg, rgba(139,92,246,0.22), rgba(255,255,255,0.08))" : "linear-gradient(135deg, rgba(34,211,238,0.18), rgba(255,255,255,0.06))", opacity: 0.8 }} />
            ))}
          </div>
          <div className="relative mx-auto max-w-7xl">
            <SectionTag number="02" title="WEBSITE DESIGN" />
            <div className="text-center"><SectionLabel>WEBSITE PACKAGES</SectionLabel><h2 className="mt-3 text-4xl font-black md:text-5xl">Simple pricing. Clean results.</h2></div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {websitePackages.map((pack, index) => (
                <PackageCard
                  key={pack.title}
                  pack={pack}
                  icon={
                    index === 0 ? (
                      <Rocket size={25} className="-rotate-45" />
                    ) : index === 1 ? (
                      <Rocket size={28} className="rotate-0 drop-shadow-[0_0_10px_rgba(139,92,246,0.45)]" />
                    ) : (
                      <Rocket size={31} className="rotate-45 drop-shadow-[0_0_14px_rgba(34,211,238,0.6)]" />
                    )
                  }
                />
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      <RevealSection>
        <section id="upkeep" className="relative overflow-hidden px-6 py-24">
          <div className="pointer-events-none absolute inset-0 bg-[#0b1020]" />
          <SlidingGrid dark />
          <div className="relative mx-auto max-w-7xl">
            <SectionTag number="03" title="MONTHLY SUPPORT" dark />
            <div className="mb-10 text-center"><SectionLabel dark>MONTHLY UPKEEP</SectionLabel><h2 className="mt-3 text-4xl font-black text-white md:text-5xl">Keep your website fresh after launch.</h2><p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/70">Upkeep plans give you ongoing support, updates, and revision flexibility based on how often you need changes made.</p></div>
            <div className="relative grid gap-6 lg:grid-cols-3">{upkeepPackages.map((pack) => <PackageCard key={pack.title} pack={pack} dark icon={<Zap />} />)}</div>
          </div>
        </section>
      </RevealSection>

      <RevealSection>
        <section id="social" className="relative overflow-hidden bg-[#07111f] py-24 text-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.2),transparent_34%),linear-gradient(135deg,#07111f,#0b1020_50%,#081827)]" />
          <div className="relative mx-auto max-w-7xl px-6">
            <SectionTag number="04" title="SOCIAL MEDIA" dark />
            <div className="mb-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div><SectionLabel dark>SOCIAL MEDIA MANAGEMENT</SectionLabel><div className="mt-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-200 backdrop-blur-xl"><Orbit size={16} /> Content • Graphics • Strategy • Growth</div><h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">Consistent content that actually looks premium.</h2></div>
              <p className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-xl font-medium leading-9 text-white/70 backdrop-blur-xl">We can run your social media posting, graphics, and updates for you. Depending on the package, your business gets more weekly posts, better custom graphics, account management, promotional content, branded posts, and more consistent updates across your platforms.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">{socialPackages.map((pack, index) => <PackageCard key={pack.title} pack={pack} dark icon={index === 0 ? <Send /> : <Camera />} />)}</div>
          </div>
        </section>
      </RevealSection>

      <RevealSection>
        <section id="brief" className="relative mx-auto max-w-7xl px-6 py-24">
          <SectionTag number="05" title="PROJECT STRATEGY" />
          <div className="mb-12 text-center"><SectionLabel>PROJECT BRIEF</SectionLabel><h2 className="mt-3 text-5xl font-black">Build your website around real strategy.</h2><p className="mx-auto mt-5 max-w-3xl text-xl leading-9 text-slate-600">Tell us about your business, competitors, branding, positioning, goals, and what makes you different so your website is actually built around your brand instead of looking generic.</p></div>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative h-fit overflow-hidden rounded-[2rem] bg-[#0b1020] p-7 text-white shadow-2xl shadow-violet-200/20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.3),transparent_42%)]" />
              <div className="relative"><ClipboardList className="mb-8 text-violet-300" size={40} /><h3 className="text-3xl font-black">Let’s plan your project.</h3><p className="mt-5 leading-8 text-white/75">Fill out the brief so we can understand your business, what you need, and how we can position your brand better online.</p>
                <div className="mt-8 rounded-[1.7rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"><p className="text-sm font-black tracking-[0.22em] text-violet-300">PREFER TO TALK FIRST?</p><h4 className="mt-3 text-2xl font-black">Schedule a Zoom consultation.</h4><p className="mt-3 leading-7 text-white/70">Book a quick Zoom meeting to go over your business, website goals, branding direction, and questions before starting.</p><a href="https://calendly.com/elevate-digital-rizzo/30min" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 font-black text-[#0b1020] hover:scale-[1.03]">Schedule Zoom Meeting <ArrowRight size={18} /></a></div>
                <div className="mt-6 grid gap-4">{["Free consultation call", "Website strategy planning", "Brand direction guidance", "Fast response times"].map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4"><Check size={18} className="text-violet-300" /><p className="font-semibold text-white/75">{item}</p></div>)}</div>
              </div>
            </div>

            <form onSubmit={submitBrief} className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-2xl shadow-violet-100/60">
              <div className="grid gap-4 md:grid-cols-2"><Field name="name" value={form.name} onChange={handleChange} placeholder="Your Name" /><Field name="business" value={form.business} onChange={handleChange} placeholder="Business Name" /><Field name="email" value={form.email} onChange={handleChange} placeholder="Email Address" /><Field name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" /><Field name="website" value={form.website} onChange={handleChange} placeholder="Current Website" className="md:col-span-2" /><select name="package" value={form.package} onChange={handleChange} className="w-full rounded-2xl border border-black/10 bg-slate-50/80 px-4 py-4 font-medium outline-none md:col-span-2"><option>Basic Website</option><option>Business Website</option><option>Premium Website</option><option>Website + Monthly Upkeep</option><option>Social Media Management</option><option>Website + Social Media</option><option>Not sure yet</option></select></div>
              <div className="mt-4 grid gap-4"><Field as="textarea" name="goals" value={form.goals} onChange={handleChange} placeholder="What are your website goals?" /><Field as="textarea" name="branding" value={form.branding} onChange={handleChange} placeholder="Describe your brand style, colors, or overall vibe." /><Field as="textarea" name="positioning" value={form.positioning} onChange={handleChange} placeholder="What do you want customers to think when they see your business?" /><Field as="textarea" name="competitors" value={form.competitors} onChange={handleChange} placeholder="Are there any websites or brands you like or compete with?" /><Field as="textarea" name="competitorAnalysis" value={form.competitorAnalysis} onChange={handleChange} placeholder="What do you like or dislike about other businesses in your space?" /><Field as="textarea" name="differentiation" value={form.differentiation} onChange={handleChange} placeholder="What makes your business different?" /><Field as="textarea" name="advantage" value={form.advantage} onChange={handleChange} placeholder="What makes your business stand out from everyone else?" /><Field as="textarea" name="style" value={form.style} onChange={handleChange} placeholder="What kind of website style are you looking for?" /></div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2"><button type="button" onClick={copyBrief} className="rounded-2xl border border-black/10 bg-white px-6 py-4 font-black text-[#0b1020] hover:shadow-xl">Copy Brief</button><button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0b1020] px-6 py-4 font-black text-white disabled:opacity-60">{isSubmitting ? "Sending..." : "Submit Brief"} <ArrowRight size={18} /></button></div>
              {message && <p className="mt-4 rounded-2xl bg-violet-50 p-4 text-center text-sm font-semibold text-violet-900">{message}</p>}
            </form>
          </div>
        </section>
      </RevealSection>

      <RevealSection>
        <section className="relative mx-auto max-w-7xl px-6 pb-10">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-black/10 bg-gradient-to-br from-violet-600 via-[#0b1020] to-cyan-500 p-[1px] shadow-[0_0_90px_rgba(139,92,246,0.25)]">
            <div className="relative rounded-[2.5rem] bg-[#0b1020] px-8 py-16 text-center text-white md:px-16"><SlidingGrid dark /><div className="relative"><p className="text-sm font-black tracking-[0.35em] text-violet-300">ELEVATE YOUR DIGITAL PRESENCE</p><h2 className="mx-auto mt-4 max-w-4xl text-5xl font-black leading-[1.05] md:text-7xl">Make your business impossible to ignore.</h2><p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-white/70">Premium websites, social media campaigns, branding strategy, animations, and modern design systems built to make your business stand out instantly.</p><div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"><a href="#brief" className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-5 text-lg font-black text-[#0b1020]">Start Your Project <ArrowRight size={20} /></a><a href="mailto:elevate.digital.rizzo@gmail.com" className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-8 py-5 text-lg font-black text-white backdrop-blur">Contact Elevate Digital</a></div></div></div>
          </div>
        </section>
      </RevealSection>

      <footer id="contact" className="border-t border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div><p className="text-xl font-black">ELEVATE DIGITAL™</p><p className="mt-2 text-slate-500">Web design • Social media • Branding</p></div>
          <div className="space-y-3 text-sm font-semibold">
            <a href="mailto:elevate.digital.rizzo@gmail.com?subject=Website%20Inquiry%20-%20Elevate%20Digital&body=Hi%20Elevate%20Digital%2C%0A%0AI%27m%20interested%20in%20working%20on%20a%20project.%0A%0A" className="flex items-center gap-3 hover:translate-x-1 hover:text-violet-700"><Mail size={18} /> elevate.digital.rizzo@gmail.com</a>
            <button type="button" onClick={copyPhone} className="flex items-center gap-3 text-left hover:translate-x-1 hover:text-violet-700"><Phone size={18} /> 973-979-5642 <span className="text-xs text-slate-400">Click to copy</span></button>
          </div>
        </div>
      </footer>
    </main>
  );
}
