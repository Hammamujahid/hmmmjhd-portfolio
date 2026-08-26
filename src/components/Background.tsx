"use client";

export default function Background({
  className = "bg-center",
  desktopSrc = "/images/bg_dekstop.png",
  mobileSrc = "/images/bg.png",
}: {
  className?: string;
  desktopSrc?: string;
  mobileSrc?: string;
}) {
  const position = className.split(" ").filter((c) => c.startsWith("bg-")).join(" ");

  return (
    <div className="absolute inset-0 w-full h-full">
      <div
        className={`absolute inset-0 bg-cover bg-center md:hidden ${position}`}
        style={{ backgroundImage: `url(${mobileSrc})` }}
      />
      <div
        className={`absolute inset-0 bg-cover bg-center hidden md:block ${position}`}
        style={{ backgroundImage: `url(${desktopSrc})` }}
      />
    </div>
  );
}