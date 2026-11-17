import styles from "./BrandMark.module.css";

type BrandMarkProps = {
  /** Drops the text, leaving the wave and the eye on their own. */
  compact?: boolean;
  className?: string;
  title?: string;
};

export function BrandMark({
  compact = false,
  className = "",
  title = "Nicolás Aguilera Velasco — terapeuta transpersonal",
}: BrandMarkProps) {
  return (
    <svg
      className={`${styles.mark} ${compact ? styles.compact : ""} ${className}`}
      viewBox="0 0 510 242"
      role="img"
      aria-label={title}
    >
      <image className={styles.text} href="/logo-nico-text.png" width="510" height="242" />
      <g className={styles.symbol}>
        <image href="/logo-nico-wave.png" width="510" height="242" />
        {/* On hover the closed eye blinks open into Nico's drawn open eye. */}
        <image className={styles.lid} href="/logo-nico-eye.png" width="510" height="242" />
        <image className={styles.open} href="/logo-nico-eye-open.png" x="220" y="125" width="70" height="53.5" />
      </g>
    </svg>
  );
}
