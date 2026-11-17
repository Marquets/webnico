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
        {/* On hover the drawn lid swings up over its own line, lashes and all, uncovering the eye. */}
        <image className={styles.lid} href="/logo-nico-eye.png" width="510" height="242" />
        <g className={styles.open}>
          <path className={styles.stroke} d="M228,151 Q255,178 281,157" />
          <circle cx="255" cy="156" r="6" fill="#fff" />
        </g>
      </g>
    </svg>
  );
}
