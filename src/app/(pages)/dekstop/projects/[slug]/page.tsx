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
  type?: string;
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
    role: "Full-Stack IoT Developer (Solo)",
    timeline: "January 2026 - July 2026",
    type: "Final Project (D4)",
    description:
      "Hydroponic growers often struggle to keep pH, nutrient (EC), and water levels stable. Manual monitoring is time-consuming, and any imbalance can quickly harm crops. Smart Hydroponic solves this with an IoT-based automation system that keeps these conditions in check automatically and in real time. pH, EC, and water level sensors feed live readings into an ESP32 microcontroller, which sends the data to a cloud-backed mobile app (Flutter + Firebase). From there, users can monitor conditions and control the pumps, either manually or automatically based on configurable thresholds, from anywhere. The result is healthier crops for hydroponic growers and hobbyists, with less daily effort and full remote control over their system.",
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
    { label: "APK", url: "https://drive.google.com/file/d/1JwogZrCrAp5soMq_yq3hkyyG_EFkLRQy/view?usp=sharing", icon: <FaAndroid /> },
    { label: "Project Presentation", url: "https://drive.google.com/file/d/1xNjZ1o6AQNOil9FUEK5sj6VGY-LNxD-R/view?usp=sharing", icon: <FaFilePowerpoint /> },
  ],
    screenshots: [
      { src: "/images/smart_hydroponic/2.jpeg", caption: "Hydroponic system hardware" },
      { src: "/images/smart_hydroponic/1.png", caption: "3D mockup view" },
    ],
  },

  "simlitabmas": {
    name: "Simlitabmas",
    category: "Web",
    role: "Full-Stack Developer (Team)",
    timeline: "January 2025 - June 2025",
    type: "Final Project (D3)",
    description:
      "Universities juggle a huge volume of research and community service (pengabdian) submissions, and managing proposals, monitoring reports, and coordinating reviewers manually is slow, scattered, and error-prone. Simlitabmas solves this with a research and community service information management system that digitizes the full submission lifecycle. Applicants submit proposals and supporting aspects, which move through monitoring and evaluation (monev) until the final stage, all reviewable by reviewers through a dedicated workflow. This makes life easier for everyone. Applicants get a simpler, guided way to submit and track their work from proposal to finish. Reviewers can evaluate submissions faster. Admins save significant time by plotting reviewers and managing all system data from one centralized place. The university, in turn, gets a transparent, end-to-end process.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "MinIO"],
    features: [
      "End-to-end submission workflow for research and community service proposals, covering proposal and related aspects up to the final stage.",
      "Monitoring and evaluation (monev) features that streamline the review process for reviewers.",
      "Role-based access for applicants, reviewers, and admins, including admin tools for plotting assignments and managing data.",
      "Centralized document and data management for the entire submission lifecycle.",
    ],
    contributions: [
      "Developed the full-stack reviewer module for both research and community service areas.",
      "Built features enabling admins to plot/assign reviewers to research and community service proposals.",
      "Implemented the reviewer workflow for reviewing and managing assigned submissions.",
      "Collaborated with team members on the overall system design and integration.",
    ],
    template: "web",
    logo: "/images/simlitabmas/logo.png",
    github: "https://github.com/Hammamujahid/Simlitabmas",
    screenshots: [
      { src: "/images/simlitabmas/1.png", caption: "Review page view" },
      { src: "/images/simlitabmas/2.png", caption: "3D mockup view" },
    ],
  },
  serviskompresor: {
    name: "Service Kompresor",
    category: "Web",
    role: "Frontend Developer (Solo)",
    timeline: "June 2026",
    type: "Freelance Project",
    description:
      "Service Kompresor is a landing page built for PT. Dayasa Cipta Mandiri to showcase their compressor maintenance and repair services. It presents the company, highlights key service offerings, and guides potential customers toward getting in touch, all wrapped in a clean, brand-aligned design.",
    tech: ["Html", "CSS", "Javascript"],
    features: [
      "Visually polished landing page tailored to the company brand.",
      "Dedicated sections, including a hero banner and team overview.",
      "Clear calls to action that direct visitors to contact the company.",
      "Responsive layout for a consistent experience on desktop and mobile.",
    ],
    contributions: [
      "Developed the full landing page interface using HTML, CSS, and JavaScript.",
      "Built each section, from the hero banner to the team overview, to match the company branding.",
      "Ensured a responsive, clean, and accessible layout across devices.",
    ],
    template: "web",
    logo: "/images/serviskompresor/logo.png",
    github: "https://github.com/Hammamujahid/serviskompresor",
    screenshots: [
      { src: "/images/serviskompresor/1.png", caption: "Hero section view" },
      { src: "/images/serviskompresor/2.png", caption: "Team section view" },
    ],
    links: [
      { label: "Live Demo", url: "https://www.serviskompresor.com/", icon: <FaExternalLinkAlt /> },
    ],
  },
  "e-siklinik": {
    name: "E-Siklinik",
    category: "Mobile",
    role: "Mobile Developer (Team)",
    timeline: "April 2024 - June 2024",
    type: "Academic Project",
    description:
      "E-Siklinik is a mobile application designed to digitize clinic management operations. It streamlines patient registration, medical record management, and appointment scheduling, providing healthcare facilities with an efficient digital solution to replace manual processes.",
    tech: ["Flutter", "Laravel", "MySQL"],
    features: [
      "Patient registration and profile management system.",
      "Digital medical records with history tracking.",
      "Appointment scheduling and management.",
      "Real-time data synchronization across devices.",
    ],
    contributions: [
      "Designed and developed the complete mobile application using Flutter.",
      "Implemented Laravel and MySQL for the backend and database.",
      "Created intuitive UI/UX for healthcare staff and patients.",
      "Built the medical records and appointment management modules.",
    ],
    template: "mobile",
    logo: "/images/e-siklinik/logo.png",
    github: "https://github.com/Hammamujahid/E-Siklinik",
    links: [
      { label: "Project Presentation", url: "https://drive.google.com/file/d/1U5ilZfyKFj86SqN_qIVf-LbwX53PmCRf/view?usp=sharing", icon: <FaFilePowerpoint /> },
      { label: "APK", url: "https://drive.google.com/file/d/1bcpKIIfXQVzMkluU-qr3J_z82TDz7R0q/view?usp=sharing", icon: <FaAndroid /> },
    ],
    screenshots: [
      { src: "/images/e-siklinik/1.png", caption: "Dashboard screen" },
      { src: "/images/e-siklinik/2.png", caption: "3D mockup view" },
    ],
  },
  "e-learning": {
    name: "E-Learning",
    category: "Web",
    role: "Full-Stack Developer (Solo)",
    timeline: "November 2023 - December 2023",
    type: "Academic Project",
    description:
      "E-Learning is a web-based learning management system designed to facilitate online education. It provides a platform for instructors to upload course materials, create quizzes, and track student progress, while enabling students to access learning content and submit assignments digitally.",
    tech: ["Laravel", "ReactJS", "PostgreSQL"],
    features: [
      "Course content management with file uploads.",
      "Online quiz and assessment system.",
      "Student progress tracking and grade management.",
      "Discussion forum for student-instructor interaction.",
    ],
    contributions: [
      "Developed the full-stack application using Laravel framework.",
      "Designed and implemented the database schema with PostgreSQL.",
      "Built responsive UI using Bootstrap for cross-device compatibility.",
      "Implemented authentication and role-based access control.",
    ],
    template: "web",
    logo: "/images/e-learning/logo.png",
    github: "https://github.com/Hammamujahid/e-learning",
    screenshots: [
      { src: "/images/e-learning/1.png", caption: "Hero section" },
      { src: "/images/e-learning/2.png", caption: "Material page" },
    ],
  },
  docxtra: {
    name: "DOCXTRA",
    category: "Web",
    role: "Mobile & Frontend Developer (Team)",
    timeline: "February 2024 - June 2024",
    type: "Academic Project",
    description:
      "DOCXTRA is a document management and collaboration platform that combines web and mobile interfaces. It enables teams to create, edit, and share documents in real-time, with features for version control, commenting, and collaborative editing across multiple devices.",
    tech: ["Next.js", "Flutter", "Firebase", "FastAPI"],
    features: [
      "Real-time collaborative document editing.",
      "Version history and document rollback capabilities.",
      "Cross-platform access via web and mobile applications.",
      "Team collaboration with comments and annotations.",
    ],
    contributions: [
      "Developed the web application using Next.js with real-time features.",
      "Built the mobile companion app using Flutter.",
      "Implemented document synchronization and version control system.",
      "Designed the database architecture using Firebase.",
    ],
    template: "mixed",
    logo: "/images/docxtra/logo.png",
    github: "https://github.com/Hammamujahid/docxtra",
    links: [
      { label : "Live Demo", url: "https://docxtra.vercel.app/", icon: <FaExternalLinkAlt /> },
      { label : "APK", url: "https://play.google.com/store/apps/details?id=com.docxtra.mobile", icon: <FaAndroid /> },
    ],
    screenshots: [
      { src: "/images/docxtra/1.png", caption: "Web view" },
      { src: "/images/docxtra/2.png", caption: "3d mockup view" },
    ],
  }
};

