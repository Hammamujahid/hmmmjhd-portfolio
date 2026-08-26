"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Comfortaa, JetBrains_Mono } from "next/font/google";
import { FaGithub, FaExternalLinkAlt, FaAndroid, FaFilePowerpoint } from "react-icons/fa";

const comfortaa = Comfortaa({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
});

type Template = "web" | "mobile" | "mixed";

type ProjectDetail = {
  name: string;
  category: string;
  role?: string;
  timeline?: string;
  description: string;
  tech: string[];
  features?: string[];
  contributions?: string[];
  template: Template;
  logo: string;
  screenshots: { src: string; caption: string }[];
  github?: string;
  links?: { label: string; url: string; icon?: React.ReactNode }[];
};

const projectData: Record<string, ProjectDetail> = {
  "smart-hydroponic": {
    name: "Smart Hydroponic",
    category: "Mobile",
    role: "Full-Stack IoT Developer (Solo Developer)",
    timeline: "January 2026 - July 2026",
    description:
      "An Internet of Things (IoT)-based hydroponic automation system that monitors and adjusts nutrient and pH conditions automatically and in real-time. It reads pH, EC, and water level values using sensors integrated with an ESP32 microcontroller, and is connected to a cloud-based mobile application to support remote control.",
    tech: ["Flutter", "Firebase", "ESP32 Microcontroller"],
    features: [
      "Real-time monitoring of pH, nutrient (EC), and water level values.",
      "Manual or automatic control of pH, nutrient, and water pumps based on configurable threshold values.",
      "Semi-manual sensor calibration for pH and nutrient sensors, simplifying calculations using linear regression.",
    ],
    contributions: [
      "Designed the system architecture and IoT logic end-to-end.",
      "Developed the Flutter mobile application with Firebase cloud services.",
      "Programmed the ESP32 microcontroller and integrated the sensor readings.",
      "Implemented the automatic control, calibration, and remote monitoring features.",
    ],
    template: "mixed",
    logo: "/images/smart_hydroponic/logo.png",
    github: "https://github.com/Hammamujahid/smart_hydroponic",
     links: [
    { label: "APK", url: "https://drive.google.com/", icon: <FaAndroid /> },
    { label: "Project Presentation", url: "https://drive.google.com/file/d/1xNjZ1o6AQNOil9FUEK5sj6VGY-LNxD-R/view?usp=sharing", icon: <FaFilePowerpoint /> },
  ],
    screenshots: [
      { src: "/images/smart_hydroponic/2.jpeg", caption: "Hydroponic system hardware" },
      { src: "/images/smart_hydroponic/1.jpg", caption: "Mobile application" },
    ],
  },
};

function Screenshot({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="group overflow-hidden rounded-xl bg-nightblue ring-1 ring-nightblue/10">
      <Image
        src={src}
        alt={caption}
        width={1200}
        height={750}
        sizes="(max-width: 768px) 100vw, 700px"
        className="w-full h-auto transition duration-300 group-hover:scale-105"
      />
      <figcaption className="px-3 py-2 text-[11px] text-nightblue/60 bg-silverwhite/80">
        {caption}
      </figcaption>
    </figure>
  );
}

