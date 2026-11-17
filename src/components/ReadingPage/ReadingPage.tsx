import { BrandMark } from "../BrandMark/BrandMark";
import { SiteFooter } from "../SiteFooter/SiteFooter";
import { SiteNav } from "../SiteNav/SiteNav";
import styles from "./ReadingPage.module.css";

// Two movements, as in Nico's text: the difficulty, then what opens up after it.
const PARTS = [
  [
    "Todas y todos estamos expuestos a un montón de dificultades que aparecen en nuestro camino. Cuando llegan a nuestra vida, es normal que podamos sentirnos abrumados, estancados, bloqueados... hay momentos en los que tenemos la impresión de que hemos dejado de avanzar y que simplemente estamos repitiendo los mismos patrones, avanzando en círculos, volviendo una y otra vez a las mismas situaciones.",
    "Es muy fácil pensar que solo nos sentiremos mejor cuando algo cambie de forma radical y a menudo nuestra atención se dirige casi por completo hacia todo aquello que no funciona, tanto a nuestro alrededor como dentro de nosotros mismos.",
    "Sin darnos cuenta, dedicamos una enorme cantidad de energía a luchar contra aquello que ya está ocurriendo. Y eso nos agota profundamente. Además es precisamente esa lucha la que suele mantener la situación estancada y nos impide evolucionar.",
  ],
  [
    "Estos momentos de crisis, que a menudo nos pueden parecer un callejón sin salida, son en realidad grandes oportunidades de crecimiento, a través de las cuales la vida nos obliga a detenernos, evaluar la situación y empezar a cultivar un cambio profundo.",
    "Cuando empezamos a mirar lo que estamos viviendo con mayor claridad y aprendemos a reconocer la realidad tal y como es, podemos dejar de agotarnos inútilmente intentando controlar todo aquello que no está en nuestra mano.",
    "Entonces, esa energía que antes gastábamos en resistir, se vuelve disponible y nos permite desarrollar nuevas formas de relacionarnos con la vida, con nosotros mismos y con los demás.",
    "Lo de afuera cambiará sin duda, a su ritmo. Pero el trabajo empieza por un cambio interno. Lo que de verdad está en nuestra mano es a la vez lo más importante: desde dónde nos estamos relacionando con lo que está sucediendo.",
    "Aunque quizás no lo sepas, en este momento ya tienes dentro de ti un montón de capacidades disponibles para mejorar tu vida.",
    "Mi labor consiste en ayudarte a reconocer esas capacidades y a transformarlas en habilidades que puedas poner en práctica en tu día a día.",
    "Te ofrezco un espacio en el que poder hablar sin prisa y mirar tu situación con perspectiva. Un lugar en el que poder ser tú, tal como eres ahora, sin juicio, y donde poder desarrollar una relación más amable y consciente contigo.",
    "Desde ahí, todo lo demás sucede irremediablemente, de forma natural.",
  ],
];

export function ReadingPage() {
  return (
    <div className={styles.page}>
      <SiteNav light />
      <a className={styles.home} href="/" aria-label="Nicolás Aguilera Velasco, inicio">
        <BrandMark compact />
      </a>
      <main className={styles.main}>
        <article className={styles.text}>
          <h1 className="visually-hidden">Si quieres saber más</h1>
          {PARTS.map((part, index) => (
            <div key={index} className={styles.part}>
              {part.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ))}
          <section className={styles.part} aria-labelledby="como-son">
            <h2 id="como-son" className={styles.heading}>
              ¿Cómo son las sesiones?
            </h2>
            <ul className={styles.list}>
              <li>Duran 1 hora.</li>
              <li>Se hacen online a través de videollamada.</li>
              <li>Son individuales y totalmente confidenciales.</li>
            </ul>
          </section>
          <section className={styles.part} aria-labelledby="tarifas">
            <h2 id="tarifas" className={styles.heading}>
              Tarifas
            </h2>
            <p>Te ofrezco una primera sesión de consulta gratuita, sin compromiso.</p>
            <dl className={styles.prices}>
              <div>
                <dt>Sesión</dt>
                <dd>50 €</dd>
              </div>
              <div>
                <dt>Bono de 4 sesiones</dt>
                <dd>180 €</dd>
              </div>
            </dl>
            <p>Puedes abonarlas por Bizum o por transferencia.</p>
          </section>
          <section className={styles.part} aria-labelledby="cancelacion">
            <h2 id="cancelacion" className={styles.heading}>
              Política de cancelación
            </h2>
            <ul className={styles.list}>
              <li>Puedes cancelar cualquier sesión de forma gratuita con 24 h de antelación.</li>
              <li>Si cancelas la sesión el mismo día, hasta 2 h antes, se abona el 50 % del coste de la sesión.</li>
              <li>
                Si cancelas con menos de 2 h de antelación (salvo caso de fuerza mayor) o no te presentas a la cita,
                se paga el coste completo de la sesión.
              </li>
            </ul>
          </section>
          <p className={styles.closing}>
            Si esto te resuena, te invito a probarlo sin compromiso. La primera sesión es gratuita.
          </p>
          <div className={styles.actions}>
            <a className={styles.talk} href="/contacto/">
              Hablemos
            </a>
            <a className={styles.back} href="/sesiones/">
              Volver a sesiones de terapia
            </a>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