function Screenshot({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="group flex flex-col">
      {/* Tanpa background — gambar langsung */}
      <div className="overflow-hidden rounded-xl">
        <Image
          src={src}
          alt={caption}
          width={1200}
          height={750}
          sizes="(max-width: 768px) 100vw, 700px"
          className="w-full h-auto transition duration-300 group-hover:scale-105"
        />
      </div>
      <figcaption className="mt-2 w-fit self-start rounded-md bg-white/10 border border-white/10 px-2.5 py-1 text-[10px] text-silverwhite/85 backdrop-blur-sm">
        {caption}
      </figcaption>
    </figure>
  );
}

function MobileShot({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="group flex flex-col items-center gap-2">
      <div className="relative w-40 sm:w-44 overflow-hidden rounded-2xl shadow-lg">
        <Image
          src={src}
          alt={caption}
          width={720}
          height={1280}
          sizes="176px"
          className="w-full h-auto transition duration-300 group-hover:scale-105"
        />
      </div>
      <figcaption className="mt-1 rounded-md bg-white/10 border border-white/10 px-2.5 py-1 text-[10px] text-silverwhite/85 backdrop-blur-sm">
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
      <div className="absolute inset-0 bg-nightblue/40 backdrop-blur-sm" />
      <div className="absolute w-[36rem] h-[36rem] rounded-full bg-pink/20 blur-3xl -top-40 -left-40 pointer-events-none" />
      <div className="absolute w-[30rem] h-[30rem] rounded-full bg-pink/10 blur-3xl bottom-0 right-0 pointer-events-none" />

      {/* Window detail fullscreen */}
      <div
        className={`absolute inset-2 sm:inset-3 md:inset-4 flex flex-col bg-white/10 backdrop-blur-2xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/15 overflow-hidden transition-all duration-300 ease-out ${
          closing
            ? "opacity-0 scale-95"
            : mounted
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
        }`}
      >
        {/* Title bar */}
        <div className="relative shrink-0 h-10 flex items-center px-4 bg-white/5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <button
              aria-label="Back"
              onClick={handleBack}
              className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-110 transition"
            />
          </div>
          <span className="absolute left-1/2 -translate-x-1/2 text-xs font-semibold text-silverwhite/90">
            {project.name}
          </span>
        </div>

        {/* Konten — fullscreen, scroll */}
        <div className="overflow-y-auto flex-1 min-h-0">
          <div className="max-w-5xl mx-auto w-full p-5 sm:p-8 flex flex-col gap-6 sm:gap-8">
            {/* Header: logo + info */}
            <div className="stagger-item flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-6 pb-6 border-b border-white/10">
              <div className="relative w-16 h-16 sm:w-24 sm:h-24 shrink-0">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-pink/40 to-pink/10 blur-md" />
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white/90 shadow-lg ring-1 ring-white/20">
                  <Image
                    src={project.logo}
                    alt={`${project.name} logo`}
                    width={96}
                    height={96}
                    sizes="96px"
                    className="w-full h-full object-contain p-1.5"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xl sm:text-3xl font-bold text-silverwhite">
                    {project.name}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-pink/15 border border-pink/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-outline-pink">
                    {project.category}
                  </span>
                  {project.type && (
                    <span className="inline-flex items-center rounded-full bg-white/8 border border-white/15 px-2.5 py-0.5 text-[10px] font-semibold text-silverwhite/85">
                      {project.type}
                    </span>
                  )}
                </div>
                {(project.role || project.timeline) && (
                  <div className="flex flex-wrap gap-2">
                    {project.role && (
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/8 px-2.5 py-1 text-[10px] text-silverwhite/80">
                        <span className="uppercase text-[9px] font-bold text-silverwhite/40">Role</span>
                        {project.role}
                      </span>
                    )}
                    {project.timeline && (
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/8 px-2.5 py-1 text-[10px] text-silverwhite/80">
                        <span className="uppercase text-[9px] font-bold text-silverwhite/40">Timeline</span>
                        {project.timeline}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Tech stack */}
            <div className="stagger-item flex flex-col gap-3" style={{ animationDelay: "0.12s" }}>
              <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-silverwhite/50">
                <span className="w-3 h-3 rounded-sm bg-gradient-to-br from-pink to-pink/60" />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className={`${jetbrainsMono.className} rounded-lg bg-gradient-to-br from-pink/15 to-pink/5 border border-pink/20 px-3 py-1.5 text-[10px] sm:text-xs text-outline-pink`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="stagger-item flex flex-col gap-3" style={{ animationDelay: "0.18s" }}>
              <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-silverwhite/50">
                <span className="w-3 h-3 rounded-sm bg-gradient-to-br from-pink to-pink/60" />
                About
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-silverwhite/80 text-justify w-full">
                {project.description}
              </p>
            </div>

            {/* Screenshots sesuai template */}
            <div className="stagger-item flex flex-col gap-3" style={{ animationDelay: "0.24s" }}>
              <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-silverwhite/50">
                <span className="w-3 h-3 rounded-sm bg-gradient-to-br from-pink to-pink/60" />
                Images
              </h3>

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
              <div className="stagger-item flex flex-col gap-3" style={{ animationDelay: "0.3s" }}>
                <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-silverwhite/50">
                  <span className="w-3 h-3 rounded-sm bg-gradient-to-br from-pink to-pink/60" />
                  Key Features
                </h3>
                <ul className="flex flex-col gap-2">
                  {project.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3 text-xs sm:text-sm leading-relaxed text-silverwhite/80 backdrop-blur-sm transition hover:border-pink/25 hover:bg-white/10"
                    >
                      <span className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-md bg-pink/20 text-pink text-[10px] font-bold">
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* My Contribution */}
            {project.contributions && project.contributions.length > 0 && (
              <div className="stagger-item flex flex-col gap-3" style={{ animationDelay: "0.36s" }}>
                <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-silverwhite/50">
                  <span className="w-3 h-3 rounded-sm bg-gradient-to-br from-pink to-pink/60" />
                  My Contribution
                </h3>
                <ul className="flex flex-col gap-2">
                  {project.contributions.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3 text-xs sm:text-sm leading-relaxed text-silverwhite/80 backdrop-blur-sm transition hover:border-pink/25 hover:bg-white/10"
                    >
                      <span className="mt-0.5 flex-shrink-0 w-2 h-2 rounded-full bg-pink" />
                      <span className="pt-0.5">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tombol link eksternal */}
            <div
              className="stagger-item flex flex-wrap items-center gap-3"
              style={{ animationDelay: "0.42s" }}
            >
              <a
                href={project.github ?? "https://github.com/"}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-pink to-pink/80 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-[0_4px_16px_rgba(247,37,133,0.35)] transition enabled:hover:shadow-[0_6px_24px_rgba(247,37,133,0.5)] enabled:hover:-translate-y-0.5"
              >
                <FaGithub className="w-4 h-4 transition group-hover:rotate-12" />
                GitHub
              </a>
              {project.links?.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-pink/30 bg-pink/5 px-6 py-2.5 text-xs sm:text-sm font-semibold text-pink transition hover:bg-pink/10 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(247,37,133,0.15)]"
                >
                  {link.icon ?? <FaExternalLinkAlt className="w-3.5 h-3.5 transition group-hover:rotate-12" />}
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
