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

type Hotel = {
  name: string;
  tag: string;
  rating: number;
  price: string;
  distance: string;
  url: string;
  image: string;
};

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
  hotels: Hotel[];
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
    hotels: [
      { name: "Nidhivan Sarovar Portico", tag: "Modern Luxury", rating: 4, price: "₹5,200", distance: "1.2 km from Prem Mandir", url: "https://www.sarovarhotels.com/nidhivan-sarovar-portico-vrindavan/", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80" },
      { name: "Kesarvaa, Vrindavan", tag: "Heritage", rating: 4, price: "₹4,800", distance: "2.0 km from temple", url: "https://www.kesarvaa.com/", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80" },
      { name: "ANANTA Vrindavan", tag: "Resort", rating: 4, price: "₹6,100", distance: "3.4 km from temple", url: "https://www.anantahotels.com/ananta-vrindavan/", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80" },
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
    hotels: [
      { name: "Radisson Blu Mathura", tag: "Premier", rating: 5, price: "₹8,400", distance: "2.8 km from Janmabhoomi", url: "https://www.radissonhotels.com/en-us/hotels/radisson-blu-mathura", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80" },
      { name: "Brijwasi Royal", tag: "Heritage", rating: 4, price: "₹3,900", distance: "0.9 km from Janmabhoomi", url: "https://www.brijwasiroyal.com/", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80" },
      { name: "Best Western Skycity", tag: "Boutique", rating: 4, price: "₹4,500", distance: "3.5 km from temple", url: "https://www.bestwestern.com/", image: "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=900&q=80" },
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
    hotels: [
      { name: "The Ramayana Hotel Ayodhya", tag: "Premier", rating: 5, price: "₹9,200", distance: "1.5 km from Ram Mandir", url: "https://www.theramayanahotel.com/", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80" },
      { name: "The Clarks International", tag: "Boutique", rating: 4, price: "₹4,500", distance: "Ayodhya Cantt", url: "https://www.theclarkshotels.com/", image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=80" },
      { name: "Park Inn by Radisson Ayodhya", tag: "Modern", rating: 4, price: "₹6,800", distance: "2.4 km from Ram Mandir", url: "https://www.radissonhotels.com/en-us/brand/park-inn", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=80" },
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
    hotels: [
      { name: "BrijRama Palace", tag: "Premier Heritage", rating: 5, price: "₹18,500", distance: "Darbhanga Ghat", url: "https://www.brijhotels.com/brijrama-palace-varanasi" },
      { name: "Taj Ganges Varanasi", tag: "Luxury", rating: 5, price: "₹12,400", distance: "Nadesar Palace Grounds", url: "https://www.tajhotels.com/en-in/hotels/taj-ganges-varanasi/" },
      { name: "Guleria Kothi at the Ghats", tag: "Boutique", rating: 4, price: "₹7,800", distance: "Shivala Ghat", url: "https://www.guleriakothi.com/" },
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
    hotels: [
      { name: "The Ramayana Hotel Ayodhya", tag: "Premier", rating: 5, price: "₹9,200", distance: "1.8 km from Hanuman Garhi", url: "https://www.theramayanahotel.com/" },
      { name: "Taraji Resorts Ayodhya", tag: "Resort", rating: 4, price: "₹5,400", distance: "3.2 km from temple", url: "https://www.tarajiresorts.com/" },
      { name: "Hotel Shane Avadh", tag: "Comfort", rating: 3, price: "₹2,800", distance: "1.0 km from temple", url: "https://www.hotelshaneavadh.com/" },
    ],
  },
];

// UP-wide bounding box (covers all 5 sacred destinations from Mathura → Varanasi)
const UP_BBOX = { minLng: 77.0, minLat: 24.9, maxLng: 83.7, maxLat: 28.1 };
const UP_MAP_SRC = `https://www.openstreetmap.org/export/embed.html?bbox=${UP_BBOX.minLng}%2C${UP_BBOX.minLat}%2C${UP_BBOX.maxLng}%2C${UP_BBOX.maxLat}&layer=mapnik`;



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

      {/* SACRED MAP OF UTTAR PRADESH */}
      <section id="map" className="relative px-6 py-16 md:px-12 md:py-20 border-t border-white/5">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200/80">
              Sacred Map
            </p>
            <h2 className="mt-2 font-serif text-3xl md:text-5xl font-medium text-white">
              Across Uttar Pradesh
            </h2>
            <p className="mt-2 max-w-xl text-sm text-white/65">
              Five timeless destinations — from the marble courts of Vrindavan to the eternal ghats of Varanasi.
            </p>
          </div>
          <a
            href={`https://www.openstreetmap.org/#map=7/26.85/80.95`}
            target="_blank"
            rel="noreferrer"
            className="text-[10px] uppercase tracking-[0.25em] text-white/70 hover:text-white"
          >
            Open Full Map ↗
          </a>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          {/* UP overview map with all 5 pins */}
          <div className="lg:col-span-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="relative aspect-[4/3] w-full">
              <iframe
                title="Map of sacred destinations across Uttar Pradesh"
                src={UP_MAP_SRC}
                className="absolute inset-0 h-full w-full border-0 grayscale-[15%]"
                loading="lazy"
              />
              {/* Overlay pins positioned by lat/lng inside the bbox */}
              <div className="pointer-events-none absolute inset-0">
                {experiences.map((e, i) => {
                  const left = ((e.lng - UP_BBOX.minLng) / (UP_BBOX.maxLng - UP_BBOX.minLng)) * 100;
                  const top = ((UP_BBOX.maxLat - e.lat) / (UP_BBOX.maxLat - UP_BBOX.minLat)) * 100;
                  const active = selected === i;
                  return (
                    <button
                      key={e.title}
                      onClick={() => setSelected(i)}
                      style={{ left: `${left}%`, top: `${top}%` }}
                      className="pointer-events-auto absolute -translate-x-1/2 -translate-y-full group"
                      aria-label={`${e.temple}, ${e.title}`}
                    >
                      <div className={`flex flex-col items-center ${active ? "scale-110" : ""} transition`}>
                        <div className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur-md shadow-lg ${
                          active ? "bg-amber-300 text-black" : "bg-black/75 text-white border border-white/20"
                        }`}>
                          {e.title}
                        </div>
                        <MapPin className={`mt-0.5 h-5 w-5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] ${active ? "text-amber-300" : "text-white"}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center justify-between px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-white/55">
              <span>5 sacred destinations · Uttar Pradesh, India</span>
              <span className="text-amber-200/80">Tap a pin to explore</span>
            </div>
          </div>

          {/* Destination list */}
          <ul className="lg:col-span-2 grid gap-2 content-start">
            {experiences.map((e, i) => {
              const active = selected === i;
              return (
                <li key={e.title}>
                  <button
                    onClick={() => setSelected(i)}
                    className={`w-full flex items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left transition ${
                      active
                        ? "border-amber-300/60 bg-amber-300/10"
                        : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${active ? "bg-amber-300 text-black" : "bg-white/10 text-white"}`}>
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-serif text-base text-white leading-tight">{e.title}</p>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">{e.temple}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-white/45">
                      {e.lat.toFixed(2)}°N, {e.lng.toFixed(2)}°E
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* HOTELS FOR SELECTED DESTINATION */}
      <section id="stays" className="relative px-6 py-16 md:px-12 md:py-20 border-t border-white/5">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200/80">
              Where to Stay
            </p>
            <h2 className="mt-2 font-serif text-3xl md:text-5xl font-medium text-white">
              Hotels near {place.temple}
            </h2>
            <p className="mt-2 text-sm text-white/65">
              Hand-picked stays in {place.title} — book directly with the hotel.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Hotels grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 content-start">
            {place.hotels.map((h) => (
              <a
                key={h.name + h.url}
                href={h.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-amber-300/40 hover:bg-white/[0.06]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/80">
                    {h.tag}
                  </span>
                  <ArrowRight className="h-4 w-4 text-white/40 transition group-hover:translate-x-0.5 group-hover:text-amber-300" />
                </div>
                <p className="mt-4 font-serif text-xl font-medium text-white">{h.name}</p>
                <div className="mt-1.5 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < h.rating ? "fill-amber-400 text-amber-400" : "text-white/15"}`}
                    />
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Location</p>
                    <p className="mt-0.5 text-xs text-white/85">{h.distance}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">From</p>
                    <p className="mt-0.5 font-serif text-base text-white">{h.price}<span className="text-[10px] text-white/55">/nt</span></p>
                  </div>
                </div>
                <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-amber-200/80 truncate">
                  Visit website ↗
                </p>
              </a>
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

            {/* Map */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="flex items-center justify-between px-5 pt-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80">
                  Location on Map
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] text-amber-200/85">
                  <MapPin className="h-3 w-3" />
                  {place.title}, U.P.
                </span>
              </div>
              <div className="mt-3 relative aspect-[4/3] w-full">
                <iframe
                  key={`${place.lat},${place.lng}`}
                  title={`Map of ${place.temple}`}
                  src={mapSrc}
                  className="absolute inset-0 h-full w-full border-0 grayscale-[20%] contrast-110"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center justify-between px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-white/55">
                <span>{place.temple}</span>
                <a
                  href={`https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lng}#map=14/${place.lat}/${place.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/75 hover:text-white"
                >
                  Open ↗
                </a>
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
                    <WeatherIcon className="h-5 w-5 text-amber-300" />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                        Live Weather · {place.title}
                      </p>
                      <p className="text-sm text-white">
                        {weatherLoading
                          ? "Loading…"
                          : weather
                            ? `${weather.temp}°C · ${weather.label}`
                            : "Unavailable"}
                      </p>
                    </div>
                  </div>
                  <p className="text-[10px] text-white/60">
                    {new Date().toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
                  </p>
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
                <button
                  onClick={downloadBrochure}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-white hover:bg-white/10 transition"
                >
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

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          `Namaste! I'd like to plan a journey to ${place.temple} (${place.title}, Uttar Pradesh).`,
        )}`}
        target="_blank"
        rel="noreferrer"
        aria-label={`Chat on WhatsApp +${WHATSAPP_NUMBER}`}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] ring-1 ring-white/20 hover:bg-[#1ebe5d] transition"
      >
        <svg viewBox="0 0 32 32" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M19.11 17.21c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.15-1.33-.79-.71-1.33-1.58-1.49-1.85-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.97 2.63 1.11 2.81.14.18 1.91 2.91 4.62 4.08.65.28 1.15.45 1.55.58.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.83-1.29.23-.64.23-1.18.16-1.29-.07-.11-.25-.18-.52-.32zM16.02 6C10.5 6 6.02 10.48 6.02 16c0 1.77.46 3.5 1.34 5.02L6 26l5.13-1.34A9.96 9.96 0 0 0 16.02 26C21.55 26 26.02 21.52 26.02 16S21.55 6 16.02 6z"/>
        </svg>
        <span className="hidden sm:inline">+{WHATSAPP_NUMBER}</span>
      </a>

    </main>
  );
}
