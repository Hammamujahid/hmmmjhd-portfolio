"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Comfortaa, JetBrains_Mono } from "next/font/google";
import { FaGraduationCap } from "react-icons/fa";

const comfortaa = Comfortaa({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
});

const aboutText =
  "My full name is Hammam Mujahid, a graduate of the Informatics Engineering program at Politeknik Elektronika Negeri Surabaya. I have strong skills in web and mobile application development, including backend development with Laravel, frontend with Next.js/React, and mobile with Flutter. Through various projects involving API integration, databases, and cloud services such as Firebase and Vercel, I am experienced in building everything from user interfaces to reliable backend systems. Driven by a passion for continuous learning and adapting to new technologies, I aim to grow as a professional developer, contribute to collaborative teams, and create digital solutions that make a real impact.";

const skills = [
  {
    category: "Web & Mobile",
    items: [
      "Laravel",
      "Next.js / React",
      "Tailwind CSS",
      "Flutter / Dart",
    ],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "Firebase"],
  },
  {
    category: "Others",
    items: ["REST API", "Github", "N8N Automation", "Arduino IDE"],
  },
  {
    category: "Soft Skills",
    items: [
      "Problem Solving",
      "Team Collaboration",
      "Fast Learner",
      "Adaptability",
    ],
  },
];

const education = [
  {
    school: "Electronic Engineering Polytechnic Institute of Surabaya",
    degree: "D4 Informatics Engineering",
    year: "2025 - 2026 / IPK 3.67",
  },
  {
    school: "Electronic Engineering Polytechnic Institute of Surabaya",
    degree: "D3 Informatics Engineering",
    year: "2022 — 2025 / IPK 3.61",
  },
];

export default function About() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);
  const [name, setName] = useState("");

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

  return (
    <div
      className={`${comfortaa.className} fixed inset-0 z-40 flex items-center justify-center px-4 py-6`}
    >
      {/* Backdrop gelap transparan — desktop tetap terlihat */}
      <div className="absolute inset-0 bg-nightblue/40 backdrop-blur-sm" />

      {/* Glow dekoratif di belakang window */}
      <div className="absolute w-96 h-96 rounded-full bg-pink/20 blur-3xl -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-96 h-96 rounded-full bg-pink/10 blur-3xl bottom-0 right-0 pointer-events-none" />

      {/* Window kaca (glassmorphism) */}
      <div
        className={`relative z-10 w-full max-w-md md:max-w-3xl lg:max-w-4xl max-h-full flex flex-col bg-white/10 backdrop-blur-2xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/15 overflow-hidden transition-all duration-300 ease-out ${
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
            About Me
          </span>
        </div>

        {/* Konten */}
        <div className="overflow-y-auto flex-1 min-h-0 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-[16rem_1fr] gap-6 md:gap-x-8 md:items-stretch">
          {/* Kolom Kiri (desktop): Profil + Pendidikan */}
          <div className="contents md:flex md:flex-col md:gap-6 md:border-r md:border-white/10 md:pr-8">
            {/* Profil */}
            <div
              className="order-1 flex flex-col items-center gap-4 md:py-2 stagger-item"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40">
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-pink via-pink/50 to-nightblue/30 blur-md opacity-80 animate-pulse" />
                <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-white/20 shadow-lg">
                  <Image
                    src="/images/profile.jpeg"
                    alt="Foto Mujahid"
                    fill
                    sizes="(min-width: 768px) 160px, 144px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>

              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-lg sm:text-xl font-bold text-silverwhite">
                  Hammam Mujahid
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-pink/15 border border-pink/30 px-3 py-0.5 text-[10px] font-semibold text-outline-pink">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink animate-pulse" />
                  Full-Stack Developer
                </span>
              </div>
            </div>

            {/* Pendidikan */}
            <section
              className="order-3 w-full flex flex-col gap-3 stagger-item"
              style={{ animationDelay: "0.2s" }}
            >
              <h2 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-silverwhite/50">
                <FaGraduationCap className="w-3.5 h-3.5 text-pink" />
                Educations
              </h2>
              <div className="flex flex-col gap-3">
                {education.map((edu, i) => (
                  <div
                    key={`${edu.school}-${i}`}
                    className="group flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-3 transition hover:border-pink/40 hover:bg-white/10"
                  >
                    <span className="mt-0.5 flex items-center justify-center w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br from-pink/30 to-pink/10 text-pink border border-pink/25 transition group-hover:scale-105">
                      <FaGraduationCap className="w-4 h-4" />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs sm:text-sm font-semibold text-silverwhite leading-snug">
                        {edu.school}
                      </span>
                      <span className="text-[11px] sm:text-xs text-silverwhite/60">
                        {edu.degree}
                      </span>
                      <span
                        className={`${jetbrainsMono.className} text-[10px] text-silverwhite/40`}
                      >
                        {edu.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Kolom Kanan (desktop): About Me + My Skills */}
          <div className="contents md:flex md:flex-col md:gap-6 md:justify-center md:items-center">
            {/* About Me */}
            <section
              className="order-2 w-full flex flex-col gap-2 stagger-item"
              style={{ animationDelay: "0.15s" }}
            >
              <p className="text-xs sm:text-sm leading-relaxed text-silverwhite/80 text-justify">
                {aboutText}
              </p>
            </section>

            {/* My Skills */}
            <section
              className="order-4 w-full flex flex-col gap-3 stagger-item"
              style={{ animationDelay: "0.25s" }}
            >
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-silverwhite/50">
                My Skills
              </h2>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skills.map((skill) => (
                  <div
                    key={skill.category}
                    className="flex flex-col gap-1.5 rounded-xl bg-white/5 border border-white/10 p-3.5 backdrop-blur-sm transition hover:border-pink/30 hover:bg-white/10"
                  >
                    <h3 className="flex items-center gap-1.5 text-xs font-bold text-silverwhite/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink" />
                      {skill.category}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {skill.items.map((item) => (
                        <span
                          key={item}
                          className={`${jetbrainsMono.className} rounded-md bg-white/8 px-2 py-0.5 text-[10px] text-silverwhite/65 transition hover:bg-pink/20 hover:text-pink`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
