import type { CSSProperties } from "react";
import { BrandMark } from "../BrandMark/BrandMark";
import { SiteFooter } from "../SiteFooter/SiteFooter";
import { SiteNav } from "../SiteNav/SiteNav";
import styles from "./SessionsPage.module.css";

/**
 * `dark` photos get a white title so it stays readable.
 * `bubble` and `ink` colour the text panel, sampled from the photo's own palette.
 */
type Card = { title: string; text: string; photo: string; bubble: string; ink: string; dark?: boolean };

/** A plain string is body copy; `{ lead }` is set larger in the handwritten face. */
type Paragraph = string | { lead: string };

type Chapter = {
  heading?: string;
  body: Paragraph[];
  /** Shown two to a row, each row a full screen. */
  cards: Card[];
};

const CHAPTERS: Chapter[] = [
  {
    body: [
      "Si estás atravesando un momento de crisis es muy probable que sientas emociones desagradables como la ansiedad, la rabia, la tristeza o la sensación de estancamiento o de falta de sentido. Además todo eso suele venir acompañado de un gran cansancio. Yo me he sentido así durante mucho tiempo y sé lo agobiante y agotador que puede llegar a ser.",
      { lead: "Por eso quiero que sepas que todo puede empezar a sentirse mucho más sencillo." },
    ],
    cards: [
      {
        title: "Claridad",
        text: "A veces un pequeño cambio en la manera de mirar lo que está ocurriendo puede transformar por completo la forma en la que lo vives.",
        photo: "/sesiones/sombra-1.jpg",
        bubble: "rgba(233, 226, 214, 0.92)",
        ink: "#4a4135",
      },
      {
        title: "Comprensión",
        text: "Te ofrezco un espacio donde comprender tu experiencia, sin juicio, desde la amabilidad.",
        photo: "/sesiones/sombra-2.jpg",
        bubble: "rgba(222, 211, 198, 0.92)",
        ink: "#4d4031",
      },
    ],
  },
  {
    heading: "¿Qué me diferencia?",
    body: [
      { lead: "Muchas personas ayudan a solucionar problemas. Yo te acompaño a transformar la relación con esos problemas." },
      "Porque cuando cambia la manera en la que miras y vives una dificultad, también se abre la posibilidad de un cambio interno mucho más profundo y estable. Juntos podemos transformar las dificultades que aparecen en tu camino en los escalones que te conducen a una vida más consciente, más libre, más auténtica y más satisfactoria.",
    ],
    cards: [
      {
        title: "Perspectiva",
        text: "Descubre los recursos que ya están disponibles dentro de ti y aprende a utilizarlos en tu vida diaria.",
        photo: "/sesiones/sombra-planta.jpg",
        bubble: "rgba(220, 214, 191, 0.92)",
        ink: "#3b3b28",
      },
      {
        title: "Libertad",
        text: "Recupera la energía que hoy se pierde luchando contra lo que no puedes controlar y úsala para construir la vida que realmente estás buscando.",
        photo: "/sesiones/ventana.jpg",
        bubble: "rgba(211, 214, 193, 0.92)",
        ink: "#2c311f",
      },
      {
        title: "Encuentro",
        text: "No se trata de hacer más ni de convertirte en otra persona, sino de reconocer aquello que hoy te impide vivir con más tranquilidad y atenderlo.",
        photo: "/sesiones/madera-1.jpg",
        bubble: "rgba(58, 31, 25, 0.9)",
        ink: "#f1e2d6",
        dark: true,
      },
      {
        title: "Sencillez",
        text: "Lo que ahora parece un lío imposible de resolver puede ser mucho más sencillo de lo que imaginas.",
        photo: "/sesiones/madera-2.jpg",
        bubble: "rgba(46, 26, 19, 0.9)",
        ink: "#f0d9bf",
        dark: true,
      },
    ],
  },
];

function ChapterCopy({ chapter, className }: { chapter: Chapter; className: string }) {
  return (
    <div className={className}>
      {chapter.heading && <h2 className={styles.heading}>{chapter.heading}</h2>}
      {chapter.body.map((paragraph) =>
        typeof paragraph === "string" ? (
          <p key={paragraph}>{paragraph}</p>
        ) : (
          <p key={paragraph.lead} className={styles.lead}>
            {paragraph.lead}
          </p>
        ),
      )}
    </div>
  );
}

export function SessionsPage() {
  return (
    <div className={styles.page}>
      <SiteNav light />
      <a className={styles.home} href="/" aria-label="Nicolás Aguilera Velasco, inicio">
        <BrandMark compact />
      </a>
      <main>
        {/* The first chapter's words sit on the wave; its photos follow straight after. */}
        <header className={styles.hero}>
          <h1 className="visually-hidden">Sesiones de terapia</h1>
          <ChapterCopy chapter={CHAPTERS[0]} className={styles.heroCopy} />
        </header>
        {CHAPTERS.map((chapter, index) => (
          <section key={index}>
            {index > 0 && (
              <div className={styles.screen}>
                <ChapterCopy chapter={chapter} className={styles.copy} />
              </div>
            )}
            <div className={styles.cards}>
              {chapter.cards.map((card) => (
                <article
                  key={card.title}
                  className={`${styles.card} ${card.dark ? styles.dark : ""}`}
                  style={
                    {
                      backgroundImage: `url(${card.photo})`,
                      "--bubble": card.bubble,
                      "--ink": card.ink,
                    } as CSSProperties
                  }
                >
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardText}>{card.text}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
      <div className={styles.end}>
        <nav className={styles.more} aria-label="Más sobre las sesiones">
          <a className={styles.moreLink} href="/sesiones/saber-mas/">
            Si quieres saber más
          </a>
        </nav>
        <SiteFooter />
      </div>
    </div>
  );
}
