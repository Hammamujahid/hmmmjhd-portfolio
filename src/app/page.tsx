"use client";

import { Comfortaa, JetBrains_Mono } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiArrowRightCircle } from "react-icons/hi2";
import { FaUserCircle } from "react-icons/fa";

const comfortaa = Comfortaa({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
});

export default function Home() {
  const [name, setName] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Animasikan progress bar dari 0 -> 100% begitu proses masuk dimulai
  useEffect(() => {
    if (isLoading) {
      const raf = requestAnimationFrame(() => setProgress(100));
      return () => cancelAnimationFrame(raf);
    }
  }, [isLoading]);

  const handleNavigation = () => {
    if (!name.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      router.push(`/dekstop?name=${encodeURIComponent(name)}`);
    }, 4000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleNavigation();
  };

  return (
    <div
      className={`${comfortaa.className} relative w-screen h-screen bg-[url('/images/bg.jpeg')] bg-cover bg-bottom overflow-hidden`}
    >
      {/* Veil gelap biar konsisten sama tampilan desktop & lock screen */}
      <div className="absolute inset-0 bg-[#1B1830]/40 backdrop-blur-sm" />

      {/* Label kecil ala menu bar, di pojok kanan atas */}
      <div
        className={`${jetbrainsMono.className} absolute top-5 right-6 text-[10px] sm:text-xs text-[#F5F1E8]/60 tracking-wide border border-[#E8A33D]/30 rounded-full px-3 py-1 bg-[#1B1830]/40`}
      >
        In Progress
      </div>

      {/* Kartu login */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-4 px-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#E8A33D]/20 blur-xl scale-110" />
          <FaUserCircle className="relative w-20 h-20 sm:w-24 sm:h-24 text-[#F5F1E8]/90 drop-shadow-lg" />
        </div>

        <div className="text-base sm:text-lg font-bold text-[#F5F1E8] text-center">
          Mujahid&apos;s Portfolio
        </div>

        <div className="w-56 sm:w-72 flex flex-col items-center gap-3 mt-2">
          {!isLoading ? (
            <div className="w-full flex items-center gap-2 bg-[#1B1830]/40 border border-[#E8A33D]/30 focus-within:border-[#E8A33D]/70 rounded-full pl-4 pr-1.5 py-1.5 backdrop-blur-md transition">
              <input
                type="text"
                name="name"
                id="name"
                maxLength={15}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Input your name..."
                autoFocus
                className="flex-1 bg-transparent text-[#F5F1E8] placeholder:text-[#F5F1E8]/40 text-xs sm:text-sm focus:outline-none min-w-0"
              />
              <button
                onClick={handleNavigation}
                disabled={!name.trim()}
                aria-label="Masuk"
                className="flex items-center justify-center w-8 h-8 rounded-full text-[#E8A33D] disabled:text-[#F5F1E8]/20 enabled:hover:bg-[#E8A33D]/15 enabled:hover:drop-shadow-[0_0_6px_#E8A33D] transition shrink-0"
              >
                <HiArrowRightCircle className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center gap-2">
              <span
                className={`${jetbrainsMono.className} text-[10px] sm:text-xs text-[#F5F1E8]/60 tracking-wide`}
              >
                Preparing the dekstop, {name}...
              </span>
              <div className="w-full h-1 rounded-full bg-[#F5F1E8]/15 overflow-hidden">
                <div
                  className="h-full bg-[#E8A33D] rounded-full transition-all duration-[4000ms] ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
