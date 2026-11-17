import type { ReactNode } from "react";
import styles from "./Tagline.module.css";

const PHRASE = "Un espacio para aprender a vivir con más amabilidad, calma y libertad.";

// Traced from the foam edge in the sand photo (2800 units wide), dropped onto the dry sand below it.
const SHORE = "M0,1186 C33,1184 133,1178 200,1171 C267,1164 333,1151 400,1144 C467,1138 533,1132 600,1132 C667,1131 733,1141 800,1142 C867,1144 933,1145 1000,1141 C1067,1138 1133,1132 1200,1123 C1267,1114 1333,1102 1400,1089 C1467,1076 1533,1057 1600,1044 C1667,1030 1733,1018 1800,1008 C1867,998 1933,997 2000,985 C2067,973 2133,953 2200,937 C2267,921 2333,904 2400,891 C2467,878 2533,867 2600,859 C2667,852 2767,850 2800,848";

type TaglineProps = {
  /** Laid over the foot of the sand, e.g. the site footer. */
  children?: ReactNode;
};

export function Tagline({ children }: TaglineProps) {
  return (
    <div className={styles.tagline}>
      {/* Slice scales like background-size: cover, so the path stays on the shoreline at any size.
          The viewBox skips the open water so the wave meets the top edge, and the photo was
          lengthened with extra dry sand below for the invitation. */}
      <svg className={styles.shore} viewBox="0 550 2800 1834" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
        <defs>
          <path id="tagline-shore" d={SHORE} />
        </defs>
        <image href="/sand-tall.jpg" width="2800" height="2384" />
        <text className={styles.curved}>
          <textPath href="#tagline-shore" startOffset="50%" textAnchor="middle">
            {PHRASE}
          </textPath>
        </text>
      </svg>
      <section className={styles.content} id="contact">
        <p className={styles.text}>{PHRASE}</p>
        <div className={styles.invite}>
          <h2 className={styles.question}>
            ¿Quieres empezar a ver las dificultades como oportunidades de crecimiento?
          </h2>
          <a className={styles.talk} href="tel:+34679667357">
            Hablemos
          </a>
          <a className={styles.phone} href="tel:+34679667357">
            +34 679 667 357
          </a>
        </div>
      </section>
      {children}
    </div>
  );
}
