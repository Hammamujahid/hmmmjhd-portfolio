"use client";

import { Comfortaa } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiArrowRightCircle } from "react-icons/hi2";

const comfortaa = Comfortaa({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Home() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/dekstop?name=${encodeURIComponent(name)}`);
  };

  return (
    <div
      className={`${comfortaa.className} w-screen h-screen bg-[url('/images/bg.jpeg')] bg-cover bg-bottom`}
    >
      <div className="backdrop-blur-sm bg-white/10 flex flex-col items-center justify-center w-full h-full  gap-4">
        <div className="z-10 bg-[url('/images/photoprofile.jpg')] bg-cover w-20 h-20 bg-center rounded-full"></div>
        <div className="text-sm font-bold z-10">Mujahid&apos;s Portfolio</div>
        <div className="z-10 flex gap-2">
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="rounded-md text-black bg-white/60 h-6 px-2 w-32 sm:w-40 focus:outline-none text-sm"
          />
          {name.trim() && (
            <button
              className="bg-transparent rounded-full"
              onClick={handleNavigation}
            >
              <HiArrowRightCircle className="w-6 h-6 text-white/60" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
