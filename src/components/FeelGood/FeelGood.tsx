import styles from "./FeelGood.module.css";

export function FeelGood() {
  return (
    <section className={styles.feature} id="services">
      <div className={styles.band}>
        <div className={styles.photo} role="img" aria-label="Nicolás sitting against a stone wall" />
        <div className={styles.copy}>
          <p className={styles.lead}>
            Te acompaño a ver con claridad aquello que hoy te hace sufrir para que puedas relacionarte con ello
            de una forma que te permita crecer.
          </p>
        </div>
      </div>
    </section>
  );
}