function MobileShot({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="group flex flex-col items-center gap-2">
      <div className="relative w-40 sm:w-44 overflow-hidden rounded-2xl bg-nightblue ring-1 ring-nightblue/10 shadow-lg">
        <Image
          src={src}
          alt={caption}
          width={720}
          height={1280}
          sizes="176px"
          className="w-full h-auto transition duration-300 group-hover:scale-105"
        />
      </div>
      <figcaption className="text-[11px] text-nightblue/60 text-center">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function ProjectDetail() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);
  const [name, setName] = useState("");

  const project = params?.slug ? projectData[params.slug] : undefined;

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setName(query.get("name") ?? "");
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  const handleBack = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      router.push(`/dekstop/projects?name=${encodeURIComponent(name)}`);
    }, 320);
  };

  if (!project) {
    return null;
  }

  return (
    <div
      className={`${comfortaa.className} fixed inset-0 z-40`}
    >
      <div className="absolute inset-0 bg-nightblue/50" />

      {/* Window detail fullscreen */}
      <div
        className={`absolute inset-2 sm:inset-3 md:inset-4 flex flex-col bg-silverwhite/95 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-out ${
          closing
            ? "opacity-0 scale-95"
            : mounted
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
        }`}
      >
        {/* Title bar */}
        <div className="relative shrink-0 h-9 sm:h-10 flex items-center px-4 bg-lightdark border-b border-black/10">
          <div className="flex items-center gap-2">
            <button
              className="w-3 h-3 rounded-full bg-pink"
              onClick={handleBack}
              aria-label="Back"
            />
          </div>
          <span className="absolute left-1/2 -translate-x-1/2 text-xs font-semibold text-silverwhite/80">
            {project.name}
          </span>
        </div>

        {/* Konten — fullscreen, scroll */}
        <div className="overflow-y-auto flex-1 min-h-0">
          <div className="max-w-5xl mx-auto w-full p-5 sm:p-8 flex flex-col gap-6 sm:gap-8">
            {/* Header: logo + info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                <Image
                  src={project.logo}
                  alt={`${project.name} logo`}
                  width={80}
                  height={80}
                  sizes="80px"
                  className="w-16 sm:w-20 h-auto object-contain rounded-2xl overflow-hidden shadow-md"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xl sm:text-2xl font-bold text-nightblue">
                  {project.name}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-pink font-semibold">
                  {project.category}
                </span>
                {(project.role || project.timeline) && (
                  <div className="flex flex-wrap gap-x-6 gap-y-1 mt-1">
                    {project.role && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-nightblue/40">
                          Role
                        </span>
                        <span className="text-[11px] sm:text-xs text-nightblue/80">
                          {project.role}
                        </span>
                      </div>
                    )}
                    {project.timeline && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-nightblue/40">
                          Timeline
                        </span>
                        <span className="text-[11px] sm:text-xs text-nightblue/80">
                          {project.timeline}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Tech stack */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-nightblue/40">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className={`${jetbrainsMono.className} rounded-full bg-pink/10 px-3 py-1 text-[10px] sm:text-xs text-pink`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-nightblue/40">
                About
              </span>
              <p className="text-xs sm:text-sm leading-relaxed text-nightblue/75 text-justify w-full">
                {project.description}
              </p>
            </div>

            {/* Screenshots sesuai template */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-nightblue/40">
                Images
              </span>

              {project.template === "web" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.screenshots.map((s) => (
                    <Screenshot key={s.caption} {...s} />
                  ))}
                </div>
              )}

              {project.template === "mobile" && (
                <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-10 py-4">
                  {project.screenshots.map((s) => (
                    <MobileShot key={s.caption} {...s} />
                  ))}
                </div>
              )}

              {project.template === "mixed" && (
                <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                  <div className="flex-1 min-w-0">
                    <Screenshot {...project.screenshots[0]} />
                  </div>
                  <div className="flex-shrink-0 flex justify-center">
                    <MobileShot {...project.screenshots[1]} />
                  </div>
                </div>
              )}
            </div>

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-nightblue/40">
                  Key Features
                </span>
                <ul className="flex flex-col gap-1.5">
                  {project.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-nightblue/75"
                    >
                      <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-pink" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* My Contribution */}
            {project.contributions && project.contributions.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-nightblue/40">
                  My Contribution
                </span>
                <ul className="flex flex-col gap-1.5">
                  {project.contributions.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-nightblue/75"
                    >
                      <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-pink" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tombol link eksternal */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={project.github ?? "https://github.com/"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-pink px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-pink/90 hover:shadow-[0_0_12px_rgba(247,37,133,0.4)]"
              >
                <FaGithub className="w-4 h-4" />
                GitHub
              </a>
              {project.links?.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-pink px-5 py-2.5 text-xs sm:text-sm font-semibold text-pink transition hover:bg-pink/10"
                >
                  {link.icon ?? <FaExternalLinkAlt className="w-3.5 h-3.5" />}
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
