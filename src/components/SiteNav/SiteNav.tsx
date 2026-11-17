import { useEffect, useState } from "react";
import styles from "./SiteNav.module.css";

const LINKS: { label: string; href: string; unlisted?: boolean }[] = [
  { label: "Sesiones de terapia", href: "/sesiones/" },
  // Not public yet: only reachable by its address, so it shows up only as its own page's title.
  { label: "Encuentros", href: "/encuentros/", unlisted: true },
  { label: "Sobre mí", href: "/sobre-mi/" },
  { label: "Contacto", href: "/contacto/" },
];

type SiteNavProps = {
  /** Keeps the white links past the hero, for pages that stay dark all the way down. */
  light?: boolean;
  /** This page's link: it becomes the title in the middle, the other sections move to the right. */
  current?: string;
};

export function SiteNav({ light = false, current }: SiteNavProps) {
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

  const here = LINKS.find((link) => link.href === current);

  return (
    <nav
      className={`${styles.nav} ${pastHero && !light ? styles.solid : styles.overHero} ${pastHero ? styles.blend : ""} ${hidden ? styles.hidden : ""}`}
      aria-label="Main"
      aria-hidden={hidden}
    >
      {here && (
        <a className={styles.title} href={here.href} aria-current="page" tabIndex={hidden ? -1 : undefined}>
          {here.label}
          <svg className={styles.underline} viewBox="0 0 240 8" aria-hidden="true">
            <path d="M3 4c10-4 20-4 29 0s19 4 29 0 19-4 29 0 19 4 29 0 19-4 29 0 19 4 29 0 19-4 29 0 19 4 29 0" pathLength="1" />
          </svg>
        </a>
      )}
      <div className={`${styles.links} ${here ? styles.aside : ""}`}>
        {LINKS.filter((link) => link !== here && !link.unlisted).map((link) => (
          <a key={link.label} className={styles.link} href={link.href} tabIndex={hidden ? -1 : undefined}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
