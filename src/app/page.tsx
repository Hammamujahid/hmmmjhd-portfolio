"use client";

import { Comfortaa } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiArrowRightCircle } from "react-icons/hi2";
import { FaUserCircle, FaSpinner } from "react-icons/fa";

const comfortaa = Comfortaa({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Home() {
  const [name, setName] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push(`/dekstop?name=${encodeURIComponent(name)}`);
    }, 4000);
  };

  return (
    <div
      className={`${comfortaa.className} w-screen h-screen bg-[url('/images/bg.jpeg')] bg-cover bg-bottom`}
    >
      <div className="backdrop-blur-sm bg-white/10 flex flex-col items-center justify-center w-full h-full  gap-4">
      <FaUserCircle className="w-20 h-20 text-white/85"/>
      <div className="text-sm font-bold z-10 text-white">
          Mujahid&apos;s Portfolio (In Progress)
        </div>
        <div className="z-10 flex gap-2">
          {!isLoading ? (
            <>
              <input
                type="text"
                name="name"
                id="name"
                maxLength={15}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="rounded-md text-black bg-white/60 h-6 px-2 w-32 sm:w-40 focus:outline-none sm:text-sm text-xs"
              />
              {name.trim() && (
                <button
                  className="bg-transparent rounded-full"
                  onClick={handleNavigation}
                >
                  <HiArrowRightCircle className="w-6 h-6 text-white/60 hover:text-white/70" />
                </button>
              )}{" "}
            </>
          ) : (
            <FaSpinner className="animate-spin z-10 w-5 h-5" />
          )}
        </div>
      </div>
    </div>
  );
}
