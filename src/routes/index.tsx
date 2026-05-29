import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Sun, Coins, Download, RefreshCw, Star } from "lucide-react";
import premMandir from "@/assets/prem-mandir.png";
import krishnaJanmabhoomi from "@/assets/krishna-janmabhoomi.png";
import ramMandir from "@/assets/ram-mandir.png";
import kashiVishwanath from "@/assets/kashi-vishwanath.png";
import hanumanGarhi from "@/assets/hanuman-garhi.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Uttar Pradesh Tourism — Sacred Heart of India" },
      { name: "description", content: "Discover the sacred heart of India through a lens of luxury and timeless tradition." },
      { property: "og:title", content: "Uttar Pradesh Tourism" },
      { property: "og:description", content: "Discover the sacred heart of India through a lens of luxury and timeless tradition." },
    ],
  }),
  component: Index,
});

type Experience = {
  overline: string;
  title: string;
  temple: string;
  description: string;
  image: string;
};

const experiences: Experience[] = [
  {
    overline: "Bhakti Marg",
    title: "Vrindavan",
    temple: "Prem Mandir",
    description:
      "A breathtaking white marble temple dedicated to Radha Krishna, illuminated by ever-changing lights that paint divine love across the night sky.",
    image: premMandir,
  },
  {
    overline: "Krishna Janmabhoomi",
    title: "Mathura",
    temple: "Shri Krishna Janmabhoomi",
    description:
      "The sacred birthplace of Lord Krishna — a sanctum where devotion has endured for millennia, echoing with the timeless songs of bhakti.",
    image: krishnaJanmabhoomi,
  },
  {
    overline: "Ram Nagari",
    title: "Ayodhya",
    temple: "Ram Mandir",
    description:
      "A magnificent shrine rising at the birthplace of Lord Ram, carved in pink sandstone and crowned with shikharas reaching toward the heavens.",
    image: ramMandir,
  },
  {
    overline: "Ghats of Eternity",
    title: "Varanasi",
    temple: "Kashi Vishwanath",
    description:
      "The golden temple of Lord Shiva on the banks of the Ganga — one of the twelve Jyotirlingas, where ancient flames have never ceased to burn.",
    image: kashiVishwanath,
  },
  {
    overline: "Ayodhya",
    title: "Hanuman Garhi",
    temple: "Hanuman Garhi",
    description:
      "A fortress temple atop a hill dedicated to Lord Hanuman — climbed by seventy-six steps of devotion, guarded by the eternal protector.",
    image: hanumanGarhi,
  },
];

const stays = [
  {
    tag: "Premier Selection",
    name: "Brijrama Palace",
    rating: 5,
    price: "₹18,500",
    location: "Darbhanga Ghat, Varanasi",
    airport: "LBS International",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  },
  {
    tag: "Heritage Stay",
    name: "Lebua Lucknow",
    rating: 4,
    price: "₹6,500",
    location: "Mall Avenue, Lucknow",
    airport: "CCS Airport",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    tag: "Boutique",
    name: "The Clarks International",
    rating: 4,
    price: "₹4,500",
    location: "Ayodhya Cantonment",
    airport: "Ayodhya Airport",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80",
  },
  {
    tag: "Modern Luxury",
    name: "Nidhivan Sarovar Portico",
    rating: 4,
    price: "₹5,200",
    location: "Vrindavan Road",
    airport: "Agra Airport",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
  },
];

const culinary = [
  {
    name: "Banarasi Thali",
    description: "Experience a symphony of 12 distinct sattvic flavors served on a traditional brass plate.",
    place: "Varanasi",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Awadhi Biryani",
    description: "The delicate fragrance of Dum cooking, perfected in the royal kitchens of the Nawabs.",
    place: "Lucknow",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Mathura Pedas",
    description: "Hand-crafted milk sweets, lightly caramelized and dusted with cardamom.",
    place: "Mathura",
    image: "https://images.unsplash.com/photo-1605197788044-5e4c9b0e4f3a?auto=format&fit=crop&w=400&q=80",
  },
];

