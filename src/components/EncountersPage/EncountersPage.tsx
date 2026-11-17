import { BrandMark } from "../BrandMark/BrandMark";
import { SiteFooter } from "../SiteFooter/SiteFooter";
import { SiteNav } from "../SiteNav/SiteNav";
import styles from "./EncountersPage.module.css";

const IN_PERSON = ["Taller “Los cuatro tejidos del cuerpo”", "Laboratorio de Presencia Y Creatividad", "Retiros"];

const ONLINE = ["Espacio de meditación en grupo y escucha consciente", "Talleres grupales"];

function OfferList({ title, offers }: { title: string; offers: string[] }) {
  return (
    <div className={styles.column}>
      <h3 className={styles.columnTitle}>{title}</h3>
      <ul className={styles.offers}>
        {offers.map((offer) => (
          <li key={offer}>{offer}</li>
        ))}
      </ul>
    </div>
  );
}

/** One screen on one photo, as in Nico's layout: the intro, both kinds of encounter side by side, a way to ask. */
export function EncountersPage() {
  return (
    <div className={styles.page}>
      <SiteNav light current="/encuentros/" />
      <a className={styles.home} href="/" aria-label="Nicolás Aguilera Velasco, inicio">
        <BrandMark compact />
      </a>
      <main className={styles.main}>
        <h1 className="visually-hidden">Encuentros</h1>
        <p className={styles.intro}>
          En estos espacios de encuentro ofrezco diferentes experiencias para llevar tu desarrollo personal al
          siguiente nivel.
        </p>

        <div className={styles.pair}>
          <section className={styles.block} id="en-grupo" aria-labelledby="en-grupo-title">
            <h2 id="en-grupo-title" className={styles.heading}>
              Espacios de encuentro en grupo
            </h2>
            <p className={styles.lead}>
              Talleres presenciales y online en los que cultivamos la presencia como base para el desarrollo de
              nuestra consciencia.
            </p>
            <OfferList title="Presencial" offers={IN_PERSON} />
            <OfferList title="Online" offers={ONLINE} />
          </section>

          <section className={styles.block} id="contigo" aria-labelledby="contigo-title">
            <h2 id="contigo-title" className={styles.heading}>
              Espacios de encuentro contigo
            </h2>
            <p className={styles.lead}>Procesos que te llevarán a pasar de decir “estoy solo” a decir “estoy conmigo”.</p>
            <p>
              Son pequeñas aventuras para llevar a cabo a tu propio ritmo, cuyo objetivo es desarrollar una relación
              más cercana, amable y consciente contigo mismo.
            </p>
            <p>
              Propuestas para vivir desde casa un proceso de desarrollo personal, a través de prácticas diarias que te
              invitan a explorar un aspecto concreto de tu vida.
            </p>
          </section>
        </div>

        <p className={styles.ask}>
          ¿Quieres más información?
          <a className={styles.phone} href="tel:+34679667357">
            +34 679 667 357
          </a>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
