import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Divine India — Sacred Destinations" },
      { name: "description", content: "A premium showcase of India's most sacred temple destinations." },
      { property: "og:title", content: "Divine India — Sacred Destinations" },
      { property: "og:description", content: "A premium showcase of India's most sacred temple destinations." },
    ],
  }),
  component: Index,
});

type Location = {
  title: string;
  description: string;
  video: string;
  poster: string;
  location: string;
};

const locations: Location[] = [
  {
    title: "Prem Mandir",
    location: "Vrindavan, Uttar Pradesh",
    description:
      "A breathtaking white marble temple dedicated to Radha Krishna, illuminated by ever-changing lights that paint divine love across the night sky.",
    video: "https://cdn.coverr.co/videos/coverr-the-taj-mahal-at-sunset-2633/1080p.mp4",
    poster: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1920&q=80",
  },
  {
    title: "Shri Krishna Janmabhoomi",
    location: "Mathura, Uttar Pradesh",
    description:
      "The sacred birthplace of Lord Krishna — a sanctum where devotion has endured for millennia, echoing with the timeless songs of bhakti.",
    video: "https://cdn.coverr.co/videos/coverr-indian-temple-1572/1080p.mp4",
    poster: "https://images.unsplash.com/photo-1609858855097-1ba74f5f56cf?auto=format&fit=crop&w=1920&q=80",
  },
  {
    title: "Ram Mandir",
    location: "Ayodhya, Uttar Pradesh",
    description:
      "A magnificent shrine rising at the birthplace of Lord Ram, carved in pink sandstone and crowned with shikharas reaching toward the heavens.",
    video: "https://cdn.coverr.co/videos/coverr-prayer-at-the-temple-5180/1080p.mp4",
    poster: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1920&q=80",
  },
  {
    title: "Kashi Vishwanath",
    location: "Varanasi, Uttar Pradesh",
    description:
      "The golden temple of Lord Shiva on the banks of the Ganga — one of the twelve Jyotirlingas, where ancient flames have never ceased to burn.",
    video: "https://cdn.coverr.co/videos/coverr-the-ganges-river-in-varanasi-2729/1080p.mp4",
    poster: "https://images.unsplash.com/photo-1561361398-a8d1f549c1d8?auto=format&fit=crop&w=1920&q=80",
  },
  {
    title: "Hanuman Garhi",
    location: "Ayodhya, Uttar Pradesh",
    description:
      "A fortress temple atop a hill, dedicated to Lord Hanuman — climbed by seventy-six steps of devotion, guarded by the eternal protector.",
    video: "https://cdn.coverr.co/videos/coverr-aerial-view-of-a-temple-2633/1080p.mp4",
    poster: "https://images.unsplash.com/photo-1567879491820-c0a4b5c47bb6?auto=format&fit=crop&w=1920&q=80",
  },
];

function Index() {
  const [selected, setSelected] = useState(0);
  const current = locations[selected];

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Background image crossfade */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={selected}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2, ease: "easeInOut" }, scale: { duration: 8, ease: "easeOut" } }}
            className="absolute inset-0"
          >
            <img
              src={current.poster}
              alt={current.title}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        {/* Gradient overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full border border-white/30 bg-white/5 backdrop-blur-md flex items-center justify-center">
            <span className="text-amber-200 text-sm tracking-widest">ॐ</span>
          </div>
          <div className="leading-tight">
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/60">Divine</p>
            <p className="text-sm font-light tracking-[0.3em] text-white">INDIA</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.3em] text-white/70">
          <a href="#" className="hover:text-amber-200 transition-colors">Destinations</a>
          <a href="#" className="hover:text-amber-200 transition-colors">Journeys</a>
          <a href="#" className="hover:text-amber-200 transition-colors">Reserve</a>
        </nav>
        <button className="hidden md:inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-5 py-2 text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur-md hover:bg-white/10 transition">
          Plan Visit
        </button>
      </header>

      {/* Centered description overlay */}
      <section className="relative z-10 flex min-h-[60vh] items-center justify-center px-6 text-center md:min-h-[65vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="mb-4 text-[11px] uppercase tracking-[0.5em] text-amber-200/90">
              {current.location}
            </p>
            <h1 className="font-serif text-5xl font-light leading-tight text-white drop-shadow-lg md:text-7xl">
              {current.title}
            </h1>
            <div className="mx-auto my-6 h-px w-16 bg-gradient-to-r from-transparent via-amber-200/60 to-transparent" />
            <p className="mx-auto max-w-xl text-base font-light leading-relaxed text-white/85 md:text-lg">
              {current.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Bottom cards */}
      <section className="relative z-10 px-4 pb-8 md:px-12 md:pb-12">
        <div className="mb-4 flex items-center justify-between px-2">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/50">
            Sacred Collection · {String(selected + 1).padStart(2, "0")} / {String(locations.length).padStart(2, "0")}
          </p>
          <p className="hidden text-[10px] uppercase tracking-[0.4em] text-white/50 md:block">
            Select a destination
          </p>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:gap-5 md:overflow-visible">
          {locations.map((loc, i) => {
            const active = i === selected;
            return (
              <motion.button
                key={loc.title}
                onClick={() => setSelected(i)}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className={`group relative shrink-0 w-[68vw] sm:w-[40vw] md:w-auto overflow-hidden rounded-2xl border text-left backdrop-blur-xl transition-all ${
                  active
                    ? "border-amber-200/60 bg-white/15 shadow-[0_20px_60px_-15px_rgba(251,191,36,0.35)]"
                    : "border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10"
                }`}
              >
                <div className="relative h-40 w-full overflow-hidden md:h-44">
                  <img
                    src={loc.poster}
                    alt={loc.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {active && (
                    <motion.div
                      layoutId="activeRing"
                      className="absolute inset-0 ring-2 ring-inset ring-amber-200/70"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
                <div className="p-4">
                  <p className="text-[9px] uppercase tracking-[0.35em] text-amber-200/80">
                    {loc.location.split(",")[0]}
                  </p>
                  <p className="mt-1 font-serif text-lg font-light text-white">
                    {loc.title}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Side index marks */}
      <div className="pointer-events-none absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        {locations.map((_, i) => (
          <div
            key={i}
            className={`h-8 w-px transition-all ${i === selected ? "bg-amber-200" : "bg-white/30"}`}
          />
        ))}
      </div>
    </main>
  );
}
