import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { BrandMark } from "../BrandMark/BrandMark";
import { SiteFooter } from "../SiteFooter/SiteFooter";
import { SiteNav } from "../SiteNav/SiteNav";
import { StoryDialog, type Story } from "../StoryDialog/StoryDialog";
import { QUESTIONS, TILES } from "./content";
import styles from "./SessionsPage.module.css";

/** Marks each `[data-reveal]` inside the page as shown once it scrolls into view. */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll<HTMLElement>("[data-reveal]") ?? [];
    const show = (el: Element) => el.setAttribute("data-reveal", "shown");
    if (!("IntersectionObserver" in window)) {
      items.forEach(show);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return ref;
}

export function SessionsPage() {
  const pageRef = useReveal();
  const [open, setOpen] = useState<{ story: Story; origin: DOMRect } | null>(null);

  const openFrom = (story: Story) => (event: MouseEvent<HTMLElement>) =>
    setOpen({ story, origin: event.currentTarget.getBoundingClientRect() });

  return (
    <div className={styles.page} ref={pageRef}>
      <SiteNav light current="/sesiones/" />
      <a className={styles.home} href="/" aria-label="Nicolás Aguilera Velasco, inicio">
        <BrandMark compact />
      </a>
      <main>
        <header className={styles.hero}>
          <h1 className="visually-hidden">Sesiones de terapia</h1>
          <div className={styles.intro}>
            <p>
              Si estás atravesando un momento de crisis es muy probable que sientas emociones desagradables como
              ansiedad, rabia, tristeza, o sensación de estancamiento o de falta de sentido. Además todo eso suele
              venir acompañado de un gran cansancio.
            </p>
            <p>Yo me he sentido así durante mucho tiempo y sé lo agobiante y agotador que puede llegar a ser.</p>
          </div>
          <p className={styles.lead} data-reveal>
            Por eso quiero que sepas que todo puede empezar a sentirse mucho más sencillo.
          </p>
          <ul className={styles.questions}>
            {QUESTIONS.map((question) => (
              <li key={question.title} data-reveal>
                <button type="button" className={styles.question} onClick={openFrom(question)}>
                  {question.title}
                </button>
              </li>
            ))}
          </ul>
        </header>

        <section className={styles.grid} aria-label="Lo que aparece en terapia">
          {TILES.map((tile, index) => (
            <button
              key={tile.title}
              type="button"
              className={styles.tile}
              style={{ "--photo": `url(${tile.photo})`, "--col": index % 3 } as CSSProperties}
              onClick={openFrom(tile)}
              data-reveal
            >
              <span className={styles.tileTitle}>{tile.title}</span>
            </button>
          ))}
        </section>

        <section className={styles.difference}>
          <div className={styles.differenceCopy} data-reveal>
            <h2 className={styles.heading}>¿Qué me diferencia?</h2>
            <p className={styles.differenceLead}>
              Muchas personas ayudan a solucionar problemas. Yo te acompaño a transformar la relación con esos
              problemas.
            </p>
            <p>
              Lo cierto es que cuando cambia la manera en la que miras y vives una dificultad, también se abre la
              posibilidad de un cambio interno mucho más profundo y estable. Es posible transformar las dificultades
              que aparecen en tu camino en los escalones que te conducen a una vida más consciente, más libre, más
              auténtica y más satisfactoria.
            </p>
          </div>
        </section>
      </main>
      <div className={styles.end}>
        <nav className={styles.more} aria-label="Más sobre las sesiones">
          <a className={styles.moreLink} href="/sesiones/saber-mas/">
            Si quieres saber más
          </a>
        </nav>
        <SiteFooter />
      </div>
      <StoryDialog story={open?.story ?? null} origin={open?.origin ?? null} onClose={() => setOpen(null)} />
    </div>
  );
}
