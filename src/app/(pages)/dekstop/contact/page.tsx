"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Comfortaa, JetBrains_Mono } from "next/font/google";
import { FaEnvelope, FaPhone, FaPaperPlane } from "react-icons/fa";

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
    "w-full bg-nightblue/5 border border-nightblue/15 rounded-lg px-3 py-2 text-xs sm:text-sm text-nightblue placeholder:text-nightblue/40 focus:outline-none focus:border-pink/60 focus:ring-2 focus:ring-pink/20 transition";

  return (
    <div
      className={`${comfortaa.className} fixed inset-0 z-40 flex items-center justify-center px-4 py-6`}
    >
      <div className="absolute inset-0 bg-nightblue/50" />

      {/* Window ala macOS */}
      <div
        className={`relative z-10 w-full max-w-4xl max-h-full flex flex-col bg-silverwhite/95 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-out ${
          closing
            ? "opacity-0 scale-75 -translate-y-6 origin-center"
            : mounted
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
        }`}
      >
        {/* Title bar */}
        <div className="relative shrink-0 h-9 flex items-center px-4 bg-lightdark border-b border-black/10">
          <div className="flex items-center gap-2">
            <button
              className="w-3 h-3 rounded-full bg-pink"
              onClick={handleClose}
              aria-label="Close"
            />
          </div>
          <span className="absolute left-1/2 -translate-x-1/2 text-xs font-semibold text-silverwhite/80">
            Contact Me
          </span>
        </div>

        {/* Konten */}
        <div className="overflow-y-auto flex-1 min-h-0 p-6 sm:p-8">
          {/* Section 1: Title */}
          <h1 className="text-center text-2xl sm:text-3xl font-bold text-nightblue mb-8">
            Contact
          </h1>

          {/* Section 2 & 3: dua kolom (mobile: urut dari atas ke bawah) */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10">
            {/* Kolom kiri: Email & Telepon */}
            <section className="flex flex-col gap-4 pb-6 md:pb-0 md:pr-10 md:border-r md:border-black/10">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-xl border border-nightblue/10 bg-nightblue/5 p-4 transition hover:border-pink/50 hover:bg-pink/10"
                >
                  <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-lg bg-pink/15 text-pink">
                    {item.icon}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-nightblue/40">
                      {item.label}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-nightblue break-words">
                      {item.value}
                    </span>
                  </div>
                </a>
              ))}
            </section>

            {/* Kolom kanan: Form */}
            <section className="pt-6 md:pt-0 md:pl-10">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-name"
                    className="text-[11px] font-semibold uppercase tracking-wider text-nightblue/40"
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
                    className="text-[11px] font-semibold uppercase tracking-wider text-nightblue/40"
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
                    className="text-[11px] font-semibold uppercase tracking-wider text-nightblue/40"
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
                  className="self-start flex items-center gap-2 rounded-full bg-pink px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition enabled:hover:bg-pink/90 enabled:hover:shadow-[0_0_12px_rgba(247,37,133,0.4)] disabled:opacity-60"
                >
                  <FaPaperPlane className="w-3.5 h-3.5" />
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
