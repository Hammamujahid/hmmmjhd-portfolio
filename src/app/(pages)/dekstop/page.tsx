"use client";

import { Comfortaa } from "next/font/google";
import { useSearchParams } from "next/navigation";

const comfortaa = Comfortaa({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function DekstopPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Guest";

  const handleOpenMenu = () => {

  }

  return (
    <div className={`${comfortaa.className} min-h-screen bg-[url('/images/bg.jpeg')] bg-cover bg-bottom flex flex-col justify-between items-center`}>
      <div className="w-full h-8 bg-blue-950/90 border border-b-2 border-black flex justify-between items-center px-7">
         <div className="w-4 h-4 rounded-full border border-black bg-white ">

         </div>
         Welcome, {name}!
      </div>
      <button className="w-4 h-4 rounded-full border-black border-2 bg-white" onClick={handleOpenMenu}>

      </button> 
    </div>
  );
}
