import type { CSSProperties, ReactNode } from "react";
import { BrandMark } from "../BrandMark/BrandMark";
import { SiteFooter } from "../SiteFooter/SiteFooter";
import { SiteNav } from "../SiteNav/SiteNav";
import styles from "./ContactPage.module.css";

const PHONE = "+34 679 667 357";
const TEL = "tel:+34679667357";
const WHATSAPP = "https://wa.me/34679667357";
const EMAIL = "nicoaguileravelasco@gmail.com";

/** One terracotta tile of the floor; `n` picks which of the nine slices of Nico's photo it is. */
function Tile({ n, children }: { n: number; children?: ReactNode }) {
  return (
    <div
      className={`${styles.tile} ${children ? styles.filled : ""}`}
      style={{ "--tile": `url(/contacto/baldosa-${n}.jpg)` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function ContactPage() {
  return (
    <div className={styles.page}>
      <SiteNav light current="/contacto/" />
      <a className={styles.home} href="/" aria-label="Nicolás Aguilera Velasco, inicio">
        <BrandMark compact />
      </a>
      <main>
        <header className={styles.hero}>
          <h1 className="visually-hidden">Contacto</h1>
          <p className={styles.motto}>Cualquier camino empieza con un primer paso</p>
        </header>

        <div className={styles.floor}>
          <Tile n={1} />
          <Tile n={2}>
            <p className={styles.intro}>Puedes elegir la manera que mejor te convenga para contactar conmigo</p>
          </Tile>
          <Tile n={3} />

          <Tile n={4}>
            <section className={styles.way} aria-labelledby="llamamos">
              <h2 id="llamamos" className={styles.wayTitle}>
                Nos llamamos
              </h2>
              <a className={styles.action} href={TEL}>
                {PHONE}
              </a>
            </section>
          </Tile>
          <Tile n={5}>
            <section className={styles.way} aria-labelledby="escribimos">
              <h2 id="escribimos" className={styles.wayTitle}>
                Nos escribimos
              </h2>
              <p>Escríbeme un mensaje por whatsapp o por email</p>
              <div className={styles.actions}>
                <a className={styles.action} href={WHATSAPP} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
                <a className={styles.action} href={`mailto:${EMAIL}`}>
                  Email
                </a>
              </div>
            </section>
          </Tile>
          <Tile n={6}>
            <section className={styles.way} aria-labelledby="vemos">
              <h2 id="vemos" className={styles.wayTitle}>
                Nos vemos
              </h2>
              <p>Te ofrezco una primera videollamada gratuita</p>
              <a
                className={styles.action}
                href={`${WHATSAPP}?text=${encodeURIComponent("Hola Nico, me gustaría reservar la primera videollamada gratuita.")}`}
                target="_blank"
                rel="noreferrer"
              >
                Reservar
              </a>
            </section>
          </Tile>

          <Tile n={7} />
          <Tile n={8} />
          <Tile n={9}>
            <BrandMark className={styles.stamp} />
          </Tile>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
