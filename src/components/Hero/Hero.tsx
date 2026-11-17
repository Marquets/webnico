"use client";

import { useEffect, useState } from "react";
import { BrandMark } from "../BrandMark/BrandMark";
import { CausticPool } from "../CausticPool/CausticPool";
import styles from "./Hero.module.css";

// A finger touching still water: one point, one clean ring at a steady beat,
// nothing else stirring. With the water this dark the floor is gone, so the
// texture comes off the surface — sky in the facets, sun on the rings.
const OPEN_WATER = {
  ambient: false,
  propagation: 0.08,
  pulsePeriod: 1.6,
  pulseX: 0.5,
  pulseY: 0.5,
  ambientStrength: 0.045,
  ambientRadius: 0.02,
  damping: 0.999,
  ghost: false,

  causticA: 15,
  causticGain: 0.22,
  veinGain: 0.06,
  veinColor: [90, 150, 200] as [number, number, number],
  floorBase: 0.04,
  absorb: [58, 20, 6] as [number, number, number],
  absorbScale: 8.0,
  deepColor: [0, 12, 24] as [number, number, number],
  deepGain: 1.0,

  nScale: 22,
  skyColor: [10, 32, 58] as [number, number, number],
  fresnelGain: 0.22,
  spec1: 70,
  spec2: 35,
  glintGain: 0.5,
  glintColor: [150, 190, 220] as [number, number, number],

  exposure: 0.72,
  vigBright: 0.95,
  vigDark: 0.5,
};

export function Hero() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const update = () => setCompact(window.scrollY > window.innerHeight * 0.3);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={styles.hero} id="top">
      <CausticPool className={styles.water} height="100%" resolution={512} params={OPEN_WATER} />
      <h1 className="visually-hidden">Nicolás Aguilera Velasco — terapeuta transpersonal</h1>
      <a
        className={`${styles.mark} ${compact ? styles.markCompact : ""}`}
        href="#top"
        aria-label="Nicolás Aguilera Velasco, inicio"
      >
        <BrandMark compact={compact} />
      </a>
      <p className={`eyebrow ${styles.scrollCue}`}>Scroll</p>
    </header>
  );
}
