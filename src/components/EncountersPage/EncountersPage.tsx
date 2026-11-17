import { BrandMark } from "../BrandMark/BrandMark";
import { SiteFooter } from "../SiteFooter/SiteFooter";
import { SiteNav } from "../SiteNav/SiteNav";
import styles from "./EncountersPage.module.css";

type Offer = { name: string; detail?: string; soon?: boolean };

const IN_PERSON: Offer[] = [
  { name: "Taller «Los 4 tejidos del cuerpo»", detail: "Presencia corporal a través del movimiento" },
  { name: "Laboratorio de Presencia y Creatividad" },
  { name: "Retiros", soon: true },
];

const ONLINE: Offer[] = [
  { name: "Espacio de meditación en grupo y escucha consciente" },
  { name: "Talleres online sobre temas específicos", soon: true },
];

const JOURNEYS = [
  "Un viaje conmigo",
  "Creando mi propia rutina matinal",
  "Pensamientos y creencias",
  "Travesía interior: 14 días de ida y 14 días de vuelta",
  "Dieta de quejas: soltando el victimismo y recuperando mi energía",
];

function OfferList({ title, offers }: { title: string; offers: Offer[] }) {
  return (
    <div className={styles.column}>
      <h3 className={styles.columnTitle}>{title}</h3>
      <ul className={styles.offers}>
        {offers.map((offer) => (
          <li key={offer.name}>
            <span className={styles.offerName}>{offer.name}</span>
            {offer.detail && <span className={styles.offerDetail}>{offer.detail}</span>}
            {offer.soon && <span className={styles.soon}>Próximamente</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function EncountersPage() {
  return (
    <div className={styles.page}>
      <SiteNav light />
      <a className={styles.home} href="/" aria-label="Nicolás Aguilera Velasco, inicio">
        <BrandMark compact />
      </a>
      <main>
        <header className={styles.hero}>
          <div className={styles.intro}>
            <h1 className={styles.title}>Encuentros</h1>
            <p>
              En estos espacios de encuentro ofrezco diferentes experiencias para llevar tu desarrollo personal al
              siguiente nivel. Hay eventos presenciales, como talleres o retiros, y espacios online dedicados al
              desarrollo de la consciencia, a entrenar la presencia, a compartir vivencias de conexión como la
              práctica de la meditación en grupo o a descubrir el poder transformador de la escucha consciente.
            </p>
          </div>
        </header>

        {/* Both kinds of encounter share one screen, side by side on the same print. */}
        <section className={styles.screen} aria-label="Tipos de encuentro">
          <div className={styles.pair}>
            <article className={styles.block} id="en-grupo" aria-labelledby="en-grupo-title">
              <h2 id="en-grupo-title" className={styles.heading}>
                Espacios de encuentro en grupo
              </h2>
              <p className={styles.lead}>
                Talleres presenciales y online en los que cultivamos la presencia como base para el desarrollo de
                nuestra consciencia.
              </p>
              <OfferList title="Presencial" offers={IN_PERSON} />
              <OfferList title="Online" offers={ONLINE} />
            </article>

            <article className={styles.block} id="contigo" aria-labelledby="contigo-title">
              <h2 id="contigo-title" className={styles.heading}>
                Espacios de encuentro contigo
              </h2>
              <p className={styles.lead}>
                Procesos que te llevarán a pasar de decir «estoy solo» a decir «estoy conmigo».
              </p>
              <p>
                Son pequeñas aventuras para llevar a cabo a tu propio ritmo, cuyo objetivo es desarrollar una relación
                más cercana, amable y consciente contigo mismo. Propuestas para vivir desde casa un proceso de
                desarrollo personal, a través de prácticas diarias que te invitan a explorar un aspecto concreto de tu
                vida.
              </p>
              <ul className={styles.journeys}>
                {JOURNEYS.map((journey) => (
                  <li key={journey}>{journey}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
