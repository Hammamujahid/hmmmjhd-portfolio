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
  const [isOpenMenu, setIsOpenMenu] = useState(false);

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
    setIsOpenMenu((prevState) => !prevState);
  };

  const handleBackLock = () => {
    router.replace("./");
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target.closest("#menu")) {
      setIsOpenMenu(false);
    }
  };

  return (
    <div
      onClick={handleClickOutside}
      className={`${comfortaa.className} w-screen h-screen bg-[url('/images/bg.jpeg')] bg-cover bg-bottom flex flex-col justify-between items-center`}
    >
      <div className="flex flex-col w-full">
        <div
          onClick={(e) => e.stopPropagation()}
          className="h-8 sm:bg-blue-950/90 bg-pink-400/90 border-b-2 border-black flex justify-between items-center px-7"
        >
          <button
            className="w-4 h-4 rounded-full border-black border-2 bg-white"
            onClick={handleOpenMenu}
          ></button>
          <span className="sm:text-base text-sm text-white">
            Welcome, {name} !
          </span>
        </div>
        {isOpenMenu == true ? (
          <div
            id="menu"
            className="ml-4 w-1/3 sm:w-1/6 sm:bg-blue-950/70 bg-pink-400/70 rounded-b-md border-2 border-t-transparent border-black flex flex-col"
          >
            <button className="border-b border-white justify-start items-start flex px-2 pt-1 sm:hover:bg-blue-400 sm:text-base text-sm">
              About Me
            </button>
            <button
              className=" justify-start items-start flex px-2 pt-1 sm:hover:bg-blue-400 sm:text-base text-sm"
              onClick={handleBackLock}
            >
              Lock Screen
            </button>
          </div>
        ) : null}
      </div>
      <div className="flex gap-2 px-4 h-10 bg-white/30 sm:w-1/2 w-full sm:rounded-t-md"></div>
    </div>
  );
};

export default Dekstop;
