import { useEffect, useState } from "react";
import styles from "./SiteNav.module.css";

const LINKS = [
  { label: "Sesiones de terapia", href: "/sesiones/" },
  { label: "Encuentros", href: "/encuentros/" },
  { label: "Sobre mí", href: "/sobre-mi/" },
  { label: "Contacto", href: "/contacto/" },
];

type SiteNavProps = {
  /** Keeps the white links past the hero, for pages that stay dark all the way down. */
  light?: boolean;
};

export function SiteNav({ light = false }: SiteNavProps) {
  const [pastHero, setPastHero] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let previous = window.scrollY;
    const update = () => {
      const y = window.scrollY;
      const past = y > window.innerHeight * 0.82;
      setPastHero(past);
      // Gone once the hero is behind, back as soon as the page moves up again.
      if (Math.abs(y - previous) > 4) {
        setHidden(past && y > previous);
        previous = y;
      } else if (!past) {
        setHidden(false);
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <nav
      className={`${styles.nav} ${pastHero && !light ? styles.solid : styles.overHero} ${hidden ? styles.hidden : ""}`}
      aria-label="Main"
      aria-hidden={hidden}
    >
      <div className={styles.links}>
        {LINKS.map((link) => (
          <a key={link.label} className={styles.link} href={link.href} tabIndex={hidden ? -1 : undefined}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
