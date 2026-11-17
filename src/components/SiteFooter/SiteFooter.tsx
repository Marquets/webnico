import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={`eyebrow ${styles.footer}`}>
      <span className={styles.name}>Nicolás Aguilera Velasco — terapeuta transpersonal</span>
      <div className={styles.links}>
        <a href="#how-it-works">About</a>
        <a href="#services">Sessions</a>
        <a href="mailto:nicoaguileravelasco@gmail.com">nicoaguileravelasco@gmail.com</a>
      </div>
    </footer>
  );
}
