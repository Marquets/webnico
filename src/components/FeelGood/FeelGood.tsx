import styles from "./FeelGood.module.css";

export function FeelGood() {
  return (
    <section className={styles.feature} id="services">
      <div className={styles.band}>
        <div className={styles.photo} role="img" aria-label="Nicolás sitting against a stone wall" />
        <div className={styles.copy}>
          <p className={styles.lead}>
            Acompaño a personas a ver con claridad aquello que hoy les hace sufrir para que puedan relacionarse
            con ello de una forma que les permita crecer.
          </p>
        </div>
      </div>
    </section>
  );
}
