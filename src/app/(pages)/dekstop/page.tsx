"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Comfortaa } from "next/font/google";

const comfortaa = Comfortaa({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const Dekstop = () => {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const nameFromQuery = query.get("name");
    if (nameFromQuery) {
      setName(nameFromQuery);
    } else {
      router.push("/");
    }
  }, [router]);

  const handleOpenMenu = () => {
    console.log("Menu opened!"); // Fungsi untuk handle menu
  };
  return (
    <div
      className={`${comfortaa.className} w-screen h-screen bg-[url('/images/bg.jpeg')] bg-cover bg-bottom flex flex-col justify-between items-center`}
    >
      <div className="w-full h-8 bg-blue-950/90 border-b-2 border-black flex justify-between items-center px-7">
        <button
          className="w-4 h-4 rounded-full border-black border-2 bg-white"
          onClick={handleOpenMenu}
        ></button>{" "}
        <span>Welcome, {name}!</span>
      </div>
      <div className="flex gap-2 px-4 h-10 bg-white/60">

      </div>
    </div>
  );
};

export default Dekstop;
