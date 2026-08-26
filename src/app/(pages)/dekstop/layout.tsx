"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Comfortaa, JetBrains_Mono } from "next/font/google";
import { TbInfoOctagonFilled } from "react-icons/tb";
import { BiSolidLock } from "react-icons/bi";
import { HiArrowPath } from "react-icons/hi2";
import { FaStar, FaUser, FaFolderOpen, FaEnvelope, FaFileAlt, FaInstagram, FaLinkedin, FaDiscord, FaWhatsapp } from "react-icons/fa";
import Background from "@/components/Background";
import { CursorSparkles, TopSparkles } from "@/components/Sparkles";

const comfortaa = Comfortaa({ weight: ["400", "700"], subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ weight: ["400", "500"], subsets: ["latin"] });

type AppItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
  external?: boolean;
};

export default function DekstopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [locked, setLocked] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const [time, setTime] = useState<Date | null>(null);
  const [hoveredDock, setHoveredDock] = useState<string | null>(null);
  const [welcome, setWelcome] = useState<"shown" | "leaving" | "hidden">("shown");
  const [restartBlack, setRestartBlack] = useState(false);

  // Welcome overlay: tampil 3 detik, lalu fade-out
  useEffect(() => {
    const t = setTimeout(() => setWelcome("leaving"), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (welcome === "leaving") {
      const t = setTimeout(() => setWelcome("hidden"), 700);
      return () => clearTimeout(t);
    }
  }, [welcome]);

  const apps: AppItem[] = [
    { label: "About Me", icon: <FaUser className="w-5 h-5" />, href: `/dekstop/about?name=${encodeURIComponent(name)}` },
    { label: "Projects", icon: <FaFolderOpen className="w-5 h-5" />, href: `/dekstop/projects?name=${encodeURIComponent(name)}` },
    { label: "Contact", icon: <FaEnvelope className="w-5 h-5" />, href: `/dekstop/contact?name=${encodeURIComponent(name)}` },
    { label: "Resume", icon: <FaFileAlt className="w-5 h-5" />, href: `/docs/CV.pdf`, external: true },
  ];

  const socials: AppItem[] = [
    { label: "Instagram", icon: <FaInstagram />, href: "https://www.instagram.com/" },
    { label: "LinkedIn", icon: <FaLinkedin />, href: "https://www.linkedin.com/" },
    { label: "Discord", icon: <FaDiscord />, href: "https://discordapp.com/users/892966006971043860" },
    { label: "WhatsApp", icon: <FaWhatsapp />, href: "https://wa.me/+625755500502" },
  ];

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const nameFromQuery = query.get("name");
    if (nameFromQuery) {
      setName(nameFromQuery);
    } else {
      router.replace("/");
    }
  }, [router]);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpenMenu((prev) => !prev);
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target.closest("#menu")) {
      setIsOpenMenu(false);
    }
  };

  const handleLock = () => {
    setLocked(true);
    setUnlocking(false);
    setIsOpenMenu(false);
  };

  const handleUnlock = () => {
    if (unlocking) return;
    setUnlocking(true);
    setTimeout(() => {
      setLocked(false);
      setUnlocking(false);
    }, 500);
  };

  const handleRestart = () => {
    setIsOpenMenu(false);
    setIsRestarting(true);
    setTimeout(() => {
      setRestartBlack(true);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }, 1600);
  };

  const formattedTime = time
    ? time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    : "--:--";
  const formattedDate = time
    ? time.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })
    : "";

  // Layar restart: hitam + spinner, lalu fade ke hitam total sebelum home
  // Lock screen — overlay di atas desktop agar transisinya terlihat
  if (restartBlack || isRestarting) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <HiArrowPath
          className={`w-8 h-8 text-white/40 animate-spin transition-opacity duration-500 ${
            isRestarting ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    );
  }

  return (
    <div
      onClick={handleClickOutside}
      className={`${comfortaa.className} relative w-screen h-screen overflow-hidden`}
    >
      <Background className="bg-top" />
      <div className="absolute inset-0 bg-nightblue/50 pointer-events-none" />
      <TopSparkles />
      <CursorSparkles />

      {/* Menu bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-20 h-8 flex items-center justify-between px-4 sm:px-7 bg-lightdark/70 backdrop-blur-xl border-b border-pink/30"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={handleOpenMenu}
            aria-label="Buka menu"
            aria-expanded={isOpenMenu}
            className="flex items-center justify-center w-5 h-5 text-pink hover:drop-shadow-[0_0_6px_#F72585] transition"
          >
            <FaStar className="w-4 h-4" />
          </button>
          <span className="text-silverwhite text-xs font-semibold tracking-wide">
            Hammam Mujahid's Portfolio
          </span>
        </div>

        <div className="flex items-center gap-3 text-silverwhite/80">
          <span className="text-silverwhite/60 text-xs">
            Welcome, <span className="text-silverwhite font-medium">{name}</span>
          </span>
          <span className="hidden sm:block text-silverwhite/30 text-xs">|</span>
          <span className={`${jetbrainsMono.className} text-xs tracking-wide hidden sm:inline`}>
            {formattedDate} {formattedTime}
          </span>
        </div>
      </div>

      {/* Jam widget — mode HP */}
      <div className="sm:hidden absolute top-14 left-4 z-10 flex flex-col items-start gap-1 px-4 py-3 rounded-2xl bg-lightdark/60 backdrop-blur-xl border border-pink/30 shadow-lg">
        <span className={`${jetbrainsMono.className} text-3xl font-light tracking-wide text-silverwhite`}>
          {formattedTime}
        </span>
        <span className="text-[10px] text-silverwhite/60 tracking-wide">
          {formattedDate}
        </span>
      </div>

      {/* Dropdown menu */}
      {isOpenMenu && (
        <div
          id="menu"
          className="absolute z-30 top-8 left-3 w-48 bg-lightdark/90 backdrop-blur-xl rounded-b-lg border border-t-0 border-pink/40 overflow-hidden shadow-xl"
        >
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-silverwhite border-b border-white/10 hover:bg-pink/20 transition" onClick={() => router.push(`/dekstop/about?name=${encodeURIComponent(name)}`)}>
            <TbInfoOctagonFilled className="w-5 h-5 text-pink" />
            <span>About Me</span>
          </button>
          <button onClick={handleLock} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-silverwhite border-b border-white/10 hover:bg-pink/20 transition">
            <BiSolidLock className="w-5 h-5 text-pink" />
            <span>Lock Screen</span>
          </button>
          <button onClick={handleRestart} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-silverwhite hover:bg-pink/20 transition">
            <HiArrowPath className="w-5 h-5 text-pink" />
            <span>Restart</span>
          </button>
        </div>
      )}

      {/* Ikon desktop — pojok kanan atas, konvensi Mac */}
      <div onClick={(e) => e.stopPropagation()} className="absolute z-10 top-14 right-4 flex flex-col gap-4 items-center">
        {apps.map((item) =>
          item.external ? (
            <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1 w-16">
              <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm group-hover:bg-pink/20 group-hover:border-pink/50 transition">
                {item.icon}
              </span>
              <span className="text-[10px] text-silverwhite/90 text-center leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                {item.label}
              </span>
            </a>
          ) : (
            <button key={item.label} onClick={() => router.push(item.href)} className="group flex flex-col items-center gap-1 w-16">
              <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm group-hover:bg-pink/20 group-hover:border-pink/50 transition">
                {item.icon}
              </span>
              <span className="text-[10px] text-silverwhite/90 text-center leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                {item.label}
              </span>
            </button>
          )
        )}
      </div>

      {/* Dock — float, selalu di bawah layar */}
      <div className="fixed z-20 bottom-4 left-1/2 -translate-x-1/2">
        <div onClick={(e) => e.stopPropagation()} className="flex items-end gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-lightdark/60 backdrop-blur-xl border border-pink/30 shadow-lg">
          {socials.map((item) => {
            const isHovered = hoveredDock === item.label;
            return (
              <div key={`dock-${item.label}`} className="relative flex flex-col items-center">
                {isHovered && (
                  <span className="absolute -top-12 sm:-top-14 text-[11px] sm:text-xs text-silverwhite bg-lightdark/90 px-2.5 py-1.5 rounded-md whitespace-nowrap border border-white/10">
                    {item.label}
                  </span>
                )}
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredDock(item.label)}
                  onMouseLeave={() => setHoveredDock(null)}
                  aria-label={item.label}
                  className="flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-white/10 border border-white/10 text-silverwhite text-lg sm:text-2xl transition-transform duration-150 hover:scale-125 hover:-translate-y-2 hover:bg-pink/25 hover:border-pink/50"
                >
                  {item.icon}
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Window overlay — halaman child (about / projects / contact) */}
      {children}

      {/* Welcome overlay */}
      {welcome !== "hidden" && (
        <div
          className={`pointer-events-none fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-700 ${
            welcome === "leaving" ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="absolute inset-0 bg-nightblue/70" />
          <div className="relative flex flex-col items-center gap-5">
            <FaStar className="w-12 h-12 sm:w-14 sm:h-14 text-pink drop-shadow-[0_0_25px_rgba(247,37,133,0.9)]" />
            <span
              className={`${jetbrainsMono.className} text-6xl sm:text-8xl font-light tracking-[0.15em] text-silverwhite drop-shadow-[0_0_30px_rgba(228,233,240,0.7)] ${
                welcome === "shown" ? "welcome-anim" : ""
              }`}
            >
              Welcome
            </span>
            {name && (
              <span className="text-base sm:text-xl text-silverwhite/80 tracking-widest fade-in-up">
                {name}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Lock screen overlay */}
      {locked && (
        <div
          onClick={handleUnlock}
          className={`absolute inset-0 z-[60] flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-500 ease-out ${
            unlocking ? "opacity-0 scale-110" : "opacity-100 scale-100"
          }`}
        >
          <div className="absolute inset-0 bg-nightblue/60" />
          <div className={`${jetbrainsMono.className} relative text-silverwhite text-6xl sm:text-8xl font-light tracking-tight`}>
            {formattedTime}
          </div>
          <div className="relative text-silverwhite/70 text-sm">{formattedDate}</div>
          <div className="relative mt-8 flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-pink/20 border border-pink/50 flex items-center justify-center">
              <BiSolidLock className="w-6 h-6 text-pink" />
            </div>
            <span className="text-silverwhite/60 text-xs">
              Klik di mana saja untuk membuka kunci
            </span>
          </div>
        </div>
      )}
    </div>
  );
}