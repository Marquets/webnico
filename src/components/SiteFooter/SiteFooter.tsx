import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={`eyebrow ${styles.footer}`}>
      <span className={styles.name}>Nicolás Aguilera Velasco — terapeuta transpersonal</span>
      <div className={styles.links}>
        <a href="/sesiones/">Sesiones de terapia</a>
        <a href="/sobre-mi/">Sobre mí</a>
        <a href="/contacto/">Contacto</a>
        <a href="mailto:nicoaguileravelasco@gmail.com">nicoaguileravelasco@gmail.com</a>
      </div>
    </footer>
  );
}
