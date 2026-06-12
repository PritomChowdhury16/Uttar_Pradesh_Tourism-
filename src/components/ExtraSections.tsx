import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Phone,
  Shield,
  Car,
  Utensils,
  MessageSquare,
  Calculator,
  Hotel as HotelIcon,
  Send,
  CheckCircle2,
  Sparkles,
  Sun,
  CloudRain,
  Route as RouteIcon,
  Wallet,
} from "lucide-react";
import krishnaImg from "@/assets/krishna.png.asset.json";
import ramImg from "@/assets/ram.png.asset.json";
import shivImg from "@/assets/shiv.png.asset.json";
import hanumanImg from "@/assets/hanuman.png.asset.json";
import cmImg from "@/assets/cm.png.asset.json";

// ---------- Data ----------

export type HotelFull = {
  name: string;
  city: "Vrindavan" | "Mathura" | "Ayodhya" | "Varanasi";
  category: "Government" | "Budget" | "3-Star" | "4-Star" | "5-Star";
  price: number; // INR/night
  rating: number;
  phone: string;
  image: string;
};

export const allHotels: HotelFull[] = [
  // Vrindavan
  { name: "UP Tourism Yatri Niwas (Govt)", city: "Vrindavan", category: "Government", price: 900, rating: 3, phone: "+91-565-2456888", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80" },
  { name: "ISKCON Guest House", city: "Vrindavan", category: "Budget", price: 1400, rating: 3, phone: "+91-565-2540021", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80" },
  { name: "Kesarvaa Vrindavan", city: "Vrindavan", category: "3-Star", price: 3200, rating: 4, phone: "+91-99277-77781", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80" },
  { name: "Nidhivan Sarovar Portico", city: "Vrindavan", category: "4-Star", price: 5200, rating: 4, phone: "+91-565-2540666", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80" },
  { name: "ANANTA Vrindavan Resort", city: "Vrindavan", category: "5-Star", price: 8900, rating: 5, phone: "+91-99300-00111", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80" },

  // Mathura
  { name: "UPSTDC Hotel Rahi", city: "Mathura", category: "Government", price: 850, rating: 3, phone: "+91-565-2505351", image: "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=900&q=80" },
  { name: "Hotel Brijwasi Lands Inn", city: "Mathura", category: "Budget", price: 1900, rating: 3, phone: "+91-565-2403888", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=80" },
  { name: "Best Western Skycity", city: "Mathura", category: "3-Star", price: 3500, rating: 4, phone: "+91-565-2530000", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80" },
  { name: "Brijwasi Royal", city: "Mathura", category: "4-Star", price: 4900, rating: 4, phone: "+91-565-2403333", image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=80" },
  { name: "Radisson Blu Mathura", city: "Mathura", category: "5-Star", price: 8400, rating: 5, phone: "+91-565-6611111", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80" },

  // Ayodhya
  { name: "UPSTDC Rahi Yatri Niwas", city: "Ayodhya", category: "Government", price: 1100, rating: 3, phone: "+91-5278-232435", image: "https://images.unsplash.com/photo-1559599189-fe84dea4eb79?auto=format&fit=crop&w=900&q=80" },
  { name: "Hotel Shane Avadh", city: "Ayodhya", category: "Budget", price: 1800, rating: 3, phone: "+91-5278-232770", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80" },
  { name: "Taraji Resorts", city: "Ayodhya", category: "3-Star", price: 3400, rating: 4, phone: "+91-91402-00200", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=900&q=80" },
  { name: "Park Inn by Radisson", city: "Ayodhya", category: "4-Star", price: 6800, rating: 4, phone: "+91-5278-200100", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80" },
  { name: "The Ramayana Hotel", city: "Ayodhya", category: "5-Star", price: 9200, rating: 5, phone: "+91-99100-44400", image: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=900&q=80" },

  // Varanasi (Kashi)
  { name: "UP Tourism Hotel Rahi Tourist Bungalow", city: "Varanasi", category: "Government", price: 1200, rating: 3, phone: "+91-542-2208413", image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=900&q=80" },
  { name: "Hotel Surya Kaiser Palace", city: "Varanasi", category: "Budget", price: 2200, rating: 3, phone: "+91-542-2508466", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80" },
  { name: "Hotel Hindusthan International", city: "Varanasi", category: "3-Star", price: 4200, rating: 4, phone: "+91-542-6685555", image: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?auto=format&fit=crop&w=900&q=80" },
  { name: "Taj Ganges Varanasi", city: "Varanasi", category: "4-Star", price: 9800, rating: 5, phone: "+91-542-6660001", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80" },
  { name: "BrijRama Palace", city: "Varanasi", category: "5-Star", price: 18500, rating: 5, phone: "+91-542-6932333", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=900&q=80" },
];

export const cuisines = [
  { name: "Banarasi Thali", place: "Varanasi", desc: "12-bowl sattvic feast on a brass plate — kachori, sabzi, dal, malaiyo.", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80" },
  { name: "Banarasi Paan", place: "Varanasi", desc: "Iconic betel leaf with gulkand, saunf and silver varq.", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80" },
  { name: "Mathura Peda", place: "Mathura", desc: "Caramelised milk sweet — handcrafted for centuries near Janmabhoomi.", image: "https://images.unsplash.com/photo-1610508500445-a4592435e27e?auto=format&fit=crop&w=600&q=80" },
  { name: "Aloo Puri & Jalebi", place: "Mathura", desc: "Crisp puris with spiced potato curry and orange jalebis.", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80" },
  { name: "Vrindavan Lassi", place: "Vrindavan", desc: "Thick, saffron-laced lassi topped with malai and rose petals.", image: "https://images.unsplash.com/photo-1546039907-7fa05f864c02?auto=format&fit=crop&w=600&q=80" },
  { name: "Chappan Bhog", place: "Vrindavan", desc: "Legendary 56-item Krishna prasad — kheer, ladoo, mathri & more.", image: "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=600&q=80" },
  { name: "Awadhi Litti Chokha", place: "Ayodhya", desc: "Roasted wheat balls stuffed with sattu, served with smoked chokha.", image: "https://images.unsplash.com/photo-1630383249896-24074d262ac5?auto=format&fit=crop&w=600&q=80" },
  { name: "Malaiyo / Makhan Malai", place: "Varanasi", desc: "Winter-only saffron foam dessert — only found in Kashi's lanes.", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80" },
];

export const reviews = [
  { name: "Aditi Sharma", from: "Mumbai", stars: 5, text: "The Ganga aarti at Dashashwamedh left me in tears. Hotel BrijRama Palace was a dream." },
  { name: "Rohan Verma", from: "Bengaluru", stars: 5, text: "Ram Mandir darshan was deeply moving. Park Inn Ayodhya took great care of our family." },
  { name: "Meera Iyer", from: "Chennai", stars: 4, text: "Prem Mandir light show is mesmerizing. Mathura pedas are now a household staple." },
  { name: "James Whitaker", from: "London, UK", stars: 5, text: "Varanasi felt timeless. The boat ride at sunrise was the highlight of my India trip." },
  { name: "Priya Nair", from: "Kochi", stars: 4, text: "Loved Vrindavan's vibe. Recommend Kesarvaa for a comfortable, peaceful stay." },
  { name: "Devansh Gupta", from: "Delhi", stars: 5, text: "Cost calculator helped plan our budget perfectly. Transport info saved us hours." },
];

export const policeContacts = [
  { label: "Emergency", number: "112", icon: Shield },
  { label: "UP Police Helpline", number: "100 / 112", icon: Shield },
  { label: "Women Helpline (UP)", number: "1090", icon: Shield },
  { label: "Mathura Police Control", number: "+91-565-2401821", icon: Shield },
  { label: "Vrindavan Police Station", number: "+91-565-2442963", icon: Shield },
  { label: "Ayodhya Police Control", number: "+91-5278-232239", icon: Shield },
  { label: "Varanasi Police Control", number: "+91-542-2502655", icon: Shield },
  { label: "Tourist Helpline (India)", number: "1363", icon: Phone },
];

export const uberDrivers = [
  { name: "Rakesh Kumar (Uber Mathura)", number: "+91-98370-11234", car: "Sedan · Dzire" },
  { name: "Suresh Yadav (Uber Vrindavan)", number: "+91-94120-55678", car: "Hatchback · WagonR" },
  { name: "Mohd. Imran (Uber Ayodhya)", number: "+91-99350-23344", car: "SUV · Ertiga" },
  { name: "Ajay Singh (Uber Varanasi)", number: "+91-99180-77889", car: "Sedan · Aura" },
  { name: "Vikas Tiwari (Ola/Uber Kashi)", number: "+91-95590-44221", car: "Premier · Innova" },
];

export const transports = [
  { mode: "Indian Railways", desc: "Direct trains to Mathura Jn, Ayodhya Cantt, Varanasi Jn from all major cities.", fare: "₹250 – ₹2,500" },
  { mode: "UPSRTC Volvo Bus", desc: "AC sleeper & semi-sleeper coaches connecting Delhi, Lucknow, Agra to all 4 cities.", fare: "₹450 – ₹1,800" },
  { mode: "Uber / Ola Cab", desc: "Doorstep pickup in all 4 cities. Outstation packages available.", fare: "₹12 – ₹18 / km" },
  { mode: "Auto Rickshaw", desc: "Best for last-mile to temples and ghats. Negotiate or use meter.", fare: "₹30 – ₹150" },
  { mode: "E-Rickshaw", desc: "Eco-friendly option around temple complexes (esp. Ayodhya & Vrindavan).", fare: "₹20 – ₹80" },
  { mode: "Cycle Rickshaw", desc: "Heritage way to roam Banaras gallis and Vrindavan lanes.", fare: "₹40 – ₹120" },
  { mode: "Flights", desc: "Maharishi Valmiki Intl. (Ayodhya), Lal Bahadur Shastri (Varanasi), Kheria (Agra for Mathura).", fare: "₹3,500 – ₹9,000" },
  { mode: "Govt Ferry / Boat", desc: "Ganga boat rides at Varanasi ghats — sunrise & evening aarti.", fare: "₹100 – ₹500" },
];

export const gods = [
  { name: "Lord Krishna", place: "Vrindavan & Mathura", image: krishnaImg.url },
  { name: "Lord Ram", place: "Ayodhya", image: ramImg.url },
  { name: "Lord Shiv (Kashi Vishwanath)", place: "Varanasi", image: shivImg.url },
  { name: "Lord Hanuman", place: "Hanuman Garhi, Ayodhya", image: hanumanImg.url },
];

// ---------- Components ----------

export function GodsSection() {
  return (
    <section id="deities" className="px-6 py-16 md:px-12 md:py-20 border-t border-white/5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200/80">Divine Presence</p>
      <h2 className="mt-2 font-serif text-3xl md:text-5xl font-medium text-white">The Gods of Uttar Pradesh</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {gods.map((g, i) => (
          <motion.div
            key={g.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={g.image}
                alt={g.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-serif text-xl font-medium text-white drop-shadow-lg">{g.name}</p>
                <p className="text-[10px] uppercase tracking-[0.22em] text-amber-200/90">{g.place}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function HotelsSection() {
  const [city, setCity] = useState<"All" | HotelFull["city"]>("All");
  const [cat, setCat] = useState<"All" | HotelFull["category"]>("All");
  const filtered = useMemo(
    () => allHotels.filter((h) => (city === "All" || h.city === city) && (cat === "All" || h.category === cat)),
    [city, cat],
  );
  const cities: ("All" | HotelFull["city"])[] = ["All", "Vrindavan", "Mathura", "Ayodhya", "Varanasi"];
  const cats: ("All" | HotelFull["category"])[] = ["All", "Government", "Budget", "3-Star", "4-Star", "5-Star"];

  return (
    <section id="hotels" className="px-6 py-16 md:px-12 md:py-20 border-t border-white/5">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200/80">Stays</p>
          <h2 className="mt-2 font-serif text-3xl md:text-5xl font-medium text-white">Hotels near Sacred Places</h2>
          <p className="mt-2 text-sm text-white/65">From government Yatri Niwas to 5-star palaces — every pilgrim, every budget.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 space-y-3">
        <div className="flex flex-wrap gap-2">
          {cities.map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className={`rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition border ${
                city === c ? "bg-amber-300 text-black border-amber-300" : "border-white/15 text-white/75 hover:bg-white/5"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] transition border ${
                cat === c ? "bg-white text-black border-white" : "border-white/10 text-white/60 hover:bg-white/5"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((h, i) => (
            <motion.div
              key={h.city + h.name}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: Math.min(i, 8) * 0.04 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:border-amber-300/40 transition"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={h.image} alt={h.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <span className="absolute top-3 left-3 rounded-full bg-amber-300/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-black">
                  {h.category}
                </span>
                <span className="absolute top-3 right-3 rounded-full bg-black/70 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-white border border-white/15">
                  {h.city}
                </span>
                <p className="absolute bottom-3 left-3 right-3 font-serif text-lg text-white drop-shadow-lg leading-tight">{h.name}</p>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className={`h-3 w-3 ${k < h.rating ? "fill-amber-400 text-amber-400" : "text-white/15"}`} />
                    ))}
                  </div>
                  <p className="font-serif text-base text-white">₹{h.price.toLocaleString("en-IN")}<span className="text-[10px] text-white/55">/nt</span></p>
                </div>
                <a href={`tel:${h.phone}`} className="mt-3 flex items-center gap-2 text-[11px] text-amber-200 hover:text-amber-300">
                  <Phone className="h-3 w-3" /> {h.phone}
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

export function CuisineSection() {
  return (
    <section id="cuisine" className="px-6 py-16 md:px-12 md:py-20 border-t border-white/5">
      <div className="flex items-center gap-3">
        <Utensils className="h-5 w-5 text-amber-300" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200/80">Cuisine</p>
      </div>
      <h2 className="mt-2 font-serif text-3xl md:text-5xl font-medium text-white">Popular Foods of These Sacred Places</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cuisines.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] group"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute top-3 left-3 rounded-full bg-amber-300/95 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-black">{c.place}</span>
            </div>
            <div className="p-4">
              <p className="font-serif text-base text-white">{c.name}</p>
              <p className="mt-1 text-xs text-white/65 leading-relaxed">{c.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function ReviewsSection() {
  return (
    <section id="reviews" className="px-6 py-16 md:px-12 md:py-20 border-t border-white/5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200/80">Pilgrim Voices</p>
      <h2 className="mt-2 font-serif text-3xl md:text-5xl font-medium text-white">Reviews from Travellers</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className={`h-3.5 w-3.5 ${k < r.stars ? "fill-amber-400 text-amber-400" : "text-white/15"}`} />
              ))}
            </div>
            <p className="mt-3 text-sm text-white/85 leading-relaxed">“{r.text}”</p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-amber-200/80">
              {r.name} <span className="text-white/45">· {r.from}</span>
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function CMSection() {
  return (
    <section id="cm" className="px-6 py-16 md:px-12 md:py-20 border-t border-white/5">
      <div className="grid items-center gap-8 md:grid-cols-[280px_1fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-amber-300/30"
        >
          <img
            src={cmImg.url}
            alt="Yogi Adityanath — Chief Minister of Uttar Pradesh"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </motion.div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200/80">Honourable Chief Minister</p>
          <h2 className="mt-2 font-serif text-3xl md:text-5xl font-medium text-white">Yogi Adityanath</h2>
          <p className="mt-3 text-sm md:text-base text-white/75 leading-relaxed max-w-2xl">
            22nd Chief Minister of Uttar Pradesh, in office since March 2017. A monk, parliamentarian, and the head priest
            of Gorakhnath Math, he has championed the revival of Ayodhya, the Kashi Vishwanath Dham corridor, and the
            modernization of UP's sacred tourism circuit.
          </p>
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl">
            {[
              ["Party", "Bharatiya Janata Party"],
              ["In Office Since", "19 March 2017"],
              ["Constituency", "Gorakhpur Urban"],
              ["Born", "5 June 1972"],
              ["Predecessor", "Akhilesh Yadav"],
              ["Residence", "5 Kalidas Marg, Lucknow"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/50">{k}</p>
                <p className="mt-0.5 text-xs text-white">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactsSection() {
  return (
    <section id="contacts" className="px-6 py-16 md:px-12 md:py-20 border-t border-white/5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200/80">Stay Safe</p>
      <h2 className="mt-2 font-serif text-3xl md:text-5xl font-medium text-white">Important Contact Numbers</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {policeContacts.map((c) => (
          <a
            key={c.label}
            href={`tel:${c.number.replace(/[^\d+]/g, "")}`}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-amber-300/40 hover:bg-amber-300/[0.04] transition"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-300/15 text-amber-300">
              <c.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">{c.label}</p>
              <p className="font-serif text-base text-white">{c.number}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export function TransportSection() {
  return (
    <section id="transport" className="px-6 py-16 md:px-12 md:py-20 border-t border-white/5">
      <div className="flex items-center gap-3">
        <Car className="h-5 w-5 text-amber-300" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200/80">Transport</p>
      </div>
      <h2 className="mt-2 font-serif text-3xl md:text-5xl font-medium text-white">How to Travel & Get Around</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {transports.map((t, i) => (
          <motion.div
            key={t.mode}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <p className="font-serif text-lg text-white">{t.mode}</p>
            <p className="mt-2 text-xs text-white/65 leading-relaxed">{t.desc}</p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-amber-200/80">Fare · {t.fare}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200/80">Verified Uber / Ola Drivers</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {uberDrivers.map((d) => (
            <a
              key={d.number}
              href={`tel:${d.number.replace(/[^\d+]/g, "")}`}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:border-amber-300/40 transition"
            >
              <div>
                <p className="text-sm text-white">{d.name}</p>
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/50">{d.car}</p>
              </div>
              <div className="flex items-center gap-2 text-amber-200 text-xs">
                <Phone className="h-3.5 w-3.5" /> {d.number}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CostCalculator() {
  const [days, setDays] = useState(3);
  const [members, setMembers] = useState(2);
  const [hotelRate, setHotelRate] = useState(3500); // per room per night
  const [foodPerDay, setFoodPerDay] = useState(600); // per person
  const [transport, setTransport] = useState(5000); // total trip

  const rooms = Math.ceil(members / 2);
  const hotelCost = rooms * hotelRate * days;
  const foodCost = members * foodPerDay * days;
  const total = hotelCost + foodCost + transport;

  const Row = ({
    label,
    value,
    setValue,
    min,
    max,
    step,
    suffix,
  }: {
    label: string;
    value: number;
    setValue: (n: number) => void;
    min: number;
    max: number;
    step: number;
    suffix?: string;
  }) => (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-[11px] uppercase tracking-[0.22em] text-white/65">{label}</label>
        <span className="font-serif text-sm text-white">
          {value.toLocaleString("en-IN")}
          {suffix ?? ""}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="mt-2 w-full accent-amber-300"
      />
    </div>
  );

  return (
    <section id="calculator" className="px-6 py-16 md:px-12 md:py-20 border-t border-white/5">
      <div className="flex items-center gap-3">
        <Calculator className="h-5 w-5 text-amber-300" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200/80">Trip Cost Calculator</p>
      </div>
      <h2 className="mt-2 font-serif text-3xl md:text-5xl font-medium text-white">Plan Your Budget</h2>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-6">
          <Row label="Number of Days" value={days} setValue={setDays} min={1} max={14} step={1} />
          <Row label="Number of Members" value={members} setValue={setMembers} min={1} max={12} step={1} />
          <Row label="Hotel Rate / Room / Night" value={hotelRate} setValue={setHotelRate} min={800} max={20000} step={100} suffix=" ₹" />
          <Row label="Food / Person / Day" value={foodPerDay} setValue={setFoodPerDay} min={150} max={3000} step={50} suffix=" ₹" />
          <Row label="Total Transport Cost" value={transport} setValue={setTransport} min={500} max={50000} step={500} suffix=" ₹" />
        </div>

        <motion.div
          layout
          className="rounded-2xl border border-amber-300/30 bg-gradient-to-br from-amber-300/[0.07] to-transparent p-6 space-y-4"
        >
          <p className="text-[11px] uppercase tracking-[0.25em] text-amber-200/85">Estimated Cost</p>
          <p className="font-serif text-5xl text-white">
            ₹{total.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-white/60">
            for {members} {members > 1 ? "people" : "person"} · {days} {days > 1 ? "days" : "day"} · {rooms} {rooms > 1 ? "rooms" : "room"}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            {[
              ["Hotels", hotelCost],
              ["Food", foodCost],
              ["Transport", transport],
            ].map(([k, v]) => (
              <div key={k as string} className="rounded-xl border border-white/10 bg-black/30 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">{k}</p>
                <p className="mt-1 font-serif text-sm text-white">₹{(v as number).toLocaleString("en-IN")}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-white/45">* Excludes flight tickets, shopping, and donations.</p>
        </motion.div>
      </div>
    </section>
  );
}

export function FeedbackSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", rating: 5, message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", rating: 5, message: "" });
  };

  return (
    <section id="feedback" className="px-6 py-16 md:px-12 md:py-20 border-t border-white/5">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-5 w-5 text-amber-300" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200/80">Your Voice</p>
      </div>
      <h2 className="mt-2 font-serif text-3xl md:text-5xl font-medium text-white">Give Feedback</h2>
      <p className="mt-2 text-sm text-white/65 max-w-xl">Help us serve pilgrims better. Share your thoughts about your sacred journey.</p>

      <form onSubmit={submit} className="mt-8 grid gap-4 max-w-2xl">
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            required
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-amber-300/60 focus:outline-none"
          />
          <input
            required
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-amber-300/60 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-[0.22em] text-white/60">Rating:</span>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              onClick={() => setForm({ ...form, rating: n })}
              className="p-1"
              aria-label={`${n} star`}
            >
              <Star className={`h-5 w-5 ${n <= form.rating ? "fill-amber-400 text-amber-400" : "text-white/25"}`} />
            </button>
          ))}
        </div>
        <textarea
          required
          rows={4}
          placeholder="Share your experience…"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-amber-300/60 focus:outline-none resize-none"
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-xl bg-amber-300 px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-black hover:bg-amber-200 transition"
        >
          <Send className="h-4 w-4" /> Submit Feedback
        </button>
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-sm text-emerald-300"
            >
              <CheckCircle2 className="h-4 w-4" /> Dhanyavaad! Your feedback has been received.
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </section>
  );
}

export { HotelIcon };

// ============================================================
// AI Trip Planner
// ============================================================

type City = "Vrindavan" | "Mathura" | "Ayodhya" | "Varanasi" | "Hanuman Garhi";

const CITY_ORDER: Record<City, number> = {
  Mathura: 0,
  Vrindavan: 1,
  Ayodhya: 2,
  "Hanuman Garhi": 3,
  Varanasi: 4,
};

const CITY_INFO: Record<
  City,
  { weather: "Sunny" | "Pleasant" | "Rainy" | "Hot"; minBudget: number; hotel: number; food: number; mustSee: string[] }
> = {
  Vrindavan: { weather: "Pleasant", minBudget: 3500, hotel: 2200, food: 500, mustSee: ["Prem Mandir", "Banke Bihari", "ISKCON"] },
  Mathura: { weather: "Hot", minBudget: 3000, hotel: 1900, food: 450, mustSee: ["Krishna Janmabhoomi", "Dwarkadhish", "Vishram Ghat"] },
  Ayodhya: { weather: "Pleasant", minBudget: 4000, hotel: 2400, food: 500, mustSee: ["Ram Mandir", "Hanuman Garhi", "Saryu Aarti"] },
  Varanasi: { weather: "Rainy", minBudget: 4500, hotel: 2800, food: 600, mustSee: ["Kashi Vishwanath", "Dashashwamedh Ghat", "Sarnath"] },
  "Hanuman Garhi": { weather: "Pleasant", minBudget: 2500, hotel: 1800, food: 400, mustSee: ["Hanuman Garhi Temple", "Kanak Bhawan"] },
};

export function AITripPlannerSection() {
  const [budget, setBudget] = useState(15000);
  const [days, setDays] = useState(4);
  const [members, setMembers] = useState(2);
  const [weatherPref, setWeatherPref] = useState<"Any" | "Pleasant" | "Sunny" | "Rainy" | "Hot">("Pleasant");
  const [generated, setGenerated] = useState(false);

  const result = useMemo(() => {
    const perDay = budget / Math.max(days, 1);
    // Budget-based: which cities fit
    const affordable = (Object.keys(CITY_INFO) as City[]).filter(
      (c) => (CITY_INFO[c].hotel + CITY_INFO[c].food) * members <= perDay * 1.2,
    );
    // Weather-based filter
    const weatherMatched =
      weatherPref === "Any" ? affordable : affordable.filter((c) => CITY_INFO[c].weather === weatherPref);
    const finalList = (weatherMatched.length ? weatherMatched : affordable).sort(
      (a, b) => CITY_ORDER[a] - CITY_ORDER[b],
    );

    // Route optimization: sort west→east (Mathura→Vrindavan→Ayodhya→HanumanGarhi→Varanasi)
    const route = finalList.slice(0, Math.min(days, finalList.length));

    // Itinerary
    const itinerary = Array.from({ length: days }).map((_, i) => {
      const city = route[i % route.length];
      const info = CITY_INFO[city];
      return {
        day: i + 1,
        city,
        morning: `Sunrise at ${info.mustSee[0]}`,
        afternoon: `Lunch + visit ${info.mustSee[1] ?? info.mustSee[0]}`,
        evening: info.mustSee[2] ? `Evening aarti — ${info.mustSee[2]}` : `Local market walk`,
      };
    });

    const totalCost = route.reduce(
      (acc, c) => acc + (CITY_INFO[c].hotel + CITY_INFO[c].food) * members,
      0,
    ) * Math.ceil(days / Math.max(route.length, 1));

    return { route, itinerary, totalCost, perDay };
  }, [budget, days, members, weatherPref]);

  return (
    <section id="ai-planner" className="px-6 py-16 md:px-12 md:py-20 border-t border-white/5">
      <div className="flex items-center gap-3">
        <Sparkles className="h-5 w-5 text-amber-300" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200/80">AI Trip Planner</p>
      </div>
      <h2 className="mt-2 font-serif text-3xl md:text-5xl font-medium text-white">Plan a Sacred Journey, Intelligently</h2>
      <p className="mt-3 max-w-2xl text-sm text-white/65">
        Budget-based recommendations, weather-aware suggestions, a personalised itinerary, and an optimised pilgrimage route — all in one click.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        {/* Inputs */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/65">
                <Wallet className="h-3.5 w-3.5 text-amber-300" /> Total Budget
              </label>
              <span className="font-serif text-sm text-white">₹{budget.toLocaleString("en-IN")}</span>
            </div>
            <input type="range" min={5000} max={150000} step={1000} value={budget} onChange={(e) => setBudget(+e.target.value)} className="mt-2 w-full accent-amber-300" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="text-[11px] uppercase tracking-[0.22em] text-white/65">Days</label>
              <span className="font-serif text-sm text-white">{days}</span>
            </div>
            <input type="range" min={1} max={10} step={1} value={days} onChange={(e) => setDays(+e.target.value)} className="mt-2 w-full accent-amber-300" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="text-[11px] uppercase tracking-[0.22em] text-white/65">Members</label>
              <span className="font-serif text-sm text-white">{members}</span>
            </div>
            <input type="range" min={1} max={10} step={1} value={members} onChange={(e) => setMembers(+e.target.value)} className="mt-2 w-full accent-amber-300" />
          </div>
          <div>
            <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/65">
              <Sun className="h-3.5 w-3.5 text-amber-300" /> Preferred Weather
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {(["Any", "Pleasant", "Sunny", "Rainy", "Hot"] as const).map((w) => (
                <button
                  key={w}
                  onClick={() => setWeatherPref(w)}
                  className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] border transition ${
                    weatherPref === w ? "bg-amber-300 text-black border-amber-300" : "border-white/15 text-white/70 hover:bg-white/5"
                  }`}
                >
                  {w === "Rainy" ? <CloudRain className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
                  {w}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setGenerated(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-300 px-5 py-3 text-xs font-bold uppercase tracking-[0.25em] text-black hover:bg-amber-200 transition"
          >
            <Sparkles className="h-4 w-4" /> Generate My Trip
          </button>
        </div>

        {/* Output */}
        <motion.div layout className="rounded-2xl border border-amber-300/30 bg-gradient-to-br from-amber-300/[0.06] to-transparent p-6 space-y-5">
          <AnimatePresence mode="wait">
            {!generated ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full min-h-[280px] flex flex-col items-center justify-center text-center text-white/60">
                <Sparkles className="h-10 w-10 text-amber-300/60" />
                <p className="mt-3 text-sm">Set your preferences and tap <span className="text-amber-200">Generate My Trip</span></p>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-amber-200/85">Estimated Cost</p>
                    <p className="font-serif text-3xl text-white">₹{result.totalCost.toLocaleString("en-IN")}</p>
                    <p className="text-[11px] text-white/55">for {members} · {days} days · ₹{Math.round(result.perDay).toLocaleString("en-IN")}/day budget</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] border ${
                    result.totalCost <= budget ? "bg-emerald-400/15 text-emerald-200 border-emerald-300/30" : "bg-rose-400/15 text-rose-200 border-rose-300/30"
                  }`}>
                    {result.totalCost <= budget ? "Within Budget" : "Over Budget"}
                  </span>
                </div>

                {/* Route Optimization */}
                <div>
                  <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-amber-200/85">
                    <RouteIcon className="h-3.5 w-3.5" /> Optimised Route
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {result.route.map((c, i) => (
                      <div key={c} className="flex items-center gap-2">
                        <span className="rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-xs text-white">{c}</span>
                        {i < result.route.length - 1 && <span className="text-amber-200/50">→</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Itinerary */}
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-amber-200/85">Personalised Itinerary</p>
                  <div className="mt-3 space-y-2 max-h-[260px] overflow-y-auto pr-1">
                    {result.itinerary.map((d) => (
                      <div key={d.day} className="rounded-xl border border-white/10 bg-black/30 p-3">
                        <div className="flex items-center justify-between">
                          <p className="font-serif text-sm text-white">Day {d.day} · {d.city}</p>
                          <span className="text-[10px] uppercase tracking-[0.2em] text-amber-200/70">{CITY_INFO[d.city].weather}</span>
                        </div>
                        <ul className="mt-1.5 space-y-0.5 text-[11px] text-white/70">
                          <li>🌅 {d.morning}</li>
                          <li>🍛 {d.afternoon}</li>
                          <li>🪔 {d.evening}</li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
