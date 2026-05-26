"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Rocket,
  Sparkles,
  Check,
  Mail,
  Phone,
} from "lucide-react";

export default function Home() {
  const websitePackages = [
    {
      title: "Starter",
      price: "$450 – $800",
      features: [
        "1 custom designed page",
        "Mobile responsive",
        "Basic SEO setup",
        "Unlimited revisions with upkeep plan",
      ],
    },
    {
      title: "Business",
      price: "$900 – $1,500",
      features: [
        "3–5 custom pages",
        "Custom branding",
        "Lead generation setup",
        "Unlimited revisions with upkeep plan",
      ],
    },
    {
      title: "Premium",
      price: "$1,600 – $2,400",
      features: [
        "Fully custom website",
        "Premium animations",
        "Advanced design system",
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
      ],
    },
    {
      title: "Business Social",
      price: "$350 – $700/mo",
      features: [
        "3–5 posts per week",
        "Custom branded graphics",
        "Story posts + updates",
      ],
    },
    {
      title: "Premium Social",
      price: "$800 – $1,500+/mo",
      features: [
        "Daily or near-daily posting",
        "Advanced custom graphics",
        "Priority updates + management",
      ],
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f8fb] text-[#090b13]">
      <section className="relative overflow-hidden border-b border-black/5 bg-white">
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:64px_64px]" />

        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
                <Sparkles size={16} />
                elevatedigitalx.com
              </div>

              <h1 className="max-w-3xl text-6xl font-black leading-[0.95] tracking-tight">
                Websites built around what makes your brand different.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Clean web design, social media management, branding, and AI-focused marketing solutions.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#pricing"
                  className="rounded-2xl bg-[#0b1020] px-6 py-4 font-bold text-white shadow-xl shadow-violet-300/30 transition hover:scale-[1.03]"
                >
                  Start Project
                </a>

                <a
                  href="#pricing"
                  className="inline-flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-6 py-4 font-bold shadow-sm"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0], rotate: [-6, 6, -6] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  >
                    <Rocket className="text-violet-600" />
                  </motion.div>
                  View Packages
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-black/10 bg-[#0b1020] p-8 text-white shadow-2xl">
              <h2 className="text-3xl font-black">
                More than just a website.
              </h2>

              <div className="mt-8 grid gap-4">
                {[
                  "Brand positioning",
                  "Competitor analysis",
                  "Lead-focused layouts",
                  "Modern animated design",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white/10 p-4"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <p className="text-sm font-black tracking-[0.3em] text-violet-700">
            WEBSITE PACKAGES
          </p>
          <h2 className="mt-3 text-5xl font-black">
            Simple pricing. Clean results.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {websitePackages.map((pack, index) => (
            <motion.div
              whileHover={{ y: -8 }}
              key={index}
              className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm"
            >
              <h3 className="text-3xl font-black">{pack.title}</h3>
              <p className="mt-4 text-4xl font-black text-violet-700">
                {pack.price}
              </p>

              <div className="mt-8 space-y-4">
                {pack.features.map((feature) => (
                  <div key={feature} className="flex gap-3">
                    <Check className="mt-1 text-violet-700" size={18} />
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0b1020] py-20 text-white">
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:64px_64px]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-black tracking-[0.3em] text-violet-300">
                SOCIAL MEDIA MANAGEMENT
              </p>

              <h2 className="mt-3 text-5xl font-black leading-tight">
                Keep your brand active online.
              </h2>

              <p className="mt-6 text-xl leading-9 text-white/70">
                We can run your social media posting, graphics, and updates for you. Depending on the package, your business gets more weekly posts, better custom graphics, and more consistent updates.
              </p>
            </div>

            <div className="grid gap-6">
              {socialPackages.map((pack, index) => (
                <motion.div
                  whileHover={{ x: 8 }}
                  key={index}
                  className="rounded-[2rem] bg-white/10 p-8 backdrop-blur"
                >
                  <h3 className="text-3xl font-black">{pack.title}</h3>
                  <p className="mt-3 text-3xl font-black text-violet-300">
                    {pack.price}
                  </p>

                  <div className="mt-6 space-y-4">
                    {pack.features.map((feature) => (
                      <div key={feature} className="flex gap-3">
                        <Check size={18} className="mt-1 text-violet-300" />
                        <p>{feature}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="creator"
        className="mx-auto max-w-7xl px-6 py-20"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[2rem] border border-black/10 shadow-2xl">
            <img
              src="/james-rizzo.png"
              alt="James Rizzo"
              className="w-full object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-black tracking-[0.3em] text-violet-700">
              MEET THE CREATOR
            </p>

            <h2 className="mt-3 text-5xl font-black">
              Built by James Rizzo.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              James Rizzo is a Computer Science student at Monmouth University,
              football player, and AI-focused builder with hands-on experience
              in web design, AI, and marketing.
            </p>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              He currently interns at Pixie Dust Labs working in marketing affairs
              with Veritas AI, helping with LinkedIn campaigns, branding, and
              website development including work on the Veritas AI website.
            </p>

            <a
              href="https://veritas.emissaries.ai/#contact"
              target="_blank"
              className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-[#0b1020] px-6 py-4 font-bold text-white"
            >
              View Veritas AI
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xl font-black">ELEVATE DIGITAL™</p>
            <p className="mt-2 text-slate-500">
              Web design • Social media • Branding
            </p>
          </div>

          <div className="space-y-3 text-sm font-semibold">
            <a
              href="mailto:elevate.digital.rizzo@gmail.com"
              className="flex items-center gap-3"
            >
              <Mail size={18} />
              elevate.digital.rizzo@gmail.com
            </a>

            <a
              href="tel:9739795642"
              className="flex items-center gap-3"
            >
              <Phone size={18} />
              973-979-5642
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
