"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Comfortaa, JetBrains_Mono } from "next/font/google";
import { FaEnvelope, FaPhone, FaPaperPlane, FaMapMarkerAlt } from "react-icons/fa";

const comfortaa = Comfortaa({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
});

const contactInfo = [
  {
    icon: <FaEnvelope className="w-4 h-4" />,
    label: "Email",
    value: "hammamujahid@gmail.com",
    href: "mailto:hammamujahid@gmail.com",
  },
  {
    icon: <FaPhone className="w-4 h-4" />,
    label: "Phone",
    value: "+62 857 5550 0502",
    href: "tel:+6285755500502",
  },
  {
    icon: <FaMapMarkerAlt className="w-4 h-4" />,
    label: "Location",
    value: "Surabaya, Indonesia",
    href: "#",
  },
];

export default function Contact() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);
  const [name, setName] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setName(query.get("name") ?? "");
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      router.push(`/dekstop?name=${encodeURIComponent(name)}`);
    }, 320);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    const mailto = `mailto:hammamujahid@gmail.com?subject=${encodeURIComponent(
      `[Portfolio] Pesan dari ${form.name}`
    )}&body=${encodeURIComponent(
      `Nama: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )}`;
    window.location.href = mailto;
    setTimeout(() => setStatus("sent"), 800);
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-silverwhite placeholder:text-silverwhite/35 focus:outline-none focus:border-pink/60 focus:ring-4 focus:ring-pink/10 transition";

  return (
    <div
      className={`${comfortaa.className} fixed inset-0 z-40 flex items-center justify-center px-4 py-6`}
    >
      <div className="absolute inset-0 bg-nightblue/40 backdrop-blur-sm" />
      <div className="absolute w-96 h-96 rounded-full bg-pink/20 blur-3xl -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-80 h-80 rounded-full bg-pink/10 blur-3xl bottom-0 right-0 pointer-events-none" />

      {/* Window kaca */}
      <div
        className={`relative z-10 w-full max-w-4xl max-h-full flex flex-col bg-white/10 backdrop-blur-2xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/15 overflow-hidden transition-all duration-300 ease-out ${
          closing
            ? "opacity-0 scale-75 -translate-y-6 origin-center"
            : mounted
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
        }`}
      >
        {/* Title bar */}
        <div className="relative shrink-0 h-10 flex items-center px-4 bg-white/5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <button
              aria-label="Close"
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-110 transition"
            />
          </div>
          <span className="absolute left-1/2 -translate-x-1/2 text-xs font-semibold text-silverwhite/90">
            Contact Me
          </span>
        </div>

        {/* Konten */}
        <div className="overflow-y-auto flex-1 min-h-0 p-6 sm:p-8">
          {/* Section 1: Title */}
          <div className="text-center mb-8 stagger-item">
            <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-pink font-bold mb-2">
              Get In Touch
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-silverwhite">
              Contact
            </h1>
            <div className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-gradient-to-r from-pink to-pink/30" />
          </div>

          {/* Section 2 & 3: dua kolom */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10">
            {/* Kolom kiri: info kontak */}
            <section className="flex flex-col justify-center gap-4 pb-6 md:pb-0 md:pr-10 md:border-r md:border-white/10">
              {contactInfo.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group stagger-item flex items-center gap-4 rounded-xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm transition hover:border-pink/40 hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                >
                  <span className="flex items-center justify-center w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-pink/30 to-pink/10 text-pink border border-pink/25 transition group-hover:scale-105">
                    {item.icon}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-silverwhite/40">
                      {item.label}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-silverwhite break-words group-hover:text-pink transition">
                      {item.value}
                    </span>
                  </div>
                </a>
              ))}
            </section>

            {/* Kolom kanan: Form */}
            <section
              className="pt-6 md:pt-0 md:pl-10 stagger-item"
              style={{ animationDelay: "0.3s" }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-name"
                    className="text-[10px] font-bold uppercase tracking-wider text-silverwhite/50"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Your name"
                    required
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-email"
                    className="text-[10px] font-bold uppercase tracking-wider text-silverwhite/50"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="Your email"
                    required
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-[10px] font-bold uppercase tracking-wider text-silverwhite/50"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder="Write your message..."
                    required
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="self-start inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink to-pink/80 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-[0_4px_16px_rgba(247,37,133,0.35)] transition enabled:hover:shadow-[0_6px_24px_rgba(247,37,133,0.5)] enabled:hover:-translate-y-0.5 disabled:opacity-60"
                >
                  <FaPaperPlane className="w-3.5 h-3.5 transition group-hover:rotate-12" />
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>

                {status === "sent" && (
                  <p className="text-[11px] sm:text-xs text-pink">
                    Your email app should open to finish sending. Thanks!
                  </p>
                )}
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}