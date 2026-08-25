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
    items: ["Laravel", "Next.js / React", "Tailwind CSS", "HTML / CSS / JS", "Flutter / Dart"],
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
    degree: "D3 Teknik Informatika",
    year: "2022 — 2025 / IPK 3.61",
  },
  {
    school: "Electronic Engineering Polytechnic Institute of Surabaya",
    degree: "D4/LJ Teknik Informatika",
    year: "2025 - 2026 / IPK 3.7",
  },
];

export default function About() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setName(query.get("name") ?? "");
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`${comfortaa.className} relative w-screen h-screen bg-[url('/images/bg.jpeg')] bg-cover bg-bottom overflow-hidden flex items-center justify-center px-4 py-6`}
    >
      {/* Veil gelap, konsisten sama desktop & home */}
      <div className="absolute inset-0 bg-[#1B1830]/50 backdrop-blur-sm" />

      {/* Window ala "About This Mac" */}
      <div
        className={`relative z-10 w-full max-w-md md:max-w-3xl lg:max-w-4xl max-h-full flex flex-col bg-[#F5F1E8]/95 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-out ${
          mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Title bar */}
        <div className="relative shrink-0 h-9 flex items-center px-4 bg-[#E9E4D8] border-b border-black/5">
          <div className="flex items-center gap-2">
            <button
              className="w-3 h-3 rounded-full bg-[#FF5F57]"
              onClick={() =>
                router.push(`/dekstop?name=${encodeURIComponent(name)}`)
              }
            />
          </div>
          <span className="absolute left-1/2 -translate-x-1/2 text-xs font-semibold text-[#1B1830]/70">
            About Me
          </span>
        </div>

        {/* Konten */}
        <div className="overflow-y-auto flex-1 min-h-0 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-[16rem_1fr] gap-6 md:gap-x-8 md:items-stretch">
          {/* Kolom Kiri (desktop): Profil + Pendidikan */}
          <div className="contents md:flex md:flex-col md:gap-6 md:border-r md:border-black/5 md:pr-8">
            {/* Profil */}
            <div className="order-1 flex flex-col items-center gap-4 md:py-2">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 ring-[#E8A33D]/40 shadow-lg">
                <Image
                  src="/images/photoprofile.jpg"
                  alt="Foto Mujahid"
                  fill
                  sizes="(min-width: 768px) 144px, 128px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex flex-col items-center gap-0.5 text-center">
                <span className="text-lg sm:text-xl font-bold text-[#1B1830]">
                  Hammam Mujahid
                </span>
                <span className="text-xs sm:text-sm text-[#1B1830]/60">
                  Full-Stack Developer
                </span>
              </div>
            </div>

            {/* Pendidikan */}
            <section className="order-3 w-full flex flex-col gap-3">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#1B1830]/40">
                Educations
              </h2>
              <div className="flex flex-col gap-3">
                {education.map((edu) => (
                  <div key={edu.school} className="flex items-start gap-3">
                    <span className="mt-0.5 flex items-center justify-center w-8 h-8 shrink-0 rounded-lg bg-[#E8A33D]/15 text-[#E8A33D]">
                      <FaGraduationCap className="w-4 h-4" />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-semibold text-[#1B1830]">
                        {edu.school}
                      </span>
                      <span className="text-[11px] sm:text-xs text-[#1B1830]/60">
                        {edu.degree}
                      </span>
                      <span
                        className={`${jetbrainsMono.className} text-[10px] text-[#1B1830]/40`}
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
            <section className="order-2 w-full flex flex-col gap-2">
              {/* <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#1B1830]/40">
                About Me
              </h2> */}
              <p className="text-xs sm:text-sm leading-relaxed text-[#1B1830]/80 text-justify">
                {aboutText}
              </p>
            </section>

            {/* My Skills */}
            <section className="order-4 w-full flex flex-col gap-3">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#1B1830]/40">
                My Skills
              </h2>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill) => (
                  <div key={skill.category} className="flex flex-col gap-1.5">
                    <h3 className="text-xs font-semibold text-[#1B1830]/75">
                      {skill.category}
                    </h3>
                    <ul className="flex flex-col gap-0.5 text-[11px] sm:text-xs text-[#1B1830]/60">
                      {skill.items.map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
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
