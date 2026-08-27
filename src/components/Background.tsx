"use client";

export default function Background({
  className = "object-center",
  mobileSrc = "/images/bg.mp4",
  desktopSrc = "/images/bg_dekstop.png",
}: {
  className?: string;
  mobileSrc?: string;
  desktopSrc?: string;
}) {
  const position =
    className.split(" ").filter((c) => c.startsWith("object-")).join(" ") ||
    "object-center";

  return (
    <div className="pointer-events-none absolute inset-0 w-full h-full overflow-hidden">
      {/* Mobile: video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className={`md:hidden absolute inset-0 w-full h-full object-cover ${position}`}
      >
        <source src={mobileSrc} type="video/mp4" />
      </video>
      {/* Desktop: gambar */}
      <div
        className={`hidden md:block absolute inset-0 bg-cover bg-center ${position.replace(
          /^object-/,
          "bg-"
        )}`}
        style={{ backgroundImage: `url(${desktopSrc})` }}
      />
    </div>
  );
}