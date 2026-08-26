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
  const [isRestarting, setIsRestarting] = useState(false);
  const [time, setTime] = useState<Date | null>(null);
  const [hoveredDock, setHoveredDock] = useState<string | null>(null);

  const apps: AppItem[] = [
    { label: "About Me", icon: <FaUser className="w-5 h-5" />, href: `/dekstop/about?name=${encodeURIComponent(name)}` },
    { label: "Projects", icon: <FaFolderOpen className="w-5 h-5" />, href: `/dekstop/projects?name=${encodeURIComponent(name)}` },
    { label: "Contact", icon: <FaEnvelope className="w-5 h-5" />, href: `/dekstop/contact?name=${encodeURIComponent(name)}` },
    { label: "Resume", icon: <FaFileAlt className="w-5 h-5" />, href: `/docs/CV.pdf`, external: true },
  ];

  const socials: AppItem[] = [
    { label: "Instagram", icon: <FaInstagram />, href: "https://www.instagram.com/" },
    { label: "LinkedIn", icon: <FaLinkedin />, href: "https://www.linkedin.com/" },
    { label: "Discord", icon: <FaDiscord />, href: "https://discord.com/" },
    { label: "WhatsApp", icon: <FaWhatsapp />, href: "https://wa.me/085755500502" },
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
    setIsOpenMenu(false);
  };

  const handleRestart = () => {
    setIsOpenMenu(false);
    setIsRestarting(true);
    setTimeout(() => {
      router.push("/");
    }, 1600);
  };

  const formattedTime = time
    ? time.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    : "--:--";
  const formattedDate = time
    ? time.toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short" })
    : "";

  // Layar hitam saat restart — menutup semuanya
  if (isRestarting) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <HiArrowPath className="w-8 h-8 text-white/40 animate-spin" />
      </div>
    );
  }

  // Lock screen — menutup semuanya
  if (locked) {
    return (
      <div
        onClick={() => setLocked(false)}
        className={`${comfortaa.className} w-screen h-screen flex flex-col items-center justify-center gap-4 cursor-pointer relative overflow-hidden`}
      >
        <Background />
        <div className="absolute inset-0 bg-nightblue/60" />
        <div className={`${jetbrainsMono.className} relative text-silverwhite text-6xl font-light tracking-tight`}>
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
            Portfolio
          </span>
        </div>

        <div className="flex items-center gap-3 text-silverwhite/80">
          <span className="text-silverwhite/60 text-xs">
            Welcome, <span className="text-silverwhite font-medium">{name}</span>
          </span>
          <span className="text-silverwhite/30 text-xs">|</span>
          <span className={`${jetbrainsMono.className} text-xs tracking-wide hidden sm:inline`}>
            {formattedDate} {formattedTime}
          </span>
          <span className={`${jetbrainsMono.className} text-xs tracking-wide sm:hidden`}>
            {formattedTime}
          </span>
        </div>
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
    </div>
  );
}