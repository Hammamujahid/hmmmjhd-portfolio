"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Comfortaa } from "next/font/google";
import {
  FaFolder,
  FaFolderOpen,
  FaChevronRight,
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
  category: "Web" | "Mobile" | "Other" | ("Web" | "Mobile" | "Other")[];
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
    logo: "/images/simlitabmas/logo.png",
  },
  {
    slug: "docxtra",
    name: "DOCXTRA",
    category: ["Web", "Mobile"],
    logo: "/images/docxtra/logo.png",
  },
    {
    slug: "e-learning",
    name: "E-Learning",
    category: "Web",
    logo: "/images/e-learning/logo.png",
  },
    {
    slug: "serviskompresor",
    name: "Service Kompresor",
    category: "Web",
    logo: "/images/serviskompresor/logo.png",
  },
  {
    slug: "e-siklinik",
    name: "E-Siklinik",
    category: "Mobile",
    logo: "/images/e-siklinik/logo.png",
  },
    {
    slug: "ai-digital",
    name: "AI Digital",
    category: "Mobile",
    logo: "/images/ai-digital/logo.jpeg",
  },
  {
    slug: "n8n-worklows",
    name: "N8N Workflows",
    category: "Other",
    icon: <FaFolder className="w-6 h-6 text-pink" />,
  },
];

const folders: { id: "Web" | "Mobile" | "Other"; label: string; icon: React.ReactNode; count: number }[] = [
  { id: "Web", label: "Web", icon: <FaFolder className="w-4 h-4 text-pink" />, count: projects.filter((p) => p.category.includes("Web")).length },
  { id: "Mobile", label: "Mobile", icon: <FaFolder className="w-4 h-4 text-pink" />, count: projects.filter((p) => p.category.includes("Mobile")).length },
  { id: "Other", label: "Other", icon: <FaFolder className="w-4 h-4 text-pink" />, count: projects.filter((p) => p.category.includes("Other")).length },
];

export default function Projects() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);
  const [name, setName] = useState("");
  const [activeId, setActiveId] = useState<"Web" | "Mobile" | "Other" | "">("");

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
    ? projects.filter((p) => p.category.includes(activeId))
    : projects;

  const sortedProjects = [...visibleProjects].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div
      className={`${comfortaa.className} fixed inset-0 z-40 flex items-center justify-center px-4 py-6`}
    >
      <div
        className={`absolute inset-0 bg-nightblue/40 backdrop-blur-sm transition-opacity duration-300 ${
          closing ? "opacity-0" : "opacity-100"
        }`}
      />
      <div className="absolute w-96 h-96 rounded-full bg-pink/20 blur-3xl -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-80 h-80 rounded-full bg-pink/10 blur-3xl bottom-0 right-0 pointer-events-none" />

      {/* Window kaca */}
      <div
        className={`relative z-10 w-full max-w-4xl h-[70vh] min-h-[420px] max-h-full flex flex-col bg-white/10 backdrop-blur-2xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/15 overflow-hidden transition-all duration-300 ease-out ${
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
            Projects
          </span>
        </div>

        {/* Toolbar */}
        <div className="shrink-0 flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/5">
          <FaFolderOpen className="w-3.5 h-3.5 text-pink" />
          <span className="text-xs font-bold text-silverwhite">
            {activeFolder ? activeFolder.label : "All Projects"}
          </span>
          <span className="text-[11px] text-silverwhite/40">
            · {visibleProjects.length} item
          </span>
        </div>

        {/* Konten: mobile (category chips + grid) / desktop (sidebar + grid) */}
        <div className="flex flex-1 min-h-0">
          {/* Sidebar folder — desktop only */}
          <aside className="hidden md:flex w-52 shrink-0 border-r border-white/10 bg-white/5 overflow-y-auto flex-col p-2.5">
            <button
              onClick={() => setActiveId("")}
              className={`relative w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition ${
                activeId === ""
                  ? "text-silverwhite font-semibold bg-white/10"
                  : "text-silverwhite/60 hover:bg-white/5"
              }`}
            >
              {activeId === "" && (
                <span className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-pink" />
              )}
              <span className="text-base shrink-0">
                <FaFolderOpen className="w-4 h-4 text-pink" />
              </span>
              <span className="text-xs sm:text-sm font-medium truncate">
                All Projects
              </span>
            </button>
            <div className="my-2 border-t border-white/10" />
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setActiveId(folder.id)}
                className={`relative w-full flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left transition ${
                  activeId === folder.id
                    ? "text-silverwhite font-semibold bg-white/10"
                    : "text-silverwhite/60 hover:bg-white/5"
                }`}
              >
                {activeId === folder.id && (
                  <span className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-pink" />
                )}
                <span className="flex items-center gap-2.5 min-w-0">
                  <span className="text-base shrink-0">{folder.icon}</span>
                  <span className="text-xs sm:text-sm truncate">
                    {folder.label}
                  </span>
                </span>
                <span className="text-[10px] text-silverwhite/30">{folder.count}</span>
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
                    ? "border-pink text-silverwhite bg-white/15"
                    : "border-transparent bg-white/5 text-silverwhite/70 hover:bg-pink/15"
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
                      ? "border-pink text-silverwhite bg-white/15"
                      : "border-transparent bg-white/5 text-silverwhite/70 hover:bg-pink/15"
                  }`}
                >
                  <span className="text-sm">{folder.icon}</span>
                  {folder.label}
                </button>
              ))}
            </section>

            {/* Grid project — urut alfabet */}
            <div className="flex flex-col gap-2.5 divide-y divide-white/10 sm:grid sm:grid-cols-2 sm:divide-y-0 sm:gap-x-4 sm:gap-y-5 md:grid-cols-3 lg:grid-cols-4">
              {sortedProjects.map((project, i) => (
                <button
                  key={project.name}
                  onClick={() =>
                    router.push(
                      `/dekstop/projects/${project.slug}?name=${encodeURIComponent(name)}`
                    )
                  }
                  className="group relative stagger-item flex flex-row items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-2.5 py-3 text-left transition hover:border-pink/40 hover:bg-white/10 hover:-translate-y-0.5 sm:flex-col sm:items-center sm:gap-2 sm:p-3 sm:text-center"
                  style={{ animationDelay: `${0.05 + i * 0.06}s` }}
                >
                  <FaChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-pink opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition sm:hidden" />
                  <span className="flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 shrink-0 rounded-xl bg-gradient-to-br from-pink/25 to-pink/10 text-2xl sm:text-2xl text-pink border border-pink/20 shadow-sm group-hover:from-pink/35 group-hover:to-pink/15 group-hover:scale-110 group-hover:shadow-pink/20 transition">
                    {project.logo ? (
                      <Image
                        src={project.logo}
                        alt={`${project.name} logo`}
                        width={48}
                        height={48}
                        sizes="56px"
                        className="w-9 h-9 sm:w-11 sm:h-11 object-contain"
                      />
                    ) : (
                      project.icon ?? FOLDER_ICON
                    )}
                  </span>
                  <span className="text-xs sm:text-[11px] sm:text-sm font-semibold text-silverwhite leading-tight">
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