"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Comfortaa, JetBrains_Mono } from "next/font/google";
import { TbInfoOctagonFilled } from "react-icons/tb";
import { BiSolidLock } from "react-icons/bi";
import { HiArrowPath } from "react-icons/hi2";
import {
  FaStar,
  FaUser,
  FaFolderOpen,
  FaEnvelope,
  FaFileAlt,
  FaWifi,
} from "react-icons/fa";
import { BsBatteryFull } from "react-icons/bs";

const comfortaa = Comfortaa({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
});

// Ganti href sesuai struktur route portofolio kamu
type AppItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
};

const Desktop = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [locked, setLocked] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const [time, setTime] = useState<Date | null>(null);
  const [hoveredDock, setHoveredDock] = useState<string | null>(null);
  const apps: AppItem[] = [
    { label: "About Me", icon: <FaUser className="w-5 h-5" />, href: `/about?name=${encodeURIComponent(name)}` },
    { label: "Projects", icon: <FaFolderOpen className="w-5 h-5" />, href: `/projects?name=${encodeURIComponent(name)}` },
    { label: "Contact", icon: <FaEnvelope className="w-5 h-5" />, href: `/contact?name=${encodeURIComponent(name)}` },
    { label: "Resume", icon: <FaFileAlt className="w-5 h-5" />, href: `/resume?name=${encodeURIComponent(name)}` },
  ];

  // Ambil nama dari query, redirect ke lock screen kalau gak ada
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const nameFromQuery = query.get("name");
    if (nameFromQuery) {
      setName(nameFromQuery);
    } else {
      router.push("/");
    }
  }, [router]);

  // Jam live di menu bar
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

  // Restart: layar menghitam sesaat, lalu balik ke Home
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
    ? time.toLocaleDateString("id-ID", {
        weekday: "short",
        day: "numeric",
        month: "short",
      })
    : "";

  // Layar hitam sesaat sebelum kembali ke Home
  if (isRestarting) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <HiArrowPath className="w-8 h-8 text-white/40 animate-spin" />
      </div>
    );
  }

  // Layar terkunci ala macOS — klik di mana saja untuk kembali
  if (locked) {
    return (
      <div
        onClick={() => setLocked(false)}
        className={`${comfortaa.className} w-screen h-screen bg-[url('/images/bg.jpeg')] bg-cover bg-bottom flex flex-col items-center justify-center gap-4 cursor-pointer relative`}
      >
        <div className="absolute inset-0 bg-[#1B1830]/40" />
        <div className={`${jetbrainsMono.className} relative text-[#F5F1E8] text-6xl font-light tracking-tight`}>
          {formattedTime}
        </div>
        <div className="relative text-[#F5F1E8]/70 text-sm">{formattedDate}</div>
        <div className="relative mt-8 flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-[#E8A33D]/20 border border-[#E8A33D]/50 flex items-center justify-center">
            <BiSolidLock className="w-6 h-6 text-[#E8A33D]" />
          </div>
          <span className="text-[#F5F1E8]/60 text-xs">
            Klik di mana saja untuk membuka kunci
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClickOutside}
      className={`${comfortaa.className} relative w-screen h-screen bg-[url('/images/bg.jpeg')] bg-cover bg-bottom overflow-hidden`}
    >
      {/* Veil tipis biar teks/ikon tetap kebaca di atas wallpaper apapun */}
      <div className="absolute inset-0 bg-[#1B1830]/25 pointer-events-none" />

      {/* Menu bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-20 h-8 flex items-center justify-between px-4 sm:px-7 bg-[#1B1830]/70 backdrop-blur-xl border-b border-[#E8A33D]/30"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={handleOpenMenu}
            aria-label="Buka menu"
            aria-expanded={isOpenMenu}
            className="flex items-center justify-center w-5 h-5 text-[#E8A33D] hover:drop-shadow-[0_0_6px_#E8A33D] transition"
          >
            <FaStar className="w-4 h-4" />
          </button>
          <span className="text-[#F5F1E8] text-xs font-semibold tracking-wide">
            Portfolio
          </span>
        </div>

        <div className="flex items-center gap-3 text-[#F5F1E8]/80">
                  <span className="hidden sm:block text-[#F5F1E8]/60 text-xs">
            Welcome, <span className="text-[#F5F1E8] font-medium">{name}</span>
          </span>
          <span className="hidden sm:block text-[#F5F1E8]/30 text-xs">|</span>
          <FaWifi className="w-3.5 h-3.5" />
          <BsBatteryFull className="w-4 h-4" />
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
          className="absolute z-30 top-8 left-3 w-48 bg-[#1B1830]/90 backdrop-blur-xl rounded-b-lg border border-t-0 border-[#E8A33D]/40 overflow-hidden shadow-xl"
        >
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#F5F1E8] border-b border-white/10 hover:bg-[#E8A33D]/20 transition" onClick={() => router.push(`/about?name=${encodeURIComponent(name)}`)}>
            <TbInfoOctagonFilled className="w-5 h-5 text-[#E8A33D]" />
            <span>About Me</span>
          </button>
          <button
            onClick={() => {
              setLocked(true);  
              setIsOpenMenu(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#F5F1E8] border-b border-white/10 hover:bg-[#E8A33D]/20 transition"
          >
            <BiSolidLock className="w-5 h-5 text-[#E8A33D]" />
            <span>Lock Screen</span>
          </button>
          <button
            onClick={handleRestart}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#F5F1E8] hover:bg-[#E8A33D]/20 transition"
          >
            <HiArrowPath className="w-5 h-5 text-[#E8A33D]" />
            <span>Restart</span>
          </button>
        </div>
      )}

      {/* Ikon desktop — pojok kanan atas, konvensi Mac */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute z-10 top-14 right-4 flex flex-col gap-4 items-center"
      >
        {apps.map((item) => (
          <button
            key={item.label}
            onClick={() => router.push(item.href)}
            className="group flex flex-col items-center gap-1 w-16"
          >
            <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm group-hover:bg-[#E8A33D]/20 group-hover:border-[#E8A33D]/50 transition">
              {item.icon}
            </span>
            <span className="text-[10px] text-[#F5F1E8]/90 text-center leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Dock */}
      <div className="absolute z-20 bottom-4 left-1/2 -translate-x-1/2">
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-end gap-2 px-3 py-2 rounded-2xl bg-[#1B1830]/50 backdrop-blur-xl border border-[#E8A33D]/30 shadow-lg"
        >
          {apps.map((item) => {
            const isHovered = hoveredDock === item.label;
            return (
              <div key={`dock-${item.label}`} className="relative flex flex-col items-center">
                {isHovered && (
                  <span className="absolute -top-8 text-[10px] text-[#F5F1E8] bg-[#1B1830]/90 px-2 py-1 rounded-md whitespace-nowrap border border-white/10">
                    {item.label}
                  </span>
                )}
                <button
                  onClick={() => router.push(item.href)}
                  onMouseEnter={() => setHoveredDock(item.label)}
                  onMouseLeave={() => setHoveredDock(null)}
                  aria-label={item.label}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/10 text-[#F5F1E8] transition-transform duration-150 hover:scale-125 hover:-translate-y-2 hover:bg-[#E8A33D]/25 hover:border-[#E8A33D]/50"
                >
                  {item.icon}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Desktop;
