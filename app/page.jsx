"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Rocket,
  Sparkles,
  Check,
  Mail,
  Phone,
  Globe,
  Camera,
  Send,
} from "lucide-react";

const websitePackages = [
  {
    title: "Starter",
    price: "$450 – $800",
    features: [
      "1 custom designed page",
      "Mobile responsive",
      "Contact form",
      "Basic SEO setup",
      "Unlimited revisions with upkeep plan",
    ],
  },
  {
    title: "Business",
    price: "$900 – $1,500",
    popular: true,
    features: [
      "3–5 custom pages",
      "Modern layout",
      "Booking/contact forms",
      "Google Maps setup",
      "Unlimited revisions with upkeep plan",
    ],
  },
  {
    title: "Premium",
    price: "$1,600 – $2,400",
    features: [
      "Fully custom website",
      "Premium animations",
      "Lead generation setup",
      "Speed optimized",
      "Unlimited revisions with upkeep plan",
    ],
  },
];

const socialPackages = [
  {
    title: "Starter Social",
    price: "$150 – $300/mo",
    features: [
      "1–2 posts per week",
      "Basic promotional graphics",
      "Simple branded posts",
      "Account updates",
    ],
  },
  {
    title: "Business Social",
    price: "$350 – $700/mo",
    popular: true,
    features: [
      "3–5 posts per week",
      "Custom branded graphics",
      "Story posts + updates",
      "Brand consistency",
    ],
  },
  {
    title: "Premium Social",
    price: "$800 – $1,500+/mo",
    features: [
      "Daily or near-daily posting",
      "Advanced custom graphics",
      "Campaign + launch support",
      "Priority updates + management",
    ],
  },
];

