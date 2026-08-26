"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Comfortaa, JetBrains_Mono } from "next/font/google";
import { FaArrowLeft } from "react-icons/fa";

const comfortaa = Comfortaa({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
});

const projectData: Record<
  string,
  {
    name: string;
    category: string;
    description: string;
    tech: string[];
    preview: string;
    logo: string;
  }
> = {
  "portfolio-dekstop": {
    name: "Portfolio Dekstop",
    category: "Web",
    description:
      "Personal portfolio dengan konsep desktop macOS. Berisi lock screen, desktop dengan ikon aplikasi, dock, dan jendela aplikasi seperti About, Projects, dan Contact. Dibangun dengan Next.js App Router dan Tailwind CSS.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "React"],
    preview: "/projects/portfolio-preview.svg",
    logo: "/projects/portfolio-logo.svg",
  },
  "ecommerce-api": {
    name: "E-Commerce API",
    category: "Web",
    description:
      "REST API untuk toko online dengan fitur autentikasi JWT, manajemen produk, keranjang, dan pemrosesan pembayaran. Menggunakan Laravel dengan arsitektur yang rapi dan dokumentasi API lengkap.",
    tech: ["Laravel", "MySQL", "REST API", "JWT"],
    preview: "/projects/ecommerce-preview.svg",
    logo: "/projects/ecommerce-logo.svg",
  },
  "mobile-kasir-app": {
    name: "Mobile Kasir App",
    category: "Mobile",
    description:
      "Aplikasi point-of-sale (kasir) untuk Android dengan dukungan sinkronisasi offline. Mencatat transaksi, mengelola stok produk, dan mencetak struk secara langsung dari perangkat.",
    tech: ["Flutter", "Dart", "Firebase", "SQLite"],
    preview: "/projects/kasir-preview.svg",
    logo: "/projects/kasir-logo.svg",
  },
  "ui-design-kit": {
    name: "UI Design Kit",
    category: "Design",
    description:
      "Kumpulan komponen desain reusable dan style guide yang konsisten. Termasuk palet warna, tipografi, tombol, form, dan komponen lain yang siap dipakai untuk mempercepat proses desain.",
    tech: ["Figma", "Design System", "Prototyping"],
    preview: "/projects/ui-kit-preview.svg",
    logo: "/projects/ui-kit-logo.svg",
  },
};

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
      className={`${comfortaa.className} fixed inset-0 z-40 flex items-center justify-center px-4 py-6`}
    >
      <div className="absolute inset-0 bg-nightblue/50" />

      {/* Window detail project */}
      <div
        className={`relative z-10 w-full max-w-3xl max-h-full flex flex-col bg-silverwhite/95 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-out ${
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
              onClick={handleBack}
              aria-label="Back"
            />
          </div>
          <span className="absolute left-1/2 -translate-x-1/2 text-xs font-semibold text-silverwhite/80">
            {project.name}
          </span>
        </div>

        {/* Konten */}
        <div className="overflow-y-auto flex-1 min-h-0">
          {/* Gambar preview */}
          <div className="relative w-full aspect-[16/9] bg-nightblue">
            <Image
              src={project.preview}
              alt={`${project.name} preview`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>

          {/* Body */}
          <div className="flex flex-col gap-5 p-5 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 shrink-0 rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={project.logo}
                  alt={`${project.name} logo`}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-nightblue">
                  {project.name}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-pink font-semibold">
                  {project.category}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-nightblue/75 text-justify">
              {project.description}
            </p>

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

            <button
              onClick={handleBack}
              className="self-start flex items-center gap-2 rounded-full bg-pink px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-pink/90 hover:shadow-[0_0_12px_rgba(247,37,133,0.4)]"
            >
              <FaArrowLeft className="w-3.5 h-3.5" />
              Back to Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
