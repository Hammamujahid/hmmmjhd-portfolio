"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Sparkle = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
};

type CursorSparkle = {
  id: number;
  x: number;
  y: number;
  size: number;
  dx: number;
  dy: number;
};

let idCounter = 0;

const SPARKLE_COLORS = ["#F72585", "#E4E9F0", "#FFD1E7", "#F8A5C2"];
const SPARKLE_SYMBOL = "✦";

function randomColor() {
  return SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
}

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/* ---------- Sparkles dekoratif di bagian atas ---------- */
function seeded(i: number, salt = 0) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function TopSparkles({ count = 28 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  const sparkles = useRef<Sparkle[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (sparkles.current.length === 0) {
    sparkles.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: seeded(i, 1) * 100,
      y: seeded(i, 2) * 100,
      size: 10 + seeded(i, 3) * 16,
      delay: seeded(i, 4) * 4,
      duration: 2.5 + seeded(i, 5) * 2.5,
      color: SPARKLE_COLORS[i % SPARKLE_COLORS.length],
    }));
  }

  if (!mounted) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 overflow-hidden">
      {sparkles.current.map((s) => (
        <span
          key={s.id}
          className="absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            fontSize: `${s.size}px`,
            color: s.color,
            textShadow: "0 0 8px currentColor",
            animation: `sparkle-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        >
          {SPARKLE_SYMBOL}
        </span>
      ))}
    </div>
  );
}

/* ---------- Cursor trail + burst saat klik ---------- */
export function CursorSparkles() {
  const [trail, setTrail] = useState<CursorSparkle[]>([]);
  const [bursts, setBursts] = useState<CursorSparkle[]>([]);
  const lastMove = useRef({ x: 0, y: 0, time: 0 });

  const spawnBurst = useCallback((x: number, y: number) => {
    const sparks: CursorSparkle[] = Array.from({ length: 10 }, () => ({
      id: idCounter++,
      x,
      y,
      size: random(10, 18),
      dx: random(-70, 70),
      dy: random(-70, 70),
    }));
    setBursts((prev) => [...prev, ...sparks]);
    setTimeout(() => {
      setBursts((prev) =>
        prev.filter((b) => !sparks.some((s) => s.id === b.id))
      );
    }, 900);
  }, []);

  useEffect(() => {
    const now = Date.now();
    const spawnTrail = (x: number, y: number) => {
      const id = idCounter++;
      setTrail((prev) => [
        ...prev.slice(-18),
        { id, x, y, size: random(8, 16), dx: 0, dy: 0 },
      ]);
      setTimeout(() => {
        setTrail((prev) => prev.filter((s) => s.id !== id));
      }, 700);
    };

    const onMove = (e: PointerEvent) => {
      const throttle = 40;
      if (e.timeStamp - lastMove.current.time < throttle) return;
      lastMove.current = { x: e.clientX, y: e.clientY, time: e.timeStamp };
      spawnTrail(e.clientX, e.clientY);
    };

    const onDown = (e: PointerEvent) => {
      spawnBurst(e.clientX, e.clientY);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [spawnBurst]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {trail.map((s) => (
        <span
          key={s.id}
          className="absolute"
          style={{
            left: s.x,
            top: s.y,
            fontSize: `${s.size}px`,
            color: randomColor(),
            textShadow: "0 0 8px currentColor",
            animation: "sparkle-trail 0.7s ease-out forwards",
          }}
        >
          {SPARKLE_SYMBOL}
        </span>
      ))}
      {bursts.map((s) => (
        <span
          key={s.id}
          className="absolute"
          style={{
            left: s.x,
            top: s.y,
            fontSize: `${s.size}px`,
            color: randomColor(),
            textShadow: "0 0 8px currentColor",
            ["--dx" as string]: `${s.dx}px`,
            ["--dy" as string]: `${s.dy}px`,
            animation: "sparkle-burst 0.9s ease-out forwards",
          }}
        >
          {SPARKLE_SYMBOL}
        </span>
      ))}
    </div>
  );
}

export default function Sparkles() {
  return (
    <>
      <TopSparkles />
      <CursorSparkles />
    </>
  );
}