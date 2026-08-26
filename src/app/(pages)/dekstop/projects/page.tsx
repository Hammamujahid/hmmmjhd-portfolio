"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Comfortaa } from "next/font/google";
import {
  FaFolder,
  FaFolderOpen,
  FaCode,
  FaDatabase,
  FaMobileAlt,
  FaPalette,
  FaMicrochip,
} from "react-icons/fa";

const comfortaa = Comfortaa({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const FOLDER_ICON = <FaFolder className="w-6 h-6 text-pink" />;

type Project = {
  slug: string;
  name: string;
  category: "Web" | "Mobile" | "Other";
  icon?: React.ReactNode;
  logo?: string;
};

const projects: Project[] = [
  {
    slug: "smart-hydroponic",
    name: "Smart Hydroponic",
    category: "Mobile",
    logo: "/images/smart_hydroponic/logo.png",
  },
  {
    slug: "simlitabmas",
    name: "Simlitabmas",
    category: "Web",
    icon: <FaFolder className="w-6 h-6 text-pink" />,
  },
  {
    slug: "docxtra",
    name: "DOCXTRA",
    category: "Web",
    icon: <FaFolder className="w-6 h-6 text-pink" />,
  },
    {
    slug: "e-learning",
    name: "E-Learning",
    category: "Web",
    icon: <FaFolder className="w-6 h-6 text-pink" />,
  },
    {
    slug: "coffee-brewer",
    name: "Coffee Brewer",
    category: "Web",
    icon: <FaFolder className="w-6 h-6 text-pink" />,
  },
    {
    slug: "serviskompresor",
    name: "Service Kompresor",
    category: "Web",
    icon: <FaFolder className="w-6 h-6 text-pink" />,
  },
  {
    slug: "e-siklinik",
    name: "E-Siklinik",
    category: "Mobile",
    icon: <FaFolder className="w-6 h-6 text-pink" />,
  },
    {
    slug: "ai-digital",
    name: "AI Digital",
    category: "Mobile",
    icon: <FaFolder className="w-6 h-6 text-pink" />,
  },
  {
    slug: "n8n-worklows",
    name: "N8N Workflows",
    category: "Other",
    icon: <FaFolder className="w-6 h-6 text-pink" />,
  },
];

const folders = [
  { id: "Web", label: "Web", icon: <FaFolder className="w-4 h-4 text-pink" /> },
  { id: "Mobile", label: "Mobile", icon: <FaFolder className="w-4 h-4 text-pink" /> },
  { id: "Other", label: "Other", icon: <FaFolder className="w-4 h-4 text-pink" /> },
];

export default function Projects() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);
  const [name, setName] = useState("");
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setName(query.get("name") ?? "");
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      router.push(`/dekstop?name=${encodeURIComponent(name)}`);
    }, 320);
  };

  const activeFolder = folders.find((f) => f.id === activeId) ?? null;
  const visibleProjects = activeId
    ? projects.filter((p) => p.category === activeId)
    : projects;

  const sortedProjects = [...visibleProjects].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div
      className={`${comfortaa.className} fixed inset-0 z-40 flex items-center justify-center px-4 py-6`}
    >
      <div className="absolute inset-0 bg-nightblue/50" />

      {/* Window ala Finder / macOS */}
      <div
        className={`relative z-10 w-full max-w-4xl h-[70vh] min-h-[420px] max-h-full flex flex-col bg-silverwhite/95 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-out ${
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
            Projects
          </span>
        </div>

        {/* Toolbar */}
        <div className="shrink-0 flex items-center gap-2 px-4 py-2 border-b border-black/5 bg-nightblue/5">
          <span className="text-xs font-semibold text-nightblue">
            {activeFolder ? activeFolder.label : "All Projects"}
          </span>
          <span className="text-[11px] text-nightblue/40">
            {visibleProjects.length} item
          </span>
        </div>

        {/* Konten: mobile (category chips + grid) / desktop (sidebar + grid) */}
        <div className="flex flex-1 min-h-0">
          {/* Sidebar folder — desktop only */}
          <aside className="hidden md:flex w-48 shrink-0 border-r border-black/10 bg-nightblue/5 overflow-y-auto flex-col p-2">
            <button
              onClick={() => setActiveId("")}
              className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left border transition ${
                activeId === ""
                  ? "border-pink bg-pink/15 text-nightblue font-semibold"
                  : "border-transparent text-nightblue/70 hover:bg-nightblue/5"
              }`}
            >
              <span className="text-base shrink-0">
                <FaFolderOpen className="w-4 h-4 text-pink" />
              </span>
              <span className="text-xs sm:text-sm truncate">All Projects</span>
            </button>
            <div className="my-2 border-t border-nightblue/10" />
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setActiveId(folder.id)}
                className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left border transition ${
                  activeId === folder.id
                    ? "border-pink bg-pink/15 text-nightblue font-semibold"
                    : "border-transparent text-nightblue/70 hover:bg-nightblue/5"
                }`}
              >
                <span className="text-base shrink-0">{folder.icon}</span>
                <span className="text-xs sm:text-sm truncate">
                  {folder.label}
                </span>
              </button>
            ))}
          </aside>

          {/* Isi */}
          <main className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-5">
            {/* Section category — mobile only */}
            <section className="md:hidden mb-4 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveId("")}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold border transition ${
                  activeId === ""
                    ? "border-pink text-nightblue bg-nightblue/5"
                    : "border-transparent bg-nightblue/5 text-nightblue/70 hover:bg-pink/15"
                }`}
              >
                All
              </button>
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => setActiveId(folder.id)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold border transition ${
                    activeId === folder.id
                      ? "border-pink text-nightblue bg-nightblue/5"
                      : "border-transparent bg-nightblue/5 text-nightblue/70 hover:bg-pink/15"
                  }`}
                >
                  <span className="text-sm">{folder.icon}</span>
                  {folder.label}
                </button>
              ))}
            </section>

            {/* Grid project — urut alfabet */}
            <div className="flex flex-col divide-y divide-nightblue/5 sm:grid sm:grid-cols-2 sm:divide-y-0 md:grid-cols-3 lg:grid-cols-4 gap-0 sm:gap-x-4 sm:gap-y-5">
              {sortedProjects.map((project) => (
                <button
                  key={project.name}
                  onClick={() =>
                    router.push(
                      `/dekstop/projects/${project.slug}?name=${encodeURIComponent(name)}`
                    )
                  }
                  className="group flex flex-row items-center gap-3 rounded-xl p-2 py-2.5 text-left transition hover:bg-pink/10 sm:flex-col sm:items-center sm:gap-1.5 sm:p-2 sm:text-center"
                >
                  <span className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 sm:rounded-xl shrink-0 rounded-xl bg-pink/15 text-2xl sm:text-xl text-pink shadow-sm group-hover:bg-pink/25 group-hover:scale-105 transition">
                    {project.logo ? (
                      <Image
                        src={project.logo}
                        alt={`${project.name} logo`}
                        width={48}
                        height={48}
                        sizes="48px"
                        className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
                      />
                    ) : (
                      project.icon ?? FOLDER_ICON
                    )}
                  </span>
                  <span className="text-xs sm:text-[11px] sm:text-xs font-semibold text-nightblue leading-tight">
                    {project.name}
                  </span>
                </button>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}