function Index() {
  const [selected, setSelected] = useState(0);
  const current = experiences[selected];

  const next = () => setSelected((s) => (s + 1) % experiences.length);
  const prev = () => setSelected((s) => (s - 1 + experiences.length) % experiences.length);

  return (
    <main className="min-h-screen w-full bg-[#0a0a0a] text-white font-sans">
      {/* HERO */}
      <section className="relative h-[100vh] min-h-[760px] w-full overflow-hidden">
        {/* Background crossfade */}
        <div className="absolute inset-0">
          <AnimatePresence>
            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 1.2, ease: "easeInOut" }, scale: { duration: 10, ease: "easeOut" } }}
              className="absolute inset-0"
            >
              <img src={current.image} alt={current.title} className="h-full w-full object-cover" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1830]/70 via-[#0a0a0a]/40 to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </div>

        {/* Nav */}
        <header className="relative z-20 flex items-center justify-between px-6 py-6 md:px-12 md:py-7">
          <p className="text-base font-semibold tracking-[0.18em] text-white md:text-lg">
            UTTAR PRADESH TOURISM
          </p>
          <nav className="hidden items-center gap-10 text-xs uppercase tracking-[0.2em] text-white/80 md:flex">
            <a href="#" className="relative pb-1 text-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-white">Destinations</a>
            <a href="#stays" className="hover:text-white transition">Stays</a>
            <a href="#culinary" className="hover:text-white transition">Culinary</a>
            <a href="#" className="hover:text-white transition">Journal</a>
          </nav>
          <button className="rounded-full bg-white px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-black hover:bg-white/90 transition">
            Book Now
          </button>
        </header>

        {/* Hero copy */}
        <div className="relative z-10 px-6 md:px-12 mt-10 md:mt-20 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] text-white drop-shadow-2xl">
                Uttar Pradesh<br />Tourism.
              </h1>
              <p className="mt-5 max-w-md text-lg md:text-xl font-light text-white/85 leading-snug">
                Discover the sacred heart of India through a lens of luxury and timeless tradition.
              </p>
              <button className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-md hover:bg-white/15 transition">
                Explore Journeys
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Curated experiences strip */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-8 md:px-12 md:pb-10">
          <div className="mb-4 flex items-end justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80">
              Curated Experiences
            </p>
            <div className="hidden gap-2 md:flex">
              <button onClick={prev} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/5 backdrop-blur-md text-white hover:bg-white/15 transition">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={next} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/5 backdrop-blur-md text-white hover:bg-white/15 transition">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:gap-5 md:overflow-visible">
            {experiences.map((exp, i) => {
              const active = i === selected;
              return (
                <motion.button
                  key={exp.title}
                  onClick={() => setSelected(i)}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className={`group relative shrink-0 w-[62vw] sm:w-[36vw] md:w-auto aspect-[3/4] overflow-hidden rounded-2xl text-left transition-all ${
                    active ? "ring-2 ring-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]" : "ring-1 ring-white/10 hover:ring-white/30"
                  }`}
                >
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/80">
                      {exp.overline}
                    </p>
                    <p className="mt-1 font-serif text-2xl md:text-[1.7rem] font-medium leading-tight text-white">
                      {exp.title}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* LUXURY STAYS & LOCAL FLAVORS */}
      <section id="stays" className="relative px-6 py-16 md:px-12 md:py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80">
          Luxury Stays &amp; Local Flavors
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Stays grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
            {stays.map((s) => (
              <div
                key={s.name}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur">
                    {s.tag}
                  </span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-serif text-xl font-medium text-white">{s.name}</p>
                    <div className="mt-1 flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < s.rating ? "fill-amber-400 text-amber-400" : "text-white/20"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Starting from</p>
                    <p className="mt-0.5 font-serif text-lg text-white">{s.price}<span className="text-xs text-white/60">/night</span></p>
                  </div>
                </div>
                <div className="mt-4 border-t border-white/10 pt-3 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Location</p>
                    <p className="mt-1 text-sm text-white/85">{s.location}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Nearby Airport</p>
                    <p className="mt-1 text-sm text-white/85">{s.airport}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Culinary */}
            <div id="culinary" className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80">
                Local Culinary Delights
              </p>
              <div className="mt-5 space-y-5">
                {culinary.map((c) => (
                  <div key={c.name} className="flex gap-4">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-white/15"
                    />
                    <div>
                      <p className="font-serif text-base font-medium text-white">{c.name}</p>
                      <p className="mt-1 text-xs leading-relaxed text-white/65">{c.description}</p>
                      <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200/80">{c.place}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Plan your journey */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80">
                Plan Your Journey
              </p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center gap-3">
                    <Sun className="h-5 w-5 text-amber-300" />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Current Weather</p>
                      <p className="text-sm text-white">28°C · Varanasi</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-white/60">Partly Cloudy</p>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center gap-3">
                    <Coins className="h-5 w-5 text-amber-300" />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Currency Converter</p>
                      <p className="text-sm text-white">1 USD = 83.4 INR</p>
                    </div>
                  </div>
                  <RefreshCw className="h-4 w-4 text-white/40" />
                </div>
                <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-white hover:bg-white/10 transition">
                  <Download className="h-4 w-4" />
                  Download Brochure
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 md:px-12">
        <div className="flex flex-col items-center justify-between gap-3 text-[10px] uppercase tracking-[0.3em] text-white/40 md:flex-row">
          <p>© Uttar Pradesh Tourism</p>
          <p>Sacred · Timeless · Luxurious</p>
        </div>
      </footer>
    </main>
  );
}
