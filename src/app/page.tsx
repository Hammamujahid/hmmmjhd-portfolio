import { Comfortaa } from "next/font/google";
import { HiArrowRightCircle } from "react-icons/hi2";

const comfortaa = Comfortaa({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${comfortaa.className} flex flex-col items-center justify-center min-h-screen bg-white gap-4 font bg-[url('/images/bg.jpeg')] bg-cover bg-bottom`}
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-white/10"></div>

      <div className="z-10 bg-[url('/images/photoprofile.jpg')] bg-cover w-20 h-20 bg-center rounded-full"></div>
      <div className="text-sm font-bold z-10">Mujahid&apos;s Portfolio</div>
      <div className="z-10 flex gap-2">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          className="rounded-md text-black bg-white/60 h-6 px-2 w-32 sm:w-40 focus:outline-none text-sm"
        />
        <button className="bg-transparent rounded-full">
        <HiArrowRightCircle className="w-6 h-6 text-white/60"/>
        </button>
      </div>
    </div>
  );
}