function PackageCard({ pack, dark = false, icon }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className={`relative rounded-[2rem] border p-8 shadow-sm ${
        dark
          ? "border-white/10 bg-white/10 text-white backdrop-blur"
          : "border-black/10 bg-white text-[#090b13]"
      }`}
    >
      {pack.popular && (
        <div className="absolute right-5 top-5 rounded-full bg-violet-700 px-4 py-2 text-xs font-black tracking-widest text-white">
          MOST POPULAR
        </div>
      )}

      <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${dark ? "bg-white/10 text-violet-300" : "bg-violet-50 text-violet-700"}`}>
        {icon}
      </div>

      <h3 className="text-2xl font-black">{pack.title}</h3>
      <p className={`mt-5 text-4xl font-black ${dark ? "text-violet-300" : "text-[#090b13]"}`}>
        {pack.price}
      </p>

      <div className="mt-8 space-y-4">
        {pack.features.map((feature) => (
          <div key={feature} className="flex gap-3">
            <Check className={`mt-0.5 shrink-0 ${dark ? "text-violet-300" : "text-violet-700"}`} size={18} />
            <p className={dark ? "text-white/75" : "text-slate-700"}>{feature}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f8fb] text-[#090b13]">
      <section className="relative overflow-hidden border-b border-black/5 bg-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.16),transparent_28%),radial-gradient(circle_at_80%_25%,rgba(34,211,238,0.12),transparent_30%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:64px_64px]" />

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div>
            <p className="text-lg font-black tracking-[0.18em]">ELEVATE DIGITAL™</p>
            <p className="text-xs font-semibold tracking-[0.28em] text-violet-700">
              WEB DESIGN • SOCIAL MEDIA • BRAND STRATEGY
            </p>
          </div>

          <div className="hidden items-center gap-6 text-sm font-bold text-slate-600 md:flex">
            <a href="#pricing" className="hover:text-violet-700">Pricing</a>
            <a href="#social" className="hover:text-violet-700">Social Media</a>
            <a href="#creator" className="hover:text-violet-700">Creator</a>
            <a href="#contact" className="rounded-full bg-[#0b1020] px-5 py-3 text-white">Contact</a>
          </div>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-800 shadow-sm">
              <Sparkles size={16} /> elevatedigitalx.com
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Websites built around what makes your brand different.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Clean web design, social media posting, branded graphics, and digital strategy for businesses that want to look more professional online.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0b1020] px-6 py-4 font-bold text-white shadow-xl shadow-violet-500/20 transition hover:scale-[1.04]">
                Start Website Brief <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </a>

              <a href="#pricing" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-black/10 bg-white px-6 py-4 font-bold shadow-sm transition hover:scale-[1.04]">
                <motion.span
                  animate={{ y: [0, -8, 0], rotate: [-6, 6, -6] }}
                  transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex"
                >
                  <Rocket size={22} className="text-violet-600" />
                </motion.span>
                View Packages
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-2xl shadow-violet-100/70">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-[#0b1020] p-8 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.35),transparent_45%)]" />
              <div className="relative">
                <Globe className="mb-8 text-violet-300" />
                <h2 className="text-3xl font-black">More than a nice looking site.</h2>
                <p className="mt-4 leading-7 text-white/65">
                  Your website should explain who you are, why you matter, and why customers should choose you.
                </p>

                <div className="mt-8 grid gap-3">
                  {["Brand positioning", "Competitor awareness", "Lead-focused layouts", "Mobile-first design"].map((item) => (
                    <div key={item} className="rounded-2xl bg-white/8 p-4 font-semibold text-white/85">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="pricing" className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <p className="text-sm font-black tracking-[0.3em] text-violet-700">WEBSITE PACKAGES</p>
          <h2 className="mt-3 text-4xl font-black md:text-5xl">Simple pricing. Clean results.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Pricing depends on project scope, but these packages keep everything easy to understand.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {websitePackages.map((pack) => (
            <PackageCard key={pack.title} pack={pack} icon={<Rocket />} />
          ))}
        </div>
      </section>

      <section id="social" className="relative overflow-hidden bg-[#0b1020] py-20 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:64px_64px]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-black tracking-[0.3em] text-violet-300">SOCIAL MEDIA MANAGEMENT</p>
              <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
                Social media posting, graphics, and updates.
              </h2>
            </div>
            <p className="text-xl font-medium leading-9 text-white/70">
              We can run your social media posting, graphics, and updates for you. Depending on the package, your business gets more weekly posts, better custom graphics, account management, promotional content, branded posts, and more consistent updates across your platforms.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {socialPackages.map((pack, index) => (
              <PackageCard key={pack.title} pack={pack} dark icon={index === 0 ? <Send /> : <Camera />} />
            ))}
          </div>
        </div>
      </section>

      <section id="creator" className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white p-5 shadow-2xl shadow-violet-100/60">
            <img
              src="/james-rizzo.png"
              alt="James Rizzo"
              className="aspect-[4/5] w-full rounded-[1.5rem] object-cover object-top"
            />
          </div>

          <div className="rounded-[2rem] bg-[#0b1020] p-8 text-white shadow-2xl shadow-violet-300/20">
            <p className="text-sm font-black tracking-[0.3em] text-violet-300">MEET THE CREATOR</p>
            <h2 className="mt-3 text-4xl font-black">Built by James Rizzo.</h2>

            <p className="mt-5 leading-8 text-white/70">
              James Rizzo is a Computer Science student at Monmouth University, football player, and AI-focused builder with hands-on experience in web design, AI, and marketing.
            </p>

            <p className="mt-4 leading-8 text-white/70">
              He currently interns at Pixie Dust Labs, working in marketing affairs with Veritas AI. Through that work, he helps with LinkedIn marketing campaigns, branding, and website development, including work connected to the Veritas AI website.
            </p>

            <a href="https://veritas.emissaries.ai/#contact" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-black text-[#0b1020] transition hover:scale-[1.03]">
              View Veritas AI Work <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <footer id="contact" className="border-t border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xl font-black">ELEVATE DIGITAL™</p>
            <p className="mt-2 text-slate-500">Web design • Social media • Branding</p>
          </div>

          <div className="space-y-3 text-sm font-semibold">
            <a href="mailto:elevate.digital.rizzo@gmail.com" className="flex items-center gap-3">
              <Mail size={18} /> elevate.digital.rizzo@gmail.com
            </a>
            <a href="tel:9739795642" className="flex items-center gap-3">
              <Phone size={18} /> 973-979-5642
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
