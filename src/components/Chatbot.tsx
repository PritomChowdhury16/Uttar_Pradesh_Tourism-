import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import { chatWithGuide } from "@/lib/api/chat.functions";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What's the best time to visit?",
  "Tell me about the rituals here",
  "How do I reach this temple?",
  "What should I wear inside?",
];

export function Chatbot({ context }: { context: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chat = useServerFn(chatWithGuide);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await chat({ data: { messages: next, context } });
      setMessages([...next, { role: "assistant", content: res.reply || "..." }]);
    } catch (e) {
      setMessages([
        ...next,
        { role: "assistant", content: e instanceof Error ? e.message : "Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-black shadow-[0_10px_30px_-5px_rgba(245,158,11,0.5)] hover:shadow-[0_14px_40px_-5px_rgba(245,158,11,0.7)] transition-shadow"
        aria-label="Open AI guide"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 flex h-[560px] max-h-[80vh] w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0a]/95 backdrop-blur-2xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-amber-500/10 to-transparent px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-black">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="font-serif text-base text-white">Divine Guide</p>
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/50">{context}</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-white/70">
                    Namaste 🙏 Ask me anything about this sacred destination — timings, rituals, history, or travel tips.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs text-white/85 hover:bg-white/10 transition"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-amber-400 text-black rounded-br-sm"
                        : "bg-white/[0.07] text-white/90 border border-white/10 rounded-bl-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.07] px-4 py-2.5 text-sm text-white/70">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking…
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-white/10 bg-black/40 p-3"
            >
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] pl-4 pr-1.5 py-1.5 focus-within:border-amber-300/50 transition">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask the guide…"
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-black disabled:opacity-40 hover:bg-amber-300 transition"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
