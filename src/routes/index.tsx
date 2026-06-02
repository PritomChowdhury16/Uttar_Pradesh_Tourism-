import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Sun, Cloud, CloudRain, CloudSnow, Coins, Download, RefreshCw, Star, MapPin } from "lucide-react";
import premMandir from "@/assets/prem-mandir.png";
import krishnaJanmabhoomi from "@/assets/krishna-janmabhoomi.png";
import ramMandir from "@/assets/ram-mandir.png";
import kashiVishwanath from "@/assets/kashi-vishwanath.png";
import hanumanGarhi from "@/assets/hanuman-garhi.png";
import { Chatbot } from "@/components/Chatbot";

const WHATSAPP_NUMBER = "912345687";

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
  video: string;
  lat: number;
  lng: number;
  details: { label: string; value: string }[];
};

const experiences: Experience[] = [
  {
    overline: "Bhakti Marg",
    title: "Vrindavan",
    temple: "Prem Mandir",
    description:
      "A breathtaking white marble temple dedicated to Radha Krishna, illuminated by ever-changing lights that paint divine love across the night sky.",
    image: premMandir,
    video: "/videos/card-1.mp4",
    lat: 27.5806,
    lng: 77.7006,
    details: [
      { label: "Deity", value: "Radha Krishna" },
      { label: "Built", value: "2001 – 2012" },
      { label: "Timings", value: "5:30 AM – 8:30 PM" },
      { label: "Highlight", value: "Musical Fountain Show" },
    ],
  },
  {
    overline: "Krishna Janmabhoomi",
    title: "Mathura",
    temple: "Shri Krishna Janmabhoomi",
    description:
      "The sacred birthplace of Lord Krishna — a sanctum where devotion has endured for millennia, echoing with the timeless songs of bhakti.",
    image: krishnaJanmabhoomi,
    video: "/videos/card-2.mp4",
    lat: 27.5046,
    lng: 77.6738,
    details: [
      { label: "Deity", value: "Lord Krishna" },
      { label: "Significance", value: "Birthplace of Krishna" },
      { label: "Timings", value: "5:00 AM – 9:00 PM" },
      { label: "Festival", value: "Janmashtami" },
    ],
  },
  {
    overline: "Ram Nagari",
    title: "Ayodhya",
    temple: "Ram Mandir",
    description:
      "A magnificent shrine rising at the birthplace of Lord Ram, carved in pink sandstone and crowned with shikharas reaching toward the heavens.",
    image: ramMandir,
    video: "/videos/card-3.mp4",
    lat: 26.7956,
    lng: 82.1943,
    details: [
      { label: "Deity", value: "Lord Ram" },
      { label: "Consecrated", value: "January 22, 2024" },
      { label: "Timings", value: "6:30 AM – 9:30 PM" },
      { label: "Architecture", value: "Nagara Style" },
    ],
  },
  {
    overline: "Ghats of Eternity",
    title: "Varanasi",
    temple: "Kashi Vishwanath",
    description:
      "The golden temple of Lord Shiva on the banks of the Ganga — one of the twelve Jyotirlingas, where ancient flames have never ceased to burn.",
    image: kashiVishwanath,
    video: "/videos/card-4.mp4",
    lat: 25.3109,
    lng: 83.0107,
    details: [
      { label: "Deity", value: "Lord Shiva" },
      { label: "Type", value: "Jyotirlinga (1 of 12)" },
      { label: "Timings", value: "3:00 AM – 11:00 PM" },
      { label: "Ritual", value: "Ganga Aarti at Dashashwamedh" },
    ],
  },
  {
    overline: "Ayodhya",
    title: "Hanuman Garhi",
    temple: "Hanuman Garhi",
    description:
      "A fortress temple atop a hill dedicated to Lord Hanuman — climbed by seventy-six steps of devotion, guarded by the eternal protector.",
    image: hanumanGarhi,
    video: "/videos/card-5.mp4",
    lat: 26.7977,
    lng: 82.2042,
    details: [
      { label: "Deity", value: "Lord Hanuman" },
      { label: "Built", value: "10th Century" },
      { label: "Steps", value: "76 sacred steps" },
      { label: "Timings", value: "4:00 AM – 10:00 PM" },
    ],
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

type Weather = { temp: number; code: number; label: string } | null;

const weatherLabel = (code: number): { label: string; kind: "sun" | "cloud" | "rain" | "snow" } => {
  if (code === 0) return { label: "Clear Sky", kind: "sun" };
  if ([1, 2].includes(code)) return { label: "Mostly Sunny", kind: "sun" };
  if (code === 3) return { label: "Overcast", kind: "cloud" };
  if ([45, 48].includes(code)) return { label: "Foggy", kind: "cloud" };
  if (code >= 51 && code <= 67) return { label: "Rain Showers", kind: "rain" };
  if (code >= 71 && code <= 77) return { label: "Snow", kind: "snow" };
  if (code >= 80 && code <= 82) return { label: "Rain Showers", kind: "rain" };
  if (code >= 95) return { label: "Thunderstorm", kind: "rain" };
  return { label: "Partly Cloudy", kind: "cloud" };
};

function Index() {
  const [selected, setSelected] = useState<number | null>(null);
  const current = selected !== null ? experiences[selected] : null;
  const bgVideo = current ? current.video : "/intro.mp4";
  const bgKey = current ? current.video : "intro";

  // Default to Varanasi when nothing is selected so the map/weather always have a place
  const place = current ?? experiences[3];

  const [weather, setWeather] = useState<Weather>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setWeatherLoading(true);
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${place.lat}&longitude=${place.lng}&current=temperature_2m,weather_code&timezone=Asia%2FKolkata`;
        const res = await fetch(url);
        const data = await res.json();
        if (cancelled) return;
        const temp = Math.round(data?.current?.temperature_2m ?? 0);
        const code = data?.current?.weather_code ?? 0;
        setWeather({ temp, code, label: weatherLabel(code).label });
      } catch {
        if (!cancelled) setWeather(null);
      } finally {
        if (!cancelled) setWeatherLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [place.lat, place.lng]);

  const WeatherIcon = weather
    ? { sun: Sun, cloud: Cloud, rain: CloudRain, snow: CloudSnow }[weatherLabel(weather.code).kind]
    : Sun;

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${place.lng - 0.04}%2C${
    place.lat - 0.03
  }%2C${place.lng + 0.04}%2C${place.lat + 0.03}&layer=mapnik&marker=${place.lat}%2C${place.lng}`;

  const downloadBrochure = () => {
    const lines = [
      `UTTAR PRADESH TOURISM — Sacred Journeys Brochure`,
      `Generated: ${new Date().toLocaleString("en-IN")}`,
      ``,
      `Featured: ${place.temple} (${place.title})`,
      `Coordinates: ${place.lat}, ${place.lng}`,
      ``,
      place.description,
      ``,
      `— Highlights —`,
      ...place.details.map((d) => `• ${d.label}: ${d.value}`),
      ``,
      `— All Sacred Destinations —`,
      ...experiences.map(
        (e, i) => `${i + 1}. ${e.temple} — ${e.title} (${e.lat.toFixed(3)}, ${e.lng.toFixed(3)})`,
      ),
      ``,
      `Plan with us · WhatsApp +${WHATSAPP_NUMBER}`,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `up-tourism-${place.title.toLowerCase().replace(/\s+/g, "-")}-brochure.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const next = () =>
    setSelected((s) => (s === null ? 0 : (s + 1) % experiences.length));
  const prev = () =>
    setSelected((s) =>
      s === null ? experiences.length - 1 : (s - 1 + experiences.length) % experiences.length,
    );


  return (
    <main className="min-h-screen w-full bg-[#0a0a0a] text-white font-sans">
      {/* HERO */}
      <section className="relative h-[100vh] min-h-[760px] w-full overflow-hidden">
        {/* Background crossfade video */}
        <div className="absolute inset-0">
          <AnimatePresence mode="sync">
            <motion.video
              key={bgKey}
              src={bgVideo}

              autoPlay
              loop
              muted
              playsInline
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1830]/70 via-[#0a0a0a]/40 to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
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
        <div className="relative z-10 px-6 md:px-12 mt-10 md:mt-16 max-w-3xl">
          <AnimatePresence mode="wait">
            {current ? (
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200/90">
                  {current.overline} · {current.title}
                </p>
                <h1 className="mt-3 font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] text-white drop-shadow-2xl">
                  {current.temple}.
                </h1>
                <p className="mt-5 max-w-xl text-base md:text-lg font-light text-white/85 leading-relaxed">
                  {current.description}
                </p>

                {/* Small details */}
                <div className="mt-7 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl">
                  {current.details.map((d) => (
                    <div
                      key={d.label}
                      className="rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-md px-4 py-3"
                    >
                      <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/55">
                        {d.label}
                      </p>
                      <p className="mt-1 text-sm font-medium text-white leading-snug">{d.value}</p>
                    </div>
                  ))}
                </div>

                <button className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-md hover:bg-white/15 transition">
                  Explore Journeys
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200/90">
                  Sacred Heart of India
                </p>
                <h1 className="mt-3 font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] text-white drop-shadow-2xl">
                  Uttar Pradesh.
                </h1>
                <p className="mt-5 max-w-xl text-base md:text-lg font-light text-white/85 leading-relaxed">
                  Discover the sacred heart of India through a lens of luxury and timeless tradition. Select a destination below to begin your journey.
                </p>
              </motion.div>
            )}
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
          <div className="flex gap-3 overflow-x-auto pb-2 md:gap-4 md:justify-start">
            {experiences.map((exp, i) => {
              const active = i === selected;
              return (
                <motion.button
                  key={exp.title}
                  onClick={() => setSelected(i)}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className={`group relative shrink-0 w-[42vw] sm:w-44 md:w-48 aspect-[3/4] overflow-hidden rounded-xl text-left transition-all ${
                    active ? "ring-2 ring-white shadow-[0_14px_36px_-14px_rgba(0,0,0,0.6)]" : "ring-1 ring-white/10 hover:ring-white/30"
                  }`}
                >
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-3">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.25em] text-white/80">
                      {exp.overline}
                    </p>
                    <p className="mt-0.5 font-serif text-base md:text-lg font-medium leading-tight text-white">
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

      <Chatbot
        context={
          current
            ? `${current.temple} (${current.title}, Uttar Pradesh)`
            : "Uttar Pradesh sacred destinations"
        }
      />

    </main>
  );
}
