import { BrandMark } from "../BrandMark/BrandMark";
import { SiteFooter } from "../SiteFooter/SiteFooter";
import { SiteNav } from "../SiteNav/SiteNav";
import styles from "./ContactPage.module.css";

const PHONE = "+34 679 667 357";
const TEL = "tel:+34679667357";
const WHATSAPP = "https://wa.me/34679667357";
const EMAIL = "nicoaguileravelasco@gmail.com";

export function ContactPage() {
  return (
    <div className={styles.page}>
      <SiteNav light />
      <a className={styles.home} href="/" aria-label="Nicolás Aguilera Velasco, inicio">
        <BrandMark compact />
      </a>
      <main className={styles.hero}>
        <h1 className="visually-hidden">Contacto</h1>
        <p className={styles.intro}>
          Puedes elegir la manera que mejor te convenga para ponernos en contacto.
        </p>

        <div className={styles.ways}>
          <section className={styles.way} aria-labelledby="llamamos">
            <h2 id="llamamos" className={styles.wayTitle}>
              Nos llamamos
            </h2>
            <p>Llamadas o WhatsApp</p>
            <a className={styles.action} href={TEL}>
              {PHONE}
            </a>
          </section>

          <section className={styles.way} aria-labelledby="escribimos">
            <h2 id="escribimos" className={styles.wayTitle}>
              Nos escribimos
            </h2>
            <p>Escríbeme un mensaje por WhatsApp o por email.</p>
            <div className={styles.actions}>
              <a className={styles.action} href={WHATSAPP} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a className={styles.action} href={`mailto:${EMAIL}`}>
                Email
              </a>
            </div>
            <a className={styles.email} href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </section>

          <section className={styles.way} aria-labelledby="vemos">
            <h2 id="vemos" className={styles.wayTitle}>
              Nos vemos
            </h2>
            <p>Te ofrezco una primera videollamada gratuita.</p>
            <a
              className={styles.action}
              href={`${WHATSAPP}?text=${encodeURIComponent("Hola Nico, me gustaría reservar la primera videollamada gratuita.")}`}
              target="_blank"
              rel="noreferrer"
            >
              Reservar
            </a>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
